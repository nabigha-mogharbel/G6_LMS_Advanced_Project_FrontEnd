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
        'status',
        "section_id"

    ];

 /*   public function sections() {
        return $this->belongsToMany(Section::class, "section_id", "id");
    }*/
    public function students() {
        return $this->belongsToMany(Student::class);
    }

}
