
import FisheyeApi from "../../FisheyeApi.js";
import PhotographerPage from "./PhotographerPage.js";


const fisheyeApi = new FisheyeApi();


//retourner les données de json.
fisheyeApi.fetchData()
.then(data => {
   const photographerPage = new PhotographerPage(data);      
})






