module Api
	class CompaniesController < Api::BaseController
		private
			def user_params
				params.require(:company).permit(:name);
			end

			def query_params
				params.permit(:name)
			end
	end
end
