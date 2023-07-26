# contacts-backend
This is a simple backend project in Node and Express.
MongoDB database is used here.

Features: 
- Register user (/users/register #post)
- Login user (/users/login #post)
- Password encryption using bcrypt
- jwt verification for private access APIs
- Current user's info (/users/info #get) with token verification
- Create or store new contact (/contacts/ #post) with token verification
- Get all contacts (/contacts/ #get) with token verification
- Get contact (/contacts/:id #get) with token verification
- Update contact (/contacts/:id #put) with token verification
- Delete contact (/contacts/:id #delete) with token verification
