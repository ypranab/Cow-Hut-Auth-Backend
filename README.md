# Cow-Hut-Auth-Backend

# Live Link: https://cow-hut-admin-auth-ypranab.vercel.app

# Application Routes:

Auth (User)

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/auth/login (POST)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/auth/signup (POST)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/auth/refresh-token (POST)

Auth (Admin)

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/admins/create-admin (POST)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/admins/login (POST)

User

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users (GET)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users/64a1094931b4d8884acaaa0b (Single GET)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users/64a1094931b4d8884acaaa0b (PATCH)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users/64a28fa9506dcf9e01c316f5 (DELETE)

Cows

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows (POST)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows (GET)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows/649fccbfb87425bd50df721b (Single GET)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows/649fccbfb87425bd50df721b (PATCH)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows/64a28c9f9342e49796e8a301 (DELETE)

Orders

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/orders (POST)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/orders (GET)

Admin

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/admins/create-admin (POST)

My Profile

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users/my-profile (GET)
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/users/my-profile (PATCH)

Order:

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/orders/649fcd08b87425bd50df7222 (GET)

Pagination and Filtering routes of Cows

    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows?page=1&limit=10
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows?location=Chattogram
    https://cow-hut-admin-auth-ypranab.vercel.app/api/v1/cows?searchTerm=Cha



Sample Data: (User as Buyer)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",
  "password":"abrakadabra",
  "role": "buyer",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":70000,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

Sample Data: (User as Seller)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",
  "password":"abrakadabra",
  "role": "seller",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":0,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```
Sample Data: (Cow)
```json
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)"
}
```
Implement Create, Read, Update, and Delete Operations for Users Listing
Create a new User

Route: /api/v1/auth/signup (POST)

Request body:
```json
{
 "password":"abrakadabra",
 "role": "buyer",
  "name": {
    "firstName": "Kopa",
     "lastName": "Samsu"
  },
 "phoneNumber":"01711111111",
 "address": "Chattogram",
 "budget":30000  // money to buy the cow
 "income":0 // By Default 0
}
```
Route: /api/v1/auth/login (POST) Request body:
```json
{
  "phoneNumber": "000011119",
  "password": "abrakadabra"
}
```
Admin Routes :

Route: /api/v1/admins/create-admin (POST)
```json
Request body:

{
 "password":"amiadminbujheshunekothakoiyo",
 "role": "admin",
  "name":{
     "firstName": "Mr. Admin"
     "lastName": "Bhai"
   },
 "phoneNumber":"01711111111",
 "address": "Uganda",
}
```
Route: /api/v1/admins/login (POST)
```json
Request body:

{
  "phoneNumber": "011119",
  "password": "abrakadabra"
}
```
Route: /api/v1/orders (POST)

Request body:
```json
{
  "cow": "ObjectId(“649fccbfb87425bd50df721b)", // cow reference _id
  "buyer": "ObjectId(“64a1094931b4d8884acaaa0b)" // user reference  _id
}
```
