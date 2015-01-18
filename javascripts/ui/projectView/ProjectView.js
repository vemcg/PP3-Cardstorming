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

                function dropCard ( event, ui ) {
					var card = event.target.parentElement;
					var cardStack = card.parentElement;
					if (cardStack.parentElement.id === "palette") {
						var origLeft = card.style.left;
						var origTop = card.style.top;
						var topPx = parseInt(origTop);
						var leftOffset = parseInt(projectView[0].offsetLeft);
						var topOffset = parseInt(projectView[0].offsetTop);
						if (topPx >= topOffset)
							topPx -= topOffset;
						else
							topPx = 0;
						var newTop = topPx + "px";
						var leftPx = parseInt(origLeft);
						if (leftPx >= leftOffset)
							leftPx -= leftOffset;
						else
							leftPx = 0;
						var newLeft = leftPx + "px";
						card = $ (card).detach();
						card.appendTo ($("#projectBoard"));
						card[0].style.left = newLeft;
						card[0].style.top = newTop;
						card.draggable();
						card.removeClass ("blankCard");
						dispatcher.fire('addCardToProjectBoard', card);
						var cardAttributes = {
							purpose : cardStack.purpose,
							styling : cardStack.id
						};
						dispatcher.fire('addCardToCardStack', cardAttributes);
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
