# Load the Rails application.
require_relative "application"

ENV["DB_NAME"] = "referral_api"
ENV["DB_USER"] = "root"
ENV["DB_PASSWORD"] = "password"


# Initialize the Rails application.
Rails.application.initialize!
