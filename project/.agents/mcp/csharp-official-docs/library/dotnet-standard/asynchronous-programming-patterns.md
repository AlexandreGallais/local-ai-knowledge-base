---
title: "Asynchronous programming patterns"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous programming patterns

.NET provides three patterns for performing asynchronous operations:

- **Task-based Asynchronous Pattern (TAP)**, which uses a single method to represent the initiation and completion of an asynchronous operation. **It's the recommended approach to asynchronous programming in .NET.** The async and await keywords in C# and the Async and Await operators in Visual Basic add language support for TAP. For more information, see Task-based Asynchronous Pattern (TAP).

- **Event-based Asynchronous Pattern (EAP)**, which is the event-based legacy model for providing asynchronous behavior. It requires a method that has the `Async` suffix and one or more events, event handler delegate types, and `EventArg`-derived types. It's no longer recommended for new development. For more information, see Event-based Asynchronous Pattern (EAP).

- **Asynchronous Programming Model (APM)** pattern (also called the `System.IAsyncResult` pattern), which is the legacy model that uses the `System.IAsyncResult` interface to provide asynchronous behavior. In this pattern, asynchronous operations require `Begin` and `End` methods (for example, `BeginWrite` and `EndWrite` to implement an asynchronous write operation). This pattern is no longer recommended for new development. For more information, see Asynchronous Programming Model (APM).

## Comparison of patterns

For a quick comparison of how the three patterns model asynchronous operations, consider a `Read` method that reads a specified amount of data into a provided buffer starting at a specified offset:

```csharp
public class MyClass  
{  
    public int Read(byte [] buffer, int offset, int count);  
}  
```  

The TAP counterpart of this method would expose the following single `ReadAsync` method:

```csharp
public class MyClass  
{  
    public Task<int> ReadAsync(byte [] buffer, int offset, int count);  
}  
```

The EAP counterpart would expose the following set of types and members:

```csharp
public class MyClass  
{  
    public void ReadAsync(byte [] buffer, int offset, int count);  
    public event ReadCompletedEventHandler ReadCompleted;  
}  
```  

The APM counterpart would expose the `BeginRead` and `EndRead` methods:

```csharp
public class MyClass  
{  
    public IAsyncResult BeginRead(  
        byte [] buffer, int offset, int count,
        AsyncCallback callback, object state);  
    public int EndRead(IAsyncResult asyncResult);  
}  
```  

## See also

- C# - Asynchronous programming with async and await
- Visual Basic - Asynchronous Programming with Async and Await
- F# - Asynchronous Programming
