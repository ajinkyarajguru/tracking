module ProjectsHelper
	def getUserName(index)
		User.find_by(id: index).name
	end

	def getCompanyName(index)
		Company.find_by(id: index).name
	end

	def getProjectTasks(index)
		Task.where(project_id: index)
	end
end
