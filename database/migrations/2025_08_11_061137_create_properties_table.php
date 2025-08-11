<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('address');
            $table->decimal('price', 15, 2);
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->float('area')->nullable();
            $table->string('image')->nullable(); // Image filename or path
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
