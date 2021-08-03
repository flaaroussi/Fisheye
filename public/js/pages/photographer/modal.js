

export default class Modal {

  modalBtn = document.querySelector(".modal-btn");
  modalbg = document.querySelector(".bground");
  modalClose = document.querySelector(".close");

  initModal() {

    this.modalBtn.addEventListener("click", event => {
      this.openModal();
    });

    this.modalClose.addEventListener("click", event => {
      this.doCloseModal();
    })
    //Initialisation des controles.
      this.controleForm();
  }

  openModal() {
    this.modalbg.style.display = "block";
    document.querySelector('.modal-contact').setAttribute("aria-hidden","false");
    document.querySelector('.photographe-main').setAttribute("aria-hidden","true");
    document.querySelector('.header').setAttribute("aria-hidden","true");
  }

  doCloseModal() {
    this.modalbg.style.display = "none";
    document.querySelector('.modal-contact').setAttribute("aria-hidden","true");
    document.querySelector('.photographe-main').setAttribute("aria-hidden","false");
    document.querySelector('.header').setAttribute("aria-hidden","false");
  }

  //control & validation Modal

  //DOM Elements.
  firstNameElt = document.getElementById("first-name");
  lastNameElt = document.getElementById("last-name");
  emailElt = document.getElementById("email");
  msglElt = document.getElementById("msg");
  

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




