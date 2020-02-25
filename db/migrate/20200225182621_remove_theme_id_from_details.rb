class RemoveThemeIdFromDetails < ActiveRecord::Migration[5.2]
  def change
    remove_reference :details, :theme, foreign_key: true
  end
end
