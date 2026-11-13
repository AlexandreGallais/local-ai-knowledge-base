---
title: "The features described in this article are obsolete as of ASP.NET Core 3.0 (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/spa-services.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use JavaScript Services to Create Single Page Applications in ASP.NET Core

By Fiyaz Hasan

> **Warning:**
> The features described in this article are obsolete as of ASP.NET Core 3.0. A simpler SPA frameworks integration mechanism is available in the Microsoft.AspNetCore.SpaServices.Extensions NuGet package. For more information, see [Announcement] Obsoleting Microsoft.AspNetCore.SpaServices and Microsoft.AspNetCore.NodeServices.

A Single Page Application (SPA) is a popular type of web application due to its inherent rich user experience. Integrating client-side SPA frameworks or libraries, such as Angular or React, with server-side frameworks such as ASP.NET Core can be difficult. JavaScript Services was developed to reduce friction in the integration process. It enables seamless operation between the different client and server technology stacks.

## What is JavaScript Services

JavaScript Services is a collection of client-side technologies for ASP.NET Core. Its goal is to position ASP.NET Core as developers' preferred server-side platform for building SPAs.

JavaScript Services consists of two distinct NuGet packages:

* Microsoft.AspNetCore.NodeServices (NodeServices)
* Microsoft.AspNetCore.SpaServices (SpaServices)

These packages are useful in the following scenarios:

* Run JavaScript on the server
* Use a SPA framework or library
* Build client-side assets with Webpack

Much of the focus in this article is placed on using the SpaServices package.

## What is SpaServices

SpaServices was created to position ASP.NET Core as developers' preferred server-side platform for building SPAs. SpaServices isn't required to develop SPAs with ASP.NET Core, and it doesn't lock developers into a particular client framework.

SpaServices provides useful infrastructure such as:

* Server-side prerendering
* Webpack dev middleware
* Hot Module Replacement
* Routing helpers

Collectively, these infrastructure components enhance both the development workflow and the runtime experience. The components can be adopted individually.

## Prerequisites for using SpaServices

To work with SpaServices, install the following:

* Node.js (version 6 or later) with npm

  * To verify these components are installed and can be found, run the following from the command line:

    ```console
    node -v && npm -v
    ```

  * If deploying to an Azure web site, no action is required—Node.js is installed and available in the server environments.

* .NET Core SDK 2.0 or later

  * On Windows using Visual Studio 2017, the SDK is installed by selecting the **.NET Core cross-platform development** workload.

* Microsoft.AspNetCore.SpaServices NuGet package

## Server-side prerendering

A universal (also known as isomorphic) application is a JavaScript application capable of running both on the server and the client. Angular, React, and other popular frameworks provide a universal platform for this application development style. The idea is to first render the framework components on the server via Node.js, and then delegate further execution to the client.

ASP.NET Core Tag Helpers provided by SpaServices simplify the implementation of server-side prerendering by invoking the JavaScript functions on the server.

### Server-side prerendering prerequisites

Install the aspnet-prerendering npm package:

```console
npm i -S aspnet-prerendering
```

### Server-side prerendering configuration

The Tag Helpers are made discoverable via namespace registration in the project's `_ViewImports.cshtml` file:

```cshtml
@using SpaServicesSampleApp
@addTagHelper "*, Microsoft.AspNetCore.Mvc.TagHelpers"
@addTagHelper "*, Microsoft.AspNetCore.SpaServices"
```

These Tag Helpers abstract away the intricacies of communicating directly with low-level APIs by leveraging an HTML-like syntax inside the Razor view:

```cshtml
<app asp-prerender-module="ClientApp/dist/main-server">Loading...</app>
```

### asp-prerender-module Tag Helper

The `asp-prerender-module` Tag Helper, used in the preceding code example, executes `ClientApp/dist/main-server.js` on the server via Node.js. For clarity's sake, `main-server.js` file is an artifact of the TypeScript-to-JavaScript transpilation task in the Webpack build process. Webpack defines an entry point alias of `main-server`; and, traversal of the dependency graph for this alias begins at the `ClientApp/boot-server.ts` file:

```javascript
entry: { 'main-server': './ClientApp/boot-server.ts' },
```

In the following Angular example, the `ClientApp/boot-server.ts` file utilizes the `createServerRenderer` function and `RenderResult` type of the `aspnet-prerendering` npm package to configure server rendering via Node.js. The HTML markup destined for server-side rendering is passed to a resolve function call, which is wrapped in a strongly-typed JavaScript `Promise` object. The `Promise` object's significance is that it asynchronously supplies the HTML markup to the page for injection in the DOM's placeholder element.

```typescript
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

export default createServerRenderer(params => {
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: '<app></app>', url: params.url } },
        { provide: 'ORIGIN_URL', useValue: params.origin }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone);
        
        return new Promise<RenderResult>((resolve, reject) => {
            zone.onError.subscribe(errorInfo => reject(errorInfo));
            appRef.isStable.first(isStable => isStable).subscribe(() => {
                // Because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() => {
                    resolve({
                        html: state.renderToString()
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});
```

### asp-prerender-data Tag Helper

When coupled with the `asp-prerender-module` Tag Helper, the `asp-prerender-data` Tag Helper can be used to pass contextual information from the Razor view to the server-side JavaScript. For example, the following markup passes user data to the `main-server` module:

```cshtml
<app asp-prerender-module="ClientApp/dist/main-server"
        asp-prerender-data='new {
            UserName = "John Doe"
        }'>Loading...</app>
```

The received `UserName` argument is serialized using the built-in JSON serializer and is stored in the `params.data` object. In the following Angular example, the data is used to construct a personalized greeting within an `h1` element:

```typescript
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

export default createServerRenderer(params => {
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: '<app></app>', url: params.url } },
        { provide: 'ORIGIN_URL', useValue: params.origin }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone);
        
        return new Promise<RenderResult>((resolve, reject) => {
            const result = `<h1>Hello, ${params.data.userName}</h1>`;

            zone.onError.subscribe(errorInfo => reject(errorInfo));
            appRef.isStable.first(isStable => isStable).subscribe(() => {
                // Because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() => {
                    resolve({
                        html: result
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});
```

Property names passed in Tag Helpers are represented with **PascalCase** notation. Contrast that to JavaScript, where the same property names are represented with **camelCase**. The default JSON serialization configuration is responsible for this difference.

To expand upon the preceding code example, data can be passed from the server to the view by hydrating the `globals` property provided to the `resolve` function:

```typescript
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

export default createServerRenderer(params => {
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: '<app></app>', url: params.url } },
        { provide: 'ORIGIN_URL', useValue: params.origin }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone);
        
        return new Promise<RenderResult>((resolve, reject) => {
            const result = `<h1>Hello, ${params.data.userName}</h1>`;

            zone.onError.subscribe(errorInfo => reject(errorInfo));
            appRef.isStable.first(isStable => isStable).subscribe(() => {
                // Because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() => {
                    resolve({
                        html: result,
                        globals: {
                            postList: [
                                'Introduction to ASP.NET Core',
                                'Making apps with Angular and ASP.NET Core'
                            ]
                        }
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});
```

The `postList` array defined inside the `globals` object is attached to the browser's global `window` object. This variable hoisting to global scope eliminates duplication of effort, particularly as it pertains to loading the same data once on the server and again on the client.

## Webpack dev middleware

Webpack dev middleware introduces a streamlined development workflow whereby Webpack builds resources on demand. The middleware automatically compiles and serves client-side resources when a page is reloaded in the browser. The alternate approach is to manually invoke Webpack via the project's npm build script when a third-party dependency or the custom code changes. An npm build script in the `package.json` file is shown in the following example:

```json
"build": "npm run build:vendor && npm run build:custom",
```

### Webpack dev middleware prerequisites

Install the aspnet-webpack npm package:

```console
npm i -D aspnet-webpack
```

### Webpack dev middleware configuration

Webpack dev middleware is registered into the HTTP request pipeline via the following code in the `Startup.cs` file's `Configure` method:

```csharp
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseWebpackDevMiddleware();
}
else
{
    app.UseExceptionHandler("/Home/Error");
}

// Call UseWebpackDevMiddleware before UseStaticFiles
app.UseStaticFiles();
```

The `UseWebpackDevMiddleware` extension method must be called before registering static file hosting via the `UseStaticFiles` extension method. For security reasons, register the middleware only when the app runs in development mode.

The `webpack.config.js` file's `output.publicPath` property tells the middleware to watch the `dist` folder for changes:

```javascript
module.exports = (env) => {
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
```

## Hot Module Replacement

Think of Webpack's Hot Module Replacement (HMR) feature as an evolution of webpack dev middleware. HMR introduces all the same benefits, but it further streamlines the development workflow by automatically updating page content after compiling the changes. Don't confuse this with a refresh of the browser, which would interfere with the current in-memory state and debugging session of the SPA. There's a live link between the webpack dev middleware service and the browser, which means changes are pushed to the browser.

### Hot Module Replacement prerequisites

Install the webpack-hot-middleware npm package:

```console
npm i -D webpack-hot-middleware
```

### Hot Module Replacement configuration

The HMR component must be registered into MVC's HTTP request pipeline in the `Configure` method:

```csharp
app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
    HotModuleReplacement = true
});
```

As was true with webpack dev middleware, the `UseWebpackDevMiddleware` extension method must be called before the `UseStaticFiles` extension method. For security reasons, register the middleware only when the app runs in development mode.

The `webpack.config.js` file must define a `plugins` array, even if it's left empty:

```javascript
module.exports = (env) => {
        plugins: [new CheckerPlugin()]
```

After loading the app in the browser, the developer tools' Console tab provides confirmation of HMR activation:
