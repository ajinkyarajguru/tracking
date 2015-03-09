json.array! @tasks do |task|
	json.priority task.priority	
	json.description task.description
	json.company getCompanyName(task.company_id)
	json.days_to_deadline daysToDeadline(task.deadline)
	json.category task.category
	json.id task.id
	json.completed task.completed
end