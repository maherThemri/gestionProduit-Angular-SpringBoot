import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styleUrls: ['./recherche-par-categorie.component.css']
})
export class RechercheParCategorieComponent implements OnInit {

  IdCategorie!: number;
  categories!: Categorie[];
  produits!: Produit[];
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(this.categories);

    })
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).
      subscribe(prods => { this.produits = prods });
  }

}
