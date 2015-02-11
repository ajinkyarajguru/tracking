class User < ActiveRecord::Base
	has_many :projects
  has_many :tasks

	def get_active_projects
    incomplete=Array.new
    self.projects.each do |project|
      if !project.is_completed
        incomplete.push(project)
      end
      incomplete
    end
  end

  def get_active_projects_count
    get_active_projects.length
  end

end

