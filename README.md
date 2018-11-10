# API Basejump: Url shortener Microservice

For the Free Code Camp Back End API [Url Shortener Microservice](https://www.freecodecamp.com/challenges/url-shortener-microservice) project.

It exposes an endpoint  ```/new/:url``` to create a new shortened url


The endpoint returns the following information:

   1. The original url that was entered.
   
   2. The short url that was generated.
   

## User Stories:
   1. I can pass a URL as a parameter and I will receive a shortened URL in the
   JSON response.

   2. If I pass an invalid URL that doesn't follow the valid
   http://www.example.com format, the JSON response will contain an error instead.

   3. When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage:

```https://bexis-url-shortener.herokuapp.com/new/https://www.google.com ```
or 

```https://bexis-url-shortener.herokuapp.com/new/https://www.cs.princeton.edu/~rs/AlgsDS07/  ```
    
## Example creation output:
 
```{ "original_url": "https://www.cs.princeton.edu/~rs/AlgsDS07/", "short_url": "https://bexis-url-shortener.herokuapp.com/4376" } ```
    
## Usage:

```https://bexis-url-shortener.herokuapp.com/4376 ```

## Will redirect to:

```https://www.cs.princeton.edu/~rs/AlgsDS07/ ```

    
    

You can find the application hosted on Heroku [here](https://bexis-url-shortener.herokuapp.com/).