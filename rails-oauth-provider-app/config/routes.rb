require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :admin do
    resources :users
    resources :announcements
    resources :notifications
    resources :services

    root to: "users#index"
  end

  use_doorkeeper

  namespace :api do
    namespace :v1 do
      get '/me' => "users#me"
      resources :tweets
    end
  end

  resources :notifications, only: [:index]
  resources :announcements, only: [:index]

  resources :tweets

  get '/privacy', to: 'home#privacy'
  get '/terms', to: 'home#terms'

  root to: 'tweets#index'
end
