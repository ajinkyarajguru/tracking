# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

	admin=User.create([{name:'Ajinkya Rajguru', username:'ajinkya', email:'ajinkya.a.rajguru@gmail.com', role:'admin', password: 'linkedpass', password_confirmation:"linkedpass"}]);

	suppliers=Supplier.create([{name:'3M'},{name:'Norma'},{name:'Henkel'},{name:'Seco'}]);
