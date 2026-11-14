---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 34 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 34 of 102)

```vb
    Private isPrimeValue As Boolean

    Public Sub New( _
    ByVal numberToTest As Integer, _
    ByVal firstDivisor As Integer, _
    ByVal isPrime As Boolean, _
    ByVal e As Exception, _
    ByVal canceled As Boolean, _
    ByVal state As Object)

        MyBase.New(e, canceled, state)
        Me.numberToTestValue = numberToTest
        Me.firstDivisorValue = firstDivisor
        Me.isPrimeValue = isPrime

    End Sub

    Public ReadOnly Property NumberToTest() As Integer
        Get
            ' Raise an exception if the operation failed 
            ' or was canceled.
            RaiseExceptionIfNecessary()

            ' If the operation was successful, return 
            ' the property value.
            Return numberToTestValue
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

2. Call the `InitializeDelegates` method in your component's constructor.
