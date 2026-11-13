---
title: "TPL and Traditional .NET Asynchronous Programming (part 21 of 21)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/tpl-and-traditional-async-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# TPL and Traditional .NET Asynchronous Programming (part 21 of 21)

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

## Use the StreamExtensions sample code

 The *StreamExtensions.cs* file, in the .NET Standard parallel extensions extras repository, contains several reference implementations that use `Task` objects for asynchronous file and network I/O.

## See also

- Task Parallel Library (TPL)
