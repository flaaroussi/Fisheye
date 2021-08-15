//creation d'une page photographer dynamique à partir des données reupérer par la fetchData.
//recupere les données d'un photographe selon son id figurant dans l'url
//on creer un element 'article'ou on fait apparaitre le photographe selectionné par la l'appele de 
//la fonction getTemplatePhotographerProfil
import Modal from "./Modal.js";
import Caroussel from "./Caroussel.js";

export default class PhotographerPage {
   constructor(data){
      // affcihage du profile
      this.displayProfil(data.photographers);
      //attache event change au combo de tri.
      this.initTri(data.media);
      // affichage des média d'u photographer
      this.triMedia(data.media, 'popularite');  
   }

   displayProfil(photographers) {
      let ident = this.getPhotographerId();
      // photographer_profil
      let elt = document.getElementById("photographer_profil");
      let photographeSelectionne = photographers.filter(currentPhotographer => currentPhotographer.id == ident);
      // si on a un id non connu on affiche un message d'erreur
      //donc ajouter la condition suivante :photographeSelectionne[0].length:au moins un photographe existe.
      if(photographeSelectionne[0]){         
         elt.innerHTML = this.getTemplatePhotographerProfil(photographeSelectionne[0]);
      }else{
         elt.innerHTML = "Veuillez sélectionner un photographer";
         return;
      }
      //ajout name du photographe dans le modal.
      document.getElementById("modal_photographer_name").textContent = photographeSelectionne[0].name;
      //ajout prix dans le footer.
      document.querySelector(".photographer-footer-price").textContent = `${photographeSelectionne[0].price} € / jour`;
      // initialize le modal
      const modal = new Modal(1);
      
   }

   //Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.
   //x=photographeSelectionne[0].
   getTemplatePhotographerProfil(x) {
      let template = `  
         <article class="photographer-card photographer-card__direction"> 
            <div class="photographer-infos">
               <div>   
                  <h2>${x.name}</h2>
                  <p class="localisation">${x.city}</p>
                  <p class="tagline">${x.tagline}</p>
                  <ul class="filtres filtres__direction">
                     ${x.tags.map(tag => `<li><a class="tag">#${tag}</a></li>`).join(" ")}
                  </ul>  
               </div>   
               <div>
                  <button class="btn modal-btn">Contactez-moi</button>
               </div>
            </div>
            <figure>
               <img src="./public/images/Photographers/${x.portrait}" alt="${x.alt}"/>
            </figure>
         </article> 
         `;
      return template;
   }

   //Création d'un tri.
   initTri(medias){
      let triCombo = document.getElementById('media-tri-combo');
      // selectionner popularité par défaut
      triCombo.value = "popularite";
      triCombo.addEventListener("change",event =>{
         this.triMedia(medias, triCombo.value);
      })         
   }

   triMedia(medias, optionTri){
      //Recuperation de l'id du photographe à afficher dans la page photographe.
      let ident = this.getPhotographerId();
      //Permission de filter les medias du photographe à afficher dans la page photographe.
      let photographerMedia = medias.filter(currentMedia => currentMedia.photographerId == ident);
      // tri des medias par option sélectionnée
      switch(optionTri){
         case 'popularite' : 
            /// tritemen du tri pa popularite
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
    * @param {*} listMedia 
    */
   displayMedia(listMedia) {
      let elt = document.getElementById("photographer_media");
      elt.innerHTML = "";
      let ident = this.getPhotographerId();
      let photographerMedia = listMedia.filter(currentMedia => currentMedia.photographerId == ident);

      photographerMedia.forEach(currentMedia => {
         let article = document.createElement("article");
         article.className = "media-card";
         //Afficher soit image soit video
         if (currentMedia.hasOwnProperty("image")) {
            article.innerHTML = this.getTemplateImage(currentMedia);
         } else if (currentMedia.hasOwnProperty("video")) {
            article.innerHTML = this.getTemplateVideo(currentMedia);
         } else {
            article.innerHTML = "Media non disponible";
         }
         elt.appendChild(article)

         
      })

      //l'ajout d'un like lorsqu'on click sur le coeur.
      this.addLikes();
      // iniitialize caroussel
      const caroussel = new Caroussel();
      //appel fonction total general likes aprés chargement des medias.
      this.calculTotalLikes();



   }

   //Création element Image
   getTemplateImage(x) {
      let template = ` 
                  <figure class="media">
                     <img src="./public/images/${x.photographerId}/${x.image}" alt="${x.alt}"/>
                     <figcaption class="media-footer">
                        <h2>${x.title}</h2>

                        <!--data-like pour savoir est ce que le coueur est deja liké --> 
                        <div class="totalLikes" aria-label="likes" title="J'aime" data-like="0">
                           <span>${x.likes}</span>
                           <i class="far fa-heart"></i>
                        </div>   
                     </figcaption>
                  </figure>
      `;
      return template;
   }

   //Création element Video
   getTemplateVideo(x) {
      let template = ` 
                  <div class="media"><video  controls  poster ><source src="./public/images/${x.photographerId}/${x.video}" /></video></div>
                  <div class="media-footer">  
                     <h2>${x.title}</h2>
                     <div class="totalLikes" aria-label="likes" title="J'aime" data-like="0"><span>${x.likes}</span> <i class="far fa-heart"></i>
                     </div>
                  </div> 
               </div>   
      `;

      return template;
   }

   //permet de recuperer le id (dans l'url)d'un photographre.
   getPhotographerId() {
      let objetId = window.location.href.split("id=");
      let ident = objetId[1];

      return ident;
   }

   //ajouter un like
   addLikes() {
      let totalLikes = document.querySelectorAll(".totalLikes");

      totalLikes.forEach(currentElt => {
         currentElt.addEventListener("click", event => {
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

   //Fonction qui calcul Total global des likes.
   calculTotalLikes(){
      //je dois pointer sur le span de chaque media.
      console.log('debut de calcul');
      let mediaLikesElts = document.querySelectorAll(".totalLikes span");
      let totalLikes = 0;
      //Récuperer les likes de chaque media.
      mediaLikesElts.forEach(currentSpan =>{
         //Cumuler les likes.
         totalLikes  = totalLikes + parseInt(currentSpan.textContent);
      })
         //afficher le resultat. 
         document.querySelector(".photographer-footer-likes").textContent = totalLikes;
   }
}



