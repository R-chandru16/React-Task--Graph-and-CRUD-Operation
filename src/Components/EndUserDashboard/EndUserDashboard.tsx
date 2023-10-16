import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: ''
    }
  }
};

const EndUserDashBoard = (props: { data: any; }) => {
  const { data } = props;
  const departmentLabels = Object.keys(data[0]);
  const roleLabels = Object.keys(data[1]);

  const departmentData = {
    labels: departmentLabels,
    datasets: [
      {
        label: 'Departments',
        data: data[0],
        backgroundColor: ['grey', 'green', 'blue', 'bisque']
      }
    ]
  };

  const roleData = {
    labels: roleLabels,
    datasets: [
      {
        label: 'Role',
        data: data[1],
        backgroundColor: ['blue', 'red']
      }
    ]
  };

  return (
    <div>
      <div>
        <h2>Count of Department</h2>
        <Bar data={departmentData} options={chartOptions} />
      </div>
      <div>
        <h2>Count of Roles</h2>
        <Bar data={roleData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EndUserDashBoard;
