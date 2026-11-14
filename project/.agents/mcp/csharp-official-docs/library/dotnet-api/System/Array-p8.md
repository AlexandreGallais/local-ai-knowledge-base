---
title: "Array class (part 8 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 8 of 18)

## Array.Empty<T>() method

```csharp
public static T[] Empty<T> ();
```

Returns an empty array.

Parameters:

- `T`: The type of the elements of the array.

Returns: An empty array.

To be added.

## Array.Exists<T>(T[], Predicate<T>) method

```csharp
public static bool Exists<T> (T[] array, Predicate<T> match);
```

Determines whether the specified array contains elements that match the conditions defined by the specified predicate.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `match`: The `Predicate<T>` that defines the conditions of the elements to search for.

Returns: `true` if `array` contains one or more elements that match the conditions defined by the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`, and processing is stopped when a match is found.

> **Note:**
> In C# and Visual Basic, it is not necessary to create the `Predicate<T>` delegate explicitly. These languages infer the correct delegate from context and create it automatically. In F#, functions and lambda expressions are implicitly converted.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following example specifies the match conditions for the `Array.Exists` method using lambda expressions to check whether a planet starts with a given letter or whether the planet is found on the given array.

_Code sample not included: ~/snippets/csharp/System/Array/ExistsT/exists3.cs._

The following example uses the `Array.Exists` method to indicate whether any names in a string array begin with a specified character. The example instantiates a `StringSearcher` object by passing the string to search for to its class constructor. The `StringSearcher.StartsWith` method has same signature as the `Predicate<T>` delegate. When the `Array.Exists` method is called, each member of the array is passed to the delegate until it returns `true` or iterates all the elements in the array.

_Code sample not included: ~/snippets/csharp/System/Array/ExistsT/exists1.cs._

You can also use a lambda expression rather than explicitly define a method whose signature corresponds to that of the delegate. The following example replaces the `StringSearcher` class and its `StartsWith` method with a lambda expression.

_Code sample not included: ~/snippets/csharp/System/Array/ExistsT/exists2.cs._

## Array.Fill<T>(T[], T) method

```csharp
public static void Fill<T> (T[] array, T value);
```

Assigns the given `value` of type `T` to each element of the specified `array`.

Parameters:

- `T`: The type of the elements in the array.
- `array`: The array to be filled.
- `value`: The value to assign to each array element.

To be added.

## Array.Fill<T>(T[], T, Int32, Int32) method

```csharp
public static void Fill<T> (T[] array, T value, int startIndex, int count);
```

Assigns the given `value` of type `T` to the elements of the specified `array` that are
within the range of `startIndex` (inclusive) and the next `count` number of indices.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The array to be filled.
- `value`: The new value for the elements in the specified range.
- `startIndex`: A 32-bit integer that represents the index in `array` at which filling begins.
- `count`: The number of elements to copy.

To be added.

## Array.Find<T>(T[], Predicate<T>) method

```csharp
public static T? Find<T> (T[] array, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire `Array`.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to search.
- `match`: The predicate that defines the conditions of the element to search for.

Returns: The first element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method or a lambda expression that returns `true` if the object passed to it matches the conditions defined in the delegate or lambda expression.  The elements of `array` are individually passed to the `Predicate<T>`, starting with the first element and ending with the last element.  Processing is stopped when a match is found.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

In F#, the Array.find function can be used instead.

#### Examples
The following example uses a `Predicate<T>` delegate with the `Array.Find` generic method to search an array of `Point` structures. The method the delegate represents, `ProductGT10`, returns `true` if the product of the X and Y fields is greater than 100,000. The `Array.Find` method calls the delegate for each element of the array, returning the first point that meets the test condition.

> **Note:**
> Visual Basic, C#, and F# users do not have to create the delegate explicitly or specify the type argument of the generic method. The compilers determine the necessary types from the method arguments you supply.

_Code sample not included: ~/snippets/csharp/System/Array/FindT/source.cs._

Rather than explicitly defining a method with the necessary signature, instantiating a `Predicate<T>` delegate, and passing the delegate to the `Array.Find` method, it is customary to use a lambda expression. The following example is identical to the previous one, except that it uses a lambda expression as the `match` argument.

_Code sample not included: ~/snippets/csharp/System/Array/FindT/lambda.cs._

## Array.FindAll<T>(T[], Predicate<T>) method

```csharp
public static T[] FindAll<T> (T[] array, Predicate<T> match);
```

Retrieves all the elements that match the conditions defined by the specified predicate.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `match`: The `Predicate<T>` that defines the conditions of the elements to search for.

Returns: An `Array` containing all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty `Array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`, and the elements that match the conditions are saved in the returned array.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

In F#, the Array.filter function may be used instead.

#### Examples
The following example creates an array of 50 random numbers with values that can range from 0 to 1,000. It then calls the `Array.FindAll` method with a lambda expression that returns the values that range from 300 to 600. Note that the lambda expression is passed a parameter named `x`;  this represents the individual array member that is passed to the `Predicate<T>`. Also note that the local `lBound` and `uBound` variables are accessible within the lambda expression.

_Code sample not included: ~/snippets/csharp/System/Array/FindAllT/findall.cs._

The following code example demonstrates the `Array.Find`, `Array.FindLast`, and `Array.FindAll` generic methods. An array of strings is created, containing 8 dinosaur names, two of which (at positions 1 and 5) end with "saurus". The code example also defines a search predicate method named `EndsWithSaurus`, which accepts a string parameter and returns a Boolean value indicating whether the input string ends in "saurus".

The `Array.Find` generic method traverses the array from the beginning, passing each element in turn to the `EndsWithSaurus` method. The search stops when the `EndsWithSaurus` method returns `true` for the element "Amargasaurus".

> **Note:**
> In C#, F#, and Visual Basic, it is not necessary to create the `Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context and create it automatically.

The `Array.FindLast` generic method is used to search the array backward from the end. It finds the element "Dilophosaurus" at position 5. The `Array.FindAll` generic method is used to return an array containing all the elements that end in "saurus". The elements are displayed.

The code example also demonstrates the `Array.Exists` and `Array.TrueForAll` generic methods.

_Code sample not included: ~/snippets/csharp/System/Array/FindAllT/source.cs._

## Array.FindIndex<T>(T[], Predicate<T>) method

```csharp
public static int FindIndex<T> (T[] array, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire `Array`.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Array` is searched forward starting at the first element and ending at the last element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

## Array.FindIndex<T>(T[], Int32, Predicate<T>) method

```csharp
public static int FindIndex<T> (T[] array, int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `Array` that extends from the specified index to the last element.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `startIndex`: The zero-based starting index of the search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of the `array`.

#### Remarks
The `Array` is searched forward starting at `startIndex` and ending at the last element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is the number of elements from `startIndex` to the end of `array`.

## Array.FindIndex<T>(T[], Int32, Int32, Predicate<T>) method

```csharp
public static int FindIndex<T> (T[] array, int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `Array` that starts at the specified index and contains the specified number of elements.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of the `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.

#### Remarks
The `Array` is searched forward starting at `startIndex` and ending at `startIndex` plus `count` minus 1, if `count` is greater than 0.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is `count`.
