/* global $, Stripe */
// Document ready function modified to accommodate turbolinks (gem that speeds up loading)
$(document).on('turbolinks:load', function() {
    var form = $('#cook-form');
    var submitBtn = $('#form-submit-btn');
    
    // Set Public Key (reaches into meta tag on application.html.erb , retrieves content of stripe key)
     Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'))
     
    // When user clicks form submit button
    submitBtn.click(function(event) {
        // prevent default action. This is a built in jQuery function
        event.preventDefault();
        //Collect credit card fields
        // .val() necessary to specifiy the value within the field, rather than the field itself
        var ccNum = $('#card_number').val(),
            ccCVC = $('#card_code').val(),
            ccMonth = $('#card_month').val(),
            ccYear = $('#card_year').val();
        
     
     // Send card info to stripe
     // this function is explained by documentation. The function takes 2 params - the cc details as an {object},
     //  and stripeResponseHandler (a blank function that we define to specify what to do with the returned card token). A function as a param of another function = callback function
     
     Stripe.createToken({
        number: ccNum,
        cvc: ccCVC,
        exp_month: ccMonth,
        exp_year: ccYear
     }, stripeResponseHandler);
         
     
     
        
    });
   
    
    
    // Stripe will return back card token
    // Inject token as hidden field into form
    // Submit form to rails app and save to database
 
    
    
    
    
});
