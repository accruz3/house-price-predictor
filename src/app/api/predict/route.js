// src/app/api/predict/route.js

export async function POST(req) {
  // Parse the request body
  const { size, bedrooms } = await req.json();

  // Simple price prediction logic
  const predictedPrice = (size * 100) + (bedrooms * 5000) + 10000;

  // Return the predicted price as JSON response
  return new Response(JSON.stringify({ price: predictedPrice }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}