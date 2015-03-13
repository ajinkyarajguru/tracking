class RenameProjectstoProjectInReferencesForTask < ActiveRecord::Migration
  def change
  	rename_column :tasks, :projects_id, :project_id
  end
end
