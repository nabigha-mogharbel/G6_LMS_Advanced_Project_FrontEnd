<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Section;
use App\Models\Student;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'status'

    ];

    public function Section() {
        return $this->belongsToMany(Section::class);
    }
    public function Student() {
        return $this->belongsToMany(Student::class);
    }

}
