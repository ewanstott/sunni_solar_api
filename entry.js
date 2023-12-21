import {
  initMap,
  getCurrentLocation,
  searchAddress,
  addMarker,
} from "./googleMapsUtils.js";
import { getSolarLocation } from "./solarLocation.js";

//DOM Refs
const geoIconButton = document.getElementById("geo-icon-button");
const rootRef = document.getElementById("root");
const searchRef = document.getElementById("search");
const spinner = `<div class="lds-hourglass"></div>`;
const showLocationButton = document.getElementById("showLocationButton");
// const getCurrentLocation = document.getElementById("getCurrentLocation");

//Event listener
geoIconButton.addEventListener("click", () => {
  getCurrentLocation(); // pulls users location on map using current location
  getSolarLocation(); //pull solar data for users current location
});

//showLocationButton to call getSolarData with updated lat / lon
showLocationButton.addEventListener("click", () => {
  searchAddress();
});

//ADD ERROR MESSAGE If data = undefined - sorry the solar imps haven’t got to your house house

export async function updateGetSolarFunctionsLatAndLon(position) {
  try {
    // const position = await getSolarLocation();
    const lat = position[0].geometry.viewport.La.hi;
    const lon = position[0].geometry.viewport.eb.hi;
    //call getSolarData with lat/lon
    getSolarData(lon, lat);
    console.log(lat);
    console.log(lon);

    //call searchAddress to update map
    // searchAddress();
  } catch (error) {
    console.error("Error getting location:", error);
  }
}

// showLocationButton.addEventListener("click", () => {
//   getSolarLocation();
//   searchAddress();
// });

export async function getSolarData(latitude, longitude) {
  //spinner
  rootRef.innerHTML = spinner;

  try {
    // const data = await getSolarLocation();

    // const { latitude, longitude } = data.coords;

    const result = await axios.get(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&key=AIzaSyBBffGwsbP78ar-9dHLg11HFFpTJk-9Ux8`
    );

    //store strings in array:
    const maxSunshine = `<strong>Maximum Sunshine Hours Per Year</strong> ${Math.floor(
      result.data.solarPotential.maxSunshineHoursPerYear
    )}`;
    // const maxSunshine = `<strong>Maximum Sunshine Hours Per Year</strong> Your Roof's Sun Tan Time! ${result.data.solarPotential.maxSunshineHoursPerYear} 🌞😎`;
    const maxArea = `<strong>Maximum area of solar panels your roof can support:</strong> ${Math.floor(
      result.data.solarPotential.wholeRoofStats.areaMeters2
    )} m2`;
    const carbonOffsetFactor = `<strong>Carbon Offset Factor</strong> (tonnes of carbon dioxide offset by installing solar panels on your roof): ${Math.floor(
      result.data.solarPotential.carbonOffsetFactorKgPerMwh
    )} CO2e`;
    const pancelCapacityWatts = `<strong>Your Roof's Power Potential: </strong> ${Math.floor(
      result.data.solarPotential.panelCapacityWatts
    )} watts ⚡️💪`;
    // const pancelCapacityWatts = `<strong>Your Roof's Power Potential</strong> / Your Roof's Electrical Bragging Rights! ${result.data.solarPotential.panelCapacityWatts} watts ⚡️💪`;

    //Array to store strings
    const stringArray = [
      maxSunshine,
      maxArea,
      carbonOffsetFactor,
      pancelCapacityWatts,
    ];
    //clear spinner
    rootRef.innerHTML = "";

    // Function to display strings in the DOM
    function displayStatsInDom() {
      //for loop to add each string as a p
      //   for (let i = 0; i < stringArray.length; i++)
      stringArray.forEach((str) => {
        const paragraph = document.createElement("p"); // creates a new HTML paragraph element (<p>).
        paragraph.innerHTML = str; //sets the text content of the paragraph element to the current string (str) from the array.
        rootRef.appendChild(paragraph); //appends the new paragraph to the rootRef
      });
    }
    displayStatsInDom();
  } catch (err) {
    rootRef.innerHTML = `Uh-oh! It seems like CO2, the sneaky villain, has put our Solar API to sleep! 😱☀️ Don't worry, our superhero developers are on the case. Please try again later and let's show that CO2 who's boss! 💪🌍 #CO2VSVictory`;
  }
}
// getSolarData();
initMap();
