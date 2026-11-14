---
title: "Task-based asynchronous programming - .NET (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming

The Task Parallel Library (TPL) is based on the concept of a *task*, which represents an asynchronous operation. In some ways, a task resembles a thread or `System.Threading.ThreadPool` work item but at a higher level of abstraction. The term *task parallelism* refers to one or more independent tasks running concurrently. Tasks provide two primary benefits:

- More efficient and more scalable use of system resources.

     Behind the scenes, tasks are queued to the `System.Threading.ThreadPool`, which has been enhanced with algorithms that determine and adjust to the number of threads. These algorithms provide load balancing to maximize throughput. This process makes tasks relatively lightweight, and you can create many of them to enable fine-grained parallelism.

- More programmatic control than is possible with a thread or work item.

     Tasks and the framework built around them provide a rich set of APIs that support waiting, cancellation, continuations, robust exception handling, detailed status, custom scheduling, and more.

For both reasons, TPL is the preferred API for writing multi-threaded, asynchronous, and parallel code in .NET.

## Creating and running tasks implicitly

The `System.Threading.Tasks.Parallel.Invoke*` method provides a convenient way to run any number of arbitrary statements concurrently. Just pass in an `System.Action` delegate for each item of work. The easiest way to create these delegates is to use lambda expressions. The lambda expression can either call a named method or provide the code inline. The following example shows a basic `System.Threading.Tasks.Parallel.Invoke*` call that creates and starts two tasks that run concurrently. The first task is represented by a lambda expression that calls a method named `DoSomeWork`, and the second task is represented by a lambda expression that calls a method named `DoSomeOtherWork`.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you aren't familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

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

> **Note:**
> The number of `System.Threading.Tasks.Task` instances that are created behind the scenes by `System.Threading.Tasks.Parallel.Invoke*` isn't necessarily equal to the number of delegates that are provided. The TPL might employ various optimizations, especially with large numbers of delegates.

For more information, see How to: Use Parallel.Invoke to Execute Parallel Operations.

For greater control over task execution or to return a value from the task, you must work with `System.Threading.Tasks.Task` objects more explicitly.
