json.id @project.id

json.user do
	json.name getUserName(@project.user_id)
	json.id @project.user_id
	end
json.progress @project.progress
json.company @project.company
json.supplier @project.supplier
json.tasks getProjectTasks(@project.id)
json.projected_revenue @project.projected_revenue
json.daystogo @project.days_to_go