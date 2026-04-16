



const FormatResult = (resp) => {
  const result = new Map();

  resp.forEach((item) => {
    // Drizzle joins sometimes nest objects under table names
    const car = item.carListing;
    const images = item.carImages;

    if (!car) return;

    if (!result.has(car.id)) {
      result.set(car.id, {
        ...car,
        images: [],
      });
    }

    if (images) {
      result.get(car.id).images.push(images);
    }
  });

  // Sort images by ID to ensure the main image is first, 
  // and preserve the original order of cars from the Map (insertion order)
  return Array.from(result.values()).map(car => ({
    ...car,
    images: car.images.sort((a, b) => a.id - b.id)
  }));
};

export default {
    FormatResult
}