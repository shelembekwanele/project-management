<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskComment;

class TaskCommentController extends Controller
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
    public function store(Request $request, string $taskId)
    {
        $data = $request->validate([
            'content' => 'required|string',
        ]);

        $user = auth()->user();

        // Find the task within projects where the user is either the owner or part of the team
        $task = Task::where('id', $taskId)
            ->whereHas('project', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('team', function ($query) use ($user) {
                        $query->whereHas('users', function ($query) use ($user) {
                            $query->where('user_id', $user->id);
                        });
                    });
            })
            ->first();

        if (!$task) {
            // Handle the case where the task is not found or the user does not have access
            return redirect()->back()->withErrors(['error' => 'Task not found or you do not have access to this task.']);
        }

        // Create the comment associated with the authenticated user
        $comment = $user->taskComments()->create([
            'content' => $data['content'],
            'task_id' => $taskId, // Ensure the comment is associated with the correct task
        ]);

        return redirect()->back();
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();

        // Find the comment within projects where the user is either the owner or part of the team
        $comment = TaskComment::where('id', $id)
            ->whereHas('task.project', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('team', function ($query) use ($user) {
                        $query->whereHas('users', function ($query) use ($user) {
                            $query->where('user_id', $user->id);
                        });
                    });
            })
            ->first();

        if (!$comment) {
            // Handle the case where the comment is not found or the user does not have access
            return redirect()->back()->withErrors(['error' => 'Comment not found or you do not have access to delete this comment.']);
        }

        $comment->delete();

        return redirect()->back();
    }

}
