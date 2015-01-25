$(document).ready( function(){

  SKMaths.renderSteps();

  $("#sk-wiz").steps({
    transitionEffect: 'fade',
    onStepChanging: function (event, currentIndex, newIndex){
      return SKMaths.checkStep( currentIndex );
    },
    onFinishing: function (event, currentIndex){
      if( SKMaths.checkStep( currentIndex ) ){
        $('#done').show();
        setTimeout(function(){
          $('#done .btn').fadeIn();
        },2000)
        return true;
      }
      return false;
    },
    onStepChanged: function(){
      $('input.result:visible').focus();
    },
    onInit: function(){
      $('input.result:visible').focus();
    },
    labels: {
      cancel: "Abbrechen",
      current: "Aktuell:",
      finish: "Ich bin fertig!",
      next: "Weiter",
      previous: "Zurück"
    }
  });

  $('.sk-form').on('submit', function(){
    SKMaths.goToNextStep();
    return false;
  });

  $('#done .btn')
    .on('click', function(){
      location.reload();
    });

});

