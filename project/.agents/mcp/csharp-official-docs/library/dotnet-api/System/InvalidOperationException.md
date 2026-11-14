---
title: "InvalidOperationException class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InvalidOperationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidOperationException class

Namespace: `System`

```csharp
public class InvalidOperationException : SystemException
```

The exception that is thrown when a method call is invalid for the object's current state.

`InvalidOperationException` is used in cases when the failure to invoke a method is caused by reasons other than invalid arguments. Typically, it's thrown when the state of an object cannot support the method call. For example, an `InvalidOperationException` exception is thrown by methods such as:

- `IEnumerator.MoveNext` if objects of a collection are modified after the enumerator is created. For more information, see Changing a collection while iterating it.
- `ResourceSet.GetString` if the resource set is closed before the method call is made.
- `XContainer.Add`, if the object or objects to be added would result in an incorrectly structured XML document.
- A method that attempts to manipulate the UI from a thread that is not the main or UI thread.

> **Important:**
> Because the `InvalidOperationException` exception can be thrown in a wide variety of circumstances, it is important to read the exception message returned by the `Message` property.

`InvalidOperationException` uses the HRESULT `COR_E_INVALIDOPERATION`, which has the value 0x80131509.

For a list of initial property values for an instance of `InvalidOperationException`, see the `InvalidOperationException.%23ctor` constructors.

#### Common causes of InvalidOperationException exceptions

The following sections show how some common cases in which in `InvalidOperationException` exception is thrown in an app. How you handle the issue depends on the specific situation. Most commonly, however, the exception results from developer error, and the `InvalidOperationException` exception can be anticipated and avoided.

#### Updating a UI thread from a non-UI thread

Often, worker threads are used to perform some background work that involves gathering data to be displayed in an application's user interface. However. most GUI (graphical user interface) application frameworks for .NET, such as Windows Forms and Windows Presentation Foundation (WPF), let you access GUI objects only from the thread that creates and manages the UI (the Main or UI thread). An `InvalidOperationException` is thrown when you try to access a UI element from a thread other than the UI thread. The text of the exception message is shown in the following table.

|Application Type|Message|
|----------------------|-------------|
|WPF app|**The calling thread cannot access this object because a different thread owns it.**|
|UWP app|**The application called an interface that was marshaled for a different thread.**|
|Windows Forms app|**Cross-thread operation not valid: Control 'TextBox1' accessed from a thread other than the thread it was created on.**|

UI frameworks for .NET implement a *dispatcher* pattern that includes a method to check whether a call to a member of a UI element is being executed on the UI thread, and other methods to schedule the call on the UI thread:

- In WPF apps, call the `Dispatcher.CheckAccess` method to determine if a method is running on a non-UI thread. It returns `true` if the method is running on the UI thread and `false` otherwise. Call one of the overloads of the `Dispatcher.Invoke` method to schedule the call on the UI thread.
- In UWP apps, check the `HasThreadAccess` property to determine if a method is running on a non-UI thread. Call the `CoreDispatcher.RunAsync` method to execute a delegate that updates the UI thread.
- In Windows Forms apps, use the `InvokeRequired` property to determine if a method is running on a non-UI thread. Call one of the overloads of the `Control.Invoke` method to execute a delegate that updates the UI thread.

The following examples illustrate the `InvalidOperationException` exception that is thrown when you attempt to update a UI element from a thread other than the thread that created it. Each example requires that you create two controls:

- A text box control named `textBox1`. In a Windows Forms app, you should set its `Multiline` property to `true`.
- A button control named `threadExampleBtn`. The example provides a handler, `ThreadsExampleBtn_Click`, for the button's `Click` event.

In each case, the `threadExampleBtn_Click` event handler calls the `DoSomeWork` method twice. The first call runs synchronously and succeeds. But the second call, because it runs asynchronously on a thread pool thread, attempts to update the UI from a non-UI thread. This results in a `InvalidOperationException` exception.

#### WPF apps

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/WPF1/MainWindow.xaml.cs._
The following version of the `DoSomeWork` method eliminates the exception in a WPF app.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/WPF2/MainWindowDispatcher.xaml.cs._
#### Windows Forms apps

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/WinForms/Form1.cs._

The following version of the `DoSomeWork` method eliminates the exception in a Windows Forms app.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/WinForms/Form11.cs._

#### Changing a collection while iterating it

The `foreach` statement in C#, `for...in` in F#, or `For Each` statement in Visual Basic is used to iterate the members of a collection and to read or modify its individual elements. However, it can't be used to add or remove items from the collection. Doing this throws an  `InvalidOperationException` exception with a message that is similar to, "**Collection was modified; enumeration operation may not execute.**"

The following example iterates a collection of integers attempts to add the square of each integer to the collection. The example throws an `InvalidOperationException` with the first call to the `List<T>.Add` method.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Iterating1.cs._

You can eliminate the exception in one of two ways, depending on your application logic:

- If elements must be added to the collection while iterating it, you can iterate it by index using the `for` (`for..to` in F#) statement instead of `foreach`, `for...in`, or `For Each`. The following example uses the for statement to add the square of numbers in the collection to the collection.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Iterating2.cs._

Note that you must establish the number of iterations before iterating the collection either by using a counter inside the loop that will exit the loop appropriately, by iterating backward, from `Count` - 1 to 0, or, as the example does, by assigning the number of elements in the array to a variable and using it to establish the upper bound of the loop. Otherwise, if an element is added to the collection on every iteration, an endless loop results.

- If it is not necessary to add elements to the collection while iterating it, you can store the elements to be added in a temporary collection that you add when iterating the collection has finished. The following example uses this approach to add the square of numbers in a collection to a temporary collection, and then to combine the collections into a single array object.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Iterating3.cs._

#### Sorting an array or collection whose objects cannot be compared

General-purpose sorting methods, such as the `Sort` method or the `Sort` method, usually require that at least one of the objects to be sorted implement the `IComparable<T>` or the `IComparable` interface. If not, the collection or array cannot be sorted, and the method throws an  `InvalidOperationException` exception. The following example defines a `Person` class, stores two `Person` objects in a generic `List<T>` object, and attempts to sort them. As the output from the example shows, the call to the `Sort` method throws an `InvalidOperationException`.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/List_Sort1.cs._

You can eliminate the exception in any of three ways:

- If you can own the type that you are trying to sort (that is, if you control its source code), you can modify it to implement the `IComparable<T>` or the `IComparable` interface. This requires that you implement either the `IComparable<T>.CompareTo` or the `IComparable.CompareTo` method. Adding an interface implementation to an existing type is not a breaking change.

The following example uses this approach to provide an `IComparable<T>` implementation for the `Person` class. You can still call the collection or array's general sorting method and, as the output from the example shows, the collection sorts successfully.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/List_Sort2.cs._

- If you cannot modify the source code for the type you are trying to sort, you can define a special-purpose sorting class that implements the `IComparer<T>` interface. You can call an overload of the `Sort` method that includes an  `IComparer<T>` parameter. This approach is especially useful if you want to develop a specialized sorting class that can sort objects based on multiple criteria.

The following example uses the approach by developing a custom `PersonComparer` class that is used to sort `Person` collections. It then passes an instance of this class to the `Sort` method.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/List_Sort3.cs._

- If you cannot modify the source code for the type you are trying to sort, you can create a  `Comparison<T>` delegate to perform the sorting. The delegate signature is

```vb
    Function Comparison(Of T)(x As T, y As T) As Integer
```

```csharp
    int Comparison<T>(T x, T y)
```

The following example uses the approach by defining a  `PersonComparison` method that matches the  `Comparison<T>` delegate signature. It then passes this delegate to the `Sort` method.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/List_Sort4.cs._

#### Casting a Nullable\<T> that's null to its underlying type

Attempting to cast a `Nullable<T>` value that is `null` to its underlying type throws an `InvalidOperationException` exception and displays the error message, "**Nullable object must have a value.**

The following example throws an `InvalidOperationException` exception when it attempts to iterate an array that includes a `Nullable(Of Integer)` value.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Nullable1.cs._

To prevent the exception:

- Use the `HasValue` property to select only those elements that are not `null`.
- Call one of the `Nullable<T>.GetValueOrDefault` overloads to provide a default value for a `null` value.

The following example does both to avoid the  `InvalidOperationException` exception.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Nullable2.cs._

#### Call a System.Linq.Enumerable method on an empty collection

The `Enumerable.Aggregate`, `Enumerable.Average`, `Enumerable.First`, `Enumerable.Last`, `Enumerable.Max`, `Enumerable.Min`,  `Enumerable.Single`, and `Enumerable.SingleOrDefault` methods perform operations on a sequence and return a single result. Some overloads of these methods throw an `InvalidOperationException` exception when the sequence is empty, while other overloads return `null`. The `Enumerable.SingleOrDefault` method also throws an `InvalidOperationException` exception when the sequence contains more than one element.

> **Note:**
> Most of the methods that throw an `InvalidOperationException` exception are overloads. Be sure that you understand the behavior of the overload that you choose.

The following table lists the exception messages from the `InvalidOperationException` exception objects thrown by calls to some `Enumerable` methods.

|Method|Message|
|------------|-------------|
|`Aggregate` `Average` `Last` `Max` `Min`|**Sequence contains no elements**|
|`First`|**Sequence contains no matching element**|
|`Single` `SingleOrDefault`|**Sequence contains more than one matching element**|

How you eliminate or handle the exception depends on your application's assumptions and on the particular method you call.

- When you deliberately call one of these methods without checking for an empty sequence, you are assuming that the sequence is not empty, and that an empty sequence is an unexpected occurrence. In this case, catching or rethrowing the exception is appropriate.

- If your failure to check for an empty sequence was inadvertent, you can call one of the overloads of the `Enumerable.Any` overload to determine whether a sequence contains any elements.

> **Tip:**
> Calling the `Any<T>` method before generating a sequence can improve performance if the data to be processed might contain a large number of elements or if operation that generates the sequence is expensive.

- If you've called a method such as `Enumerable.First`, `Enumerable.Last`, or `Enumerable.Single`, you can substitute an alternate method, such as `Enumerable.FirstOrDefault`, `Enumerable.LastOrDefault`, or  `Enumerable.SingleOrDefault`, that returns a default value instead of a member of the sequence.

The examples provide additional detail.

The following example uses the `Enumerable.Average` method to compute the average of a sequence whose values are greater than 4. Since no values from the original array exceed 4, no values are included in the sequence, and the method throws an `InvalidOperationException` exception.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable1.cs._

The exception can be eliminated by calling the `Enumerable.Any` method to determine whether the sequence contains any elements before calling the method that processes the sequence, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable2.cs._

The `Enumerable.First` method returns the first item in a sequence or the first element in a sequence that satisfies a specified condition. If the sequence is empty and therefore does not have a first element, it throws an `InvalidOperationException` exception.

In the following example, the `First<T>` method throws an `InvalidOperationException` exception because the dbQueryResults array doesn't contain an element greater than 4.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable3.cs._
