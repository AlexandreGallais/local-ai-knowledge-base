---
title: "Data Parallelism (Task Parallel Library)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/data-parallelism-task-parallel-library.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Data Parallelism (Task Parallel Library)

*Data parallelism* refers to scenarios in which the same operation is performed concurrently (that is, in parallel) on elements in a source collection or array. In data parallel operations, the source collection is partitioned so that multiple threads can operate on different segments concurrently.

 The Task Parallel Library (TPL) supports data parallelism through the `System.Threading.Tasks.Parallel` class. This class provides method-based parallel implementations of for and foreach loops (`For` and `For Each` in Visual Basic). You write the loop logic for a `System.Threading.Tasks.Parallel.For*` or `System.Threading.Tasks.Parallel.ForEach*` loop much as you would write a sequential loop. You do not have to create threads or queue work items. In basic loops, you do not have to take locks. The TPL handles all the low-level work for you. For in-depth information about the use of `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*`, download the document Patterns for Parallel Programming: Understanding and Applying Parallel Patterns with the .NET Framework 4. The following code example shows a simple `foreach` loop and its parallel equivalent.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you are not familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

 ```csharp
﻿namespace TPL
{
    using System;
    using System.Threading.Tasks;

    class Program
    {
        static void Main(string[] args)
        {
            //  WaitOnTasks();
            //  HandleExceptions();
            //  RethrowAllExceptions();

            Console.ReadKey();
        }

        class Test
        {
            public string Name { get; set; }
            public double Number { get; set; }
        }

        static string[] GetValidExtensions(string path)
        {
            if (path == @"C:\")
                throw new ArgumentException("The system root is not a valid path.");

            return new string[10];
        }
    }

    // 14 was deleted, probably because it duplicated cancellation snippet

    // 15 was moved to tpl_cancellation and so number is available in tpl

    public class TreeWalk
    {
        static void Main()
        {
            Tree<MyClass> tree = new Tree<MyClass>();

            // ...populate tree (left as an exercise)

            // Define the Action to perform on each node.
            Action<MyClass> myAction = x => Console.WriteLine($"{x.Name} : {x.Number}");

            // Traverse the tree with parallel tasks.
            DoTree(tree, myAction);
        }

        public class MyClass
        {
            public string Name { get; set; }
            public int Number { get; set; }
        }
        public class Tree<T>
        {
            public Tree<T> Left;
            public Tree<T> Right;
            public T Data;
        }

        // By using tasks explicitly.
        public static void DoTree<T>(Tree<T> tree, Action<T> action)
        {
            if (tree == null) return;
            var left = Task.Factory.StartNew(() => DoTree(tree.Left, action));
            var right = Task.Factory.StartNew(() => DoTree(tree.Right, action));
            action(tree.Data);

            try
            {
                Task.WaitAll(left, right);
            }
            catch (AggregateException)
            {
                //handle exceptions here
            }
        }

        // By using Parallel.Invoke
        public static void DoTree2<T>(Tree<T> tree, Action<T> action)
        {
            if (tree == null) return;
            Parallel.Invoke(
                () => DoTree2(tree.Left, action),
                () => DoTree2(tree.Right, action),
                () => action(tree.Data)
            );
        }
    }

    //not used
    public class OrderPreservation
    {
    }

    class InvokeDemo
    {

        static void MethodA() { }
        static void MethodB() { }
        static void MethodC() { }
        static void DoSomeWork(int i) { }
        static void Process(int i) { }
        static void DoSomeWork() { }
        static void DoSomeOtherWork() { }

        static int[] sourceCollection = new int[10] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

        static void Main()
        {

            int startIndex = 0;
            int endIndex = 10;
            Parallel.For(startIndex, endIndex, (currentIndex) => DoSomeWork(currentIndex));

            Parallel.Invoke(
                        () => MethodA(),
                        () => MethodB(),
                        () => MethodC());

            // Sequential version
            foreach (var item in sourceCollection)
            {
                Process(item);
            }

            // Parallel equivalent
            Parallel.ForEach(sourceCollection, item => Process(item));

            Parallel.Invoke(() => DoSomeWork(), () => DoSomeOtherWork());
        }
    }

    //}
}
```

 When a parallel loop runs, the TPL partitions the data source so that the loop can operate on multiple parts concurrently. Behind the scenes, the Task Scheduler partitions the task based on system resources and workload. When possible, the scheduler redistributes work among multiple threads and processors if the workload becomes unbalanced.

> **Note:**
> You can also supply your own custom partitioner or scheduler. For more information, see Custom Partitioners for PLINQ and TPL and Task Schedulers.

 Both the `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*` methods have several overloads that let you stop or break loop execution, monitor the state of the loop on other threads, maintain thread-local state, finalize thread-local objects, control the degree of concurrency, and so on. The helper types that enable this functionality include `System.Threading.Tasks.ParallelLoopState`, `System.Threading.Tasks.ParallelOptions`, `System.Threading.Tasks.ParallelLoopResult`, `System.Threading.CancellationToken`, and `System.Threading.CancellationTokenSource`.

 For more information, see Patterns for Parallel Programming: Understanding and Applying Parallel Patterns with the .NET Framework 4.

 Data parallelism with declarative, or query-like, syntax is supported by PLINQ. For more information, see Parallel LINQ (PLINQ).

## Related Topics

|Title|Description|
|-----------|-----------------|
|How to: Write a Simple Parallel.For Loop|Describes how to write a `System.Threading.Tasks.Parallel.For*` loop over any array or indexable `System.Collections.Generic.IEnumerable`1` source collection.|
|How to: Write a Simple Parallel.ForEach Loop|Describes how to write a `System.Threading.Tasks.Parallel.ForEach*` loop over any `System.Collections.Generic.IEnumerable`1` source collection.|
|How to: Stop or Break from a Parallel.For Loop|Describes how to stop or break from a parallel loop so that all threads are informed of the action.|
|How to: Write a Parallel.For Loop with Thread-Local Variables|Describes how to write a `System.Threading.Tasks.Parallel.For*` loop in which each thread maintains a private variable that is not visible to any other threads, and how to synchronize the results from all threads when the loop completes.|
|How to: Write a Parallel.ForEach Loop with Partition-Local Variables|Describes how to write a `System.Threading.Tasks.Parallel.ForEach*` loop in which each thread maintains a private variable that is not visible to any other threads, and how to synchronize the results from all threads when the loop completes.|
|How to: Cancel a Parallel.For or ForEach Loop|Describes how to cancel a parallel loop by using a `System.Threading.CancellationToken`|
|How to: Speed Up Small Loop Bodies|Describes one way to speed up execution when a loop body is very small.|
|Task Parallel Library (TPL)|Provides an overview of the Task Parallel Library.|
|Parallel Programming|Introduces Parallel Programming in the .NET Framework.|

## See also

- Parallel Programming
