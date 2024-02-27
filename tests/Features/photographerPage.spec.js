import { chromium } from "playwright-chromium";
import { test, expect } from '@playwright/test';
import {Commun}  from '../page_object_model/Commun';

let commun = new Commun();
test.describe('Tester page photographe', () =>{

   test.beforeEach(async({page})=>{

      await commun.accessTolPagePhotographer(page,243);
   })
   
   test('Tester presence du titre Mimi Keel', async({page})=>{
      const titleMK = page.locator("h2").first();
      await expect(titleMK).toHaveText('Mimi Keel');
   });

   
   


})