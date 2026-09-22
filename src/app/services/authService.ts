import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.config'; // Importa a instância centralizada

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  logout() {
    return signOut(auth);
  }
}