class AddSubjectReferenceToDetails < ActiveRecord::Migration[5.2]
  def change
    add_reference :details, :subject, foreign_key: true
  end
end
