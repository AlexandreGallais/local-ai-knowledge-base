---
title: "SamplingLoggerBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/SamplingLoggerBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SamplingLoggerBuilderExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class SamplingLoggerBuilderExtensions
```

Extensions for configuring logging sampling.

To be added.

## SamplingLoggerBuilderExtensions.AddRandomProbabilisticSampler(ILoggingBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddRandomProbabilisticSampler (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Adds Random Probabilistic logging sampler to the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `configuration`: The `IConfiguration` to add.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

Matched logs will be randomly sampled according to the configured probability.
Higher the probability value, higher is the probability of a given log record to be sampled in.

## SamplingLoggerBuilderExtensions.AddRandomProbabilisticSampler(ILoggingBuilder, RandomProbabilisticSamplerOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddRandomProbabilisticSampler (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Diagnostics.Sampling.RandomProbabilisticSamplerOptions> configure);
```

Adds Random Probabilistic logging sampler to the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `configure`: The `RandomProbabilisticSamplerOptions` configuration delegate.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `configure` is `null`.

Matched logs will be randmoly sampled according to the configured probability.
Higher the probability value, higher is the probability of a given log record to be sampled in.

## SamplingLoggerBuilderExtensions.AddRandomProbabilisticSampler(ILoggingBuilder, Double, LogLevel>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddRandomProbabilisticSampler (this Microsoft.Extensions.Logging.ILoggingBuilder builder, double probability, Microsoft.Extensions.Logging.LogLevel? level = default);
```

Adds Random Probabilistic logging sampler to the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `probability`: Probability from 0.0 to 1.0.
- `level`: The log level (and below) to apply the sampler to.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.
- `ArgumentOutOfRangeException`: `probability` is less than 0 or greater than 1.

Matched logs will be randomly sampled according to the configured `probability`.
Higher the probability value, higher is the probability of a given log record to be sampled in.

## SamplingLoggerBuilderExtensions.AddSampler(ILoggingBuilder, LoggingSampler) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSampler (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Logging.LoggingSampler sampler);
```

Adds a logging sampler instance to the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `sampler`: The sampler instance to add.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `sampler` is `null`.

To be added.

## SamplingLoggerBuilderExtensions.AddSampler<T>(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSampler<T> (this Microsoft.Extensions.Logging.ILoggingBuilder builder) where T : Microsoft.Extensions.Logging.LoggingSampler;
```

Adds a logging sampler type to the logging infrastructure.

Parameters:

- `T`: Logging sampler type.
- `builder`: The dependency injection container to add logging to.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

To be added.

## SamplingLoggerBuilderExtensions.AddTraceBasedSampler(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddTraceBasedSampler (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds Trace-based logging sampler to the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

Sampling decisions for logs match exactly the sampling decisions for the underlying `Activity`.
You may want to configure Tracing Sampling separately as part of OpenTelemetry .NET.
