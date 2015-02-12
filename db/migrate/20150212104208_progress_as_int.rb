class ProgressAsInt < ActiveRecord::Migration
  def change
  	change_column :projects, :progress, :integer
  end
end
