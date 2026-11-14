---
title: "How to: Use Specific Exceptions in a Catch Block"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/how-to-use-specific-exceptions-in-a-catch-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use specific exceptions in a catch block

In general, it's good programming practice to catch a specific type of exception rather than use a basic `catch` statement.

When an exception occurs, it is passed up the stack and each catch block is given the opportunity to handle it. The order of catch statements is important. Put catch blocks targeted to specific exceptions before a general exception catch block or the compiler might issue an error. The proper catch block is determined by matching the type of the exception to the name of the exception specified in the catch block. If there is no specific catch block, the exception is caught by a general catch block, if one exists.

The following code example uses a `try`/`catch` block to catch an `System.InvalidCastException`. The sample creates a class called `Employee` with a single property, employee level (`Emlevel`). A method, `PromoteEmployee`, takes an object and increments the employee level. An `System.InvalidCastException` occurs when a `System.DateTime` instance is passed to the `PromoteEmployee` method.

```csharp
using System;

public class Employee
{
    //Create employee level property.
    public int Emlevel
    {
        get
        {
            return(emlevel);
        }
        set
        {
            emlevel = value;
        }
    }

    private int emlevel = 0;
}

public class Ex13
{
    public static void PromoteEmployee(Object emp)
    {
        // Cast object to Employee.
        var e = (Employee) emp;
        // Increment employee level.
        e.Emlevel = e.Emlevel + 1;
    }

    static void Main()
    {
        try
        {
            Object o = new Employee();
            DateTime newYears = new DateTime(2001, 1, 1);
            // Promote the new employee.
            PromoteEmployee(o);
            // Promote DateTime; results in InvalidCastException as newYears is not an employee instance.
            PromoteEmployee(newYears);
        }
        catch (InvalidCastException e)
        {
            Console.WriteLine("Error passing data to PromoteEmployee method. " + e.Message);
        }
    }
}
```
```vb
Public Class Employee
    'Create employee level property.
    Public Property Emlevel As Integer
        Get
            Return emlevelValue
        End Get
        Set
            emlevelValue = Value
        End Set
    End Property

    Private emlevelValue As Integer = 0
End Class

Public Class Ex13
    Public Shared Sub PromoteEmployee(emp As Object)
        ' Cast object to Employee.
        Dim e As Employee = CType(emp, Employee)
        ' Increment employee level.
        e.Emlevel = e.Emlevel + 1
    End Sub

    Public Shared Sub Main()
        Try
            Dim o As Object = New Employee()
            Dim newYears As New DateTime(2001, 1, 1)
            ' Promote the new employee.
            PromoteEmployee(o)
            ' Promote DateTime; results in InvalidCastException as newYears is not an employee instance.
            PromoteEmployee(newYears)
        Catch e As InvalidCastException
            Console.WriteLine("Error passing data to PromoteEmployee method. " + e.Message)
        End Try
    End Sub
End Class
```
## See also

- Exceptions
