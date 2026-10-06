// @ts-check
import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

let tokenLog;

test.beforeEach( async ({ request })=>{

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
        tokenLog = response_api_logB.data.token;
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

});

test('login and enter into Dashboard with API', async ({ request }) => {

    

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

test('login and delete note into Dashboard with API', async ({ request }) => {

    const response_post = await request.post(
      "https://practice.expandtesting.com/notes/api/notes/",

      {
        headers: {
          "X-Auth-Token": tokenLog,
        },
        data: {
          title: "TEsTuuu TTRTER",
          completed: true,
          description: "Test temp",
          category: "Home",
        },
      }
    );
    // important verifier le token
   

    // Verifier si le status et la reponse est passee avec succes
    expect(response_post.ok()).toBeTruthy();
    expect(response_post.status()).toBe(200);

    const response_postBody = await response_post.json();
    console.log(response_post.status());


    
    const response_post_id = response_postBody.data.id;
    console.log(response_post_id);

    // Requetes REQUEST DELETE en apportant les backstricts tres importants 
    const DeleteReponseNote = await request.delete(`https://practice.expandtesting.com/notes/api/notes/${response_post_id}`,{

        headers: {

            "X-Auth-Token": tokenLog,
          }
         });

       // Afficher le status de la requete
       console.log(DeleteReponseNote.status());

       expect(DeleteReponseNote.ok()).toBeTruthy();
       expect(DeleteReponseNote.status()).toBe(200);

       // Convertion en json dans le but de bien manipuler les donnees 
       const DeleteReponseNoteBodyresult = await DeleteReponseNote.json();
       console.log(DeleteReponseNote.json());

       expect(DeleteReponseNoteBodyresult).toHaveProperty('message','Note successfully deleted');


       
});