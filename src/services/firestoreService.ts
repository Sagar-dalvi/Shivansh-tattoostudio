import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface AppointmentRecord {
  id: string;
  userId: string;
  clientName: string;
  phone: string;
  email?: string;
  serviceName: string;
  artist: string;
  preferredDate: string;
  preferredTime: string;
  placement: string;
  size: string;
  isHomeService: boolean;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SavedConceptRecord {
  id: string;
  userId: string;
  title: string;
  conceptText: string;
  style?: string;
  placement?: string;
  imageUrl?: string;
  createdAt: string;
}

// Save a new appointment
export async function createAppointment(appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'> & { id?: string }): Promise<string> {
  const id = appointment.id || `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const appointmentRef = doc(db, 'appointments', id);
  const data: AppointmentRecord = {
    ...appointment,
    id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await setDoc(appointmentRef, data);
  return id;
}

// Fetch user appointments
export async function getUserAppointments(userId: string): Promise<AppointmentRecord[]> {
  try {
    const q = query(collection(db, 'appointments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const appointments: AppointmentRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      appointments.push(docSnap.data() as AppointmentRecord);
    });
    // sort newest first
    return appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

// Save an AI tattoo concept to user's savedConcepts subcollection
export async function saveTattooConcept(userId: string, concept: Omit<SavedConceptRecord, 'id' | 'userId' | 'createdAt'>): Promise<string> {
  const id = `concept-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const conceptRef = doc(db, 'users', userId, 'savedConcepts', id);
  const data: SavedConceptRecord = {
    ...concept,
    id,
    userId,
    createdAt: new Date().toISOString(),
  };

  await setDoc(conceptRef, data);
  return id;
}

// Fetch user saved concepts
export async function getUserSavedConcepts(userId: string): Promise<SavedConceptRecord[]> {
  try {
    const q = collection(db, 'users', userId, 'savedConcepts');
    const querySnapshot = await getDocs(q);
    const concepts: SavedConceptRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      concepts.push(docSnap.data() as SavedConceptRecord);
    });
    return concepts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching saved concepts:', error);
    return [];
  }
}

// Delete a saved concept
export async function deleteSavedConcept(userId: string, conceptId: string): Promise<void> {
  const conceptRef = doc(db, 'users', userId, 'savedConcepts', conceptId);
  await deleteDoc(conceptRef);
}
