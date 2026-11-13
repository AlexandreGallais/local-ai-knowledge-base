---
title: "Debugging and troubleshooting dependency injection (part 3 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/di/debugging-and-troubleshooting-di.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Debugging and troubleshooting dependency injection (part 3 of 4)

### InjectionToken issues

When using `InjectionToken` for non-class dependencies, developers often encounter problems related to token identity, type safety, and provider configuration. These issues usually stem from how JavaScript handles object identity and how TypeScript infers types.

#### Token identity confusion

When you create a new `InjectionToken` instance, JavaScript creates a unique object in memory. Even if you create another `InjectionToken` with the exact same description string, it's a completely different object. Angular uses the token object's identity (not its description) to match providers with injection points, so tokens with the same description but different object identities cannot access each other's values.

```ts
import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app config');
```

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {APP_CONFIG} from './config.token';

export const appConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
};

bootstrapApplication(App, {
  providers: [{provide: APP_CONFIG, useValue: appConfig}],
});
```

```angular-ts
// Creating new token with same description
import {InjectionToken, inject, Component} from '@angular/core';
import {AppConfig} from './config.token';

const APP_CONFIG = new InjectionToken<AppConfig>('app config');

@Component({
  selector: 'app-feature',
  template: '<p>Feature</p>',
})
export class FeatureView {
  private config = inject(APP_CONFIG); // ERROR: Different token instance!
}
```

Even though both tokens have the description `'app config'`, they are different objects. Angular compares tokens by reference, not by description.

**Solution:** Import the same token instance.

```angular-ts
import {inject, Component} from '@angular/core';
import {APP_CONFIG, AppConfig} from './config.token';

@Component({
  selector: 'app-feature',
  template: '<p>API: {{config.apiUrl}}</p>',
})
export class FeatureView {
  protected config = inject(APP_CONFIG); // Works: Same token instance
}
```

TIP: Always export tokens from a shared file and import them everywhere they're needed. Never create multiple `InjectionToken` instances with the same description.

#### Trying to inject interfaces

When you define a TypeScript interface, it only exists during compilation for type checking. TypeScript erases all interface definitions when it compiles to JavaScript, so at runtime there's no object for Angular to use as an injection token. If you try to inject an interface type, Angular has nothing to match against the provider configuration.

```angular-ts
interface UserConfig {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  template: '<p>Profile</p>',
})
export class UserProfile {
  // ERROR: Interfaces don't exist at runtime
  constructor(private config: UserConfig) {}
}
```

**Solution:** Use `InjectionToken` for interface types.

```angular-ts
import {InjectionToken, inject, Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

interface UserConfig {
  name: string;
  email: string;
}

export const USER_CONFIG = new InjectionToken<UserConfig>('user configuration');

// Provide the configuration
bootstrapApplication(App, {
  providers: [
    {
      provide: USER_CONFIG,
      useValue: {name: 'Alice', email: 'alice@example.com'},
    },
  ],
});

// Inject using the token
@Component({
  selector: 'app-profile',
  template: '<p>User: {{config.name}}</p>',
})
export class UserProfile {
  protected config = inject(USER_CONFIG);
}
```

The `InjectionToken` exists at runtime and can be used for injection, while the `UserConfig` interface provides type safety during development.

### Circular dependencies

Circular dependencies occur when services inject each other, creating a cycle that Angular cannot resolve. For detailed explanations and code examples, see NG0200: Circular dependency.

**Resolution strategies** (in order of preference):

1. **Restructure** - Extract shared logic to a third service, breaking the cycle
2. **Use events** - Replace direct dependencies with event-based communication (such as `Subject`)
3. **Lazy injection** - Use `Injector.get()` to defer one dependency (last resort)

NOTE: Do not use `forwardRef()` for service circular dependencies—it only solves circular imports in standalone component configurations.

## Debugging dependency resolution

### Understanding the resolution process

Angular resolves dependencies by walking up the injector hierarchy. When a `NullInjectorError` occurs, understanding this search order helps you identify where to add the missing provider.

Angular searches in this order:

1. **Element injector** - The current component or directive
2. **Parent element injectors** - Up the DOM tree through parent components
3. **Environment injector** - The route or application injector
4. **NullInjector** - Throws `NullInjectorError` if not found

When you see a `NullInjectorError`, the service isn't provided at any level the component can access. Check that:

- The service has `@Service()` or
- The service has `@Injectable({providedIn: 'root'})`, or
- The service is in a `providers` array the component can reach

You can modify this search behavior with resolution modifiers like `self`, `skipSelf`, `host`, and `optional`. For complete coverage of resolution rules and modifiers, see the Hierarchical injectors guide.

### Using Angular DevTools

Angular DevTools includes an injector tree inspector that visualizes the entire injector hierarchy and shows which providers are available at each level. For installation and general usage, see the Angular DevTools injector documentation.

When debugging DI issues, use DevTools to answer these questions:

- **Is the service provided?** Select the component that fails to inject and check if the service appears in the Injector section.
- **At what level?** Walk up the component tree to find where the service is actually provided (component, route, or application level).
- **Multiple instances?** If a singleton service appears in multiple component injectors, it's likely provided in component `providers` arrays instead of using `@Service` or `providedIn: 'root'`.

If a service never appears in any injector, verify it has the `@Service` decorator or is listed in a `providers` array.

### Logging and tracing injection

When DevTools isn't enough, use logging to trace injection behavior.

#### Logging service creation

Add console logs to service constructors to see when services are created.

```ts
import {Service} from '@angular/core';

@Service()
export class UserClient {
  constructor() {
    console.log('UserClient created');
    console.trace(); // Shows call stack
  }

  getUser() {
    return {name: 'Alice'};
  }
}
```

When the service is created, you'll see the log message and a stack trace showing where the injection occurred.

**What to look for:**

- How many times is the constructor called? (should be once for singletons)
- Where in the code is it being injected? (check the stack trace)
- Is it created at the expected time? (application startup vs lazy)

#### Checking service availability

Use optional injection with logging to determine if a service is available.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
})
export class DebugView {
  private userService = inject(UserClient, {optional: true});

  constructor() {
    if (this.userService) {
      console.log('UserClient available:', this.userService);
    } else {
      console.warn('UserClient NOT available');
      console.trace(); // Shows where we tried to inject
    }
  }
}
```

This pattern helps you verify if a service is available without crashing the application.

#### Logging resolution modifiers

Test different resolution strategies with logging.

```angular-ts
import {Component, inject} from '@angular/core';
import {UserClient} from './user-client';

@Component({
  selector: 'app-debug',
  template: '<p>Debug Component</p>',
  providers: [UserClient],
})
export class DebugView {
  // Try to get local instance
  private localService = inject(UserClient, {self: true, optional: true});

  // Try to get parent instance
  private parentService = inject(UserClient, {
    skipSelf: true,
    optional: true,
  });

  constructor() {
    console.log('Local instance:', this.localService);
    console.log('Parent instance:', this.parentService);
    console.log('Same instance?', this.localService === this.parentService);
  }
}
```

This shows you which instances are available at different injector levels.

### Debugging workflow

When DI fails, follow this systematic approach:

**Step 1: Read the error message**

- Identify the error code (NG0200, NG0203, etc.)
- Read the dependency path
- Note which token failed

**Step 2: Check the basics**

- Does the service have `@Service` or `@Injectable()`?
- If you use `@Injectable`, is `providedIn` set correctly?
- Are imports correct?
- Is the file included in compilation?

**Step 3: Verify injection context**

- Is `inject()` called in a valid context?
- Check for async issues (await, setTimeout, promises)
- Verify timing (not after destroy)

**Step 4: Use debugging tools**

- Open Angular DevTools
- Check injector hierarchy
- Add console logs to constructors
- Use optional injection to test availability

**Step 5: Simplify and isolate**

- Remove dependencies one by one
- Test in a minimal component
- Check each injector level separately
- Create a reproduction case
