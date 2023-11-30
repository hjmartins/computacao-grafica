import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramChart = ({ pixelValues }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the existing chart before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Calculate histogram
    const histogram = new Array(256).fill(0);
    pixelValues.forEach((row) => {
      row.forEach((pixel) => {
        histogram[pixel]++;
      });
    });

    // Create a new chart
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: histogram.map((_, index) => `Label ${index + 1}`),
          datasets: [
            {
              label: 'Histogram',
              data: histogram.map(value => parseInt(value, 10)),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }

    // Cleanup the chart when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [pixelValues]);

  return <canvas ref={chartRef} width="400" height="200" />;
};

export default HistogramChart;
