import axios from 'axios';
import { APIs } from 'constants/api';
import { LocationProps } from 'types/Request';

export const getAddressData = async (props: LocationProps) => {
  const res = await axios.get(APIs.REVERSE_GEOCODE, {
    params: {
      latitude: `${props.lat}`,
      longitude: `${props.lon}`,
      localityLanguage: 'en',
    },
  });

  return res.data;
};
