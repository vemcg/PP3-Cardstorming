define(['core/EventDispatcher', 'core/UniqueId', 'core/Log', 'jquery', 'jqueryUI'],
    function (dispatcher, uniqueId, logger) { "use strict"
        var CardView = (function () {

            function CardView () {

                var projectBoard = $('#projectBoard');

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

                            // if you have a card on the ProjectView, you can
                            //   double click on it and edit the card
                            dispatcher.on('dblclick', idAndEditCard);



                            if ('#projectBoard' == cardAttributes.target) {
                                card.css('top', '' + cardAttributes.y + 'em');
                                card.css('left', '' + cardAttributes.x + 'em');
                                card.css('z-index', cardAttributes.z);
                                card.removeClass('blankCard');
                                debugger;  // TODO: On 10/1/15 remove this code if have never hit this
                            }

                            // $('.creator', cid).html(cardAttributes.creator);
                            // TODO: Remove $('.title', card).text(cid); // later cardAttributes.title);
                            $('.title', card).text(cardAttributes.title);
                            $('.content', card).text(cardAttributes.content);


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
                    var editedCard = cardId;

                    function editCardImpl(html) {
                        function removeEditForm() {
                            // $('#editCardForm').detach();
                            $("#editCardForm").remove();
                        }
                        function onOk() {
                            var x;
                            var cardInfo = {};
                            cardInfo.id = id;
                            x = $("#editCardForm #editTitle");
                            x = x.val();
                            cardInfo.title = x
                            x = $("#editCardForm #editContent");
                            x = x.val();
                            cardInfo.content = x;
                            removeEditForm();
                            dispatcher.fire('updateCard', cardInfo);
                            //debugger;
                            // removeEditForm();
                            dialog.dialog( "close" );
                        }
                        function onCancel() {
                            //debugger;
                            removeEditForm();
                            var cardInfo = {};
                            cardInfo.id = id;
                            dispatcher.fire('deleteCard', cardInfo);
                            //zoomDemo();
                            dialog.dialog( "close" );
                        }
                        var cardElement = $('#'+cardId)[0];
                        var id = cardElement.id;
                        var titleElement =  $('div.title', cardElement);
                        var contentElement = $('div.content', cardElement);
                        var titleText = titleElement[0].textContent;
                        var contentText =  contentElement[0].textContent;
                        // Present the edit form

                        var dialog = $( html ).dialog({
                          autoOpen: true,

                          //height: 300,
                          //width: 350,
                          modal: true,

                          // TODO: Is this needed?  How do we get rid of the underlined "close" in the dialog
                          /*close: function() {
                            form[ 0 ].reset();
                            allFields.removeClass( "ui-state-error" );
                          } */
                        });

                        var form = dialog.find( "form" ).on( "submit", function( event ) {
                          event.preventDefault();
                          addUser();
                        });

                        // from here to *** may be unnecessary
                        /*

                        $( "okButton" ).button().on( "click", function() {
                          dialog.dialog( "open" );
                        });
*/
                        //projectBoard.append(html);
                        //projectBoard.append(dialog);
                        //dialog.dialog( "open" );
                        //form = $('#editCardForm');
                        //form.css('top', cardElement.offsetTop);
                        //form.css('left', cardElement.offsetLeft);
                        //form.css('z-index', 1000000);

                        //***  end of possibly unnecessary

                        $("#editCardForm #editTitle").focus();
                        $("#editCardForm #editTitle").val(titleText);
                        $("#editCardForm #editContent").val(contentText);
                        $('#editCardForm #okButton').on('click', onOk);
                        $('#editCardForm #cancelButton').on('click', onCancel);
                        //debugger;
                    }

                    function updateCard(newTitle, newContent) {
                        var cardElement = $('#'+editedCard)[0];
                        var titleElement =  $('div.title', cardElement);
                        var contentElement = $('div.content', cardElement);
                        titleElement[0].textContent = newTitle;
                        contentElement[0].textContent = newContent;
                    }

                    require(['text!templates/editCardForm.html'], editCardImpl);
                }

                function idAndEditCard(event) {
                    var cardId = event.target.firstChild.parentElement.offsetParent.id;
                    editCard(cardId);
                }

                function updateCardXXX(newTitle, newContent) {
                    var cardElement = $('#'+edittedCard)[0];
                    var id = cardElement.id;
                    var titleElement =  $('div.title', cardElement);
                    var contentElement = $('div.content', cardElement);
                    var titleText = titleElement[0].textContent;
                    var contentText =  contentElement[0].val();
                // $('div.content',$('#'+edittedCard[0])).val(newContent);
                    titleElement[0].textContent = newTitle;
                    contentElement[0].textContent = newContent;
                    // contentElement.val(newContent);
                }

                function updateCard(cardInfo) {
                    var titleElement;
                    var contentElement;
                    var cardElement = $('#'+cardInfo.id)[0];
                    var id = cardElement.id;
                    if ('' === cardInfo.title) {
                        // If there is no title (which would be the case if the
                        // initial edit was canceled) delete the card.
                        cardElement.remove();
                    } else {
                        titleElement =  $('div.title', cardElement);
                        contentElement = $('div.content', cardElement);
                        titleElement[0].textContent = cardInfo.title;
                        contentElement[0].textContent = cardInfo.content;
                    }


// my broken
                    // var cardElement = $('#'+cardInfo.id)[0];
                    // $('.title', cardElement).val(cardInfo.title);
                    // $('.content', cardElement).val(cardInfo.content);
                }

                function deleteCard(cardInfo) {
                    var titleElement;
                    var contentElement;
                    $('#'+cardInfo.id).remove();
                    /*
                    var cardElement = $('#'+cardInfo.id)[0];
                    cardElement.remove();
                    var id = cardElement.id;
                    if ('' === cardInfo.title) {
                        // If there is no title (which would be the case if the
                        // initial edit was canceled) delete the card.
                        cardElement.remove();
                    } else {
                        titleElement =  $('div.title', cardElement);
                        contentElement = $('div.content', cardElement);
                        titleElement[0].textContent = cardInfo.title;
                        contentElement[0].textContent = cardInfo.content;
                    }
                    */
                }

                function init() {
                    dispatcher.on('createCard', createCard);
                    dispatcher.on('editCard', editCard);
                    dispatcher.on('updateCard', updateCard);
                    dispatcher.on('deleteCard', deleteCard);
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
