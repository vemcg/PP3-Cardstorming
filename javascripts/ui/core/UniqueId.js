define([],
    function () { "use strict"
        var UniqueId = (function () {
            function UniqueId () {
                function create(prefix) {
                    // always start with a letter (for DOM friendlyness)
                    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
                    do {
                        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
                        var ascicode=Math.floor((Math.random()*42)+48);
                        if (ascicode<58 || ascicode>64){
                            // exclude all chars between : (58) and @ (64)
                            idstr+=String.fromCharCode(ascicode);
                        }
                    } while (idstr.length<6);

                    return (prefix + idstr);
                }
                function createXXX(prefix) {
                    function rd() {
                        return (((1 + Math.random()) * 0x10000).toString(16).substring(1));
                    }

                    return (prefix + rd() + rd()); //  + rd() + rd() + rd() + rd());
                }
                // Public Interface
                this.create = create;
            } // End of Instance
            return UniqueId;
        } ()); // End of Class
        return new UniqueId;
    }
);