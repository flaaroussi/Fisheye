export default class ImageFactory{

   constructor(img){
      this.imgSelected = img;
   }


   getMediaTemplate(){      
      let template = ` 
                  <figure class="media">
                     <a href="#">
                     <img src="./public/images/${this.imgSelected.photographerId}/${this.imgSelected.image}" alt="${this.imgSelected.alt}"/>
                     </a>
                     <figcaption class="media-footer">
                        <h2>${this.imgSelected.title}</h2>
                        <!--data-like pour savoir est ce que le coueur est deja liké --> 
                        <div class="totalLikes" aria-label="likes" title="J'aime" data-like="0">
                           <span>${this.imgSelected.likes}</span>
                           <a href="#"><i class="far fa-heart"></i></a>
                        </div>   
                     </figcaption>
                  </figure>
      `;
      return template;
   }

}