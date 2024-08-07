<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $projects = Project::where('user_id', $user->id)
            ->orWhereHas('team', function ($query) use ($user) {
                $query->whereHas('users', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            })
            ->with('team')
            ->get();

        return Inertia::render('Dashboard', ['projects' => $projects]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3|string',
            'description' => 'max:200',
            'status' => 'required|in:todo,in_progress,done',
            'endDate' => 'required|date',
            'startDate' => 'required|date'
        ]);

        auth()->user()->projects()->create($data);

        return Redirect::route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ownedTeams = auth()->user()->ownedTeams()->get();

        $project = auth()->user()->projects()->findOrFail($id);

        $team = $project->team()->with('users')->get();

        return Inertia::render('Project/Edit', ['project' => $project, 'team' => $team, 'ownedTeams' => $ownedTeams]);
    }

    /*
     * Display project board
     */

    public function board(string $id)
    {
        $user = auth()->user();

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

        $tasks = $project->tasks()->with(['owner', 'comments.owner'])->get();

        return Inertia::render('Project/Board', ['project' => $project, 'tasks' => $tasks]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = $request->validate([
            'name' => 'required|min:3|string',
            'description' => 'max:200',
            'status' => 'required|in:todo,in_progress,done',
            'endDate' => 'required|date',
            'startDate' => 'required|date'
        ]);

        auth()->user()->projects()->find($id)->update($data);

        return Redirect::route('dashboard');
    }

    public function assign_team(string $id, string $teamId)
    {

        $project = auth()->user()->projects()->find($id);

        $team = auth()->user()->ownedTeams()->find($teamId);

        $project->team()->associate($team)->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        auth()->user()->projects()->find($id)->delete();

        return Redirect::route('dashboard');

    }
}
