---
title: "Migration to lazy-loaded routes"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/migrations/route-lazy-loading.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migration to lazy-loaded routes

This schematic helps developers to convert eagerly loaded component routes to lazy loaded routes. This allows the build process to split the production bundle into smaller chunks, to avoid a big JS bundle that includes all routes, which negatively affects initial page load of an application.

Run the schematic using the following command:

```shell
ng generate @angular/core:route-lazy-loading
```

### `path` config option

By default, migration will go over the entire application. If you want to apply this migration to a subset of the files, you can pass the path argument as shown below:

```shell
ng generate @angular/core:route-lazy-loading --path src/app/sub-component
```

The value of the path parameter is a relative path within the project.

### How does it work?

The schematic will attempt to find all the places where the application routes as defined:

- `RouterModule.forRoot` and `RouterModule.forChild`
- `Router.resetConfig`
- `provideRouter`
- variables of type `Routes` or `Route[]` (e.g. `const routes: Routes = [{...}]`)

The migration will check all the components in the routes, check if they are standalone and eagerly loaded, and if so, it will convert them to lazy loaded routes.

#### Before

```typescript
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Home} from './home';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        // Home is standalone and eagerly loaded
        component: Home,
      },
    ]),
  ],
})
export class AppModule {}
```

#### After

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        // ↓ Home is now lazy loaded
        loadComponent: () => import('./home').then((m) => m.Home),
      },
    ]),
  ],
})
export class AppModule {}
```

This migration will also collect information about all the components declared in NgModules and output the list of routes that use them (including corresponding location of the file). Consider making those components standalone and run this migration again. You can use an existing migration (see) to convert those components to standalone.
