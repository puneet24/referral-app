class ApplicationController < ActionController::Base
        
        protect_from_forgery unless: -> { request.format.json? }
        include DeviseTokenAuth::Concerns::SetUserByToken
        before_action :add_cors_headers
        
        def add_cors_headers
                headers['Access-Control-Allow-Headers'] = '*'
                headers['Access-Control-Allow-Origin'] = '*'
                headers['Access-Control-Expose-Headers'] = '*'
        end
end
