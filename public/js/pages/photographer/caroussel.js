

class Caroussel{
   /**
    * 
    * @param{HTML element} element
    * @param{objet} option
    * @param{objet} option.slidesToScroll Nombre d'element à faire défiler
    * @param{objet} option.slidesVisible Nombre d'element visible dans un slide.
    *
    */

   constructor (element, option = {}){


   }

//methode ===creation d'un div


createDivWithClass (className){
   let div = document.createElement("div"),
   div.setAttribute ("class", className)

}

}

//document.addEventListener('DOMContentLoader,function(){}


new Caroussel(document.querySelector("#caroussel1", {
   slidesToScroll: 3,
   slidesVisibles: 3
})