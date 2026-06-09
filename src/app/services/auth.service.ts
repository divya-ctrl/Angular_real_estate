import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';
import { firebaseApp } from '../firebase';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = getAuth(firebaseApp);
  private readonly provider = new GoogleAuthProvider();
  readonly user$ = new BehaviorSubject<User | null>(this.auth.currentUser);

  constructor() {
    onAuthStateChanged(this.auth, (user) => this.user$.next(user));
  }

  async signInWithGoogle(): Promise<User | null> {
    const result = await signInWithPopup(this.auth, this.provider);
    this.user$.next(result.user);
    return result.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.user$.next(null);
  }

  isAdmin(user: User | null = this.auth.currentUser): boolean {
    const email = user?.email?.toLowerCase();
    return !!email && environment.adminEmails.map((x) => x.toLowerCase()).includes(email);
  }

  currentUserReady(): Promise<User | null> {
    if (this.auth.currentUser) {
      return Promise.resolve(this.auth.currentUser);
    }

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        this.user$.next(user);
        resolve(user);
      });
    });
  }
}
