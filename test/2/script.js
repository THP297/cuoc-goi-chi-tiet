// script.js
var isOn = false; // Initial state of the button

function toggleState() {
  var button = document.getElementById("toggleButton");
  isOn = !isOn; // Toggle the state
  if (isOn) {
    button.classList.add("on");
    button.textContent = "ON"; // Change text to "ON"
  } else {
    button.classList.remove("on");
    button.textContent = "OFF"; // Change text to "OFF"
  }
}
