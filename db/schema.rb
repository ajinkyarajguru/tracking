# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150212141307) do

  create_table "companies", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "projects", force: true do |t|
    t.string   "projected_revenue"
    t.integer  "progress",          limit: 255
    t.date     "start_on"
    t.date     "planned_end"
    t.date     "completed_on"
    t.integer  "user_id"
    t.integer  "company_id"
    t.integer  "supplier_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "projects", ["company_id"], name: "index_projects_on_company_id"
  add_index "projects", ["supplier_id"], name: "index_projects_on_supplier_id"
  add_index "projects", ["user_id"], name: "index_projects_on_user_id"

  create_table "revenues", force: true do |t|
    t.integer  "year"
    t.string   "quarter"
    t.integer  "sales"
    t.integer  "company_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "suppliers", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tasks", force: true do |t|
    t.string   "category"
    t.integer  "priority"
    t.date     "deadline"
    t.integer  "user_id"
    t.integer  "company_id"
    t.integer  "task_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "username"
    t.string   "email"
    t.boolean  "admin"
    t.string   "password_digest"
  end

end
