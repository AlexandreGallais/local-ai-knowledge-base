---
id: angular-old-to-new
title: Angular old patterns and their replacements
topic: angular
summary: Old Angular patterns and what to write instead, with the version each one needs. Angular 17 to 22.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13]
license: MIT, written for this base; facts summarized from the Angular documentation (CC BY 4.0) and release notes (MIT)
variant: files
---

# Angular old patterns and their replacements

Contents: 1. Version rule · 2. Components and templates · 3. State, data and forms · 4. Services, HTTP and routing · 5. Tests and build · 6. Migration commands · Old patterns · Sources

## 1. Version rule (Angular old and new patterns)

Read the major version of `@angular/core` in `package.json`. Use a replacement only when that major version is equal to or higher than the `Since` column. Below it, write the old pattern. `17` in the column means every version this document covers. [S1]

Keep one style per file. In a file that already uses the old pattern, keep it, or migrate the whole file with a command of section 6.

Wrong, in a project with `"@angular/core": "^22.0.0"`:

```ts
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p *ngIf="user.active">{{ user.name }}</p>`,
})
export class UserCardComponent {
  @Input() user!: User;
  constructor(private readonly users: UserService) {}
}
```

Right:

```ts
@Component({
  selector: 'app-user-card',
  template: `
    @if (user().active) {
      <p>{{ user().name }}</p>
    }
  `,
})
export class UserCard {
  private readonly users = inject(UserService);
  public readonly user = input.required<User>();
}
```

## 2. Components and templates (Angular 17 to 22)

| Old pattern | Write instead | Since | Status of the old pattern |
| --- | --- | --- | --- |
| `standalone: true` in the decorator | Nothing: standalone is the default | 19 | Redundant. A class declared in an NgModule needs `standalone: false`. [S5] |
| `@Input() name` | `readonly name = input<T>()` or `input.required<T>()` | 19 | Still works [S5] [S2] |
| `@Output() x = new EventEmitter<T>()` | `readonly x = output<T>()` | 19 | Still works [S5] [S2] |
| `@Input() v` with `@Output() vChange` | `readonly v = model<T>()` | 19 | Still works [S5] |
| `@ViewChild`, `@ContentChild` | `viewChild()`, `contentChild()` | 19 | Still works [S5] |
| `*ngIf`, `*ngFor`, `[ngSwitch]` | `@if`, `@for (item of items; track item.id)`, `@switch` | 18 | Deprecated in 20 [S6] |
| Template part loaded by hand | `@defer { … }` | 18 | — [S7] |
| `[ngClass]`, `[ngStyle]` | `[class.name]`, `[style.prop]`, `[class]`, `[style]` | 17 | Discouraged [S2] |
| `imports: [CommonModule]` | Import only the pipes and directives the template uses | 17 | Discouraged [S2] |
| `@HostBinding`, `@HostListener` | `host: { … }` in the decorator | 17 | Discouraged [S2] |
| `changeDetection: ChangeDetectionStrategy.OnPush` | Nothing: OnPush is the default | 22 | Redundant. `Default` is renamed `Eager`. [S4] |
| Constructor injection | `private readonly x = inject(X)` | 17 | Still works [S2] |
| `{{ this.item }}` to read a template variable | `{{ item }}` | 19 | Broken in 19 [S5] |

## 3. State, data and forms (Angular 17 to 22)

| Old pattern | Write instead | Since | Status of the old pattern |
| --- | --- | --- | --- |
| Plain field or `BehaviorSubject` for component state | `signal()`, `computed()` | 17 | Still works [S2] |
| State derived from several sources, kept in sync by hand | `linkedSignal()` | 20 | — [S6] |
| `mySignal.mutate(…)` | `mySignal.update(…)` or `mySignal.set(…)` | 17 | Removed in 17 |
| `HttpClient` call, `subscribe`, loading flag | `resource({params, loader})` or `httpResource(() => url)` | 22 | Still works. Experimental before 22. [S3] [S10] |
| Reactive forms for a new form | Signal Forms: `form(model, schema)` and `[formField]` | 22 | Still supported. Experimental in 21. [S3] [S9] |
| `takeUntil(this.destroy$)` with `ngOnDestroy` | `takeUntilDestroyed()` | 19 | Still works [S5] |
| Manual `subscribe` to copy a value into a field | `toSignal(source$, {initialValue: …})` | 20 | The `async` pipe stays right in templates [S6] [S11] |
| `zone.js`, change detection driven by `NgZone` | `provideZonelessChangeDetection()` and signals | 21 | New applications have no `zone.js` from 21 [S7] |

Read a resource with `user.hasValue()`, `user.value()`, `user.isLoading()` and `user.error()`. [S10]

## 4. Services, HTTP and routing (Angular 17 to 22)

| Old pattern | Write instead | Since | Status of the old pattern |
| --- | --- | --- | --- |
| `@Injectable({providedIn: 'root'})` | `@Service()` | 22 | Still works [S3] [S12] |
| `HttpClientModule` in `imports` | `provideHttpClient()` in `providers` | 18 | Deprecated in 18 |
| `provideHttpClient(withFetch())` | `provideHttpClient()` | 22 | `withFetch` deprecated in 22 [S4] |
| `ComponentFactoryResolver` | `viewContainerRef.createComponent(MyComponent)` | 17 | Removed in 22 [S4] |
| `provideRoutes(routes)` | `provideRouter(routes)` | 17 | Removed in 22 [S4] |
| `Router.errorHandler` | `withNavigationErrorHandler()` in `provideRouter()` | 19 | Removed in 19 [S5] |

## 5. Tests and build (Angular 17 to 22)

| Old pattern | Write instead | Since | Status of the old pattern |
| --- | --- | --- | --- |
| `TestBed.get(X)` | `TestBed.inject(X)` | 17 | Removed in 20 [S6] |
| `async(() => …)` in a test | `waitForAsync(() => …)` | 17 | Removed in 18 |
| `TestBed.flushEffects()` | `TestBed.tick()` | 20 | Removed in 20 [S6] |
| `RouterTestingModule` | `provideRouter()` and `provideLocationMocks()` | 17 | Deprecated in 21 [S8] |
| Karma and Jasmine in a new project | Vitest, builder `@angular/build:unit-test` | 21 | Karma is still supported [S7] |
| Builders of `@angular-devkit/build-angular` (Webpack) | Builders of `@angular/build` | 18 | Deprecated in 22 |
| File `user-card.component.ts`, class `UserCardComponent` | File `user-card.ts`, class `UserCard` | 20 | Keep the naming the project already uses [S2] |

## 6. Migration commands (Angular schematics)

Do not rewrite an old pattern by hand across a project. Run the command from the project root. [S8] [S13]

| Change | Command |
| --- | --- |
| NgModules to standalone | `ng generate @angular/core:standalone-migration` |
| `*ngIf`, `*ngFor` to `@if`, `@for` | `ng generate @angular/core:control-flow-migration` |
| Constructor injection to `inject()` | `ng generate @angular/core:inject-migration` |
| `@Input` to `input()` | `ng generate @angular/core:signal-input-migration` |
| `@Output` to `output()` | `ng generate @angular/core:output-migration` |
| Query decorators to signal queries | `ng generate @angular/core:signal-queries-migration` |
| `ngClass` to `class` bindings | `ng generate @angular/core:ngclass-to-class-migration` |
| `CommonModule` to single imports | `ng generate @angular/core:common-to-standalone-migration` |
| `@Injectable` to `@Service`, from 22.1 | `ng generate @angular/core:service` |

- A command exists only from the version that introduced it. When it fails with an unknown schematic, show the error and stop. Do not rewrite the code by hand instead.
- Run the `inject-migration` before the `@Service` migration: it skips classes that inject through their constructor. [S12]
- To move to a new major version: `ng update @angular/core@<major> @angular/cli@<major>`, one major version at a time.

## Old patterns

- `standalone: true` (before 19), `*ngIf` and `*ngFor` (before 18), `changeDetection: ChangeDetectionStrategy.OnPush` (before 22): do not write them in new code of a project at these versions or later.
- `HttpClientModule` (before 18), `TestBed.get()` (before 20), `ComponentFactoryResolver` (before 22): do not use them.

## Sources

- [S1] Angular Team, "Version compatibility", v22, <https://angular.dev/reference/versions>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Angular Team, "LLM prompts and AI IDE setup" and "Angular coding style guide", v22, <https://angular.dev/ai/develop-with-ai>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Angular Team, "Announcing Angular v22", 2026-06-03, <https://blog.angular.dev/announcing-angular-v22-c52bb83a4664>, read 2026-11-12, summarized.
- [S4] angular/angular, "Release 22.0.0", <https://github.com/angular/angular/releases/tag/v22.0.0>, read 2026-11-12, MIT, summarized.
- [S5] angular/angular, "Release 19.0.0", <https://github.com/angular/angular/releases/tag/19.0.0>, read 2026-11-12, MIT, summarized.
- [S6] angular/angular, "Release 20.0.0", <https://github.com/angular/angular/releases/tag/20.0.0>, read 2026-11-12, MIT, summarized.
- [S7] Angular Team, "Announcing Angular v21", 2025-11-19, <https://blog.angular.dev/announcing-angular-v21-57946c34f14b>, read 2026-11-12, summarized.
- [S8] Angular Team, "Migrations", v22, <https://angular.dev/reference/migrations>, read 2026-11-12, CC BY 4.0, summarized.
- [S9] Angular Team, "Forms with signals", v22, <https://angular.dev/essentials/signal-forms>, read 2026-11-12, CC BY 4.0, summarized.
- [S10] Angular Team, "Async reactivity with resources", v22, <https://angular.dev/guide/signals/resource>, read 2026-11-12, CC BY 4.0, summarized.
- [S11] Angular Team, "RxJS interop with Angular signals", v22, <https://angular.dev/ecosystem/rxjs-interop>, read 2026-11-12, CC BY 4.0, summarized.
- [S12] Angular Team, "Injectable to Service migration", v22, <https://angular.dev/reference/migrations/injectable-to-service>, read 2026-11-12, CC BY 4.0, summarized.
- [S13] Types of `@angular/core` 22.2.6 installed in the example project of this base: `Service`, `ChangeDetectionStrategy.Eager` and `injectAsync` checked on 2026-11-13, MIT.
