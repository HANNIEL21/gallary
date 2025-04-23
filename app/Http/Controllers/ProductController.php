<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all products from the database
        $products = Product::latest()->get();

        // Return the 'Products/Index' Inertia view with the products data
        return Inertia::render('Products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'title' => $data['title'],
            'category' => $data['category'],
            'image' => $data['image'] ?? null,
            'likes' => 0,
        ]);

        Product::create($data);

        return redirect()->route('product')->with('success', 'Product created successfully!');
    }



    public function guest()
    {
        return response()->json(Product::latest()->get());
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/show', [
            'product' => $product,
        ]);
    }

    public function like(Product $product)
    {
        $product->increment('likes');

        return response()->json([
            'success' => true,
            'likes' => $product->likes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
