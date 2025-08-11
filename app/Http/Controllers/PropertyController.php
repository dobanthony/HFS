<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    // List properties for buyers
    public function index()
    {
        $properties = Property::with('agent')
            ->where('status', 'available')
            ->paginate(10);

        return Inertia::render('Buyer/Properties', [
            'properties' => $properties,
        ]);
    }

    // Show form to create a property (for agents)
    public function create()
    {
        return Inertia::render('Agent/PropertyCreate');
    }

    // Store new property (agent)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'street_address' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'price' => 'required|numeric|min:0',
            'property_type' => 'required|in:house,condo,apartment,townhouse,land,other',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'area_size' => 'nullable|integer|min:0',
            'year_built' => 'nullable|digits:4|integer|min:1800|max:' . date('Y'),
            'status' => 'required|in:available,pending,sold',
            'images' => 'nullable|array',
            'images.*' => 'string',
        ]);

        $property = new Property($request->all());
        $property->user_id = Auth::id(); // assign to logged-in agent
        $property->save();

        return redirect()->route('agent.properties.index')->with('success', 'Property created successfully');
    }

    // List properties owned by the logged-in agent
    public function agentIndex()
    {
        $properties = Property::where('user_id', Auth::id())->paginate(10);

        return Inertia::render('Agent/PropertyIndex', [
            'properties' => $properties,
        ]);
    }

    // Show a single property detail (for buyers)
    public function show(Property $property)
    {
        $property->load('agent');

        if ($property->status !== 'available') {
            abort(404);
        }

        return Inertia::render('Buyer/PropertyShow', [
            'property' => $property,
        ]);
    }
}
