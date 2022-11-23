# Vehicle-Hatzerim

## Background

I looked around where I live, And Where I live we have a fleet of vehicles and a lot of people who  
need to use the fleet. We had a system which is old and complicated to the "Older" folks in my home town.
So I tried to make a new program which is going to be easier to use and moreover, have extra functionality.
for example:

- Easier schedual table and filters to it - An Easier and shorter way to get a vehicle and cutting down unecesery rides.
- Nicer UI/UX
- An Option to get a specific vehicle every where you want.
- If you want to get to a specific Ride you only need to click on the ride  
  and you'll see the Riders Phone number so you could call.
- As for the admin, **THERE WILL BE** a page where he can update all the tables in  
  an easy fashion. moreover, he could configure some rules for expample:
  - If a rider didnt take his key 15 minutes from when he orderd, then his ride is cancled.
    or not, depends on the rider.

my (still in the works) **Main project**  
the project for now in the most basic version works fine.  
but there's a lot more to do in order to make it Good.

## To Do: Today's Task: **Create Request In The Server Which Will Be Relevent.**

- Reason table modifier.
  | Reason Id | Reason Name | Reason Score|
  |-----------|-------------|-------------|
  | number | `String` | number |

- Vehicle table modifier.
  | Vehicle plate number | type id | size id | size id|
  |----------------------|---------|---------|--------|
  | number | number | number | number|
- User manager.
  | user id | user name | user surname | user home phone | user work phone | user personal phone | is admin|
  |---------|-----------|--------------|-----------------|-----------------|---------------------|---------|
  | number | `String` | `String` | number | number | number | **`Boolean`** |

Change the language from **English** to **Hebrew**.

**There's a need to make the user only take one vehicle at a destiend time.**  
**so he wont be able to take all the vehicles at the same time.**

- I want to add age to the users table  
  and user registrations.

- **Change the Took Key row to another color and change the button to Return**  
  **Key button with function that deletes the row from the DB**

#

# The project technology's

## Front-end

1. **React**
2. **SCSS**
3. **JavaScript**
4. **TypeScript**
5. React-Date-Picker
6. swiper/react
7. reactjs-popup

## Back-end

1. **TypeScript**
2. **Node.js**
3. axios
4. express

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

### Through the project I learned about myself, and the way I work.

- How to get the job done when I have the feeling  
  of **burning out**.
- How fun it can be to come up with new ideas and
  implement it to the project.
- allways ask someone who understand little about the  
  project in order to hear other's opinion, it may be  
  a waste of time, but when it's not, it's worth it.
- in order to move forward I need to set myself a specific  
  goal. In order to stay at the needed line of work and  
  progress.
