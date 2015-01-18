
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