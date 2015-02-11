json.array! @users do |user|
	json.name user.name
	json.id user.id
	json.active user.get_active_projects_count
	json.delete_url api_delete_user_path(user, format: :json)
	
end