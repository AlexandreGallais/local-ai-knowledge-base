---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 102 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 102 of 102)

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

## Checkpoint 4

 At this point, you can build the component.

### To test your component

- Compile the component.

 The `PrimeNumberCalculator` component is now complete and ready to use.

 For an example client that uses the `PrimeNumberCalculator` component, see How to: Implement a Client of the Event-based Asynchronous Pattern.

## Next Steps

 You can fill out this example by writing `CalculatePrime`, the synchronous equivalent of `CalculatePrimeAsync` method. This will make the `PrimeNumberCalculator` component fully compliant with the Event-based Asynchronous Pattern.

 You can improve this example by retaining the list of all the prime numbers discovered by various invocations for different test numbers. Using this approach, each task will benefit from the work done by previous tasks. Be careful to protect this list with `lock` regions, so access to the list by different threads is serialized.

 You can also improve this example by testing for trivial divisors, like 2, 3, and 5.

## See also

- How to: Run an Operation in the Background
- Event-based Asynchronous Pattern Overview
- Event-based Asynchronous Pattern (EAP)
