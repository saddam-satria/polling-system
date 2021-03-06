import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ candidates }) => {
  const labels = candidates.map(({ name }) => (name === 'Hanna Allisa Qothrun Nada' ? 'Hanna Allisa' : name));
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Suara Kandidat',
        data: candidates.map(({ count }) => count),
        backgroundColor: ['rgba(0, 147, 255, 0.2)', 'rgba(0, 147, 200, 0.2)', 'rgba(0, 147, 150, 0.2)'],
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
