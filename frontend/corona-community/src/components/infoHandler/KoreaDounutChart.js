import { Doughnut } from 'react-chartjs-2';

const KoreaDounut = props => {
  const infoJson = props.infoJson;
  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: [
      infoJson['city1n'],
      infoJson['city2n'],
      infoJson['city3n'],
      infoJson['city4n'],
      infoJson['city5n'],
    ],
    datasets: [
      {
        borderWidth: 3,
        data: [
          infoJson['city1p'],
          infoJson['city2p'],
          infoJson['city3p'],
          infoJson['city4p'],
          infoJson['city5p'],
        ],
        backgroundColor: ['blue', 'yellow', 'skyblue', 'red', 'purple'],
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default KoreaDounut;
