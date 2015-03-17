module SessionsHelper

	#def remember(user)
   # 	user.remember
    #	cookies.permanent.signed[:user_id] = user.id
    #	cookies.permanent[:remember_token] = user.remember_token
  #end

	  def log_in(user)		
    	session[:user_id] = user.id
    	session[:user_role]=user.role
  	end

  	def current_user
      puts(session[:user_id])
		  @current_user ||= User.find_by(id: session[:user_id])
	  end

	  def log_out
		  session.delete(:user_id)
    	@current_user = nil
	  end

	
end
