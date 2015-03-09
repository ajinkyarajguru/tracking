class AddDefaultFalseToPriorityInTasks < ActiveRecord::Migration
  def change
  	change_column :tasks, :priority, :boolean, default: false
  end
end
