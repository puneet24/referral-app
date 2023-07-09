Rails.application.routes.draw do
  scope path: 'api' do
    mount_devise_token_auth_for 'User', at: 'auth'
    resource :referrals
    get '/me', to: 'registrations#me'
    post '/referrals/accept_invite', to: 'referrals#accept_invite'
  end
end
