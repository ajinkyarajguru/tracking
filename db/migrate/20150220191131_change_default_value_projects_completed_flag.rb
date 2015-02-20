class ChangeDefaultValueProjectsCompletedFlag < ActiveRecord::Migration
  def change
  	change_column :projects, :completed, :boolean, default: false
  end
end
