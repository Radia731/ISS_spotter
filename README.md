# ISS_spotter

Using Node.js to Retrieve ISS Pass Times
This project demonstrates how to use Node.js to retrieve the upcoming ISS pass times for a given location. The project includes the following files:

iss.js: contains three functions to retrieve the user's IP address, their latitude and longitude based on their IP address, and the upcoming ISS pass times for their location.
index.js: uses the nextISSTimesForMyLocation function from iss.js to display the upcoming ISS pass times in a human-readable format.
package.json: lists the project's dependencies, including request which is used to make API calls to retrieve the necessary data.
README.md: this file, which provides an overview of the project.
To run this project, follow these steps:

Clone the repository to your local machine using git clone https://github.com/username/repo.git.
Navigate to the project directory using cd repo.
Install the dependencies using npm install.
Run the program using node index.js.
The program will retrieve the user's location based on their IP address and display the upcoming ISS pass times for that location.
