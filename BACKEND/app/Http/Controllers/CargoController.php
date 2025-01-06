<?php

namespace App\Http\Controllers;
use App\Models\Cargo;
use Illuminate\Http\Request;

class CargoController extends Controller
{
    public function index()
    {
        $cargo = Cargo::all();

        if ($cargo->isEmpty()) {
            return response()->json(['message' => 'No users found.'], 404);
        }

        return response()->json($cargo);
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required',
            'nombre' => 'required',
            'activo' => 'required',
            'idUsuarioCreacion' => 'required'
        ]);

        Cargo::create($request->post());
        return response()->json(['message' => 'Added Cargo!']);
    }

    public function getCargoId($id)
    {
        $cargo = Cargo::find($id);
        if(is_null($cargo)) {
            return response()->json(['message' => 'Cargo no encontrado', 404]);
        }

        return response()->json($cargo::find($id), 200);
    }

    public function update(Request $request, string $id)
    {
        $cargos = Cargo::findOrFail($request->id);
        $cargos->codigo = $request->codigo;
        $cargos->nombre = $request->nombre;
        $cargos->activo = $request->activo;
        $cargos->idUsuarioCreacion = $request->idUsuarioCreacion;

        $cargos->save();
        return $cargos;
    }

    public function destroy (Request $request, string $id)
    {
        $cargos = Cargo::destroy($id);
        return response()->json($cargos);
    }
}
