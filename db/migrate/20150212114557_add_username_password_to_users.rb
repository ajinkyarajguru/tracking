class AddUsernamePasswordToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string
  	add_column :users, :email, :string 
  	add_column :users, :password, :string 
  	add_column :users, :admin, :boolean
  	add_column :users, :password_digest, :string

  end
end
