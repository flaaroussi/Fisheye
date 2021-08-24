export default class VideoFactory{

   constructor(video){
      this.videoSelected = video;
   }

   getMediaTemplate(){
     let template = ` 
                <figure class="media">
                  <video  controls role="button">
                     <source src="./public/images/${this.videoSelected.photographerId}/${this.videoSelected.video}" />
                  </video>
                  <figcaption class="media-footer">  
                     <h2>${this.videoSelected.title}</h2>
                     <div class="totalLikes" aria-label="likes" title="J'aime" data-like="0"><span class="media-nbr-likes">${this.videoSelected.likes}</span> 
                     <a ><i class="far fa-heart"></i></a>
                     </div>
                  </figcaption> 
               </figure>   
      `;
      return template;
   }

}