class Group < ApplicationRecord
  has_many :chats
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = chats.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end