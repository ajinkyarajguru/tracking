class Task < ActiveRecord::Base
	belongs_to :users

	validates :company_id, presence: true
	validates :user_id, presence: true
	validates :description, presence: true
	validates :category, presence: true
end
