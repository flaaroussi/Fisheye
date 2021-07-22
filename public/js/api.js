function getTemplatePhotographer(photographe){
   let template = `  
   <a href="photographer-page.html">
   <figure>
      <img src="${photographe.portrait}" alt="${photographe.alt}"/>
      <figcaption><h2>${photographe.name}</h2></figcaption>
   </figure>
   
   </a>
  
   <p class="localisation">${photographe.city}, ${photographe.country}</p> 
   <p class="tagline">${photographe.tagline}</p>
   <p class="price">${photographe.price}€/jour</p>
   <ul class="filtres">
      <!--photographe.tags=l'ensemble des tags dans un seul elt -->
      <!--photographe.tags.map=chaque tag est affecté dans un li -->
      <!--photographe.tags=liste des tags  tag=les elts de la liste des tags-->
      ${photographe.tags.map(tag => `<li><a class="tag">#${tag}</a></li>`).join(" ")}
   </ul>  
   
   
   `;


      return template;


}


const fetchData = async () =>{
   let url ="/data/FishEyeData.json";
   // await interreompt l'excution de la fonction async
   //attend la résolution de la promesse passée Promise. 
   //La fonction asynchrone reprend ensuite puis renvoie la valeur de résolution.
   const resultat = await fetch(url);
   
   if (!resultat.ok){
      return "erreur";
   }
   const data = await resultat.json();
   let photographers = data.photographers;
   let elt = document.getElementById("dashboard_photographers");

   for(let i=0; i<photographers.length;i++){
      console.log(photographers[i]);
      //Creation des blocs des 6 photographes.
      let article = document.createElement("article");
      article.className = "photographer-card";
      article.innerHTML = getTemplatePhotographer(photographers[i]);    
      elt.appendChild(article)
      

   }
   function tags(){
   // display tags for each photographer.
      for(let i=0; i<tags.length; i++){
      console.log(tags[i]);
      }
   }
   //

}

fetchData();