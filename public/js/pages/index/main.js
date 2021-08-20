import FisheyeApi from "../../FisheyeApi.js";
import IndexPage from "./IndexPage.js";

//creation d'une instance de l'api.
const fisheyeApi = new FisheyeApi();

//retourner les données de json.
//Le résultat json étant une Promise, nous le retournons et récupérons sa vraie valeur dans la fonction then() suivante.
fisheyeApi.fetchData()
.then(data => {
   const indexPage = new IndexPage();
   //afficher la liste des photographe
   indexPage.displayPhotographers(data.photographers);
   //Appliquer un filtre par tag pour n'afficher que les photographes qui ont cet tag.
   indexPage.initFilter(data.photographers);
   //Boutton pour guider l'utilisateur vers le début de la page.
   indexPage.initScroll();
})

