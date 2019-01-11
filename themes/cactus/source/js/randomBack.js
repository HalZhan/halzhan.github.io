(function() {
    var GRADIENTS = [
        "linear-gradient(to left top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)",
        "linear-gradient(to left top, #50cc7f 0%, #f5d100 100%)",
        "linear-gradient(to left top, #f9d423 0%, #ff4e50 100%)",
        "linear-gradient(to left top, #B6CEE8 0%, #F578DC 100%)",
        "linear-gradient(to left top, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
        "linear-gradient(to left top, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)"
    ];
    $.fn.extend({
        randomBack: function(backgrounds) {
            backgrounds =
                $.isArray(backgrounds) && backgrounds.length
                    ? backgrounds
                    : GRADIENTS;
            // if (images && images.length) {
            var idx = Math.floor(Math.random() * backgrounds.length),
                background = backgrounds[idx] || "";
            // var image = images[idx] || {};
            // var url = image.url || "";

            if ($.isPlainObject(background)) {
                $.each(
                    ["url", "linear-gradient", "repeat-linear-gradient"],
                    function(idx, val) {
                        if (
                            background[val] &&
                            typeof background[val] === "string"
                        ) {
                            background = val + "(" + background[val] + ")";
                            return false;
                        }
                    }
                );
            }

            if (background && typeof background === "string") {
                this.css({
                    background: background,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                });
            }

            // }
        }
    });
})();
