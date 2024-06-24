<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'startDate', 'endDate', 'status', 'user_id'];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function createBy()
    {
        return $this->belongsTo(User::class);
    }
}
