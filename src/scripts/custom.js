/*
|--------------------------------------------------------------------------
| CUSTOM.JS
|--------------------------------------------------------------------------
|
| The main javascript file of the project
|
*/

var userArray; // Array used to store users
var userCardTemplate; // Variabled used to store user card tempalte

$(document).ready(function(){
  // Initializes the userArray with user data, or empty if no users exists
  userArray = localStorage.users ? JSON.parse(localStorage.users) : [];
  userCardTemplate = $('.user-card'); // Store the user card in variable

  // Click event lisenter for all navigate items
  $(document).on('click', '.navigate', function(){
    doNavigate($(this).attr('data-location-name')) // Calls the navigation function with the location form the data attribute
  })

  // Submit event lisenter for the signup form
  $('.form--signup').submit( function(e){
    e.preventDefault() // Prevents default browser behaviour

    if( validateSignup($(this)) ) // Check if the form validates
      addUserAndSave( $(this) ) // Run the save function
    else
      UIkit.notification('Form was invalid', 'danger'); // Error message


  })

  // listend for cahnges of the image uplaod field
  $('.imageUpload').change(function(){
    var input = $(this) // Set input to current element
    input = input[0] // Make sure to only select first element
    if (input.files && input.files[0]) {  // Check if the input got files
      var reader = new FileReader() // Create new filereader
      reader.onload = function(e) { // Set readers onload function
        $('[name="image"]').attr('disabled', true).val(e.target.result); // Disable image input and add base64 of uplaodet file as value
      }
      reader.readAsDataURL(input.files[0]); //transform imagefile to base 64 with "readAsDataURL"
    }
  })

  $(document).on('click', '.delete', function(){
    deleteUser($(this).attr('data-id'));
  })

  // Populate the user list
  updateUserList();
})

// Function used to update the list of user based on the userArray
function updateUserList(){
  $('.user-card-container').html(''); //Empty the container

  $.each(userArray, function(i, user){  // Loop through the user array
    var userCard = userCardTemplate.clone(); // Create a clone of the template for each user

    userCard.find('[data-key]').each(function(){ // Find all elements in the html with the key attribute
      if(!$(this).attr('data-attr')){ // Check if the element have a attr atribute
        $(this).text(user[$(this).attr('data-key')]); // Set the text to the value from the user object based on the key attribute
      } else { // If the element have an attr attribute
        // Set the attribute from the data-attr attribute to the vale from the user object based on the data-key attribute
        $(this).attr($(this).attr('data-attr'), user[$(this).attr('data-key')]); 
      }
    })

    // Append the user card to the user card container
    $('.user-card-container').append(userCard);

  })
}

// Simple delete functon
function deleteUser(id){
  $.each(userArray, function(i, u){ // Loop throug users
    if(u.id == id){ // if the user have the id pased to the function
      userArray.splice(i, 1); // Remove user form array
    }
  });
  localStorage.users = JSON.stringify(userArray); // Save array to localstorage
  // Update the user list
  updateUserList();
}

// Function used for form validation
function validateSignup(form) {
  var isValid = true; // Set the validation flat to true by default
  $('[data-validate]', form).each(function() { // loop through the inputs with the data-validate attribute
    $(this).removeClass('uk-form-danger'); // remove any error classes fom the input
    
    if(!validateField($(this))){ // Check if the input is not valid basen on the validateField function
      $(this).addClass('uk-form-danger'); // Add the erro class to the input
      isValid = false;  // Turn the validate flag to false
    }
  });

  return isValid // Return the flag

};

// Function used to validate a field based on data-validate attribute
function validateField(field){
  if(!field.attr('data-validate')) // Check if field dosn't have the data-validate attribute
    return true;  // If not return true, since there is nothing to validate

  var vldtParams = JSON.parse(field.attr('data-validate')); // Get value of the attribute as json object
  var value = field.val(); // get the value of the field

  if (vldtParams.min && vldtParams.min > value.length) // If the min key value pair is precent in the validate object, check if the value valid
    return false; // if not, return false
  if (vldtParams.max && vldtParams.max < value.length) // If the max key value pair is precent in the validate object, check if the value valid
    return false; // if not, return false
  if (vldtParams.textOnly && !value.match(/^[a-zA-Z()]+$/)) // If the textOnly is present, use regex to secure that only characters is used
    return false; // if not, return false
  if (vldtParams.isImage && !value.match("^http") && !value.match("^data:image/") ) // If the isImage is present, use regex to make sure it is url or base64 image
    return false; // if not, return false

  return true; // if none of the above returned false, return true
}

// Ads the user object to the array and updates localstorage
function addUserAndSave(user){
  userObj = objectifyForm(user) // Transform form to object
  userObj.id = nextId(); // Add unique ID to the user
  userArray.push(userObj) // Add user object to array
  localStorage.users = JSON.stringify(userArray) // Save userArray with new user to localstorage
  updateUserList(); // Update the user list
  UIkit.notification('The user: <b>' + userObj.firstname + '</b> have been saved!', 'success'); // Success message to user
  $('input', user).val("").attr('disabled', false); // Empty input fields
}

// Function that returns an id that is the next number in the row
// OBS! This function is not safe1 if array is rearranged, og edited externally it could result in errors....
function nextId(){
  return id = userArray[userArray.length-1] ? userArray[userArray.length-1].id+1 : 1; // if no users set to 1 else set to last users id + 1 
}

// A simple function used to navigate between pages of the system
function doNavigate(location){
  $('.page').removeClass('page--visible') // Hide all pages
  $('[data-page-name="'+location+'"]').addClass('page--visible') // Show the page with the right name
  updateUserList();
}

// Function to make a form into an object
function objectifyForm(form) {
  var disabled = form.find(':input:disabled').removeAttr('disabled') // Find disabled inputs, and remove the "disabled" attribute
  var formArray = form.serializeArray() // Serialize form to array
  disabled.attr('disabled',true) // re-disabled the set of inputs that you previously enabled
  var returnArray = {} // Create empty object
  for (var i = 0; i < formArray.length; i++){ // Loop through form array
    returnArray[formArray[i]['name']] = formArray[i]['value'] // Serializes form data form array to object
  }
  return returnArray // Return the array
}