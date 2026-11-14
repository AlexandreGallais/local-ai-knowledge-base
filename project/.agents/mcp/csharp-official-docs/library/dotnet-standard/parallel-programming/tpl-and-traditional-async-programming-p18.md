---
title: "TPL and Traditional .NET Asynchronous Programming (part 18 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 18 of 21)

```csharp
            // Can also do some other work here:
            // ...
            for (int i = 0; i < 10; i++)
                Console.Write("Working more... ");
            try
            {
                t.Wait();
                Console.WriteLine(result.Result.Substring(0, 50));
            }
            catch (AggregateException ae)
            {
                Console.WriteLine(ae.InnerException.Message);
            }

            Console.ReadLine();
        }
        // nested dummy class for snippet0 5 below
        class MyCustomState
        {
            public string StateData { get; set; }
            public MyCustomState() { StateData = "Hello"; }
        }
        private MyCustomState GetCustomState()
        {
            return new MyCustomState();
        }

        public Task<string> GetFileStringAsync2(string path)
        {
            FileInfo fi = new FileInfo(path);
            byte[] data = new byte[fi.Length];
            MyCustomState state = GetCustomState();
            FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, data.Length, true);
            // We still pass null for the last parameter because
            // the state variable is visible to the continuation delegate.
            Task<int> task = Task<int>.Factory.FromAsync(
                    fs.BeginRead, fs.EndRead, data, 0, data.Length, null);

            return task.ContinueWith((antecedent) =>
            {
                // It is safe to close the filestream now.
                fs.Close();

                // Capture custom state data directly in the user delegate.
                // No need to pass it through the FromAsync method.
                if (state.StateData.Contains("New York, New York"))
                {
                    return "Start spreading the news!";
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

        string[] GetFilesToRead()
        {
            return new string[3] { "test.txt", "test1.txt", "test2.txt" };
        }
        public Task<string> GetMultiFileData(string[] filesToRead)
        {
            FileStream fs;
            Task<string>[] tasks = new Task<string>[filesToRead.Length];
            byte[] fileData = null;
            for (int i = 0; i < filesToRead.Length; i++)
            {
                fileData = new byte[0x1000];
                fs = new FileStream(filesToRead[i], FileMode.Open, FileAccess.Read, FileShare.Read, fileData.Length, true);

                // By adding the continuation here, the
                // Result of each task will be a string.
                tasks[i] = Task<int>.Factory.FromAsync(
                         fs.BeginRead, fs.EndRead, fileData, 0, fileData.Length, null)
                         .ContinueWith((antecedent) =>
                             {
                                 fs.Close();

                                 // If we did not receive the entire file, the end of the
                                 // data buffer will contain garbage.
                                 if (antecedent.Result < fileData.Length)
                                     Array.Resize(ref fileData, antecedent.Result);

                                 // Will be returned in the Result property of the Task<string>
                                 // at some future point after the asynchronous file I/O operation completes.
                                 return new UTF8Encoding().GetString(fileData);
                             });
            }

            // Wait for all tasks to complete.
            return Task<string>.Factory.ContinueWhenAll(tasks, (data) =>
            {
                // Propagate all exceptions and mark all faulted tasks as observed.
                Task.WaitAll(data);

                // Combine the results from all tasks.
                StringBuilder sb = new StringBuilder();
                foreach (var t in data)
                {
                    sb.Append(t.Result);
                }
                // Final result to be returned eventually on the calling thread.
                return sb.ToString();
            });
        }
        public string ProcessData(Task[] arr)
        {
            return "processed";
        }

        void ProcessFilesAsync()
        {
            string[] files = Directory.GetFiles(@"\\remoteComputer\folderName\", "*.*", SearchOption.AllDirectories);
            CancellationTokenSource cts = new CancellationTokenSource();

            List<Task<string>> tasks = new List<Task<string>>();

            foreach (var file in files)
            {
                Task<string> t = null;
                try
                {
                    t = GetFileStringAsync3(file, cts.Token);
                }
                catch
                {
                    Console.WriteLine($"Argument exception on {file}");
                    continue;
                }
                t.ContinueWith((antecedent) => ProcessFileData(antecedent.Result));
                tasks.Add(t);
            }
            Console.WriteLine("All tasks have been added.");
            // Do some work here.

            try
            {
                Task.WaitAll(tasks.ToArray());
                Console.WriteLine("All tasks have completed.");
            }
            catch (AggregateException ae)
            {
                foreach (var ex in ae.InnerExceptions)
                    Console.WriteLine(ex.Message);
            }
            finally
            {
                cts.Dispose();
            }

            // If needed, perform a final step after all tasks have completed.
            Task.Factory.ContinueWhenAll(tasks.ToArray(), (arr) =>
                {
                    foreach (var t in arr)
                    {
                        CompareFileData(t.Result);
                    }
                });
        }

        public Task<string> GetFileStringAsync3(string path, CancellationToken token)
        {
            if (!File.Exists(path))
            {
                throw new FileNotFoundException(String.Format("Could not find {0}", path));
            }
            FileInfo fi = new FileInfo(path);
            byte[] data = null;

            if (fi.Length < MAX_FILE_SIZE && fi.Length > 0)
        {
            data = new byte[fi.Length];
        }
        else
            {
                throw new ArgumentException(String.Format("{0} is too big to load!", path));
            }

            FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, data.Length, true);

            // We still pass null for the last parameter because
            // the state variable is visible to the continuation delegate.
            Task<int> task = Task<int>.Factory.FromAsync(
                    fs.BeginRead, fs.EndRead, data, 0, data.Length, null);

            return task.ContinueWith((antecedent) =>
            {
                fs.Close();

                // If we did not receive the entire file, the end of the
                // data buffer will contain garbage.
                if (antecedent.Result < data.Length)
                    Array.Resize(ref data, antecedent.Result);

                // Will be returned in the Result property of the Task<string>
                // at some future point after the asynchronous file I/O operation completes.
                return new UTF8Encoding().GetString(data);
            });
        }

        string ProcessFileData(string data)
        {

            string s = data.Substring(0, 80);
            Console.WriteLine(s);
            return s;
        }

        string CompareFileData(string s)
        {
            return "compare results";
        }
    }
```

### Start and cancel FromAsync tasks

 The task returned by a `FromAsync` method has a status of `WaitingForActivation` and will be started by the system at some point after the task is created. If you attempt to call Start on such a task, an exception will be raised.

 You cannot cancel a `FromAsync` task, because the underlying .NET APIs currently do not support in-progress cancellation of file or network I/O. You can add cancellation functionality to a method that encapsulates a `FromAsync` call, but you can only respond to the cancellation before `FromAsync` is called or after it completed (for example, in a continuation task).

 Some classes that support EAP, for example, `System.Net.WebClient`, do support cancellation, and you can integrate that native cancellation functionality by using cancellation tokens.

## Expose complex EAP operations As tasks

 The TPL does not provide any methods that are specifically designed to encapsulate an event-based asynchronous operation in the same way that the `FromAsync` family of methods wrap the `System.IAsyncResult` pattern. However, the TPL does provide the `System.Threading.Tasks.TaskCompletionSource`1` class, which can be used to represent any arbitrary set of operations as a `System.Threading.Tasks.Task`1`. The operations may be synchronous or asynchronous, and may be I/O bound or compute-bound, or both.

 The following example shows how to use a `System.Threading.Tasks.TaskCompletionSource`1` to expose a set of asynchronous `System.Net.WebClient` operations to client code as a basic `System.Threading.Tasks.Task`1`. The method lets you enter an array of Web URLs, and a term or name to search for, and then returns the number of times the search term occurs on each site.

 ```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

public class SimpleWebExample
{
  public Task<string[]> GetWordCountsSimplified(string[] urls, string name,
                                                CancellationToken token)
  {
      TaskCompletionSource<string[]> tcs = new TaskCompletionSource<string[]>();
      WebClient[] webClients = new WebClient[urls.Length];
      object m_lock = new object();
      int count = 0;
      List<string> results = new List<string>();

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

      for (int i = 0; i < urls.Length; i++)
      {
          webClients[i] = new WebClient();

          // Specify the callback for the DownloadStringCompleted
          // event that will be raised by this WebClient instance.
          webClients[i].DownloadStringCompleted += (obj, args) =>
          {

              // Argument validation and exception handling omitted for brevity.

              // Split the string into an array of words,
              // then count the number of elements that match
              // the search term.
              string[] words = args.Result.Split(' ');
              string NAME = name.ToUpper();
              int nameCount = (from word in words.AsParallel()
                               where word.ToUpper().Contains(NAME)
                               select word)
                              .Count();

              // Associate the results with the url, and add new string to the array that
              // the underlying Task object will return in its Result property.
              lock (m_lock)
              {
                 results.Add(String.Format("{0} has {1} instances of {2}", args.UserState, nameCount, name));

                 // If this is the last async operation to complete,
                 // then set the Result property on the underlying Task.
                 count++;
                 if (count == urls.Length)
                 {
                    tcs.TrySetResult(results.ToArray());
                 }
              }
          };

          // Call DownloadStringAsync for each URL.
          Uri address = null;
          address = new Uri(urls[i]);
          webClients[i].DownloadStringAsync(address, address);
      } // end for

      // Return the underlying Task. The client code
      // waits on the Result property, and handles exceptions
      // in the try-catch block there.
      return tcs.Task;
   }
}

public class Example
{
   public static void Main()
   {
      string[] urls = {"http://www.microsoft.com",
                       "http://www.google.com",
                       "http://www.amazon.com",
                       "http://www.adobe.com" };
      string searchTerm = "investor";
      var ex = new SimpleWebExample();
      var t = ex.GetWordCountsSimplified(urls, searchTerm, CancellationToken.None);
      t.Wait();
      foreach (var value in t.Result)
         Console.WriteLine(value);

      Console.ReadLine();
   }
}
```

 For a more complete example, which includes additional exception handling and shows how to call the method from client code, see How to: Wrap EAP Patterns in a Task.

 Remember that any task that's created by a `System.Threading.Tasks.TaskCompletionSource`1` will be started by that `TaskCompletionSource` and, therefore, user code should not call the `Start` method on that task.
