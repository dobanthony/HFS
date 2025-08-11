<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::latest()->get()->map(function ($property) {
            return [
                'id'        => $property->id,
                'title'     => $property->title ?? '',
                'address'   => $property->address ?? '',
                'price'     => $property->price ?? 0,
                'bedrooms'  => $property->bedrooms ?? 0,
                'bathrooms' => $property->bathrooms ?? 0,
                'area'      => $property->area ?? 0,
                'description'=> $property->description ?? '',
                'image'     => $property->image ? asset('storage/' . $property->image) : null,
            ];
        });

        return Inertia::render('User/Properties/Index', [
            'properties' => $properties,
        ]);
    }

    public function show(Property $property)
    {
        $data = [
            'id'        => $property->id,
            'title'     => $property->title ?? '',
            'address'   => $property->address ?? '',
            'price'     => $property->price ?? 0,
            'bedrooms'  => $property->bedrooms ?? 0,
            'bathrooms' => $property->bathrooms ?? 0,
            'area'      => $property->area ?? 0,
            'description'=> $property->description ?? '',
            'image'     => $property->image ? asset('storage/' . $property->image) : null,
            'created_at'=> $property->created_at?->format('M d, Y'),
        ];

        return Inertia::render('User/Properties/Show', [
            'property' => $data,
        ]);
    }
}

