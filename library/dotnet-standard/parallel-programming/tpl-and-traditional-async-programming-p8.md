---
title: "TPL and Traditional .NET Asynchronous Programming (part 8 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 8 of 21)

```csharp
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Net;

namespace specialNamespaceForOneMethodSignature
{
    using System;
    class Task<TResult>
    {
        public TResult TValue;
    }
    class Dummy <TResult>
    {
            public Task<TResult> FromAsync<TArg1, TArg2, TArg3>(
                Func<TArg1, TArg2, TArg3, AsyncCallback, object, IAsyncResult> beginMethod, //BeginRead
                 Func<IAsyncResult, TResult> endMethod, //EndRead
                 TArg1 arg1, // the byte[] buffer
                 TArg2 arg2, // the offset in arg1 at which to start writing data
                 TArg3 arg3, // the maximum number of bytes to read
                 object state // optional state information
                )
        { return new Task<TResult>(); }
    }
}

namespace APM_Task
{
    class TestFileStreamNaive
    {
        public string GetFileData(string path)
        {
            FileInfo fi = new FileInfo(path);
            byte[] data = new byte[fi.Length];
            FileStream fs;

            // a using statement is ok here because we Wait before returning
            // and will be done with the filestream.
            using (fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, data.Length, true))
            {
                //Task<int> returns the number of bytes read
                Task<int> task = Task<int>.Factory.FromAsync(
                        fs.BeginRead, fs.EndRead, data, 0, data.Length, null);

                task.Wait();
                return new UTF8Encoding().GetString(data);
            }
        }
        static void Main()
        {
            TestFileStreamNaive instance = new TestFileStreamNaive();
            string s = instance.GetFileData("testfile.txt");
        }
    }

    class AsyncResult : IAsyncResult
    {

        public AsyncResult() { }
        public object AsyncState
        {
            get { return "Hello from a parallel universe."; }
        }

        public WaitHandle AsyncWaitHandle
        {
            get { throw new NotImplementedException(); }
        }

        public bool CompletedSynchronously
        {
            get { throw new NotImplementedException(); }
        }

        public bool IsCompleted
        {
            get { throw new NotImplementedException(); }
        }

        static IAsyncResult DoSomethingAsynchronously()
        {
            return new AsyncResult();
        }

        static Task<String> ReturnTaskFromAsyncResult()
        {
            IAsyncResult ar = DoSomethingAsynchronously();
            Task<String> t = Task<string>.Factory.FromAsync(ar, _ =>
                {
                    return (string)ar.AsyncState;
                });

            return t;
        }
    }

    class WebDataDownloader
    {

        static void Main()
        {
            WebDataDownloader downloader = new WebDataDownloader();
            string[] addresses = { "http://www.msnbc.com", "http://www.yahoo.com",
                                     "http://www.nytimes.com", "http://www.washingtonpost.com",
                                     "http://www.latimes.com", "http://www.newsday.com" };
            CancellationTokenSource cts = new CancellationTokenSource();

            // Create a UI thread from which to cancel the entire operation
            Task.Factory.StartNew(() =>
            {
                Console.WriteLine("Press c to cancel");
                if (Console.ReadKey().KeyChar == 'c')
                    cts.Cancel();
            });

            // Using a neutral search term that is sure to get some hits.
            Task<string[]> webTask = downloader.GetWordCounts(addresses, "<example-value>", cts.Token);

            // Do some other work here unless the method has already completed.
            if (!webTask.IsCompleted)
            {
                // Simulate some work.
                Thread.SpinWait(5000000);
            }

            string[] results = null;
            try
            {
                results = webTask.Result;
            }
            catch (AggregateException e)
            {
                foreach (var ex in e.InnerExceptions)
                {
                    OperationCanceledException oce = ex as OperationCanceledException;
                    if (oce != null)
                    {
                        if (oce.CancellationToken == cts.Token)
                        {
                            Console.WriteLine("Operation canceled by user.");
                        }
                    }
                    else
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
            }
            finally
            {
                cts.Dispose();
            }
            if (results != null)
            {
                foreach (var item in results)
                    Console.WriteLine(item);
            }
            Console.ReadKey();
        }

        Task<string[]> GetWordCounts(string[] urls, string name, CancellationToken token)
        {
            TaskCompletionSource<string[]> tcs = new TaskCompletionSource<string[]>();
            WebClient[] webClients = new WebClient[urls.Length];

            // If the user cancels the CancellationToken, then we can use the
            // WebClient's ability to cancel its own async operations.
            token.Register(() =>
                {
                    foreach (var wc in webClients)
                    {
                        if (wc != null)
                            wc.CancelAsync();
                    }
                });

            object m_lock = new object();
            int count = 0;
            List<string> results = new List<string>();
            for (int i = 0; i < urls.Length; i++)
            {
                webClients[i] = new WebClient();

                // Specify the callback for the DownloadStringCompleted
                // event that will be raised by this WebClient instance.
                webClients[i].DownloadStringCompleted += (obj, args) =>
                 {
                     if (args.Cancelled == true)
                     {
                         tcs.TrySetCanceled();
                         return;
                     }
                     else if (args.Error != null)
                     {
                         // Pass <example-value> to the underlying Task
                         // any exceptions thrown by the WebClient
                         // during the asynchronous operation.
                         tcs.TrySetException(args.Error);
                         return;
                     }
                     else
                     {
                         // Split the string into an array of words,
                         // then count the number of elements that match
                         // the search term.
                         string[] words = null;
                         words = args.Result.Split(' ');
                         string NAME = name.ToUpper();
                         int nameCount = (from word in words.AsParallel()
                                          where word.ToUpper().Contains(NAME)
                                          select word)
                                         .Count();

                         // Associate the results with the url, and add new string to the array that
                         // the underlying Task object will return in its Result property.
                         results.Add(String.Format("{0} has {1} instances of {2}", args.UserState, nameCount, name));
                     }

                     // If this is the last async operation to complete,
                     // then set the Result property on the underlying Task.
                     lock (m_lock)
                     {
                         count++;
                         if (count == urls.Length)
                         {
                             tcs.TrySetResult(results.ToArray());
                         }
                     }
                 };

                // Call DownloadStringAsync for each URL.
                Uri address = null;
                try
                {
                    address = new Uri(urls[i]);
                    // Pass the address, and also use it for the userToken
                    // to identify the page when the delegate is invoked.
                    webClients[i].DownloadStringAsync(address, address);
                }

                catch (UriFormatException ex)
                {
                    // Abandon the entire operation if one url is malformed.
                    // Other actions are possible here.
                    tcs.TrySetException(ex);
                    return tcs.Task;
                }
            }

            // Return the underlying Task. The client code
            // waits on the Result property, and handles exceptions
            // in the try-catch block there.
            return tcs.Task;
        }
    }

    class Calculator
    {
        public IAsyncResult BeginCalculate(int decimalPlaces, AsyncCallback ac, object state)
        {
            Console.WriteLine($"Calling BeginCalculate on thread {Thread.CurrentThread.ManagedThreadId}");
            Task<string> f = Task<string>.Factory.StartNew(_ => Compute(decimalPlaces), state);
            if (ac != null) f.ContinueWith((res) => ac(f));
            return f;
        }

        public string Compute(int numPlaces)
        {
            Console.WriteLine($"Calling compute on thread {Thread.CurrentThread.ManagedThreadId}");

            // Simulating some heavy work.
            Thread.SpinWait(500000000);

            // Actual implementation left as exercise for the reader.
            // Several examples are available on the Web.
            return "3.14159265358979323846264338327950288";
        }

        public string EndCalculate(IAsyncResult ar)
        {
            Console.WriteLine($"Calling EndCalculate on thread {Thread.CurrentThread.ManagedThreadId}");
            return ((Task<string>)ar).Result;
        }
    }

    public class CalculatorClient
    {
        static int decimalPlaces = 12;
        public static void Main()
        {
            Calculator calc = new Calculator();
            int places = 35;

            AsyncCallback callBack = new AsyncCallback(PrintResult);
            IAsyncResult ar = calc.BeginCalculate(places, callBack, calc);

            // Do some work on this thread while the calculator is busy.
            Console.WriteLine("Working...");
            Thread.SpinWait(500000);
            Console.ReadLine();
        }

        public static void PrintResult(IAsyncResult result)
        {
            Calculator c = (Calculator)result.AsyncState;
            string piString = c.EndCalculate(result);
            Console.WriteLine($"Calling PrintResult on thread {Thread.CurrentThread.ManagedThreadId}; result = {piString}");
        }
    }
} //end APM_Task namespace

class FileStreamDemo
{
    static void Main()
    {
        FileStreamDemo fsd = new FileStreamDemo();
        //  var task = fsd.GetMultiFileData(new string[1]);
         fsd.ShowCallingFromAsync();
       // fsd.ShowCallingFromAsyncFileData();
        //  fsd.ProcessFilesAsync();
        //  task.Wait();
        //  Console.WriteLine(task.Result);

        Console.WriteLine("press any key");
        Console.ReadLine();
    }
    const int MAX_FILE_SIZE = 14000000;
    public static Task<string> GetFileStringAsync(string path)
    {
        FileInfo fi = new FileInfo(path);
        byte[] data = null;
        data = new byte[fi.Length];

        FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, data.Length, true);

        //Task<int> returns the number of bytes read
        Task<int> task = Task<int>.Factory.FromAsync(
                fs.BeginRead, fs.EndRead, data, 0, data.Length, null);

        // It is possible to do other work here while waiting
        // for the antecedent task to complete.
        // ...

        // Add the continuation, which returns a Task<string>.
        return task.ContinueWith((antecedent) =>
        {
            fs.Close();

            // Result = "number of bytes read" (if we need it.)
            if (antecedent.Result < 100)
            {
                return "Data is too small to bother with.";
            }
            else
            {
                // If we did not receive the entire file, the end of the
                // data buffer will contain garbage.
                if (antecedent.Result < data.Length)
                    Array.Resize(ref data, antecedent.Result);

                // Will be returned in the Result property of the Task<string>
                // at some future point after the asynchronous file I/O operation completes.
                return new UTF8Encoding().GetString(data);
            }
        });
    }

        void ShowCallingFromAsync()
        {
            string path = @"\\docbuild2\public\Main\Logs\DllDiffReport\DllDiffReport_BetweenInBuildAndInProduct.html";

            Task<string> t = GetFileStringAsync(path);

            // Do some other work:
            // ...

            try
            {
                 Console.WriteLine(t.Result.Substring(0, 500));
            }
            catch (AggregateException ae)
            {
                Console.WriteLine(ae.InnerException.Message);
            }

            Console.ReadLine();
        }

        //not used???
        public static Task<int> GetFileDataAsync(string path, ref byte[] data)
        {
            // Error handling omitted for brevity...

            FileInfo fi = new FileInfo(path);
            data = new byte[fi.Length];
            FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, data.Length, true);

            // Task<int> returns the number of bytes read
            // Pass <example-value> in AsyncState parameter in order to close it from the call site.
            return Task<int>.Factory.FromAsync(
                    fs.BeginRead, fs.EndRead, data, 0, data.Length, fs);
        }

        void ShowCallingFromAsyncFileData()
        {
            string path = @"\\remoteComputer\filename.txt";

            byte[] buffer = null;
            Task<int> t = GetFileDataAsync(path, ref buffer);

            // Can do some other work here:
            // ...
            for(int i = 0; i < 10; i++)
                Console.Write("Working... ");

            var result =
            t.ContinueWith((antecedent) =>
            {
                // Error handling omitted...

                return new UTF8Encoding().GetString(buffer);
            });

```
