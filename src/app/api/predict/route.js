export async function POST(req) {
  // Parse the request body
  const { sepal_length, sepal_width, petal_length, petal_width } = await req.json();

  // Simple price prediction logic
  const predictedClass = (size * 100) + (bedrooms * 5000) + 10000;

  // Return the predicted price as JSON response
  return new Response(JSON.stringify({ price: predictedClass }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}