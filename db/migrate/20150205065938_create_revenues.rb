class CreateRevenues < ActiveRecord::Migration
  def change
    create_table :revenues do |t|

      t.integer :year
      t.string :quarter
      t.integer :sales
      t.references :company
      t.timestamps
    end
  end
end
