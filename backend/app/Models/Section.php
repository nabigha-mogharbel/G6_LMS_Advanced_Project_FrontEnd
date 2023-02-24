<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'capacity',
        'content',
    ];

public function classes() {
    return $this->belongsTo(Classes::class);
}

public function students() {
    return $this->hasMany(students::class);
}

}