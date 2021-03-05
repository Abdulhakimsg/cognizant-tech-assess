import axios from 'axios';
import { APIs } from 'constants/api';
import { TrafficProps } from 'types/Request';

export const getTrafficData = async (props: TrafficProps) => {
  return await axios.get(APIs.TRAFFIC, {
    params: { date_time: `${props.submittedDate}T${props.submittedTime}` },
  });
};
