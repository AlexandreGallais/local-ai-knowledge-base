---
title: "Collect metrics - .NET (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/metrics-collection.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Collect metrics - .NET (part 2 of 2)

## Create a custom collection tool using the .NET MeterListener API

The .NET `System.Diagnostics.Metrics.MeterListener` API allows you to create custom in-process logic to observe the measurements being recorded by `System.Diagnostics.Metrics.Meter`. For guidance on creating custom logic compatible with the older EventCounters instrumentation, see EventCounters.

Modify the code of `Program.cs` to use `System.Diagnostics.Metrics.MeterListener`:

```csharp
using System.Diagnostics.Metrics;

class Program
{
    static Meter s_meter = new("HatCo.HatStore", "1.0.0");
    static Counter<int> s_hatsSold = s_meter.CreateCounter<int>(
        name: "hats-sold",
        unit: "Hats",
        description: "The number of hats sold in our store");

    static void Main(string[] args)
    {
        using MeterListener meterListener = new();
        meterListener.InstrumentPublished = (instrument, listener) =>
        {
            if (instrument.Meter.Name is "HatCo.HatStore")
            {
                listener.EnableMeasurementEvents(instrument);
            }
        };

        meterListener.SetMeasurementEventCallback<int>(OnMeasurementRecorded);
        // Start the meterListener, enabling InstrumentPublished callbacks.
        meterListener.Start();

        var rand = Random.Shared;
        Console.WriteLine("Press any key to exit");
        while (!Console.KeyAvailable)
        {
            //// Simulate hat selling transactions.
            Thread.Sleep(rand.Next(100, 2500));
            s_hatsSold.Add(rand.Next(0, 1000));
        }
    }

    static void OnMeasurementRecorded<T>(
        Instrument instrument,
        T measurement,
        ReadOnlySpan<KeyValuePair<string, object?>> tags,
        object? state)
    {
        Console.WriteLine($"{instrument.Name} recorded measurement {measurement}");
    }
}
```
The following output shows the output of the app with custom callback on each measurement:

```dotnetcli
> dotnet run
Press any key to exit
hats-sold recorded measurement 978
hats-sold recorded measurement 775
hats-sold recorded measurement 666
hats-sold recorded measurement 66
hats-sold recorded measurement 914
hats-sold recorded measurement 912
...
```

### Sample code explanation

The code snippets in this section come from the preceding sample.

In the following highlighted code, an instance of the `System.Diagnostics.Metrics.MeterListener` is created to receive measurements. The `using` keyword causes `Dispose` to be called when the `meterListener` goes out of scope.

```csharp
using MeterListener meterListener = new();
meterListener.InstrumentPublished = (instrument, listener) =>
{
    if (instrument.Meter.Name is "HatCo.HatStore")
    {
        listener.EnableMeasurementEvents(instrument);
    }
};
```
The following highlighted code configures which instruments the listener receives measurements from. `System.Diagnostics.Metrics.MeterListener.InstrumentPublished` is a delegate that is invoked when a new instrument is created within the app.

```csharp
using MeterListener meterListener = new();
meterListener.InstrumentPublished = (instrument, listener) =>
{
    if (instrument.Meter.Name is "HatCo.HatStore")
    {
        listener.EnableMeasurementEvents(instrument);
    }
};
```
The delegate can examine the instrument to decide whether to subscribe. For example, the delegate can check the name, the Meter, or any other public property. `System.Diagnostics.Metrics.MeterListener.EnableMeasurementEvents*` enables receiving measurements from the specified instrument. Code that obtains a reference to an instrument by another approach:

- Is not typically done.
- Can invoke `EnableMeasurementEvents()` at any time with the reference.

The delegate that is invoked when measurements are received from an instrument is configured by calling `System.Diagnostics.Metrics.MeterListener.SetMeasurementEventCallback*`:

```csharp
    meterListener.SetMeasurementEventCallback<int>(OnMeasurementRecorded);
    // Start the meterListener, enabling InstrumentPublished callbacks.
    meterListener.Start();

    var rand = Random.Shared;
    Console.WriteLine("Press any key to exit");
    while (!Console.KeyAvailable)
    {
        //// Simulate hat selling transactions.
        Thread.Sleep(rand.Next(100, 2500));
        s_hatsSold.Add(rand.Next(0, 1000));
    }
}

static void OnMeasurementRecorded<T>(
    Instrument instrument,
    T measurement,
    ReadOnlySpan<KeyValuePair<string, object?>> tags,
    object? state)
{
    Console.WriteLine($"{instrument.Name} recorded measurement {measurement}");
}
```
The generic parameter controls which data type of measurement is received by the callback. For example, a `Counter<int>` generates `int` measurements, `Counter<double>` generates `double` measurements. Instruments can be created with `byte`, `short`, `int`, `long`, `float`, `double`, and `decimal` types. We recommend registering a callback for every data type unless you have scenario-specific knowledge that not all data types are needed. Making repeated calls to `SetMeasurementEventCallback` with different generic arguments may appear a little unusual. The API was designed this way to allow a `MeterListener` to receive measurements with low performance overhead, typically just a few nanoseconds.

When `MeterListener.EnableMeasurementEvents` is called, a `state` object can be provided as
one of the parameters. The `state` object is arbitrary. If you provide a state object in that call, then it is stored with that instrument and returned to you as the `state` parameter in the callback. This is intended both as a convenience and as a performance optimization. Often listeners need to:

- Create an object for each instrument that is storing measurements in memory.
- Have code to do calculations on those measurements.

Alternatively, create a `Dictionary` that maps from the instrument to the storage object and look it up on every measurement. Using a `Dictionary` is much slower than accessing it from `state`.

```csharp
meterListener.Start();
```

The preceding code starts the `MeterListener` which enables callbacks. The `InstrumentPublished` delegate is invoked for every pre-existing Instrument in the process. Newly created Instrument objects also trigger `InstrumentPublished` to be invoked.

```csharp
using MeterListener meterListener = new MeterListener();
```

When the app is done listening, disposing the listener stops the flow of callbacks and releases any internal references to the listener object. The `using` keyword used when declaring `meterListener` causes `Dispose` to be called when the variable goes out of scope. Note that `Dispose` is only promising that it won't initiate new callbacks. Because callbacks
occur on different threads, there may still be callbacks in progress after the call to `Dispose` returns.

To guarantee that a certain region of code in the callback isn't currently executing and won't execute in the future, thread synchronization must be added. `Dispose` doesn't include synchronization by default because:

- Synchronization adds performance overhead in every measurement callback.
- `MeterListener` is designed as a highly performance conscious API.

For custom listeners that use dependency injection and configuration, see Configure metrics.
