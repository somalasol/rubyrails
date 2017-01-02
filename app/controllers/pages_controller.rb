class PagesController < ApplicationController
    def home
        
        @eat = Plan.find(1).name
        @cook = Plan.find(2).name
        
    end
    
    def about
    end
end