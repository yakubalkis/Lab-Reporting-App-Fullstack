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
• Users who have manager role can delete reports but users who don't have manager role can't delete reports.(RBAC)<br>

## Required Installations
• Java 17 and maven <br>
• MySQL server (v8.0.32) <br>
• NodeJS (v18.13.0) <br>

## Run
#### Backend
1. Before running, you need to create "static/img" directory in target/classes directory because image files are stored in there.<br>
<img width="511" alt="file" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/5144c48b-0e91-415c-bc89-c790e600137a"><br>

2. Create new user with "springstudent" username and password on mysql server and create database named "report_system" OR
update the required fields in application.properties file to continue with your own username/password and database in mysql server.<br>
![Ekran Resmi 2023-05-28 23 02 42](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/2ba9fd90-fb21-4b5a-98ff-f41950ffa96e)
<br>

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
  <hr>

## Business Logic
### - Backend
#### • _Relationships Of Tables_<br> 
> I created three tables which are Laborant, Report and Role. There is an 'One to Many' bidirectional relationship between 
Laborant and Report tables. There is also 'One to One' bidirectional relationship between Laborant and Role tables.<br>
<img width="501" alt="Ekran Resmi 2023-05-27 18 49 43" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/8c9e3b27-a48b-44d9-9bd8-5870676fd03c"><br>

#### • _CRUD Operations and JPA_<br>
> I wrote two layers named repository and service for Laborant and Role classes. Repository interfaces extend JpaRepository for CRUD operations. Service interfaces and implementation classes are existed to implement methods which are inherited. <br>

#### • _About My RESTful API_<br>
##### Base Requests:

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

##### Auth Requests:

> ```POST "http://localhost:8080/api/v1/auth/login"```: 
Request for login, it takes a LaborantRequest object that contains user's password and hospital ID number. It responses with AuthResponse object that contains message(Json web token) and hospital ID number. I created LaborantRequest and AuthResponse classes for these processes. <br> 

> ```POST "http://localhost:8080/api/v1/auth/register/{roleName}"```: 
Request for registration, it takes a Laborant object. I also take a variable named roleName to be able to set a role for laboratory worker. It responses with AuthResponse object to send message to the client. If hospital ID number is already used by someone else, it sends error message. If registration is successfull, it sends a success message too.

#### • _SECURITY_<br>
I used Spring Security with JWT for authentication and authorization processes.<br>
> First, I created JwtUserDetails class that implements the UserDetails for authentication. Then, I also created LaborantDetailsServiceImpl service class that implements the UserDetailsService to be able to use the UserDetails. <br>

> Second, I created JwtTokenProvider class to generate jwt token. I wrote methods to validate/generate jwt token in this class.<br>

> After that, I created JwtAuthenticationFilter class to filter request to check that if request is authorized.<br>

> Finally, I created JwtAuthenticationEntryPoint class to handle unauthorized requests.<br>

##### Configuration:
I wrote security configuration in SecurityConfig class.<br>
> I added a CorsFilter method to filter requests that come from cross origin to give permission.<br>
> I also added a SecurityFilterChain method to handle authenticate/authorize requests using all these security configurations.<br>

![Ekran Resmi 2023-05-28 14 59 42](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/a9d20b66-85b4-41e0-9601-ffed4973e780) <br>
<hr>

### - Frontend

#### Used packages:
> 'axios' for sending requests to the API <br>
> 'bootstrap' and 'react-bootstrap' for style <br>
> 'react-router' / 'react-router-dom' for routing pages <br>
> 'buffer' to manipulate typed arrays for image files (because files are taken as array of bytes from backend) <br>

#### Pages:
There are 4 pages for app. (AddReport, ListReports, Registration, Login)<br>

##### ListReports: <br>
> ListReports.js is used as a page to display all reports. As soon as the page is loaded, I get all reports from backend sending get request in useEffect hook block and then I display the data. To display the data, I pass this data as prop to Report component.<br>

<img width="1347" alt="53BFC626-B814-4147-9CB4-40D2F3343C0B" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/8f714ad6-dc0d-4dd9-9bd6-c793c709bbb9"> <br> 

##### AddReport: <br>
> AddReport.js is used as a page to add/update reports. If process is updating report, end of the url path will be id of report '/{id}', if process is adding report, end of the url path will be zero '/0'. This is how I decide which process it is. I also populate the form if process is updating report.<br>

![add](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/e48ecf0e-a451-4bd8-a19c-6d3a308fec45) <br>

##### Login: <br>
> Login.js is used as a login page. I send a post request for login process. After request, I get a response from this request and this response contains jwt token and hospital Id number of user. I save these items to localStorage because I need these items in other components to be able to send requests to API with jwt token.<br>
  
<img width="1200" alt="Ekran Resmi 2023-05-28 17 56 54" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/73c07efb-7a76-4767-a760-8da759019874"><br>

##### Registration: <br>
> Registration.js is used as a registration page. <br>
If everything is okay, I save the user sending post request. If registration is successful, I get a success message from response and display it with MessageToast component. <br>
If the hospital Id number entered by the user is used by someone else, I get an error from backend. By catching this error, I get an error message from response and display it with MessageToast component to user.<br>

![success](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/859d92d9-8c70-4a86-ac25-6b3d0a7a6cdc)

#### Components:<br>
There are 5 components.(Header, Logout, MessageToast, Report, ReportImage)<br>

##### Header and Logout:<br>
> I display the Logout component in the Header component. Logout component is existed for logout process.<br>

<img width="1297" alt="Ekran Resmi 2023-05-28 22 32 15" src="https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/e1526041-6e0c-4c1d-a844-d88995d78d51"><br>

##### MessageToast: <br>
> I use this custom component to display messages to user. I mentioned this above.<br>

##### Report: <br>
> It is responsiple for displaying table. It takes report list data as prop and uses it to display. Showing report image and deleting report processes run in this component. Users who have normal user role can't delete report and when they try to delete, they get message. Since I send request to delete, when user get unauthorized error, I catch this error and show message them. Only users who have manager role can delete report.<br>

![FCAEC43C-0A2A-4577-8DFB-877F82562F0D_1_201_a](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/a4649352-8933-42e9-a5c1-1438f8c53078)
<br>

##### Report Image: <br>
> It is used to display image with Modal component that is imported from "react-bootstrap" package. It takes image data as prop from Report component and displays it. When user clicks to "Click to See" component for a report, image data are taken from backend by requesting to API in Report component, then, this data is being parsed and is sent to Report Image component as prop.<br>

![4C029A17-C814-4CAF-B7C5-574A704CC7D4_1_105_c](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/3e529b76-5cf9-42f5-8b4f-b8b02a3b401f) <br>
<hr></hr>

#### Utils: <br>
> getConfig.js:<br>
I created a custom function to get jwt token from local storage. This function is used in components to put config in requests for security.<br>

![Ekran Resmi 2023-05-28 23 17 40](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/67271b29-c121-45c9-bd95-cec851bc8497)<br>

#### Implementations for Searching by filter and Sorting: <br>

##### Searching by Filter:<br>
> The user must first select the filter type, then can search.<br>
When user choose the filter type, I save chosen type to state. After that, when user entered keywords, I search for keyword by this filter type.(Block of code from ListReports.js)<br>

![Ekran Resmi 2023-05-28 23 32 55](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/94b551b7-48ca-40a4-a7ea-3a41fb81aac4) <br>

##### Sorting by Date: <br>
> When the user clicks the "Sort by Date" button for the first time, reports are sorted from past to forward. Then, if user again clicks, reports are sorted from forward to past. If user clicks the "Disable Sorting" button, reports are sorted by database again. 
(Block of code from ListReports.js) <br>

![Ekran Resmi 2023-05-28 23 40 14](https://github.com/yakubalkis/Lab-Reporting-App-Fullstack/assets/97192201/60db319d-01b9-40cc-9b21-a0ac191d7d93)








 




























  







  

