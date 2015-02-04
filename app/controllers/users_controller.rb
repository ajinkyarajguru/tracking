module Api
  class UsersController < Api::BaseController

  	private

      def user_params
        params.require(:user).permit(:username, :email)
      end

      def query_params
        params.permit(:id, :username)
      end
  end
end