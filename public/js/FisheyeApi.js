
//Etape 1: Fetch api :

export default class FisheyeApi{
   /**
    * Récuperer les données à partir du fichier json on utilsant l'API fetch.
    * @returns {object} data données json
    */
   async fetchData(){
      // Chemin du fichier dans le serveur
      let url = "datas/FishEyeData.json";
      // await interreompt l'execution de la fonction async
      //attend la résolution de la promesse passée Promise. 
      //La fonction asynchrone reprend ensuite puis renvoie la valeur de résolution.
      const resultat = await fetch(url);
      
      if (!resultat.ok){
         return "erreur";
      }
      const data = await resultat.json();   
      return data;      
   }
} 
