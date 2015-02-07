module Api
  class UsersController < Api::BaseController
  	
  	private

      def user_params
        params.require(:user).permit(:name, :email)
      end

      def query_params
        params.permit(:id, :username)
      end
  end
end