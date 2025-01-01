<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cargo;

class Departamento extends Model
{
    use HasFactory;

    public $timestamps=true;

    protected $fillable = [
        'id',
        'codigo',
        'nombre',
        'activo'
    ];

    /**
     * Get all of the comments for the Departamento
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cargos(): HasMany
    {
        return $this->hasMany(Cargo::class, 'idDepartamento', 'id');
    }
}
