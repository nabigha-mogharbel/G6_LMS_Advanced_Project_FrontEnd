<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        
    ];



    use HasFactory;

public function Admin() {
    return $this->belongsTo(self::class, "admin_created_id", "id");
}

public function Admin_child() {
    return $this->hasMany(self::class, "id", "admin_created_id");
}
}
