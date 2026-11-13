---
title: "How to: Perform Action When a Dataflow Block Receives Data (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-perform-action-when-a-dataflow-block-receives-data.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Perform Action When a Dataflow Block Receives Data

*Execution dataflow block* types call a user-provided delegate when they receive data. The `System.Threading.Tasks.Dataflow.ActionBlock`1`, `System.Threading.Tasks.Dataflow.TransformBlock`2`, and `System.Threading.Tasks.Dataflow.TransformManyBlock`2` classes are execution dataflow block types. You can use the `delegate` keyword (`Sub` in Visual Basic), `System.Action`1`, `System.Func`2`, or a lambda expression when you provide a work function to an execution dataflow block. This document describes how to use `System.Func`2` and lambda expressions to perform action in execution blocks.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Example

 The following example uses dataflow to read a file from disk and computes the number of bytes in that file that are equal to zero. It uses `System.Threading.Tasks.Dataflow.TransformBlock`2` to read the file and compute the number of zero bytes, and `System.Threading.Tasks.Dataflow.ActionBlock`1` to print the number of zero bytes to the console. The `System.Threading.Tasks.Dataflow.TransformBlock`2` object specifies a `System.Func`2` object to perform work when the blocks receive data. The `System.Threading.Tasks.Dataflow.ActionBlock`1` object uses a lambda expression to print to the console the number of zero bytes that are read.

 ```csharp
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to provide delegates to exectution dataflow blocks.
class DataflowExecutionBlocks
{
   // Computes the number of zero bytes that the provided file
   // contains.
   static int CountBytes(string path)
   {
      byte[] buffer = new byte[1024];
      int totalZeroBytesRead = 0;
      using (var fileStream = File.OpenRead(path))
      {
         int bytesRead = 0;
         do
         {
            bytesRead = fileStream.Read(buffer, 0, buffer.Length);
            totalZeroBytesRead += buffer.Count(b => b == 0);
         } while (bytesRead > 0);
      }

      return totalZeroBytesRead;
   }

   static void Main(string[] args)
   {
      // Create a temporary file on disk.
      string tempFile = Path.GetTempFileName();

      // Write random data to the temporary file.
      using (var fileStream = File.OpenWrite(tempFile))
      {
         Random rand = new Random();
         byte[] buffer = new byte[1024];
         for (int i = 0; i < 512; i++)
         {
            rand.NextBytes(buffer);
            fileStream.Write(buffer, 0, buffer.Length);
         }
      }

      // Create an ActionBlock<int> object that prints to the console
      // the number of bytes read.
      var printResult = new ActionBlock<int>(zeroBytesRead =>
      {
         Console.WriteLine($"{Path.GetFileName(tempFile)} contains {zeroBytesRead} zero bytes.");
      });

      // Create a TransformBlock<string, int> object that calls the
      // CountBytes function and returns its result.
      var countBytes = new TransformBlock<string, int>(
         new Func<string, int>(CountBytes));

      // Link the TransformBlock<string, int> object to the
      // ActionBlock<int> object.
      countBytes.LinkTo(printResult);

      // Create a continuation task that completes the ActionBlock<int>
      // object when the TransformBlock<string, int> finishes.
      countBytes.Completion.ContinueWith(delegate { printResult.Complete(); });

      // Post the path to the temporary file to the
      // TransformBlock<string, int> object.
      countBytes.Post(tempFile);

      // Requests completion of the TransformBlock<string, int> object.
      countBytes.Complete();

      // Wait for the ActionBlock<int> object to print the message.
      printResult.Completion.Wait();

      // Delete the temporary file.
      File.Delete(tempFile);
   }
}

/* Sample output:
tmp4FBE.tmp contains 2081 zero bytes.
*/

class Program2
{
   // Asynchronously computes the number of zero bytes that the provided file
   // contains.
   static async Task<int> CountBytesAsync(string path)
   {
      byte[] buffer = new byte[1024];
      int totalZeroBytesRead = 0;
      using (var fileStream = new FileStream(
         path, FileMode.Open, FileAccess.Read, FileShare.Read, 0x1000, true))
      {
         int bytesRead = 0;
         do
         {
            // Asynchronously read from the file stream.
            bytesRead = await fileStream.ReadAsync(buffer, 0, buffer.Length);
            totalZeroBytesRead += buffer.Count(b => b == 0);
         } while (bytesRead > 0);
      }

      return totalZeroBytesRead;
   }

   static void Foo()
   {
      // Create a TransformBlock<string, int> object that calls the
      // CountBytes function and returns its result.
      var countBytesAsync = new TransformBlock<string, int>(async path =>
      {
         byte[] buffer = new byte[1024];
         int totalZeroBytesRead = 0;
         using (var fileStream = new FileStream(
            path, FileMode.Open, FileAccess.Read, FileShare.Read, 0x1000, true))
         {
            int bytesRead = 0;
            do
            {
               // Asynchronously read from the file stream.
               bytesRead = await fileStream.ReadAsync(buffer, 0, buffer.Length);
               totalZeroBytesRead += buffer.Count(b => b == 0);
            } while (bytesRead > 0);
         }

         return totalZeroBytesRead;
      });
   }
}
```

 Although you can provide a lambda expression to a `System.Threading.Tasks.Dataflow.TransformBlock`2` object, this example uses `System.Func`2` to enable other code to use the `CountBytes` method. The `System.Threading.Tasks.Dataflow.ActionBlock`1` object uses a lambda expression because the work to be performed is specific to this task and is not likely to be useful from other code. For more information about how lambda expressions work in the Task Parallel Library, see Lambda Expressions in PLINQ and TPL.

 The section Summary of Delegate Types in the Dataflow document summarizes the delegate types that you can provide to `System.Threading.Tasks.Dataflow.ActionBlock`1`, `System.Threading.Tasks.Dataflow.TransformBlock`2`, and `System.Threading.Tasks.Dataflow.TransformManyBlock`2` objects. The table also specifies whether the delegate type operates synchronously or asynchronously.
