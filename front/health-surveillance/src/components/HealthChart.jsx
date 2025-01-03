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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const HealthChart = ({ healthData, averages }) => {
  // Formatear las fechas
  const formattedDates = healthData.map((data) =>
    new Date(data.createdAt).toLocaleDateString()
  );

  // Extraer valores para cada métrica
  const heartRates = healthData.map((data) => data.heartRate);
  const systolicPressures = healthData.map((data) =>
    parseInt(data.bloodPressure.split("/")[0])
  ); // Extraer solo la sistólica
  const oxygenLevels = healthData.map((data) => data.oxygenLevel);

  // Datos para el gráfico
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

  // Opciones para el gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Health Metrics Over Time",
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default HealthChart;
