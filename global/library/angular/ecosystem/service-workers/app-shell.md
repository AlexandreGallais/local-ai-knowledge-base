---
title: "App shell pattern"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/app-shell.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# App shell pattern

The App shell pattern is a way to render a portion of your application using a route at build time.
It can improve the user experience by quickly launching a static rendered page (a skeleton common to all pages) while the browser downloads the full client version and switches to it automatically after the code loads.

This gives users a meaningful first paint of your application that appears quickly because the browser can render the HTML and CSS without the need to initialize any JavaScript.

### Prepare the application
Do this with the following Angular CLI command:

```shell
ng new my-app
```

For an existing application, you have to manually add the `Router` and defining a `<router-outlet>` within your application.

### Create the application shell
Use the Angular CLI to automatically create the application shell.

```shell
ng generate app-shell
```

For more information about this command, see App shell command.

The command updates the application code and adds extra files to the project structure.

```text
src
├── app
│ ├── app.config.server.ts # server application configuration
│ ├── app.routes.server.ts # server routes configuration
│ └── app-shell # app-shell component
│   ├── app-shell.css
│   ├── app-shell.html
│   ├── app-shell.spec.ts
│   └── app-shell.ts
└── main.server.ts # main server application bootstrapping
```

### Verify the application is built with the shell content

```shell
ng build --configuration=development
```

Or to use the production configuration.

```shell
ng build
```

To verify the build output, open <code class="no-auto-link">dist/my-app/browser/index.html</code>.
Look for default text `app-shell works!` to show that the application shell route was rendered as part of the output.
