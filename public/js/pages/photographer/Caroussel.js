import Modal from "./Modal.js";

export default class Caroussel {
   carousselMedias = document.querySelectorAll(".media");
   lastIndexSelected = 0;
   modal = null;
   
   /**
    * 
    */
   
   constructor(){
      // liste des medias d'un photoraphe
      this.carousselMedias.forEach((currentElement, currentIndex) => {
         // Attacher l'event 'click' sur chaque media pour l'afficher dans le carroussel. 
         currentElement.addEventListener("click", event => {   
            // Ouvrir le caroussel         
            this.modal = new Modal(0);
            //Afficher le media sélectionné qui est indexé par currentIndex
            this.showMedia(currentIndex);
            //Stocker l'index du media selectionné.
            this.lastIndexSelected = currentIndex;
         })
      });

      //Attacher l'event 'click' sur le btn 'next' .
      let btnNext = document.querySelector(".caroussel__next");
      btnNext.addEventListener("click", event => {
         this.showMediaNext();
      })

      //Attacher l'event 'click' sur le btn preview.
      let btnPrev = document.querySelector(".caroussel__prev");
      btnPrev.addEventListener("click", event => {
         this.showMediaPrev();
      })

      //Activer les touches du clavier.
      document.addEventListener('keydown', event => {
         switch (event.key) {
            case "ArrowRight":
               this.showMediaNext();
               break;
            case "ArrowLeft":
               this.showMediaPrev();
               break;
            case "Escape":
              if(this.modal) this.modal.doCloseModal();
               break;
         }
      })
   }

   /**
    * 
    */
   showMediaNext(){
      if (this.lastIndexSelected >= 0 && this.lastIndexSelected < this.carousselMedias.length) {
         this.lastIndexSelected++;
         this.showMedia(this.lastIndexSelected);
         
      }
   }

   showMediaPrev(){
      if (this.lastIndexSelected > 0) {
         this.lastIndexSelected--;
         this.showMedia(this.lastIndexSelected);
      }
   }

   /**????????????????????
    * Afficher medias d'un photographe selon index selectionné.
    * @param {number} index :numero du media selectionné.
    */
   showMedia(index) {
      if (index >= 0 && index < this.carousselMedias.length) {
         let mediaSelected = this.carousselMedias[index];
         let imgVideo = null;
         if (mediaSelected.querySelector('img')) {
            let currentImgSrc = mediaSelected.querySelector('img').getAttribute('src');
            imgVideo = document.createElement('img');
            imgVideo.src = currentImgSrc;
         } else {
            let currentImgSrc = mediaSelected.querySelector('video').querySelector('source').getAttribute('src');
            imgVideo = document.createElement('video');
            imgVideo.setAttribute('controls', "");
            imgVideo.setAttribute('poster', "");
            let sourceVideo = document.createElement('source');
            sourceVideo.src = currentImgSrc;
            imgVideo.appendChild(sourceVideo);
         }
         let cParent = document.getElementById('caroussel_photographer_media');
         cParent.innerHTML = "";
         cParent.appendChild(imgVideo);
         //Afficher le titre du media
         let carousselTitreMedia = document.getElementById('caroussel_photographer_titre');
         let currentTitreMedia = mediaSelected.querySelector('h2').textContent;
         carousselTitreMedia.textContent = currentTitreMedia
      }
   }
}


