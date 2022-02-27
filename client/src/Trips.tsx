import { useEffect, useState } from "react";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { formatDateRange } from './utils/timeFormatter';
import { db, auth } from './firebase';


function Trips() {

  const user = auth.currentUser;
  const now = new Date();
  const todayTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const [trips, setTrips] = useState<any[]>([[]]);
  const [tab, setTab] = useState<number>(0);

  const fetchTrips = async () => {
    let result: any[] = []
    const tripsCollection = collection(db, `users/${user?.uid ?? ''}/trips`);
    if (tab === 0) {
      const q1 = query(
        tripsCollection,
        where('start_timestamp', '==', null),
      );
      const q2 = query(
        tripsCollection,
        where('start_timestamp', '>=', todayTimestamp),
        orderBy('start_timestamp')
      );
      let [q1Result, q2Result] = await Promise.all([getDocs(q1), getDocs(q2)]);
      result = [...q1Result.docs, ...q2Result.docs];
    } else {
      const q = query(
        tripsCollection,
        where('start_timestamp', '<', todayTimestamp),
        orderBy('start_timestamp', 'desc')
      );
      result = (await getDocs(q)).docs;
    }
    const tripsResult = result.map(doc => {
      const data = doc.data();
      data['id'] = doc.id;
      return data;
    });
    return tripsResult;
  };

  useEffect(() => {
    fetchTrips()
      .then(tripsResult => {
        setTrips(tripsResult);
      })
      .catch(console.error);
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
