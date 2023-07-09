class ReferralMailer < ApplicationMailer
    default from: 'puneet.241994.agarwal@gmail.com'
   
   def send_referral_email(email, refer_user)
      @refer_user = refer_user
      @referral_link = 'http://localhost:3000/signup?code=' + refer_user.referral_code
      mail(to: email, subject: 'Invitation from Referral app')
   end

   def send_acceptance_referral(email, user)
      @user = user
      mail(to: email, subject: 'Congratulations! Your referral accepted invite')
   end
end
