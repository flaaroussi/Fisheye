
//Etape 1: Fetch api :

export default class FisheyeApi {
   /**
    * Récuperer les données à partir du fichier json on utilsant l'API fetch.
    * @returns {object} data données json
    */
   async fetchData() {
      let url = "datas/FishEyeData.json";
      const resultat = await fetch(url);
      if (!resultat.ok) {
         return "erreur";
      }
      const data = await resultat.json();
      return data;
   }
}
