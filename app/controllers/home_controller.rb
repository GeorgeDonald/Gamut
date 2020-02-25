class HomeController < ApplicationController
  def index
    @themes = Theme.all
    @editMode = true
    @themeClass = "non-edit-mode"

    if @editMode
      @themeClass = "edit-mode"
    end
  end

end
