import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  orderBy,
  addDoc,
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

export interface ReviewRecord {
  id: string;
  author: string;
  rating: number;
  service?: string;
  review: string;
  date?: string;
  verified?: boolean;
  createdAt: string;
  userId?: string;
}

export interface ServiceRecord {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  startingPrice?: string;
  imageUrl?: string;
  tags?: string;
  order?: number;
}

export interface ArtistRecord {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string;
  bio: string;
  instagram?: string;
  photoUrl?: string;
  order?: number;
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

// Fetch public customer reviews
export async function getFirestoreReviews(): Promise<ReviewRecord[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const reviews: ReviewRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      reviews.push(docSnap.data() as ReviewRecord);
    });
    return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.warn('Could not fetch reviews from Firestore, using defaults:', error);
    return [];
  }
}

// Submit a new customer review to Firestore
export async function createCustomerReview(review: Omit<ReviewRecord, 'id' | 'createdAt'>): Promise<string> {
  const id = `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const reviewRef = doc(db, 'reviews', id);
  const data: ReviewRecord = {
    ...review,
    id,
    verified: true,
    createdAt: new Date().toISOString(),
  };

  await setDoc(reviewRef, data);
  return id;
}

// Fetch public studio services
export async function getFirestoreServices(): Promise<ServiceRecord[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'services'));
    const services: ServiceRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      services.push(docSnap.data() as ServiceRecord);
    });
    return services.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Could not fetch services from Firestore:', error);
    return [];
  }
}

// Fetch public studio artists
export async function getFirestoreArtists(): Promise<ArtistRecord[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'artists'));
    const artists: ArtistRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      artists.push(docSnap.data() as ArtistRecord);
    });
    return artists.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Could not fetch artists from Firestore:', error);
    return [];
  }
}
