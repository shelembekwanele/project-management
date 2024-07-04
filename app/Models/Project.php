<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Team;
use App\Models\Task;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'startDate', 'endDate', 'status', 'user_id', 'team_id'];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // Project belongs to a Team
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    // Project belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
