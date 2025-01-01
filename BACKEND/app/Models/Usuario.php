<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cargo;

class Usuario extends Model
{
    use HasFactory;
    public $timestamps=true;

    protected $fillable = [
        'usuario', 
        'primerNombre', 
        'segundoNombre', 
        'primerApellido', 
        'segundoApellido',
        'idCargo'
    ];

    /**
     * Get all of the comments for the Usuario
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cargos(): HasMany
    {
        return $this->hasMany(Cargo::class, 'id', 'idCargo');
    }
}
