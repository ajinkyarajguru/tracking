class ChangeAdminFromBooleanToString < ActiveRecord::Migration
  def change
  	change_column :users, :admin, :string, default: "guest"
  end
end
