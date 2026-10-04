// @ts-check
import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('registration with API', async ({ request }) => {

 const response_api = await request.post("https://practice.expandtesting.com/notes/api/users/register",
    
    {

        data: {
            email: faker.internet.email(),
            name: faker.internet.username() ,
            password: 1234466,
        }
    });

    // afficher les donnees en format json dans la console
    console.log(await response_api.json());
    console.log(faker.internet.password());
    // verifier si la reponse est bonne reponse + status 
    expect(response_api.ok()).toBeTruthy();
    expect(response_api.status()).toBe(201);
    
    const reponseBodyresult = await response_api.json();
    expect(reponseBodyresult).toHaveProperty('message','User account created successfully');

// console.log( "name ", faker.internet.username() ,
// "email ", faker.internet.email() ,
// "password ", faker.internet.password());

  });