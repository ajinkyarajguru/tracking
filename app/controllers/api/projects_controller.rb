
module Api
class ProjectsController < Api::BaseController
	private
      def project_params
        params.require(:project).permit(:projected_revenue, :user_id, :company_id, :supplier_id, :start_on, :planned_end, :progress)
      end

      def query_params
        params.permit(:projected_revenue, :user_id, :company_id, :supplier_id, :start_on, :planned_end)
      end
  end
end