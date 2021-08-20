
export default class IndexPage {

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
         // ajouter l'article dans elt HTML.
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
         currentTag.addEventListener('click', event => {
            listTag.forEach(tag => {
               if (currentTag != tag) tag.classList.remove('actived');
            })
            let tagSelected = null;
            //event.target.classList.value:je recupere la valeur 
            //de l'element (liste des class css ) ciblé par un click.            
            //indexof permet de chercher le mot'actived' dans la classList.
            if (event.target.classList.value.indexOf('actived') >= 0) {
               event.target.classList.remove('actived');
            } else {
               event.target.classList.add('actived');
               tagSelected = event.target.getAttribute('data-filtre');
            }
            let listPhotographe = [];
            if (tagSelected) {
               photographe.forEach(x => {
                  if (x.tags.indexOf(tagSelected) >= 0) {
                     listPhotographe.push(x)
                  }
               })
            } else {
               listPhotographe = photographe;
            }
            // let listPhotographe = photographers.filter(photographer => photographer.tags.includes(tagSelected));
            this.displayPhotographers(listPhotographe);
         })
      })
   }

   /**
    * Préparation de la structure HTML d'un photographe .
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
    * Scroll pour guider l'utilisateur vers le début de la page.
    */
   initScroll() {
      window.addEventListener('scroll', event => {
         console.log(window.scrollY)
         let elem = document.getElementById('access_main');
         if (window.scrollY > 150) {
            elem.style.display = "block";
         } else {
            elem.style.display = "none";
         }
      })
   }
}


