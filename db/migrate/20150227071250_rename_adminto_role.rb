class RenameAdmintoRole < ActiveRecord::Migration
  def change
  	rename_column :users, :admin, :role
  end
end
