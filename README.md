# Vehicle-Hatzerim

my (still in the works) **Main project**  
the project for now in the most basic version works fine.  
but there's a lot more to do in order to make it execoitonable.

## To Do:

Right now, I'm in the trouble of finiding new server service.  
what's more, There's a need for a total crud area for the admin.

- Reason table modifier.
- Vehicle table modifier.
- User manager.

I want to Add to the add vehicle page the table I added for the  
vehicle schedual page which there's a specific table  
that takes two dates.

- **OR** Find a way to get the starting date and corolate it with  
  the right hour
- **OR** maybe try just to make the current format nicer to the  
  eye via css and conclude it there.

Change the language from **English** to **Hebrew**.

### I want to try:

1. **render**: after further investigation, there's a need for  
   **postgres\SQL service.**
2. aws free services
3. azure
4. heroku paid version

#

# The project technology's

## Front-end

1. **React**
2. **SCSS**
3. **JavaScript**
4. **TypeScript**

### Packages

1. React-Date-Picker
2. swiper/react
3. reactjs-popup

## Back-end

1. TypeScript
2. Node.js

### Packages

1. axios

## Misc

1. postgress
2. SQL DataBase

#

# Things I'm proud of

I'm really proud of the main function of the site which is giving  
the client a vehicle.  
Why?

- if the vehicle is used in the given time then it will not be shown for the  
  availabe vehicles.
- if there's no vehilce availabe the site will say it to the user
- how does the code understads that? well, via SQL request that gives  
  me the relvent information, and through it I understand if the vehicle  
  is availabe.
