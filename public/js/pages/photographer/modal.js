

export default class Modal{

    modalBtn = document.querySelectorAll(".modal-btn");
    modalbg = document.querySelector(".bground");

  initModal(){  
      // Open modal event
      this.modalBtn.forEach( btn => {
          btn.addEventListener("click", event => {
            this.openModal();
            console.log(this.modalBtn);
        })
      })
  }
  
    // Open modal form
    openModal(){
        this.modalbg.style.display = "block";
    }

}

