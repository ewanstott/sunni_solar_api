export function calculateEnergyConsumption(monthlyBill, costOfElectricity) {
  // Calulate estimated Household Energy Consumption
  const monthlyKWhEnergyConsumption = parseFloat(
    monthlyBill / costOfElectricity
  );
  // Calculate annual energy consumption
  const annualKWhEnergyConsumption = parseFloat(
    monthlyKWhEnergyConsumption * 12
  );
  // Calculate annual costs
  const annualCost = parseFloat(annualKWhEnergyConsumption * costOfElectricity);

  return {
    monthlyKWhEnergyConsumption,
    annualKWhEnergyConsumption,
    annualCost: annualCost, // Convert to float
  };
}

export function calculateEnergySaved(maxArrayPanelsCount, costOfElectricity) {
  //may need to add 'result.data.solarPotential.maxArrayPanelsCount'
  const yearlyEnergyDcKwh = parseInt(maxArrayPanelsCount * 257);
  const annualSavings = parseInt(yearlyEnergyDcKwh * costOfElectricity);
  return {
    yearlyEnergyDcKwh,
    annualSavings,
  };
}

export function calculateTotalSavings(annualCost, annualSavings) {
  const totalSavings = parseInt(annualCost - annualSavings);
  return totalSavings;
}
