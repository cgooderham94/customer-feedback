/* Jest tests fail importing this chart and mocking does not work directly on deps. 
Re-exported here to allow this module to be mocked. */
export {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  type ChartData,
} from "chart.js";
export { Bar } from "react-chartjs-2";
