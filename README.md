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
• Before running, you need to create "img" folder in target/classes/static directory because image files are stored in there.
<img width="511" alt="file" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/5144c48b-0e91-415c-bc89-c790e600137a"><br>



## Business Logic
### Backend
• Created three tables which are Laborant, Report and Role. There is an 'One to Many' bidirectional relationship between 
Laborant and Report tables. There is also 'One to One' bidirectional relationship between Laborant and Role tables.
<img width="501" alt="Ekran Resmi 2023-05-27 18 49 43" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/8c9e3b27-a48b-44d9-9bd8-5870676fd03c"><br>


  







  

