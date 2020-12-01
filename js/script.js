$(function () {
  $(".slc-video").fancybox(),
    $(".slc-main__content a").click(function (e) {
      e.preventDefault(),
        $("html, body").animate({ scrollTop: document.body.scrollHeight }, 800);
    }),
    $(".slc-form form").validate({
      rules: {
        nom: "required",
        prenom: "required",
        telephone: { required: !0, number: !0 },
        email: { required: !0, email: !0 },
        nature: { required: !0, minlength: 1 },
        secteur: "required",
        secteurother: { required: "#secteur5:checked" },
      },
      messages: {
        nom: "Entrez votre nome s'il vous plait",
        prenom: "Entrez votre prénom s'il vous plait",
        telephone: "Entrez votre téléphone s'il vous plait",
        email: "Entrez votre e-mail s'il vous plait",
        nature:
          "Sélectionnez la nature de votre investissement s'il vous plait",
        secteur: "Sélectionnez votre secteur d'activité s'il vous plait",
        secteurother: "Entrez votre secteur d'activité s'il vous plait",
      },
      submitHandler: function (e, t) {
        t.preventDefault();
        const n = $(e).serializeObject();
        "" !== n.secteurother && (n.secteur = n.secteurother);
        var r = [];
        $(e)
          .find('input[name="nature"]:checked')
          .each(function () {
            r.push($(this).val());
          }),
          (n.nature = r.join(", "));
        const o = $(e).find('button[type="submit"]');
        o.attr("disabled", !0),
          o.addClass("btn-loading"),
          $.ajax({
            url:
              "https://script.google.com/macros/s/AKfycbx6LltDunmcMYtNQTRFHo1T_Jnl1pcYJSJ8aU4ltH6HgDyBjgl0/exec",
            method: "GET",
            dataType: "json",
            data: n,
          }).done(function () {
            window.location.replace("./thank-you.html"),
              o.attr("disabled", !1),
              o.removeClass("btn-loading");
          });
      },
    });
});
