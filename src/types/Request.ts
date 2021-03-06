export interface TrafficProps {
  submittedDate: string;
  submittedTime: string;
}

export interface LocationProps {
  lat: number;
  lon: number;
}

export interface WeatherProps {
  date_time: TrafficProps;
  date: string;
}

