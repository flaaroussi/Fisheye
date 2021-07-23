//Etape 1: Récuperation des données à partir du fichier jason.
let listPhotographe = [];

const fetchData = async () =>{
   let url ="/data/FishEyeData.json";
   // await interreompt l'execution de la fonction async
   //attend la résolution de la promesse passée Promise. 
   //La fonction asynchrone reprend ensuite puis renvoie la valeur de résolution.
   const resultat = await fetch(url);
   
   if (!resultat.ok){
      return "erreur";
   }
   //variable data stocke les données sous format json.
   const data = await resultat.json();
  
   listPhotographe = data.photographers;
   displayPhotographers();
   
}

//Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.

function getTemplatePhotographer(x){
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
      ${x.tags.map(tag => `<li><a class="tag">#${tag}</a></li>`).join(" ")}
   </ul>  
     
   `;
      return template;
}

fetchData();

//filtre 
let currentfiltre = null;

//selection de filtre
function setfilter(filtre){
   document.getElementById('filtre_' + filtre).className="tag active";
   currentfiltre = filtre;
   displayPhotographers();
}
console.log(setfilter);
//afficher les photographes selon le filtre choisi.
function displayPhotographers(){
   //TODO filtrer les photographes d'apres le filtre selectionné.
   let elt = document.getElementById("dashboard_photographers");
   elt.innerHTML = "";
   for(let i=0; i<listPhotographe.length;i++){     
      //Creation des blocs des 6 photographes.
      let article = document.createElement("article");
      article.className = "photographer-card";
      

      let photographe = listPhotographe[i];
      article.innerHTML = getTemplatePhotographer(photographe); 
      
      
      elt.appendChild(article)      
   }

}

