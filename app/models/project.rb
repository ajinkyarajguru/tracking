class Project < ActiveRecord::Base
	belongs_to :company
	has_one :revenue
	belongs_to :supplier
	has_one :user
end
