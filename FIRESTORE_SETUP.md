# Firestore Setup Instructions

## Prerequisites
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`

## Deploy Firestore Rules and Indexes

### 1. Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```

### 2. Deploy Firestore Indexes
```bash
firebase deploy --only firestore:indexes
```

### 3. Deploy Both (Rules and Indexes)
```bash
firebase deploy --only firestore
```

## Firestore Collections Structure

### Users Collection (`/users/{userId}`)
```javascript
{
  uid: string,                    // Firebase Auth UID
  email: string,                  // User email (lowercase)
  firstName: string,              // User first name
  lastName: string,               // User last name
  displayName: string,            // Full name
  phone: string,                  // Phone number without country code
  countryCode: string,            // Country code (e.g., "+1")
  fullPhone: string,              // Full phone with country code
  role: "student" | "faculty",    // User role
  institutionCountry: string,     // Institution country
  institutionState: string,       // Institution state/province
  institutionName: string,        // Institution name
  programType: string,            // Program type
  marketingConsent: boolean,      // Marketing consent
  emailVerified: boolean,         // Email verification status
  phoneVerified: boolean,         // Phone verification status
  accountStatus: string,          // "pending_verification" | "active" | "suspended"
  createdAt: timestamp,           // Account creation time
  updatedAt: timestamp            // Last update time
}
```

### Verification Codes Collection (`/verificationCodes/{userId}`)
```javascript
{
  uid: string,           // Firebase Auth UID
  code: string,          // 6-digit verification code
  email: string,         // Associated email
  verified: boolean,     // Verification status
  createdAt: timestamp,  // Creation time
  expiresAt: Date        // Expiration time (15 minutes)
}
```

## Security Rules Overview

- **Users Collection**: Users can only read/write their own data
- **Verification Codes**: Users can only access their own verification codes
- **Email/Phone Checking**: Limited read access for existence checking
- **All Other Collections**: Denied by default

## Testing Firestore Setup

You can test the Firestore integration by:

1. Creating a new account through the signup process
2. Checking the Firebase Console for new user documents
3. Verifying email/phone validation works
4. Testing verification code storage and retrieval

## Troubleshooting

If you encounter permission errors:
1. Ensure Firestore is enabled in your Firebase project
2. Check that security rules are deployed correctly
3. Verify your Firebase configuration in `src/firebase.js`
4. Make sure the user is authenticated before accessing Firestore

## Development Notes

- Verification codes expire after 15 minutes
- Email and phone uniqueness is enforced
- All user data is automatically timestamped
- Failed authentication attempts are logged for debugging
