
Rails.application.config.assets.paths<<Rails.root.join("vendor","assets","bower_components")
Rails.application.config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass","assets","fonts")


Rails.application.config.assets.precompile << /\.(?:png|jpg|jpeg|gif)\z/
Rails.application.config.assets.precompile += %w( bootstrap/glyphicons-halflings-regular.woff2 )