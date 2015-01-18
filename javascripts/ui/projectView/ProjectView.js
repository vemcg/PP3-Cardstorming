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

                function addCardToProject(event, cardId, card, cardAttributes) {
                    // card.top = card.css('top');
                    // card.left = card.css('left');
                    card.appendTo(projectBoard);
                    card.css('top', cardAttributes.absPx.top);
                    card.css('left', cardAttributes.absPx.left);
                    // Fix x, y, and z here including translating pixels and offsets into em top and left
                }

                   function onDblClick(event) {
                       var cardElement = event.target.offsetParent;
                       var id = cardElement.id;
                       var titleElement =  $('div.title', cardElement);
                       var contentElement = $('div.content', cardElement);
                       var titleText = titleElement[0].textContent;
                       var contentText =  contentElement[0].textContent;
                       debugger;
                   }

                function dropCard ( event, ui ) {
                    var cardId = event.target.firstChild.parentElement.offsetParent.id;
                    // var card = $('.card.blankCard', event.srcElement);
                    var card = $('#palette #' + cardId);
                    var cardAttributes = {};
                    cardAttributes.absPx = {
                        top: ui.absolutePosition.top,
                        left: ui.absolutePosition.left
                    }
                    card.css('z-index', cardAttributes.z);

                    if (0 < card.length) {
                        // Card is from the palette and it needs to be removed, replaced, and edited.
                        dispatcher.fire('replaceCard', cardId);
                        addCardToProject(event, cardId, card, cardAttributes);
                        card.on('dblclick', onDblClick)
                        // // dispatcher.fire('replaceCard', cardId);
                    } else {
                        // Card is in the project.
                        // Reset z and push dirty card through controller to service to server.
                    }


                }
                function demoZoom() {
                    var size =  $('#projectBoard').css('font')
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
                    // runOldClickDemo();
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
