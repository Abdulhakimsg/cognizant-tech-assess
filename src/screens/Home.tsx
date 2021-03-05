import React, { ReactElement, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import { getTrafficData } from 'controllers/traffic';

const Home: React.FC = (): ReactElement => {
  const classes = useCustomStyles();

  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(
    moment(),
  );
  const [selectedTime, handleTimeChange] = useState<MaterialUiPickersDate>(
    moment(),
  );

  const onSubmit = async () => {
    try {
      const submittedDate = moment(selectedDate).format('YYYY-MM-DD');
      const submittedTime = moment(selectedTime).format('HH:mm:ss');

      const images = await getTrafficData({ submittedDate, submittedTime });

    } catch (e) {
      console.error(e);
    }
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
            <Paper elevation={3} className={classes.paper}>
              Location
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className={classes.paper}>
              Weather
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className={classes.paper}>
              Image
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default Home;
