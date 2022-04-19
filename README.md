# node-react-udemy-course-project

This repo was created while following this Udemy course: https://www.udemy.com/course/node-with-react-fullstack-web-development.

### Client

Install the dependencies of the client, distinct from the node back-end server.

```sh
cd ./client/
npm install
```

From the root directory of this repo, you can then run the client script.

```sh
npm run client
```

### Server

USING THIS CODE

1. run `npm install` for the dependencies to be installed

SETTING UP A NEW PLATFORM

1. `npm init` command to initialize the node package

2. Select / use the defaults for setting up the details about this package

3. Then install express with `npm install --save express`

4. Set-up the routes and run them with `node index.js`

Get Ready for Heroku

5. Dynmaic Port Binding ('PORT' in index.js)

6. Specify Node environment in package.json ('engines')

7. Specify the start script ('start': 'node index.js')

8. Create .gitignore so that node_modules directory isn't copied over

9. (Note, these steps also interact with GitHub, so if the files are in a directory, they may not need to be initialized) To deploy to Heroku, we need to deploy from git. Initialize the directory with `git init`.

10. Then `git add .` and `git commit -m "initial commit"`.

11. Install the Heroku CLI (if not already installed). https://devcenter.heroku.com/articles/heroku-cli

12. Confirm the Heroku version `heroku --version`

13. Run `heroku create` to create a new Heroku app. The output is a url where Heroku will deploy the server with a pipe followed by the Heroku git repo location.

14. `git remote add heroku [https://git.heroku.com/enigmatic-dusk-01914.git]` The brackets aren't needed and what you input may be different to make sure the repo is created.

15. `git push heroku [branch:]main` to deploy the branch to Heroku. NOTE: what will be deployed is the main GitHub branch.

16. Type in `heroku open` to open the Heroku instance. This is also helpful when pulling up the URL for Heroku.

17. INSTALL Mongoose for MongoDB connections... `npm install --save mongoose`

18. Install Cookies `npm install --save cookie-session`
