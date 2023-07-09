class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.string :email
      t.string :accepted_at
      t.string :timestamp

      t.timestamps
    end
  end
end
