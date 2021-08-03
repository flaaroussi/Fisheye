
import FisheyeApi from "../../FisheyeApi.js";
import PhotographerPage from "./photographer-page.js";

const fisheyeApi = new FisheyeApi();

//retourner les données de json.
fisheyeApi.fetchData()
.then(data => {
   const photographerPage = new PhotographerPage();
   // affcihage du profile
   photographerPage.displayProfil(data.photographers);
   
   //attache event change au combo de tri.
   photographerPage.initTri(data.media);
   // affichage des média d'u photographer
   photographerPage.triMedia(data.media, 'popularite');     
})






