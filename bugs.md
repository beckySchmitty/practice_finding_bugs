## Bug 1

The user.getAll() method was returning more information (including the password) than the route docstring indicated should be retunred. 

## Bug 2

The user patch route was not filtering out unwanted data that could have been sent to the SqlForPartialUpdate and caused a query error. I fixed this by filtering out the data sent in and making sure it matched only the 4 properties listed in the docstring (first_name, last_name, phone, email). After writing the tests and making this work, I realized, it may have been better to do this in the route or change a different way since now the sqlForPartialUpdate is more hard coded for the user update and if the application grew, it would need refactored to be used in other routes.

## Bug 3

In the POST auth/login route, it was missing an "await" before calling User.authenticate(). The code wasn't waiting to check the password and automcatically moved to the next line creating and returning a token. I added await when called in the route itself and then rewrote the way the password was checked on the user model for more clarity. 

## Bug 4

User.register was not checking to make sure all required values ("username", "password", "first_name", "last_name", "email", "phone") were passed in from the route. I added error handling to throw an error if any of the required values are missing and wrote tests to ensure the error handling worked. 

## Bug 5

Delete route for user did not have keyword "await" so it was not waiting long enough for the query to check if the user did exist in the database. 
