---
title: "Create an object pool by using a ConcurrentBag"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/thread-safe/how-to-create-an-object-pool.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create an object pool by using a ConcurrentBag

This example shows how to use a `System.Collections.Concurrent.ConcurrentBag`1` to implement an object pool. Object pools can improve application performance in situations where you require multiple instances of a class and the class is expensive to create or destroy. When a client program requests a new object, the object pool first attempts to provide one that has already been created and returned to the pool. If none is available, only then is a new object created.

The `System.Collections.Concurrent.ConcurrentBag`1` is used to store the objects because it supports fast insertion and removal, especially when the same thread is both adding and removing items. This example could be further augmented to be built around a `System.Collections.Concurrent.IProducerConsumerCollection`1`, which the bag data structure implements, as do `System.Collections.Concurrent.ConcurrentQueue`1` and `System.Collections.Concurrent.ConcurrentStack`1`.

> **Tip:**
> This article defines how to write your own implementation of an object pool with an underlying concurrent type to store objects for reuse. However, the `Microsoft.Extensions.ObjectPool.ObjectPool`1` type already exists under the `Microsoft.Extensions.ObjectPool` namespace. Consider using the available type before creating your own implementation, which includes many additional features.

## Example

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

namespace ObjectPoolExample
{
    public class ObjectPool<T>
    {
        private readonly ConcurrentBag<T> _objects;
        private readonly Func<T> _objectGenerator;

        public ObjectPool(Func<T> objectGenerator)
        {
            _objectGenerator = objectGenerator ?? throw new ArgumentNullException(nameof(objectGenerator));
            _objects = new ConcurrentBag<T>();
        }

        public T Get() => _objects.TryTake(out T item) ? item : _objectGenerator();

        public void Return(T item) => _objects.Add(item);
    }

    class Program
    {
        static void Main(string[] args)
        {
            using var cts = new CancellationTokenSource();

            // Create an opportunity for the user to cancel.
            _ = Task.Run(() =>
            {
                if (char.ToUpperInvariant(Console.ReadKey().KeyChar) == 'C')
                {
                    cts.Cancel();
                }
            });

            var pool = new ObjectPool<ExampleObject>(() => new ExampleObject());

            // Create a high demand for ExampleObject instance.
            Parallel.For(0, 1000000, (i, loopState) =>
            {
                var example = pool.Get();
                try
                {
                    Console.CursorLeft = 0;
                    // This is the bottleneck in our application. All threads in this loop
                    // must serialize their access to the static Console class.
                    Console.WriteLine($"{example.GetValue(i):####.####}");
                }
                finally
                {
                    pool.Return(example);
                }

                if (cts.Token.IsCancellationRequested)
                {
                    loopState.Stop();
                }
            });

            Console.WriteLine("Press the Enter key to exit.");
            Console.ReadLine();
        }
    }

    // A toy class that requires some resources to create.
    // You can experiment here to measure the performance of the
    // object pool vs. ordinary instantiation.
    class ExampleObject
    {
        public int[] Nums { get; set; }

        public ExampleObject()
        {
            Nums = new int[1000000];
            var rand = new Random();
            for (int i = 0; i < Nums.Length; i++)
            {
                Nums[i] = rand.Next();
            }
        }

        public double GetValue(long i) => Math.Sqrt(Nums[i]);
    }
}
```

## See also

- Thread-Safe Collections
