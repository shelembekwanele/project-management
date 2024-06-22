<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'viewed', 'route', 'user_id'];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
