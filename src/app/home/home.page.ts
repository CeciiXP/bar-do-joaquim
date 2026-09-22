import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton],
  standalone: true
})
export class HomePage {

  constructor(private router: Router) {}


  LevarLogin() {
  console.log('1. Botão clicado!');
  
  this.router.navigateByUrl('/login').then((sucesso) => {
    console.log('2. Resultado da navegação:', sucesso);
    if (!sucesso) {
      console.warn('A navegação retornou false. Verifique se o caminho "/login" está correto no app.routes.ts.');
    }
  }).catch((erro) => {
    console.error('3. Erro durante a navegação:', erro);
  });
}
}
