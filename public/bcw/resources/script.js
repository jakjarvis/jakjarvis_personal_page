/* PLACEHOLDER alert for portal */
function loginAlert() {
  window.alert(
    "Coming soon! Login to browse your project documentation and pay your invoices."
  );
}

/* navigation scroll */
var headerHeight = $("header").height();

$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);
    var scrollToPosition = $target.offset().top - headerHeight;

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: scrollToPosition,
        },
        1200,
        "swing",
        function () {
          window.location.hash = target;
          $("html").animate({ scrollTop: scrollToPosition }, 0);
        }
      );
  });
});
