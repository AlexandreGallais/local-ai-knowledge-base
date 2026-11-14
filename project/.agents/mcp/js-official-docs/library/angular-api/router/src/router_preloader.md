# router/src/router_preloader

## PreloadingStrategy

```ts
export abstract class PreloadingStrategy
```

@description

Provides a preloading strategy.

@see [Preloading strategy](guide/routing/customizing-route-behavior#preloading-strategy)
@publicApi

## PreloadAllModules

```ts
export class PreloadAllModules implements PreloadingStrategy
```

@description

Provides a preloading strategy that preloads all modules as quickly as possible.

```ts
RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
```

```ts
export const appConfig: ApplicationConfig = {
providers: [
  provideRouter(
    routes,
    withPreloading(PreloadAllModules)
  )
]
};
```


@see [Preloading strategy](guide/routing/customizing-route-behavior#preloading-strategy)

@publicApi

## NoPreloading

```ts
export class NoPreloading implements PreloadingStrategy
```

@description

Provides a preloading strategy that does not preload any modules.

This strategy is enabled by default.

@see [Preloading strategy](guide/routing/customizing-route-behavior#preloading-strategy)

@publicApi

## RouterPreloader

```ts
export class RouterPreloader implements OnDestroy
```

The preloader optimistically loads all router configurations to
make navigations into lazily-loaded sections of the application faster.

The preloader runs in the background. When the router bootstraps, the preloader
starts listening to all navigation events. After every such event, the preloader
will check if any configurations can be loaded lazily.

If a route is protected by `canLoad` guards, the preloaded will not load it.

@publicApi