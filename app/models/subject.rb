class Subject < ApplicationRecord
  belongs_to :theme
  has_many :details
end
