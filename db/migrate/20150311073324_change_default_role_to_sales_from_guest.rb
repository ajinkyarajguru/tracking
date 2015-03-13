class ChangeDefaultRoleToSalesFromGuest < ActiveRecord::Migration
  def change
  	change_column :users, :role, :string, :default "sales"
  end
end
