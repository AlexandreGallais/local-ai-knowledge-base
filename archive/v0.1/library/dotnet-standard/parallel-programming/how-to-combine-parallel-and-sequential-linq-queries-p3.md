---
title: "How to: Combine Parallel and Sequential LINQ Queries (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-combine-parallel-and-sequential-linq-queries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Combine Parallel and Sequential LINQ Queries (part 3 of 5)

```csharp
namespace PLINQ_Samples
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;

    class City
    {
        public int Population = 0;
        public string Name = string.Empty;
    }

    class Person
    {
        public string Mayor = string.Empty;
        public string CityName = string.Empty;
    }

    partial class PLINQProgram
    {
        static int Compute(int i) { return 1; }

        static void Main_2(string[] args)
        {
            // SimpleQuery();
            // OrderedQuery3();
            //SequentialDemo(); ;
            Console.ReadLine();
        }

        static void DOP()
        {
            var source = Enumerable.Range(0, 100000);
            var query = from item in source.AsParallel().WithDegreeOfParallelism(2)
                        where Compute(item) > 42
                        select item;
        }

        static void Test()
        {
            var cities = new List<City>();
            var people = new List<Person>();

            // Order Preservation In PLINQ 1st snippet
            var cityQuery =
                (from city in cities.AsParallel()
                 where city.Population > 10000
                 select city).Take(1000);

            // Order Preservation In PLINQ 2nd snippet
            var orderedCities =
                (from city in cities.AsParallel().AsOrdered()
                 where city.Population > 10000
                 select city).Take(1000);

            var orderedCities2 =
                (from city in cities.AsParallel().AsOrdered()
                 where city.Population > 10000
                 select city).Take(1000);

            var finalResult =
                from city in orderedCities2.AsUnordered()
                join p in people.AsParallel()
                on city.Name equals p.CityName into details
                from c in details
                select new
                {
                    city.Name,
                    Pop = city.Population,
                    c.Mayor
                };

            foreach (var city in finalResult) { /*...*/ }
            //...

            ////…
            //You can write the same query in method based syntax as follows:
            //[example]
            //Another way to minimize the expense of order preservation is to impose a new ordering explicitly at a later stage in the query, after all filters have been applied, as shown in the following example:
            var orderedCities3 =
                (from city in cities.AsParallel()
                 where city.Population > 10000
                 orderby city.Name
                 select city).Take(1000);
        }

        static void SimpleQuery()
        {
            var source = Enumerable.Range(100, 20000);

            // Result sequence might be out of order.
            var parallelQuery =
                from num in source.AsParallel()
                where num % 10 == 0
                select num;

            // Process result sequence in parallel
            parallelQuery.ForAll(DoSomething);

            // Or use foreach to merge results first.
            foreach (var n in parallelQuery)
            {
                Console.WriteLine(n);
            }

            // You can also use ToArray, ToList, etc
            // as with LINQ to Objects.
            var parallelQuery2 =
                (from num in source.AsParallel()
                 where num % 10 == 0
                 select num).ToArray();

            // Method syntax is also supported
            var parallelQuery3 =
                source.AsParallel()
                .Where(n => n % 10 == 0)
                .Select(n => n);

            Console.ReadLine();
        }

        static void DoSomething(int i) { }

        static void OrderedQuery()
        {
            var source = Enumerable.Range(9, 10000);

            // Source is ordered; let's preserve it.
            var parallelQuery =
                from num in source.AsParallel().AsOrdered()
                where num % 3 == 0
                select num;

            // Use foreach to preserve order at execution time.
            foreach (var item in parallelQuery)
            {
                Console.Write($"{item} ");
            }

            // Some operators expect an ordered source sequence.
            var lowValues = parallelQuery.Take(10);
        }

        static void OrderedQuery2()
        {
            var source = Enumerable.Range(108, 100000);

            var parallelQuery =
                from num in source.AsParallel().AsOrdered()
                where num % 8 == 0
                select num;

            // use foreach to preserve ordering
            // during query execution.
            foreach (var item in parallelQuery)
            {
                Console.Write($"{item} ");
            }
        }

        static void OrderedQuery3()
        {
            var source = Enumerable.Range(8, 100000);

            // Let the query access the data source will full parallelism
            // and apply ordering to the filtered results.
            var orderedQuery =
                from num in source.AsParallel()
                where num % 8 == 0
                orderby num
                select num;

            // use foreach to preserve query ordering
            foreach (var item in orderedQuery)
            {
                Console.Write($"{item} ");
            }
        }
    }

    namespace PLINQCancellation_1
    {
        using System;
        using System.Linq;
        using System.Threading;
        using System.Threading.Tasks;
        using static System.Console;

        class Program
        {
            static void Main()
            {
                int[] source = Enumerable.Range(1, 10000000).ToArray();
                using CancellationTokenSource cts = new();

                // Start a new asynchronous task that will cancel the
                // operation from another thread. Typically you would call
                // Cancel() in response to a button click or some other
                // user interface event.
                Task.Factory.StartNew(() =>
                {
                    UserClicksTheCancelButton(cts);
                });

                int[]? results = null;
                try
                {
                    results =
                        (from num in source.AsParallel().WithCancellation(cts.Token)
                         where num % 3 == 0
                         orderby num descending
                         select num).ToArray();
                }
                catch (OperationCanceledException e)
                {
                    WriteLine(e.Message);
                }
                catch (AggregateException ae)
                {
                    if (ae.InnerExceptions != null)
                    {
                        foreach (Exception e in ae.InnerExceptions)
                        {
                            WriteLine(e.Message);
                        }
                    }
                }

                foreach (var item in results ?? Array.Empty<int>())
                {
                    WriteLine(item);
                }
                WriteLine();
                ReadKey();
            }

            static void UserClicksTheCancelButton(CancellationTokenSource cts)
            {
                // Wait between 150 and 500 ms, then cancel.
                // Adjust these values if necessary to make
                // cancellation fire while query is still executing.
                Random rand = new();
                Thread.Sleep(rand.Next(150, 500));
                cts.Cancel();
            }
        }
    }

    namespace PLINQCancellation_2
    {
        using System;
        using System.Linq;
        using System.Threading;
        using System.Threading.Tasks;
        using static System.Console;

        class Program
        {
            static void Main(string[] args)
            {
                int[] source = Enumerable.Range(1, 10000000).ToArray();
                using CancellationTokenSource cts = new();

                // Start a new asynchronous task that will cancel the
                // operation from another thread. Typically you would call
                // Cancel() in response to a button click or some other
                // user interface event.
                Task.Factory.StartNew(() =>
                {
                    UserClicksTheCancelButton(cts);
                });

                double[]? results = null;
                try
                {
                    results =
                        (from num in source.AsParallel().WithCancellation(cts.Token)
                         where num % 3 == 0
                         select Function(num, cts.Token)).ToArray();
                }
                catch (OperationCanceledException e)
                {
                    WriteLine(e.Message);
                }
                catch (AggregateException ae)
                {
                    if (ae.InnerExceptions != null)
                    {
                        foreach (Exception e in ae.InnerExceptions)
                            WriteLine(e.Message);
                    }
                }

                foreach (var item in results ?? Array.Empty<double>())
                {
                    WriteLine(item);
                }
                WriteLine();
                ReadKey();
            }

            // A toy method to simulate work.
            static double Function(int n, CancellationToken ct)
            {
                // If work is expected to take longer than 1 ms
                // then try to check cancellation status more
                // often within that work.
                for (int i = 0; i < 5; i++)
                {
                    // Work hard for approx 1 millisecond.
                    Thread.SpinWait(50000);

                    // Check for cancellation request.
                    ct.ThrowIfCancellationRequested();
                }
                // Anything will do for our purposes.
                return Math.Sqrt(n);
            }

            static void UserClicksTheCancelButton(CancellationTokenSource cts)
            {
                // Wait between 150 and 500 ms, then cancel.
                // Adjust these values if necessary to make
                // cancellation fire while query is still executing.
                Random rand = new();
                Thread.Sleep(rand.Next(150, 500));
                WriteLine("Press 'c' to cancel");
                if (ReadKey().KeyChar == 'c')
                {
                    cts.Cancel();
                }
            }
        }
    }

    namespace PLINQCancellation_3
    {
        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading;

        class Program
        {
            static void Main(string[] args)
            {
                int[] source = Enumerable.Range(1, 10000000).ToArray();
                using CancellationTokenSource cs = new();

                IEnumerable<int>? results = null;
                try
                {
                    results =
                        from num in source.AsParallel().WithCancellation(cs.Token)
                        where num % 3 == 0
                        orderby num descending
                        select num;
                }
                catch (OperationCanceledException e)
                {
                    Console.WriteLine(e.Message);
                }
                catch (AggregateException ae)
                {
                    if (ae.InnerExceptions != null)
                    {
                        foreach (Exception e in ae.InnerExceptions)
                            Console.WriteLine(e.Message);
                    }
                }

                foreach (var item in results ?? Array.Empty<int>())
                {
                    Console.WriteLine(item);
                }
                Console.WriteLine();
                Console.ReadKey();
            }
        }
    }

    namespace MergeOptions
    {
        using System;
        using System.Diagnostics;
        using System.Linq;
        using System.Threading;

        class Program
        {
            static void Main(string[] args)
            {

                var nums = Enumerable.Range(1, 10000);

                // Replace NotBuffered with AutoBuffered
                // or FullyBuffered to compare behavior.
                var scanLines = from n in nums.AsParallel()
                                    .WithMergeOptions(ParallelMergeOptions.NotBuffered)
                                where n % 2 == 0
                                select ExpensiveFunc(n);

                Stopwatch sw = Stopwatch.StartNew();
                foreach (var line in scanLines)
                {
                    Console.WriteLine(line);
                }

                Console.WriteLine($"Elapsed time: {sw.ElapsedMilliseconds} ms. Press any key to exit.");
                Console.ReadKey();
            }

            // A function that demonstrates what a fly
            // sees when it watches television :-)
            static string ExpensiveFunc(int i)
            {
                Thread.SpinWait(2000000);
                return string.Format("{0} *****************************************", i);
            }
        }
    }

    namespace PLINQAggregation
    {
        using System;
        using System.Linq;

        class aggregation
        {
            static void Main(string[] args)
            {

                // Create a data source for demonstration purposes.
                int[] source = new int[100000];
                Random rand = new Random();
                for (int x = 0; x < source.Length; x++)
                {
                    // Should result in a mean of approximately 15.0.
                    source[x] = rand.Next(10, 20);
                }

                // Standard deviation calculation requires that we first
                // calculate the mean average. Average is a predefined
                // aggregation operator, along with Max, Min and Count.
                double mean = source.AsParallel().Average();

                // We use the overload that is unique to ParallelEnumerable. The
                // third Func parameter combines the results from each thread.
                double standardDev = source.AsParallel().Aggregate(
                    // initialize subtotal. Use decimal point to tell
                    // the compiler this is a type double. Can also use: 0d.
                    0.0,

                     // do this on each thread
                     (subtotal, item) => subtotal + Math.Pow((item - mean), 2),

```
