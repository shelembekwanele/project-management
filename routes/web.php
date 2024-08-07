<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskCommentController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [ProjectController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('project', ProjectController::class);
    Route::put('project/assign-team/{id}/{teamId}', [ProjectController::class, 'assign_team']);
    Route::get('project/board/{id}', [ProjectController::class, 'board']);

    Route::resource('task', TaskController::class);

    Route::post("/task/{id}", [TaskController::class, 'store'])->name('task.store');

    Route::post('/taskComment/{taskId}', [TaskCommentController::class, 'store'])->name('taskComment.store');
    Route::resource('taskComment', TaskCommentController::class);

    Route::resource('team', TeamController::class);
    Route::get('team/create', [TeamController::class, 'create'])->name('team.create');
});

require __DIR__ . '/auth.php';
