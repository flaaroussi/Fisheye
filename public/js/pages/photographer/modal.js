

export default class Modal {

  modalBtn = document.querySelectorAll(".modal-btn");
  modalbg = document.querySelector(".bground");

  initModal() {
    // Open modal event
    this.modalBtn.forEach(btn => {
      btn.addEventListener("click", event => {
        this.openModal();
      })
    });
    //Initialisation des controles.
    this.controleForm();
  }

  // Open modal form
  openModal() {
    this.modalbg.style.display = "block";
  }

  // Open modal form
  //Fermer le formulaire = modal.
  modalClose = document.querySelector(".close");
  doCloseModal() {
    this.modalClose.addEventListener("click", event => {
      modalbg.style.display = "none";
    })
  }
  
  //control & validation Modal

  //DOM Elements.
  firstNameElt  = document.getElementById("first-name");
  lastNameElt   = document.getElementById("last-name");
  emailElt      = document.getElementById("email")

  controleForm() {
    this.firstNameElt.addEventListener("input", event => {
      this.validatePrenom(this.firstNameElt);
    })
    this.lastNameElt.addEventListener("input", event => {
      this.validatePrenom(this.lastNameElt);
    })
    this.emailElt.addEventListener("input", event => {
      this.validateEmail(this.emailElt);
    })
  }

  validatePrenom(prenomElt) {
      let prenom = prenomElt.value;
      //RegExp :ecrire une chaine avec au moins 3 lettres maj ou bien min.
      let regexNomPrenom = new RegExp("^[a-zA-Z]{2,}$");
      let msgErreurPrenom = document.getElementById("first_error");
      // le message d'erreur doit etre vide à chaque validation à chaque click sur le boutton C'est parti.
      msgErreurPrenom.textContent = "";
      // annuler le border.
      prenomElt.dataset.errorVisible = "false";

      if (regexNomPrenom.test(prenom) === false) {
        msgErreurPrenom.textContent = "Saisissez un prénom qui contient au moins deux caractères alphabétiques";
        prenomElt.dataset.errorVisible = "true";
        return false;
      }
      return true;
  }

  

  validateEmail(emailElt) {
    let email = emailElt.value;
    let msgErrorEmail = document.getElementById("email_error");
    let regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    msgErrorEmail.textContent = "";
    emailElt.dataset.errorVisible = "false";

    if (regexEmail.test(email) === false) {
      msgErrorEmail.textContent = "Saisissez une adresse électronique valide";
      emailElt.dataset.errorVisible = "true";
      return false;
    }
    return true;
  }

  validateMessage(msglElt) {
    let msg = msgElt.value;
    let msgErrorMsg = document.getElementById("msg_error");
    msgErrorMsg.textContent = "";
    msgElt.dataset.errorVisible = "false";

    if (typeof msg !== 'string') {
      msgErrorMsg.textContent = "Saisissez une chaine de caractères";
      msglElt.dataset.errorVisible = "true";
      return false;
    }
    return true;
  }

}




