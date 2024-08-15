// /api/products/
import Product from "@/lib/models/product.models";
import { connectDB } from "@/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    console.log("Received body:", body);
    const {userId, name, price, condition, description, images } = body;

    // Validate data
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: "Invalid or missing 'name'" }, { status: 400 });
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return NextResponse.json({ error: "Invalid 'price'" }, { status: 400 });
    }
    if (!condition || typeof condition !== 'string') {
      return NextResponse.json({ error: "Invalid or missing 'condition'" }, { status: 400 });
    }
    if (description && typeof description !== 'string') {
      return NextResponse.json({ error: "Invalid 'description'" }, { status: 400 });
    }
    if (!Array.isArray(images) || !images.every(img => typeof img === 'string')) {
      return NextResponse.json({ error: "Invalid 'images'" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Create a new product
    const product = new Product({
      author:userId,
      name,
      price: parseFloat(price),
      condition,
      description,
      images,
    });

    // Save the product in the database
    await product.save();

    // Respond with success
    return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
