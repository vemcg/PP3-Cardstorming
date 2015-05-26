define(['core/EventDispatcher', 'core/Log', 'cards/CardView', 'jquery'],
    function (dispatcher, logger) { "use strict"
        var ProjectView = (function () { // Start of Constructor

            // the Project View is, conceptually speaking, the "frame"
            //    through which the user views the Project Board

            // one of the methods here is "dropCard", because you drop the card
            //    through the ProjectView onto the Project Board

            function ProjectView () {

                var cardstock;
                var projectView;
                var projectBoard;

                var fontsize = 100;

                projectView = $('#projectView');
                projectBoard = $('#projectBoard');

                function onDblClick(event) {
                    var cardElement = event.target.offsetParent;
                    var id = cardElement.id;
                    dispatcher.fire('editCard', id);
                }

                // this is what happens after a user has been dragging a card
                //    and then lets go of the mouse (drop)
                //  the card's parent will either be the cardStack
                //    or ProjectBoard, depending on where the card had been
                //    when the user "picked it up"
                //  code says "cardStack" because new cards come from the cardStack
                function dropCard ( event, ui ) {
                    // Decide which is the best method for selecting the card.
                    // var cardId = event.target.firstChild.parentElement.offsetParent.id;
                    // var card = $('.card.blankCard', event.srcElement);
                    // var card = $('#palette #' + cardId);

                    var card = event.target.parentNode;
                    var cardStack = card.parentNode;
                    if (cardStack.parentNode.id === "palette") {
                        // A new card from the Card Stack has been dropped in the ProjectView
                        // Get the location of the card and the offsets for the ProjectView
                        // Note: No index needed for card reference since get reference from event.
                        var origLeft = card.style.left;
                        var origTop = card.style.top;
                        var leftOffset = parseInt(projectView[0].offsetLeft);
                        var topOffset = parseInt(projectView[0].offsetTop);

                        // Calculate Card top coordinate once dropped on Project Board
                        var topPx = parseInt(origTop);
                        if (topPx >= topOffset)
                            topPx -= topOffset;
                        else
                            topPx = 0;
                        var newTop = topPx + "px";

                        // Calculate Card left coordinate once dropped on Project Board
                        var leftPx = parseInt(origLeft);
                        if (leftPx >= leftOffset)
                            leftPx -= leftOffset;
                        else
                            leftPx = 0;
                        var newLeft = leftPx + "px";

                        // Move the Card from the Card Stack to the Project Board
                        card = $ (card).detach();
                        card.appendTo ($("#projectBoard"));
                        //   Adjust the coordinates of the Card to be relative to the ProjectBoard.
                        card[0].style.left = newLeft;
                        card[0].style.top = newTop;
                        //   Make the card draggable, no longer a blank card, and notify Project Board.
                        card.draggable();
                        card.removeClass ("blankCard");

                        // the addCardToProjectBoard function sets coordinates relative to the
                        //   ProjectBoard
                        dispatcher.fire('addCardToProjectBoard', card);
                        dispatcher.fire('editCard', card[0].id); // cardId);
                        card.on('dblclick', onDblClick);

                        // Add a new blank card to the origin Card Stack; i.e.,
                        // the card gets its purpose and styling from the card stack
                        var cardAttributes = {
                            purpose : cardStack.purpose,
                            styling : cardStack.id
                        };
                        dispatcher.fire('addCardToCardStack', cardAttributes);
                    } else {
                        // A card has been moved.
                        // Notify the Project Board.
                        dispatcher.fire('movedCardOnProjectBoard', card);
                    }
                }



                function pause () {

                }
                function resume () {

                }
                function init() {
                    $('#projectView').droppable({drop: dropCard});
                }

                // Public Interface
                this.pause = pause;
                this.resume = resume;
                this.init = init;
            }   // End of Instance
            return ProjectView;
        } ()); // End of Constructor

        return new ProjectView();
    }
);
