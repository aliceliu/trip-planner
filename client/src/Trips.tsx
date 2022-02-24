import { useEffect, useState } from "react";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { formatDateRange } from './utils/timeFormatter';

function Trips() {

  const [trips, setTrips] = useState<any[]>([[]]);

  useEffect(() => {
    axios.get(`/trips/`)
      .then(function (response) {
        setTrips(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  return <Grid container spacing={2} p={4}>
    {trips.map(trip =>
      <Grid item xs={12} md={4} lg={2} key={'trip-' + trip.id}
      >
        <a href={`/trip/${trip.id}`} style={{ textDecoration: 'none' }}>
          <Paper sx={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} >
            <Typography variant="h4" component="div" gutterBottom>
              {trip.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {formatDateRange(trip.start_timestamp, trip.days)}
            </Typography>
          </Paper>
        </a>
      </Grid>
    )}
    <Grid item xs={12} md={6} lg={4} key='add'>
      <Button
        variant="outlined"
        href={`/trip/`}
        startIcon={<AddIcon />}
      >
        Add Trip
      </Button>
    </Grid>
  </Grid >
}

export default Trips;
