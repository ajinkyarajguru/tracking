json.array! @users do |user|
	json.name user.name
	json.id user.id
	
	json.delete_url api_delete_user_path(user)
end