import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent 
} from '@ionic/angular';

interface Produto {
  id: number;
  nome: string;
  categoria: 'lanche' | 'porcao' | 'doce';
  preco: number;
  comandaCount: number;
}

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonButton, IonContent
  ]
})
export class CardapioPage implements OnInit {
  categoriaSelecionada = 'tudo';

  categorias = [
    { label: 'Tudo', value: 'tudo' },
    { label: 'Lanche', value: 'lanche' },
    { label: 'Porção', value: 'porcao' },
    { label: 'Doce', value: 'doce' }
  ];

  produtos: Produto[] = [
    { id: 1, nome: 'X-Joaquim', categoria: 'lanche', preco: 18.00, comandaCount: 1 },
    { id: 2, nome: 'Coxinha', categoria: 'lanche', preco: 7.00, comandaCount: 0 },
    { id: 3, nome: 'Porção de batata', categoria: 'porcao', preco: 14.00, comandaCount: 0 },
    { id: 4, nome: 'Brigadeiro', categoria: 'doce', preco: 18.00, comandaCount: 0 },
    { id: 5, nome: 'Hamburguer', categoria: 'lanche', preco: 25.00, comandaCount: 0 },
  ];

  produtosFiltrados: Produto[] = [];

  ngOnInit() {
    this.aplicarFiltro();
  }

  filtrarCategoria(val: string) {
    this.categoriaSelecionada = val;
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    if (this.categoriaSelecionada === 'tudo') {
      this.produtosFiltrados = [...this.produtos];
    } else {
      this.produtosFiltrados = this.produtos.filter(
        p => p.categoria === this.categoriaSelecionada
      );
    }
  }

  adicionarAComanda(produto: Produto) {
    if (produto && produto.nome !== 'Brigadeiro') {
      produto.comandaCount++;
    }
  }

  getCategoryLabel(categoria: string): string {
    switch (categoria) {
      case 'lanche': return 'Lanche';
      case 'porcao': return 'Porção';
      case 'doce': return 'Doce';
      default: return categoria;
    }
  }
}