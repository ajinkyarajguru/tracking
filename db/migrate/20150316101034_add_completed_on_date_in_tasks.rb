class AddCompletedOnDateInTasks < ActiveRecord::Migration
  def change
  	add_column :tasks, :completed_on, :date
  end
end
