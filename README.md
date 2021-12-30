# Learn Bundle
Learn Bundle is a platform that aims to address the issue of online tutorials not meeting individual needs. Users can create posts on online tutorials to learn specific skills with tags to provide filters for other users. These tags can indicate whether a certain online tutorial is begineer friendly or covers a topic in depth, and these tags will allow users to easily find tutorials catered to their own needs. 

## Project Setup
First, clone with project with the following command:
```
git clone https://github.com/RichardZhangCS/learn-bundle.git
```
Next, install the project dependences for both the client and server directories by running these commands in order.:
```
cd client && npm install && cd ..
cd server && npm install && cd ..
```

## Running the application
To run the client (React) side, run the following command:
```
cd client
npm start
```
The React app should be now on localhost:3000. It will restart every time you save in the client directory.

To run the client (Express) side, run the following command:
```
cd server
npm run dev
```
The express application will restart every time you save in the server directory.

To test if the Express API is running, run the following command:
```
curl localhost:9000/
```

## Connecting to MongoDB
If you wish to have a database to test with, follow these steps.
1. Create your own Altas cluster by following this [tutorial](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/)
2. After creating your cluster, copy your database URI (connection string) from your account's Atlas (Click on "Connect" then "Connect your application")
3. Create a .env folder in the server directory
4. Type in the first line:
```
MONGODB_URI = <your connection string>
```
5. The server should now be able to connect to your database!
