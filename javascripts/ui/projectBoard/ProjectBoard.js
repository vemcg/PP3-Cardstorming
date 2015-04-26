define(['core/EventDispatcher', 'core/Log', 'cards/CardView', 'jquery'],
    function (dispatcher, logger) { "use strict"
        var ProjectBoard = (function () { // Start of Constructor

            function ProjectBoard () {

				var highestZIndex = 0;
				
                // case where card is not attached to the ProjectBoard yet
                // (for future, we could leverage this for multi-select)
                function addCardToProjectBoard (card) {
					setCardLocationOnProjectBoard(card[0], true);
                }
				
				function movedCardOnProjectBoard  (cardRef) {
					setCardLocationOnProjectBoard(cardRef, false);
				}

				function mouseDownOnCardOnProjectBoard (cardRef) {
					if (cardRef.style.zIndex < highestZIndex)
						cardRef.style.zIndex = ++highestZIndex;
				}
				
				function setCardLocationOnProjectBoard (cardRef, dropped) {
					// First put card on top
					if (dropped || (cardRef.style.zIndex < highestZIndex))
						cardRef.style.zIndex = ++highestZIndex;
						
					// Then translate card visible location in pixels to card coordinates on ProjectBoard in ems?
				}

                function pause () {

                }
                function resume () {

                }
                function init() {
                    dispatcher.on('addCardToProjectBoard', addCardToProjectBoard);
					dispatcher.on('movedCardOnProjectBoard', movedCardOnProjectBoard);
					dispatcher.on('mouseDownOnCardOnProjectBoard', mouseDownOnCardOnProjectBoard);
                }

                // Public Interface
                this.pause = pause;
                this.resume = resume;
                this.init = init;
            }   // End of Instance
            return ProjectBoard;
        } ()); // End of Constructor

        return new ProjectBoard();
    }
);
