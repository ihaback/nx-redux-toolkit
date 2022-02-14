# NX Redux Toolkit

[NX Workspaces](https://nx.dev/) is a powerful tool for scaffolding enterprise level starting points for node.js monorepos with both backend and frontend code in the same repo.This is a starter for developing MERN (MongoDB, Express, React, Node) apps with NX workspaces, JWT and cookies. It also includes [Redux Toolkit](https://redux-toolkit.js.org/) with uses [Immer under the hood](https://redux-toolkit.js.org/usage/immer-reducers).

## Requirements

* Node version 14.15.1
* Yarn

## Structure

Each app in the monorepo lives in it's own folder with the `apps` folder.

```
apps
├── frontend
└── backend

```

The root of the project also includes a libs folder which provides reusable code for all apps in the monorepo structure.

```
libs
├── types
├── redux-modules
├── react-test-utils
```

## Clone the app

Run the following command in your terminal.

```
git clone git@github.com:codsworth9/nx-redux-toolkit.git
```

## Rename the .env.example file to .env

In the .env file update the strings for `NX_CONNECTION_STRING` and `NX_JWT_SECRET`. You can leave the rest as it is.

```
NX_CONNECTION_STRING=YOUR-MONGO-DB-CONNECTION-STRING
NX_JWT_SECRET=YOUR-SECRET
```

## Run the app locally

Install the dependencies for the monorepo

```
yarn
```

Then run the development command

```
yarn dev
```

## Bump all your dependencies

Update all dependencies at once with the command below

```
yarn update
```

## Deploy app to Heroku

Sign up for a [free account at Heroku here](https://signup.heroku.com/). Install the Heroku CLI by running the command below in the terminal.

```

brew tap heroku/brew && brew install heroku

```

Run the heroku login command

```

heroku login

```

Heroku will ask you to authenticate yourself in the browser.
![Heroku login](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/omasa83uvze5yvnzrapk.png)
Once it's complete you can return to the terminal. You're now logged in.

## Create a Heroku deploy target

Run the CLI command for creating a new deploy target in your Heroku account.

```

heroku create

```

Once it's finished it will look like this.
![Heroku deploy target](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i1ruo0w4v2j2r59z8x35.png)

## Set environment variables in heroku

Post your environments variables to heroku from the terminal.

```

heroku config:set NX_CONNECTION_STRING=YOUR-MONGO-DB-CONNECTION-STRING
NX_JWT_SECRET=YOUR-JWT-SECRET
NX_SITE_URL=YOUR-HEROKU-APP-URL

```

## Procfile in the root of your project

Create a <code>Procfile</code> in the root of your project and add the following

```

web: yarn start

```

## Deploy code to Heroku

Make sure all your changes in the repo are commited. Then run

```

git push heroku master

```

## Visit your deployed fullstack app

Use the CLI command below to open up your deployed app in your default browser.

```

heroku open

```

## Demo

Your NX Redux Toolkit app is [now deployed and running on Heroku](https://lower-pylon-88066.herokuapp.com).

## Automated weekly NX packages updates if tests passes

```yml
name: Package updates

on:
  schedule:
    - cron: "0 13 * * 1"

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      
      - name: Set up node
        uses: actions/setup-node@v1
        with:
          node-version: 16.x

      - name: Install yarn
        run: npm i -g yarn

      - name: Install packages
        run: yarn install

      - name: Migrate dependencies
        run: yarn nx migrate latest && yarn && yarn nx migrate --run-migrations=migrations.json

      - name: Format
        run: yarn format:write

      - name: Test
        run: yarn test

      - name: Build
        run: yarn build

      - name: Setup git config
        run: |
          # setup the username and email
          git config user.name "GitHub Actions Bot"
          git config user.email "<>"

      - name: Commit
        run: |
          # Stage the file, commit and push
          git add .
          git commit -m "NX packages update workflow"
          git push origin master
```