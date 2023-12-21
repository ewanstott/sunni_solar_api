//the information about each solar panel configuration that you need for financial analysis is provided in the SolarPanelConfig field.

//e.g
// const maxSunshine = `<strong>Maximum Sunshine Hours Per Year</strong> ${Math.floor(
//     result.data.solarPotential.maxSunshineHoursPerYear
//   )}`;

const panelsCount = result.data.solarPanelConfigs.panelsCount;
const yearlyEnergyDcKwh = result.data.solarPanelConfigs.yearlyEnergyDcKwh;
const panelCapacityWatts = result.data.solarPanelConfigs.panelCapacityWatts;
const installationSize = (panelsCount * panelCapacityWatts) / 1000; //kW
