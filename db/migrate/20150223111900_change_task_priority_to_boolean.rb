class ChangeTaskPriorityToBoolean < ActiveRecord::Migration
  def change
  	change_column :tasks, :priority, :boolean
  end
end
