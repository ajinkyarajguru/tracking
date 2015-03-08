module TasksHelper
	def getUserName(index)
		User.find_by(id: index).name
	end

	def getCompanyName(index)
		Company.find_by(id: index).name
	end

	def daysToDeadline(deadline)
		if(deadline.is_a? Date)
			(deadline-Date.today).to_i
		else
			"no date"
		end
	end
end
