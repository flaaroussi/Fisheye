//creation d'une page photographer dynamique à partir des données reupérer par la fetchData.
//recupere les données d'un photographe selon son id figurant dans l'url
//on creer un element 'article'ou on fait apparaitre le photographe selectionné par la l'appele de 
//la fonction getTemplatePhotographerProfil

export default class PhotographerPage {

  displayProfil(photographers) {
                  
      let ident = this.getPhotographerId();

      let phtographeSelectionne = photographers.filter(currentPhotographer => currentPhotographer.id == ident);
      


      // photographer_profil
      let elt = document.getElementById("photographer_profil");
      elt.innerHTML = this.getTemplatePhotographerProfil(phtographeSelectionne[0]);
   }


   //Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.
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

            <button class="btn">Contactez-moi</button>
         
            <figure>
               <img src="${x.portrait}" alt="${x.alt}"/>
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
                           <i class="fas fa-heart"></i>
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
                     <div class="totalLikes" aria-label="likes" title="J'aime" data-like="0">
                        <span>${x.likes}</span>
                        <i class="fas fa-heart"></i>
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
            

            //je selectionne child du div class="totalLikes"
            let eltNbreLike = currentElt.childNodes;
            //eltNbreLike[1].textContent :je selectionne le deuxieme child./ 
            let currentTotalLike = parseInt(eltNbreLike[1].textContent);
            
            let stateLike = currentElt.getAttribute("data-like");

            if(stateLike == 0){
               currentElt.setAttribute("data-like", 1);
               currentTotalLike++;

               console.log('like');

               //annuler le premier click (deuxieme click).
            }else {
               currentElt.setAttribute("data-like", 0);  
               currentTotalLike--; 
               console.log('déslike');  

            }
            
           eltNbreLike[1].textContent = currentTotalLike; 

         })
      })   
   }
}


