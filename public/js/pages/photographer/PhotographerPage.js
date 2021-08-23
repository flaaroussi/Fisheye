//Creation d'une page photographer dynamique à partir des données récupées par l'api fetchData.
//recupere les données d'un photographe selon son id figurant dans l'url
//on creer un element 'article'ou on fait apparaitre le photographe selectionné par l'appel de 
//la fonction getTemplatePhotographerProfil

import Modal from "./Modal.js";
import Caroussel from "./Caroussel.js";
import MediaFactory from "../../factory/MediaFactory.js";

export default class PhotographerPage {

   /**
    * 
    * @param {Array} data objet :6 photographes et 59 medias.
    */
   constructor(data){
      // Affichager le profil d'un photographe.
      this.displayProfil(data.photographers);
      //Attacher event change au combo de tri.
      this.initTri(data.media);
      //Affichager les médias d'un photographer
      this.triMedia(data.media, 'popularite');  
   }

   /**
    * Création d'un profil photographe
    * @param {array} photographers 
    */
   displayProfil(photographers) {
      let idPhotographe = this.getPhotographerId();
      // photographer_profil
      let elt = document.getElementById("photographer_profil");
      let photographeSelectionne = photographers.filter(currentPhotographer => currentPhotographer.id == idPhotographe);
      // si on a un id non connu un message d'erreur est affiché
      //donc on ajoute la condition suivante :photographeSelectionne[0].length:au moins un photographe existe.
      if(photographeSelectionne[0]){         
         elt.innerHTML = this.getTemplatePhotographerProfil(photographeSelectionne[0]);
      }else{
         elt.innerHTML = "Veuillez sélectionner un photographer.";
         return;
      }
      //Ajouter le nom du photographe dans le modal.
      document.getElementById("modal_photographer_name").textContent = photographeSelectionne[0].name;
      //Ajouter le prix du photographe dans le footer.
      document.querySelector(".photographer-footer-price").textContent = `${photographeSelectionne[0].price} € / jour`;
      // initialiser le modal
      const modal = new Modal(1);
   }
  
   /**
    * Création de la structure HTML d'un photographe
    * @param {Objet} photographeProfil les données d'un photographe.
    * @returns {HTMLElement} Balize "article" dans laquelle on affiche le profil d'un photographer.
    */
   getTemplatePhotographerProfil(photographeProfil) {
      let template = `  
         <article class="photographer-card photographer-card__direction"> 
            <div class="photographer-infos">
               <div>   
                  <h2>${photographeProfil.name}</h2>
                  <p class="localisation">${photographeProfil.city}, ${photographeProfil.country}</p>
                  <p class="tagline">${photographeProfil.tagline}</p>
                  <ul class="filtres filtres__direction">
                     ${photographeProfil.tags.map(tag => `<li><a href="index.html" class="tag">#${tag}</a></li>`).join(" ")}
                  </ul>  
               </div>   
               <div>
                  <button class="btn modal-btn">Contactez-moi</button>
               </div>
            </div>
            <figure>
               <img src="./public/images/Photographers/${photographeProfil.portrait}" alt="${photographeProfil.alt}"/>
            </figure>
         </article> 
         `;
      return template;
   }
   
   /**
    * Tri par 
    * @param {array} medias medias des 6 photographes
    */
   initTri(medias){
      let triCombo = document.getElementById('media-tri-combo');
      //Sélectionner popularité par défaut
      triCombo.value = "popularite";
      triCombo.addEventListener("change",event =>{
         this.triMedia(medias, triCombo.value);

      })         
   }

   /**
    * Tri medias par popularité,date ou titre.
    * @param {array} medias 
    * @param {String} optionTri :tri par popularité,titre ou par date
    */
   triMedia(medias, optionTri){
      //Récuperation de l'id du photographe à afficher.
      let idPhotographe = this.getPhotographerId();
      //Filtrer les medias d'un photographe à afficher.
      let photographerMedia = medias.filter(currentMedia => currentMedia.photographerId == idPhotographe);
      // tri des medias par option sélectionnée
      switch(optionTri){
            case 'popularite' : 
            //Traitement du tri par popularité.
            photographerMedia.sort(function (a, b) {
               return b.likes - a.likes;
            });
          break;
         case 'titre' :
            photographerMedia.sort(function (c,d) {
               if(d.title > c.title){
                  return -1;
               }else{
                  return 1;
               }
            });
         break;
         case 'date' :
            photographerMedia.sort(function(a, b) {
               a = new Date(a.date);
               b = new Date(b.date);
               return a>b ? -1 : a<b ? 1 : 0;
           });  
         break;   
      }
      // affichage des media tri
      this.displayMedia(photographerMedia);
   }

   /**
    * Traitement media par photographe
    * @param {array} listMedia 
    */

   displayMedia(listMedia) {
      let elt = document.getElementById("photographer_media");
      //vider l'eltAvant d'afficher les medias 
      elt.innerHTML = "";
      let idPhotographe = this.getPhotographerId();
      let photographerMedia = listMedia.filter(currentMedia => currentMedia.photographerId == idPhotographe);

      photographerMedia.forEach(currentMedia => {
         let article = document.createElement("article");
         article.className = "media-card";
         //Instancier MediaFactory
         let mediaFactory = new MediaFactory(currentMedia);
         article.innerHTML = mediaFactory.getMediaTemplate();        
         elt.appendChild(article)
      })
      //l'ajout d'un like lorsqu'on click sur le coeur.
      this.addLikes();
      // initialize le caroussel
      const caroussel = new Caroussel();
      //appel fonction total général likes aprés chargement des medias.
      this.calculTotalLikes();
   }
       
   /**
    * Récuperer le id (dans l'url)d'un photographre.
    * @returns {number}
    */
   getPhotographerId() {
      let objetId = window.location.href.split("id=");
      let idPhotographe = parseInt(objetId[1]);
      return idPhotographe;
   }
   
   /**
    * Ajouter un like.
    */
   addLikes() {
      let totalLikes = document.querySelectorAll(".totalLikes");
      totalLikes.forEach(currentElt => {
         currentElt.addEventListener("click", event => {
            event.stopPropagation();
            let eltNbreLike = currentElt.querySelector("span");
            //eltNbreLike[1].textContent :je selectionne le deuxieme child./ 
            let currentTotalLike = parseInt(eltNbreLike.textContent);
            let stateLike = currentElt.getAttribute("data-like");
            let iconeCoeur = currentElt.querySelector("i")
            if (stateLike == 0) {
               currentElt.setAttribute("data-like", 1);
               currentTotalLike++;
               currentElt.setAttribute("title", "Je n'aime pas");
               //je selectionne l'icone coeur et je change le coeur vide(far fa-heart) par un coeur rempli (fas fa-heart)
               //methode 2 : add et remove.
               iconeCoeur.classList.value = "fas fa-heart";
               //annuler le premier click (le deuxieme click).
            } else {
               currentElt.setAttribute("data-like", 0);
               currentTotalLike--;
               currentElt.setAttribute("title", "J'aime");
               iconeCoeur.classList.value = "far fa-heart";
            }
            eltNbreLike.textContent = currentTotalLike;
            //appel de la fonction total likes pour +/- le
            this.calculTotalLikes();
         })
      })
   }

    /**
    * Calcul Total global des likes.
    */
   calculTotalLikes(){
      //je dois pointer sur le span de chaque media.
      let mediaLikesElts = document.querySelectorAll(".totalLikes span");
      let totalLikes = 0;
      //Récuperer les likes de chaque media.
      mediaLikesElts.forEach(currentSpan =>{
         //Cumuler les likes.
         totalLikes  = totalLikes + parseInt(currentSpan.textContent);
      })
         //Afficher le resultat. 
         document.querySelector(".photographer-footer-likes").textContent = totalLikes;
   }
}



