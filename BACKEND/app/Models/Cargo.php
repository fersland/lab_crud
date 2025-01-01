<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Departamento;

class Cargo extends Model
{
    use HasFactory;
    //protected $dateFormat = 'YYYYMMMDD hh:mm:ss';
    public $timestamps=true;
    protected $fillable = [
        'id',
        'codigo', 
        'nombre', 
        'activo', 
        'idDepartamento'
    ];

    /**
     * Get the user that owns the Cargo
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function departamentos(): BelongsTo
    {
        return $this->belongsTo(Departamento::class);
    }

}
