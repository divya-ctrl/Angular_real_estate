import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  addDoc,
  collection,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { firebaseApp } from '../firebase';
import { PropertyItem, PropertyPayload } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly db = getFirestore(firebaseApp);
  
  private readonly collectionName = 'properties';

  getPublicProperties(): Observable<PropertyItem[]> {
    const propertiesRef = collection(this.db, this.collectionName);
    const publicQuery = query(
      propertiesRef,
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );

    return this.listenToQuery(publicQuery);
  }

  getAllPropertiesForAdmin(): Observable<PropertyItem[]> {
    const propertiesRef = collection(this.db, this.collectionName);
    const adminQuery = query(propertiesRef, orderBy('createdAt', 'desc'));
    return this.listenToQuery(adminQuery);
  }

  async getPropertyById(id: string): Promise<PropertyItem | null> {
    const documentRef = doc(this.db, this.collectionName, id);
    const snapshot = await getDoc(documentRef);

    if (!snapshot.exists()) {
      return null;
    }

    return { id: snapshot.id, ...(snapshot.data() as Omit<PropertyItem, 'id'>) };
  }

  async createProperty(payload: PropertyPayload, files: File[]): Promise<string> {
    const created = await addDoc(collection(this.db, this.collectionName), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  
    return created.id;
  }
  async updateProperty(id: string, payload: PropertyPayload, newFiles: File[]): Promise<void> {
    const images = payload.images || [];
    const documentRef = doc(this.db, this.collectionName, id);

    await updateDoc(documentRef, {
      ...payload,
      images,
      updatedAt: serverTimestamp()
    });
  }

  async deleteProperty(id: string, imageUrls: string[]): Promise<void> {
    await deleteDoc(doc(this.db, this.collectionName, id));
  }



  private listenToQuery(propertyQuery: Query<DocumentData>): Observable<PropertyItem[]> {
    return new Observable<PropertyItem[]>((observer) => {
      const unsubscribe = onSnapshot(
        propertyQuery,
        (snapshot) => {
          const items = snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<PropertyItem, 'id'>)
          }));
          observer.next(items);
        },
        (error) => observer.error(error)
      );

      return () => unsubscribe();
    });
  }

  
}
