class ContactsController < ApplicationController
   def new 
      @contact = Contact.new
      
   end
   
   def create
      @contact = Contact.new(contact_params)
       if @contact.save
        fname = params[:contact][:fname]
        lname = params[:contact][:lname]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        
        ContactMailer.contact_email(fname , lname , email , body).deliver
         flash[:success] = 'Message sent'
         redirect_to new_contact_path
          
          else
         flash[:danger] = @contact.errors.full_messages.join(', ')
          redirect_to new_contact_path
  
      end
   end

private
   def contact_params
   params.require(:contact).permit(:fname, :lname, :email, :comments)
   end
end