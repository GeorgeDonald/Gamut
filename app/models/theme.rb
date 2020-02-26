class Theme < ApplicationRecord
    has_many :topics
    has_many :subjects
    validates :name, presence: true, length: {minimum: 3, maximum: 255}
end
