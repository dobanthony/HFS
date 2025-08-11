<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();

            $table->string('street_address')->nullable();
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();

            $table->decimal('price', 15, 2);

            $table->enum('property_type', ['house', 'condo', 'apartment', 'townhouse', 'land', 'other'])->default('house');

            $table->unsignedInteger('bedrooms')->default(0);
            $table->unsignedInteger('bathrooms')->default(0);
            $table->unsignedInteger('area_size')->nullable();

            $table->year('year_built')->nullable();

            $table->enum('status', ['available', 'pending', 'sold'])->default('available');

            $table->json('images')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }

};
