# Triquanta Theme Template for Drupal 8

**Version: 1.1**

This template can be cloned to serve as a base for a custom Drupal 8 theme. Highlights:

- Sass styling, organized in a partial structure based on Triquanta best practices
- Sass compilation with autoprefixing and source maps
- Susy grid system
- JS linting and aggregation
- BrowserSync support for auto-reloading the browser and synced browser testing
- Gulp task runner to automate all of the above

The code is meant to be cloned once and edited as needed. Updates to this template will not automatically propagate to derived themes, but can of course be ported manually.

## Setup

- Clone the template in the themes/custom directory of your Drupal 8 project, replacing `THEMENAME` with the desired machine name of your theme (use only lower case letters and underscores):

        cd [drupal_root]/themes/custom
        git clone git@bitbucket.org:triquanta/triquanta-theme-template-8.git THEMENAME

- Disconnect the cloned repo from git:

        rm -rf THEMENAME/.git

- Rename all files with "THEMENAME" in the name, replacing "THEMENAME" with the machine name of your theme.

- Search in all files for the string "THEMENAME" and replace it with the machine name of your theme. In some places, it is more appropriate to replace it with a more human-readable name of your theme.

- Install development tools with NPM. These tools are only needed on your development machine. They do not need to be installed on test/acc/prod. The node_modules directory must not be committed to git.
    - Conservative approach: Just run install, making use of the version numbers locked in npm-shrinkwrap.json.

            npm install

        *Warning: Things may still break if the older NPM modules are not compatible anymore with newer software on your machine. Updating certain or all NPM packages may still be necessary.*

    - Progressive approach: Delete the shrinkwrap file and allow NPM to install the latest versions. Create a new shrinkwrap file to lock down version numbers.

            rm npm-shrinkwrap.json
            npm install
            npm shrinkwrap

        Commit the new npm-shrinkwrap.json to your project's git repo, to make sure you and your colleagues will use the same versions.

        *Warning: The newest versions of all packages will be installed. Test if everything works as expected.*

- See if the 3rd party libraries in the lib directory need updates.

- If you want automatic browser updates whenever you change Sass, Javascript, image, template or font files, install the [BrowserSync module](https://www.drupal.org/project/browsersync) on your site.

    - Tip: to enable Browser sync for your theme, do *not* enable it on the theme settings page (the setting would be exported in config and deployed to test/acc/prod). Instead, enable it by adding the following line to your `settings.dev.php`, `settings.local.php`, or similar:

            $config['THEMENAME.settings']['third_party_settings']['browsersync']['enabled'] = 1;


## Usage

- Run `gulp` to start watching files, compile Sass to CSS and merge JS scripts into one file. If you enabled Browsersync for your theme, it should work automatically.

- Do *not* edit files in the css and js directories. Edit files in the sass and src_js directories instead.

- Add additional 3rd party libraries in the lib directory and use as needed.

- It is recommended to stop the running gulp process before you perform git merging actions such as `git merge`, `git pull` or `git flow feature finish`. Perform the merge, resolve merge conflicts (if any) and run gulp again to generate the resulting CSS and JS files.

## Development of this codebase

This theming base is meant provide code that is needed in 80% of the situations. It is not a place for nice-to-haves or edge cases.

To make improvements, just git clone and hack away. The repository uses the Git Flow branching model, so work in a feature branch, test on develop and release on master. Release / tag names follow the pattern `[yyyymmdd]-[nn]-v[x.x]`, eg. "20170208-01-v1.0".

When rolling a release, make sure to update the **version number** on top of the README file to match the [x.x] part of the git tag.

### Roadmap / todo

- Decide if we want to use a package manager for front end libraries. If yes, decide which one (NPM, Bower, Composer on the Drupal level...)

- Evaluate if some of the additions / tweaks that used to be in the D7 Aurora base theme must be ported to this theme template.
