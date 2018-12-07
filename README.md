# APIs and Microservices: Exercise Tracker

For the Free Code Camp APIs and Microservices[Exercise Tracker](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) project.

   
## User Stories:
   1. You can create a user by posting form data username 
   to /exercise/v1/newUser and returned will be an object with username and _id.

   2. You can get all users /exercise/v1/users.

   3. You can add an exercise to any user by posting form data username, 
   description, duration. /exercise/v1/add no date supplied it will use current
   date.
   
   4. You can retrieve a full exercise log of any user by getting 
   /exercise/api/log with a parameter of username.

   5. You can retrieve part of the log of any user by also passing optional 
   parameters. &from= &to= use date format yyyy-mm-dd and &limit= is a integer

## Example creation usage:

### Show all users 
```https://siteNameHere/exercise/v1/users ```

### Get users exercise log 
```GET https:/siteNameHere/exercise/v1/log?user=aTestUser ``` 
```GET https://siteNameHere/exercise/v1/log?user=aw34&from=2014-01-01&to=2017-12-31&limit=2 ```

### Create a new user 
```POST /exercise/v1/newUser ``

### Add exercises 
```POST /exercise/v1/add ```
    
    

You can find the application hosted on Heroku [here](https://glitch.com/).