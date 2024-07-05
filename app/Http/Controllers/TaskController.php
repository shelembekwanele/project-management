<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'description' => 'nullable|min:3',
            'estimatedTime' => 'required|integer',
            'status' => 'required|in:todo,in_progress,complete',
        ]);

        $user = auth()->user();

        // Find the project where the user is either the owner or part of the team
        $project = Project::where('id', $id)
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('team', function ($query) use ($user) {
                        $query->whereHas('users', function ($query) use ($user) {
                            $query->where('user_id', $user->id);
                        });
                    });
            })
            ->firstOrFail();

        // Create the task within the validated data
        $task = $project->tasks()->create($data);

        // Assign the task to the authenticated user
        $user->tasks()->save($task);

        return redirect()->back();
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'description' => 'nullable|min:3',
            'estimatedTime' => 'required|integer',
            'status' => 'required|in:todo,in_progress,complete',
        ]);

        $user = auth()->user();

        // Find the task within projects where the user is either the owner or part of the team
        $task = Task::where('id', $id)
            ->whereHas('project', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('team', function ($query) use ($user) {
                        $query->whereHas('users', function ($query) use ($user) {
                            $query->where('user_id', $user->id);
                        });
                    });
            })
            ->firstOrFail();

        $task->update($data);

        return redirect()->back();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();

        // Find the task within projects where the user is either the owner or part of the team
        $task = Task::where('id', $id)
            ->whereHas('project', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('team', function ($query) use ($user) {
                        $query->whereHas('users', function ($query) use ($user) {
                            $query->where('user_id', $user->id);
                        });
                    });
            })
            ->firstOrFail();

        $task->delete();

        return redirect()->back();
    }

}
