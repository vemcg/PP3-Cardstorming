define(['core/EventDispatcher', 'core/Log', 'cards/CardView', 'jquery'],
    function (dispatcher, logger) { "use strict"
        var ProjectBoard = (function () { // Start of Constructor

            function ProjectBoard () {
                function testEventDispatcher() {
                    var infoIn = {str : 'infoIn string'};
                    function t1 (info) {
                        logger.log('T1: info.str = ' + info.str);
                    }
                    function t2(info) {
                        logger.log('T2: info.str = ' + info.str);
                    }
                    logger.log('Hello raw Log from ProjectBoard');

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
				projectBoard = $('projectBoard');

                function addCardToProjectBoard (card) {
					logger.log("Made it to ProjectBoard addCardToProjectBoard()");
					// Translate card visible location in pixels to card coordinates on ProjectBoard in ems?
                }

                function pause () {

                }
                function resume () {

                }
                function init() {
                    logger.log("Made it to ProjectBoard init()");
                    dispatcher.on('addCardToProjectBoard', addCardToProjectBoard);
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
