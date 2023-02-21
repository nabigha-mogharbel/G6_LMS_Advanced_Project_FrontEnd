<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    private $fillable=["first_name","last_name", "picture", "email", "phone_number"];

    #public function section(){
     #   return $this->belongsTo(Section::class);
    #}
}
