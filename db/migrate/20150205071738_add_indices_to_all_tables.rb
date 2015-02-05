class AddIndicesToAllTables < ActiveRecord::Migration
  def change
  	add_index :projects, :supplier_id
  	add_index :projects, :company_id
  	add_index :projects, :user_id
	
  end
end
