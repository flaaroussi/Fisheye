
//Etape 1: Récuperation des données à partir du fichier jason.

 
export default class FisheyeApi{
   async fetchData(){
      let url = "datas/FishEyeData.json";
      // await interreompt l'execution de la fonction async
      //attend la résolution de la promesse passée Promise. 
      //La fonction asynchrone reprend ensuite puis renvoie la valeur de résolution.
      const resultat = await fetch(url);
      
      if (!resultat.ok){
         return "erreur";
      }
      //Stocke les données sous format json dans le variable data .
      const data = await resultat.json();   
      return data;      
   }
} 
