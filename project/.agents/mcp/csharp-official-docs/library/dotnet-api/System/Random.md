---
title: "Random class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Random.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Random class

Namespace: `System`

```csharp
public class Random
```

Represents a pseudo-random number generator, which is an algorithm that produces a sequence of numbers that meet certain statistical requirements for randomness.

> **Note:**
> To generate a cryptographically secure random number, such as one that's suitable for creating a random password, use one of the static methods in the `RandomNumberGenerator` class.

The `Random` class represents a pseudo-random number generator, which is an algorithm that produces a sequence of numbers that meet certain statistical requirements for randomness.

Pseudo-random numbers are chosen with equal probability from a finite set of numbers. The chosen numbers are not completely random because a mathematical algorithm is used to select them, but they are sufficiently random for practical purposes. The implementation of the `Random` class is based on a modified version of Donald E. Knuth's subtractive random number generator algorithm. For more information, see D. E. Knuth. *The Art of Computer Programming, Volume 2: Seminumerical Algorithms*. Addison-Wesley, Reading, MA, third edition, 1997.

To generate a cryptographically secure random number, such as one that's suitable for creating a random password, use one of the static methods in the `RandomNumberGenerator` class.

#### Instantiate the random number generator

You instantiate the random number generator by providing a seed value (a starting value for the pseudo-random number generation algorithm) to a `Random.%23ctor` class constructor. You can supply the seed value either explicitly or implicitly:

- The `%23ctor` constructor uses an explicit seed value that you supply.
- The `%23ctor` constructor uses the default seed value. This is the most common way of instantiating the random number generator.

The default seed value is produced by the thread-static, pseudo-random number generator.

If the same seed is used for separate `Random` objects, they will generate the same series of random numbers. This can be useful for creating a test suite that processes random values, or for replaying games that derive their data from random numbers.

To produce different sequences of random numbers, you can make the seed value time-dependent, thereby producing a different series with each new instance of `Random`. The parameterized `%23ctor` constructor can take an `Int32` value based on the number of ticks in the current time, whereas the parameterless `%23ctor` constructor uses the system clock to generate its seed value.

#### Thread safety

Instead of instantiating individual `Random` objects, we recommend that you create a single `Random` instance to generate all the random numbers needed by your app. However, `Random` objects are not thread safe. If your app calls `Random` methods from multiple threads, you must use a synchronization object to ensure that only one thread can access the random number generator at a time. If you don't ensure that the `Random` object is accessed in a thread-safe way, calls to methods that return random numbers return 0.

The following example uses the C# lock Statement, the F# lock function and the Visual Basic <example-value> statement to ensure that a single random number generator is accessed by 11 threads in a thread-safe manner. Each thread generates 2 million random numbers, counts the number of random numbers generated and calculates their sum, and then updates the totals for all threads when it finishes executing.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/threadsafeex1.cs._

The example ensures thread-safety in the following ways:

- The `ThreadStaticAttribute` attribute is used to define thread-local variables that track the total number of random numbers generated and their sum for each thread.
- A lock (the `lock` statement in C#, the `lock` function in F# and the `SyncLock` statement in Visual Basic) protects access to the variables for the total count and sum of all random numbers generated on all threads.
- A semaphore (the `CountdownEvent` object) is used to ensure that the main thread blocks until all other threads complete execution.
- The example checks whether the random number generator has become corrupted by determining whether two consecutive calls to random number generation methods return 0. If corruption is detected, the example uses the `CancellationTokenSource` object to signal that all threads should be canceled.
- Before generating each random number, each thread checks the state of the `CancellationToken` object. If cancellation is requested, the example calls the `CancellationToken.ThrowIfCancellationRequested` method to cancel the thread.

The following example is identical to the first, except that it uses a `Task` object and a lambda expression instead of `Thread` objects.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/threadsafeex2.cs._

It differs from the first example in the following ways:

- The variables to keep track of the number of random numbers generated and their sum in each task are local to the task, so there is no need to use the `ThreadStaticAttribute` attribute.
- The static `Task.WaitAll` method is used to ensure that the main thread doesn't complete before all tasks have finished. There is no need for the `CountdownEvent` object.
- The exception that results from task cancellation is surfaced in the `Task.WaitAll` method. In the previous example, it is handled by each thread.

#### Generate different types of random numbers

The random number generator provides methods that let you generate the following kinds of random numbers:

- A series of `Byte` values. You determine the number of byte values by passing an array initialized to the number of elements you want the method to return to the `Random.NextBytes` method. The following example generates 20 bytes.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/nextbytes1.cs._

- A single integer. You can choose whether you want an integer from 0 to a maximum value (`MaxValue` - 1) by calling the `Next` method, an integer between 0 and a specific value by calling the `Next` method, or an integer within a range of values by calling the `Next` method. In the parameterized overloads, the specified maximum value is exclusive; that is, the actual maximum number generated is one less than the specified value.

The following example calls the `Next` method to generate 10 random numbers between -10 and 10. Note that the second argument to the method specifies the exclusive upper bound of the range of random values returned by the method. In other words, the largest integer that the method can return is one less than this value.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/nextex1.cs._

- A single floating-point value from 0.0 to less than 1.0 by calling the `Random.NextDouble` method. The exclusive upper bound of the random number returned by the method is 1, so its actual upper bound is 0.99999999999999978. The following example generates 10 random floating-point numbers.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/nextdoubleex1.cs._

> **Important:**
> The `Next` method allows you to specify the range of the returned random number. However, the `maxValue` parameter, which specifies the upper range returned number, is an exclusive, not an inclusive, value. This means that the method call `Next(0, 100)` returns a value between 0 and 99, and not between 0 and 100.

You can also use the `Random` class for such tasks as generating random Boolean values, generating random floating-point values in a specified range, generating Generate random 64-bit integers, and retrieving a unique element from an array or collection.

#### Substitute your own algorithm

You can implement your own random number generator by inheriting from the `Random` class and supplying your random number generation algorithm. To supply your own algorithm, you must override the `Random.Sample` method, which implements the random number generation algorithm. You should also override the `Next`, `Next`, and `Random.NextBytes` methods to ensure that they call your overridden `Random.Sample` method. You don't have to override the `Next` and `Random.NextDouble` methods.

For an example that derives from the `Random` class and modifies its default pseudo-random number generator, see the `Random.Sample` reference page.

#### Retrieve the same sequence of random values

Sometimes you want to generate the same sequence of random numbers in software test scenarios and in game playing. Testing with the same sequence of random numbers allows you to detect regressions and confirm bug fixes. Using the same sequence of random number in games allows you to replay previous games.

You can generate the same sequence of random numbers by providing the same seed value to the `%23ctor` constructor. The seed value provides a starting value for the pseudo-random number generation algorithm. The following example uses 100100 as an arbitrary seed value to instantiate the `Random` object, displays 20 random floating-point values, and persists the seed value. It then restores the seed value, instantiates a new random number generator, and displays the same 20 random floating-point values. Note that the example may produce different sequences of random numbers if run on different versions of .NET.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/same1.cs._

#### Retrieve unique sequences of random numbers

Providing different seed values to instances of the `Random` class causes each random number generator to produce a different sequence of values. You can provide a seed value either explicitly by calling the `%23ctor` constructor, or implicitly by calling the `%23ctor` constructor. Most developers call the parameterless constructor, which uses the system clock. The following example uses this approach to instantiate two `Random` instances. Each instance displays a series of 10 random integers.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/unique.cs._

#### Retrieve integers in a specified range

You can retrieve integers in a specified range by calling the `Next` method, which lets you specify both the lower and the upper bound of the numbers you'd like the random number generator to return. The upper bound is an exclusive, not an inclusive, value. That is, it isn't included in the range of values returned by the method. The following example uses this method to generate random integers between -10 and 10. Note that it specifies 11, which is one greater than the desired value, as the value of the `maxValue` argument in the method call.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/range1.cs._

#### Retrieve integers with a specified number of digits

You can call the `Next` method to retrieve numbers with a specified number of digits. For example, to retrieve numbers with four digits (that is, numbers that range from 1000 to 9999), you call the `Next` method with a `minValue` value of 1000 and a `maxValue` value of 10000, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/range2.cs._

#### Retrieve floating-point values in a specified range

The `Random.NextDouble` method returns random floating-point values that range from 0 to less than 1. However, you'll often want to generate random values in some other range.

If the interval between the minimum and maximum desired values is 1, you can add the difference between the desired starting interval and 0 to the number returned by the `Random.NextDouble` method. The following example does this to generate 10 random numbers between -1 and 0.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/doublerange2.cs._

To generate random floating-point numbers whose lower bound is 0 but upper bound is greater than 1 (or, in the case of negative numbers, whose lower bound is less than -1 and upper bound is 0), multiply the random number by the non-zero bound. The following example does this to generate 20 million random floating-point numbers that range from 0 to `MaxValue`. In also displays the distribution of the random values generated by the method.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/doublerange1.cs._

To generate random floating-point numbers between two arbitrary values, like the `Next` method does for integers, use the following formula:

```csharp
Random.NextDouble() * (maxValue - minValue) + minValue
```

The following example generates 1 million random numbers that range from 10.0 to 11.0, and displays their distribution.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/doublerange3.cs._

#### Generate random Boolean values

The `Random` class doesn't provide methods that generate `Boolean` values. However, you can define your own class or method to do that. The following example defines a class, `BooleanGenerator`, with a single method, `NextBoolean`. The `BooleanGenerator` class stores a `Random` object as a private variable. The `NextBoolean` method calls the `Next` method and passes the result to the `ToBoolean` method. Note that 2 is used as the argument to specify the upper bound of the random number. Since this is an exclusive value, the method call returns either 0 or 1.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/booleans1.cs._

Instead of creating a separate class to generate random `Boolean` values, the example could simply have defined a single method. In that case, however, the `Random` object should have been defined as a class-level variable to avoid instantiating a new `Random` instance in each method call. In Visual Basic, the Random instance can be defined as a Static variable in the `NextBoolean` method. The following example provides an implementation.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/booleans2.cs._

#### Generate random 64-bit integers

The overloads of the `Random.Next` method return 32-bit integers. However, in some cases, you might want to work with 64-bit integers. You can do this as follows:

1. Call the `Random.NextDouble` method to retrieve a double-precision floating point value.

2. Multiply that value by `MaxValue`.

The following example uses this technique to generate 20 million random long integers and categorizes them in 10 equal groups. It then evaluates the distribution of the random numbers by counting the number in each group from 0 to `MaxValue`. As the output from the example shows, the numbers are distributed more or less equally through the range of a long integer.

_Code sample not included: ~/snippets/csharp/System/Random/Overview/long1.cs._
