module Api
	class CompaniesController < Api::BaseController
		private
			def company_params
				params.require(:company).permit(:name);
			end

			def query_params
				params.permit(:name)
			end
	end
end
