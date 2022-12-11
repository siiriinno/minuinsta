TLÜ Haapsalu Kolledži õppeaine Programmeerimine II raames loodud projekt

See on Twitterilaadse rakenduse API, sellega saab kasutajaid lisada, muuta ja 
kustutada, postitusi lisada, muuta ja kustutada, meeldimisi lisada ja kustutada, 
jälgida teisi kasutajaid, jälgimist lõpetada ja sisse logida ja jälgitavate 
viimaseid postitusi vaadata.

### Loodud kasutades:
Node.js, Express

### Ülesehitus
 1. `index.ts`
 2. `/components/users` kasutajad, jälgijad
 3. `/components/posts` postitused
 4. `/components/likes` meeldimised
 
### Seadistamine
 - Klooni repo https://github.com/siiriinno/minuinsta
 - Paigalda sõltuvused nmp install
 - Käivita käsuga `nmp start`

### API endpoints
#### User
1. `GET/users/:id` kasutaja profiil
2. `POST/users/:id` kasutaja loomine
3. `PUT/users/:id` kasutaja muutmine
4. `DELETE/users/:id` kasutaja kustutamine

#### Following
1. `POST/users/following/:id` jälgimise lisamine
2. `DELETE/users/following/:id` jälgimise kustutamine

#### Post
1. `GET/posts//latest` viimased postitused
2. `GET/posts/:id` postituse id
3. `POST/posts/:id` kasutaja loomine
4. `DELETE/posts/:id` postituse kustutamine

#### Like
1. `GET/likes/:id` like id
2. `POST/likes/:id` like loomine
3. `DELETE/likes/:id` like kustutamine

#### Login
1. `POST/login/` sisselogimine

Kontakt
Siiri Inno - siirii@tlu.ee

Project Link: https://github.com/siiriinno/minuinsta
