import axios from 'axios';
import { APIs } from 'constants/api';
import { TrafficProps } from 'types/Request';

export const getTrafficData = async (props: TrafficProps) => {
  const res = await axios.get(APIs.TRAFFIC, {
    params: { date_time: `${props.submittedDate}T${props.submittedTime}` },
  });

  return res.data.items[0].cameras;
};
