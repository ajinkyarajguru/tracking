class Project < ActiveRecord::Base
	belongs_to :company
	has_one :revenue
	belongs_to :supplier
	has_one :user

	before_save :parse_date_string

	attr_accessor :days_to_go

	def days_to_go
		(read_attribute(:planned_end)-read_attribute(:start_on)).to_i
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

	def parse_date_string

		puts(self.start_on.is_a? Date)
		puts(self.planned_end.is_a? Date)
		#self.start_on=Date.parse(self.start_on)
		#self.planned_end=Date.parse(self.planned_end)
	end

end
