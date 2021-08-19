import FisheyeApi from "../../FisheyeApi.js";
import IndexPage from "./IndexPage.js";

//creation d'une instance de l'api.
const fisheyeApi = new FisheyeApi();

//retourner les données de json.
fisheyeApi.fetchData()
.then(data => {

   //afficher la liste des photographe
   const indexPage= new IndexPage();
   indexPage.displayPhotographers(data.photographers);
   
   indexPage.initFilter(data.photographers);
   indexPage.initScroll();

   
})

