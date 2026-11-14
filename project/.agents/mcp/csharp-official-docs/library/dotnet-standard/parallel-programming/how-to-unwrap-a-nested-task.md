---
title: "How to: Unwrap a Nested Task (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-unwrap-a-nested-task.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Unwrap a Nested Task

You can return a task from a method, and then wait on or continue from that task, as shown in the following example:

 ```csharp
﻿using System;
using System.Threading.Tasks;

// How to: Unwrap a Nested Task
class IntroSnippets
{
    static Task<string> DoWorkAsync() => Task<string>.Factory.StartNew(() =>
                                              {
                                                  //...
                                                  return "Work completed.";
                                              });

    static void StartTask()
    {
        Task<string> t = DoWorkAsync();
        t.Wait();
        Console.WriteLine(t.Result);
    }

    static void Main()
    {
        // Note the type of t and t2.
        Task<Task<string>> t = Task.Factory.StartNew(DoWorkAsync);
        Task<Task<string>> t2 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync());

        // Outputs: System.Threading.Tasks.Task`1[System.String]
        Console.WriteLine(t.Result);

        // Unwrap the inner task.
        Task<string> t3 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync()).Unwrap();

        // Outputs "More work completed."
        Console.WriteLine(t.Result);

        Console.ReadKey();
    }

    static Task<string> DoMoreWorkAsync() => Task<string>.Factory.StartNew(() =>
                                                  {
                                                      //...
                                                      return "More work completed.";
                                                  });
}

namespace Unwrap
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    class Program
    {
        static void Main()
        {
            // An arbitrary threshold value.
            byte threshold = 0x40;

            // data is a Task<byte[]>
            Task<byte[]> data = Task<byte[]>.Factory.StartNew(GetData);

            // We want to return a task so that we can
            // continue from it later in the program.
            // Without Unwrap: stepTwo is a Task<Task<byte[]>>
            // With Unwrap: stepTwo is a Task<byte[]>
            Task<byte> stepTwo = data.ContinueWith((antecedent) =>
                {
                    return Task<byte>.Factory.StartNew(() => Compute(antecedent.Result));
                })
                .Unwrap();

            // Without Unwrap: antecedent.Result = Task<byte>
            // and the following method will not compile.
            // With Unwrap: antecedent.Result = byte and
            // we can work directly with the result of the Compute method.
            Task<Task> lastStep = stepTwo.ContinueWith((antecedent) =>
                {
                    if (antecedent.Result >= threshold)
                    {
                        return Task.Factory.StartNew(() =>
                            Console.WriteLine($"Program complete. Final = 0x{stepTwo.Result:x} threshold = 0x{threshold:x}"));
                    }
                    else
                    {
                        return DoSomeOtherAsynchronousWork(stepTwo.Result, threshold);
                    }
                });

            lastStep.Wait();
            Console.WriteLine("Press any key");
            Console.ReadKey();
        }

        private static byte[] GetData()
        {
            Random rand = new();
            byte[] bytes = new byte[64];
            rand.NextBytes(bytes);
            return bytes;
        }

        static Task DoSomeOtherAsynchronousWork(int i, byte b2)
        {
            return Task.Factory.StartNew(() =>
                {
                    Thread.SpinWait(500000);
                    Console.WriteLine("Doing more work. Value was <= threshold");
                });
        }

        static byte Compute(byte[] data)
        {
            byte final = 0;
            foreach (byte item in data)
            {
                final ^= item;
                Console.WriteLine($"{final:x}");
            }
            Console.WriteLine("Done computing");
            return final;
        }
    }
}
```

 In the previous example, the `System.Threading.Tasks.Task`1.Result` property is of type `string` (`String` in Visual Basic).

 However, in some scenarios, you might want to create a task within another task, and then return the nested task. In this case, the `TResult` of the enclosing task is itself a task. In the following example, the Result property is a `Task<Task<string>>` in C# or `Task(Of Task(Of String))` in Visual Basic.

 ```csharp
﻿using System;
using System.Threading.Tasks;

// How to: Unwrap a Nested Task
class IntroSnippets
{
    static Task<string> DoWorkAsync() => Task<string>.Factory.StartNew(() =>
                                              {
                                                  //...
                                                  return "Work completed.";
                                              });

    static void StartTask()
    {
        Task<string> t = DoWorkAsync();
        t.Wait();
        Console.WriteLine(t.Result);
    }

    static void Main()
    {
        // Note the type of t and t2.
        Task<Task<string>> t = Task.Factory.StartNew(DoWorkAsync);
        Task<Task<string>> t2 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync());

        // Outputs: System.Threading.Tasks.Task`1[System.String]
        Console.WriteLine(t.Result);

        // Unwrap the inner task.
        Task<string> t3 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync()).Unwrap();

        // Outputs "More work completed."
        Console.WriteLine(t.Result);

        Console.ReadKey();
    }

    static Task<string> DoMoreWorkAsync() => Task<string>.Factory.StartNew(() =>
                                                  {
                                                      //...
                                                      return "More work completed.";
                                                  });
}

namespace Unwrap
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    class Program
    {
        static void Main()
        {
            // An arbitrary threshold value.
            byte threshold = 0x40;

            // data is a Task<byte[]>
            Task<byte[]> data = Task<byte[]>.Factory.StartNew(GetData);

            // We want to return a task so that we can
            // continue from it later in the program.
            // Without Unwrap: stepTwo is a Task<Task<byte[]>>
            // With Unwrap: stepTwo is a Task<byte[]>
            Task<byte> stepTwo = data.ContinueWith((antecedent) =>
                {
                    return Task<byte>.Factory.StartNew(() => Compute(antecedent.Result));
                })
                .Unwrap();

            // Without Unwrap: antecedent.Result = Task<byte>
            // and the following method will not compile.
            // With Unwrap: antecedent.Result = byte and
            // we can work directly with the result of the Compute method.
            Task<Task> lastStep = stepTwo.ContinueWith((antecedent) =>
                {
                    if (antecedent.Result >= threshold)
                    {
                        return Task.Factory.StartNew(() =>
                            Console.WriteLine($"Program complete. Final = 0x{stepTwo.Result:x} threshold = 0x{threshold:x}"));
                    }
                    else
                    {
                        return DoSomeOtherAsynchronousWork(stepTwo.Result, threshold);
                    }
                });

            lastStep.Wait();
            Console.WriteLine("Press any key");
            Console.ReadKey();
        }

        private static byte[] GetData()
        {
            Random rand = new();
            byte[] bytes = new byte[64];
            rand.NextBytes(bytes);
            return bytes;
        }

        static Task DoSomeOtherAsynchronousWork(int i, byte b2)
        {
            return Task.Factory.StartNew(() =>
                {
                    Thread.SpinWait(500000);
                    Console.WriteLine("Doing more work. Value was <= threshold");
                });
        }

        static byte Compute(byte[] data)
        {
            byte final = 0;
            foreach (byte item in data)
            {
                final ^= item;
                Console.WriteLine($"{final:x}");
            }
            Console.WriteLine("Done computing");
            return final;
        }
    }
}
```

 Although it is possible to write code to unwrap the outer task and retrieve the original task and its `System.Threading.Tasks.Task`1.Result` property, such code is not easy to write because you must handle exceptions and also cancellation requests. In this situation, we recommend that you use one of the `System.Threading.Tasks.TaskExtensions.Unwrap*` extension methods, as shown in the following example.

 ```csharp
﻿using System;
using System.Threading.Tasks;

// How to: Unwrap a Nested Task
class IntroSnippets
{
    static Task<string> DoWorkAsync() => Task<string>.Factory.StartNew(() =>
                                              {
                                                  //...
                                                  return "Work completed.";
                                              });

    static void StartTask()
    {
        Task<string> t = DoWorkAsync();
        t.Wait();
        Console.WriteLine(t.Result);
    }

    static void Main()
    {
        // Note the type of t and t2.
        Task<Task<string>> t = Task.Factory.StartNew(DoWorkAsync);
        Task<Task<string>> t2 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync());

        // Outputs: System.Threading.Tasks.Task`1[System.String]
        Console.WriteLine(t.Result);

        // Unwrap the inner task.
        Task<string> t3 = DoWorkAsync().ContinueWith((s) => DoMoreWorkAsync()).Unwrap();

        // Outputs "More work completed."
        Console.WriteLine(t.Result);

        Console.ReadKey();
    }

    static Task<string> DoMoreWorkAsync() => Task<string>.Factory.StartNew(() =>
                                                  {
                                                      //...
                                                      return "More work completed.";
                                                  });
}

namespace Unwrap
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    class Program
    {
        static void Main()
        {
            // An arbitrary threshold value.
            byte threshold = 0x40;

            // data is a Task<byte[]>
            Task<byte[]> data = Task<byte[]>.Factory.StartNew(GetData);

            // We want to return a task so that we can
            // continue from it later in the program.
            // Without Unwrap: stepTwo is a Task<Task<byte[]>>
            // With Unwrap: stepTwo is a Task<byte[]>
            Task<byte> stepTwo = data.ContinueWith((antecedent) =>
                {
                    return Task<byte>.Factory.StartNew(() => Compute(antecedent.Result));
                })
                .Unwrap();

            // Without Unwrap: antecedent.Result = Task<byte>
            // and the following method will not compile.
            // With Unwrap: antecedent.Result = byte and
            // we can work directly with the result of the Compute method.
            Task<Task> lastStep = stepTwo.ContinueWith((antecedent) =>
                {
                    if (antecedent.Result >= threshold)
                    {
                        return Task.Factory.StartNew(() =>
                            Console.WriteLine($"Program complete. Final = 0x{stepTwo.Result:x} threshold = 0x{threshold:x}"));
                    }
                    else
                    {
                        return DoSomeOtherAsynchronousWork(stepTwo.Result, threshold);
                    }
                });

            lastStep.Wait();
            Console.WriteLine("Press any key");
            Console.ReadKey();
        }

        private static byte[] GetData()
        {
            Random rand = new();
            byte[] bytes = new byte[64];
            rand.NextBytes(bytes);
            return bytes;
        }

        static Task DoSomeOtherAsynchronousWork(int i, byte b2)
        {
            return Task.Factory.StartNew(() =>
                {
                    Thread.SpinWait(500000);
                    Console.WriteLine("Doing more work. Value was <= threshold");
                });
        }

        static byte Compute(byte[] data)
        {
            byte final = 0;
            foreach (byte item in data)
            {
                final ^= item;
                Console.WriteLine($"{final:x}");
            }
            Console.WriteLine("Done computing");
            return final;
        }
    }
}
```

 The `System.Threading.Tasks.TaskExtensions.Unwrap*` methods can be used to transform any `Task<Task>` or `Task<Task<TResult>>` (`Task(Of Task)` or `Task(Of Task(Of TResult))` in Visual Basic) to a `Task` or `Task<TResult>` (`Task(Of TResult)` in Visual Basic). The new task fully represents the inner nested task, and includes cancellation state and all exceptions.
