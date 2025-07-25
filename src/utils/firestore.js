import { db } from "../firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";

// Collection names
const USERS_COLLECTION = "users";
const VERIFICATION_CODES_COLLECTION = "verificationCodes";

/**
 * Check if email already exists by attempting to create a temporary document
 * This is a workaround since we can't query other users' emails due to security rules
 * @param {string} email - Email to check
 * @returns {boolean} - True if email exists
 */
export async function checkEmailExists(email) {
  try {
    // We'll check during the actual signup process instead
    // For now, return false to allow the signup attempt
    // Firebase Auth will handle duplicate email detection
    return false;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}

/**
 * Check if phone number already exists
 * Since we can't query other users' data, we'll handle this during signup
 * @param {string} phone - Phone number to check (with country code)
 * @returns {boolean} - True if phone exists
 */
export async function checkPhoneExists(phone) {
  try {
    // We'll check during the actual signup process instead
    // For now, return false to allow the signup attempt
    return false;
  } catch (error) {
    console.error("Error checking phone:", error);
    return false;
  }
}

/**
 * Check if phone number exists by attempting to create user profile
 * This will be called during the actual signup process
 * @param {string} phone - Full phone number with country code
 * @returns {boolean} - True if phone exists
 */
export async function validatePhoneUniqueness(phone) {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("fullPhone", "==", phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error validating phone uniqueness:", error);
    return false;
  }
}

/**
 * Create user profile in Firestore
 * @param {string} uid - Firebase Auth UID
 * @param {object} userData - User data object
 */
export async function createUserProfile(uid, userData) {
  try {
    // Check if phone number already exists
    const fullPhone = `${userData.countryCode}${userData.phone}`;
    const phoneExists = await validatePhoneUniqueness(fullPhone);
    
    if (phoneExists) {
      throw new Error("Phone number is already registered");
    }

    const userRef = doc(db, USERS_COLLECTION, uid);
    const userProfile = {
      uid,
      email: userData.email.toLowerCase(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: `${userData.firstName} ${userData.lastName}`,
      phone: userData.phone,
      countryCode: userData.countryCode,
      fullPhone: fullPhone,
      role: userData.role,
      institutionCountry: userData.institutionCountry || null,
      institutionState: userData.institutionState || null,
      institutionName: userData.institutionName || null,
      programType: userData.programType || null,
      marketingConsent: userData.marketingConsent || false,
      emailVerified: false,
      phoneVerified: false,
      accountStatus: 'pending_verification',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(userRef, userProfile);
    console.log("User profile created successfully:", uid);
    return userProfile;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

/**
 * Get user profile from Firestore
 * @param {string} uid - Firebase Auth UID
 * @returns {object|null} - User profile data or null if not found
 */
export async function getUserProfile(uid) {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No user profile found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}

/**
 * Update user profile in Firestore
 * @param {string} uid - Firebase Auth UID
 * @param {object} updates - Fields to update
 */
export async function updateUserProfile(uid, updates) {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, updateData);
    console.log("User profile updated successfully:", uid);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * Store verification code in Firestore
 * @param {string} uid - Firebase Auth UID
 * @param {string} code - Verification code
 * @param {string} email - User email
 */
export async function storeVerificationCode(uid, code, email) {
  try {
    const codeRef = doc(db, VERIFICATION_CODES_COLLECTION, uid);
    const verificationData = {
      uid,
      code,
      email: email.toLowerCase(),
      verified: false,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    };
    
    await setDoc(codeRef, verificationData);
    console.log("Verification code stored successfully:", uid);
    return true;
  } catch (error) {
    console.error("Error storing verification code:", error);
    throw error;
  }
}

/**
 * Verify code from Firestore
 * @param {string} uid - Firebase Auth UID
 * @param {string} enteredCode - Code entered by user
 */
export async function verifyCodeFromFirestore(uid, enteredCode) {
  try {
    const codeRef = doc(db, VERIFICATION_CODES_COLLECTION, uid);
    const codeSnap = await getDoc(codeRef);
    
    if (!codeSnap.exists()) {
      throw new Error("Verification code not found");
    }
    
    const codeData = codeSnap.data();
    
    // Check if code has expired
    if (new Date() > codeData.expiresAt.toDate()) {
      throw new Error("Verification code has expired");
    }
    
    // Check if code matches
    if (codeData.code !== enteredCode) {
      throw new Error("Invalid verification code");
    }
    
    // Mark as verified
    await updateDoc(codeRef, {
      verified: true,
      verifiedAt: serverTimestamp()
    });
    
    // Update user profile to mark email as verified
    await updateUserProfile(uid, {
      emailVerified: true,
      accountStatus: 'active'
    });
    
    return true;
  } catch (error) {
    console.error("Code verification error:", error);
    throw error;
  }
}

/**
 * Clean up expired verification codes (utility function)
 */
export async function cleanupExpiredCodes() {
  try {
    const codesRef = collection(db, VERIFICATION_CODES_COLLECTION);
    const now = new Date();
    const q = query(codesRef, where("expiresAt", "<", now));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log(`Cleaned up ${querySnapshot.size} expired verification codes`);
  } catch (error) {
    console.error("Error cleaning up expired codes:", error);
  }
}
