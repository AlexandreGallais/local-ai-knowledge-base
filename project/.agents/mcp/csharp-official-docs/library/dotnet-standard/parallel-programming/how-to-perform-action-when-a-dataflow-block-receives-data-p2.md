---
title: "How to: Perform Action When a Dataflow Block Receives Data (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-perform-action-when-a-dataflow-block-receives-data.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Perform Action When a Dataflow Block Receives Data (part 2 of 2)

## Robust Programming

 This example provides a delegate of type `System.Func`2` to the `System.Threading.Tasks.Dataflow.TransformBlock`2` object to perform the task of the dataflow block synchronously. To enable the dataflow block to behave asynchronously, provide a delegate of type `Func<T, Task<TResult>>` to the dataflow block. When a dataflow block behaves asynchronously, the task of the dataflow block is complete only when the returned `System.Threading.Tasks.Task`1` object finishes. The following example modifies the `CountBytes` method and uses the async and await operators (Async and Await in Visual Basic) to asynchronously compute the total number of bytes that are zero in the provided file. The `System.IO.FileStream.ReadAsync*` method performs file read operations asynchronously.

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

 You can also use asynchronous lambda expressions to perform action in an execution dataflow block. The following example modifies the `System.Threading.Tasks.Dataflow.TransformBlock`2` object that is used in the previous example so that it uses a lambda expression to perform the work asynchronously.

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

## See also

- Dataflow
