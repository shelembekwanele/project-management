<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            'status' => 'required|in:todo,in_progress,complete'
        ]);

        $project = auth()->user()->projects()->findOrFail($id);

        $task = $project->tasks()->create($data);

        auth()->user()->tasks()->save($task);

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
        //
    }
}
