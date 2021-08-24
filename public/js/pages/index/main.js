import FisheyeApi from "../../FisheyeApi.js";
import IndexPage from "./IndexPage.js";

//Creation d'une instance de l'api.
const fisheyeApi = new FisheyeApi();

//Retourner les données de json.
//Le résultat json étant une Promise, nous le retournons et récupérons sa vraie valeur dans la fonction then() .
fisheyeApi.fetchData()
.then(data => {
   //Créer une instance =>Afficher la liste des photographes.
   const indexPage = new IndexPage(data);   
})

