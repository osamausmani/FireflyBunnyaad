const ValidateSignUp = (form) => {
    const error = {
        name: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
    };
    if (!form.name) {
        error.name = "Name is required *";
    }
    if (form.name && form.name.length < 3) {
        error.name = "Name must be at least 3 characters *";
    }
    if (!form.phoneNo) {
        error.phoneNo = "Phone number is required *";
    }
    if (form.phoneNo && (form.phoneNo.length < 10 || form.phoneNo.length > 11)) {
        error.phoneNo = "Please enter valid mobile no";
    }

    if (!form.password) {
        error.password = "enter Password *";
    }
    if (form.password && form.password.length < 5) {
        error.password = "Password must be at least 5 characters *";
    }
    if (!form.confirmPassword) {
        error.confirmPassword = " re-type  password *";
    }
    if (form.password !== form.confirmPassword) {
        error.confirmPassword = "password not matched*";
    }
    return error;

}

const ValidateSignIn = (form) => {
    const error = {};
    if (!form.phoneNo) {
        error.phoneNo = "Phone number is required";
    }
    if (form.phoneNo && form.phoneNo.length < 10) {
        error.phoneNo = "Phone number must be at least 10 characters";
    }
    if (!form.password) {
        error.password = "Password is required";
    }
    if (form.password && form.password.length < 6) {
        error.password = "Password must be at least 6 characters";
    }
    return error;
}

export { ValidateSignUp, ValidateSignIn };