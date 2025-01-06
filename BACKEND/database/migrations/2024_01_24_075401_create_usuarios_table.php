<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('usuario', 80);
            $table->string('primerNombre', 40);
            $table->string('segundoNombre', 40);
            $table->string('primerApellido', 40);
            $table->string('segundoApellido', 40);
            $table->unsignedBigInteger('idCargo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
