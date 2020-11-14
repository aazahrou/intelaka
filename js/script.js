$(function() {
  $(".slc-video").fancybox();

  $(".slc-main__content a").click(function(event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: document.body.scrollHeight
      },
      800
    );
  });

  var forms = $(".slc-form form");
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        const button = forms.find('button[type="submit"]');
        button.attr("disabled", true);
        button.addClass("btn-loading");
        $.ajax({
          url:
            "https://script.google.com/macros/s/AKfycbx6LltDunmcMYtNQTRFHo1T_Jnl1pcYJSJ8aU4ltH6HgDyBjgl0/exec",
          method: "GET",
          dataType: "json",
          data: forms.serializeObject()
        }).done(function() {
          window.location.replace("./thank-you.html");
          button.attr("disabled", false);
          button.removeClass("btn-loading");
        });
      },
      false
    );
  });
});
