# core/src/application/application_config

## ApplicationConfig

```ts
export interface ApplicationConfig
```

Set of config options available during the application bootstrap operation.

@publicApi

## ApplicationConfig.providers

```ts
providers: Array<Provider | EnvironmentProviders>
```

List of providers that should be available to the root component and all its children.

## mergeApplicationConfig

```ts
export function mergeApplicationConfig(...configs: ApplicationConfig[]): ApplicationConfig
```

Merge multiple application configurations from left to right.

@param configs Two or more configurations to be merged.
@returns A merged [ApplicationConfig](api/core/ApplicationConfig).

@publicApi