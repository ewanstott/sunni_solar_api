import {
  initMap,
  getCurrentLocation,
  searchAddress,
  addMarker,
} from "./googleMapsUtils.js";
import { getSolarLocation } from "./solarLocation.js";
// import { energyConsumptionCalculations } from "./costCalulations.js";

//DOM Refs
const geoIconButton = document.getElementById("geo-icon-button");
const rootRef = document.getElementById("root");
// const searchRef = document.getElementById("search");
const spinner = `<div class="lds-hourglass"></div>`;
const showLocationButton = document.getElementById("showLocationButton");
// const monthlyBill = document.getElementById("monthlyBill");
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
// monthlyBill.addEventListener('')

//ADD ERROR MESSAGE If data = undefined - sorry the solar imps haven’t got to your house house

export async function updateGetSolarFunctionsLatAndLon(position) {
  try {
    // const position = await getSolarLocation();
    const lat = position[0].geometry.viewport.La.hi;
    const lon = position[0].geometry.viewport.eb.hi;
    //call getSolarData with lat/lon
    getSolarData(lon, lat);

    //call searchAddress to update map
    // searchAddress();
  } catch (error) {
    console.error("Error getting location:", error);
  }
}

export async function getSolarData(latitude, longitude) {
  //spinner
  rootRef.innerHTML = spinner;

  try {
    const data = await getSolarLocation();
    // const calculations = await energyConsumptionCalculations(); //temp

    const { latitude, longitude } = data.coords;

    const result = await axios.get(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&key=AIzaSyBBffGwsbP78ar-9dHLg11HFFpTJk-9Ux8`
    );
    console.log(result);
    // Show address/location in DOM here:
    //add code

    //ENERGY CONSUMPTION
    //user input
    const monthlyBill = 100;
    // Cost of electricity per kWh
    const costOfElectricity = 0.28; //average UK 2024
    // Calulate estimated Household Energy Consumption
    const monthlyKWhEnergyConsumption = monthlyBill / costOfElectricity;
    // Calculate annual energy consumption
    const annualKWhEnergyConsumption = monthlyKWhEnergyConsumption * 12;
    // Calculate annual costs
    const annualCost = annualKWhEnergyConsumption * costOfElectricity; //1200

    //ENERGY SAVED BY INSTALLING SOLAR PANELS
    // const carbonOffsetFactor =
    //   result.data.solarPotential.carbonOffsetFactorKgPerMwh;
    const yearlyEnergyDcKwh =
      result.data.solarPotential.maxArrayPanelsCount * 257; //70*257 = 17990
    // max panel count * 257 (avg. yearlyEnergyDcKwh) //required - yearlyEnergyDcKwh / Panel count. How much solar energy a layout captures over the course of a year
    const annualSavings = yearlyEnergyDcKwh * costOfElectricity; // 17990 * 0.28 = 5,037.2

    //TOTALS
    const totalSavings = annualCost - annualSavings;
    // Calculate total costs over 20 years
    // const totalSavingsOver20Years = totalSavings * 20;
    //Cars Equivalent Factor: 1.0 metric ton / 0.2 cars = 5.0 cars/metric ton
    // const carsEquivalent = carbonOffsetFactor / 4.6; //A typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year
    //Trees Equivalent Factor: 1.0 metric ton / 16.6 trees = 0.0602 trees/metric ton
    // const treesEquivalent = carbonOffsetFactor / 0.0602;

    //store strings in array:
    const calculationsComplete = `<strong>✅ Calculations Complete. Your roof data: </strong>`; //try adding ${location}
    const maxSunshine = `<strong>🌞 Hours of usable sunlight per year: </strong> ${Math.floor(
      result.data.solarPotential.maxSunshineHoursPerYear
    )}`;
    const maxArea = `<strong>⚡ Maximum area of solar panels your roof can support:</strong> ${Math.floor(
      result.data.solarPotential.wholeRoofStats.areaMeters2
    )} m2`;
    const totalSavingsOver20Years = `<strong>🤑 If you install solar panels on your roof, your estimated Total Savings over 20 Years: </strong> £${Math.abs(
      Math.floor(totalSavings * 20)
    )}`;

    // const carsEquivalent = `Estimated cars taken off the road: " ${
    //   carbonOffsetFactor / 4.6
    // }`;
    // const treesEquivalent = `Estimated tree seedlings grown: " ${
    //   carbonOffsetFactor / 0.0602
    // }`;

    //Array to store strings
    const stringArray = [
      calculationsComplete,
      maxSunshine,
      maxArea,
      totalSavingsOver20Years,
      //   carsEquivalent,
      //   treesEquivalent,
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
