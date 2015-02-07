json.id   @user.id
json.name @user.name

json.projects @user.projects do |project|
	json.supplier project.supplier.name
	json.company project.company.name
	json.projected_revenue project.projected_revenue
	json.daystogo project.days_to_go
	json.progress project.progress
end
	

