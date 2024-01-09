//Phase 2 of project is to add heat map of solar energy to roof tops on Google Maps API
//(function not working at present -> plan to come back to this)

// Useful blogs to review:
//https://nora-soderlund.com/articles/integrating-the-new-solar-api-in-google-maps
//https://nora-soderlund.com/articles/visualizing-potential-solar-panel-placements-in-google-maps

//ATTEMT TO PULL IN SOLAR IMAGE
async function solarHeatMapPull() {
  const result2 = await axios.get(
    `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=37.4450&location.longitude=-122.1390&radiusMeters=100&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=0.5&key=AIzaSyBBffGwsbP78ar-9dHLg11HFFpTJk-9Ux8`
  );
  //replace coordinates with:
  // ${latitude}
  // ${longitude}

  const annualFluxUrl = result2.data.annualFluxUrl;
  const dsmUrl = result2.data.dsmUrl;
  const maskUrl = result2.data.maskUrl;
  const rgbUrl = result2.data.rgbUrl;
  console.log(rgbUrl);

  const apiKey = "AIzaSyBBffGwsbP78ar-9dHLg11HFFpTJk-9Ux8";
  // const imageUrl = 'https://solar.googleapis.com/v1/geoTiff:get?id=1900bab84407651202730c5299c445c9-51337d58d8b828c2d96e1ecf01774d6d';

  const urlWithApiKey = `${rgbUrl}&key=${apiKey}`;

  const stringArray2 = [urlWithApiKey]; //annualFluxUrl, dsmUrl, maskUrl,
}

solarHeatMapPull();
