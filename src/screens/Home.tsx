import React, { ReactElement, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import useCustomStyles from 'theme/CustomStyles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { findNearest } from 'geolib';

import { getTrafficData } from 'controllers/traffic';
import { getAddressData } from '../controllers/location';
import { getWeatherData } from '../controllers/weather';

const Home: React.FC = (): ReactElement => {
  const classes = useCustomStyles();

  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment(),
  );
  const [selectedTime, handleTimeChange] = useState<MaterialUiPickersDate>(
    moment(),
  );
  const [locations, setLocations] = useState<any>(null); // TODO: use proper type
  const [selectedLoc, setSelectedLoc] = useState<any>(null);

  const onSubmit = async () => {
    try {
      const submittedDate = moment(selectedDate).format('YYYY-MM-DD');
      const submittedTime = moment(selectedTime).format('HH:mm:ss');

      const trafficRes = await getTrafficData({ submittedDate, submittedTime });
      const weatherRes = await getWeatherData({
        date_time: { submittedDate, submittedTime },
        date: submittedTime,
      });

      const findForecast = (lat: number, lon: number) => {
        const locationMetaData = weatherRes.area_metadata;
        const locationArr = locationMetaData.map((value: any) => {
          return value.label_location;
        });

        const x = findNearest({ latitude: lat, longitude: lon }, locationArr);
        let town: null = null;
        let forecast = null;
        locationMetaData.map((v: any) => {
          if (v.label_location === x) {
            town = v.name;
            return;
          }
        });

        weatherRes.items[0].forecasts.map((v: any) => {
          if (v.area === town) {
            forecast = v.forecast;
          }
        });
        return forecast;
      };

      const locationRes = await trafficRes.map(async (v: any) => ({
        ...v,
        address: await getAddressData({
          lat: v.location.latitude,
          lon: v.location.longitude,
        }),
        forecast: findForecast(v.location.latitude, v.location.longitude),
      }));

      const res: unknown = await Promise.all(locationRes);
      setLocations(res);
    } catch (e) {
      setLocations(null)
      setSelectedLoc(null)
      console.error(e);
    }
  };

  const generate = () => {
    if (!locations) {
      return <h1>No Result</h1>;
    } else {
      return locations.map((value: any, index: number) => {
        return (
          <div>
            <Link onClick={() => setSelectedLoc(value)}>
              {value.address.locality}
            </Link>
          </div>
        );
      });
    }
  };

  const renderImage = () => {
    return <img src={selectedLoc.image} />;
  };

  const renderForecast = () => {
    return <h1>{selectedLoc.forecast}</h1>;
  };


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Box className={classes.root} pt={4}>
        <Grid container spacing={3}>
          <Grid item xs={5} md={4}>
            <Paper elevation={3} className={classes.paper}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling
              />
            </Paper>
          </Grid>
          <Grid item xs={5} md={4}>
            <Paper elevation={3} className={classes.paper}>
              <TimePicker
                autoOk
                label="12 hours"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </Paper>
          </Grid>
          <Grid container alignItems="center" item xs={2} md={2}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              className={classes.paper}
              style={{ maxHeight: 300, overflow: 'auto' }}>
              {generate()}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className={classes.paper}>
              {selectedLoc && renderForecast()}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              style={{ maxHeight: 500, overflow: 'auto' }}
              elevation={3}
              className={classes.paper}>
              {selectedLoc && renderImage()}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default Home;
