---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 75 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 75 of 102)

```vb
        End Get
    End Property

    Public ReadOnly Property FirstDivisor() As Integer
        Get
            ' Raise an exception if the operation failed 
            ' or was canceled.
            RaiseExceptionIfNecessary()

            ' If the operation was successful, return 
            ' the property value.
            Return firstDivisorValue
        End Get
    End Property

    Public ReadOnly Property IsPrime() As Boolean
        Get
            ' Raise an exception if the operation failed 
            ' or was canceled.
            RaiseExceptionIfNecessary()

            ' If the operation was successful, return 
            ' the property value.
            Return isPrimeValue
        End Get
    End Property
End Class
```

3. Implement `BuildPrimeNumberList`. It takes two parameters: the number to test, and an `System.ComponentModel.AsyncOperation`. It uses the `System.ComponentModel.AsyncOperation` to report progress and incremental results. This assures that the client's event handlers are called on the proper thread or context for the application model. When `BuildPrimeNumberList` finds a prime number, it reports this as an incremental result to the client's event handler for the `ProgressChanged` event. This requires a class derived from `System.ComponentModel.ProgressChangedEventArgs`, called `CalculatePrimeProgressChangedEventArgs`, which has one added property called `LatestPrimeNumber`.

     The `BuildPrimeNumberList` method also periodically calls the `TaskCanceled` method and exits if the method returns `true`.
