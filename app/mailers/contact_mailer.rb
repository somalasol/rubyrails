class ContactMailer < ActionMailer::Base
    default to: 'rawoof@hotmail.co.uk'
    
    def contact_email(fname , lname, email , body)
        @fname = fname
        @lname = lname
        @email = email
        @body = body
        
        mail(from: email, subject:'Contact Form Message')
    end
end