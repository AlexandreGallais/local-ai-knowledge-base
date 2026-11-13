---
title: "Walkthrough: Creating a Dataflow Pipeline (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/walkthrough-creating-a-dataflow-pipeline.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Creating a Dataflow Pipeline

Although you can use the `System.Threading.Tasks.Dataflow.DataflowBlock.Receive*`, `System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*`, and `System.Threading.Tasks.Dataflow.DataflowBlock.TryReceive*` methods to receive messages from source blocks, you can also connect message blocks to form a *dataflow pipeline*. A dataflow pipeline is a series of components, or *dataflow blocks*, each of which performs a specific task that contributes to a larger goal. Every dataflow block in a dataflow pipeline performs work when it receives a message from another dataflow block. An analogy to this is an assembly line for automobile manufacturing. As each vehicle passes through the assembly line, one station assembles the frame, the next one installs the engine, and so on. Because an assembly line enables multiple vehicles to be assembled at the same time, it provides better throughput than assembling complete vehicles one at a time.

 This document demonstrates a dataflow pipeline that downloads the book *The Iliad of Homer* from a website and searches the text to match individual words with words that reverse the first word's characters. The formation of the dataflow pipeline in this document consists of the following steps:

1. Create the dataflow blocks that participate in the pipeline.

2. Connect each dataflow block to the next block in the pipeline. Each block receives as input the output of the previous block in the pipeline.

3. For each dataflow block, create a continuation task that sets the next block to the completed state after the previous block finishes.

4. Post data to the head of the pipeline.

5. Mark the head of the pipeline as completed.

6. Wait for the pipeline to complete all work.

## Prerequisites

 Read Dataflow before you start this walkthrough.

## Creating a Console Application

 In Visual Studio, create a Visual C# or Visual Basic <example-value> Application project. Install the System.Threading.Tasks.Dataflow NuGet package.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

 Add the following code to your project to create the basic application.

 ```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to create a basic <example-value> pipeline.
// This program downloads the book "The Iliad of Homer" by Homer from the Web
// and finds all reversed words that appear in that book.
static class DataflowReversedWords
{
   static void Main()
   {
      //
      // Create the members of the pipeline.
      //

      // Downloads the requested resource as a string.
      var downloadString = new TransformBlock<string, string>(async uri =>
      {
         Console.WriteLine($"Downloading '{uri}'...");

         return await new HttpClient(new HttpClientHandler{ AutomaticDecompression = System.Net.DecompressionMethods.GZip }).GetStringAsync(uri);
      });

      // Separates the specified text into an array of words.
      var createWordList = new TransformBlock<string, string[]>(text =>
      {
         Console.WriteLine("Creating word list...");

         // Remove common punctuation by replacing all non-letter characters
         // with a space character.
         char[] tokens = text.Select(c => char.IsLetter(c) ? c : '<example-value>').ToArray();
         text = new string(tokens);

         // Separate the text into an array of words.
         return text.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
      });

      // Removes short words and duplicates.
      var filterWordList = new TransformBlock<string[], string[]>(words =>
      {
         Console.WriteLine("Filtering word list...");

         return words
            .Where(word => word.Length > 3)
            .Distinct()
            .ToArray();
      });

      // Finds all words in the specified collection whose reverse also
      // exists in the collection.
      var findReversedWords = new TransformManyBlock<string[], string>(words =>
      {
         Console.WriteLine("Finding reversed words...");

         var wordsSet = new HashSet<string>(words);

         return from word in words.AsParallel()
                let reverse = new string(word.Reverse().ToArray())
                where word != reverse && wordsSet.Contains(reverse)
                select word;
      });

      // Prints the provided reversed words to the console.
      var printReversedWords = new ActionBlock<string>(reversedWord =>
      {
         Console.WriteLine($"Found reversed words {reversedWord}/{new string(reversedWord.Reverse().ToArray())}");
      });

      //
      // Connect the dataflow blocks to form a pipeline.
      //

      var linkOptions = new DataflowLinkOptions { PropagateCompletion = true };

      downloadString.LinkTo(createWordList, linkOptions);
      createWordList.LinkTo(filterWordList, linkOptions);
      filterWordList.LinkTo(findReversedWords, linkOptions);
      findReversedWords.LinkTo(printReversedWords, linkOptions);

      // Process "The Iliad of Homer" by Homer.
      downloadString.Post("http://www.gutenberg.org/cache/epub/16452/pg16452.txt");

      // Mark the head of the pipeline as complete.
      downloadString.Complete();

      // Wait for the last block in the pipeline to process all messages.
      printReversedWords.Completion.Wait();
   }
}
/* Sample output:
   Downloading 'http://www.gutenberg.org/cache/epub/16452/pg16452.txt'...
   Creating word list...
   Filtering word list...
   Finding reversed words...
   Found reversed words doom/mood
   Found reversed words draw/ward
   Found reversed words aera/area
   Found reversed words seat/taes
   Found reversed words live/evil
   Found reversed words port/trop
   Found reversed words sleek/keels
   Found reversed words area/aera
   Found reversed words tops/spot
   Found reversed words evil/live
   Found reversed words mood/doom
   Found reversed words speed/deeps
   Found reversed words moor/room
   Found reversed words trop/port
   Found reversed words spot/tops
   Found reversed words spots/stops
   Found reversed words stops/spots
   Found reversed words reed/deer
   Found reversed words keels/sleek
   Found reversed words deeps/speed
   Found reversed words deer/reed
   Found reversed words taes/seat
   Found reversed words room/moor
   Found reversed words ward/draw
*/

/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to create a basic <example-value> pipeline.
// This program downloads the book "The Iliad of Homer" by Homer from the Web
// and finds all reversed words that appear in that book.
static class Program
{
   static void Main()
   {
   }
}
*/
```

## Creating the Dataflow Blocks

 Add the following code to the `Main` method to create the dataflow blocks that participate in the pipeline. The table that follows summarizes the role of each member of the pipeline.

 ```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to create a basic <example-value> pipeline.
// This program downloads the book "The Iliad of Homer" by Homer from the Web
// and finds all reversed words that appear in that book.
static class DataflowReversedWords
{
   static void Main()
   {
      //
      // Create the members of the pipeline.
      //

      // Downloads the requested resource as a string.
      var downloadString = new TransformBlock<string, string>(async uri =>
      {
         Console.WriteLine($"Downloading '{uri}'...");

         return await new HttpClient(new HttpClientHandler{ AutomaticDecompression = System.Net.DecompressionMethods.GZip }).GetStringAsync(uri);
      });

      // Separates the specified text into an array of words.
      var createWordList = new TransformBlock<string, string[]>(text =>
      {
         Console.WriteLine("Creating word list...");

         // Remove common punctuation by replacing all non-letter characters
         // with a space character.
         char[] tokens = text.Select(c => char.IsLetter(c) ? c : '<example-value>').ToArray();
         text = new string(tokens);

         // Separate the text into an array of words.
         return text.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
      });

      // Removes short words and duplicates.
      var filterWordList = new TransformBlock<string[], string[]>(words =>
      {
         Console.WriteLine("Filtering word list...");

         return words
            .Where(word => word.Length > 3)
            .Distinct()
            .ToArray();
      });

      // Finds all words in the specified collection whose reverse also
      // exists in the collection.
      var findReversedWords = new TransformManyBlock<string[], string>(words =>
      {
         Console.WriteLine("Finding reversed words...");

         var wordsSet = new HashSet<string>(words);

         return from word in words.AsParallel()
                let reverse = new string(word.Reverse().ToArray())
                where word != reverse && wordsSet.Contains(reverse)
                select word;
      });

      // Prints the provided reversed words to the console.
      var printReversedWords = new ActionBlock<string>(reversedWord =>
      {
         Console.WriteLine($"Found reversed words {reversedWord}/{new string(reversedWord.Reverse().ToArray())}");
      });

      //
      // Connect the dataflow blocks to form a pipeline.
      //

      var linkOptions = new DataflowLinkOptions { PropagateCompletion = true };

      downloadString.LinkTo(createWordList, linkOptions);
      createWordList.LinkTo(filterWordList, linkOptions);
      filterWordList.LinkTo(findReversedWords, linkOptions);
      findReversedWords.LinkTo(printReversedWords, linkOptions);

      // Process "The Iliad of Homer" by Homer.
      downloadString.Post("http://www.gutenberg.org/cache/epub/16452/pg16452.txt");

      // Mark the head of the pipeline as complete.
      downloadString.Complete();

      // Wait for the last block in the pipeline to process all messages.
      printReversedWords.Completion.Wait();
   }
}
/* Sample output:
   Downloading 'http://www.gutenberg.org/cache/epub/16452/pg16452.txt'...
   Creating word list...
   Filtering word list...
   Finding reversed words...
   Found reversed words doom/mood
   Found reversed words draw/ward
   Found reversed words aera/area
   Found reversed words seat/taes
   Found reversed words live/evil
   Found reversed words port/trop
   Found reversed words sleek/keels
   Found reversed words area/aera
   Found reversed words tops/spot
   Found reversed words evil/live
   Found reversed words mood/doom
   Found reversed words speed/deeps
   Found reversed words moor/room
   Found reversed words trop/port
   Found reversed words spot/tops
   Found reversed words spots/stops
   Found reversed words stops/spots
   Found reversed words reed/deer
   Found reversed words keels/sleek
   Found reversed words deeps/speed
   Found reversed words deer/reed
   Found reversed words taes/seat
   Found reversed words room/moor
   Found reversed words ward/draw
*/

/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to create a basic <example-value> pipeline.
// This program downloads the book "The Iliad of Homer" by Homer from the Web
// and finds all reversed words that appear in that book.
static class Program
{
   static void Main()
   {
   }
}
*/
```

|Member|Type|Description|
|------------|----------|-----------------|
|`downloadString`|`System.Threading.Tasks.Dataflow.TransformBlock`2`|Downloads the book text from the Web.|
|`createWordList`|`System.Threading.Tasks.Dataflow.TransformBlock`2`|Separates the book text into an array of words.|
|`filterWordList`|`System.Threading.Tasks.Dataflow.TransformBlock`2`|Removes short words and duplicates from the word array.|
|`findReversedWords`|`System.Threading.Tasks.Dataflow.TransformManyBlock`2`|Finds all words in the filtered word array collection whose reverse also occurs in the word array.|
|`printReversedWords`|`System.Threading.Tasks.Dataflow.ActionBlock`1`|Displays words and the corresponding reverse words to the console.|

 Although you could combine multiple steps in the dataflow pipeline in this example into one step, the example illustrates the concept of composing multiple independent dataflow tasks to perform a larger task. The example uses `System.Threading.Tasks.Dataflow.TransformBlock`2` to enable each member of the pipeline to perform an operation on its input data and send the results to the next step in the pipeline. The `findReversedWords` member of the pipeline is a `System.Threading.Tasks.Dataflow.TransformManyBlock`2` object because it produces multiple independent outputs for each input. The tail of the pipeline, `printReversedWords`, is an `System.Threading.Tasks.Dataflow.ActionBlock`1` object because it performs an action on its input, and does not produce a result.
