class ChangeColumnToReferrals < ActiveRecord::Migration[7.0]
  def change
    change_column :referrals, :accepted_at, :datetime
    remove_column :referrals, :timestamp
  end
end
