Rails.application.routes.draw do
  devise_for :users
  root "chats#index"
  resources :users, only: [:edit, :update]
  resources groups, only: [:new, :create, :edit, :update] do
    resources :chats, only: [:index, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.htmlend
  end
end