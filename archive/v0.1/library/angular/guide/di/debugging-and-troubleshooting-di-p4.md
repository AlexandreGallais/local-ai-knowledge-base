---
title: "Debugging and troubleshooting dependency injection (part 4 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/di/debugging-and-troubleshooting-di.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Debugging and troubleshooting dependency injection (part 4 of 4)

## DI error reference

This section provides detailed information about specific Angular DI error codes you may encounter. Use this as a reference when you see these errors in your console.

### NullInjectorError: No provider for [Service]

**Error code:** NG0201

This error occurs when Angular cannot find a provider for a token in the injector hierarchy. The error message includes a dependency path showing where the injection was attempted.

```
NG0201: No provider found for `UserClient`. Path: AuthClient -> UserClient.
```

The dependency path shows that `AuthClient` tried to inject `UserClient`, but no provider was found.

#### Missing the `@Service ` or `@Injectable` decorator

The most common cause is forgetting the `@Service` or `@Injectable()` decorator on a service class.

```ts
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

Angular requires the `@Service()` decorator to generate the metadata needed for dependency injection.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

NOTE: Classes with zero-argument constructors can work without `@Service()`, but this is not recommended. Always include the decorator for consistency and to avoid issues when adding dependencies later.

#### Missing providedIn configuration

A service may have `@Injectable()` but not specify where it should be provided.

```ts
import {Injectable} from '@angular/core';

@Injectable()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

Use the `@Service` decorator to make the service available throughout your application.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  getUser() {
    return {name: 'Alice'};
  }
}
```

The `@Service` decorator makes the service available application-wide and enables tree-shaking (the service is removed from the bundle if never injected).

#### Standalone component missing imports

In Angular v20+ with standalone components, you must explicitly import or provide dependencies in each component.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user.name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // ERROR: No provider
  user = this.userService.getUser();
}
```

Ensure the service uses `@Service` or add it to the component's `providers` array.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-profile',
  template: '<p>User: {{user.name}}</p>',
})
export class UserProfile {
  private userService = inject(UserClient); // Works: providedIn: 'root'
  user = this.userService.getUser();
}
```

#### Debugging with the dependency path

The dependency path in the error message shows the chain of injections that led to the failure.

```
NG0201: No provider found for `LoggerStore`. Path: DataStore -> ApiClient -> LoggerStore.
```

This path tells you:

1. `DataStore` injected `ApiClient`
2. `ApiClient` tried to inject `LoggerStore`
3. No provider for `LoggerStore` was found

Start your investigation at the end of the chain (`LoggerStore`) and verify it has proper configuration.

#### Checking provider availability with optional injection

Use optional injection to check if a provider exists without throwing an error.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Service available: {{serviceAvailable}}</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});
  serviceAvailable = this.userService !== null;
}
```

Optional injection returns `null` if no provider is found, allowing you to handle the absence gracefully.

### NG0203: inject() must be called from an injection context

**Error code:** NG0203

This error occurs when you call `inject()` outside of a valid injection context. Angular requires `inject()` to be called synchronously during class construction or factory execution.

```
NG0203: The `UserClient` token <example-value> failed. `inject()` function must
be called from an injection context such as a constructor, a factory
function, a field initializer, or a function used with
`runInInjectionContext`.
```

#### Valid injection contexts

Angular allows `inject()` in these locations:

1. **Class field initializers**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user.name}}</p>',
   })
   export class UserProfile {
     private userService = inject(UserClient); // Valid
     user = this.userService.getUser();
   }
   ```

2. **Class constructor**

   ```angular-ts
   import {Component, inject} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<p>User: {{user.name}}</p>',
   })
   export class UserProfile {
     private userService: UserClient;
     user: ReturnType<UserClient['getUser']>;

     constructor() {
       this.userService = inject(UserClient); // Valid
       this.user = this.userService.getUser();
     }
   }
   ```

3. **Provider factory functions**

   ```ts
   import {inject, InjectionToken} from '<example-value>';
   import {UserClient} from './user-client';

   export const GREETING = new InjectionToken<string>('<example-value>', {
     factory() {
       const userService = inject(UserClient); // Valid
       const user = userService.getUser();
       return `Hello, ${user.name}`;
     },
   });
   ```

4. **Inside runInInjectionContext()**

   ```angular-ts
   import {Component, inject, Injector, runInInjectionContext} from '@angular/core';
   import {UserClient} from './user-client';

   @Component({
     selector: 'app-profile',
     template: '<button (click)="loadUser()">Load User</button>',
   })
   export class UserProfile {
     private injector = inject(Injector);

     loadUser() {
       runInInjectionContext(this.injector, () => {
         const userService = inject(UserClient); // Valid
         console.log(userService.getUser());
       });
     }
   }
   ```

Other injection contexts that `inject()` also works in include:

- provideAppInitializer
- provideEnvironmentInitializer
- Functional route guards
- Functional data resolvers
- Route resources

#### When this error occurs

This error occurs when:

- Calling `inject()` in lifecycle hooks (`ngOnInit`, `ngAfterViewInit`, etc.)
- Calling `inject()` after `await` in async functions
- Calling `inject()` in callbacks (`setTimeout`, `Promise.then()`, etc.)
- Calling `inject()` outside of class construction phase

See the "Incorrect inject() usage" section for detailed examples and solutions.

#### Solutions and workarounds

**Solution 1:** Capture dependencies in field initializers (most common)

```ts
private userService = inject(UserClient) // Capture at class level
```

**Solution 2:** Use `runInInjectionContext()` for callbacks

```ts
private injector = inject(Injector)

someCallback() {
  runInInjectionContext(this.injector, () => {
    const service = inject(MyClient)
  })
}
```

**Solution 3:** Pass <example-value> as parameters instead of injecting them

```ts
// Instead of injecting inside a callback
setTimeout(() => {
  const service = inject(MyClient) // ERROR
}, 1000)

// Capture first, then use
private service = inject(MyClient)

setTimeout(() => {
  this.service.doSomething() // Use captured reference
}, 1000)
```

### NG0200: Circular dependency detected

**Error code:** NG0200

This error occurs when two or more services depend on each other, creating a circular dependency that Angular cannot resolve.

```
NG0200: Circular dependency detected for `AuthClient`. Path: AuthClient -> UserClient -> AuthClient.
```

The dependency path shows the cycle: `AuthClient` depends on `UserClient`, which depends back on `AuthClient`.

#### Understanding the error

Angular creates service instances by calling their constructors and injecting dependencies. When services depend on each other circularly, Angular cannot determine which to create first.

#### Common causes

- Direct circular dependency (Service A → Service B → Service A)
- Indirect circular dependency (Service A → Service B → Service C → Service A)
- Import cycles in module files that also have service dependencies

#### Resolution strategies

See the "Circular dependencies" section for detailed examples and solutions:

1. **Restructure** - Extract shared logic to a third service (recommended)
2. **Use events** - Replace direct dependencies with event-based communication
3. **Lazy injection** - Use `Injector.get()` to defer one dependency (last resort)

Do NOT use `forwardRef()` for service circular dependencies. It only solves circular imports in component configurations.

### Other DI error codes

For detailed explanations and solutions for these errors, see the Angular error reference:

| Error Code              | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| NG0204 | Can't resolve all parameters - missing `@Injectable()` decorator                           |
| NG0205 | Injector already destroyed - accessing services after component destruction                |
| NG0207 | EnvironmentProviders in wrong context - using `provideHttpClient()` in component providers |

## Next steps

When you encounter DI errors, remember to:

1. Read the error message and dependency path carefully
2. Verify basic <example-value> (decorators, `providedIn`, imports)
3. Check injection context and timing
4. Use DevTools and logging to investigate
5. Simplify and isolate the problem

For a deeper understanding of specific topics on dependency injection, check out:

- Understanding dependency injection - Core DI concepts and patterns
- Hierarchical dependency injection - How the injector hierarchy works
- Testing with dependency injection - Using TestBed and mocking dependencies
