<?php

namespace App\Http\Controllers;
use App\Models\Usuario;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /*
        $usuarios = Usuario::all();
        return response()->json($usuarios);
*/

        // TABLES REFERENCES
        $usuarios = Usuario::join('cargos', 'cargos.id', '=', 'usuarios.idCargo')
            ->get(['usuarios.*', 'cargos.nombre as car']);

        return response()->json($usuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'usuario' => 'required',
            'primerNombre' => 'required',
            'segundoNombre' => 'required',
            'primerApellido' => 'required',
            'segundoApellido' => 'required',
            'idCargo' => 'required',            
        ]);

        Usuario::create($request->post());
        return response()->json([
            'message' => 'Added Usuario!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function getUsuarioId($id)
    {
        $usuario = Usuario::find($id);
        if(is_null($usuario)) {
            return response()->json(['message' => 'Usuario no encontrado', 404]);
        }

        return response()->json($usuario::find($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $usuario = Usuario::findOrFail($request->id);

        $usuario->usuario = $request->usuario;
        $usuario->primerNombre = $request->primerNombre;
        $usuario->segundoNombre = $request->segundoNombre;
        $usuario->primerApellido = $request->primerApellido;
        $usuario->segundoApellido = $request->segundoApellido;
        $usuario->idCargo = $request->idCargo;
        $usuario->save();
        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy (Request $request, string $id)
    {
        $usuarios = Usuario::destroy($id);
        return response()->json($usuarios);
    }
}
