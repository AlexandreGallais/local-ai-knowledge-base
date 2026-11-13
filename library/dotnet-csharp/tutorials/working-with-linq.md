---
title: "Working with LINQ (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/tutorials/working-with-linq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Work with Language-Integrated Query (LINQ)

## Introduction

This tutorial teaches you features in .NET and the C# language. You learn how to:

- Generate sequences with LINQ.
- Write methods that you can easily use in LINQ queries.
- Distinguish between eager and lazy evaluation.

You learn these techniques by building an application that demonstrates one of the basic skills of any magician: the faro shuffle. A faro shuffle is a technique where you split a card deck exactly in half, and then the shuffle interleaves each card from each half to rebuild the original deck.

Magicians use this technique because every card is in a known location after each shuffle, and the order is a repeating pattern.

This tutorial offers a lighthearted look at manipulating sequences of data. The application constructs a card deck, performs a sequence of shuffles, and writes the sequence out each time. It also compares the updated order to the original order.

This tutorial has multiple steps. After each step, you can run the application and see the progress. You can also see the completed sample in the dotnet/samples GitHub repository. For download instructions, see Samples and Tutorials.

## Prerequisites

- The latest .NET SDK
- Visual Studio Code editor
- The C# DevKit

## Create the application

Create a new application. Open a command prompt and create a new directory for your application. Make that the current directory. Type the command `dotnet new console -o LinqFaroShuffle` at the command prompt. This command creates the starter files for a basic "Hello World" application.

If you've never used C# before, this tutorial explains the structure of a C# program. You can read that and then return here to learn more about LINQ.

## Create the data set

> **Tip:**
> For this tutorial, you can organize your code in a namespace called `LinqFaroShuffle` to match the sample code, or you can use the default global namespace. If you choose to use a namespace, make sure all your classes and methods are consistently within the same namespace, or add appropriate `using` statements as needed.

Consider what constitutes a deck of cards. A deck of playing cards has four suits, and each suit has 13 values. Normally, you might consider creating a `Card` class right away and populating a collection of `Card` objects by hand. With LINQ, you can be more concise than the usual way of creating a deck of cards. Instead of creating a `Card` class, create two sequences to represent suits and ranks. Create a pair of *iterator methods* that generate the ranks and suits as `System.Collections.Generic.IEnumerable`1`s of strings:

```csharp
static IEnumerable<string> Suits()
{
    yield return "clubs";
    yield return "diamonds";
    yield return "hearts";
    yield return "spades";
}

static IEnumerable<string> Ranks()
{
    yield return "two";
    yield return "three";
    yield return "four";
    yield return "five";
    yield return "six";
    yield return "seven";
    yield return "eight";
    yield return "nine";
    yield return "ten";
    yield return "jack";
    yield return "queen";
    yield return "king";
    yield return "ace";
}
```
Place these methods under the `Console.WriteLine` statement in your `Program.cs` file. These two methods both use the `yield return` syntax to produce a sequence as they run. The compiler builds an object that implements `System.Collections.Generic.IEnumerable`1` and generates the sequence of strings as they're requested.

Now, use these iterator methods to create the deck of cards. Place the LINQ query at the top of the `Program.cs` file. Here's what it looks like:

```csharp
var startingDeck = from s in Suits()
                   from r in Ranks()
                   select (Suit: s, Rank: r);

// Display each card that's generated and placed in startingDeck
foreach (var card in startingDeck)
{
    Console.WriteLine(card);
}
```
The multiple `from` clauses produce a `System.Linq.Enumerable.SelectMany*`, which creates a single sequence from combining each element in the first sequence with each element in the second sequence. The order is important for this example. The first element in the first source sequence (Suits) is combined with every element in the second sequence (Ranks). This process produces all 13 cards of first suit. That process is repeated with each element in the first sequence (Suits). The end result is a deck of cards ordered by suits, followed by values.

Keep in mind that whether you write your LINQ in the query syntax used in the preceding sample or use method syntax instead, it's always possible to go from one form of syntax to the other. The preceding query written in query syntax can be written in method syntax as:

```csharp
var startingDeck = Suits().SelectMany(suit => Ranks().Select(rank => (Suit: suit, Rank: rank )));
```

The compiler translates LINQ statements written with query syntax into the equivalent method call syntax. Therefore, regardless of your syntax choice, the two versions of the query produce the same result. Choose the syntax that works best for your situation. For instance, if you're working in a team where some members have difficulty with method syntax, try to prefer using query syntax.

Run the sample you built at this point. It displays all 52 cards in the deck. You might find it helpful to run this sample under a debugger to observe how the `Suits()` and `Ranks()` methods execute. You can clearly see that each string in each sequence is generated only as needed.

## Manipulate the order

Next, focus on how you shuffle the cards in the deck. The first step in any good shuffle is to split the deck in two. The `System.Linq.Enumerable.Take*` and `System.Linq.Enumerable.Skip*` methods that are part of the LINQ APIs provide that feature. Place them following the `foreach` loop:

```csharp
var top = startingDeck.Take(26);
var bottom = startingDeck.Skip(26);
```
However, there's no shuffle method to take advantage of in the standard library, so you need to write your own. The shuffle method you create illustrates several techniques that you use with LINQ-based programs, so each part of this process is explained in steps.

To add functionality to how you interact with the `System.Collections.Generic.IEnumerable`1` results of LINQ queries, you write some special kinds of methods called extension methods. An extension method is a special purpose *static method* that adds new functionality to an already-existing type without having to modify the original type you want to add functionality to.

Give your extension methods a new home by adding a new *static* class file to your program called `Extensions.cs`, and then start building out the first extension method:

```csharp
public static class CardExtensions
{
    extension<T>(IEnumerable<T> sequence)
    {
        public IEnumerable<T> InterleaveSequenceWith(IEnumerable<T> second)
        {
            // Your implementation goes here
            return default;
        }
    }
}
```
> **Note:**
> If you're using an editor other than Visual Studio (such as Visual Studio Code), you might need to add `using LinqFaroShuffle;` to the top of your _Program.cs_ file for the extension methods to be accessible. Visual Studio automatically adds this using statement, but other editors might not.

The `extension` container specifies the type being extended. The `extension` node declares the type and name of the *receiver parameter* for all members inside the `extension` container. In this example, you're extending `IEnumerable<T>`, and the parameter is named `sequence`.

Extension member declarations appear as though they're members of the receiver type:

```csharp
public IEnumerable<T> InterleaveSequenceWith(IEnumerable<T> second)
```

You call the method as though it were a member method of the extended type. This method declaration also follows a standard idiom where the input and output types are `IEnumerable<T>`. That practice enables LINQ methods to be chained together to perform more complex queries.

Since you split the deck into halves, you need to join those halves together. In code, this means you enumerate both of the sequences you acquired through `System.Linq.Enumerable.Take*` and `System.Linq.Enumerable.Skip*` at once, *interleaving* the elements, and creating one sequence: your now-shuffled deck of cards. Writing a LINQ method that works with two sequences requires that you understand how `System.Collections.Generic.IEnumerable`1` works.

The `System.Collections.Generic.IEnumerable`1` interface has one method: `System.Collections.Generic.IEnumerable`1.GetEnumerator*`. The object returned by `System.Collections.Generic.IEnumerable`1.GetEnumerator*` has a method to move to the next element and a property that retrieves the current element in the sequence. You use those two members to enumerate the collection and return the elements. This Interleave method is an iterator method, so instead of building a collection and returning the collection, you use the `yield return` syntax shown in the preceding code.

Here's the implementation of that method:

```csharp
public IEnumerable<T> InterleaveSequenceWith(IEnumerable<T> second)
{
    var firstIter = sequence.GetEnumerator();
    var secondIter = second.GetEnumerator();

    while (firstIter.MoveNext() && secondIter.MoveNext())
    {
        yield return firstIter.Current;
        yield return secondIter.Current;
    }
}
```
Now that you wrote this method, go back to the `Main` method and shuffle the deck once:

```csharp
var shuffledDeck = top.InterleaveSequenceWith(bottom);

foreach (var c in shuffledDeck)
{
    Console.WriteLine(c);
}
```
## Comparisons

Determine how many shuffles it takes to set the deck back to its original order. To find out, write a method that determines if two sequences are equal. After you have that method, place the code that shuffles the deck in a loop, and check to see when the deck is back in order.

Writing a method to determine if the two sequences are equal should be straightforward. It's a similar structure to the method you wrote to shuffle the deck. However, this time, instead of using `yield return` for each element, you compare the matching elements of each sequence. When the entire sequence is enumerated, if every element matches, the sequences are the same:

```csharp
public bool SequenceEquals(IEnumerable<T> second)
{
    var firstIter = sequence.GetEnumerator();
    var secondIter = second.GetEnumerator();

    while ((firstIter?.MoveNext() == true) && secondIter.MoveNext())
    {
        if ((firstIter.Current is not null) && !firstIter.Current.Equals(secondIter.Current))
        {
            return false;
        }
    }

    return true;
}
```
This method shows a second LINQ idiom: terminal methods. They take a sequence as input (or in this case, two sequences) and return a single scalar value. When you use terminal methods, they're always the final method in a chain of methods for a LINQ query.

You can see this in action when you use it to determine when the deck is back in its original order. Put the shuffle code inside a loop, and stop when the sequence is back in its original order by applying the `SequenceEquals()` method. You can see it would always be the final method in any query because it returns a single value instead of a sequence:

```csharp
var startingDeck = from s in Suits()
                   from r in Ranks()
                   select (Suit: s, Rank: r);

// Display each card generated and placed in startingDeck in the console
foreach (var card in startingDeck)
{
    Console.WriteLine(card);
}

var top = startingDeck.Take(26);
var bottom = startingDeck.Skip(26);

var shuffledDeck = top.InterleaveSequenceWith(bottom);

var times = 0;
// Re-use the shuffle variable from earlier, or you can make a new one
shuffledDeck = startingDeck;
do
{
    shuffledDeck = shuffledDeck.Take(26).InterleaveSequenceWith(shuffledDeck.Skip(26));

    foreach (var card in shuffledDeck)
    {
        Console.WriteLine(card);
    }
    Console.WriteLine();
    times++;

} while (!startingDeck.SequenceEquals(shuffledDeck));

Console.WriteLine(times);
```
Run the code you built so far and notice how the deck rearranges on each shuffle. After 8 shuffles (iterations of the do-while loop), the deck returns to the original configuration it was in when you first created it from the starting LINQ query.
