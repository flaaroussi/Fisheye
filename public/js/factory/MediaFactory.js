
import ImageFactory from "./ImageFactory.js";
import VideoFactory from "./VideoFactory.js";

export default class MediaFactory{

   /**
    * 
    * @param {Array | Objet} media données d'un media
    * @returns Objet : objet image ou bien objet vidéo.
    */
   constructor(media){
      
      if (media.hasOwnProperty("image")) {
        this.mediaObjet = new ImageFactory(media);
   
      }else if(media.hasOwnProperty("video")){
         this.mediaObjet = new VideoFactory(media);
      }else{
         alert("Media non trouvé");
      }

      return this.mediaObjet;
   }  
   
}



