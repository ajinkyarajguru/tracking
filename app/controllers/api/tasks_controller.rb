module Api
	class TasksController < Api::BaseController
		

		def userTasks
			@userTasks=Task.where("user_id=?",params[:id])
		end

		private

	      def task_params
	        params.require(:task).permit(:id,:category, :priority, :deadline,:user_id,:company_id,:description,:completed)
	      end

	      def query_params
	        params.permit(:id, :category, :priority, :deadline, :user_id,:company_id,:completed)
	      end
	end
end
