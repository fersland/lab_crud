<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cargo;

class User extends Model
{
    use HasFactory;
    public $timestamps=false;

    protected $fillable = [
        'usuario',
        'email',
        'primerNombre', 
        'segundoNombre', 
        'primerApellido', 
        'segundoApellido',
        'idDepartamento',
        'idCargo'
    ];

    // En el modelo User.php

    public function getNombresAttribute()
    {
        return $this->primerNombre . ' ' . $this->segundoNombre;
    }


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
