class ReferralsController < ApplicationController
    before_action :authenticate_user!

    def index
        render json: {referrals: Referral.all}
    end

    def show
        render json: {referrals: Referral.all}
    end
    
    def accept_invite
        referral_code = accept_referral_params[:referral_code]
        user = User.find_by_referral_code(referral_code)
        referral = user.referrals.find_by_email(@current_user.email)
        if user
            referral.update!({ accepted_at: Time.now })
            ReferralMailer.send_acceptance_referral(user.email, @current_user).deliver_later
        end
        render json: {success: true}
    end

    def create
        user = User.find_by_uid(referral_params[:email])
        already_referred_email = @current_user.referrals.find_by_email(referral_params[:email])
        if user || already_referred_email
            render json: {success: false, message: user ? "User already exist!" : "Requested email is already referred by you!"}
        else
            referral = Referral.create!({email: referral_params[:email], user: @current_user})
            ReferralMailer.send_referral_email(referral_params[:email], @current_user).deliver_later
            render json: {success: true, data: referral}
        end
    end

    private
        def referral_params
            params.permit!
        end

        def accept_referral_params
            params.permit!
        end
end
