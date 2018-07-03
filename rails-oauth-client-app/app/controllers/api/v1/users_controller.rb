module Api::V1
  class UsersController < ApiController
    before_action :doorkeeper_authorize!
    respond_to :json

    def me
    end
  end
end
