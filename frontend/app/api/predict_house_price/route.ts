import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://banglore-house-price-prediction-0ssa.onrender.com"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { location, sqft, bedrooms, bathrooms } = body

    // Validate input
    if (!location || !sqft || !bedrooms || !bathrooms) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Replace with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/predict_house_price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        sqft: Number.parseFloat(sqft),
        bedrooms: Number.parseInt(bedrooms),
        bathrooms: Number.parseFloat(bathrooms),
      }),
    })

    if (!response.ok) {
      throw new Error("Prediction API failed")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error predicting house price:", error)

    return NextResponse.json({ error: "Failed to predict house price" }, { status: 500 })
  }
}
