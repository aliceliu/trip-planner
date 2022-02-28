import { useEffect } from 'react';
import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import 'firebaseui/dist/firebaseui.css'

import { auth } from './firebase'

const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
function Auth(props: { onSignIn: (authResult: any, redirectUrl: any) => boolean }) {

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: props.onSignIn
    },
    // Terms of service url.
    tosUrl: '',
    privacyPolicyUrl: ''
  };

  useEffect(() => {
    ui.start('#firebaseui-auth-container', uiConfig);
  })

  return <Card variant="outlined">
    <CardHeader
      title="TripPlanner"
      subheader="Plan your best trip"
      sx={{ textAlign: 'center' }}
    />
    <Divider />
    <CardContent>
      <div id="firebaseui-auth-container"></div>
    </CardContent>
  </Card>
}

export default Auth