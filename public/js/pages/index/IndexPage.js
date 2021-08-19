
export default class IndexPage{

   /**
    * Afficher les 6 photographes.
    * @param {array} listPhotographe liste des photographes.
    */

   displayPhotographers(listPhotographe){
      let elt = document.getElementById("dashboard_photographers");
      elt.innerHTML = "";

      listPhotographe.forEach(currentPhotographer =>{
         //Creation des blocs des 6 photographes.
         let article = document.createElement("article");
         article.className = "photographer-card";   
         article.innerHTML = this.getTemplatePhotographer(currentPhotographer);   
             
         // ajouter l'article dans elt
         elt.appendChild(article) ;  
      })
   }

   /**
    * 
    */
   initFilter(photographe){
      let listTag = document.querySelectorAll(".header-nav a.tag");
      listTag.forEach(currentTag => {
         currentTag.addEventListener('click', event => {
            
            listTag.forEach(tag =>{
               if(currentTag != tag) tag.classList.remove('actived');
            })

            //event.target.classList.value:je recupere la valeur de l'element (liste des class css ) ciblé par un click.            
           //indexof permet de chercher le mot'actived' dans la classList.

           
           let tagSelected = null; 
           if(event.target.classList.value.indexOf('actived') >= 0){
               event.target.classList.remove('actived');   
            }else{
               event.target.classList.add('actived');
               tagSelected = event.target.getAttribute('data-filtre');
            } 

            let listPhotographe = [];
            if(tagSelected){               
               photographe.forEach(x => {
                  if(x.tags.indexOf(tagSelected) >= 0){
                     listPhotographe.push(x)
                  }
               })  
            }else{
               listPhotographe = photographe;
            }           

            // let listPhotographe = photographers.filter(photographer => photographer.tags.includes(tagSelected));
            
            this.displayPhotographers(listPhotographe);
            
         })
      })
   }


  //Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.
  getTemplatePhotographer(x){
      let template = `  
      <a href="photographer-page.html?id=${x.id}">
      <figure >
         <img src="./public/images/Photographers/${x.portrait}" alt="${x.alt}"/>
         <figcaption><h2 class="h2-homepage">${x.name}</h2></figcaption>
      </figure>
      </a>
   
      <p class="localisation">${x.city}, ${x.country}</p> 
      <p class="tagline">${x.tagline}</p>
      <p class="price">${x.price}€/jour</p>

      <ul class="filtres">
         <!--photographe.tags=l'ensemble des tags dans un seul elt -->
         <!--photographe.tags.map=chaque tag est affecté dans un li -->
         <!--photographe.tags=liste des tags  tag=les elts de la liste des tags-->
         ${x.tags.map(y => `<li data-filtre="${y}"><a class="tag" >#${y}</a></li>`).join(" ")}
      </ul>  
      
      `;
         return template;
   }



   initScroll(){
      window.addEventListener('scroll', event =>{
         console.log(window.scrollY)
         let elem = document.getElementById('access_main');
         if(window.scrollY > 150){
            elem.style.display = "block";
         }else{
            elem.style.display = "none";
         }
      })
   }


}


