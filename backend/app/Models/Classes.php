<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{

    protected $fillable = [
        'name',
        'description',
        'picture',
    ];
    use HasFactory;



    public function Section() {
        return $this->hasMany(Section::class);
    }
}
