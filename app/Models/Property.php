<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description',
        'street_address', 'city', 'state', 'zip_code',
        'price', 'property_type', 'bedrooms', 'bathrooms',
        'area_size', 'year_built', 'status', 'images'
    ];

    protected $casts = [
        'images' => 'array',
    ];

    // Agent relationship (the user with agent role)
    public function agent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
