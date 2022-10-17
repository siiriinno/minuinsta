TLÜ Haapsalu Kolledži õppeaine Programmeerimine II raames loodud Wordpressi teema

//rakenduse sisu kohta rohkem kirjutada - milleks seda kasutatajse ja mida teeb


### Loodud kasutades:
Node.js, Express

### Ülesehitus
 1. `index.ts`
 2. `/components/users` kasutajad
 3. `/components/posts` postitused
 4. `/components/likes` laigid
 5. `/components/followers` jälgijad
 6. `/components/comments` kommentaarid


### Seadistamine
 - Klooni repo https://github.com/siiriinno/minuinsta
 - Paigalda sõltuvused nmp install
 - Käivita käsuga `nmp start`

### API endpoints
#### User
1. `GET/users/:id` kasutaja profiil
2. `POST/users/:id` kasutaja loomine
3. `PUT/users/:id` kasutaja muutmine
3. `DELETE/users/:id` kasutaja kustutamine

#### Post
1. `GET/posts/:id` postituse id
2. `POST/posts/:id` kasutaja loomine
3. `DELETE/posts/:id` postituse kustutamine

#### Like
1. `GET/likes/:id` like id
2. `POST/likes/:id` like loomine
3. `DELETE/likes/:id` like kustutamine

Kontakt
Siiri Inno - siirii@tlu.ee

Project Link: https://github.com/siiriinno/minuinsta