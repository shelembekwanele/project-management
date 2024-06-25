<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        return Inertia::render('Dashboard', ['projects' => auth()->user()->projects]);
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
        $userList = User::all()->select(['id', 'name']);

        return Inertia::render('Project/Edit', ['project' => auth()->user()->projects()->findOrFail($id), 'users' => $userList]);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        auth()->user()->projects()->find($id)->delete();

        return Redirect::route('dashboard');

    }
}
