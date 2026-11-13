---
title: "Walkthrough: Creating a Dataflow Pipeline (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/walkthrough-creating-a-dataflow-pipeline.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Creating a Dataflow Pipeline (part 2 of 4)

## Forming the Pipeline

 Add the following code to connect each block to the next block in the pipeline.

 When you call the `System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*` method to connect a source dataflow block to a target dataflow block, the source dataflow block propagates data to the target block as data becomes available. If you also provide `System.Threading.Tasks.Dataflow.DataflowLinkOptions` with `System.Threading.Tasks.Dataflow.DataflowLinkOptions.PropagateCompletion` set to true, successful or unsuccessful completion of one block in the pipeline will cause completion of the next block in the pipeline.

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

## Posting Data to the Pipeline

 Add the following code to post the URL of the book *The Iliad of Homer* to the head of the dataflow pipeline.

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

 This example uses `System.Threading.Tasks.Dataflow.DataflowBlock.Post*` to synchronously send data to the head of the pipeline. Use the `System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*` method when you must asynchronously send data to a dataflow node.
