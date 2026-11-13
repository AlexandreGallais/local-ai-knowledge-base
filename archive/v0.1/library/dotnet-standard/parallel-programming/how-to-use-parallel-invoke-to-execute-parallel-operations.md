---
title: "How to: Use Parallel.Invoke to Execute Parallel Operations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-use-parallel-invoke-to-execute-parallel-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use Parallel.Invoke to Execute Parallel Operations

This example shows how to parallelize operations by using `System.Threading.Tasks.Parallel.Invoke*` in the Task Parallel Library. Three operations are performed on a shared data source. The operations can be executed in parallel in a straightforward manner, because none of them modifies the source.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you aren't familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

## Example

```csharp
namespace ParallelTasks
{
    using System;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Net;

    class ParallelInvoke
    {
        static void Main()
        {
            // Retrieve Goncharov's "Oblomov" from Gutenberg.org.
            string[] words = CreateWordArray(@"http://www.gutenberg.org/files/54700/54700-0.txt");

            // Perform three tasks in parallel on the source array
            Parallel.Invoke(
                () =>
                {
                    Console.WriteLine("Begin first task...");
                    GetLongestWord(words);
                },  // close first Action

                () =>
                {
                    Console.WriteLine("Begin second task...");
                    GetMostCommonWords(words);
                }, //close second Action

                () =>
                {
                    Console.WriteLine("Begin third task...");
                    GetCountForWord(words, "sleep");
                } //close third Action
            ); //close parallel.invoke

            Console.WriteLine("Returned from Parallel.Invoke");

            Console.WriteLine("Press any key to exit");
            Console.ReadKey();
        }

        private static void GetCountForWord(string[] words, string term)
        {
            var findWord = from word in words
                where word.ToUpper().Contains(term.ToUpper())
                select word;

            Console.WriteLine($@"Task 3 -- The word ""{term}"" occurs {findWord.Count()} times.");
        }

        private static void GetMostCommonWords(string[] words)
        {
            var frequencyOrder = from word in words
                where word.Length > 6
                group word by word into g
                orderby g.Count() descending
                select g.Key;

            var commonWords = frequencyOrder.Take(10);

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Task 2 -- The most common words are:");
            foreach (var v in commonWords)
            {
                sb.AppendLine("  " + v);
            }
            Console.WriteLine(sb.ToString());
        }

        private static string GetLongestWord(string[] words)
        {
            var longestWord = (from w in words
                orderby w.Length descending
                select w).First();

            Console.WriteLine($"Task 1 -- The longest word is {longestWord}.");
            return longestWord;
        }

        // An http request performed synchronously for simplicity.
        static string[] CreateWordArray(string uri)
        {
            Console.WriteLine($"Retrieving from {uri}");

            // Download a web page the easy way.
            string s = new WebClient().DownloadString(uri);

            // Separate string into an array of words, removing some common punctuation.
            return s.Split(
                new char[] { ' ', '\u000A', ',', '.', ';', ':', '-', '_', '/' },
                StringSplitOptions.RemoveEmptyEntries);
        }
    }
}
//        The example displays output like the following:
//              Retrieving from http://www.gutenberg.org/files/54700/54700-0.txt
//              Begin first task...
//              Begin second task...
//              Begin third task...
//              Task 2 -- The most common words are:
//              Oblomov
//              himself
//              Schtoltz
//              Gutenberg
//              Project
//              another
//              thought
//              Oblomov's
//              nothing
//              replied
//
//              Task 1 -- The longest word is incomprehensible.
//              Task 3 -- The word "sleep" occurs 57 times.
//              Returned from Parallel.Invoke
//              Press any key to exit
```

With `System.Threading.Tasks.Parallel.Invoke*`, you simply express which actions you want to run concurrently, and the runtime handles all thread scheduling details, including scaling automatically to the number of cores on the host computer.

This example parallelizes the operations, not the data. As an alternate approach, you can parallelize the LINQ queries by using PLINQ and run the queries sequentially. Alternatively, you could parallelize the data by using PLINQ. Another option is to parallelize both the queries and the tasks. Although the resulting overhead might degrade performance on host computers with relatively few processors, it scales better on computers with many processors.

## Compile the Code

Copy and paste the entire example into a Microsoft Visual Studio project and press `F5`.

## See also

- Parallel Programming
- How to: Cancel a Task and Its Children
- Parallel LINQ (PLINQ)
