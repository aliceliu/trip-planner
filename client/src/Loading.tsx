import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return <div
    style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20vh' }}
  >
    <CircularProgress color="inherit" />
  </div>
}