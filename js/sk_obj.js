(function(){

  'use strict';

  var steps = [];

  window.SKMaths = {};

  window.SKMaths.addStep = function addStep( options ){
    steps.push( options );
  };

  window.SKMaths.renderSteps = function renderSteps(){
    steps.forEach( function(item,idx){
      $('#sk-wiz').append(
        renderStep( idx, item )
      );
    });
  };

  window.SKMaths.goToNextStep = function nextStep(){
    var curStep = $('#sk-wiz').steps('getCurrentIndex')
    console.log( curStep, steps.length );
    if( curStep < steps.length-1 )
      return $('#sk-wiz').steps('next');
    $('#sk-wiz').steps('finish');
  }

  window.SKMaths.checkStep = function checkStep( step ){
    var options = steps[step];
    var correct = eval( "options.question[0] " + options.question[1] + " options.question[2]" ) 
    var actual = parseInt($('#result-step-'+step).val());
   
    var result = false;
    if( !isNaN(actual) )
      result =  correct == actual;
    if( !result ){
      $('#result-step-'+step).closest('article').parent().find('aside').addClass('negative');
      $('#result-step-'+step).val('');
      setTimeout(function(){
        $('#result-step-'+step).focus();
      },500);
    }
    return result;
  }

  function renderStep( step, options ){
    var $i1 = $('<input>').attr({ disabled: true, value: options.question[0], type: 'text' });
    var $q1 = $('<div>').addClass('form-group').append( $i1 );
    var $i2 = $('<input>').attr({ disabled: true, value: options.question[1]+' '+options.question[2], type: 'text' });
    var $q2 = $('<div>').addClass('form-group').append( $i2 );

    var $ir = $('<input>').addClass('result').attr({ id: 'result-step-'+step, type: 'text', autocomplete: 'off', inputmode: 'numeric', pattern: '[0-9]*' });
    var $rr = $('<div>').addClass('form-group').append( $ir );

    var $form = $('<form>')
                    .addClass('sk-form')
                    .append('<input type="submit" style="display:none">')
                    .append( $q1 )
                    .append( $q2 )
                    .append( $rr );

    var $article = $('<article>')
                    .append( $form );

    var $aside = $('<aside>');
    if( options.aside ){
      $aside.append( '<h3>'+options.aside.title || 'kein Titel bei aside angegeben'+'</h3><p>'+options.aside.text+'</p>' );
    } else {
      $aside.append( '<img src="img/oh-no.png" class="feedback">' ) 
    }

    var $body = $('<div>')
                .append( $article )
                .append( $aside )
    var $html = $('<div>')
              .append( $('<h1>').text(options.title) )
              .append( $body )

    return $html.html()

  }

})();
