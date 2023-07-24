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
