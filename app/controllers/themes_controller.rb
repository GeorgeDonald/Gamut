class ThemesController < ApplicationController
  def new
    @theme = Theme.new
  end

  def create
    @theme = Theme.create(theme_params)
    if @theme.saved_changes?
      redirect_to root_path
    else
      respond_to do |format|
        format.html {render :new}
      end
    end
  end

  def edit
    begin
      @theme = Theme.find(params[:id])
      respond_to do |format|
        format.html { render :new }
      end
    rescue
      redirect_to root_path
    end
  end

  def update
    @theme = Theme.find(params[:id])
    if(@theme.update(theme_params))
      redirect_to root_path
    else
      respond_to do |format|
        format.html { render :new }
      end
    end
  end

  private
  def theme_params
    params.require(:theme).permit(:name, :description);
  end
end
