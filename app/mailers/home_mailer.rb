class HomeMailer < ApplicationMailer
    default from: 'puneet.241994.agarwal@gmail.com'
   
   def welcome_email
      mail(to: 'puneet.241994.agarwal@gmail.com', subject: 'Welcome to My Awesome Site')
   end
end
