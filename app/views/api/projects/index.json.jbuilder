json.array! @projects do |project|
	json.user project.user_id
	json.supplier project.supplier.name
	json.company project.company.name
	json.projected project.projected_revenue
	json.daystogo project.days_to_go
	json.start project.start_on
	json.end project.planned_end
	
end