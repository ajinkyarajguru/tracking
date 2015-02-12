module Api
  class UsersController < Api::BaseController

  	private

      def user_params
        params.require(:user).permit(:name, :username, :email, :password_digest, :password, :password_confirmation)
      end

      def query_params
        params.permit(:id, :name, :username, :email, :password_digest, :password, :password_confirmation)
      end
  end
end