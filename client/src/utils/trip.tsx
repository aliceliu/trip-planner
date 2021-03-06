import { doc, addDoc, collection, getDoc, setDoc, writeBatch, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import add from 'date-fns/add'

const PENDING_TRIP_KEY = 'pendingSaveTrip';

async function getTrip(id: string) {
  const result = await getDoc(doc(db, 'trips', id));
  return result.data()
}

async function getTrips(uid: string, filter: string) {
  const now = new Date();
  const todayTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  let result: any[] = []
  const tripsCollection = collection(db, `users/${uid}/trips`);
  if (filter == 'upcoming') {
    const q1 = query(
      tripsCollection,
      where('start_timestamp', '==', null),
    );
    const q2 = query(
      tripsCollection,
      where('end_timestamp', '>=', todayTimestamp),
      orderBy('end_timestamp')
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

function getTripFromLocalStorage() {
  const result = window.localStorage.getItem(PENDING_TRIP_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return result;
}

async function addTrip(uid: string | null, data) {
  const metadata = getTripMetadata(data)
  data['creator_id'] = uid;
  data['attractions'] = JSON.stringify(data['attractions'])
  const trip = await addDoc(collection(db, 'trips'), data);
  await setDoc(doc(db, `users/${uid}/trips/`, trip.id), metadata);
  return trip;
}

function addTripToLocalStorage(data) {
  window.localStorage.setItem(PENDING_TRIP_KEY, JSON.stringify(data));
}

async function updateTrip(uid: string, id: string, data) {
  const metadata = getTripMetadata(data)
  data['creator_id'] = uid;
  data['attractions'] = JSON.stringify(data['attractions'])
  const batch = writeBatch(db);
  batch.update(doc(db, 'trips', id), data);
  batch.set(doc(db, `users/${uid}/trips/`, id), metadata);
  await batch.commit();
}

async function deleteTrip(uid: string, id: string) {
  const batch = writeBatch(db);
  batch.delete(doc(db, `users/${uid}/trips/`, id));
  batch.delete(doc(db, 'trips', id))
  await batch.commit();
}

function deleteTripFromLocalStorage() {
  window.localStorage.removeItem(PENDING_TRIP_KEY);
}

function getTripMetadata(data) {
  const startTimestamp = data.start_timestamp;
  const days = data.attractions.length;
  const metadata = { 'name': data.name, 'start_timestamp': startTimestamp, 'days': days };
  if (startTimestamp) {
    const startDate = new Date(startTimestamp)
    const endDate = add(startDate, { days: days - 1 })
    metadata['end_timestamp'] = endDate.getTime();
  }
  return metadata;
}

export { getTrips, getTrip, getTripFromLocalStorage, addTrip, addTripToLocalStorage, updateTrip, deleteTrip, deleteTripFromLocalStorage }