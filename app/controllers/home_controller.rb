class HomeController < ApplicationController
  def index
    @themes = Theme.all
  end
end
