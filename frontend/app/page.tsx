"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, MapPin, Square, Bed, Bath, TrendingUp, Loader2, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PredictionResult {
  predicted_price: number
}

export default function HousePricePrediction() {
  const [locations, setLocations] = useState<string[]>([])
  const [formData, setFormData] = useState({
    location: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [error, setError] = useState("")
  const [showResult, setShowResult] = useState(false)

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoadingLocations(true)
      const response = await fetch("/api/get_location_names")
      if (!response.ok) throw new Error("Failed to fetch locations")
      const data = await response.json()
      setLocations(data.locations || data || [])
    } catch (err) {
      setError("Failed to load locations")
      console.error("Error fetching locations:", err)
    } finally {
      setLoadingLocations(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateForm = () => {
    if (!formData.location) return "Please select a location"
    if (!formData.sqft || Number.parseFloat(formData.sqft) <= 0) return "Please enter valid square feet"
    if (!formData.bedrooms || Number.parseInt(formData.bedrooms) <= 0) return "Please enter valid number of bedrooms"
    if (!formData.bathrooms || Number.parseFloat(formData.bathrooms) <= 0)
      return "Please enter valid number of bathrooms"
    return null
  }

  const handlePredict = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError("")
      setShowResult(false)

      const response = await fetch("/api/predict_house_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          sqft: Number.parseFloat(formData.sqft),
          bedrooms: Number.parseInt(formData.bedrooms),
          bathrooms: Number.parseFloat(formData.bathrooms),
        }),
      })

      if (!response.ok) throw new Error("Prediction failed")

      const result = await response.json()
      setPrediction({ predicted_price: result.estimated_price })
      console.log("Prediction API result:", result.estimated_price)


      // Animate result appearance
      setTimeout(() => setShowResult(true), 100)
    } catch (err) {
      setError("Failed to get prediction. Please try again.")
      console.error("Error predicting price:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
  if (price >= 100) {
    const crores = price / 100
    return `₹${crores.toFixed(2)} Crore${crores >= 2 ? 's' : ''}`
  } else {
    return `₹${price.toFixed(2)} Lakh${price >= 2 ? 's' : ''}`
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
              <Home className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              House Price Predictor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Get accurate house price predictions using advanced machine learning</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Property Details
              </CardTitle>
              <CardDescription className="text-base">
                Enter the property information to get a price prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleInputChange("location", value)}
                  disabled={loadingLocations}
                >
                  <SelectTrigger className="h-12 border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder={loadingLocations ? "Loading locations..." : "Select a location"} />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Square Feet */}
              <div className="space-y-2">
                <Label htmlFor="sqft" className="text-sm font-medium flex items-center gap-2">
                  <Square className="w-4 h-4 text-green-600" />
                  Square Feet
                </Label>
                <Input
                  id="sqft"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.sqft}
                  onChange={(e) => handleInputChange("sqft", e.target.value)}
                  className="h-12 border-2 focus:border-green-500 transition-colors"
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-sm font-medium flex items-center gap-2">
                  <Bed className="w-4 h-4 text-purple-600" />
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  className="h-12 border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="text-sm font-medium flex items-center gap-2">
                  <Bath className="w-4 h-4 text-orange-600" />
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  className="h-12 border-2 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50 animate-shake">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {/* Predict Button */}
              <Button
                onClick={handlePredict}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Predict Price
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card
            className={`shadow-xl border-0 bg-white/80 backdrop-blur-sm transition-all duration-500 ${showResult ? "animate-slide-up" : "opacity-50"}`}
          >
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <DollarSign className="w-6 h-6 text-green-600" />
                Price Prediction
              </CardTitle>
              <CardDescription className="text-base">AI-powered house price estimation</CardDescription>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div
                  className={`space-y-6 transition-all duration-700 ${showResult ? "animate-fade-in" : "opacity-0"}`}
                >
                  {/* Main Price Display */}
                  <div className="text-center p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-100">
                    <div className="text-sm text-gray-600 mb-2">Estimated Price</div>
                    <div className="text-4xl font-bold text-green-600 animate-pulse-slow">
                      {formatPrice(prediction.predicted_price)}
                    </div>
                  </div>

                  {/* Property Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                      <Square className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Square Feet</div>
                      <div className="font-semibold">{formData.sqft}</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl text-center">
                      <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-semibold text-xs">{formData.location}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl text-center">
                      <Bed className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Bedrooms</div>
                      <div className="font-semibold">{formData.bedrooms}</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl text-center">
                      <Bath className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Bathrooms</div>
                      <div className="font-semibold">{formData.bathrooms}</div>
                    </div>
                  </div>

                  {/* Price per sqft */}
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <div className="text-sm text-gray-600 mb-1">Price per Square Foot</div>
                    <div className="text-xl font-semibold text-gray-800">
                      {formatPrice(prediction.predicted_price / Number.parseFloat(formData.sqft))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Home className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Enter property details and click predict to see the estimated price</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
