---
title: "using statement - ensure the correct use of disposable objects"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/statements/using.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# using statement - ensure the correct use of disposable objects

The `using` statement ensures the correct use of an `System.IDisposable` instance:

```csharp
var numbers = new List<int>();
using (StreamReader reader = File.OpenText("numbers.txt"))
{
    string line;
    while ((line = reader.ReadLine()) is not null)
    {
        if (int.TryParse(line, out int number))
        {
            numbers.Add(number);
        }
    }
}
```
When control leaves the block of the `using` statement, the acquired `System.IDisposable` instance is disposed. In particular, the `using` statement ensures that a disposable instance is disposed even if an exception occurs within the block of the `using` statement. In the preceding example, an opened file is closed after all lines are processed.

Use the `await using` statement to correctly use an `System.IAsyncDisposable` instance:

```csharp
await using (var resource = new AsyncDisposableExample())
{
    // Use the resource
}
```
For more information about using `System.IAsyncDisposable` instances, see the Using async disposable section of the Implement a DisposeAsync method article.

You can also use a `using` *declaration* that doesn't require braces:

```csharp
static IEnumerable<int> LoadNumbers(string filePath)
{
    using StreamReader reader = File.OpenText(filePath);
    
    var numbers = new List<int>();
    string line;
    while ((line = reader.ReadLine()) is not null)
    {
        if (int.TryParse(line, out int number))
        {
            numbers.Add(number);
        }
    }
    return numbers;
}
```
When declared in a `using` declaration, a local variable is disposed at the end of the scope in which it's declared. In the preceding example, disposal happens at the end of a method.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

A variable declared by the `using` statement or declaration is readonly. You can't reassign it or pass it as a `ref` or `out` parameter.

You can declare several instances of the same type in one `using` statement, as the following example shows:

```csharp
using (StreamReader numbersFile = File.OpenText("numbers.txt"), wordsFile = File.OpenText("words.txt"))
{
    // Process both files
}
```
When you declare several instances in one `using` statement, they are disposed in reverse order of declaration.

You can also use the `using` statement and declaration with an instance of a ref struct that fits the disposable pattern. That is, it has an instance `Dispose` method that's accessible, parameterless, and has a `void` return type.

A `return` inside a `using` block still guarantees disposal. The compiler rewrites it into a `try/finally`, so the resource’s `Dispose` is always called before the method actually returns.

The `using` statement can also be of the following form:

```csharp
using (expression)
{
    // ...
}
```

where `expression` produces a disposable instance. The following example demonstrates that form:

```csharp
StreamReader reader = File.OpenText(filePath);

using (reader)
{
    // Process file content
}
```
> **Warning:**
> In the preceding example, after control leaves the `using` statement, a disposable instance remains in scope while it's already disposed. If you use that instance further, you might encounter an exception, for example, `System.ObjectDisposedException`. That's why you should declare a disposable variable within the `using` statement or with the `using` declaration.

## C# language specification

For more information, see The using statement section of the C# language specification.

## See also

- `System.IDisposable`
- `System.IAsyncDisposable`
- Using objects that implement IDisposable
- Implement a Dispose method
- Implement a DisposeAsync method
- Use simple 'using' statement (style rule IDE0063)
- `using` directive
