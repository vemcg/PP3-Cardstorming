define(['core/EventDispatcher', 'core/Log', 'cards/CardView', 'jquery'],
    function (dispatcher, logger) { "use strict"
        var ProjectView = (function () { // Start of Constructor

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
/*
                var xoff = 0;
                var yoff = 0;
                var zidx = 0;

                function addCard() {
                    require(['text!templates/blankCard.html'],
                        function(card) {
                            yoff = yoff + 2;
                            xoff = xoff + 3;
                            zidx = zidx + 1;
                            var cid = 'card' + zidx;

                            fontsize = 0.90 * fontsize;
                            board.css('font-size', fontsize + '%');

                            board.append(card);
                            $('#TBD').addClass('yellowCard');
                            $('#TBD').removeClass('blankCard');
                            $('#TBD').removeClass('hidden');
                            $('#TBD').attr('id', cid);
                            cid = '#' + cid;

                            // TODO: Put the card where it was dropped
                            board.css('top', yoff + 'px');
                            board.css('left', -xoff + 'px');

                            $(cid).css('top', '' + yoff + 'em');
                            $(cid).css('left', '' + xoff + 'em');
                            $(cid).css('z-index', zidx);
                        }
                    );
                }

                function addCardXXX() {       // do this differently on card drop
                    // TODO: Take the card from the event rather than creating it
                    var card = cardstock.html();
                    yoff = yoff + 2;
                    xoff = xoff + 3;
                    zidx = zidx + 1;
                    var cid = 'card' + zidx;

                    fontsize = 0.90 * fontsize;
                    board.css('font-size', fontsize + '%');

                    board.append(card);
                    $('#TBD').attr('id', cid);
                    cid = '#' + cid;

                    // TODO: Put the card where it was dropped
                    board.css('top', yoff + 'px');
                    board.css('left', -xoff + 'px');

                    $(cid).css('top', '' + yoff + 'em');
                    $(cid).css('left', '' + xoff + 'em');
                    $(cid).css('z-index', zidx);
                }

                cardstock = $('#cardAsset');
*/
                projectView = $('#projectView');
                projectBoard = $('#projectBoard');
				projectBoard.draggable();

				function dropEvent (event, ui) {
					var target_id = event.target.id;
					
					if (target_id === projectBoard[0].id)
					    logger.log('ProjectBoard dragged');
					else
						dropCard (event, ui);
				}
			
                function dropCard ( event, ui ) {
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
						dispatcher.fire('addCardToProjectBoard', card);
						
						// Add a new blank card to the origin Card Stack
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
                       /*
                this.droppable(
                    {drop: dropCard}
					
                );
                           */
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
					$('#projectView').droppable({drop: dropEvent});
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
