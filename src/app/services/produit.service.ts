import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  // produits: Produit[];
  //categories: Categorie[];
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // this.categories = [{ idCat: 1, nomCat: "PC" },
    // { idCat: 2, nomCat: "Imprimante" }];
    /*this.produits = [
      {
        idProduit: 1, nomProduit: "PC Asus", prixProduit: 3000.600,
        dateCreation: new Date("01/14/2011"), categorie: { idCat: 1, nomCat: "PC" }
      },
      {
        idProduit: 2, nomProduit: "Imprimante Epson", prixProduit: 450,
        dateCreation: new Date("12/17/2010"), categorie: { idCat: 2, nomCat: "Imprimante" }
      },
      {
        idProduit: 3, nomProduit: "Tablette Samsung", prixProduit: 900.123,
        dateCreation: new Date("02/20/2020"), categorie: { idCat: 1, nomCat: "PC" }
      }
    ];*/


  }
  // liste produit sans interceptor
  /*listeProduit(): Observable<Produit[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit[]>(apiURL + "/all", { headers: httpHeaders });
  }*/
  // liste produit avec interceptor
  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiURL + "/all");
  }
  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Produit>(apiURL + "/addprod", prod, { headers: httpHeaders });
  }

  // ajouterProduit(produit: Produit) {
  //   return this.produits.push(produit);
  // }

  // supprimerProduit(prod: Produit) {
  //   //supprimer le produit prod du tableau produits
  //   const index = this.produits.indexOf(prod, 0);
  //   if (index > -1) {
  //     this.produits.splice(index, 1);
  //   }
  //   //ou Bien
  //   /* this.produits.forEach((cur, index) => {
  //   if(prod.idProduit === cur.idProduit) {
  //   this.produits.splice(index, 1);
  //   }
  //   }); */
  // }
  supprimerProduit(id: number) {
    const url = `${apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  // consulterProduit(id: number): Produit {
  //   return this.produits.find(p => p.idProduit == id)!;
  // }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  // trierProduits() {
  //   this.produits = this.produits.sort((n1, n2) => {
  //     if (n1.idProduit! > n2.idProduit!) {
  //       return 1;
  //     }
  //     if (n1.idProduit! < n2.idProduit!) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  // }

  // updateProduit(p: Produit) {
  //   // console.log(p);
  //   this.supprimerProduit(p);
  //   this.ajouterProduit(p);
  //   this.trierProduits();
  // }
  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Produit>(apiURL + "/updateprod", prod, { headers: httpHeaders });
  }


  // listeCategories(): Observable<Categorie[]> {
  //   return this.http.get<Categorie[]>(apiURL + "/cat");
  // }
  listeCategories(): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<CategorieWrapper>(apiURLCat, { headers: httpHeaders }
    );
  }

  // consulterCategorie(id: number): Observable<Categorie[]> {
  //   const url = `${apiURL}/cat/${id}`
  //   return this.http.get<Categorie[]>(url);
  // }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
  }


  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    console.log("here id service", id);

    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }


}
