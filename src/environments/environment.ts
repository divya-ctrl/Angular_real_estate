export const environment = {
  production: false,

  // Replace these values from Firebase Console > Project Settings > Your apps > Web app config.
  firebase: {
    apiKey: "AIzaSyAuupmWZVZCtQ_ZI7pUBUvgVYSemsG_kC0",
    authDomain: "svr-property-landmark.firebaseapp.com",
    projectId: "svr-property-landmark",
    storageBucket: "svr-property-landmark.firebasestorage.app",
    messagingSenderId: "439213571919",
    appId: "1:439213571919:web:4de2c5c14c81a306e38f3a",
    measurementId: "G-H0SRG87BK6"
  },
  
  // Only these Google/Gmail IDs can open the admin panel in the Angular UI.
  // Also update the same email list in firestore.rules and storage.rules.
  adminEmails: ['tejassaiprasad7@gmail.com','landmark.svr1999@gmail.com','divyagowda923@gmail.com'],

  // Use country code without +. Example India: 91XXXXXXXXXX.
  defaultWhatsAppNumber: '917022883119',
  companyEmail: 'landmark.svr1999@gmail.com',
  companyPhone: '+919986046040',
  companyAddress: '#99, near Canara Bank , BEML Layout 2nd Stage, Rajarajeshwari Nagar, Mysuru, Karnataka, 570022.'
};
