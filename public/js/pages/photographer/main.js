import FisheyeApi from "../../FisheyeApi.js";
import PhotographerPage from "./PhotographerPage.js";
const fisheyeApi = new FisheyeApi();

/**
 * Recupérer la vraie valeur des données de json.
 */
fisheyeApi.fetchData()
.then(data => {
   //Instancier la class PhotographerPage pour afficher les medias.
   const photographerPage = new PhotographerPage(data);      
})






