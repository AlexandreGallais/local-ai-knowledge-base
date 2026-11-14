---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 8 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 8 of 102)

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

2. Before the `PrimeNumberCalculator` class definition, declare delegates for progress and completion events.
