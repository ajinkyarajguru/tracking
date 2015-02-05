class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :projected_revenue
      t.string :progress
      t.date :start_on
      t.date :planned_end
      t.date :completed_on
      t.references :user
      t.references :company
      t.references :supplier
      

      t.timestamps
    end
  end
end
