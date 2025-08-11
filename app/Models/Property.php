<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    // Fillable attributes for mass assignment
    protected $fillable = [
        'title',
        'description',
        'address',
        'price',
        'bedrooms',
        'bathrooms',
        'area',
        'image',
    ];
}
