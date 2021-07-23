//Etape 1: Récuperation des données à partir du fichier jason.
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
  
   let listPhotographe = data.photographers;
   //Récuperer l'id d'un photographe à partir d'un url.
   //recuperer l'url d'un photographe window.location.href puis recupere l'id par split

   let objetId = window.location.href.split("id=");

   console.log(objetId[1]);

   let ident = objetId[1];

   let phtographeSelectionne = listPhotographe.filter(elt => elt.id == ident);
  console.log(phtographeSelectionne);


   // photographer_profil
   let elt = document.getElementById("photographer_profil");
   elt.innerHTML=getTemplatePhotographerProfil(phtographeSelectionne[0]);
}

//Etatpe 2:Création template d'un photographe à travers la définition de la fct  getTemplatePhotographer.

function getTemplatePhotographerProfil(x){
   let template = `  
   <div class="photographer-card"> 
      <h2>${x.name}</h2>
      <p class="localisation">${x.city}</p>
      <p class="tagline">${x.tagline}</p>
      <ul class="filtres">
            ${x.tags.map(tag => `<li><a class="tag">#${tag}</a></li>`).join(" ")}
      </ul>  
   

   <button>Contactez-moi</button>
   
   <figure>
      <img src="${x.portrait}" alt="${x.alt}"/>
   </figure>
   </div> 

     
   `;
      return template;
}

fetchData();

