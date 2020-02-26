Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  # resources :themes
  # get 'themes/new'
  resources :themes, only: [:new, :create, :update, :edit] do 
    get :topics
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
