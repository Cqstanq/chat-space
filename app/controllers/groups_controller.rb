class GroupsController < ApplicationController
  def index
  end
  
  def new
    @group = Group.new
    @group.user << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end

    private
    def group_params
      params.require(:group).permit(:new, { :user_ids => []})
    end
  end

  def edit
  end

  def update
  end
end
