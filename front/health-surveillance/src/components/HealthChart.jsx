import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../styles/HealthChart.css";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const HealthChart = ({ healthData, averages }) => {
  const formattedDates = healthData.map((data) =>
    new Date(data.createdAt).toLocaleDateString()
  );

  const heartRates = healthData.map((data) => data.heartRate);
  const systolicPressures = healthData.map((data) =>
    parseInt(data.bloodPressure.split("/")[0])
  );
  const oxygenLevels = healthData.map((data) => data.oxygenLevel);

  const chartData = {
    labels: formattedDates,
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: heartRates,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Systolic Blood Pressure (mmHg)",
        data: systolicPressures,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Oxygen Level (%)",
        data: oxygenLevels,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Average Heart Rate (bpm)",
        data: Array(healthData.length).fill(averages.averageHeartRate),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: "Average Systolic Blood Pressure (mmHg)",
        data: Array(healthData.length).fill(
          parseInt(averages.averageBloodPressure.split("/")[0])
        ),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: "Average Oxygen Level (%)",
        data: Array(healthData.length).fill(averages.averageOxygenLevel),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Health Metrics Over Time",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HealthChart;
