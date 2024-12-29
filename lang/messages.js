const Message = {
    "register": "Hi, :name , Your account has been successfully created.",
    "login": "Hi, :name , You are now logged in.",
    "loginError": "These credentials do not match our records.",
    "required": "The :name field is required.",
    "email": "The :name must be a valid email address.",
    "user-not-found": "We can’t find a user with that email address.",
    "user-info-error": "User not found, get some unknow error.",
    "reset-link-send": "We have successfully sent a password reset link to your email address.",
    "token-expired": "This token is expired. Please try with new token.",
    "string": "The :name must be a string.",
    "between": "The :name must be between :min and :max characters.",
    "min": "The :name must be at least :min characters.",
    "max": "The :name must be at least :max characters.",
    "unique": "The :name has already been taken.",
    "numeric": "The :name must be a number.",
    "notmatch": "The confirmation password does not match with password.",
    "agree": "Please accept the above terms of service.",
    "verificationlinksend": "A fresh verification email has been sent to :email. Open the email and click the link to verify.",
    "account-inactive": "Hi :name,  your account is currently inactive.",

    "200": "OK",
    "400": "Bad Request.",
    "401": "Access token is missing or invalid.",
    "403": "Access denied.",
    "404": "Requested resource not found.",
    "500": "Internal Server Error.",
};

export default function message(index = null, input = {}) {
    if (Message[index]) {
        let message = Message[index];
        Object.entries(input).forEach(entry => {
            const [key, value] = entry;
            message = message.replace(`:${key}`, value);
        });
        return message;
    } else { return null; }
}