---
title: "Debugging and troubleshooting dependency injection (part 2 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/di/debugging-and-troubleshooting-di.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Debugging and troubleshooting dependency injection (part 2 of 4)

## Common pitfalls and solutions

### Services not available where expected

One of the most common DI issues occurs when you try to inject a service but Angular cannot find it in the current injector or any parent injector. This usually happens when the service is provided in the wrong scope or not provided at all.

#### Provider scope mismatch

When you provide a service in a component's `providers` array, Angular creates an instance in that component's injector. This instance is only available to that component and its children. Parent components and sibling components cannot access it because they use different injectors.

```angular-ts
import {Component} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-child',
  template: '<p>Child</p>',
  providers: [DataStore], // Only available in this component and its children
})
export class ChildView {}
```

```angular-ts
import {Component, inject} from '@angular/core';
import {DataStore} from './data-store';

@Component({
  selector: 'app-parent',
  template: '<app-child />',
})
export class ParentView {
  private dataService = inject(DataStore); // ERROR: Not available to parent
}
```

Angular only searches up the hierarchy, never down. Parent components cannot access services provided in child components.

**Solution:** Provide the service at a higher level (application or parent component).

```ts
import {Service} from '@angular/core';

@Service()
export class DataStore {
  // Available everywhere
}
```

TIP: `@Service` makes services available everywhere and enables tree-shaking. If you don't want to scope it to the entire app, specify `autoProvided: false`.

#### Services and lazy-loaded routes

When you provide a service in a lazy-loaded route's `providers` array, Angular creates a child injector for that route. This injector and its services only become available after the route loads. Components in the eagerly-loaded parts of your application cannot access these services because they use different injectors that exist before the lazy-loaded injector is created.

```ts
import {Routes} from '@angular/router';
import {FeatureClient} from './feature-client';

export const featureRoutes: Routes = [
  {
    path: 'feature',
    providers: [FeatureClient],
    loadComponent: () => import('./feature-view'),
  },
];
```

```angular-ts
import {Component, inject} from '@angular/core';
import {FeatureClient} from './feature-client';

@Component({
  selector: 'app-eager',
  template: '<p>Eager Component</p>',
})
export class EagerView {
  private featureService = inject(FeatureClient); // ERROR: Not available yet
}
```

Lazy-loaded routes create child injectors that are only available after the route loads.

NOTE: By default, route injectors and their services persist even after navigating away from the route. They are not destroyed until the application is closed. For automatic cleanup of unused route injectors, see customizing route behavior.

**Solution:** Use `@Service` for services that need to be shared across lazy boundaries.

```ts
import {Service} from '@angular/core';

@Service()
export class FeatureClient {
  // Available everywhere, including before lazy load
}
```

If the service should be lazy-loaded but still available to eager components, inject it only where needed and use optional injection to handle availability.

### Multiple instances instead of singletons

You expect one shared instance (singleton) but get separate instances in different components.

#### Providing in component instead of root

When you add a service to a component's `providers` array, Angular creates a new instance of that service for each instance of the component. Each component gets its own separate service instance, which means changes in one component don't affect the service instance in other components. This is often unexpected when you want shared state across your application.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
  providers: [UserClient], // Creates new instance per component!
})
export class UserProfile {
  private userService = inject(UserClient);
}

@Component({
  selector: 'app-settings',
  template: '<p>Settings</p>',
  providers: [UserClient], // Different instance!
})
export class UserSettings {
  private userService = inject(UserClient);
}
```

Each component gets its own `UserClient` instance. Changes in one component don't affect the other.

**Solution:** Use `@Service` for singletons.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  // Single instance shared across all components
}
```

#### When multiple instances are intentional

Sometimes you want separate instances per component for component-specific state.

```angular-ts
import {Injectable, signal, Component, inject} from '@angular/core';

@Injectable() // No providedIn - must be provided explicitly
export class FormStateStore {
  private formData = signal({});

  setData(data: any) {
    this.formData.set(data);
  }

  getData() {
    return this.formData();
  }
}

@Component({
  selector: 'app-user-form',
  template: '<form>...</form>',
  providers: [FormStateStore], // Each form gets its own state
})
export class UserForm {
  private formState = inject(FormStateStore);
}
```

This pattern is useful for:

- Form state management (each form has isolated state)
- Component-specific caching
- Temporary data that shouldn't be shared

### Incorrect inject() usage

The `inject()` function only works in specific contexts during class construction and factory execution.

#### Using inject() in lifecycle hooks

When you call the `inject()` function inside lifecycle hooks like `ngOnInit()`, `ngAfterViewInit()`, or `ngOnDestroy()`, Angular throws an error because these methods run outside the injection context. The injection context is only available during the synchronous execution of class construction, which happens before lifecycle hooks are called.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  userName = '';

  ngOnInit() {
    const userService = inject(UserClient); // ERROR: Not an injection context
    this.userName = userService.getUser().name;
  }
}
```

**Solution:** Capture dependencies and derive values in field initializers.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{userName}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient);
  userName = this.userService.getUser().name;
}
```

#### Using the Injector for deferred injection

When you need to retrieve services outside an injection context, use the captured `Injector` directly with `injector.get()`:

```angular-ts
import {Component, inject, Injector} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<button (click)="delayedLoad()">Load Later</button>',
})
export class UserProfile {
  private injector = inject(Injector);

  delayedLoad() {
    setTimeout(() => {
      const userService = this.injector.get(UserClient);
      console.log(userService.getUser());
    }, 1000);
  }
}
```

#### Using runInInjectionContext for callbacks

Use `runInInjectionContext()` when you need to enable **other code** to call `inject()`. This is useful when accepting callbacks that might use dependency injection:

```angular-ts
import {Component, inject, Injector, input, runInInjectionContext} from '@angular/core';

@Component({
  selector: 'app-data-loader',
  template: '<button (click)="load()">Load</button>',
})
export class DataLoader {
  private injector = inject(Injector);
  onLoad = input<() => void>();

  load() {
    const callback = this.onLoad();
    if (callback) {
      // Enable the callback to use inject()
      runInInjectionContext(this.injector, callback);
    }
  }
}
```

The `runInInjectionContext()` function creates a temporary injection context, allowing code inside the callback to call `inject()`.

IMPORTANT: Always capture dependencies at the class level when possible. Use `injector.get()` for simple deferred retrieval, and `runInInjectionContext()` only when external code needs to call `inject()`.

TIP: Use `assertInInjectionContext()` to verify your code is running in a valid injection context. This is useful when creating reusable functions that call `inject()`. See Asserting the context for details.

### providers vs viewProviders confusion

The difference between `providers` and `viewProviders` affects content projection scenarios.

#### Understanding the difference

**providers:** Available to the component's template AND any content projected into the component (ng-content).

**viewProviders:** Only available to the component's template, NOT to projected content.

```angular-ts
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-parent',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  providers: [ThemeStore], // Available to content children
})
export class ParentView {
  protected themeService = inject(ThemeStore);
}

@Component({
  selector: 'app-parent-view',
  template: `
    <div>
      <p>Theme: {{ themeService.theme() }}</p>
      <ng-content />
    </div>
  `,
  viewProviders: [ThemeStore], // NOT available to content children
})
export class ParentViewOnly {
  protected themeService = inject(ThemeStore);
}
```

```angular-ts
import {Component, inject} from '@angular/core';
import {ThemeStore} from './theme-store';

@Component({
  selector: 'app-child',
  template: '<p>Child theme: {{theme()}}</p>',
})
export class ChildView {
  private themeService = inject(ThemeStore, {optional: true});
  theme = () => this.themeService?.theme() ?? 'none';
}
```

```angular-ts
@Component({
  selector: 'app-root',
  template: `
    <app-parent>
      <app-child />
      <!-- Can access ThemeStore -->
    </app-parent>

    <app-parent-view>
      <app-child />
      <!-- Cannot access ThemeStore -->
    </app-parent-view>
  `,
})
export class App {}
```

**When projected into `app-parent`:** The child component can inject `ThemeStore` because `providers` makes it available to projected content.

**When projected into `app-parent-view`:** The child component cannot inject `ThemeStore` because `viewProviders` restricts it to the parent's template only.

#### Choosing between providers and viewProviders

Use `providers` when:

- The service should be available to projected content
- You want content children to access the service
- You're providing general-purpose services

Use `viewProviders` when:

- The service should only be available to your component's template
- You want to hide implementation details from projected content
- You're providing internal services that shouldn't leak out

**Default recommendation:** Use `providers` unless you have a specific reason to restrict access with `viewProviders`.
