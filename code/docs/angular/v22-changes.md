---
id: angular-v22-changes
title: "Angular 22: what changed"
topic: angular
summary: What breaks, new defaults, new stable APIs and migrations in Angular 22.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8]
license: MIT, written for this base; facts summarized from the Angular documentation (CC BY 4.0) and release notes (MIT)
variant: files
---

# Angular 22: what changed

Contents: 1. Requirements · 2. OnPush by default · 3. Removed and changed · 4. New stable APIs · 5. Deprecated · 6. Migrations · Old patterns · Sources

Use this document only when `@angular/core` in `package.json` is 22 or higher.

## 1. Requirements (Angular 22 versions)

- Node.js: `^22.22.3 || ^24.15.0 || ^26.0.0`. Node.js 20 is not supported. [S2] [S5]
- TypeScript: `>=6.0.0 <6.1.0`. TypeScript 5.9 and TypeScript 7 are outside this range: never move `typescript` to 7. [S2]
- RxJS: `^6.5.3 || ^7.4.0`. [S2]
- Released on 2026-06-03. Active support ends in 2027-06, long-term support in 2028-06. [S1]

## 2. OnPush by default (Angular 22 change detection)

A component without `changeDetection` uses OnPush. `ChangeDetectionStrategy.Default` is renamed `ChangeDetectionStrategy.Eager`. [S4]

- Do not write `changeDetection: ChangeDetectionStrategy.OnPush`. [S3]
- Keep component state in signals, so that the view updates.
- Keep `ChangeDetectionStrategy.Eager` where the update added it. Remove it only when the component reads its state from signals.

Wrong:

```ts
@Component({ selector: 'app-clock', template: '<time>{{ now }}</time>' })
export class Clock {
  public now = new Date();

  public constructor() {
    // With OnPush, the view does not update.
    setInterval(() => (this.now = new Date()), 1000);
  }
}
```

Right:

```ts
@Component({ selector: 'app-clock', template: '<time>{{ now() }}</time>' })
export class Clock {
  protected readonly now = signal(new Date());

  public constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 1000);

    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
```

## 3. Removed and changed (Angular 22 breaking changes)

| Old pattern | Write instead |
| --- | --- |
| `ComponentFactoryResolver`, `ComponentFactory` | Pass the component class to `ViewContainerRef.createComponent()` |
| `createNgModuleRef()` | `createNgModule()` |
| `provideRoutes()` | `provideRouter()`, or the `ROUTES` multi token |
| `ChangeDetectionStrategy.Default` | `ChangeDetectionStrategy.Eager` |
| Builders `@angular-devkit/build-angular:jest` and `:web-test-runner` | Builder `@angular/build:unit-test` |

Behaviour that changed: [S4] [S5]

- Router: `paramsInheritanceStrategy` defaults to `'always'`. `CanMatchFn` requires the `currentSnapshot` parameter.
- Forms: the `min` and `max` validation rules accept a number or `null`, not a string.
- Templates: an attribute with the `data-` prefix no longer binds an input or an output. Binding the same input or output twice is a compile error.
- HTTP: `HttpClient` uses the fetch backend by default. To report upload progress, keep the XHR backend with the `withXhr` feature of `provideHttpClient()`.
- Server rendering: a request with an unknown `Host` header gets a 400 response. List the valid hosts in `allowedHosts`.

## 4. New stable APIs (Angular 22: use these in new code)

| Need | Write | Import from |
| --- | --- | --- |
| Singleton service | `@Service()` | `@angular/core` |
| Asynchronous data as signals | `resource()` | `@angular/core` |
| HTTP data as signals | `httpResource()` | `@angular/common/http` |
| Form | `form()`, `FormField`, `[formField]` | `@angular/forms/signals` |
| Dependency loaded on demand | `injectAsync()` | `@angular/core` |

[S3] [S4] [S7] [S8]

Wrong:

```ts
@Injectable({ providedIn: 'root' })
export class UserStore {
  public constructor(private readonly http: HttpClient) {}
}
```

Right:

```ts
@Service()
export class UserStore {
  private readonly http = inject(HttpClient);
}
```

New template syntax in 22: comments inside an opening tag; spread in object and array literals; several `@case` for one block, and `@default never;` to make a `@switch` exhaustive; short arrow functions such as `(click)="count.update(n => n + 1)"`. [S3]

## 5. Deprecated (Angular 22: do not write)

- `withFetch()` in `provideHttpClient()`. Remove it. [S4]
- The `reportProgress` request option. Use `reportUploadProgress` and `reportDownloadProgress`. [S4]
- The Webpack builders: `@angular-devkit/build-angular`, `@angular-devkit/build-webpack`, `@ngtools/webpack`. Use the builders of `@angular/build`. [S5]
- `CommonEngine` for server rendering. Use `AngularNodeAppEngine` or `AngularAppEngine`. [S5]

## 6. Migrations (Angular 22 update)

Update from 21 with `ng update @angular/core@22 @angular/cli@22`. Do not skip a major version. The update does these changes; do not redo them by hand: [S4] [S5]

- It adds `ChangeDetectionStrategy.Eager` to existing components where needed.
- It adds the `currentSnapshot` parameter for `CanMatchFn`, and `strictTemplates` to the TypeScript configuration.
- It keeps the XHR backend where the application reports upload progress.

Optional: `ng generate @angular/core:service`, from 22.1, turns `@Injectable` into `@Service`. [S6]

## Old patterns

- `changeDetection: ChangeDetectionStrategy.OnPush` (before 22): the opt-in to OnPush. Do not write it.
- `@Injectable({providedIn: 'root'})` (before 22): use `@Service()` in new code.
- `provideHttpClient(withFetch())` (before 22): do not write `withFetch()`.
- `import {form, Field} from '@angular/forms/signals'` with `[field]` (21.0): the experimental name. Write `FormField` and `[formField]`.

## Sources

- [S1] Angular Team, "Versioning and releases", v22, <https://angular.dev/reference/releases>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Angular Team, "Version compatibility", v22, <https://angular.dev/reference/versions>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Angular Team, "Announcing Angular v22", 2026-06-03, <https://blog.angular.dev/announcing-angular-v22-c52bb83a4664>, read 2026-11-12, summarized.
- [S4] angular/angular, "Release 22.0.0", <https://github.com/angular/angular/releases/tag/v22.0.0>, read 2026-11-12, MIT, summarized.
- [S5] angular/angular-cli, "Release 22.0.0", <https://github.com/angular/angular-cli/releases/tag/v22.0.0>, read 2026-11-12, MIT, summarized.
- [S6] Angular Team, "Injectable to Service migration", v22, <https://angular.dev/reference/migrations/injectable-to-service>, read 2026-11-12, CC BY 4.0, summarized.
- [S7] Angular Team, "Forms with signals", v22, <https://angular.dev/essentials/signal-forms>, read 2026-11-12, CC BY 4.0, summarized.
- [S8] Types of `@angular/core` 22.2.6 installed in the example project of this base: `Service`, `ChangeDetectionStrategy.Eager` and `injectAsync` checked on 2026-11-13, MIT.
