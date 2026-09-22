import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Importe o NavController para navegação suave de retorno
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonToast, IonCard, IonCardContent, 
  IonSpinner, IonButtons 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, logoGoogle } from 'ionicons/icons';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, 
    IonItem, IonLabel, IonInput, IonButton, IonIcon, IonToast, IonCard, 
    IonCardContent, IonSpinner, IonButtons
  ]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  
  toastMessage = '';
  isToastOpen = false;
  toastColor: 'success' | 'danger' = 'success';

  constructor(private navCtrl: NavController) {

    addIcons({ arrowBackOutline, logoGoogle });
  }


  voltarInicio() {
    this.navCtrl.navigateBack('/home');
  }

  async loginWithEmail() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, preencha todos os campos.', 'danger');
      return;
    }

    this.loading = true;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      this.showToast(`Bem-vindo, ${userCredential.user.email}!`, 'success');
    } catch (error: any) {
      this.showToast('E-mail ou senha incorretos.', 'danger');
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.loading = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.showToast(`Olá, ${result.user.displayName}`, 'success');
    } catch (error: any) {
      this.showToast('Falha no login com Google.', 'danger');
    } finally {
      this.loading = false;
    }
  }

  private showToast(message: string, color: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastColor = color;
    this.isToastOpen = true;
  }
}