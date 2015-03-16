json.array! @projects do |project|
	json.id project.id
	json.user do 
		json.name getUserName(project.user_id)
		json.id project.user_id
	end
	json.supplier project.supplier
	json.company project.company
	json.progress project.progress
	json.projected_revenue project.projected_revenue
	json.daystogo project.days_to_go
	json.tasks getProjectTasks(project.id)
end