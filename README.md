# AnomalyDetectionWebApp

## milestone 2
## group members:
Shilo Ulman, Tal Ben-Zvi, Shaked Winder, Roy Tamir

## Design:
This is a website for anomaly detection.
In our site, the user has an option to finds anomalies in a file that he/ she thinks there might be anomalies in.

We used the MVC design pattern to create the application.
The View of the application wrote with the html language.
The view can communicate with the controller, that was wrote with Node.js technology.
The Model was wrote also with node.js, and he also can communicate with the controller, and through it - with the view. The model provides the application's main functionalies.

Of course, the best part of our site is the gif that we added to it!!


## Preparations for using the application:
In order to use our application, the user needs to download node.js package and the Express package (Which we used for the controller part).
For this, follow the next steps:
1. Download npm from the internet. you can do it at this link: https://nodejs.org/en/download/ (according to the operating system on your computer)
2. Open the cmd.
3. Write: "npm init --yes" and press enter.
4. Write: "npm i express" and press enter.
5. Write: "npm i express-fileupload" and press enter.
6. Save the files of the project on your computer.
Now you are ready to use the app!!


## Implementation:
In order to use the app, first enter in the cmd the next command (from the directory of where you saved the project): "node controller/controllerExpress.js".
now you have two options:

1. First one, (fit for most users) enter the domain of our web- which is http://localhost/8080/  on your browser. Now choose an algorithem for anomalies detection. After that, choose a file  without detections, and then a file with (maybe) some detections.
Push the 'submit' buttom and find out where are the anomalies in your file!

 2. Second option (mainly for developers and geeks), write a code that send a http POST request to the domain http://localhost/8080/ with a json file that contain the next keys (according to this order!!): algorithm, file_without_anomalies, file_anomalies.
 The values are:
 For the first key: "Regression_based" or "Hybrid" (choose one of them).
 For the second key: a file without anomalies (for example, a CSV file).
 For the third key: a file with (maybe) anomalies (for example, a CSV file).
 Run your code and get back a json file with the anomalies in your file, if they exist!

## project structure
### Model:
The model is the logic part of the application. The model gets from the algorithem and the files the user chose (he gets it from the controller) and try to find anomalies in the file from the user. The result is sent back to the controller.


### controller:
The controller gets the http request from the user, takes the arguments the user had entered- which are an alogorithm and two files, and send them to the model.


### View:
The view part is what the user sees when he/ she visits our site.
The view's role is to make the detection accesible to those who are not developers, and don't know how to write a code that send a http-POST request. Through it, the user can send his/ her request to find anomalies in a specific file.


## Explanation video of how to use the site:
Click this link () for a tutorial video on how to use the app

## UML diagram:
You can find  a UML diagram of our project at the following link: https://github.com/TalBenZvi/AnomalyDetectionWebApp/blob/main/UML_Diagram.pdf
