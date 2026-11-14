---
title: "MulticastDelegate class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MulticastDelegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MulticastDelegate class

Namespace: `System`

```csharp
public abstract class MulticastDelegate : Delegate
```

Represents a multicast delegate; that is, a delegate that can have more than one element in its invocation list.

#### Remarks
`MulticastDelegate` is a special class. Compilers and other tools can derive from this class, but you cannot derive from it explicitly. The same is true of the `Delegate` class.

In addition to the methods that delegate types inherit from `MulticastDelegate`, the common language runtime provides two special methods: `BeginInvoke` and `EndInvoke`. For more information about these methods, see Calling Synchronous Methods Asynchronously.

A `MulticastDelegate` has a linked list of delegates, called an invocation list, consisting of one or more elements. When a multicast delegate is invoked, the delegates in the invocation list are called synchronously in the order in which they appear. If an error occurs during execution of the list then an exception is thrown.

#### Examples
The following example defines a class, `StringContainer`, which includes a collection of strings. One of its members is the `CheckAndDisplayDelegate` delegate, which is used to display strings stored in a `StringContainer` object that satisfy particular criteria. The delegate takes a single string as a parameter and returns `void` (or, in Visual Basic, it's a `Sub` procedure). It also includes a method, `DisplayAllQualified`, that has a single parameter, a `CheckAndDisplayDelegate` delegate. This allows the method to be called and to display a set of strings that are filtered based on the methods that the delegate contains.

The example also defines a utility class, `StringExtensions`, that has two methods:

-   `ConStart`, which displays strings that begin with a consonant.

-   `VowelStart`, which displays strings that begin with a vowel.

Note that both methods include a single string parameter and return `void`. In other words, both methods can be assigned to the  `CheckAndDisplayDelegate` delegate.

The `Test.Main` method is the application entry point. It instantiates a `StringContainer` object, populates it with strings, and creates two `CheckAndDisplayDelegate` delegates, `conStart` and `vowelStart`, that invoke a single method. It then calls the `Delegate.Combine` method to create the `multipleDelegates` delegate, which initially contains the `ConStart` and  `VowelStart` delegates. Note that when the `multipleDelegates` delegate is invoked, it displays all the strings in the collection in their original order. This is because each letter is passed separately to each delegate, and each letter meets the filtering criteria of only one of the two delegates. Finally, after calls to `Delegate.Remove` and `Delegate.Combine`, `multipleDelegates` contains two `conStart` delegates. When it is invoked, each string in the `StringContainer` object is displayed twice.

_Code sample not included: ~/snippets/csharp/System/MulticastDelegate/Overview/delegatestring.cs._

## MulticastDelegate.MulticastDelegate(Object, String) constructor

```csharp
protected MulticastDelegate (object target, string method);
```

Initializes a new instance of the `MulticastDelegate` class.

Parameters:

- `target`: The object on which `method` is defined.
- `method`: The name of the method for which a delegate is created.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
This constructor cannot be used in application code. To create a delegate by specifying the name of an instance method, use an overload of the `Delegate.CreateDelegate` method that specifies a method name and a target object. For example, the `CreateDelegate` method overload creates a delegate for an instance method with a specified name.

## MulticastDelegate.MulticastDelegate(Type, String) constructor

```csharp
protected MulticastDelegate (Type target, string method);
```

Initializes a new instance of the `MulticastDelegate` class.

Parameters:

- `target`: The type of object on which `method` is defined.
- `method`: The name of the static method for which a delegate is created.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
This constructor cannot be used in application code. To create a delegate by specifying the name of a static method, use an overload of the `Delegate.CreateDelegate` method that specifies a method name but does not specify a target object. For example, the `CreateDelegate` method overload creates a static delegate for a method with a specified name.

## MulticastDelegate.CombineImpl(Delegate) method

```csharp
protected override sealed Delegate CombineImpl (Delegate? follow);
```

Combines this `Delegate` with the specified `Delegate` to form a new delegate.

Parameters:

- `follow`: The delegate to combine with this delegate.

Returns: A delegate that is the new root of the `MulticastDelegate` invocation list.

Exceptions:

- `ArgumentException`: `follow` does not have the same type as this instance.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

To be added.

## MulticastDelegate.Equals(Object) method

```csharp
public override sealed bool Equals (object? obj);
```

Determines whether this multicast delegate and the specified object are equal.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if `obj` and this instance have the same invocation lists; otherwise, `false`.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
Two delegates are equal if they are not `null` and are of exactly the same type, their invocation lists contain the same number of elements, and every element in the invocation list of the first delegate is equal to the corresponding element in the invocation list of the second delegate.

Two invocation list elements are equal if they invoke the same instance method on the same target instance, or they invoke the same static method.

## MulticastDelegate.GetHashCode() method

```csharp
public override sealed int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

To be added.

## MulticastDelegate.GetInvocationList() method

```csharp
public override sealed Delegate[] GetInvocationList ();
```

Returns the invocation list of this multicast delegate, in invocation order.

Returns: An array of delegates whose invocation lists collectively match the invocation list of this instance.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
The array contains a set of delegates, each with an invocation list of one entry. Invoking these delegates sequentially, in the order they appear in the array, produces the same results as invoking the current instance.

## MulticastDelegate.GetMethodImpl() method

```csharp
protected override System.Reflection.MethodInfo GetMethodImpl ();
```

Returns a method represented by the current `MulticastDelegate`.

Returns: A method represented by the current `MulticastDelegate`.

#### Remarks
If the `MulticastDelegate` represents multiple methods, only one method is returned.

## MulticastDelegate.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with all the data needed to serialize this instance.

Parameters:

- `info`: An object that holds all the data needed to serialize or deserialize this instance.
- `context`: (Reserved) The location where serialized data is stored and retrieved.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `SerializationException`: A serialization error occurred.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

To be added.

## MulticastDelegate.op_Equality(MulticastDelegate, MulticastDelegate) method

```csharp
public static bool operator == (MulticastDelegate? d1, MulticastDelegate? d2);
```

Determines whether two `MulticastDelegate` objects are equal.

Parameters:

- `d1`: The left operand.
- `d2`: The right operand.

Returns: `true` if `d1` and `d2` have the same invocation lists; otherwise, `false`.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
Two delegates are equal if they are not `null` and are of exactly the same type, their invocation lists contain the same number of elements, and every element in the invocation list of the first delegate is equal to the corresponding element in the invocation list of the second delegate.

Two invocation list elements are equal if they invoke the same instance method on the same target instance, or they invoke the same static method.

The equivalent method for this operator is `Equals`

## MulticastDelegate.op_Inequality(MulticastDelegate, MulticastDelegate) method

```csharp
public static bool operator != (MulticastDelegate? d1, MulticastDelegate? d2);
```

Determines whether two `MulticastDelegate` objects are not equal.

Parameters:

- `d1`: The left operand.
- `d2`: The right operand.

Returns: `true` if `d1` and `d2` do not have the same invocation lists; otherwise, `false`.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

#### Remarks
Two delegates are equal if they are not `null` and are of exactly the same type, their invocation lists contain the same number of elements, and every element in the invocation list of the first delegate is equal to the corresponding element in the invocation list of the second delegate.

Two invocation list elements are equal if they invoke the same instance method on the same target instance, or they invoke the same static method.

The equivalent method for this operator is `Equals`

## MulticastDelegate.RemoveImpl(Delegate) method

```csharp
protected override sealed Delegate? RemoveImpl (Delegate value);
```

Removes an element from the invocation list of this `MulticastDelegate` that is equal to the specified delegate.

Parameters:

- `value`: The delegate to search for in the invocation list.

Returns: If `value` is found in the invocation list for this instance, then a new `Delegate` without `value` in its invocation list; otherwise, this instance with its original invocation list.

Exceptions:

- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.

To be added.
