---
title: "Overview of methods (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/methods.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview of methods (part 3 of 3)

## Return values

Methods can return a value to the caller. If the return type (the type listed before the method name) isn't `void`, the method can return the value by using the `return` keyword. A statement with the `return` keyword followed by a variable, constant, or expression that matches the return type returns that value to the method caller. Methods with a nonvoid return type are required to use the `return` keyword to return a value. The `return` keyword also stops the execution of the method.

If the return type is `void`, a `return` statement without a value is still useful to stop the execution of the method. Without the `return` keyword, the method stops executing when it reaches the end of the code block.

For example, these two methods use the `return` keyword to return integers:

```csharp
class SimpleMathExtension
{
    public int DivideTwoNumbers(int number1, int number2)
    {
        return number1 / number2;
    }
}

class SimpleMath
{
    public int AddTwoNumbers(int number1, int number2) =>
        number1 + number2;

    public int SquareANumber(int number) =>
        number * number;
}

static class TestSimpleMathExtension
{
    static void Main()
    {
        var obj = new SimpleMathExtension();
        
        int result = obj.DivideTwoNumbers(6,2);
        // The result is 3.
        Console.WriteLine(result);
    }
}

static class TestSimpleMath
{
    static void Main()
    {
        var obj = new SimpleMath();

        int result = obj.AddTwoNumbers(1, 2);
        result = obj.SquareANumber(result);
        // The result is 9.
        Console.WriteLine(result);

        result = obj.SquareANumber(obj.AddTwoNumbers(1, 2));
        // The result is 9.
        Console.WriteLine(result);
    }
}
```
The preceding examples are expression bodied members. Expression bodied members return the value returned by the expression.

You can also choose to define your methods with a statement body and a `return` statement:

```csharp
class SimpleMathExtension
{
    public int DivideTwoNumbers(int number1, int number2)
    {
        return number1 / number2;
    }
}

class SimpleMath
{
    public int AddTwoNumbers(int number1, int number2) =>
        number1 + number2;

    public int SquareANumber(int number) =>
        number * number;
}

static class TestSimpleMathExtension
{
    static void Main()
    {
        var obj = new SimpleMathExtension();
        
        int result = obj.DivideTwoNumbers(6,2);
        // The result is 3.
        Console.WriteLine(result);
    }
}

static class TestSimpleMath
{
    static void Main()
    {
        var obj = new SimpleMath();

        int result = obj.AddTwoNumbers(1, 2);
        result = obj.SquareANumber(result);
        // The result is 9.
        Console.WriteLine(result);

        result = obj.SquareANumber(obj.AddTwoNumbers(1, 2));
        // The result is 9.
        Console.WriteLine(result);
    }
}
```
To use a value returned from a method, you can assign the return value to a variable:

```csharp
class SimpleMathExtension
{
    public int DivideTwoNumbers(int number1, int number2)
    {
        return number1 / number2;
    }
}

class SimpleMath
{
    public int AddTwoNumbers(int number1, int number2) =>
        number1 + number2;

    public int SquareANumber(int number) =>
        number * number;
}

static class TestSimpleMathExtension
{
    static void Main()
    {
        var obj = new SimpleMathExtension();
        
        int result = obj.DivideTwoNumbers(6,2);
        // The result is 3.
        Console.WriteLine(result);
    }
}

static class TestSimpleMath
{
    static void Main()
    {
        var obj = new SimpleMath();

        int result = obj.AddTwoNumbers(1, 2);
        result = obj.SquareANumber(result);
        // The result is 9.
        Console.WriteLine(result);

        result = obj.SquareANumber(obj.AddTwoNumbers(1, 2));
        // The result is 9.
        Console.WriteLine(result);
    }
}
```
The calling method can also use the method call itself anywhere a value of the same type would be sufficient. For example, the following two code examples accomplish the same goal:

```csharp
class SimpleMathExtension
{
    public int DivideTwoNumbers(int number1, int number2)
    {
        return number1 / number2;
    }
}

class SimpleMath
{
    public int AddTwoNumbers(int number1, int number2) =>
        number1 + number2;

    public int SquareANumber(int number) =>
        number * number;
}

static class TestSimpleMathExtension
{
    static void Main()
    {
        var obj = new SimpleMathExtension();
        
        int result = obj.DivideTwoNumbers(6,2);
        // The result is 3.
        Console.WriteLine(result);
    }
}

static class TestSimpleMath
{
    static void Main()
    {
        var obj = new SimpleMath();

        int result = obj.AddTwoNumbers(1, 2);
        result = obj.SquareANumber(result);
        // The result is 9.
        Console.WriteLine(result);

        result = obj.SquareANumber(obj.AddTwoNumbers(1, 2));
        // The result is 9.
        Console.WriteLine(result);
    }
}
```
```csharp
class SimpleMathExtension
{
    public int DivideTwoNumbers(int number1, int number2)
    {
        return number1 / number2;
    }
}

class SimpleMath
{
    public int AddTwoNumbers(int number1, int number2) =>
        number1 + number2;

    public int SquareANumber(int number) =>
        number * number;
}

static class TestSimpleMathExtension
{
    static void Main()
    {
        var obj = new SimpleMathExtension();
        
        int result = obj.DivideTwoNumbers(6,2);
        // The result is 3.
        Console.WriteLine(result);
    }
}

static class TestSimpleMath
{
    static void Main()
    {
        var obj = new SimpleMath();

        int result = obj.AddTwoNumbers(1, 2);
        result = obj.SquareANumber(result);
        // The result is 9.
        Console.WriteLine(result);

        result = obj.SquareANumber(obj.AddTwoNumbers(1, 2));
        // The result is 9.
        Console.WriteLine(result);
    }
}
```
Sometimes, you want your method to return more than a single value. You use *tuple types* and *tuple literals* to return multiple values. The tuple type defines the data types of the tuple's elements. Tuple literals provide the actual values of the returned tuple. In the following example, `(string, string, string, int)` defines the tuple type returned by the `GetPersonalInfo` method. The expression `(per.FirstName, per.MiddleName, per.LastName, per.Age)` is the tuple literal; the method returns the first, middle, and family name, along with the age, of a `PersonInfo` object.

```csharp
public (string, string, string, int) GetPersonalInfo(string id)
{
    PersonInfo per = PersonInfo.RetrieveInfoById(id);
    return (per.FirstName, per.MiddleName, per.LastName, per.Age);
}
```

The caller can then consume the returned tuple using the following code:

```csharp
var person = GetPersonalInfo("111111111");
Console.WriteLine($"{person.Item1} {person.Item3}: age = {person.Item4}");
```

Names can also be assigned to the tuple elements in the tuple type definition. The following example shows an alternate version of the `GetPersonalInfo` method that uses named elements:

```csharp
public (string FName, string MName, string LName, int Age) GetPersonalInfo(string id)
{
    PersonInfo per = PersonInfo.RetrieveInfoById(id);
    return (per.FirstName, per.MiddleName, per.LastName, per.Age);
}
```

The previous call to the `GetPersonalInfo` method can then be modified as follows:

```csharp
var person = GetPersonalInfo("111111111");
Console.WriteLine($"{person.FName} {person.LName}: age = {person.Age}");
```

If a method takes an array as a parameter and modifies the value of individual elements, it isn't necessary for the method to return the array. C# passes all reference types by value, and the value of an array reference is the pointer to the array. In the following example, changes to the contents of the `values` array that are made in the `DoubleValues` method are observable by any code that has a reference to the array.

```csharp

public static class ArrayValueExample
{
    static void Main()
    {
        int[] values = [2, 4, 6, 8];
        DoubleValues(values);
        foreach (var value in values)
        {
            Console.Write("{0}  ", value);
        }
    }

    public static void DoubleValues(int[] arr)
    {
        for (var ctr = 0; ctr <= arr.GetUpperBound(0); ctr++)
        {
            arr[ctr] *= 2;
        }
    }
}
// The example displays the following output:
//       4  8  12  16
```
## Extension members

Ordinarily, there are two ways to add a method to an existing type:

- Modify the source code for that type. Modifying the source creates a breaking change if you also add any private data fields to support the method.
- Define the new method in a derived class. A method can't be added in this way using inheritance for other types, such as structures and enumerations. Nor can it be used to "add" a method to a sealed class.

Extension members let you "add" members to an existing type without modifying the type itself or implementing the new method in an inherited type. The extension member also doesn't have to reside in the same assembly as the type it extends. You call an extension method as if it were a defined member of a type.

For more information, see Extension members.

## Async Methods

By using the async feature, you can invoke asynchronous methods without using explicit callbacks or manually splitting your code across multiple methods or lambda expressions.

If you mark a method with the async modifier, you can use the await operator in the method. When control reaches an `await` expression in the async method, control returns to the caller if the awaited task isn't completed, and progress in the method with the `await` keyword is suspended until the awaited task completes. When the task is complete, execution can resume in the method.

> **Note:**
> An async method returns to the caller when either it encounters the first awaited object that's not yet complete or it gets to the end of the async method, whichever occurs first.

An async method typically has a return type of `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.Task`, `System.Collections.Generic.IAsyncEnumerable`1`, or `void`. The `void` return type is used primarily to define event handlers, where a `void` return type is required. An async method that returns `void` can't be awaited, and the caller of a void-returning method can't catch exceptions that the method throws. An async method can have any task-like return type.

In the following example, `DelayAsync` is an async method that has a return statement that returns an integer. Because it's an async method, its method declaration must have a return type of `Task<int>`. Because the return type is `Task<int>`, the evaluation of the `await` expression in `DoSomethingAsync` produces an integer, as the following `int result = await delayTask` statement demonstrates.

```csharp
﻿class Program
{
    static Task Main() => DoSomethingAsync();

    static async Task DoSomethingAsync()
    {
        Task<int> delayTask = DelayAsync();
        int result = await delayTask;

        // The previous two statements may be combined into
        // the following statement.
        //int result = await DelayAsync();

        Console.WriteLine($"Result: {result}");
    }

    static async Task<int> DelayAsync()
    {
        await Task.Delay(100);
        return 5;
    }
}
// Example output:
//   Result: 5
```
An async method can't declare any in, ref, or out parameters, but it can call methods that have such parameters.

 For more information about async methods, see Asynchronous programming with async and await and Async return types.

## Expression-bodied members

It's common to have method definitions that return immediately with the result of an expression, or that have a single statement as the body of the method. There's a syntax shortcut for defining such methods using `=>`:

```csharp
public Point Move(int dx, int dy) => new Point(x + dx, y + dy);
public void Print() => Console.WriteLine(First + " " + Last);
// Works with operators, properties, and indexers too.
public static Complex operator +(Complex a, Complex b) => a.Add(b);
public string Name => First + " " + Last;
public Customer this[long id] => store.LookupCustomer(id);
```

If the method returns `void` or is an async method, the body of the method must be a statement expression (same as with lambdas). For properties and indexers, they must be read-only, and you don't use the `get` accessor keyword.

## Iterators

An iterator performs a custom iteration over a collection, such as a list or an array. An iterator uses the yield return statement to return each element one at a time. When a `yield return` statement is reached, the current location is remembered so that the caller can request the next element in the sequence.

The return type of an iterator can be `System.Collections.IEnumerable`, `System.Collections.Generic.IEnumerable`1`, `System.Collections.Generic.IAsyncEnumerable`1`, `System.Collections.IEnumerator`, or `System.Collections.Generic.IEnumerator`1`.

For more information, see Iterators.

## See also

- Access Modifiers
- Static Classes and Static Class Members
- Inheritance
- Abstract and Sealed Classes and Class Members
- params
- out
- ref
- in
- Passing Parameters
