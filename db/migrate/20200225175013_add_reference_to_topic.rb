class AddReferenceToTopic < ActiveRecord::Migration[5.2]
  def change
    add_reference :topics, :theme, foreign_key: true
  end
end
