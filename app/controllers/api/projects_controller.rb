module Api
class ProjectsController < BaseController
	private

      def user_params
        params.require(:project).permit();
      end

      def query_params
        params.permit(:projected_revenue, :progress, :user_id, :company_id, :supplier_id, :planned_on)
      end
  end
end