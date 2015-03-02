module SessionsHelper

	def log_in(user)
		
    	session[:user_id] = user.id
    	session[:user_role]=user.role
  	end

  	def current_user
  		@current_user = @current_user || User.find_by(id: session[:user_id])
	end

	def log_out
		@user_id=current_user.id
		session[:user_id]=nil
	end

	
end
