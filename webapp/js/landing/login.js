var enDictionary = {
    "unexpected": "Unexpected error",
    "check_email": "Check your e-mail",
    "fill": "Fill the fields",
    "password": "New password and confirm password did not match",
    "forgot-link": "Forgot your password?",
    "login": "Login",
    "password": "Password",
    "email": "E-mail",
    "submit": "Submit",
    "repeat": "Repeat"
};
var noDictionary = {
    "unexpected": "Uventet feil",
    "check_email": "Sjekk din e-post",
    "fill": "Fyll ut feltene",
    "password": "Nytt passord og Bekreft passord stemte ikke",
    "forgot-link": "Glemt passord?",
    "login": "Logg inn",
    "password": "Passord",
    "email": "Epost",
    "submit": "Send inn",
    "repeat": "Gjenta"
};

var Dictionary = getUrlVars()['locale'] == 'no' ? noDictionary : enDictionary;

$(function () {
    $('#login').click(function () { login($('#login-form #email').val(), $('#login-form #password').val()); });
    $('#restore').click(restore);
    $('#save-password').click(savePassword);
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $('.account-form button').click();
        }
    });

    $('#forgot-link').text(Dictionary["forgot-link"]);
    $('#login').text(Dictionary["login"]);
    $('#password-label').text(Dictionary["password"]);
    $('#email-label').text(Dictionary["email"]);
    $('#check_emai').text(Dictionary['check_email']);
    $('#restore').text(Dictionary['submit']);
    $('#save-password').text(Dictionary['submit']);
    $('#repeat-label').text(Dictionary['repeat']);
});

function login(email, password) {
    $('#loader').show();
    if (email == "" || password == "") {
        $('#loader').hide();
        $('.error span').text(Dictionary['fill']);
        return;
    }
    var previousPath = getUrlVars()['redirectPath'];
    var address = previousPath ? previousPath.replace(/%2F/g,'/' ) : '../app.html';
    $('.error span').text('');
    $.ajax({
        url: '../api/v1/login',
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        data: "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}",
        success: function () {
            $('#loader').hide();
            window.location.href = address;
        },
        error: function (data) {
            $('#loader').hide();
            if (data.responseJSON != undefined && data.responseJSON.message != undefined) {
                $('.error span').text(data.responseJSON.message);
            }
            else {
                $('.error span').text(Dictionary['unexpected']);
            }
        }
    });
}

function restore() {
    $('#loader').show();
    $('.error span').text('');
    var email = $('#restore-form #email').val();
    if (email == "") {
        $('#loader').hide();
        $('.error span').text(Dictionary['fill']);
        return;
    }
    $.ajax({
        url: '../api/v1/login/reset',
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        data: "{\"email\":\"" + email + "\"}",
        success: function () {
            $('#loader').hide();
            $('.error span').text(Dictionary['check_email']);
        },
        error: function (data) {
            $('#loader').hide();
            if (data.responseJSON.message != undefined) {
                $('.error span').text(data.responseJSON.message);
            }
            else {
                $('.error span').text(Dictionary['unexpected']);
            }
        }
    });
}

function savePassword() {
    $('#loader').show();
    $('.error span').text('');
    var password = $('#password-form #password').val();
    var confirmPassword = $('#password-form #confirmPassword').val();
    if (password == "" || confirmPassword == "") {
        $('#loader').hide();
        $('.error span').text(Dictionary['fill']);
        return;
    }
    if (password === confirmPassword) {
        var urlVars = getUrlVars();
        var resetCode = urlVars['resetCode'];
        var email = urlVars['email'];
        $.ajax({
            url: '../api/v1/login',
            type: "PUT",
            contentType: 'application/json;charset=UTF-8',
            data: "{\"email\":\"" + email + "\",\"resetCode\":\"" + resetCode + "\",\"password\":\"" + password + "\"}",
            success: function () {
                $('#loader').hide();
                login(email, password);
            },
            error: function (data) {
                $('#loader').hide();
                if (data.responseJSON.message != undefined) {
                    $('.error span').text(data.responseJSON.message);
                }
                else {
                    $('.error span').text(Dictionary['unexpected']);
                }
            }
        });
    }
    else {
        $('#loader').hide();
        $('.error span').text(Dictionary['password']);
    }
}
