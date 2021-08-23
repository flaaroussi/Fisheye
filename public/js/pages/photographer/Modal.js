

export default class Modal {

  modalBtn = null;
  modalbg = null;
  modalClose = null;


  /**
   * 
   * @param {Number} isModal  0 ou bien 1.
   */

  constructor(isModal){
    // Afficher carrousel.
      if(isModal == '0'){
        this.modalbg = document.querySelector(".ligthbox-modal");
        this.modalClose = document.querySelector(".ligthbox-modal .close");
        this.initCarousselModal();
        this.openModal();
      }else{
        //Afficher Modal.
        this.modalBtn = document.querySelector(".modal-btn");
        this.modalbg = document.querySelector(".modal");
        this.modalClose = document.querySelector(".modal .close");
        this.initModal();
      }
  }
  
  /**
   *  
   */
  initModal() {
    //Vider le formulaire.
    this.formElt.reset();
    this.modalBtn.addEventListener("click", event => {
      this.openModal();
    });
    this.modalClose.addEventListener("click", event => {
      this.doCloseModal();
    })
    document.addEventListener('keydown', event => {
      switch (event.key) {        
         case "Escape":
            this.doCloseModal();
            break;
      }
   })
    //Initialisation des controles.
      this.controleForm();
  }

  initCarousselModal(){
    this.modalClose.addEventListener("click", event => {
      this.doCloseModal();
    })
  }

  openModal() {    
    this.modalbg.style.display = "block";
    document.querySelector('.bground').setAttribute("aria-hidden","false");
    document.querySelector('.photographe-main').setAttribute("aria-hidden","true");
    document.querySelector('.header').setAttribute("aria-hidden","true");
  }

  doCloseModal() {
    this.modalbg.style.display = "none";
    document.querySelector('.bground').setAttribute("aria-hidden","true");
    document.querySelector('.photographe-main').setAttribute("aria-hidden","false");
    document.querySelector('.header').setAttribute("aria-hidden","false");
  }

  //control & validation Modal.
  //DOM Elements.
  //On pointe sur les elts de la DOM.
  firstNameElt = document.getElementById("first-name");
  lastNameElt = document.getElementById("last-name");
  emailElt = document.getElementById("email");
  msgElt = document.getElementById("message");
  formElt = document.querySelector(".form")

  controleForm() {
    
    this.firstNameElt.addEventListener("input", event => {
      this.validatePrenom(this.firstNameElt);
    })
    this.lastNameElt.addEventListener("input", event => {
      this.validateNom(this.lastNameElt);
    })
    this.emailElt.addEventListener("input", event => {
      this.validateEmail(this.emailElt);
    })
    this.msgElt.addEventListener("input", event => {
      this.validateMsg(this.msgElt);
    })
    this.formElt.addEventListener("submit", event =>{
      // Empêcher l'envoi par défaut du formulaire lors du click sur envoyer
      event.preventDefault();
      this.validate(this.formElt);
    })   
  }

  /**
   * Validation de l'input prénom.
   * @param {HTMLElement} prenomElt input où saisir le prénom 
   * @returns {Boolean} true
   */

  validatePrenom(prenomElt) {
    let prenom = prenomElt.value;
    let regexPrenom = new RegExp("^[a-zA-Z]{2,}$");
    let msgErreurPrenom = document.getElementById("first_error");
    // le message d'erreur doit etre vide à chaque validation à chaque click sur le boutton C'est parti.
    msgErreurPrenom.textContent = "";
    // annuler le border.
    prenomElt.dataset.errorVisible = "false";

    if (regexPrenom.test(prenom) === false) {
      msgErreurPrenom.textContent = "Saisissez un prénom qui contient au moins deux caractères alphabétiques";
      prenomElt.dataset.errorVisible = "true";
      return false;
    }
    return true;
  }

  /**
   * Validation de l'input nom.
   * @param {HTMLElement} prenomElt input où saisir le nom 
   * @returns {Boolean} true
   */

  validateNom(nomElt) {
    let nom = nomElt.value;
    let regexNom = new RegExp("^[a-zA-Z]{2,}$");
    let msgErreurNom = document.getElementById("last_error");
    msgErreurNom.textContent = "";
    nomElt.dataset.errorVisible = "false";

    if (regexNom.test(nom) === false) {
      msgErreurNom.textContent = "Saisissez un prénom qui contient au moins deux caractères alphabétiques";
      nomElt.dataset.errorVisible = "true";
      return false;
    }
    return true;
  }
  
  /**
   * Validation de l'input e mail.
   * @param {HTMLElement} prenomElt input où saisir l'e mail
   * @returns {Boolean} true
   */
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

   /**
   * Validation de la testerea.
   * @param {HTMLElement} prenomElt input où saisir un message
   * @returns {Boolean} true
   */ 
  validateMsg(msgElt) {
    let msg = msgElt.value;
    let msgErrorMsg = document.getElementById("msg_error");
    msgErrorMsg.textContent = "";
    msgElt.dataset.errorVisible = "false";
    if (msg.length <= 0) {
      msgErrorMsg.textContent = "Saisissez un message";
      msgElt.dataset.errorVisible = "true";
      return false;
    }
    return true;
  }

  /**
   * 
   * @param {Formulaire} formContact 
   * @returns {Boolean} false
   */

  validate(formContact) {
    let isValidatePrenom = this.validatePrenom(formContact.nom);
    let isValidateNom = this.validateNom(formContact.prenom);
    let isValidateEmail = this.validateEmail(formContact.email);
    let isValidateMsg = this.validateMsg(formContact.message);
    if (isValidatePrenom && isValidateNom && isValidateEmail && isValidateMsg) {
      this.doCloseModal();             
      alert("Merci! Votre message a été envoyé.");
      return false;             
    } else {  
      return false; 
    }
  }
}




