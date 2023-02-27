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
        'status',
        "date"

    ];

   /* public function Section() {
        return $this->belongsTo(Section::class);
    }
    public function Student() {
        return $this->belongsTo(Student::class);
    }*/

}
