---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 18 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 18 of 102)

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

4. After the `PrimeNumberCalculator` class definition, derive the `CalculatePrimeCompletedEventArgs` class for reporting the outcome of each calculation to the client's event handler for the `CalculatePrimeCompleted`.event. In addition to the `AsyncCompletedEventArgs` properties, this class enables the client to determine what number was tested, whether it is prime, and what the first divisor is if it is not prime.
