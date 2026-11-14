---
title: "Add and Remove Items from a ConcurrentDictionary"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/collections/thread-safe/how-to-add-and-remove-items.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to add and remove items from a ConcurrentDictionary

This example shows how to add, retrieve, update, and remove items from a `System.Collections.Concurrent.ConcurrentDictionary`2`. This collection class is a thread-safe implementation. We recommend that you use it whenever multiple threads might be attempting to access the elements concurrently.

`System.Collections.Concurrent.ConcurrentDictionary`2` provides several convenience methods that make it unnecessary for code to first check whether a key <example-value> before it attempts to add or remove data. The following table lists these convenience methods and describes when to use them.

| Method | Use when… |
|--|--|
| `System.Collections.Concurrent.ConcurrentDictionary`2.AddOrUpdate*` | You want to add a new value for a specified key and, if the key <example-value> exists, you want to replace its value. |
| `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*` | You want to retrieve the existing value for a specified key and, if the key does not exist, you want to specify a key/value pair. |
| `System.Collections.Concurrent.ConcurrentDictionary`2.TryAdd*`, `System.Collections.Concurrent.ConcurrentDictionary`2.TryGetValue*`, `System.Collections.Concurrent.ConcurrentDictionary`2.TryUpdate*`, `System.Collections.Concurrent.ConcurrentDictionary`2.TryRemove*` | You want to add, get, update, or remove a key/value pair, and, if the key <example-value> exists or the attempt fails for any other reason, you want to take some alternative action. |

## Example

The following example uses two `System.Threading.Tasks.Task` instances to add some elements to a `System.Collections.Concurrent.ConcurrentDictionary`2` concurrently, and then outputs all of the contents to show that the elements were added successfully. The example also shows how to use the `System.Collections.Concurrent.ConcurrentDictionary`2.AddOrUpdate*`, `System.Collections.Generic.Dictionary`2.TryGetValue*`, and `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*` methods to add, update, and retrieve items from the collection.

```csharp
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DictionaryHowTo
{
    // The type of the Value to store in the dictionary.
    class CityInfo : IEqualityComparer<CityInfo>
    {
        public string Name { get; set; }
        public DateTime LastQueryDate { get; set; } = DateTime.Now;
        public decimal Longitude { get; set; } = decimal.MaxValue;
        public decimal Latitude { get; set; } = decimal.MaxValue;
        public int[] RecentHighTemperatures { get; set; } = new int[] { 0 };

        public bool Equals(CityInfo x, CityInfo y)
            => (x.Name, x.Longitude, x.Latitude) ==
                  (y.Name, y.Longitude, y.Latitude);

        public int GetHashCode(CityInfo cityInfo) =>
            cityInfo?.Name.GetHashCode() ?? throw new ArgumentNullException(nameof(cityInfo));
    }

    class Program
    {
        static readonly ConcurrentDictionary<string, CityInfo> Cities =
            new ConcurrentDictionary<string, CityInfo>(StringComparer.OrdinalIgnoreCase);

        static async Task Main()
        {
            CityInfo[] cityData =
            {
                new CityInfo { Name = "Boston", Latitude = 42.358769m, Longitude = -71.057806m, RecentHighTemperatures = new int[] { 56, 51, 52, 58, 65, 56,53} },
                new CityInfo { Name = "Miami", Latitude = 25.780833m, Longitude = -80.195556m, RecentHighTemperatures = new int[] { 86,87,88,87,85,85,86 } },
                new CityInfo { Name = "Los Angeles", Latitude = 34.05m, Longitude = -118.25m, RecentHighTemperatures =   new int[] { 67,68,69,73,79,78,78 } },
                new CityInfo { Name = "Seattle", Latitude = 47.609722m, Longitude =  -122.333056m, RecentHighTemperatures =   new int[] { 49,50,53,47,52,52,51 } },
                new CityInfo { Name = "Toronto", Latitude = 43.716589m, Longitude = -79.340686m, RecentHighTemperatures =   new int[] { 53,57, 51,52,56,55,50 } },
                new CityInfo { Name = "Mexico City", Latitude = 19.432736m, Longitude = -99.133253m, RecentHighTemperatures =   new int[] { 72,68,73,77,76,74,73 } },
                new CityInfo { Name = "Rio de Janeiro", Latitude = -22.908333m, Longitude = -43.196389m, RecentHighTemperatures =   new int[] { 72,68,73,82,84,78,84 } },
                new CityInfo { Name = "Quito", Latitude = -0.25m, Longitude = -78.583333m, RecentHighTemperatures =   new int[] { 71,69,70,66,65,64,61 } },
                new CityInfo { Name = "Milwaukee", Latitude = -43.04181m, Longitude = -87.90684m, RecentHighTemperatures =   new int[] { 32,47,52,64,49,44,56 } }
            };

            // Add some key/value pairs from multiple threads.
            await Task.WhenAll(
                Task.Run(() => TryAddCities(cityData)),
                Task.Run(() => TryAddCities(cityData)));

            static void TryAddCities(CityInfo[] cities)
            {
                for (var i = 0; i < cities.Length; ++i)
                {
                    var (city, threadId) = (cities[i], Thread.CurrentThread.ManagedThreadId);
                    if (Cities.TryAdd(city.Name, city))
                    {
                        Console.WriteLine($"Thread={threadId}, added {city.Name}.");
                    }
                    else
                    {
                        Console.WriteLine($"Thread={threadId}, could not add {city.Name}, it was already added.");
                    }
                }
            }

            // Enumerate collection from the app main thread.
            // Note that ConcurrentDictionary is the one concurrent collection
            // that does not support thread-safe enumeration.
            foreach (var city in Cities)
            {
                Console.WriteLine($"{city.Key} has been added.");
            }

            AddOrUpdateWithoutRetrieving();
            TryRemoveCity();
            RetrieveValueOrAdd();
            RetrieveAndUpdateOrAdd();

            Console.WriteLine("Press any key.");
            Console.ReadKey();
        }

        // This method shows how to add key-value pairs to the dictionary
        // in scenarios where the key might already exist.
        static void AddOrUpdateWithoutRetrieving()
        {
            // Sometime later. We receive new data from some source.
            var ci = new CityInfo
            {
                Name = "Toronto",
                Latitude = 43.716589M,
                Longitude = -79.340686M,
                RecentHighTemperatures = new int[] { 54, 59, 67, 82, 87, 55, -14 }
            };

            // Try to add data. If it doesn't exist, the object ci is added. If it does
            // already exist, update existingVal according to the custom logic.
            _ = Cities.AddOrUpdate(
                ci.Name,
                ci,
                (cityName, existingCity) =>
                {
                    // If this delegate is invoked, then the key <example-value> exists.
                    // Here we make sure the city really is the same city we already have.
                    if (ci != existingCity)
                    {
                        // throw new ArgumentException($"Duplicate city names are not allowed: {ci.Name}.");
                    }

                    // The only updatable fields are the temperature array and LastQueryDate.
                    existingCity.LastQueryDate = DateTime.Now;
                    existingCity.RecentHighTemperatures = ci.RecentHighTemperatures;

                    return existingCity;
                });

            // Verify that the dictionary contains the new or updated data.
            Console.Write($"Most recent high temperatures for {ci.Name} are: ");
            var temps = Cities[ci.Name].RecentHighTemperatures;
            Console.WriteLine(string.Join(", ", temps));
        }

        // This method shows how to use data and ensure that it has been
        // added to the dictionary.
        static void RetrieveValueOrAdd()
        {
            var searchKey = "Caracas";
            CityInfo retrievedValue = null;

            try
            {
                retrievedValue = Cities.GetOrAdd(searchKey, GetDataForCity(searchKey));
            }
            catch (ArgumentException e)
            {
                Console.WriteLine(e.Message);
            }

            // Use the data.
            if (retrievedValue != null)
            {
                Console.Write($"Most recent high temperatures for {retrievedValue.Name} are: ");
                var temps = Cities[retrievedValue.Name].RecentHighTemperatures;
                Console.WriteLine(string.Join(", ", temps));
            }
        }

        // This method shows how to remove a value from the dictionary.
        // If the value is unable to be removed, you can handle that by using the return
        // boolean value from the .TryRemove function.
        static void TryRemoveCity()
        {
            Console.WriteLine($"Total cities = {Cities.Count}");

            var searchKey = "Milwaukee";
            if (Cities.TryRemove(searchKey, out CityInfo retrievedValue))
            {
                Console.Write($"Most recent high temperatures for {retrievedValue.Name} are: ");
                var temps = retrievedValue.RecentHighTemperatures;
                Console.WriteLine(string.Join(", ", temps));
            }
            else
            {
                Console.WriteLine($"Unable to remove {searchKey}");
            }

            Console.WriteLine($"Total cities = {Cities.Count}");
        }

        // This method shows how to retrieve a value from the dictionary,
        // when you expect that the key/value pair already exists,
        // and then possibly update the dictionary with a new value for the key.
        static void RetrieveAndUpdateOrAdd()
        {
            var searchKey = "Buenos Aires";
            if (Cities.TryGetValue(searchKey, out CityInfo retrievedValue))
            {
                // Use the data.
                Console.Write($"Most recent high temperatures for {retrievedValue.Name} are: ");
                var temps = retrievedValue.RecentHighTemperatures;
                Console.WriteLine(string.Join(", ", temps));

                // Make a copy of the data. Our object will update its LastQueryDate automatically.
                var newValue = new CityInfo
                {
                    Name = retrievedValue.Name,
                    Latitude = retrievedValue.Latitude,
                    Longitude = retrievedValue.Longitude,
                    RecentHighTemperatures = retrievedValue.RecentHighTemperatures
                };

                // Replace the old value with the new value.
                if (!Cities.TryUpdate(searchKey, newValue, retrievedValue))
                {
                    // The data was not updated. Log error, throw exception, etc.
                    Console.WriteLine($"Could not update {retrievedValue.Name}");
                }
            }
            else
            {
                // Add the new key and value. Here we call a method to retrieve
                // the data. Another option is to add a default value here and
                // update with real data later on some other thread.
                var newValue = GetDataForCity(searchKey);
                if (Cities.TryAdd(searchKey, newValue))
                {
                    // Use the data.
                    Console.Write($"Most recent high temperatures for {newValue.Name} are: ");
                    var temps = newValue.RecentHighTemperatures;
                    Console.WriteLine(string.Join(", ", temps));
                }
                else
                {
                    Console.WriteLine($"Unable to add data for {searchKey}");
                }
            }
        }

        // Assume this method knows how to find long/lat/temp info for any specified city.
        static CityInfo GetDataForCity(string name) => name switch
        {
            "Caracas" => new CityInfo
            {
                Name = "Caracas",
                Longitude = 10.5M,
                Latitude = -66.916667M,
                RecentHighTemperatures = new int[] { 91, 89, 91, 91, 87, 90, 91 }
            },
            "Buenos Aires" => new CityInfo
            {
                Name = "Buenos Aires",
                Longitude = -34.61M,
                Latitude = -58.369997M,
                RecentHighTemperatures = new int[] { 80, 86, 89, 91, 84, 86, 88 }
            },
            _ => throw new ArgumentException($"Cannot find any data for {name}")
        };
    }
}
```

`System.Collections.Concurrent.ConcurrentDictionary`2` is designed for multithreaded scenarios. You do not have to use locks in your code to add or remove items from the collection. However, it is always possible for one thread to retrieve a value, and another thread to immediately update the collection by giving the same key a new value.

Also, although all methods of `System.Collections.Concurrent.ConcurrentDictionary`2` are thread-safe, not all methods are atomic, specifically `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*` and `System.Collections.Concurrent.ConcurrentDictionary`2.AddOrUpdate*`. To prevent unknown code from blocking all threads, the user delegate that's passed to these methods is invoked outside of the dictionary's internal lock. Therefore, it's possible for this sequence of events to occur:

1. _threadA_ calls `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*`, finds no item, and creates a new item to add by invoking the `valueFactory` delegate.

1. _threadB_ calls `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*` concurrently, its `valueFactory` delegate is invoked and it arrives at the internal lock before _threadA_, and so its new key-value pair is added to the dictionary.

1. _threadA's_ user delegate completes, and the thread arrives at the lock, but now sees that the item exists already.

1. _threadA_ performs a "Get" and returns the data that was previously added by _threadB_.

Therefore, it is not guaranteed that the data that is returned by `System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd*` is the same data that was created by the thread's `valueFactory`. A similar sequence of events can occur when `System.Collections.Concurrent.ConcurrentDictionary`2.AddOrUpdate*` is called.

## See also

- `System.Collections.Concurrent`
- Thread-Safe Collections
