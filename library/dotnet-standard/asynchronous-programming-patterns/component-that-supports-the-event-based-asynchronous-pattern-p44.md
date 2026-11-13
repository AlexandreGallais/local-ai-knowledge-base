---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 44 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 44 of 102)

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

4. Create a collection for managing lifetimes of pending asynchronous operations. The client needs a way to track operations as they are executed and completed, and this tracking is done by requiring the client to pass a unique token, or task ID, when the client makes the call to the asynchronous method. The `PrimeNumberCalculator` component must keep track of each call by associating the task ID with its corresponding invocation. If the client passes a task ID that is not unique, the `PrimeNumberCalculator` component must raise an exception.

     The `PrimeNumberCalculator` component keeps track of task ID by using a special collection class called a `System.Collections.Specialized.HybridDictionary`. In the class definition, create a `System.Collections.Specialized.HybridDictionary` called `userStateToLifetime`.
