const fetchData = async () =>{
   let url ="/data/FishEyeData.json";
   const resultat = await fetch(url);
   if (!resultat.ok){
      return "erreur";
   }
   const data = await resultat.json();
   let photographers = data.photographers;
   let elt = document.getElementById("dashboard_photographes");

   for(let i=0; i <photographers.length;i++){
      console.log(i);
      //Creation des blocs des 6 photographes.
      let article = document.createElement("article");
      article.className = "bloc-photographe";
      article.innerHTML = "photographes" + i;    
      elt.appendChild(article)
      

   }

 
   
 

}

fetchData();