---
id: csharp-analysis-logging-exception-rules
title: C# logging and exception rules
topic: csharp-analysis
summary: CA2254, CA1727, CA1031 and CA2200, with wrong and right examples. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# logging and exception rules

Contents: 1. CA2254 · 2. CA1727 · 3. CA1031 · 4. CA2200 · Sources

## 1. Log with a constant template (CA2254)

Write the log message as a constant template with named placeholders. Pass the values as arguments. Never use string interpolation in a log call. [S1]

Why: a constant template keeps each value as a separate field that a log tool can search.

Wrong:

```csharp
public sealed class ValveLog(ILogger<ValveLog> logger)
{
    public void Opened(string tag)
    {
        logger.LogInformation($"Valve {tag} opened");
    }
}
```

Right:

```csharp
public sealed class ValveLog(ILogger<ValveLog> logger)
{
    public void Opened(string tag)
    {
        logger.LogInformation("Valve {Tag} opened", tag);
    }
}
```

## 2. Name placeholders in PascalCase (CA1727)

Write `{Tag}`, never `{tag}`, in a log template. [S1]

Wrong:

```csharp
public sealed class PumpLog(ILogger<PumpLog> logger)
{
    public void Started(string tag)
    {
        logger.LogInformation("Pump {tag} started", tag);
    }
}
```

Right:

```csharp
public sealed class PumpLog(ILogger<PumpLog> logger)
{
    public void Started(string tag)
    {
        logger.LogInformation("Pump {Tag} started", tag);
    }
}
```

## 3. Catch the specific exception (CA1031)

Catch the exception types you can handle, such as `IOException`. Never catch `Exception`, and never leave a `catch` block empty. [S2]

Why: `catch (Exception)` also hides the errors you cannot handle.

Wrong:

```csharp
public sealed class Importer(ILogger<Importer> logger)
{
    public void Remove(string path)
    {
        try
        {
            File.Delete(path);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Remove failed for {Path}", path);
        }
    }
}
```

Right:

```csharp
public sealed class Importer(ILogger<Importer> logger)
{
    public void Remove(string path)
    {
        try
        {
            File.Delete(path);
        }
        catch (IOException exception)
        {
            logger.LogError(exception, "Remove failed for {Path}", path);
        }
    }
}
```

## 4. Rethrow with throw; (CA2200)

To rethrow the caught exception, write `throw;`. Never write `throw exception;`. [S2]

Why: `throw exception;` starts a new stack trace and loses where the error came from.

Wrong:

```csharp
public sealed class Copier(ILogger<Copier> logger)
{
    public void Copy(string source, string target)
    {
        try
        {
            File.Copy(source, target);
        }
        catch (IOException exception)
        {
            logger.LogError(exception, "Copy failed for {Source}", source);
            throw exception;
        }
    }
}
```

Right:

```csharp
public sealed class Copier(ILogger<Copier> logger)
{
    public void Copy(string source, string target)
    {
        try
        {
            File.Copy(source, target);
        }
        catch (IOException exception)
        {
            logger.LogError(exception, "Copy failed for {Source}", source);
            throw;
        }
    }
}
```

## Sources

- [S1] Microsoft, "CA2254: Template should be a static expression" and "CA1727: Use PascalCase for named placeholders", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2254>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] Microsoft, "CA1031: Do not catch general exception types" and "CA2200: Rethrow to preserve stack details", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1031>, read 2026-11-13, CC BY 4.0, summarized.
