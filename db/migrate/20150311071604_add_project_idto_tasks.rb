class AddProjectIdtoTasks < ActiveRecord::Migration
  def change
  	add_reference :tasks, :projects, index: true

  end
end
