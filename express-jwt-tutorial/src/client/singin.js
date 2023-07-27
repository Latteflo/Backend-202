// Add an event listener for the submit event on the form with the id 'signinForm'
let singInForm = document.getElementById("signinForm")
  singInForm.addEventListener("submit", function (event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the email and password input elements
    const emailInput = document.getElementById("email");
    const password = document.getElementById("password").value;

    // Send a POST request to the server
    // Include the email and password in the body of the request
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput.value, password }),
    })
      // Parse the response from the server as JSON
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Store the access token from the response in local storage
        localStorage.setItem("token", data.accessToken);

        // Fetch protected data
        fetchProtectedData();
      })
      // Log any errors
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Function to fetch protected data
function fetchProtectedData() {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Send a GET request to the '/protected' endpoint on the server
  // Include the token in the 'Authorization' header of the request
  fetch("http://localhost:3000/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    // Parse the response as JSON
    .then((response) => {
      console.log(response);
      return response.json();
    })   
     .then((data) => {
      // Log the protected data
      console.log("Protected data:", data);

      // Clear the existing content
      document.body.innerHTML = "";

      // Create a new h1 element
      const message = document.createElement("h1");
      // Add classname
      message.className = 'congratulations';
      // Add text content
      message.textContent = 'You are logged in! Congratulations!';

      // Append the h1 element to the body
       document.body.appendChild(message);

    })
    // Log any errors
    .catch((error) => {
      console.error("Error:", error);
    });
}
