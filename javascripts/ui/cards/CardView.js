define(['core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery', 'jqueryUI'],
    function (dispatcher, uniqueId, logger) { "use strict"
        var CardView = (function () {

            function CardView () {

                var projectBoard;

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
                            dispatcher.on('dblclick', idAndEditCard);

                            if ('#projectBoard' == cardAttributes.target) {
                                debugger; // ever getting called.
                                card.css('top', '' + cardAttributes.y + 'em');
                                card.css('left', '' + cardAttributes.x + 'em');
                                card.css('z-index', cardAttributes.z);
                                card.removeClass('blankCard');
                            } else {
                                card.css('position', 'relative');
                                card.css('left', '0px');
                                card.css('top', '0px');
                                card.css('z-index', 1);
                            }

                            // $('.creator', cid).html(cardAttributes.creator);
                            $('.title', card).text(cid); // later cardAttributes.title);
                            $('.content', card).text(cardAttributes.content);

                            card.removeClass('hidden');
                            card.addClass(cardAttributes.styling);
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
                /*
                 $(document).ready(function(){

                 var currentTitle = $("#editTitle").val();
                 var currentContent = $("#content").val();

                 $("#okButton").click(function(){

                 currentTitle = $("#editTitle").val();
                 currentContent = $("#content").val();
                 });

                 $("#cancelButton").click(function(){


                 $("#editTitle").val(currentTitle);
                 $("#content").val(currentContent);
                 });

                 });

                 */

                projectBoard = $('#projectBoard');

                function zoomOut() {
                    $( "#projectBoard" ).animate({
                        "font-size": "2px"
                    }, 500, function() {
                        // Animation complete.
                    });
                }
                function zoomIn() {
                    $( "#projectBoard" ).animate({
                        "font-size": "12px"
                    }, 500, function() {
                        // Animation complete.
                    });
                }
                function zoomDemo() {
                    setTimeout(zoomIn, 2000);
                    zoomOut();
                }

                function editCard(cardId) {
                    function editCardImpl(html) {
                        function removeEditForm() {
                            $('#editCardForm').detach();
                        }
                        function onOk() {
                            debugger;
                            // removeEditForm();
                        }
                        function onCancel() {
                            debugger;
                            removeEditForm();
                            zoomDemo();
                        }
                        // Gather all the pieces
                        var cardElement = $('#'+cardId)[0];
                        var id = cardElement.id;
                        var titleElement =  $('div.title', cardElement);
                        var contentElement = $('div.content', cardElement);
                        var titleText = titleElement[0].textContent;
                        var contentText =  contentElement.val();
                        // Present the edit form
                        projectBoard.append(html);
                        var form = $('#editCardForm');
                        form.css('top', cardElement.offsetTop);
                        form.css('left', cardElement.offsetLeft);
                        form.css('z-index', 1000000);
                        $("#editCardForm #editTitle").val(titleText);
                        $("#editCardForm #editContent").val(contentText);
                        $('#editCardForm #okButton').on('click', onOk);
                        $('#editCardForm #cancelButton').on('click', onCancel);
                        debugger;
                    }
                    require(['text!templates/editCardForm.html'], editCardImpl);
                }
                function idAndEditCard(event) {
                    var cardId = event.target.firstChild.parentElement.offsetParent.id;
                    editCard(cardId);
                }

                function init() {
                    dispatcher.on('getNewCard', createCard);
                    dispatcher.on('editCard', editCard);
                    // Just for purposes of demonstrating zoom
                    dispatcher.on('replaceCard', zoomDemo);
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