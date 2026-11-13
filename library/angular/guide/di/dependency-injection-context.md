---
title: "Injection context"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/di/dependency-injection-context.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Injection context

The dependency injection (DI) system relies on a runtime context where the current injector is available.

This means that injectors only work when you execute code within this context.

You have an injection context available in the following situations:

- During construction (via the `constructor`) of a class instantiated by the DI system, such as an `@Injectable` or `@Component`.
- In field initializers of such classes.
- In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
- In the `factory` function specified for an `InjectionToken`.
- Within a stack frame that runs in an injection context.

Knowing when you are in an injection context allows you to use the `inject` function to retrieve dependencies.

NOTE: For basic examples of using `inject()` in class constructors and field initializers, see the overview guide.

## Stack frame in context

Some APIs are designed to run within an injection context. This is the case, for example, with router guards. This allows you to use `inject` within the guard function to access services.

Here is an example for `CanActivateFn`

```ts
const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
};
```

## Run within an injection context

If you need to run a function within an injection context without already being in one, you can use `runInInjectionContext`.
This requires access to an injector, such as the `EnvironmentInjector`:

```ts
@Service()
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      inject(SomeService); // Do what you need with the injected service
    });
  }
}
```

Note that `inject` returns an instance only if the injector can resolve the requested token.

## Asserts the context

Angular provides the `assertInInjectionContext` helper function to verify that the current context is an injection context and throw a clear error if it is not. Pass a reference to the calling function so the error message points to the correct API entry point. This produces a clearer, more actionable message than the default generic injection error.

```ts
import {ElementRef, assertInInjectionContext, inject} from '@angular/core';

export function injectNativeElement<T extends Element>(): T {
  assertInInjectionContext(injectNativeElement);
  return inject(ElementRef).nativeElement;
}
```

You can then call this helper **from an injection context** (constructor, field initializer, provider factory, or code executed via `runInInjectionContext`):

```ts
import {Component, inject} from '@angular/core';
import {injectNativeElement} from './dom-helpers';

@Component({/* … */})
export class PreviewCard {
  readonly hostEl = injectNativeElement<HTMLElement>(); // Field initializer runs in an injection context.

  onAction() {
    const anotherRef = injectNativeElement<HTMLElement>(); // Fails: runs outside an injection context.
  }
}
```

## Using DI outside of a context

If you call `inject` or `assertInInjectionContext` outside of an injection context, Angular throws error NG0203.
