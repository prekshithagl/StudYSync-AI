import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  ArcElement,
  PointElement,
  Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

export const palette = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export function chartData(items, label) {
  return {
    labels: items.map((item) => item.label),
    datasets: [{
      label,
      data: items.map((item) => item.value),
      backgroundColor: palette,
      borderColor: '#2563eb',
      tension: 0.35
    }]
  };
}
