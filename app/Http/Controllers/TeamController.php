<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $ownedTeams = $user->ownedTeams()->with(['users'])->get(); // Assuming 'users' is the relationship name
        $teams = $user->teams()->with(['users', 'owner'])->get();

        return Inertia::render('Team/Index', ['ownedTeams' => $ownedTeams, 'teams' => $teams]);
    }


    public function create()
    {
        $user = auth()->user();

        // Retrieve all users and filter out the authenticated user
        $users = User::where('id', '!=', $user->id)->select(['id', 'name'])->get();

        return Inertia::render('Team/Store', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'teamMembers' => 'nullable|array',
            'teamMembers.*' => 'integer|exists:users,id' // Ensure each member is a valid user ID if provided
        ]);

        // Create the team
        $team = auth()->user()->ownedTeams()->create(['name' => $data['name']]);

        // Attach members to the team if any
        if (!empty($data['teamMembers'])) {
            $team->users()->sync($data['teamMembers']);
        }

        return redirect()->route('team.index');
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
        auth()->user()->ownedTeams()->find($id)->delete();

        return redirect()->route('team.index');
    }
}
