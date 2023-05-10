Problem Statement
Create a API backend for a restaurant app, using Godspeed Framework 664.
which has below REST API’s:

Method URL Description
GET /reataurant/:restaurantId Fetch a restaurant by restaurantId
POST /reataurant Createa a new restaurant
PUT /reataurant Update an existing restaurant
DELETE /restaurant/:restaurantId Delete an existing restaurant
POST /restaurant/search Fetch restaurants of a particular city, and have Menu Items also in the response, If `couponCode` is provided, it should filter only those menu items which are for that code.
Populate database with atleast 5 restaurants

Some coupon codes are HUNGRY25, HUNGRY50

Steps
Install Godspeed CLI in your local machine. Here is a detailed guide 529.
Create a new godspeed project restaurant-app using Godspeed CLI, You can follow this 529, Select postgresas database. and then Open it in VSCode.
Inside VSCode click on Open in Container. Now you newly created project is running in dev container.
From the terminal, run godspeed build and then godspeed dev. Your documentation will be served in selected port [default 3000].
Copy below prisma schema in src/datasources/postgres.prisma. You can read about Prisma ORM and Schema 138.
