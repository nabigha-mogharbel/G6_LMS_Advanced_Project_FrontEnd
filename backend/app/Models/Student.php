<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Section;
use App\Models\Attendance;

class Student extends Model
{
    use HasFactory;

    protected $fillable=["first_name","last_name", "picture", "email", "phone_number"];

    public function section(){
       return $this->belongsTo(Section::class);
    }
   public function attendance() {
    return $this->hasMany(Attendance::class);
}
}
