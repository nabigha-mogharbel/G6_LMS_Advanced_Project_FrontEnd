<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Section;

class Student extends Model
{
    use HasFactory;

    protected $fillable=["first_name","last_name", "picture", "email", "phone_number"];

    public function Section(){
       return $this->belongsTo(Section::class);
    }
   public function Attendance() {
    return $this->belongsToMany(Section::class, "attendances","student_id","section_id");
}
}
