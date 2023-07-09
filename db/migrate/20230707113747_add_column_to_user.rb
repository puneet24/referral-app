class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referral_code, :string
    add_index :users, [:referral_code], unique: true
  end
end
