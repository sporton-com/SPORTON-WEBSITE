import Product from "@/lib/models/product.models";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();

    const user = await User.findOne({ id: userId });
    const product = await Product.findById(productId);

    if (!user || !product) {
      return NextResponse.json(
        { error: "User or Product not found" },
        { status: 404 }
      );
    }

    user.cart.push(product._id);
    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { userId } = await req.json();
    const user = await User.findOne({ id: userId }).populate("cart");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
