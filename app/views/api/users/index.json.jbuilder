json.array! @users do |user|
	json.name user.name
	json.id user.id
	
	json.active_projects user.get_active_projects_count
	json.all_projects user.get_all_projects_count
	json.total user.get_active_projects_total
	json.delete_url api_delete_user_path(user)
end