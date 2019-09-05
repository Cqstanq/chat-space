require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe '#create' do
    context 'can save' do
      it 'is valid with content' do
        expect(build(:chat, image: nil)).to be_valid
      end

      it 'is valid with image' do
        expect(build(:chat, content: nil, image: "public/images/test_image.jpg")).to be_valid
      end

      it 'is valid with content and image' do
        chat = build(:chat, image: nil)
        chat.valid?
        expect(chat).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        chat = build(:chat, content: nil, image: nil)
        chat.valid?
        expect(chat.errors[:content]).to include('を入力してください')
      end

      it 'is invalid without group_id' do
        chat = build(:chat, group_id: nil)
        chat.valid?
        expect(chat.errors[:group]).to include('を入力してください')
      end

      it 'is invaid without user_id' do
        chat = build(:chat, user_id: nil)
        chat.valid?
        expect(chat.errors[:user]).to include('を入力してください')
      end
    end
  end
end