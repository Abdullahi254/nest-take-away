import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from './firebase-service-account.json'; // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const firestore = admin.firestore();
