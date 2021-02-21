## Bug 1

The user.getAll() method was returning more information (including the password) than the route docstring indicated should be retunred. 

## Bug 2

The user patch route was not filtering out unwanted data that could have been sent to the SqlForPartialUpdate and caused a query error. I fixed this by filtering out the data sent in and making sure it matched only the 4 properties listed in the docstring (first_name, last_name, phone, email). After writing the tests and making this work, I realized, it may have been better to do this in the route or change a different way since now the sqlForPartialUpdate is more hard coded for the user update and if the application grew, it would need refactored to be used in other routes.

## Bug 3

Something with the User auth routes. Getting an error 'Error: There already exists a user with username 'u1'' 

## Bug 4

User.register was not checking to make sure all required values ("username", "password", "first_name", "last_name", "email", "phone") were passed in from the route. I added error handling to throw an error if any of the required values are missing and wrote tests to ensure the error handling worked. 
