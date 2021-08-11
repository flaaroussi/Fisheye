
import FisheyeApi from "../../FisheyeApi.js";
import PhotographerPage from "./photographer-page.js";


const fisheyeApi = new FisheyeApi();


//retourner les données de json.
fisheyeApi.fetchData()
.then(data => {
   const photographerPage = new PhotographerPage(data);      
})






