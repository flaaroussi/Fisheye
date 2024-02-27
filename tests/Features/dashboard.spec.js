import { chromium } from "playwright-chromium";
import { test, expect } from '@playwright/test';
import { Commun } from "../page_object_model/Commun";

let commun = new Commun();
test.describe('Tester Page Acceuil Photographes', ()=>{

   test.beforeEach(async({page})=>{
      await commun.accessToAcceuilPage(page);
   })

   //tester si les tags sont cliquables
   test ("Tester la présence de 8 Tags dans la page d'acceuil", async ({page}) => {
      const tags = await page.locator('#header__filtres > li');
      await expect(tags).toHaveCount(8);
   });



   test('Tester le filtre tag #Portrait et la présence de 2 tag #Portrait',async({page})=>{
      const filtreTag1 = await page.locator('data-testid=portrait');
      await expect(filtreTag1).toBeVisible();
      expect(filtreTag1).toHaveText('#Portrait');//tester l'existance du tag Prtrait
      //Navigtion
      filtreTag1.click();
      const cards = page.locator(".photographer-card");//tetser que le tags nous filtre 2 card
      await expect(cards).toHaveCount(2);
      
   //ou bien
   //const tagsPortrait = await page.$$('#dashboard_photographers li[data-filtre="portrait"]');
   //expect(tagsPortrait).toHaveLength(2);
   

      const tagsPortraitSelector = 'main#main_home section#dashboard_photographers article.photographer-card li[data-filtre="portrait"]';
      const tagsPortrait= await page.$$(tagsPortraitSelector);

      console.log('Nombre tags ayant data-filtre Portrait sélectionnés:', tagsPortrait.length)

      expect(tagsPortrait).toHaveLength(2);
      

   })

   test('Tester la navigation tag #Art',async({page})=>{
      const filtreTag2 = page.locator('data-testid=art');
      await expect(filtreTag2).toBeVisible();
      expect(filtreTag2).toHaveText('#Art');//tester l'existance du tag Prtrait
      await filtreTag2.click();
      const cards = page.locator(".photographer-card");//tetser que le tags nous filtre 2 card
      await expect(cards).toHaveCount(1);
      
   })

   //Tester la navigation: On cliquant sur le portrait Mimi Keel 
   //on se redirige vers la page du Mimi Keel
   test('Tester la navigation du portrait MK vers la page MK', async({page})=>{
      //je veux cibler l'article qui contient un titre <h2> avec le texte "Mimi keel"
      //const ArticleMK = await page.$('article h2:has-text("Mimi keel") >> text=article');
      const articleMK = page.getByTestId('photographer_243');
      await expect(articleMK).toHaveAttribute('href','photographer-page.html?id=243');
      await articleMK.click();
      const titleMK = page.locator("h2").first();
      await expect(titleMK).toHaveText('Mimi Keel');

   })
})
