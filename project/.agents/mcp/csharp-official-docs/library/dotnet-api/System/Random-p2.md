---
title: "Random class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Random.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Random class (part 2 of 3)

An alternative technique that uses bit manipulation does not generate truly random numbers. This technique calls `Next` to generate two integers, left-shifts one by 32 bits, and ORs them together. This technique has two limitations:

1. Because bit 31 is the sign bit, the value in bit 31 of the resulting long integer is always 0. This can be addressed by generating a random 0 or 1, left-shifting it 31 bits, and ORing it with the original random long integer.

2. More seriously, because the probability that the value returned by `Next` will be 0, there will be few if any random numbers in the range 0x0-0x00000000FFFFFFFF.

#### Retrieve bytes in a specified range

The overloads of the `Random.Next` method allow you to specify the range of random numbers, but the `Random.NextBytes` method does not. The following example implements a `NextBytes` method that lets you specify the range of the returned bytes. It defines a `Random2` class that derives from `Random` and overloads its `NextBytes` method.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/bytes1.cs._

The `NextBytes(Byte[], Byte, Byte)` method wraps a call to the `Next` method and specifies the minimum value and one greater than the maximum value (in this case, 0 and 101) that we want returned in the byte array. Because we are sure that the integer values returned by the `Random.Next` method are within the range of the `Byte` data type, we can safely cast them (in C# and F#) or convert them (in Visual Basic) from integers to bytes.

#### Retrieve an element from an array or collection at random

Random numbers often serve as indexes to retrieve values from arrays or collections. To retrieve a random index value, you can call the `Next` method, and use the lower bound of the array as the value of its `minValue` argument and one greater than the upper bound of the array as the value of its `maxValue` argument. For a zero-based array, this is equivalent to its `Length` property, or one greater than the value returned by the `Array.GetUpperBound` method. The following example randomly retrieves the name of a city in the United States from an array of cities.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/array1.cs._

#### Retrieve a unique element from an array or collection

A random number generator can always return duplicate values. As the range of numbers becomes smaller or the number of values generated becomes larger, the probability of duplicates grows. If random values must be unique, more numbers are generated to compensate for duplicates, resulting in increasingly poor performance.

There are a number of techniques to handle this scenario. One common solution is to create an array or collection that contains the values to be retrieved, and a parallel array that contains random floating-point numbers. The second array is populated with random numbers at the time the first array is created, and the `Sort` method is used to sort the first array by using the values in the parallel array.

For example, if you're developing a Solitaire game, you want to ensure that each card is used only once. Instead of generating random numbers to retrieve a card and tracking whether that card has already been dealt, you can create a parallel array of random numbers that can be used to sort the deck. Once the deck is sorted, your app can maintain a pointer to indicate the index of the next card on the deck.

The following example illustrates this approach. It defines a `Card` class that represents a playing card and a `Dealer` class that deals a deck of shuffled cards. The `Dealer` class constructor populates two arrays: a `deck` array that has class scope and that represents all the cards in the deck; and a local `order` array that has the same number of elements as the `deck` array and is populated with randomly generated `Double` values. The `Sort` method is then called to sort the `deck` array based on the values in the `order` array.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/uniquearray1.cs._

The following example creates a single random number generator and calls its `Random.NextBytes`, `Random.Next`, and `Random.NextDouble` methods to generate sequences of random numbers within different ranges.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/Random2.cs._

The following example generates a random integer that it uses as an index to retrieve a string value from an array.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/next1.cs._

## Random.Random() constructor

```csharp
public Random ();
```

Initializes a new instance of the `Random` class using a default seed value.

#### Remarks

The default seed value is produced by the thread-static, pseudo-random number generator, so different `Random` objects created in close succession produce different sets of random numbers.

Call this constructor if you want your random number generator to generate a random sequence of numbers. To generate a fixed  sequence of random numbers that will be the same for different random number generators, call the `%23ctor` constructor with a fixed seed value. This `Random` constructor overload is frequently used when testing apps that use random numbers.

Once you've instantiated the random number generator, you call individual `Random` methods, such as `Next` or `NextDouble`, to generate random numbers.

## Random.Random(Int32) constructor

```csharp
public Random (int Seed);
```

Initializes a new instance of the `Random` class, using the specified seed value.

Parameters:

- `Seed`: A number used to calculate a starting value for the pseudo-random number sequence. If a negative number is specified, the absolute value of the number is used.

#### Remarks
Providing an identical seed value to different `Random` objects causes each instance to produce identical sequences of random numbers. This is often done when testing apps that rely on random number generators.

If your application requires different random number sequences, invoke this constructor repeatedly with different seed values. One way to produce a unique seed value is to make it time-dependent. For example, derive the seed value from the system clock, as the `%23ctor` overload does. Another option is to instantiate a single `Random` object that you use to generate all the random numbers in your application. This yields slightly better performance, since instantiating a random number generator is fairly expensive.

#### Examples
The following example creates `Random` objects with the class constructor that takes a seed parameter and generates a sequence of random integers and doubles. The example illustrates that the same sequence is generated when the `Random` object is created again with the constructor and seed parameter.

_Code sample not included: ~/snippets/csharp/System/Random/.ctor/ctor.cs._

## Random.Shared property

```csharp
public static Random Shared { get; }
```

Provides a thread-safe `Random` instance that may be used concurrently from any thread.

Returns: A `Random` instance.

To be added.

## Random.GetHexString(Int32, Boolean) method

```csharp
public string GetHexString (int stringLength, bool lowercase = false);
```

Creates a string filled with random hexadecimal characters.

Parameters:

- `stringLength`: The length of string to create.
- `lowercase`: `true` if the hexadecimal characters should be lowercase; `false` if they should be uppercase.

The default is `false`.

Returns: A string populated with random hexadecimal characters.

To be added.

## Random.GetHexString(Char>, Boolean) method

```csharp
public void GetHexString (Span<char> destination, bool lowercase = false);
```

Fills a buffer with random hexadecimal characters.

Parameters:

- `destination`: The buffer to receive the characters.
- `lowercase`: `true` if the hexadecimal characters should be lowercase; `false` if they should be uppercase.

The default is `false`.

To be added.

## Random.GetItems<T>(ReadOnlySpan<T>, Int32) method

```csharp
public T[] GetItems<T> (ReadOnlySpan<T> choices, int length);
```

Creates an array populated with items chosen at random from the provided set of choices.

Parameters:

- `T`: The type of array.
- `choices`: The items to use to populate the array.
- `length`: The length of array to return.

Returns: An array populated with random items.

Exceptions:

- `ArgumentException`: `choices` is empty.
- `ArgumentOutOfRangeException`: `length` is not zero or a positive number.

The method uses `Random.Next` to select items randomly from `choices` by index. This is used to populate a newly-created array.

## Random.GetItems<T>(ReadOnlySpan<T>, Span<T>) method

```csharp
public void GetItems<T> (ReadOnlySpan<T> choices, Span<T> destination);
```

Fills the elements of a specified span with items chosen at random from the provided set of choices.

Parameters:

- `T`: The type of span.
- `choices`: The items to use to populate the span.
- `destination`: The span to be filled with items.

Exceptions:

- `ArgumentException`: `choices` is empty.

The method uses `Random.Next` to select items randomly from `choices` by index and populate `destination`.

## Random.GetItems<T>(T[], Int32) method

```csharp
public T[] GetItems<T> (T[] choices, int length);
```

Creates an array populated with items chosen at random from the provided set of choices.

Parameters:

- `T`: The type of array.
- `choices`: The items to use to populate the array.
- `length`: The length of array to return.

Returns: An array populated with random items.

Exceptions:

- `ArgumentException`: `choices` is empty.
- `ArgumentNullException`: `choices` is `null`.
- `ArgumentOutOfRangeException`: `length` is not zero or a positive number.

The method uses `Random.Next` to select items randomly from `choices` by index. This is used to populate a newly-created array.

## Random.GetString(Char>, Int32) method

```csharp
public string GetString (ReadOnlySpan<char> choices, int length);
```

Creates a string populated with characters chosen at random from `choices`.

Parameters:

- `choices`: The characters to use to populate the string.
- `length`: The length of string to return.

Returns: A string populated with items selected at random from `choices`.

Exceptions:

- `ArgumentException`: `choices` is empty.
- `ArgumentOutOfRangeException`: `length` is not zero or a positive number.

To be added.

## Random.Next() method

```csharp
public virtual int Next ();
```

Returns a non-negative random integer.

Returns: A 32-bit signed integer that is greater than or equal to 0 and less than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
`Random.Next` generates a random number whose value ranges from 0 to less than `MaxValue`. To generate a random number whose value ranges from 0 to some other positive number, use the `Next` method overload. To generate a random number within a different range, use the `Next` method overload.

#### Examples
The following example makes repeated calls to the `Random.Next` method to generate 10 random numbers.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/next3.cs._

The following example derives a class from `Random` to generate a sequence of random numbers whose distribution differs from the uniform distribution generated by the `Random.Sample` method of the base class. It overrides the `Random.Sample` method to provide the distribution of random numbers, and overrides the `Random.Next` method to use series of random numbers.

_Code sample not included: ~/snippets/csharp/System/Random/Next/sample.cs._

## Random.Next(Int32) method

```csharp
public virtual int Next (int maxValue);
```

Returns a non-negative random integer that is less than the specified maximum.

Parameters:

- `maxValue`: The exclusive upper bound of the random number to be generated. `maxValue` must be greater than or equal to 0.

Returns: A 32-bit signed integer that is greater than or equal to 0, and less than `maxValue`; that is, the range of return values ordinarily includes 0 but not `maxValue`. However, if `maxValue` equals 0, 0 is returned.

Exceptions:

- `ArgumentOutOfRangeException`: `maxValue` is less than 0.

#### Remarks
The `Next` overload returns random integers that range from 0 to `maxValue` - 1. However, if `maxValue` is 0, the method returns 0.

#### Examples
The following example generates random integers with various overloads of the `Random.Next` method.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/next.cs._

The following example generates a random integer that it uses as an index to retrieve a string value from an array. Because the highest index of the array is one less than its length, the value of the `Length` property is supplied as the `maxValue` parameter.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/next1.cs._

## Random.Next(Int32, Int32) method

```csharp
public virtual int Next (int minValue, int maxValue);
```

Returns a random integer that is within a specified range.

Parameters:

- `minValue`: The inclusive lower bound of the random number returned.
- `maxValue`: The exclusive upper bound of the random number returned. `maxValue` must be greater than or equal to `minValue`.

Returns: A 32-bit signed integer greater than or equal to `minValue` and less than `maxValue`; that is, the range of return values includes `minValue` but not `maxValue`. If `minValue` equals `maxValue`, `minValue` is returned.

Exceptions:

- `ArgumentOutOfRangeException`: `minValue` is greater than `maxValue`.

#### Remarks
The `Next` overload returns random integers that range from `minValue` to `maxValue` - 1. However, if `maxValue` equals `minValue`, the method returns `minValue`.

Unlike the other overloads of the `Random.Next` method, which return only non-negative values, this method can return a negative random integer.

#### Examples
The following example uses the `Next` method to generate random integers with three distinct ranges. Note that the exact output from the example depends on the system-supplied seed value passed to the `Random` class constructor.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/Next2.cs._

The following example generates a random integer that it uses as an index to retrieve a string value from an array. Because the highest index of the array is one less than its length, the value of the `Length` property is supplied as a the `maxValue` parameter.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/next4.cs._

## Random.NextBinaryFloat<T>() method

```csharp
public T NextBinaryFloat<T> () where T : System.Numerics.IBinaryFloatingPointIeee754<T>;
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.
