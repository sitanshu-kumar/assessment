$(document).ready(function () {
    $("#usersignin").on("submit", function () {
        var email = $("#materialLoginFormEmail").val();
        var password = $("#materialLoginFormPassword").val();
        $.ajax({
            method: "POST",
            url: "/user_login",
            data: {
                email: email,
                password: password
            },
            dataType: "json",
            success: function (data) {
                if (data.flag == true) {
                    $("<p/>")
                        .text("Welcome to Event On Fire")
                        .addClass("alert alert-primary mt-4")
                        .appendTo("#r-alert-box");
                    setTimeout(function () {
                        window.location = "/";
                    }, 1500);
                } else {
                    console.log("hi");
                    $("<p/>")
                        .text("Wrong Username or Password")
                        .addClass("alert alert-primary mt-4")
                        .appendTo("#r-alert-box");
                    setTimeout(function () {
                        window.location = "/user-signin";
                    }, 1500);
                }
            },
            error: function () { }
        });
    });
});  