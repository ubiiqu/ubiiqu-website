/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('increment-build', function() {
		var pkg = grunt.file.readJSON('package.json');
		pkg.build = parseInt(pkg.build) + 1;
		grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
	});

	grunt.registerTask('showtime', function() {

		var d = new Date();

		var	hrs = d.getHours();
			hrs = hrs < 10 ? '0'+hrs : hrs;
		var	min = d.getMinutes();
			min = min < 10 ? '0'+min : min;
		var	sec = d.getSeconds();
			sec = sec < 10 ? '0'+sec : sec;

		console.log('Last run: ' + hrs + ':' + min + ':' + sec);

	});

	// Project configuration.
	grunt.initConfig({
	pkg: '<json:package.json>',
	meta: {
		banner: '/*! ubiiqu GmbH - <%= pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n' +
		'* <%= pkg.homepage %>\n' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
		'ubiiqu GmbH */'
	},
	lint: {
		files: ['grunt.js']
	},
    qunit: {
      files: ['tests/*.html']
    },
	clean: {
		precopy: [
			"dist/*"
		],
		postcopy: [
			"dist/htdocs/assets/sass",
			"dist/htdocs/assets/less",
			"dist/htdocs/assets/css/*",
			"dist/htdocs/assets/js/*"
		]
	},
	copy: {
		dist: {
			files: {
				"dist/" : "src/**/*"
			},
			options: {
				basePath: 'src/',
				minimatchOptions: {
				  dot: true
				}
			}
		}
	},
	/*
	less: {
		dist: {
			src: [
				'src/htdocs/assets/less/master.less'
			],
			dest: 'dist/htdocs/assets/css/layout.css'
		},
		distmin: {
			src: [
				'src/htdocs/assets/less/master.less'
			],
			dest: 'dist/htdocs/assets/css/layout.min.css',
			options: {
				yuicompress: true
			}
		}
	},*/
	sass: {
		dist: {
			files: {
				'dist/htdocs/assets/css/compiled.css' : 'src/htdocs/assets/sass/master.scss'
			},
			options: {
				lineNumbers: true
			}
		},
		distmin: {
			files: {
				'dist/htdocs/assets/css/compiled.min.css' : 'src/htdocs/assets/sass/master.scss'
			},
			options: {
				style: 'compressed'
			}
		}
	},
	concat: {
		app: {
			src: ['<banner:meta.banner>', 'src/htdocs/assets/js/*'],
			dest: 'dist/htdocs/assets/js/main.js'
		},
		libs: {
			src: ['<banner:meta.banner>','src/htdocs/assets/js/libs/*','src/htdocs/assets/js/libs/**/*'],
			dest: 'dist/htdocs/assets/js/libs.js'
		},
		css: {
			src: 'src/htdocs/assets/css/*',
			dest: 'dist/htdocs/assets/css/layout.css'
		}
	},
	min: {
		app: {
			src: ['<banner:meta.banner>', 'dist/htdocs/assets/js/main.js'],
			dest: 'dist/htdocs/assets/js/main.min.js'
		},
		libs: {
			src: ['<banner:meta.banner>', 'dist/htdocs/assets/js/libs.js'],
			dest: 'dist/htdocs/assets/js/libs.min.js'
		}
	},
	cssmin: {
		app: {
			src: 'src/htdocs/assets/css/*',
			dest: 'dist/htdocs/assets/css/layout.min.css'
		}
	},
	compress: {
		gz: {
			files: {
				'dist/htdocs/assets/js/main.min.js.gz':'dist/htdocs/assets/js/main.min.js',
				'dist/htdocs/assets/js/libs.min.js.gz':'dist/htdocs/assets/js/libs.min.js',
				'dist/htdocs/assets/css/layout.min.css.gz':'dist/htdocs/assets/css/layout.min.css',
			},
			options: {
				mode: 'gzip'
			}
		},
		pack: {
			files: {
				'builds/<%= pkg.name %>-v<%= pkg.version %>-build<%= pkg.build %>.zip':'dist/**'
			},
			options: {
				mode: 'zip',
				basePath: 'dist/'
			}
		}
	},
	jshint: {
		options: {
			curly: true,
			eqeqeq: false,
			immed: true,
			latedef: true,
			newcap: false,
			noarg: true,
			sub: true,
			undef: true,
			boss: true,
			eqnull: true
		}
	},
	uglify: {},
	watch: {
		files: ['grunt.js', 'src/htdocs/assets/**/*'],
		tasks: 'default'
	}
	});

	// Build Task
	//  1. Clean up 'dist' folder
	//  2. Copy files from 'src' to 'dist'
	//  3. Remove unnecessary files
	//  4. Compile less files to css
	//  5. Concatenate JS
	//  6. Minify JS
	//  7. Minify CSS
	//  8. Create gzip versions of JS+CSS
	//  9. pkg.build++
	// 10. Watch changes in 'src/htdocs/assets'
	grunt.registerTask('build', 'clean:precopy copy clean:postcopy sass concat min cssmin compress:gz increment-build showtime');
	grunt.registerTask('pack', 'build compress:pack');
	grunt.registerTask('lintme', 'lint');
	grunt.registerTask('test', 'qunit');

	// Default task.
	grunt.registerTask('default', 'build watch');

};
