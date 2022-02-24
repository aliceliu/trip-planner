import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { formatDateRange } from './utils/timeFormatter';

function Trips() {

  const navigate = useNavigate();

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

  function onClickTrip(id: number) {
    navigate(`/trip/${id}`)
  }

  function onAddTrip() {
    navigate(`/trip/`)
  }

  return <Grid container spacing={2} p={4}>
    {trips.map(trip =>
      <Grid item xs={12} md={4} lg={2} key={'trip-' + trip.id}
      >
        <Box
          component="div"
          sx={{ textAlign: 'center' }}
          onClick={() => onClickTrip(trip.id)}
        >
          <Paper sx={{ paddingTop: 10, paddingBottom: 10 }} >
            <Typography variant="h4" component="div" gutterBottom>
              {trip.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {formatDateRange(trip.start_timestamp, trip.days)}
            </Typography>

          </Paper>
        </Box>
      </Grid>
    )}
    <Grid item xs={12} md={6} lg={4} key='add'>
      <Button
        variant="outlined"
        onClick={onAddTrip}
        startIcon={<AddIcon />}
      >
        Add Trip
      </Button>
    </Grid>
  </Grid >
}

export default Trips;
