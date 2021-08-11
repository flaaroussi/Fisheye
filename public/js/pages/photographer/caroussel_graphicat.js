

class Caroussel{
   /**
    * 
    * @param{HTML element} element
    * @param{objet} option
    * @param{objet} option.slidesToScroll Nombre d'element à faire défiler
    * @param{objet} option.slidesVisible Nombre d'element visible dans un slide.
    */

   constructor (element, option = {}){

      this.children = [].slice.call(element.children) //il faut mettre les enfant dans le caroussel container 12:38???AVOIR.
      let element = element;
      this.root = this.createDivWithClass("caroussel");
      let container = this.createDivWithClass("caroussel__container");
      //on va mettre le container dans le root.
      root.appendChild("container");
      //on prend notre element et lui rajoute le root .
      this.element.appendChild("root");
      //je veux placer tous les enfants dans le caroussel__container.
      this.children.forEach(function(child){
         container.appendChild("child")
      });
      //fin structure html de mon caroussel


      this.setStyle();
      this.setNavigation();
   }

//methode ===creation d'un div
/*
*@param{string} ClassName
*@returns {HTMLElement}
*/
createDivWithClass (className){
   let div = document.createElement("div");
   div.setAttribute("class",className);
   return div;
}

/*
*Applique les bonnes dimensions aux elts du caroussel.
*/
setStyle (){

}

setNavigation (){
   let nextButtom = this.createDivWithClass("caroussel__next")
   let prevButtom = this.createDivWithClass("caroussel__prev")
      this.root.appendChild(nextButtom)
      this.root.appendChild(prevButtom)//on doit changer let root avec this.root ligne 16 pour pouvoir y accéder
}




}



new Caroussel(document.querySelector("#caroussel1"), {
   slidesToScroll: 3,
   slidesVisibles: 3
});