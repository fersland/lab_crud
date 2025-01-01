<?php

namespace App\Http\Controllers;
use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $departamento = Departamento::all();
        return response()->json($departamento);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required',
            'nombre' => 'required',
            'activo' => 'required'
        ]);

        Departamento::create($request->post());
        return response()->json([
            'message' => 'Added Department!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function getDepartamentoId($id)
    {
        $departamento = Departamento::find($id);
        if(is_null($departamento)) {
            return response()->json(['message' => 'Departamento no encontrado', 404]);
        }

        return response()->json($departamento::find($id), 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $departamento = Departamento::findOrFail($request->id);
        $departamento->nombre = $request->nombre;
        $departamento->activo = $request->activo;

        $departamento->save();
        return $departamento;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy (Request $request, string $id)
    {
        $departamentos = Departamento::destroy($id);
        return response()->json($departamentos);
    }
}
