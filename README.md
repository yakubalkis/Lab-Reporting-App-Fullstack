# Lab-Reporting-App-Fullstack
This project is a laboratory reporting application. 

## Main Technologies Used
• React for Frontend,<br>
• Spring Boot for Backend,<br>
• MySQL for Database processes.<br>

## Functionalities
• Users can create/delete reports and also update/view all details of reports.<br>
• Users can search for reports by patient name/surname, patient TC number and laboratory worker name/surname.<br>
• Users can sort reports by date.<br>
• In order to have a user account, user must register. It is not possible to register with the hospital 
  ID number already used by someone else.<br>
• In order to log in to the application, user must enter the password and hospital ID number.<br>

## Required Installations
• Java 17 and maven <br>
• MySQL server (v8.0.32) <br>
• NodeJS (v18.13.0) <br>

## Run
#### Backend
1. Before running, you need to create "static/img" directory in target/classes directory because image files are stored in there.<br>
<img width="511" alt="file" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/5144c48b-0e91-415c-bc89-c790e600137a"><br>
2. Create new user with "springstudent" username and password on mysql server and create database named "report-system" OR
update the required fields in application.properties file to continue with your own username/password and database in mysql server.<br>
![Ekran Resmi 2023-05-28 00 37 06](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/9f7d423c-23ca-4a8c-a5d4-77580b31adeb)<br>
3. Run Spring Boot application with maven on terminal: <br>
 ```> cd [path of springboot-backend folder]``` (Open spring-boot project in terminal) <br>
 ```> mvn install``` (After that, you will see the path of jar file in terminal output. Copy this with the project folder out of the path.) <br>
 ```> java -jar path/to/your/jarfile.jar ``` <br>
 
 #### Frontend
 1. Run React App with npm on terminal: <br>
  ```> cd [path of react-frontend folder]``` <br>
  ```> npm install```<br>
  ```> npm start``` <br>
  • Finally, open http://localhost:3000 in your browser.

## Business Logic
### - Backend
#### • _Relationships Of Tables_<br> 
> I created three tables which are Laborant, Report and Role. There is an 'One to Many' bidirectional relationship between 
Laborant and Report tables. There is also 'One to One' bidirectional relationship between Laborant and Role tables.<br>
<img width="501" alt="Ekran Resmi 2023-05-27 18 49 43" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/8c9e3b27-a48b-44d9-9bd8-5870676fd03c"><br>

#### • _CRUD Operations and JPA_<br>
> I wrote two layers named repository and service for Laborant and Role classes. Repository interfaces extend JpaRepository for CRUD operations. Service interfaces and implementation classes are existed to implement methods which are inherited. <br>

#### • _About My RESTful API_<br>
Base Requests:

> ```GET "http://localhost:8080/api/v1/reports"```: Get all reports. Example response: <br><br>
<img width="351" alt="Ekran Resmi 2023-05-28 02 39 12" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/9848f6a7-2708-4e47-8ca4-a15fd9519799"><br>

> ```GET "http://localhost:8080/api/v1/reports/{id}"```: Get report by Id.<br>

> ```POST "http://localhost:8080/api/v1/reports/{laborantHospitalIdNo}"```: Create a new report. Take hospital ID number to make relationship between laboratory worker and report.<br>

> ```PUT "http://localhost:8080/api/v1/reports"```: Update the report. <br>

> ```DELETE "http://localhost:8080/api/v1/reports/{id}"```: Delete the report by Id.<br>

> ```GET "http://localhost:8080/api/v1/laborant/{hospitalIdNo}"```: Get laboratory worker by hospital ID number.<br>

> ```POST "http://localhost:8080/api/v1/file"```: Save the image file to the file system.<br>

> ```PUT "http://localhost:8080/api/v1/file"```: Update the image file.<br>

> ```GET "http://localhost:8080/api/v1/file/{imgName}"```: Get the image file from file system.<br>

Auth Requests:

> ```POST "http://localhost:8080/api/v1/auth/login"```: 
Request for login, it takes a LaborantRequest object that contains user's password and hospital ID number. It responses with AuthResponse object that contains message(Json web token) and hospital ID number. I created LaborantRequest and AuthResponse classes for these processes. <br> 

> ```POST "http://localhost:8080/api/v1/auth/register/{roleName}"```: 
Request for registration, it takes a Laborant object. I also take a variable named roleName to be able to set a role for laboratory worker. It responses with AuthResponse object to send message to the client. If hospital ID number is already used by someone else, it sends error message. If registration is successfull, it sends a success message too.

#### • _Security_<br>














  







  

