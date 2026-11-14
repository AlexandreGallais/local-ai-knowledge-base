# router/src/router_config_loader

## ROUTES

```ts
export const ROUTES = new InjectionToken<Route[][]>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'ROUTES' : '', )
```

The DI token for a router configuration.

`ROUTES` is a low level API for router configuration via dependency injection.

We recommend that in almost all cases to use higher level APIs such as `RouterModule.forRoot()`,
`provideRouter`, or `Router.resetConfig()`.

@publicApi