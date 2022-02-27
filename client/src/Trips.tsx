import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { formatDateRange } from './utils/timeFormatter';
import { auth } from './firebase';
import { getTrips } from './utils/trip';


function Trips() {

  const uid = auth.currentUser?.uid;

  const [trips, setTrips] = useState<any[]>([[]]);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (uid) {
      getTrips(uid, tab === 0 ? 'upcoming' : 'past')
        .then(tripsResult => {
          setTrips(tripsResult);
        })
        .catch(console.error);
    }
  }, [tab]);

  return <>
    <Tabs value={tab} onChange={(event, tab) => setTab(tab)} aria-label="filter">
      <Tab label="Upcoming" />
      <Tab label="Past" />
    </Tabs>
    <Grid container spacing={2} p={4}>
      {trips.map(trip =>
        <Grid item xs={12} md={4} lg={2} key={'trip-' + trip.id}
        >
          <a href={`/trip/${trip.id}`} style={{ textDecoration: 'none' }}>
            <Paper sx={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} >
              <Typography variant="h4" component="div" gutterBottom>
                {trip.name || 'Untitled'}
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
  </>
}

export default Trips;
