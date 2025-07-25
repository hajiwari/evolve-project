import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { 
  createUserProfile, 
  storeVerificationCode, 
  verifyCodeFromFirestore, 
  checkEmailExists, 
  checkPhoneExists 
} from "./firestore";

const auth = getAuth(app);

// Generate a 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Check if email or phone already exists
 * @param {string} email - Email to check
 * @param {string} phone - Full phone number with country code
 * @returns {object} - Object with emailExists and phoneExists booleans
 */
export async function checkUserExists(email, phone) {
  try {
    const [emailExists, phoneExists] = await Promise.all([
      checkEmailExists(email),
      checkPhoneExists(phone)
    ]);
    
    return { emailExists, phoneExists };
  } catch (error) {
    console.error('Error checking user exists:', error);
    throw error;
  }
}

export async function signUp(email, password, firstName, lastName, userData = {}) {
  try {
    // Create user account first - Firebase Auth will handle email uniqueness
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with name
    if (firstName && lastName) {
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
    }
    
    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Store verification code in Firestore
    await storeVerificationCode(userCredential.user.uid, verificationCode, email);
    
    // Create user profile in Firestore (this will check phone uniqueness)
    const userProfileData = {
      email,
      firstName,
      lastName,
      ...userData
    };
    
    try {
      await createUserProfile(userCredential.user.uid, userProfileData);
    } catch (profileError) {
      // If profile creation fails due to phone number conflict, delete the auth user
      if (profileError.message.includes("Phone number is already registered")) {
        await userCredential.user.delete();
        throw new Error("Phone number is already registered with another account");
      }
      throw profileError;
    }
    
    console.log('🔑 VERIFICATION CODE FOR', email, ':', verificationCode);
    console.log('📧 User can enter this code in the 6-digit input fields');
    
    // Send Firebase email verification
    const actionCodeSettings = {
      url: `${window.location.origin}/login?verified=true`,
      handleCodeInApp: false
    };
    
    await sendEmailVerification(userCredential.user, actionCodeSettings);
    console.log('✅ Firebase verification email sent to:', email);
    
    return { userCredential, verificationCode };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function verifyCodeManually(userId, enteredCode) {
  try {
    return await verifyCodeFromFirestore(userId, enteredCode);
  } catch (error) {
    console.error('Code verification error:', error);
    throw error;
  }
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function resendEmailVerification(user) {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/login?verified=true`,
      handleCodeInApp: false
    };
    
    // Send Firebase email verification
    await sendEmailVerification(user, actionCodeSettings);
    
    // Generate new verification code
    const verificationCode = generateVerificationCode();
    
    // Store new verification code in Firestore
    await storeVerificationCode(user.uid, verificationCode, user.email);
    
    console.log('🔑 NEW VERIFICATION CODE FOR', user.email, ':', verificationCode);
    console.log('📧 User can enter this code in the 6-digit input fields');
    console.log('✅ Firebase verification email resent to:', user.email);
    
    return { success: true, verificationCode };
  } catch (error) {
    console.error('Resend verification error:', error);
    throw error;
  }
}
