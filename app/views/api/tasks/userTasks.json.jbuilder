json.array! @userTasks do |task|
json.priority task.priority
json.description task.description
json.deadline task.deadline
json.id task.id
end