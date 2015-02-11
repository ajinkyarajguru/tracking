class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :category
      t.integer :priority
      t.date :deadline
      t.references :user 
      t.references :company 
      t.references :task 
      t.timestamps
    end
  end
end
