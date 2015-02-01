define(['core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery'],
    function (dispatcher, uniqueId, logger) { "use strict"
        var CardView = (function () {

            function CardView () {

                function createCard(cardAttributes) {
                    require(['text!templates/blankCard.html'],
                        function(html) {
                        
                        /*
                          when click on a card stack, we know which card stack was clicked on
                          in card attribute, make position be the same as the card stack:  x, y, z is the maximum value
                              that puts that card on top of anything else in the view
                          when we drag and drop inside the project view   
                               we can compute the x and y from where we are in the project view (absolute positioning)
                               of the project board under it is.  that allows us to set x and y
                               
                               thoughts for collaborative app:  need to solve problem of more than one personal
                                   creating a card and trying to place it in the same location
                                   (idea) call server:  z then is the highest the z yet seen -- 1+ the largest z on the projectBoard
                          
                        */
                            $(cardAttributes.target).append(html);

                            var cid = uniqueId.create('card-');
                            var card = $('#TBD');
                            $('#TBD').attr('id', cid);
                            card = $('#' + cid);

                            if ('#projectBoard' == cardAttributes.target) {
                                card.css('top', '' + cardAttributes.y + 'em');
                                card.css('left', '' + cardAttributes.x + 'em');
                                card.css('z-index', cardAttributes.z);
                                card.removeClass('blankCard');
                            }

                            // $('.creator', cid).html(cardAttributes.creator);
                            $('.title', card).text(cid); // later cardAttributes.title);
                            $('.content', card).text(cardAttributes.content);
							$('.reserved1', card).text("MM");


                            card.addClass(cardAttributes.styling);
                            card.removeClass('hidden');
                            card.draggable();
							card.on('mousedown',function(){cardMouseDown()});

                            // card.draggable();

                            // cardAttributes.cid = cid;
                            // dispatcher.fire('cardAdded'); needed
                        }
                    );
                }

				function cardMouseDown () {
					var card = event.target.parentNode;
					var cardParentID = card.parentNode.id;
					var cardGrandParentID = card.parentNode.parentNode.id;
					if (cardParentID === "projectBoard") {
						dispatcher.fire('mouseDownOnCardOnProjectBoard', card);
					}
					else if (cardGrandParentID === "palette") {
						card.style.zIndex = 0x7FFFFFFF;
					}
				}
				
/*
                function addCardToStack (cardAttributes) {
                    var csid = '#' + cardAttributes.purpose;
                    var card = $('#detachableAssets .cardAsset .blankCard').html();
                    var cid = Card.getUniqueCardId();
                    $("body").append(card);
                    $('.blankCard.hidden').attr('id', cid);
                    cid = '#' + cid;
                    $(cid).attr('position adsolute');
                    $(cid).attr('z-index', Card.maxZ);
                    $(cid).attr('top', $(csid).attr('top'));
                    $(cid).attr('left', $(csid).attr('left'));
                    $(cid).removeClass('hidden');
                    $('.card').draggable();
                }
*/
                function init() {
                    dispatcher.on('getNewCard', createCard);
                }

                init();

                // Public Interface
                // this.init = init;
            }   // End of Instance
            return CardView;
        } ()); // End of Class

        // Choose either:
        return new CardView(); // Returns an instance (a singleton)
        // return CardView; // Returns a Constructor for multiple instances
    });