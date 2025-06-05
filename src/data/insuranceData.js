// src/data/insuranceData.js (o donde prefieras)
export const locations = [
  { id: 'none', name: 'Seleccione localidad...' },
  { id: 'ciudad_a', name: 'Ciudad Alpha' },
  { id: 'ciudad_b', name: 'Ciudad Beta' },
  { id: 'ciudad_c', name: 'Ciudad Gamma' },
];

export const insurancePlansByLocation = {
  ciudad_a: [
    { id: 'plan_a_basic', name: 'Plan Alpha Básico', price: 50 },
    { id: 'plan_a_premium', name: 'Plan Alpha Premium', price: 100 },
  ],
  ciudad_b: [
    { id: 'plan_b_standard', name: 'Plan Beta Estándar', price: 70 },
    { id: 'plan_b_full', name: 'Plan Beta Completo', price: 120 },
  ],
  ciudad_c: [
    { id: 'plan_c_eco', name: 'Plan Gamma Eco', price: 60 },
    { id: 'plan_c_plus', name: 'Plan Gamma Plus', price: 90 },
    { id: 'plan_c_vip', name: 'Plan Gamma VIP', price: 150 },
  ],
  none: [], // Sin planes si no se selecciona localidad
};

export const getPlansForLocation = (locationId) => {
  return insurancePlansByLocation[locationId] || [];
};