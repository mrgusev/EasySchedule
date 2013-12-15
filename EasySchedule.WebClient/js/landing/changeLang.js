$(function () {
    $('#en').click(function () { changeLang('en'); });
    $('#no').click(function () { changeLang('no'); });

    function changeLang(lang) {
        if (lang == 'en') {
            $("#text-no").hide();
            $("#text-en").show();
            $('#en').removeClass('active');
            $('#no').addClass('active');
        }
        else {
            $("#text-en").hide();
            $("#text-no").show();
            $('#no').removeClass('active');
            $('#en').addClass('active');
        }
    }
});