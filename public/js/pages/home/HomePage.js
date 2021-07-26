export default class HomePage{

   displayPhotographers(data){
      console.log(data);
      let listPhotographe = data.photographers;
      let elt = document.getElementById("dashboard_photographers");
      for(let i=0; i<listPhotographe.length;i++){     
         //Creation des blocs des 6 photographes.
         let article = document.createElement("article");
         article.className = "photographer-card";  
   
         let photographe = listPhotographe[i];
         article.innerHTML = this.getTemplatePhotographer(photographe);       
         
         elt.appendChild(article)      
      }
   }

   //Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.

  getTemplatePhotographer(x){
      let template = `  
      <a href="photographer-page.html?id=${x.id}">
      <figure>
         <img src="${x.portrait}" alt="${x.alt}"/>
         <figcaption><h2>${x.name}</h2></figcaption>
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


}


