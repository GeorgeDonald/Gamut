class Topic < ApplicationRecord
  belongs_to :parent_topic, class_name: 'Topic', foreign_key: 'topic_id', optional: true
  has_many :child_topics, class_name: 'Topic', foreign_key: 'topic_id'
  belongs_to :theme
  has_many :details
end
