import axios from 'axios';
import { APIs } from 'constants/api';
import { WeatherProps } from 'types/Request';

export const getWeatherData = async (props: WeatherProps) => {
  const res = await axios.get(APIs.WEATHER, {
    params: {
      date_time: `${props.date_time.submittedDate}T${props.date_time.submittedTime}`,
      date: `${props.date}`,
    },
  });

  return res.data;
};
