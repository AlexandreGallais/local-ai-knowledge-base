---
title: "Installation"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/introduction/installation.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Installation

Get started with Angular quickly with online starters or locally with your terminal.

## Play Online

If you just want to play around with Angular in your browser without setting up a project, you can use our online sandbox:

**Playground**
The fastest way to play with an Angular app. No setup required.

## Set up a new project locally

If you're starting a new project, you'll most likely want to create a local project so that you can use tooling such as Git.

### Prerequisites

- **Node.js** - v22.22.3 or newer
- **Text editor** - We recommend Visual Studio Code
- **Terminal** - Required for running Angular CLI commands
- **Development Tool** - To improve your development workflow, we recommend the Angular Language Service

### Instructions

The following guide will walk you through setting up a local Angular project.

#### Install Angular CLI

Open a terminal (if you're using Visual Studio Code, you can open an integrated terminal) and run the following command:

```
  
    npm install -g @angular/cli
```
  File: `pnpm`

```shell
    pnpm install -g @angular/cli
```
  File: `yarn`

```shell
    yarn global add @angular/cli
```
  File: `bun`

```shell
    bun install -g @angular/cli
```

If you are having issues running this command in Windows or Unix, check out the CLI docs for more info.

#### Create a new project

In your terminal, run the CLI command `ng new` with the desired project name. In the following examples, we'll be using the example project name of `my-first-angular-app`.

```shell
ng new <project-name>
```

You will be presented with some configuration options for your project. Use the arrow and enter keys to navigate and select which options you desire.

If you don't have any preferences, just hit the enter key to take the default options and continue with the setup.

After you select the configuration options and the CLI runs through the setup, you should see the following message:

```text
✔ Packages installed successfully.
    Successfully initialized git.
```

At this point, you're now ready to run your project locally!

#### Running your new project locally

In your terminal, switch to your new Angular project.

```shell
cd my-first-angular-app
```

All of your dependencies should be installed at this point (which you can verify by checking for the existence of a `node_modules` folder in your project), so you can start your project by running the command:

```shell
npm start
```

If everything is successful, you should see a similar confirmation message in your terminal:

```text
Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

And now you can visit the path in `Local` (e.g., `http://localhost:4200`) to see your application. Happy coding! 🎉

### Using AI for Development

To get started with building in your preferred AI powered IDE, check out Angular prompt rules and best practices.

## Next steps

Now that you've created your Angular project, you can learn more about Angular in our Essentials guide or choose a topic in our in-depth guides!
