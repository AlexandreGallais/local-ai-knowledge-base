---
title: "Breaking change: Binding config to dictionary extends values"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/extensions/7.0/config-bind-dictionary.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Binding config to dictionary extends values

When binding a configuration using a `System.Collections.Generic.Dictionary`2` object where the value is a mutable collection type, binding to the same key more than once now extends the values collection instead of replacing the whole collection with the new value.

## Version introduced

.NET 7

## Previous behavior

Consider the following code that binds a configuration that has a single key named `Key` to a dictionary multiple times.

```csharp
using Microsoft.Extensions.Configuration;

IConfiguration config = new ConfigurationBuilder()
    .AddInMemoryCollection()
    .Build();

config["Key:0"] = "NewValue";
var dict = new Dictionary<string, string[]>() { { "Key", new[] { "InitialValue" } } };

Console.WriteLine($"Initially: {String.Join(", ", dict["Key"])}");
config.Bind(dict);
Console.WriteLine($"Bind: {String.Join(", ", dict["Key"])}");
config.Bind(dict);
Console.WriteLine($"Bind again: {String.Join(", ", dict["Key"])}");
```

Prior to .NET 7, the value for `Key` was overwritten one each bind. The code produced the following output:

```output
Initially: InitialValue
Bind: NewValue
Bind again: NewValue
```

## New behavior

Starting in .NET 7, the dictionary value is extended each time the same key is bound, adding the new value but also keeping any existing values in the array. The same code from the Previous behavior section produces the following output:

```output
Initially: InitialValue
Bind: InitialValue, NewValue
Bind again: InitialValue, NewValue, NewValue
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change improves binding behavior by not overriding previously added values in dictionary value arrays.

## Recommended action

If the new behavior is not satisfactory, you can manually manipulate the values inside the array after binding.

## Affected APIs

- ConfigurationBinder methods
