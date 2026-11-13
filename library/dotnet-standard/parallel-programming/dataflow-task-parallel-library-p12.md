---
title: "Dataflow (Task Parallel Library) (part 12 of 15)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/dataflow-task-parallel-library.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dataflow (Task Parallel Library) (part 12 of 15)

### Grouping Blocks

 Grouping blocks combine data from one or more sources and under various constraints. The TPL Dataflow Library provides three join block types: `System.Threading.Tasks.Dataflow.BatchBlock`1`, `System.Threading.Tasks.Dataflow.JoinBlock`2`, and `System.Threading.Tasks.Dataflow.BatchedJoinBlock`2`.

#### BatchBlock\<T>

 The `System.Threading.Tasks.Dataflow.BatchBlock`1` class combines sets of input data, which are known as batches, into arrays of output data. You specify the size of each batch when you create a `System.Threading.Tasks.Dataflow.BatchBlock`1` object. When the `System.Threading.Tasks.Dataflow.BatchBlock`1` object receives the specified count of input elements, it asynchronously propagates out an array that contains those elements. If a `System.Threading.Tasks.Dataflow.BatchBlock`1` object is set to the completed state but doesn't contain enough elements to form a batch, it propagates out a final array that contains the remaining input elements.

 The `System.Threading.Tasks.Dataflow.BatchBlock`1` class operates in either *greedy* or *non-greedy* mode. In greedy mode, which is the default, a `System.Threading.Tasks.Dataflow.BatchBlock`1` object accepts every message that it is offered and propagates out an array after it receives the specified count of elements. In non-greedy mode, a `System.Threading.Tasks.Dataflow.BatchBlock`1` object postpones all incoming messages until enough sources have offered messages to the block to form a batch. Greedy mode typically performs better than non-greedy mode because it requires less processing overhead. However, you can use non-greedy mode when you must coordinate consumption from multiple sources in an atomic fashion. Specify non-greedy mode by setting `System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions.Greedy*` to `False` in the `dataflowBlockOptions` parameter in the `System.Threading.Tasks.Dataflow.BatchBlock`1.#ctor*` constructor.

 The following basic example posts several `System.Int32` values to a `System.Threading.Tasks.Dataflow.BatchBlock`1` object that holds ten elements in a batch. To guarantee that all values propagate out of the `System.Threading.Tasks.Dataflow.BatchBlock`1`, this example calls the `System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*` method. The `System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*` method sets the `System.Threading.Tasks.Dataflow.BatchBlock`1` object to the completed state, and therefore, the `System.Threading.Tasks.Dataflow.BatchBlock`1` object propagates out any remaining elements as a final batch.

 ```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Overview
{
   class Program
   {
      static void ShowBufferBlock()
      {
         // Create a BufferBlock<int> object.
         var bufferBlock = new BufferBlock<int>();

         // Post several messages to the block.
         for (int i = 0; i < 3; i++)
         {
            bufferBlock.Post(i);
         }

         // Receive the messages back from the block.
         for (int i = 0; i < 3; i++)
         {
            Console.WriteLine(bufferBlock.Receive());
         }

         /* Output:
            0
            1
            2
          */
      }

      static void ShowBroadcastBlock()
      {
         // Create a BroadcastBlock<double> object.
         var broadcastBlock = new BroadcastBlock<double>(null);

         // Post a message to the block.
         broadcastBlock.Post(Math.PI);

         // Receive the messages back from the block several times.
         for (int i = 0; i < 3; i++)
         {
            Console.WriteLine(broadcastBlock.Receive());
         }

         /* Output:
            3.14159265358979
            3.14159265358979
            3.14159265358979
          */
      }

      static void ShowWriteOnceBlock()
      {
         // Create a WriteOnceBlock<string> object.
         var writeOnceBlock = new WriteOnceBlock<string>(null);

         // Post several messages to the block in parallel. The first
         // message to be received is written to the block.
         // Subsequent messages are discarded.
         Parallel.Invoke(
            () => writeOnceBlock.Post("Message 1"),
            () => writeOnceBlock.Post("Message 2"),
            () => writeOnceBlock.Post("Message 3"));

         // Receive the message from the block.
         Console.WriteLine(writeOnceBlock.Receive());

         /* Sample output:
            Message 2
          */
      }

      static void ShowActionBlock()
      {
         // Create an ActionBlock<int> object that prints values
         // to the console.
         var actionBlock = new ActionBlock<int>(n => Console.WriteLine(n));

         // Post several messages to the block.
         for (int i = 0; i < 3; i++)
         {
            actionBlock.Post(i * 10);
         }

         // Set the block to the completed state and wait for all
         // tasks to finish.
         actionBlock.Complete();
         actionBlock.Completion.Wait();

         /* Output:
            0
            10
            20
          */
      }

      static void ShowTransformBlock()
      {
         // Create a TransformBlock<int, double> object that
         // computes the square root of its input.
         var transformBlock = new TransformBlock<int, double>(n => Math.Sqrt(n));

         // Post several messages to the block.
         transformBlock.Post(10);
         transformBlock.Post(20);
         transformBlock.Post(30);

         // Read the output messages from the block.
         for (int i = 0; i < 3; i++)
         {
            Console.WriteLine(transformBlock.Receive());
         }

         /* Output:
            3.16227766016838
            4.47213595499958
            5.47722557505166
          */
      }

      static void ShowTransformManyBlock()
      {
         // Create a TransformManyBlock<string, char> object that splits
         // a string into its individual characters.
         var transformManyBlock = new TransformManyBlock<string, char>(
            s => s.ToCharArray());

         // Post two messages to the first block.
         transformManyBlock.Post("Hello");
         transformManyBlock.Post("World");

         // Receive all output values from the block.
         for (int i = 0; i < ("Hello" + "World").Length; i++)
         {
            Console.WriteLine(transformManyBlock.Receive());
         }

         /* Output:
            H
            e
            l
            l
            o
            W
            o
            r
            l
            d
          */
      }

      static void ShowBatchBlock()
      {
         // Create a BatchBlock<int> object that holds ten
         // elements per batch.
         var batchBlock = new BatchBlock<int>(10);

         // Post several values to the block.
         for (int i = 0; i < 13; i++)
         {
            batchBlock.Post(i);
         }
         // Set the block to the completed state. This causes
         // the block to propagate out any remaining
         // values as a final batch.
         batchBlock.Complete();

         // Print the sum of both batches.

         Console.WriteLine($"The sum of the elements in batch 1 is {batchBlock.Receive().Sum()}.");

         Console.WriteLine($"The sum of the elements in batch 2 is {batchBlock.Receive().Sum()}.");

         /* Output:
            The sum of the elements in batch 1 is 45.
            The sum of the elements in batch 2 is 33.
          */
      }

      static void ShowJoinBlock()
      {
         // Create a JoinBlock<int, int, char> object that requires
         // two numbers and an operator.
         var joinBlock = new JoinBlock<int, int, char>();

         // Post two values to each target of the join.

         joinBlock.Target1.Post(3);
         joinBlock.Target1.Post(6);

         joinBlock.Target2.Post(5);
         joinBlock.Target2.Post(4);

         joinBlock.Target3.Post('+');
         joinBlock.Target3.Post('-');

         // Receive each group of values and apply the operator part
         // to the number parts.

         for (int i = 0; i < 2; i++)
         {
            var data = joinBlock.Receive();
            switch (data.Item3)
            {
               case '+':
                  Console.WriteLine($"{data.Item1} + {data.Item2} = {data.Item1 + data.Item2}");
                  break;
               case '-':
                  Console.WriteLine($"{data.Item1} - {data.Item2} = {data.Item1 - data.Item2}");
                  break;
               default:
                  Console.WriteLine($"Unknown operator '{data.Item3}'.");
                  break;
            }
         }

         /* Output:
            3 + 5 = 8
            6 - 4 = 2
          */
      }

      static void ShowBatchedJoinBlock()
      {
         // For demonstration, create a Func<int, int> that
         // returns its argument, or throws ArgumentOutOfRangeException
         // if the argument is less than zero.
         Func<int, int> DoWork = n =>
         {
            if (n < 0)
               throw new ArgumentOutOfRangeException();
            return n;
         };

         // Create a BatchedJoinBlock<int, Exception> object that holds
         // seven elements per batch.
         var batchedJoinBlock = new BatchedJoinBlock<int, Exception>(7);

         // Post several items to the block.
         foreach (int i in new int[] { 5, 6, -7, -22, 13, 55, 0 })
         {
            try
            {
               // Post the result of the worker to the
               // first target of the block.
               batchedJoinBlock.Target1.Post(DoWork(i));
            }
            catch (ArgumentOutOfRangeException e)
            {
               // If an error occurred, post the Exception to the
               // second target of the block.
               batchedJoinBlock.Target2.Post(e);
            }
         }

         // Read the results from the block.
         var results = batchedJoinBlock.Receive();

         // Print the results to the console.

         // Print the results.
         foreach (int n in results.Item1)
         {
            Console.WriteLine(n);
         }
         // Print failures.
         foreach (Exception e in results.Item2)
         {
            Console.WriteLine(e.Message);
         }

         /* Output:
            5
            6
            13
            55
            0
            Specified argument was out of the range of valid values.
            Specified argument was out of the range of valid values.
          */
      }

      static void ShowCompletion()
      {
         // Create an ActionBlock<int> object that prints its input
         // and throws ArgumentOutOfRangeException if the input
         // is less than zero.
         var throwIfNegative = new ActionBlock<int>(n =>
         {
            Console.WriteLine($"n = {n}");
            if (n < 0)
            {
               throw new ArgumentOutOfRangeException();
            }
         });

         // Post values to the block.
         throwIfNegative.Post(0);
         throwIfNegative.Post(-1);
         throwIfNegative.Post(1);
         throwIfNegative.Post(-2);
         throwIfNegative.Complete();

         // Wait for completion in a try/catch block.
         try
         {
            throwIfNegative.Completion.Wait();
         }
         catch (AggregateException ae)
         {
            // If an unhandled exception occurs during dataflow processing, all
            // exceptions are propagated through an AggregateException object.
            ae.Handle(e =>
            {
               Console.WriteLine($"Encountered {e.GetType().Name}: {e.Message}");
               return true;
            });
         }

         /* Output:
         n = 0
         n = -1
         Encountered ArgumentOutOfRangeException: Specified argument was out of the range
          of valid values.
         */
      }

      static void ShowCompletionStatus()
      {
         // Create an ActionBlock<int> object that prints its input
         // and throws ArgumentOutOfRangeException if the input
         // is less than zero.
         var throwIfNegative = new ActionBlock<int>(n =>
         {
            Console.WriteLine($"n = {n}");
            if (n < 0)
            {
               throw new ArgumentOutOfRangeException();
            }
         });

         // Create a continuation task that prints the overall
         // task status to the console when the block finishes.
         throwIfNegative.Completion.ContinueWith(task =>
         {
            Console.WriteLine($"The status of the completion task is '{task.Status}'.");
         });

         // Post values to the block.
         throwIfNegative.Post(0);
         throwIfNegative.Post(-1);
         throwIfNegative.Post(1);
         throwIfNegative.Post(-2);
         throwIfNegative.Complete();

         // Wait for completion in a try/catch block.
         try
         {
            throwIfNegative.Completion.Wait();
         }
         catch (AggregateException ae)
         {
            // If an unhandled exception occurs during dataflow processing, all
            // exceptions are propagated through an AggregateException object.
            ae.Handle(e =>
            {
               Console.WriteLine($"Encountered {e.GetType().Name}: {e.Message}");
               return true;
            });
         }

         /* Output:
         n = 0
         n = -1
         The status of the completion task is 'Faulted'.
         Encountered ArgumentOutOfRangeException: Specified argument was out of the range
          of valid values.
         */
      }

      static void Main(string[] args)
      {
         //ShowBufferBlock();
         //ShowBroadcastBlock();
         //ShowWriteOnceBlock();
         //ShowActionBlock();
         //ShowTransformBlock();
         //ShowTransformManyBlock();
         //ShowBatchBlock();
         //ShowJoinBlock();
         //ShowBatchedJoinBlock();

         //ShowCompletion();
         //ShowCompletionStatus();
      }
   }
}
```

 For a complete example that uses `System.Threading.Tasks.Dataflow.BatchBlock`1` to improve the efficiency of database insert operations, see Walkthrough: Using BatchBlock and BatchedJoinBlock to Improve Efficiency.

#### JoinBlock\<T1, T2, ...>
