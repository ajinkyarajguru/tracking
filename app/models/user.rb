class User < ActiveRecord::Base
	has_many :projects
  has_many :tasks

  validates :name, presence: true
  

  validates :username, presence: true, uniqueness: true

  valid_email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, confirmation: true, format: {with: valid_email_regex}, uniqueness: true
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }

  has_secure_password
  
	def get_active_projects
    incomplete=Array.new
    self.projects.each do |project|
      if !project.completed
        incomplete.push(project)
      end
    end
    incomplete
  end

  def get_active_projects_total
    sum=0
    get_active_projects.each do |project|
      sum+=project.projected_revenue.to_i
    end
    sum.to_s
  end

  def get_active_projects_count
    get_active_projects.length
  end

  def get_all_projects_count
    self.projects.length
  end

end

