import App from "app/app";
import $ from "jquery";
import * as Marionette from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./home.html";
import Styles from "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 */
let HomeView = Marionette.View.extend({
    /**
     * Returns a rendered template
     *
     * @param stylesheet
     * @returns {*|Function}
     * @protected
     */
    template: function (stylesheet) {
        return _.template(Template);
    },

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender: function() {
        let Navigation =  new NavigationView();
        var that = this;

        App.getNavigationContainer().show(Navigation);

        Navigation.setItemAsActive("home");
        this.$el.find(".card").on("click", function(event) {
            that.__setupAnimationOnCard("#" + event.currentTarget.id);
        });
    },

    /**
     * Setup the animations on the card
     *
     * @param cardSelector {String} The querySelector string (EG/ .className)
     * @private
     */
    __setupAnimationOnCard: function(cardSelector) {
        /** Put jQuery & Vanilla DOM into variables **/
        let $card = this.$el.find(cardSelector);
        let cardEl = $card[0];
        let background = $card.find(".card-background")[0];

        /** Compute the transform units we need to apply **/
        let first = cardEl.getBoundingClientRect();

        /** Compute the transform units we need to apply **/
        let last = cardEl.getBoundingClientRect();
        let invert = first.top - last.top;

        // Invert.
        cardEl.style.transform =
            `translateY(${invert}px)`;

        requestAnimationFrame(function() {
            // Switch on animations.
            background.classList.add('expanded');
            cardEl.classList.add('expanded-card');

            window.document.getElementsByTagName("body")[0].style.overflow = "hidden";

            // GO GO GOOOOOO!
            cardEl.style.transform = '';

            window.setTimeout(function() {
                background.classList.remove('expanded');
                cardEl.classList.remove('expanded-card');
                window.document.getElementsByTagName("body")[0].style.overflow = "";
            }, 2000)
        });
    }
});

/**
 * Export the view
 *
 * @exports HomeView
 */
export default HomeView;
