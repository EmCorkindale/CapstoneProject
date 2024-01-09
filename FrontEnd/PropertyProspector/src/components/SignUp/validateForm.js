export function validateForm(username, firstName, lastName, password, emailAddress) { 

    const validateUsername = () => {
        if (!username) {
            return "Username is required";
        } else if (username.length > 15) {
            return "Username must be less than 15 characters";
        }
        return null; // No validation error
    };

    const validateFirstName = () => {
        if (!firstName) {
            return "First name is required";
        }
        return null; // No validation error
    };

    const validateLastName = () => {
        if (!lastName) {
            return "Last name is required";
        }
        return ""; // No validation error
    };

    const validateEmailAddress = () => {
        if (!emailAddress) {
            return "Email Address is required.";
        }
        return null; // No validation error
    };

    const validatePassword = () => {
        if (!password) {
            return "Password is required";
        } else if (password.length > 15) {
            return "Password must be less than 15 characters";
        }
        return null; // No validation error
    };

    const usernameError = validateUsername();
    const firstNameError = validateFirstName();
    const lastNameError = validateLastName();
    const emailAddressError = validateEmailAddress();
    const passwordError = validatePassword();

    
    return usernameError || firstNameError || lastNameError || emailAddressError || passwordError;
}
