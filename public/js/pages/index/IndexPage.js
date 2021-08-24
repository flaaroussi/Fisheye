/**
 * Class pour la gestion de la page index
 */
export default class IndexPage {

   constructor(data) {
      let photographers = data.photographers;
      this.displayPhotographers(photographers);
      //Appliquer un filtre par tag pour n'afficher que les photographes qui ont cet tag.
      this.initFilter(photographers);
      //Boutton pour guider l'utilisateur vers le début de la page.
      this.initScroll();
   }

   /**
    * Afficher les 6 photographes.
    * @param {array} listPhotographe liste des photographes.
    */
   displayPhotographers(listPhotographe) {
      let elt = document.getElementById("dashboard_photographers");
      elt.innerHTML = "";
      listPhotographe.forEach(currentPhotographer => {
         //Creation des blocs des 6 photographes.
         let article = document.createElement("article");
         article.className = "photographer-card";
         article.innerHTML = this.getTemplatePhotographer(currentPhotographer);
         // ajouter l'article dans elt HTML 'article'.
         elt.appendChild(article);
      })
   }

   /**
    * Appliquer un filtre par tag pour n'afficher que les photographes qui ont cet tag.
    * @param {array} photographe tableau qui contient les 6 photographes.
    */
   initFilter(photographe) {
      let listTag = document.querySelectorAll(".header-nav a.tag");
      listTag.forEach(currentTag => {
         currentTag.addEventListener('click', e => {
            // Annuler style du tag selectionné.
            listTag.forEach(tag => {
               if (tag != currentTag) tag.classList.remove('actived');
            })
            let tagSelected = null;
            if (e.target.classList.value.indexOf('actived') >= 0) {
               e.target.classList.remove('actived');
            } else {
               //Ajouter la class actived à l'element selectionné.
               e.target.classList.add('actived');
               //Récupérer la valeur du data filtre du tag selectionné.
               tagSelected = e.target.getAttribute('data-filtre');
            }
            let listPhotographeFiltre = [];
            if (tagSelected) {
               photographe.forEach(currentPhotographe => {
                  if (currentPhotographe.tags.indexOf(tagSelected) >= 0) {
                     listPhotographeFiltre.push(currentPhotographe)
                  }
               })
            } else {
               listPhotographeFiltre = photographe;
            }
            this.displayPhotographers(listPhotographeFiltre);
         })
      })
   }

   /**
    * Création de la structure HTML d'un photographe .
    * @param {Objet} photographerChoisi photographer choisi.
    * @returns {HTMLElement}
    */
   getTemplatePhotographer(photographerChoisi) {
      let template = `  
            <a href="photographer-page.html?id=${photographerChoisi.id}">
            <figure >
               <img src="./public/images/Photographers/${photographerChoisi.portrait}" alt="${photographerChoisi.alt}"/>
               <figcaption><h2 class="h2-homepage">${photographerChoisi.name}</h2></figcaption>
            </figure>
            </a>
            <p class="localisation">${photographerChoisi.city}, ${photographerChoisi.country}</p> 
            <p class="tagline">${photographerChoisi.tagline}</p>
            <p class="price">${photographerChoisi.price}€/jour</p>

            <!--Afficher les tags dans une liste-->
            <ul class="filtres">
               ${photographerChoisi.tags.map(y => `<li data-filtre="${y}"><a class="tag" >#${y}</a></li>`).join(" ")}
            </ul>  
      `;
      return template;
   }

   /**
    * Botton pour guider l'utilisateur vers le début de la page.
    */
   initScroll() {
      window.addEventListener('scroll', event => {
         let elem = document.getElementById('access_main');
         if (window.scrollY > 150) {
            elem.style.display = "block";
         } else {
            elem.style.display = "none";
         }
      })
   }
}


