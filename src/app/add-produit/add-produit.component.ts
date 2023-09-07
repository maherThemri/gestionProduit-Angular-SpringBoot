import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit;
  message?: string;
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  uploadedImage!: File;
  imagePath: any;
  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // this.categories = this.produitService.listeCategories();
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }

  // addProduit() {
  //   // this.newCategorie = this.produitService.consulterCategorie(this.newIdCat);
  //   this.newProduit.categorie = this.newCategorie;
  //   console.log(this.newProduit);

  //   //this.produitService.ajouterProduit(this.newProduit);
  //   this.message = "Produit ajouter avec succès !"
  //   this.router.navigate(['produits']);
  // }

  // addProduit() {
  //   this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
  //   this.produitService.ajouterProduit(this.newProduit)
  //     .subscribe(prod => {
  //       console.log(prod);
  //       this.router.navigate(['produits']);
  //     });
  // }
  addProduit() {
    this.produitService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newProduit.image = img;
        this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
        this.produitService
          .ajouterProduit(this.newProduit)
          .subscribe(() => {
            this.router.navigate(['produits']);
          });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }



}
