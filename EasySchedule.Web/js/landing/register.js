$(function () {
    var enDictionary = {
        "unexpected": "Unexpected error",
        "check_email": "Check your e-mail",
        "fill": "Fill the fields"
    };
    var noDictionary = {
        "unexpected": "Uventet feil",
        "check_email": "Sjekk din e-post",
        "fill": "Fyll ut feltene"
    };

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    var Dictionary = locale == 'no' ? noDictionary : enDictionary;

    $('#go-login').click(function () {
        window.location.href = '../login.html';
    });

    $('#register').click(register);

    $(document).keypress(function (e) {
        if (e.which == 13) {
            register();
        }
    });

    function register() {
        console.log("registration");
        $('#loader').show();
        $('#register').attr('disabled', 'disabled');
        $('.error span').text('');
        var email = $('#email').val();
        var password = $('#password').val();
        if (email == '' || password == '') {
            $('#register').removeAttr('disabled');
            $('#loader').hide();
            $('.error span').html(Dictionary['fill']);
            return;
        }
        $.ajax({
            url: '../api/v1/login/create',
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            data: "{\"email\":\"" + email + "\",\"password\":\"" + password + "\",\"locale\":\"" + locale + "\"}",
            success: function () {
                $('#loader').hide();
                $('.error span').html(Dictionary['check_email']);
                $('#register').removeAttr('disabled');
            },
            error: function (data) {
                $('#register').removeAttr('disabled');
                $('#loader').hide();
                if (data.responseJSON.message != undefined) {
                    $('.error span').html(data.responseJSON.message);
                }
                else {
                    $('.error span').html(Dictionary["unexpected"]);
                }
            }
        });
    }


});
