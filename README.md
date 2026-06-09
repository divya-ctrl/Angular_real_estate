# SVR Property Landmark - Angular + Firebase

This project is a complete Angular real-estate website with:

- Public home page, services page, property listing, property detail page, and contact page
- Black and gold SVR theme using the supplied SVR logo
- Location/type search
- WhatsApp enquiry links
- Firebase Authentication with Google sign-in for admin only
- Firebase Firestore for property details
- Firebase Storage for property images
- Firebase Hosting deployment configuration

## 1. Install tools

```bash
npm install -g @angular/cli firebase-tools
npm install
```

## 2. Create Firebase project

1. Open Firebase Console.
2. Create a project.
3. Add a Web App.
4. Copy the Firebase config.
5. Enable Authentication > Sign-in method > Google.
6. Create Cloud Firestore database.
7. Create Cloud Storage bucket if your Firebase plan supports it.

## 3. Configure Angular Firebase values

Open:

```text
src/environments/environment.ts
```

Replace:

```ts
firebase: {
  apiKey: 'PASTE_FIREBASE_API_KEY',
  authDomain: 'PASTE_PROJECT_ID.firebaseapp.com',
  projectId: 'PASTE_PROJECT_ID',
  storageBucket: 'PASTE_STORAGE_BUCKET_FROM_FIREBASE_CONFIG',
  messagingSenderId: 'PASTE_MESSAGING_SENDER_ID',
  appId: 'PASTE_APP_ID'
}
```

Also set:

```ts
adminEmails: ['actualadmin@gmail.com'],
defaultWhatsAppNumber: '91XXXXXXXXXX',
companyPhone: '+91 XXXXX XXXXX',
companyEmail: 'your@email.com',
companyAddress: 'Your office address'
```

## 4. Configure Firebase rules

Open both files and replace `youradmin@gmail.com` with the same admin Gmail ID:

```text
firestore.rules
storage.rules
```

Multiple admins can be added like this:

```js
request.auth.token.email in [
  'admin1@gmail.com',
  'admin2@gmail.com'
]
```

## 5. Run locally

```bash
npm start
```

Open:

```text
http://localhost:4200
```

Public users can directly view the website and properties. They are not asked to log in.

Admin login URL:

```text
http://localhost:4200/admin/login
```

## 6. Admin image add/edit flow

1. Login using configured Gmail ID.
2. Go to Admin Dashboard.
3. Click Add Property.
4. Enter property title, location, price, area, type, description, features, WhatsApp number, and status.
5. Select one or more images.
6. Click Save Property.
7. The app saves property details in Firestore and uploads photos to Firebase Storage.
8. To edit images, open Edit from Admin Dashboard.
9. Remove existing images or add new images.
10. Save again.

## 7. Deploy to Firebase Hosting

Login:

```bash
firebase login
```

Attach your Firebase project:

```bash
firebase use --add
```

Select your Firebase project and set alias as `default`.

Deploy Firestore and Storage rules:

```bash
firebase deploy --only firestore:rules,storage
```

Build and deploy hosting:

```bash
npm run deploy
```

After deployment, Firebase gives hosting URLs like:

```text
https://YOUR_PROJECT_ID.web.app
https://YOUR_PROJECT_ID.firebaseapp.com
```

## 8. Files to customize

- Logo: `src/assets/svr-logo.png`
- Main theme colors: `src/styles.scss`
- Home page content: `src/app/pages/home/*`
- Services page content: `src/app/pages/services/*`
- Contact details: `src/environments/environment.ts`
- Firebase project settings: `src/environments/environment.ts`
- Security rules: `firestore.rules`, `storage.rules`
