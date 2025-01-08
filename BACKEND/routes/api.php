<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// => http://127.0.0.1:8000/api/

// CARGOS
Route::get('cargos', [CargoController::class, 'index']);
Route::get('cargos/show/{id}', [CargoController::class, 'getCargoId']);
Route::post('cargos/store', [CargoController::class, 'store']);
Route::put('cargos-edit/{id}', 'App\Http\Controllers\CargoController@update');
Route::delete('cargos/{id}', 'App\Http\Controllers\CargoController@destroy');

// DEPARTAMENTOS
Route::get('departamentos', [DepartamentoController::class, 'index']);
Route::get('departamentos/show/{id}', [DepartamentoController::class, 'getDepartamentoId']);
Route::post('departamentos/store', [DepartamentoController::class, 'store']);
Route::put('departamentos-edit/{id}', 'App\Http\Controllers\DepartamentoController@update');
Route::delete('departamentos/{id}', 'App\Http\Controllers\DepartamentoController@destroy');

// USUARIOS
Route::get('usuarios', [UserController::class, 'index']);
Route::get('usuarios/show/{id}', [UserController::class, 'getUsuarioId']);
Route::post('usuarios/store', [UserController::class, 'store']);
Route::put('usuarios-edit/{id}', [UserController::class, 'update']);
Route::delete('usuarios-del/{id}', 'App\Http\Controllers\UserController@destroy');
route::get('usuarios/sdepartamentos/{id}', [UserController::class, 'obtenerUsuariosPorDepartamento']);
route::get('usuarios/scargos/{id}', [UserController::class, 'obtenerUsuariosPorCargo']);


Route::get('/test-env', function () {
    return env('TEST_VARIABLE', 'No se encuentra la variable');
});