<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance;
use App\Models\Student;

class Section extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'capacity',
        'content',
    ];

public function Class() {
    return $this->belongsTo(Classes::class);
}

public function Student() {
    return $this->hasMany(Student::class);
}
public function Attendance() {
    return $this->hasMany(Attendance::class, "id", "section_id");
}
}