class RegistrationsController < ApplicationController
    before_action :authenticate_user!, only: [:me]

    def me
        user = @current_user.attributes
        user[:referrals] = @current_user.referrals
        render json: {user: user}
    end
end