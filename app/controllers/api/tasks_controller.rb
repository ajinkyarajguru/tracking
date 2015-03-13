module Api
	class TasksController < Api::BaseController
		

		def userTasks
			@userTasks=Task.where("user_id=?",params[:id])
		end

		private

	      def task_params
	        params.require(:task).permit(:id,:category, :priority, :deadline,:user_id,:company_id,:description,:completed,:project_id)
	      end

	      def query_params
	        params.permit(:id, :category, :priority, :deadline, :user_id,:company_id,:completed,:project_id)
	      end
	end
end
