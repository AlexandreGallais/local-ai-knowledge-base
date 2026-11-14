---
title: "Tutorial: Get started with ASP.NET Core SignalR using TypeScript and Webpack (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/signalr-typescript-webpack.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Tutorial: Get started with ASP.NET Core SignalR using TypeScript and Webpack (part 3 of 3)

## Test the app

Confirm that the app works with the following steps:

# Visual Studio

1. Run Webpack in `release` mode. Using the **Package Manager Console** window, run the following command in the project root.

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.

1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `https://localhost:<port>`.

   If there are compile errors, try closing and reopening the solution.

1. Open another browser instance (any browser) and paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# Visual Studio Code

1. Run Webpack in `release` mode by executing the following command in the project root:

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.

1. Build and run the app by executing the following command in the project root:

   ```dotnetcli
   dotnet run
   ```

   The web server starts the app and makes it available on localhost.

1. Open a browser to `https://localhost:<port>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

## Next steps

* Strongly typed hubs
* Authentication and authorization in ASP.NET Core SignalR
* MessagePack Hub Protocol in SignalR for ASP.NET Core

## Related content

* ASP.NET Core SignalR JavaScript client
* Use hubs in ASP.NET Core SignalR
