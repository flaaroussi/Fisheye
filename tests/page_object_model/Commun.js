import { chromium } from "playwright-chromium";

exports.Commun = class Commun{

   constructor(){

   }

   accessToAcceuilPage = async(page) =>{
      await page.goto('http://127.0.0.1:5500/index.html'); 
   }

   accessTolPagePhotographer = async(page ,idPage) =>{
      await page.goto('http://127.0.0.1:5500/photographer-page.html?id='+idPage); 
   }
  
   
}