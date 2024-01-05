async function displayTIFFImage(tiffURL, containerId) {
  try {
    // Load the GeoTIFF file
    const response = await fetch(tiffURL);
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);

    // Get the first image in the TIFF file
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();

    // Read image data as a single RGBA array
    const rgba = await image.readRasters({ interleave: true });

    // Create a Uint8ClampedArray to represent the image data
    const imageDataArray = new Uint8ClampedArray(rgba);

    // Create a Blob with the correct MIME type
    const blob = new Blob([imageDataArray], { type: "image/tiff" });

    // Create an object URL from the Blob
    const objectURL = URL.createObjectURL(blob);

    // Create an img element
    const imgElement = document.createElement("img");

    // Set the src attribute to the object URL
    imgElement.src = objectURL;

    // Append the img element to the specified container
    const container = document.getElementById(containerId);
    container.appendChild(imgElement);
  } catch (error) {
    console.error("Error loading TIFF image:", error);
  }
}

// Usage: Call this function with the URL of your TIFF image and the container ID
const tiffURL =
  "https://solar.googleapis.com/v1/geoTiff:get?id=1900bab84407651202730c5299c445c9-c9a54ee9e4d77d74829698dba72e3abd&key=AIzaSyBBffGwsbP78ar-9dHLg11HFFpTJk-9Ux8";
const containerId = "image-container";
displayTIFFImage(tiffURL, containerId);
