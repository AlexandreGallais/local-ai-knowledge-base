---
id: csharp-analysis-async-rules
title: C# async rules
topic: csharp-analysis
summary: CA2016, CA1849, CS4014 and async void, with wrong and right examples. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# async rules

Contents: 1. CA2016 · 2. CA1849 · 3. CS4014 · 4. async void · Sources

## 1. Forward the CancellationToken (CA2016)

Pass the `CancellationToken` parameter of your method to every call that accepts one. [S1]

Why: without the token, the called method keeps running after the caller cancels.

Wrong:

```csharp
public sealed class FileLoader
{
    public async Task<string> LoadAsync(string path, CancellationToken cancellationToken)
    {
        return await File.ReadAllTextAsync(path);
    }
}
```

Right:

```csharp
public sealed class FileLoader
{
    public async Task<string> LoadAsync(string path, CancellationToken cancellationToken)
    {
        return await File.ReadAllTextAsync(path, cancellationToken);
    }
}
```

## 2. Call the async API in an async method (CA1849)

In an async method, call and await the async version of an API. Never block with `.Result`, `.Wait()` or a synchronous call. [S1] [S3]

Why: a blocking call keeps a thread busy for nothing and can deadlock.

Wrong:

```csharp
public sealed class LineCounter
{
    public async Task<int> CountAsync(string path, CancellationToken cancellationToken)
    {
        await Task.Delay(10, cancellationToken);
        string text = File.ReadAllText(path);
        return text.Split('\n').Length;
    }
}
```

Right:

```csharp
public sealed class LineCounter
{
    public async Task<int> CountAsync(string path, CancellationToken cancellationToken)
    {
        string text = await File.ReadAllTextAsync(path, cancellationToken);
        return text.Split('\n').Length;
    }
}
```

## 3. Await every task (CS4014)

Await every call that returns a `Task`. [S2]

Why: a task that nobody awaits runs on its own; its error is lost.

Wrong:

```csharp
public sealed class ValveOpener(IValveRepository repository)
{
    public async Task OpenAsync(Valve valve, CancellationToken cancellationToken)
    {
        valve.IsOpen = true;
        repository.SaveAsync(valve, cancellationToken);
        await Task.Delay(10, cancellationToken);
    }
}
```

Right:

```csharp
public sealed class ValveOpener(IValveRepository repository)
{
    public async Task OpenAsync(Valve valve, CancellationToken cancellationToken)
    {
        valve.IsOpen = true;
        await repository.SaveAsync(valve, cancellationToken);
    }
}
```

## 4. Return Task, never async void (project check async-void)

Return `Task` or `Task<T>` from an async method. Write `async void` only for an event handler, whose second parameter is an `EventArgs`. [S3]

Why: the caller cannot await an `async void` method, and its exception stops the process.

No rule of the SDK reports it. Check it with: `grep -rn --include=*.cs "async void" . | grep -v EventArgs`. The command must print nothing.

Wrong:

```csharp
public sealed class ValveSaver(IValveRepository repository)
{
    public async void Save(Valve valve)
    {
        await repository.SaveAsync(valve, CancellationToken.None);
    }
}
```

Right:

```csharp
public sealed class ValveSaver(IValveRepository repository)
{
    public async Task SaveAsync(Valve valve, CancellationToken cancellationToken)
    {
        await repository.SaveAsync(valve, cancellationToken);
    }
}
```

## Sources

- [S1] Microsoft, "Code quality rules: CA2016, CA1849", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] Microsoft, "Compiler Warning (level 1) CS4014", <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/async-await-errors>, read 2026-11-13, CC BY 4.0, summarized.
- [S3] Microsoft, "Asynchronous programming scenarios", <https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios>, read 2026-11-13, CC BY 4.0, summarized.
