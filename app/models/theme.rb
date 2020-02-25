class Theme < ApplicationRecord
    has_many :topics
    has_many :subjects
    
end
