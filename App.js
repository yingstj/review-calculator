// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [employeeCount, setEmployeeCount] = useState(100);
  const [managerSalary, setManagerSalary] = useState(120000);
  const [employeeSalary, setEmployeeSalary] = useState(80000);
  const [managerHours, setManagerHours] = useState(17);
  const [employeeHours, setEmployeeHours] = useState(5);
  const [adminHours, setAdminHours] = useState(2);

  const [totalCost, setTotalCost] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [productivityImpact, setProductivityImpact] = useState(0);

  const managerHourlyRate = managerSalary / 2080;
  const employeeHourlyRate = employeeSalary / 2080;

  useEffect(() => {
    const managerCount = Math.ceil(employeeCount / 10);

    const managerTimeCost = managerCount * managerHours * managerHourlyRate * (employeeCount / 10);
    const employeeTimeCost = employeeCount * employeeHours * employeeHourlyRate;
    const adminTimeCost = employeeCount * adminHours * employeeHourlyRate;

    const totalManagerHours = managerCount * managerHours * (employeeCount / 10);
    const totalEmployeeHours = employeeCount * employeeHours;
    const totalAdminHours = employeeCount * adminHours;

    const weeklyProductivity = employeeCount * employeeSalary / 52;
    const lostProductivity = weeklyProductivity * 0.05 * 2;

    setTotalCost(managerTimeCost + employeeTimeCost + adminTimeCost + lostProductivity);
    setTotalHours(totalManagerHours + totalEmployeeHours + totalAdminHours);
    setProductivityImpact(lostProductivity);
  }, [
    employeeCount, managerSalary, employeeSalary,
    managerHours, employeeHours, adminHours,
    managerHourlyRate, employeeHourlyRate
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Performance Review Cost Calculator</h2>
        <p className="text-gray-600 mb-10 text-center">Calculate the true organizational cost of your annual performance review process</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Organization Parameters</h3>
            <Input label="Number of Employees" value={employeeCount} onChange={setEmployeeCount} />
            <Input label="Average Manager Annual Salary ($)" value={managerSalary} onChange={setManagerSalary} />
            <Input label="Average Employee Annual Salary ($)" value={employeeSalary} onChange={setEmployeeSalary} />
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Time Investment</h3>
            <Input label="Hours Spent by Manager (per employee reviewed)" value={managerHours} onChange={setManagerHours} helper="Industry average: 17 hours" />
            <Input label="Hours Spent by Employee (preparation and meeting)" value={employeeHours} onChange={setEmployeeHours} helper="Industry average: 5 hours" />
            <Input label="Administrative Hours (HR, systems, follow-up)" value={adminHours} onChange={setAdminHours} helper="Industry average: 2 hours" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResultCard title="Total Cost" value={`$${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} color="blue" />
            <ResultCard title="Total Hours" value={totalHours.toLocaleString(undefined, { maximumFractionDigits: 0 })} color="green" />
            <ResultCard title="Productivity Impact" value={`$${productivityImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} color="red" />
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 shadow">
            <h4 className="font-semibold text-yellow-900 mb-2">What could your organization do instead?</h4>
            <p className="text-gray-700 leading-relaxed">
              {totalHours.toLocaleString()} hours equals approximately {Math.round(totalHours / 2080)} full-time employees for an entire year.
              This is time that could be spent on innovation, customer service, or team development.
            </p>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500 text-center">
          <p>Based on research from Deloitte, Gallup, and Corporate Executive Board</p>
          <p>This calculator provides estimates only and should not be considered financial advice.</p>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange, helper }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="number"
      min="0"
      step="0.5"
      value={value}
      onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
  </div>
);

const ResultCard = ({ title, value, color }) => {
  const colorMap = {
    blue: 'border-blue-500 text-blue-600',
    green: 'border-green-500 text-green-600',
    red: 'border-red-500 text-red-600',
  };

  return (
    <div className={`bg-white p-5 rounded-xl shadow-md border-l-8 ${colorMap[color]}`}>
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-sm text-gray-500">Estimated value</p>
    </div>
  );
};

export default App;
