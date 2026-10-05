// @ts-check
import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';


test('login and enter into Dasboard with API', async ({ request }) => {

    const response_api_log = await request.post("https://practice.expandtesting.com/notes/api/users/login",
       
       {
   
           data: {

               email: 'zion_ullrich10@hotmail.com',
               password: 1234466,
           }

       });

       // Verifier le resultat du test
       expect(response_api_log.ok()).toBeTruthy();
       expect(response_api_log.status()).toBe(200);

       // conversion en json
       // json pour pouvoir mieux manipuler les donnees
       const response_api_logB = await response_api_log.json();
       console.log(response_api_logB);

       // recuperation du token 
       const tokenLog = response_api_logB.data.token;
       console.log(tokenLog);

       const ResponseGetNote = await request.get('https://practice.expandtesting.com/notes/api/notes', {

        headers:{
            "X-Auth-Token": tokenLog,
        }
       });

       expect(ResponseGetNote.ok()).toBeTruthy();
       expect(ResponseGetNote.status()).toBe(200);

       const responseBodyGetNote = await ResponseGetNote.json();
       console.log(responseBodyGetNote);

       const ResponseModNote = await request.put(
         "https://practice.expandtesting.com/notes/api/notes/6ac415f22d85510296084328",
         {
           headers: {
             "X-Auth-Token": tokenLog,
           },
           data: {
             title: "TEsR TTRT",
             completed: false,
             description: "Add T test note test",
             category: "Home",
           },

         });

         expect(ResponseModNote.ok()).toBeTruthy();
         expect(ResponseModNote.status()).toBe(200);
         console.log(ResponseModNote);

});