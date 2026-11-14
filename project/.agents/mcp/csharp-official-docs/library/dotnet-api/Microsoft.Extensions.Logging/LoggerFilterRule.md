---
title: "LoggerFilterRule class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerFilterRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerFilterRule class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class LoggerFilterRule
```

Defines a rule used to filter log messages

To be added.

## LoggerFilterRule.LoggerFilterRule(String, String, LogLevel>, Boolean>) constructor

```csharp
public LoggerFilterRule (string? providerName, string? categoryName, Microsoft.Extensions.Logging.LogLevel? logLevel, Func<string?,string?,Microsoft.Extensions.Logging.LogLevel,bool>? filter);
```

Creates a new `LoggerFilterRule` instance.

Parameters:

- `providerName`: The provider name to use in this filter rule.
- `categoryName`: The category name to use in this filter rule.
- `logLevel`: The `LoggerFilterRule.LogLevel` to use in this filter rule.
- `filter`: The filter to apply.

To be added.

## LoggerFilterRule.CategoryName property

```csharp
public string? CategoryName { get; }
```

Gets the logger category this rule applies to.

Returns: To be added.

To be added.

## LoggerFilterRule.Filter property

```csharp
public Func<string?,string?,Microsoft.Extensions.Logging.LogLevel,bool>? Filter { get; }
```

Gets the filter delegate that would be applied to messages that passed the `LoggerFilterRule.LogLevel`.

Returns: To be added.

To be added.

## LoggerFilterRule.LogLevel property

```csharp
public Microsoft.Extensions.Logging.LogLevel? LogLevel { get; }
```

Gets the minimum `LoggerFilterRule.LogLevel` of messages.

Returns: To be added.

To be added.

## LoggerFilterRule.ProviderName property

```csharp
public string? ProviderName { get; }
```

Gets the logger provider type or alias this rule applies to.

Returns: To be added.

To be added.

## LoggerFilterRule.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.

To be added.
