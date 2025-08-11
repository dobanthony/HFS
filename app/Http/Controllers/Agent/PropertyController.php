<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::latest()->get()->map(function ($property) {
            return [
                'id'          => $property->id,
                'title'       => $property->title ?? '',
                'address'     => $property->address ?? '',
                'price'       => $property->price ?? 0,
                'description' => $property->description ?? '',
                'bedrooms'    => $property->bedrooms ?? 0,
                'bathrooms'   => $property->bathrooms ?? 0,
                'area'        => $property->area ?? 0,
                'image'       => $property->image ? asset('storage/' . $property->image) : null,
                'created_at'  => $property->created_at?->format('Y-m-d H:i:s'),
                'updated_at'  => $property->updated_at?->format('Y-m-d H:i:s'),
                // Added edit & delete URLs
                'edit_url'    => route('properties.edit', $property->id),
                'delete_url'  => route('properties.destroy', $property->id),
            ];
        });

        return Inertia::render('Agent/Properties/Index', [
            'properties' => $properties,
        ]);
    }

    public function create()
    {
        return Inertia::render('Agent/Properties/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'address'     => 'required|string|max:255',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'bedrooms'    => 'nullable|integer',
            'bathrooms'   => 'nullable|integer',
            'area'        => 'nullable|numeric',
            'image'       => 'nullable|image|max:10240', // max 10MB
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('properties', 'public');
        }

        Property::create($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property created successfully.');
    }

    public function edit(Property $property)
    {
        return Inertia::render('Agent/Properties/Edit', [
            'property' => $property,
        ]);
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'address'     => 'required|string|max:255',
            'price'       => 'required|numeric',
            'description' => 'nullable|string',
            'bedrooms'    => 'nullable|integer',
            'bathrooms'   => 'nullable|integer',
            'area'        => 'nullable|numeric',
            'image'       => 'nullable|image|max:10240', // max 10MB
        ]);

        if ($request->hasFile('image')) {
            if ($property->image && Storage::disk('public')->exists($property->image)) {
                Storage::disk('public')->delete($property->image);
            }
            $validated['image'] = $request->file('image')->store('properties', 'public');
        }

        $property->update($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property)
    {
        if ($property->image && Storage::disk('public')->exists($property->image)) {
            Storage::disk('public')->delete($property->image);
        }

        $property->delete();

        return redirect()->route('properties.index')
            ->with('success', 'Property deleted successfully.');
    }
}
