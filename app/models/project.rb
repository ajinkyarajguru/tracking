class Project < ActiveRecord::Base
	belongs_to :company
	has_one :revenue
	belongs_to :supplier
	has_one :user

	validate :start_date_before_end_date
	validates :start_on, presence: true
	validates :planned_end, presence: true

	def start_date_before_end_date
		if start_on>planned_end
			errors.add(:start_on,"Start Date cannot be after planned end")
		end
	end

	attr_accessor :days_to_go

	def days_to_go
		(planned_end-Date.today).to_i
	end

	def is_completed
		if read_attribute(:completed_on) != nil
			true
		else
			false
		end
	end

	def self.get_active_projects
		incomplete=Array.new
		Project.all.each do |project|
			if !project.is_completed
				incomplete.push project 
			end
		end
		incomplete
	end
end
