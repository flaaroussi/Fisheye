import FisheyeApi from "./FisheyeApi.js";
import HomePage from "./pages/home/HomePage.js";

//creation d'une instance de l'api.
const fisheyeApi = new FisheyeApi();

//retourner les données de json.
fisheyeApi.fetchData()
.then(data => {

   //afficher la liste des photographe
   const homePage= new HomePage();
   homePage.displayPhotographers(data.photographers);
   homePage.initFilter(data.photographers);
   homePage.initScroll();

   
})

