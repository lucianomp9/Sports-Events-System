# ⚽ Sports Events System

A CRUD system for managing sports events, implementing operations on matches, teams, stadiums, divisions, and cities. This system includes both backend REST API and a frontend application built with `Angular`.  
The backend API is developed using `Java` and `Spring Boot`, with Hibernate for object-relational mapping. `MySQL` is used as the database. Design patterns such as MVC, DTO, Repositories, and Dependency Injection are implemented, along with exception handling.


---
## Index
- [**🌐 Frontend**](#-Frontend)
	- [Installation](#frontend-installation)
	- [Usage](#frontend-usage)
	- [Features Display](#features-display)
- [**⚙ Backend**](#-Backend)
	- [Installation](#Installation)
	- [ER Model](#ER-model)
	- [API Endpoints](#api-endpoints)
		- [Team](#team)
			- [Create Team](#create-team)
			- [Get Team](#get-team)
	  		- [Get All Teams](#get-all-teams)
			- [Get Teams by City](#get-teams-by-city)
			- [Update Team](#update-team)
	   		- [Delete Team](#delete-team)
		- [Stadium](#stadium)
	   		- [Create Stadium](#create-stadium)
			- [Get Stadium](#get-stadium)
			- [Get All Stadiums](#get-all-stadiums)
			- [Update Stadium](#update-stadium)
	   		- [Delete Stadium](#delete-stadium)
		- [Division](#division)
			- [Create Division](#create-division)
			- [Get Division](#get-division)
			- [Get All Divisions](#get-all-divisions)
			- [Update Division](#update-division)
			- [Delete Division](#delete-division)
	  	- [City](#city)
			- [Create City](#create-city)
			- [Get City](#get-city)
			- [Get All Cities](#get-all-cities)
			- [Update City](#update-city)
			- [Delete City](#delete-city)
	  	- [Match](#match)
			- [Create Match](#create-match)
			- [Get Match](#get-match)
			- [Get All Matches](#get-all-matches)
			- [Delete Match](#delete-match)


# 🌐 Frontend

##  Frontend Installation
To install and run the frontend application, follow these steps:

1. Navigate to the frontend directory within the project.
2. Install dependencies using npm or yarn.
3. Run the development server.

## Frontend Usage
Once the frontend application and the backend API is running, you can access it through a web browser. The application provides a user-friendly interface for interacting with the Sports Events system.

# Features Display

## 🎟 Create Event
![create-event](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/6976aebd-de63-4528-bd65-fa33b9fac72a)

### 👥 Create Team
![create-team](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/ab842581-67ca-429d-943e-3f235291fc93)

### 🏙 Create City
![create-city](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/a074b796-2cfa-4491-9242-649dde45ce95)

### 🏟 Create Stadium
![create-stadium](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/74b7818a-d3fc-451a-a110-772ce9765af6)

### 🏆 Create Division
![create-division](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/c80d3e9f-d786-4c7d-a258-4986f31d9610)

### 🔄 Reactive Rendering
![reactive-rendering](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/7bd1108b-a872-4e3d-9edf-49e6e36b21df)

### ⚠️ Error Popups
![error-handling](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/64111775-fa5f-47dd-add9-562bfa9d37c2)

### ✅ Input Validation
![validation](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/1f032a42-424a-4576-beb6-10e609e752d5)        
ㅤ
ㅤ
ㅤ
ㅤ




# ⚙ Backend

## Installation
### Configuration and Application Execution
Follow these steps to configure, install, and run the application. You must have Java 17 and MySQL installed.

### Clone the Repository
First, clone this repository to your local machine using the following command in your terminal:
``` git clone https://github.com/lucianomp9/Sports-Events-System.git ```

### Open the Project in your Integrated Development Environment (IDE)

#### Open your development environment (IntelliJ IDEA, NetBeans, Eclipse, Spring Tool Suite) and select "Open Project" or its equivalent. Navigate to the project folder you just cloned and open it.

### Configure the Database
In the application.properties file, located in the project's resources folder (src/main/resources/application.properties), make the following changes:

# Database configuration
spring.datasource.username= your-username

spring.datasource.password= your-password

spring.datasource.url=jdbc:mysql://localhost/your-db-name?useSSL=false&serverTimeZone=UTC


### Create the Database
Open your MySQL client and create the database with the name specified in the previous URL. Use the database creation script provided at:
src/main/resources/scripts/bd_script.sql

### Run the Application
Once you have configured the database and saved the changes in application.properties, you can run the application. Find the main class "MatchescrudApplication" (annotated with @SpringBootApplication) and click the run button in your development environment.

# ER Model
The Entity-Relationship model corresponding to the database.

![ER Model](https://github.com/lucianomp9/Sports-Events-CRUD/assets/86586819/8409d484-4e3a-4c96-b276-697551988f5a)




# API Endpoints
### Team
 Create, Read, Update, Delete from a Team.
#### Create Team
```http
  POST localhost:8080/api/v1/team
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| name| `String` | By **Body**  |Barcelona F.C.
| division| `Division` | By **Body** or by **ID** (*if exists*)  |Spanish League
| city| `City` | By **Body** or by **ID**  (*if exists*)  | Barcelona
| stadium| `Stadium` | By **Body** or by **ID**  (*if exists*)  | Camp Nou, 99354

- URL: localhost:8080/api/v1/team
- Method: POST
- Response:
  
  **201 - CREATED**: name,division,city,stadium
  
  **409 - CONFLICT**: *(Team/Division/City/Stadium)* Already Exists, (Division/City/Stadium) With ID (id) Not Found
  
> [!NOTE]
> If (Division/City/Stadium) doesn't exist, it is created automatically. You can then use them with another team via their ID. Home and Away matches lists are created empty.

#### Postman Example
![post_team](https://github.com/lucianomp9/random/assets/86586819/d1c65708-71c9-4da2-9648-f29ee09bdf35)

#### Get Team
```http
  GET localhost:8080/api/v1/team/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**  | 5

- URL: localhost:8080/api/v1/team/{id}
- Method: GET
- Response:
  
  **200 - OK:** id, name, division, city, stadium, homeMatches, awayMatches *(TeamDTO)*
  
  **404 - NOT FOUND:** No team was found with id: {id}

#### Postman Example
![image](https://github.com/lucianomp9/random/assets/86586819/a787e623-f433-409d-aefd-467c12a21ed6)


#### Get All Teams
```http
  GET localhost:8080/api/v1/team
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| |  | No parameters required.  |

- URL: localhost:8080/api/v1/team/{id}
- Method: GET
- Response:
  
  **200 - OK:** JSON array containing TeamDTO objects. If no teams exist, it returns an empty array: []

**Postman Example**
![image](https://github.com/lucianomp9/random/assets/86586819/a0186d10-3858-471a-b269-d46b53580f1f)


#### Get Teams by City
```http
  GET localhost:8080/api/v1/teamByCity/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
|id  | `Long`| By **URL**  | 4

- URL: localhost:8080/api/v1/teamByCity/{id}
- Method: GET
- Response:
  
  **200 - OK:** JSON array containing TeamDTO objects. If no teams exist, it returns an empty array: []
  
  **409 - CONFLICT:** No city was found with id: {id}

**Postman Example**
![image](https://github.com/lucianomp9/random/assets/86586819/1591a5f7-2895-4ed6-9f79-7e055c57c9da)


#### Update Team
```http
  PUT localhost:8080/api/v1/team/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**  |5
| name| `String` | By **body**  |Independiente
| division| `Division` | By **Body** or by **ID** (*if exists*)  |Primera Division
| city| `City` | By **Body** or by **ID**  (*if exists*)  | Avellaneda
| stadium| `Stadium` | By **Body** or by **ID**  (*if exists*)  | Libertadores de America Ricardo Enrique Bochini, 42069

- URL: localhost:8080/api/v1/team/{id}
- Method: PUT
- Response:
  
  **200 - OK**: id, name, division, city, stadium, homeMatches, awayMatches *(TeamDTO)*
  
  **404 - NOT FOUND**: No team was found with id: {id}
  
  **409 - CONFLICT**: (Division/City/Stadium) With ID (id) Not Found

**Postman Example** 
![image](https://github.com/lucianomp9/random/assets/86586819/c47d5e56-e367-47e5-be8c-d11e05ec0252)


#### Delete Team
```http
  DELETE localhost:8080/api/v1/team/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
|id  | `Long`| By **URL**  | 5

- URL: localhost:8080/api/v1/team/{id}
- Method: DELETE
- Response:
  
  **200 - OK**: id, name, division, city, stadium, homeMatches, awayMatches *(TeamDTO)*
  
  **404 - NOT FOUND**: No team was found with id: {id}
  
**Postman Example** 
![image](https://github.com/lucianomp9/random/assets/86586819/5cb5b527-6fe3-4bb4-acbc-16ee25ce5f65)


### Stadium
 Create, Read, Update, Delete from a Stadium.

#### Create Stadium
```http
  POST localhost:8080/api/v1/stadium
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| name| `String` | By **body**  | "Old Trafford"
| capacity| `int` | By **body**  | 74310

- URL: localhost:8080/api/v1/stadium
- Method: POST
- Response:

  **201 - CREATED**: id, name, capacity. *(StadiumDTO)*
  
  **409 - CONFLICT**: Stadium with name *{name}* already exists  

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/7835de16-2052-423f-9f53-7731a513953a)

#### Get Stadium
```http
  GET localhost:8080/api/v1/stadium/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 7


- URL: localhost:8080/api/v1/stadium/{id}
- Method: GET
- Response:

  **200 - OK**: id, name, capacity. *(StadiumDTO)*
  
  **404 - NOT FOUND**: Stadium with ID *{id}* Not Found.


**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/1a90a373-b230-4856-923d-339a3caf5092)


#### Get All Stadiums
```http
  GET localhost:8080/api/v1/stadium
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| |  | No parameters required.  |


- URL: localhost:8080/api/v1/stadium
- Method: GET
- Response:

    **200 - OK:** JSON array containing *StadiumDTO* objects. If no stadium exist, it returns an empty array: []

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/9b247b8f-2dfb-491f-bd14-2cc0c4726ef7)


#### Update Stadium
```http
  PUT localhost:8080/api/v1/stadium/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 7
| name| `String` | By **body**  | "Anfield"
| capacity| `int` | By **body**  | 61276


- URL: localhost:8080/api/v1/stadium/{id}
- Method: PUT
- Response:

  **200 - OK**: id, name, capacity. *(StadiumDTO)*
  
  **404 - NOT FOUND**: Stadium with ID *{id}* Not Found.

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/95d9f5ae-5884-4acd-938e-028cef44d13a)


#### Delete Stadium
```http
  DELETE localhost:8080/api/v1/stadium/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 7


- URL: localhost:8080/api/v1/stadium/{id}
- Method: DELETE
- Response:

   **200 - OK**: id, name, capacity. *(StadiumDTO)*
  
  **404 - NOT FOUND**: Stadium with ID *{id}* Not Found.


**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/4e963cf3-ce0a-40c6-ab3e-c05e691cbee0)


### Division
 Create, Read, Update, Delete from a Division.

#### Create Division
```http
  POST localhost:8080/api/v1/division
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| name| `String` | By **body**  | "Premier League"

- URL: localhost:8080/api/v1/division
- Method: POST
- Response:

  **201 - CREATED**: id, name. *(DivisionDTO)*
  
  **409 - CONFLICT**: Division with name *{name}* already exists  

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/853ffdd0-20ec-4b48-ad0b-9c2fafe83473)


#### Get Division
```http
  GET localhost:8080/api/v1/division/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 5


- URL: localhost:8080/api/v1/division/{id}
- Method: GET
- Response:

  **200 - OK**: id, name. *(DivisionDTO)*
  
  **404 - NOT FOUND**: Division with ID *{id}* Not Found.

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/d277d440-2f0d-49c4-8b49-6ae992d28df5)


#### Get All Divisions
```http
  GET localhost:8080/api/v1/division
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| |  | No parameters required.  |


- URL: localhost:8080/api/v1/division
- Method: GET
- Response:

    **200 - OK:** JSON array containing *DivisionDTO* objects. If no division exist, it returns an empty array: []

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/3c3087a1-0b34-45a4-a13c-ba9fcc3d49d7)


#### Update Division
```http
  PUT localhost:8080/api/v1/division/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 5
| name| `String` | By **body**  | "Bundesliga"


- URL: localhost:8080/api/v1/division/{id}
- Method: PUT
- Response:

  **200 - OK**: id, name. *(DivisionDTO)*
  
  **404 - NOT FOUND**: Division with ID *{id}* Not Found.

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/59a9783d-2aff-46fe-99c2-45b254db1235)


#### Delete Division
```http
  DELETE localhost:8080/api/v1/division/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 5


- URL: localhost:8080/api/v1/division/{id}
- Method: DELETE
- Response:

  **200 - OK**: id, name. *(DivisionDTO)*
  
  **404 - NOT FOUND**: Division with ID *{id}* Not Found.

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/e0376f30-4403-48a2-8457-fd757025a0e2)


### City
 Create, Read, Update, Delete from a City.

#### Create City
```http
  POST localhost:8080/api/v1/city
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| name| `String` | By **body**  | "Cordoba"

- URL: localhost:8080/api/v1/city
- Method: POST
- Response:

  **201 - CREATED**: id, name. *(CityDTO)*
  
  **409 - CONFLICT**: City with name *{name}* already exists  

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/67f5c587-f54a-47b4-978c-2a94bcbb176f)


#### Get City
```http
  GET localhost:8080/api/v1/city/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 6


- URL: localhost:8080/api/v1/city/{id}
- Method: GET
- Response:

  **200 - OK**: id, name. *(CityDTO)*
  
  **404 - NOT FOUND**: City with ID *{id}* Not Found.

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/d9a14025-bca3-4187-9830-7450396f44e8)


#### Get All Cities
```http
  GET localhost:8080/api/v1/city
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| |  | No parameters required.  |


- URL: localhost:8080/api/v1/city
- Method: GET
- Response:

    **200 - OK:** JSON array containing *CityDTO* objects. If no division exist, it returns an empty array: []

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/9e27decc-d6c3-4122-a43b-e04926575eac)



#### Update City
```http
  PUT localhost:8080/api/v1/city/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 6
| name| `String` | By **body**  | "Manchester"


- URL: localhost:8080/api/v1/city/{id}
- Method: PUT
- Response:

  **200 - OK**: id, name. *(CityDTO)*
  
  **404 - NOT FOUND**: City with ID *{id}* Not Found.

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/9859becd-3037-4569-a31e-c2993516822c)



#### Delete City
```http
  DELETE localhost:8080/api/v1/city/{id}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| id| `Long` | By **URL**.  | 6


- URL: localhost:8080/api/v1/city/{id}
- Method: DELETE
- Response:

  **200 - OK**: id, name. *(CityDTO)*
  
  **404 - NOT FOUND**: City with ID *{id}* Not Found.

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/64e0f6fa-07a7-410a-97dc-25a5592d280d)



### Match
 Create, Read, Delete from a Match.

#### Create Match
```http
  POST localhost:8080/api/v1/match
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| date| `LocalDate` | By **Body**  | 2024-01-21
| time| `LocalTime` | By **Body**  | 14:00:00
| homeTeam| `Team` | By **Body** or by **ID**  (*if exists*)  | {id: 6}
| awayTeam| `Team` | By **Body** or by **ID**  (*if exists*)  | {id: 7}
| homeGoals| `int` | By **Body**   | 5
| awayGoals| `int` | By **Body**   | 4
| spectators| `int` | By **Body**   | 56325
| ticketPrice| `BigDecimal` | By **Body**   | 20.5

- URL: localhost:8080/api/v1/match
- Method: POST
- Response:

  **201 - CREATED**: uuid, stadium, date, time, homeTeam, awayTeam, homeGoals, awayGoals, spectators, revenue *(MatchResponseDTO)*
  
  **404 - NOT FOUND**: Team with id *{id}* Not Found.

> [!NOTE]
> The Match *UUID* is generated automatically when the match is created.
> 
> The *Match Stadium* is automatically assigned by taking the home team's stadium.
> 
> The *Match Revenue* is calculated using the following operation: *spectators * ticketPrice*
> 
> Each Match is automatically added, as appropriate, to the *HomeMatches* or *AwayMatches* list of each team.

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/97939c95-fdd4-4b27-8eaf-bf2f747f2f43)


#### Get Match
```http
  GET localhost:8080/api/v1/match/{uuid}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| uuid| `UUID` | By **URL**.  | 46940236-7a1a-4a40-9e13-18ca3dbad218


- URL: localhost:8080/api/v1/match/{uuid}
- Method: GET
- Response:

  **201 - CREATED**: uuid, stadium, date, time, homeTeam, awayTeam, homeGoals, awayGoals, spectators, revenue *(MatchResponseDTO)*
  
  **404 - NOT FOUND**: No match was found with UUID: *{uuid}*

**Postman Example** 

![image](https://github.com/lucianomp9/random/assets/86586819/62d70430-18f7-4049-bcb9-6339b18cb6e8)
![image](https://github.com/lucianomp9/random/assets/86586819/a41a5530-6066-4150-90d0-273c1eae1cb0)



#### Get All Matches
```http
  GET localhost:8080/api/v1/match
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| |  | No parameters required.  |


- URL: localhost:8080/api/v1/match
- Method: GET
- Response:

    **200 - OK:** JSON array containing *MatchResponseDTO* objects. If no matches exist, it returns an empty array: []

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/24998291-e3c7-4fea-821a-87d2a17461cd)


#### Delete Match
```http
  DELETE localhost:8080/api/v1/match/{uuid}
```
| Parameter | Type     | Description              | Example|
| :-------- | :------- | :------------------------- | :------------------------- |
| uuid| `UUID` | By **URL**.  | b4abec48-e410-455a-82d3-7bd18f34e1af


- URL: localhost:8080/api/v1/match/{uuid}
- Method: DELETE
- Response:

  **200 - OK**: uuid, stadium, date, time, homeTeam, awayTeam, homeGoals, awayGoals, spectators, revenue *(MatchResponseDTO)*
  
  **404 - NOT FOUND**: No match was found with UUID: *{uuid}*

**Postman Example**

![image](https://github.com/lucianomp9/random/assets/86586819/2558d0ba-466f-48fb-a321-1f716baf1fd4)
