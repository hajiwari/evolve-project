import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

/**
 * Development utility functions for testing Firestore
 * These should only be used during development and testing
 */

/**
 * Clear all test data from Firestore
 * WARNING: This will delete all data in the specified collections
 */
export async function clearTestData() {
  try {
    console.log("🧹 Clearing test data from Firestore...");
    
    // Clear verification codes
    const codesRef = collection(db, "verificationCodes");
    const codesSnapshot = await getDocs(codesRef);
    const codeDeletePromises = codesSnapshot.docs.map(docSnap => 
      deleteDoc(doc(db, "verificationCodes", docSnap.id))
    );
    await Promise.all(codeDeletePromises);
    console.log(`Deleted ${codesSnapshot.size} verification codes`);
    
    // Clear test users (be careful with this in production!)
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const userDeletePromises = usersSnapshot.docs.map(docSnap => 
      deleteDoc(doc(db, "users", docSnap.id))
    );
    await Promise.all(userDeletePromises);
    console.log(`Deleted ${usersSnapshot.size} user records`);
    
    console.log("✅ Test data cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing test data:", error);
  }
}

/**
 * List all users in the database (for debugging)
 */
export async function listAllUsers() {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    console.log(`📋 Found ${snapshot.size} users:`);
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`- ${data.email} (${data.firstName} ${data.lastName}) - ${data.role}`);
    });
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error listing users:", error);
    return [];
  }
}

/**
 * Check specific email/phone existence (for debugging)
 */
export async function debugCheckUser(email, phone) {
  try {
    const usersRef = collection(db, "users");
    
    if (email) {
      const emailQuery = query(usersRef, where("email", "==", email.toLowerCase()));
      const emailSnapshot = await getDocs(emailQuery);
      console.log(`📧 Email "${email}" exists:`, !emailSnapshot.empty);
    }
    
    if (phone) {
      const phoneQuery = query(usersRef, where("fullPhone", "==", phone));
      const phoneSnapshot = await getDocs(phoneQuery);
      console.log(`📱 Phone "${phone}" exists:`, !phoneSnapshot.empty);
    }
  } catch (error) {
    console.error("❌ Error checking user:", error);
  }
}

/**
 * Get verification codes for debugging
 */
export async function listVerificationCodes() {
  try {
    const codesRef = collection(db, "verificationCodes");
    const snapshot = await getDocs(codesRef);
    
    console.log(`🔑 Found ${snapshot.size} verification codes:`);
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const isExpired = new Date() > data.expiresAt.toDate();
      console.log(`- ${data.email}: ${data.code} (${isExpired ? 'EXPIRED' : 'VALID'})`);
    });
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error listing verification codes:", error);
    return [];
  }
}

// Make functions available globally for console debugging
if (typeof window !== 'undefined') {
  window.devUtils = {
    clearTestData,
    listAllUsers,
    debugCheckUser,
    listVerificationCodes
  };
  
  console.log(`
🛠️  Development utilities loaded! Use in console:
- devUtils.listAllUsers()
- devUtils.debugCheckUser('email@test.com', '+15551234567')
- devUtils.listVerificationCodes()
- devUtils.clearTestData() // ⚠️ DANGER: Deletes all data!
  `);
}
