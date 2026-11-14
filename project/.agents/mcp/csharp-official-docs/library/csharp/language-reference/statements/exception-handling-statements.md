---
title: "Exception-handling statements - throw and try, catch, finally (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/statements/exception-handling-statements.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Exception-handling statements - `throw`, `try-catch`, `try-finally`, and `try-catch-finally`

Use the `throw` and `try` statements to work with exceptions. Use the `throw` statement to throw an exception. Use the `try` statement to catch and handle exceptions that might occur during execution of a code block.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## The `throw` statement

The `throw` statement throws an exception:

```csharp
if (shapeAmount <= 0)
{
    throw new ArgumentOutOfRangeException(nameof(shapeAmount), "Amount of shapes must be positive.");
}
```
In a `throw e;` statement, the result of expression `e` must be implicitly convertible to `System.Exception`.

You can use the built-in exception classes, such as `System.ArgumentOutOfRangeException` or `System.InvalidOperationException`. .NET also provides the following helper methods to throw exceptions in certain conditions: `System.ArgumentNullException.ThrowIfNull*` and `System.ArgumentException.ThrowIfNullOrEmpty*`. You can also define your own exception classes that derive from `System.Exception`. For more information, see Creating and throwing exceptions.

Inside a `catch` block, use a `throw;` statement to re-throw the exception that the `catch` block handles:

```csharp
try
{
    ProcessShapes(shapeAmount);
}
catch (Exception e)
{
    LogError(e, "Shape processing failed.");
    throw;
}
```
> **Note:**
> `throw;` preserves the original stack trace of the exception, which is stored in the `System.Exception.StackTrace` property. In contrast, `throw e;` updates the `System.Exception.StackTrace` property of `e`.

When an exception is thrown, the common language runtime (CLR) looks for the `catch` block that can handle this exception. If the currently executed method doesn't contain such a `catch` block, the CLR looks at the method that called the current method, and so on up the call stack. If there's no compatible `catch` block, the CLR terminates the executing thread. For more information, see the How exceptions are handled section of the C# language specification.

### The `throw` expression

You can also use `throw` as an expression. This approach might be convenient in several cases, including:

- the conditional operator. The following example uses a `throw` expression to throw an `System.ArgumentException` when the passed array `args` is empty:

```csharp
string first = args.Length >= 1 
    ? args[0]
    : throw new ArgumentException("Please supply at least one argument.");
```
- the null-coalescing operator. The following example uses a `throw` expression to throw an `System.ArgumentNullException` when the string to assign to a property is `null`:

```csharp
public string Name
{
    get => name;
    set => name = value ??
        throw new ArgumentNullException(paramName: nameof(value), message: "Name cannot be null");
}
```
- an expression-bodied lambda or method. The following example uses a `throw` expression to throw an `System.InvalidCastException` to indicate that a conversion to a `System.DateTime` value isn't supported:

```csharp
DateTime ToDateTime(IFormatProvider provider) =>
         throw new InvalidCastException("Conversion to a DateTime is not supported.");
```
## The `try` statement

You can use the `try` statement in any of the following forms: `try-catch` - to handle exceptions that might occur during execution of the code inside a `try` block, `try-finally` - to specify the code that runs when control leaves the `try` block, and `try-catch-finally` - as a combination of the preceding two forms.

### The `try-catch` statement

Use the `try-catch` statement to handle exceptions that might occur during execution of a code block. Place the code where an exception might occur inside a `try` block. Use a *catch clause* to specify the base type of exceptions you want to handle in the corresponding `catch` block:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (ArgumentException e)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
```
You can provide several catch clauses:

```csharp
try
{
    var result = await ProcessAsync(-3, 4, cancellationToken);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (ArgumentException e)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
catch (OperationCanceledException)
{
    Console.WriteLine("Processing is cancelled.");
}
```
When an exception occurs, the runtime checks catch clauses in the specified order, from top to bottom. At most, only one `catch` block runs for any thrown exception. As the preceding example also shows, you can omit declaration of an exception variable and specify only the exception type in a catch clause. A catch clause without any specified exception type matches any exception and, if present, must be the last catch clause.

To re-throw a caught exception, use the `throw` statement, as the following example shows:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (Exception e)
{
    LogError(e, "Processing failed.");
    throw;
}
```
> **Note:**
> `throw;` preserves the original stack trace of the exception, which is stored in the `System.Exception.StackTrace` property. In contrast, `throw e;` updates the `System.Exception.StackTrace` property of `e`.

#### A `when` exception filter

Along with an exception type, you can also specify an exception filter that further examines an exception and decides if the corresponding `catch` block handles that exception. An exception filter is a Boolean expression that follows the `when` keyword, as the following example shows:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (Exception e) when (e is ArgumentException || e is DivideByZeroException)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
```
The preceding example uses an exception filter to provide a single `catch` block to handle exceptions of two specified types.

You can provide several `catch` clauses for the same exception type if they distinguish by exception filters. One of those clauses might have no exception filter. If such a clause exists, it must be the last of the clauses that specify that exception type.

If a `catch` clause has an exception filter, it can specify the exception type that is the same as or less derived than an exception type of a `catch` clause that appears after it. For example, if an exception filter is present, a `catch (Exception e)` clause doesn't need to be the last clause.

##### Exception filters vs. traditional exception handling

Exception filters provide significant advantages over traditional exception handling approaches. The key <example-value> is **when** the exception handling logic is evaluated:

- **Exception filters (`when`)**: The filter expression is evaluated *before* the stack is unwound. This means the original call stack and all local variables remain intact during filter evaluation.
- **Traditional `catch` blocks**: The catch block runs *after* the stack is unwound, potentially losing valuable debugging information.

Here's a comparison showing the difference:

```csharp
public static void DemonstrateStackUnwindingDifference()
{
    var localVariable = "Important debugging info";
    
    try
    {
        ProcessWithExceptionFilter(localVariable);
    }
    catch (InvalidOperationException ex) when (ex.Message.Contains("filter"))
    {
        // Exception filter: Stack not unwound yet.
        // localVariable is still accessible in debugger.
        // Call stack shows original throwing location.
        Console.WriteLine($"Caught with filter: {ex.Message}");
        Console.WriteLine($"Local variable accessible: {localVariable}");
    }
    
    try
    {
        ProcessWithTraditionalCatch(localVariable);
    }
    catch (InvalidOperationException ex)
    {
        // Traditional catch: Stack already unwound.
        // Some debugging information may be lost.
        if (ex.Message.Contains("traditional"))
        {
            Console.WriteLine($"Caught with if: {ex.Message}");
            Console.WriteLine($"Local variable accessible: {localVariable}");
        }
        else
        {
            throw; // Re-throws and further modifies stack trace.
        }
    }
}

private static void ProcessWithExceptionFilter(string context)
{
    throw new InvalidOperationException($"Exception for filter demo: {context}");
}

private static void ProcessWithTraditionalCatch(string context)
{
    throw new InvalidOperationException($"Exception for traditional demo: {context}");
}
```
