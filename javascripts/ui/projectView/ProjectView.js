define(['core/EventDispatcher', 'core/Log', 'cards/CardView', 'jquery'],
    function (dispatcher, logger) { "use strict"
        var ProjectView = (function () { // Start of Constructor

            var lastZIndex = 20;

            function ProjectView () {

                function testEventDispatcher() {
                    var infoIn = {str : 'infoIn string'};
                    function t1 (info) {
                        logger.log('T1: info.str = ' + info.str);
                    }
                    function t2(info) {
                        logger.log('T2: info.str = ' + info.str);
                    }
                    logger.log('Hello raw Log from ProjectView');

                    dispatcher.on('test', t1);
                    dispatcher.on('test', t2);
                    dispatcher.on('test', t1);

                    dispatcher.fire ('test', infoIn);
                }

                var cardstock;
                var projectView;
                var projectBoard;

                var fontsize = 100;

                projectView = $('#projectView');
                projectBoard = $('#projectBoard');

                function addCardToProject(event, cardId, card, cardAttributes) {
                    // card.top = card.css('top');
                    // card.left = card.css('left');
		    debugger;
                    card.appendTo(projectBoard);
                    card.css('top', cardAttributes.absPx.top);
                    card.css('left', cardAttributes.absPx.left);
                    dispatcher.fire('editCard', cardId);
                    // Fix x, y, and z here including translating pixels and offsets into em top and left
                }

                function onDblClick(event) {
                    var cardElement = event.target.offsetParent;
                    var id = cardElement.id;
                    dispatcher.fire('editCard', id);
                }
                /*
                 function demoZoom() {
                 var size =  $('#projectBoard').css('font')
                 }
                 */

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
                        debugger;
						dispatcher.fire('addCardToProjectBoard', card);
						dispatcher.fire('editCard', card[0].id); // cardId);
                        card.on('dblclick', onDblClick);
						
						// Add a new blank card to the origin Card Stack
						var cardAttributes = {
							purpose : cardStack.purpose,
							styling : cardStack.id
						};
						dispatcher.fire('addCardToCardStack', cardAttributes);
					} else {
						// A card has been moved.
						// Notify the Project Board.
						dispatcher.fire('movedCardToProjectBoard', card);
					}
                }

                function runOldClickDemo() {
                    var cardAttributes = {
                        purpose : 'Why This Card',
                        styling : 'yellowCard',
                        target  : '#projectBoard',
                        x       :  1,
                        y       :  1,
                        z       :  1,
                        creator : 'XX',
                        title   : 'Card Title',
                        content : 'Some card contents from a form in the future.'
                    };

                    function dropDemoCard() {
                        cardAttributes.x = cardAttributes.x + 2;
                        cardAttributes.y = cardAttributes.y + 3;
                        cardAttributes.z = cardAttributes.z + 1;

                        dispatcher.fire('getNewCard', cardAttributes);

                        fontsize = 0.90 * fontsize;
                        projectBoard.css('font-size', fontsize + '%');
                        projectBoard.css('top', cardAttributes.y + 'px');
                        projectBoard.css('left', -cardAttributes.x + 'px');
                    }

                    projectView.on('click', dropDemoCard);
                }

                function pause () {

                }
                function resume () {

                }
                function init() {
                    logger.log("Made it to ProjectView init()");
                    // testEventDispatcher();
                    //runOldClickDemo();
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
