/**
 * Validates that the information is not empty.
 * @param first_name is the first name of the user.
 * @param last_name is the last name of the user.
 * @param username is the username.
 * @param confirm_password is the confirm password.
 * @param password is the password of the user.
 * @returns {boolean} true if fields are not empty.
 */
function fieldsNotEmpty(first_name, last_name, username, confirm_password, password, role) {
    return first_name.trim() !== "" && last_name.trim()  !== "" && username.trim()  !== "" &&
        confirm_password.trim()  !== "" && password.trim()  !== "" && role.trim() !== "";
}
/**
 * Registers the user.
 * @returns {Promise<void>}
 */
function register(){
    let first_name = document.registerForm.fname.value;
    let last_name = document.registerForm.lname.value;
    let username = document.registerForm.username.value;
    let password = document.registerForm.password.value;
    let confirm_password = document.registerForm.confirm_password.value;
    let role = document.registerForm.role.value;
    let displayMessage = document.getElementById("message");
    displayMessage.innerText = "";
    if(fieldsNotEmpty(first_name, last_name, username, confirm_password, password, role)){
        if(password === confirm_password){
            const user_data = {
                "firstName": first_name,
                "lastName": last_name,
                "username": username,
                "role": role,
                "password": password
            };
            fetch('prattle.us-east-2.elasticbeanstalk.com/prattle/rest/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_data),
            }).then((response)=>{
                if(!response.ok){
                    displayMessage.innerText = "Unsuccessfully Registered";
                } else {
                    displayMessage.innerText = "Successfully Registered";
                }
            }).catch((error)=>{
                displayMessage.innerText = "Unsuccessfully Registered";
            })
        } else {
            displayMessage.innerText = "Password and Confirm Password are not the same.";
        }
    } else {
        displayMessage.innerText = "Field(s) cannot be empty.";
    }
}