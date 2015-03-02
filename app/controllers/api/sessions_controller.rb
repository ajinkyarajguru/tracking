module Api
	class SessionsController < Api::BaseController
		def new

  	end

  	def login

  		user=User.find_by(username: params[:session][:name])
      
      if user && user.authenticate(params[:session][:password])	  			
      		log_in(user)
          session[:status]=true
          flash[:success]="Logged in"
    	else          
          flash[:error]="Invalid username or password"
          session[:status]=false
    	end
		end
		def logout
			log_out() 				
		end
	end
end
