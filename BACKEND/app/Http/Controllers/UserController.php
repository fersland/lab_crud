<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function index()
    {
        $users = User::join('cargos', 'cargos.id', '=', 'users.idCargo')
            ->join('departamentos', 'departamentos.id', '=', 'users.idDepartamento')
            ->select('users.*', 'cargos.nombre as car', 'departamentos.nombre as dep')
            ->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found.'], 404);
        }

        return response()->json($users);
    }

    public function obtenerUsuariosPorDepartamento($departamentoId)
    {
        $usuarios = User::join('cargos', 'cargos.id', '=', 'users.idCargo')
                        ->join('departamentos', 'departamentos.id', '=', 'users.idDepartamento')
                        ->where('users.idDepartamento', $departamentoId)
                        ->get([
                            'users.*',
                            'departamentos.nombre as dep', 
                            'cargos.nombre as car'
                        ]);
        return response()->json($usuarios);
    }

    public function obtenerUsuariosPorCargo($cargoId)
    {
        $usuarios = User::join('cargos', 'cargos.id', '=', 'users.idCargo')
                        ->join('departamentos', 'departamentos.id', '=', 'users.idDepartamento')
                        ->where('users.idCargo', $cargoId)
                        ->get([
                            'users.*',
                            'departamentos.nombre as dep', 
                            'cargos.nombre as car'
                        ]);
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'usuario' => 'required',
            'email' => 'required',
            'primerNombre' => 'required',
            'segundoNombre' => '',
            'primerApellido' => 'required',
            'segundoApellido' => '',
            'idDepartamento' => 'required',
            'idCargo' => 'required',            
        ]);

        User::create($request->post());
        return response()->json([
            'message' => 'Usuario registrado correctamente!'
        ]);
    }

    public function getUsuarioId($id)
    {
        $usuario = User::find($id);
        if(is_null($usuario)) {
            return response()->json(['message' => 'Usuario no encontrado', 404]);
        }

        return response()->json($usuario::find($id), 200);
    }

    public function update(Request $request, string $id)
    {
        $usuario = User::findOrFail($request->id);

        $usuario->usuario = $request->usuario;
        $usuario->email = $request->email;
        $usuario->primerNombre = $request->primerNombre;
        $usuario->segundoNombre = $request->segundoNombre;
        $usuario->primerApellido = $request->primerApellido;
        $usuario->segundoApellido = $request->segundoApellido;
        $usuario->idDepartamento =  $request->idDepartamento;
        $usuario->idCargo = $request->idCargo;
        $usuario->save();
        return $usuario;
    }

    public function destroy (Request $request, string $id)
    {
        $usuarios = User::destroy($id);
        return response()->json($usuarios);
    }
}
