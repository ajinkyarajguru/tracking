class SupplierController < BaseController

	private

      def user_params
        params.require(:supplier).permit(:name)
      end

      def query_params
        params.permit(:id, :name)
      end
  end
end
