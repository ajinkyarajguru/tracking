json.id   @user.id
json.name @user.name
json.role @user.role

json.projects @user.projects do |project|
	json.project_id project.id
	json.supplier project.supplier.name
	json.company project.company.name
	json.projected_revenue project.projected_revenue
	json.daystogo project.days_to_go
	json.progress project.progress
	json.delete_project_url api_delete_project_path(project)
end
	

