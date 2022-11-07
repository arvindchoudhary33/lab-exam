import { Injectable } from '@angular/core';
import {
  Firestore,
  query,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  where,
  deleteDoc,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  allDataSubject: Subject<Object[]> = new BehaviorSubject<Object[]>([]);
  constructor(private store: Firestore) {}

  async fetchQueryData() {
    let allData: Object[] = [];
    const q = query(
      collection(this.store, 'list-of-students'),
      where('class', '==', 'msc')
    );
    onSnapshot(q, (querySnapshot) => {
      allData = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        Object.assign(obj, { documentID: doc.id });
        allData.push(obj);
      });
      this.allDataSubject.next(allData);
    });

    return allData;
  }

  async putData(data: Object) {
    try {
      const docRef = await addDoc(
        collection(this.store, 'list-of-students'),
        data
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async delete(id: any) {
    await deleteDoc(doc(this.store, 'list-of-students', id));
  }

  async fetchParticularStudentData(id: any) {
    const docRef = doc(this.store, 'list-of-students', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {};
    }
  }

  async update(id: any, data: any) {
    const studentRef = doc(this.store, 'list-of-students', id);
    await updateDoc(studentRef, data);
  }
}
