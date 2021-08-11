import Modal from "./Modal.js";


export default class Caroussel {
   carousselMedias = document.querySelectorAll(".media");
   lastIndexSelected = 0;
   /**
    * Constructeur de la class
    */
   constructor() {
      // liste de media d'un photoraphe
      this.carousselMedias.forEach((currentElement, currentIndex) => {
         // attcher l'event clique sur chaque media pour l'afficher dans la carroussel 
         currentElement.addEventListener("click", event => {
            // Ouvrir le caroussel         
            const modal = new Modal(0);
            //afficher le media sélectionné qui indexer par currentIndex
            this.showMedia(currentIndex);
            //Stocker l'index du media selectionné.
            this.lastIndexSelected = currentIndex;
         })
      });
      //Attach event 'click' sur le btn 'next' .
      let btnNext = document.querySelector(".caroussel__next");
      btnNext.addEventListener("click", event => {
         if(this.lastIndexSelected >=0 && this.lastIndexSelected <this.carousselMedias.length){
            this.lastIndexSelected++;
            console.log(this.lastIndexSelected)
            this.showMedia(this.lastIndexSelected);
         }
      })
      //Attach event 'click' sur le btn preview.
      let btnPrev = document.querySelector(".caroussel__prev");
      btnPrev.addEventListener("click", event => {
         if(this.lastIndexSelected >=0 ){
            this.lastIndexSelected--;
            console.log(this.lastIndexSelected)
            this.showMedia(this.lastIndexSelected);
         }
      })
   }

   showMedia(index) {
      if(index >=0 && index<this.carousselMedias.length){
      let mediaSelected = this.carousselMedias[index];
      let currentImgSrc = mediaSelected.querySelector('img').getAttribute('src');
      let carousselElt = document.querySelector('.caroussel-img');
      carousselElt.setAttribute('src', currentImgSrc);
      }
   }

   
}

