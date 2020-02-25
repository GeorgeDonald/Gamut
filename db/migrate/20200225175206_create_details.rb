class CreateDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :details do |t|
      t.text :description
      t.references :theme, foreign_key: true
      t.references :topic, foreign_key: true

      t.timestamps
    end
  end
end
