//the information about each solar panel configuration that you need for financial analysis is provided in the SolarPanelConfig field.

//e.g
// const maxSunshine = `<strong>Maximum Sunshine Hours Per Year</strong> ${Math.floor(
//     result.data.solarPotential.maxSunshineHoursPerYear
//   )}`;

//ENERGY CONSUMPTION
//user input
const monthlyBill = 100;
// Cost of electricity per kWh (user input)
const costOfElectricity = 0.28;
// Calulate estimated Household Energy Consumption
const monthlyKWhEnergyConsumption = monthlyBill / costOfElectricity;
// Calculate annual energy consumption
const annualKWhEnergyConsumption = monthlyKWhEnergyConsumption * 12;
// Calculate annual costs
annualCost = annualKWhEnergyConsumption * costOfElectricity;
// Calculate total costs over 20 years

//ENERGY SAVED BY INSTALLING SOLAR PANELS
const yearlyEnergyDcKwh = result.data.solarPanelConfigs.yearlyEnergyDcKwh; //required - How much solar energy a layout captures over the course of a year
const annualSavings = yearlyEnergyDcKwh * costOfElectricity;

//TOTALS
const totalSavings = annualCost - annualSavings;
const totalSavingsOver20Years = totalSavings * 20;
// Display to the DOM
console.log(
  "Estimated Total Savings over 20 Years: £" + totalSavingsOver20Years
);

//ENVIRONMENTAL IMPACT
//Cars Equivalent Factor: 1.0 metric ton / 0.2 cars = 5.0 cars/metric ton
const carsEquivalent = carbonOffsetFactor / 4.6; //A typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year
//Trees Equivalent Factor: 1.0 metric ton / 16.6 trees = 0.0602 trees/metric ton
const treesEquivalent = carbonOffsetFactor / 0.0602; //
console.log("Estimated cars taken off the road: " + carsEquivalent);
console.log("Estimated tree seedlings grown: " + treesEquivalent);

//additional info
// const panelsCount = result.data.solarPanelConfigs.panelsCount; //required
// const panelCapacityWatts = result.data.solarPanelConfigs.panelCapacityWatts;
// const installationSize = (panelsCount * panelCapacityWatts) / 1000; //kW
// //annual solar energy AC production
// const initialAcKwhPerYear = yearlyEnergyDcKwh * dcToAcDerate;
