class Contact < ActiveRecord::Base
    validates :email, presence: true
    validates :comments, presence: true
    validates :lname, presence: true
    validates :fname, presence: true
    
end