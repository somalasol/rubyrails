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
        submitBtn.val("Processing..").prop('disabled' , true);
        //Collect credit card fields
        // .val() necessary to specifiy the value within the field, rather than the field itself
        var ccNum = $('#card_number').val(),
            ccCVC = $('#card_code').val(),
            ccMonth = $('#card_month').val(),
            ccYear = $('#card_year').val();
   
     // Use Stripe JSlibrary to check card details 
     var error = false;
     
     if (error) {
         //if there are errors, don't send, re-enable submit button
         
         submitBtn.val("Submit").prop('disabled', false);
        
        if (!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('The credit card number appears to be invalid');
        } 
        if (!Stripe.card.validateCVC(ccCVC)){
            error = true;
            alert('The CVC number appears to be invalid');
        } 
        if (!Stripe.card.validateExpiry(ccMonth, ccYear)){
            error = true;
            alert('The expiration date appears to be invalid');
        } 
        
     } else {
         
     
     
         // Send card info to stripe
         // this function is explained by documentation. The function takes 2 params - the cc details as an {object},
         //  and stripeResponseHandler (a blank function that we define to specify what to do with the returned card token).
         //  A function as a param of another function = callback function
         
             Stripe.createToken({
                number: ccNum,
                cvc: ccCVC,
                exp_month: ccMonth,
                exp_year: ccYear
             }, stripeResponseHandler);
        
         // Stripe will return back card token
         
        function stripeResponseHandler(status, response){
            
            // response handler will take 2 params. One is the response , and the .id of response = the token
            var token = response.id;
            
            //Inject token as hidden field into form
            // the name refers to the database slot that the hidden field will save to. 
            form.append( $('<input type = "hidden" name = "user[customer_token]>').val(token));
            
             // Submit form to rails app and save to database
             // get(0) retrieves the form (which is stored inside an array of size 1. Go to inspect -> console -> $('cook-form') to see this)
             form.get(0).submit();
            
            }
    
     
        } 
     
     
       
    });
   
    
  
   
 
    
    
    
 return false;    
});
