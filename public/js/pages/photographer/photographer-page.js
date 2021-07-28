//creation d'une page photographer dynamique à partir des données reupérer par la fetchData.
//recupere les données d'un photographe selon son id figurant dans l'url
//on creer un element 'article'ou on fait apparaitre le photographe selectionné par la l'appele de 
//la fonction getTemplatePhotographerProfil

export default class PhotographerPage {

  displayProfil(photographers) {
     console.log(photographers);

                  
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
      elt.innerHTML = "en cour de traitement";

      let ident = this.getPhotographerId();

      let phtographerMedia = listMedia.filter(currentMedia=> currentMedia.photographerId == ident);
      



      phtographerMedia.forEach(currentMedia =>{
      
         console.log(currentMedia);
         let article = document.createElement("article");
         article.className = "media_card";  
   
         article.innerHTML = this.getTemplateMedia(currentMedia);       
         
         elt.appendChild(article)      
      })
   }

   getTemplateMedia(x){
      let template = ` 
         <article class="photographer-media photographer-media__direction"> 
               <div class="photographer-infos">
                  <figure>
                     <img src="${x.image}" alt="${x.title}"/>
                  </figure>

                  <h2>${x.title}</h2>
                  <P>${x.date}</P>
                  <span>${x.like}</span>
                  
         </article>  
         
      `;

      return template;
   }

   //permet de recuperer le id (dans l'url)d'un photographre.
   getPhotographerId(){
      let objetId = window.location.href.split("id=");
      let ident = objetId[1];
      
      return ident;
   }
}
