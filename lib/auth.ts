import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export type UserRole = "patient" | "doctor" | "admin";

// Maps raw Firebase error codes to messages a patient/doctor will actually
// understand, instead of "Firebase: Error (auth/invalid-credential)."
function friendlyAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/unauthorized-domain":
      return "This website isn't authorized yet in Firebase. Add it under Authentication → Settings → Authorized domains.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const role = await getUserRole(cred.user.uid);
    return { user: cred.user, role, error: null };
  } catch (err: any) {
    return { user: null, role: null, error: friendlyAuthError(err.code) };
  }
}

export async function registerWithEmail(
  name: string,
  email: string,
  password: string,
  role: UserRole
) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Minimal profile doc — the doctor role additionally lands in
    // /doctors (schema.ts DoctorDoc) with status "pending_approval" once
    // the Doctor Panel module wires up the PMC license upload step.
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    });

    return { user: cred.user, error: null };
  } catch (err: any) {
    return { user: null, error: friendlyAuthError(err.code) };
  }
}

export async function logout() {
  await firebaseSignOut(auth);
}

// Reads the role written to users/{uid} at signup. Used right after login
// to decide where to redirect (doctor -> /dashboard, patient -> /account).
export async function getUserRole(uid: string): Promise<UserRole | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return (snap.data().role as UserRole) ?? null;
}

// Single source of truth for "where does this role land after auth" so
// login and register never drift out of sync with each other.
export function roleHomePath(role: UserRole | null): string {
  if (role === "admin") return "/admin";
  if (role === "doctor") return "/dashboard";
  if (role === "patient") return "/account";
  return "/";
}
