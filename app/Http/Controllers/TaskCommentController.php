<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            'content' => 'required|string'
        ]);

        $user = auth()->user();

        $comment = $user->taskComments()->create($data);

        auth()->user()->tasks()->find($taskId)->comments()->save($comment);

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
        $task = auth()->user()->taskComments()->find($id);

        $task->delete();

        return redirect()->back();

    }
}
