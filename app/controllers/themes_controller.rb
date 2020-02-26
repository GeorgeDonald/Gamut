class ThemesController < ApplicationController
  def topics
    begin
      @theme = Theme.find(params[:theme_id])

      topics = {};
      @theme.topics.each do |topic|
        if(topic.parent_topic == nil)
          topics[topic.id] = topic.as_json
          getChildTopics(topics[topic.id], topic);
        end
      end

      respond_to do |format|
        format.json {render json: topics }
      end
    rescue
      respond_to do |format|
        render(:file => File.join(Rails.root, 'public/500.html'), :status => 500, :layout => false)
      end
    end
  end

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

  def getChildTopics(topicObj, topic)
    child_topics = topic.child_topics
    if(child_topics.count == 0)
      return
    end

    topicObj['child_topics'] = []
    child_topics.each do |ctopic|
      ctopicObj = ctopic.as_json
      getChildTopics(ctopicObj, ctopic)
      topicObj['child_topics'] << ctopicObj
    end
  end
end
