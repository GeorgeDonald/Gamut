class HomeController < ApplicationController
  def index
    @themes = Theme.all
    @editMode = true
  end
end
