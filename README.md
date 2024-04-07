# Firestore Practice
This lab focuses on integrating Firestore, a NoSQL cloud database provided by Firebase, into a web application. The objective is to enable storing and updating user information, specifically usernames and scores, in the Firestore database.
Key Steps:

### Setup Firestore:

Initialize Firestore in the web project using Firebase SDK.
Ensure Firebase configuration is correctly set up in the project.

### Button Event Listeners:

Add event listeners to buttons (e.g., Red, Green, Orange) to trigger actions when pressed.
Update Score Functionality:
Implement a function to update the score in Firestore when a button is pressed.
Retrieve the current username from the input field.
Determine the score based on the button pressed (e.g., Red = 1, Green = 5, Orange = 10).
Update the Firestore document corresponding to the username with the new score.

### Error Handling:

Implement error handling to deal with potential failures during Firestore updates.
Usage:

To use the application, users need to input their username and press one of the buttons to update their score.
The application automatically updates the Firestore database with the new score associated with the user's username.
