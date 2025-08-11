<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Purchase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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
        $user = Auth::user();
        $hasPurchased = Purchase::where('user_id', $user->id)
                                ->where('property_id', $property->id)
                                ->exists();

        $data = [
            'id'           => $property->id,
            'title'        => $property->title ?? '',
            'address'      => $property->address ?? '',
            'price'        => $property->price ?? 0,
            'bedrooms'     => $property->bedrooms ?? 0,
            'bathrooms'    => $property->bathrooms ?? 0,
            'area'         => $property->area ?? 0,
            'description'  => $property->description ?? '',
            'image'        => $property->image ? asset('storage/' . $property->image) : null,
            'created_at'   => $property->created_at?->format('M d, Y'),
            'hasPurchased' => $hasPurchased,
        ];

        return Inertia::render('User/Properties/Show', [
            'property' => $data,
        ]);
    }

    public function purchase(Request $request, Property $property)
    {
        $user = Auth::user();

        if (Purchase::where('user_id', $user->id)->where('property_id', $property->id)->exists()) {
            return redirect()->back()->with('error', 'You already purchased this property.');
        }

        $validated = $request->validate([
            'fullName'      => ['required', 'string', 'max:255'],
            'address'       => ['required', 'string', 'max:255'],
            'age'           => ['required', 'integer', 'min:1'],
            'contactNumber' => ['required', 'string', 'max:20'],
            'money'         => ['required', 'numeric'],
        ]);

        // Check if money exactly matches property price
        if ($validated['money'] != $property->price) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['money' => 'The amount must exactly match the property price of ₱' . number_format($property->price)]);
        }

        Purchase::create([
            'user_id'        => $user->id,
            'property_id'    => $property->id,
            'purchased_at'   => now(),
            'status'         => 'pending',
            'full_name'      => $validated['fullName'],
            'address'        => $validated['address'],
            'age'            => $validated['age'],
            'contact_number' => $validated['contactNumber'],
            'money'          => $validated['money'],
        ]);

        return redirect()->route('user.properties.index')->with('success', 'Property purchase request submitted!');
    }

}
