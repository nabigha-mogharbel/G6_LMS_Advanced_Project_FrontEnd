<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Section;

class Classes extends Model
{

    protected $fillable = [
        'name',
        'floor'
    ];
    use HasFactory;



    public function Section() {
        return $this->hasMany(Section::class, "id", "class_id");
    }
}
