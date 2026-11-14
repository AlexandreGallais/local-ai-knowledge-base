---
title: "How to: Return a Value from a Task"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-return-a-value-from-a-task.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Return a Value from a Task

This example shows how to use the `System.Threading.Tasks.Task`1` class to return a value from the `System.Threading.Tasks.Task`1.Result` property. To use this example, you must ensure that the *C:\Users\Public\Pictures\Sample Pictures* directory exists and that it contains files.

## Example

 ```csharp
using System;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        // Return a value type with a lambda expression
        Task<int> task1 = Task<int>.Factory.StartNew(() => 1);
        int i = task1.Result;

        // Return a named reference type with a multi-line statement lambda.
        Task<Test> task2 = Task<Test>.Factory.StartNew(() =>
        {
            string s = ".NET";
            double d = 4.0;
            return new Test { Name = s, Number = d };
        });
        Test test = task2.Result;

        // Return an array produced by a PLINQ query
        Task<string[]> task3 = Task<string[]>.Factory.StartNew(() =>
        {
            string path = @"C:\Users\Public\Pictures\Sample Pictures\";
            string[] files = System.IO.Directory.GetFiles(path);

            string[] result = (from file in files.AsParallel()
                          let info = new System.IO.FileInfo(file)
                          where info.Extension == ".jpg"
                          select file).ToArray();

            return result;
        });

        foreach (string name in task3.Result)
            Console.WriteLine(name);
    }
    class Test
    {
        public string Name { get; set; }
        public double Number { get; set; }
    }
}
```

 The `System.Threading.Tasks.Task`1.Result` property blocks the calling thread until the task finishes.

To see how to pass the result of a `System.Threading.Tasks.Task`1` class to a continuation task, see Chaining Tasks by Using Continuation Tasks.

## See also

- Task-based Asynchronous Programming
- Lambda Expressions in PLINQ and TPL
