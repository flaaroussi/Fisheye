export default class Filter{
   doFilter() {
      console.log("traitement de filtre");
      let listTag = document.querySelectorAll(".header-nav a.tag");
      for (let i=0 ;i<listTag.length ;i++){
         listTag[i].addEventListener('click', event => {
           console.log(event.target.classList.value.indexOf('actived'));
            if(event.target.classList.value.indexOf('actived') != -1){
               event.target.classList.remove('actived')
            }else{
               event.target.classList.add('actived')
            }            

         });
      }        
   }
   
}