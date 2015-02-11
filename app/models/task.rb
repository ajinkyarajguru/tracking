class Task < ActiveRecord::Base
has_and_belongs_to :tasks
belongs_to :users
end
