module Api
	class SuppliersController < Api::BaseController

		private

	      def supplier_params
	        params.require(:supplier).permit(:name)
	      end

	      def query_params
	        params.permit(:id, :name)
	      end
	end
end
