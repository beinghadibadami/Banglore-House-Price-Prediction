import { NextResponse } from "next/server"

const API_BASE_URL = "https://banglore-house-price-prediction-0ssa.onrender.com"

export async function GET() {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/get_location_names`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch locations")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching locations:", error)

    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 })
  }
}
