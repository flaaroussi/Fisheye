//creation d'une page photographer dynamique à partir des données reupérer par la fetchData.
//recupere les données d'un photographe selon son id figurant dans l'url
//on creer un element 'article'ou on fait apparaitre le photographe selectionné par la l'appele de 
//la fonction getTemplatePhotographerProfil
import Modal from "./Modal.js"
export default class PhotographerPage {

  displayProfil(photographers) {
                  
      let ident = this.getPhotographerId();

      let phtographeSelectionne = photographers.filter(currentPhotographer => currentPhotographer.id == ident);
      


      // photographer_profil
      let elt = document.getElementById("photographer_profil");
      elt.innerHTML = this.getTemplatePhotographerProfil(phtographeSelectionne[0]);
      //ajout name du photographe dans le modal.
      document.getElementById("modal_photographer_name").textContent = phtographeSelectionne[0].name;
      // initialize le modal
      const modal = new Modal()
      modal.initModal();
   }


   //Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.
   //x=phtographeSelectionne[0].
   getTemplatePhotographerProfil(x) {
      let template = `  
         <article class="photographer-card photographer-card__direction"> 
            <div class="photographer-infos">
               <h2>${x.name}</h2>
               <p class="localisation">${x.city}</p>
               <p class="tagline">${x.tagline}</p>
               <ul class="filtres">
                  ${x.tags.map(tag => `<li><a class="tag">#${tag}</a></li>`).join(" ")}
               </ul>  
            </div>

            <button class="btn modal-btn">Contactez-moi</button>
         
            <figure>
               <img src="./public/images/Photographers/${x.portrait}" alt="${x.alt}"/>
            </figure>
         </article> 
         `;

      return template;
   }

/**
 * Traitement media par photographe
 * @param {*} listMedia 
 */

   displayMedia(listMedia){


      let elt = document.getElementById("photographer_media");
      elt.innerHTML = "";

      let ident = this.getPhotographerId();

      let phtographerMedia = listMedia.filter(currentMedia=> currentMedia.photographerId == ident);
      



      phtographerMedia.forEach(currentMedia =>{
      
         let article = document.createElement("article");
         article.className = "media-card";  
         
         //Afficher soit image soit video
            //
         if(currentMedia.hasOwnProperty("image") ){
            article.innerHTML = this.getTemplateImage(currentMedia);
         }else if (currentMedia.hasOwnProperty("video") ){
            article.innerHTML = this.getTemplateVideo(currentMedia);  
         }else{
            article.innerHTML = "Media non disponible";
         }
         
         elt.appendChild(article)      
      })
      //l'ajout d'un like lorsqu'on click sur le coeur.
      this.addLikes();
   }
   
   //Création element Image
   getTemplateImage(x){
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

   //Création element Viodéo
   getTemplateVideo(x){
      let template = ` 
                  <video class="media" controls  poster=""><source src="./public/images/${x.photographerId}/${x.video}" /></video>
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
   getPhotographerId(){
      let objetId = window.location.href.split("id=");
      let ident = objetId[1];
      
      return ident;
   }

//ajouter un like
   addLikes(){
      let totalLikes = document.querySelectorAll(".totalLikes");
      
      totalLikes.forEach(currentElt =>{
         currentElt.addEventListener("click",event => {
            

            let eltNbreLike = currentElt.querySelector("span");
            //eltNbreLike[1].textContent :je selectionne le deuxieme child./ 
            let currentTotalLike = parseInt(eltNbreLike.textContent);
            
            let stateLike = currentElt.getAttribute("data-like");
            let iconeCoeur = currentElt.querySelector("i")
            if(stateLike == 0){
               currentElt.setAttribute("data-like", 1);
               currentTotalLike++;
               currentElt.setAttribute("title", "Je n'aime pas");
               //je selectionne l'icone coeur et je change le coeur vide(far fa-heart) par un coeur rempli (fas fa-heart)
               //methode 2 : add et remove.
               iconeCoeur.classList.value = "fas fa-heart";

               //annuler le premier click (le deuxieme click).
            }else {
               currentElt.setAttribute("data-like", 0);  
               currentTotalLike--;
               currentElt.setAttribute("title", "J'aime");
               iconeCoeur.classList.value = "far fa-heart";

            }
            
            eltNbreLike.textContent = currentTotalLike; 

         })
      })   
   }
}


