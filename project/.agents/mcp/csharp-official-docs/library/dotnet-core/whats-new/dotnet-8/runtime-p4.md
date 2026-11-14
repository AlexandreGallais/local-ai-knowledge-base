---
title: "What's new in .NET 8 runtime (part 4 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-8/runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 8 runtime (part 4 of 6)

### Time abstraction

The new `System.TimeProvider` class and `System.Threading.ITimer` interface add *time abstraction* functionality, which allows you to mock time in test scenarios. In addition, you can use the time abstraction to mock `System.Threading.Tasks.Task` operations that rely on time progression using `System.Threading.Tasks.Task.Delay*` and `System.Threading.Tasks.Task.WaitAsync*`. The time abstraction supports the following essential time operations:

- Retrieve local and UTC time
- Obtain a timestamp for measuring performance
- Create a timer

The following code snippet shows some usage examples.

```csharp
// Get system time.
DateTimeOffset utcNow = TimeProvider.System.GetUtcNow();
DateTimeOffset localNow = TimeProvider.System.GetLocalNow();

TimerCallback callback = s => ((State)s!).Signal();

// Create a timer using the time provider.
ITimer timer = _timeProvider.CreateTimer(
    callback, null, TimeSpan.Zero, Timeout.InfiniteTimeSpan);

// Measure a period using the system time provider.
long providerTimestamp1 = TimeProvider.System.GetTimestamp();
long providerTimestamp2 = TimeProvider.System.GetTimestamp();

TimeSpan period = _timeProvider.GetElapsedTime(providerTimestamp1, providerTimestamp2);
```
```csharp
// Create a time provider that works with a
// time zone that's different than the local time zone.
private class ZonedTimeProvider(TimeZoneInfo zoneInfo) : TimeProvider()
{
    private readonly TimeZoneInfo _zoneInfo = zoneInfo ?? TimeZoneInfo.Local;

    public override TimeZoneInfo LocalTimeZone => _zoneInfo;

    public static TimeProvider FromLocalTimeZone(TimeZoneInfo zoneInfo) =>
        new ZonedTimeProvider(zoneInfo);
}
```
### UTF8 improvements

If you want to enable writing out a string-like representation of your type to a destination span, implement the new `System.IUtf8SpanFormattable` interface on your type. This new interface is closely related to `System.ISpanFormattable`, but targets UTF8 and `Span<byte>` instead of UTF16 and `Span<char>`.

`System.IUtf8SpanFormattable` has been implemented on all of the primitive types (plus others), with the exact same shared logic whether targeting `string`, `Span<char>`, or `Span<byte>`. It has full support for all formats (including the new "B" binary specifier) and all cultures. This means you can now format directly to UTF8 from `Byte`, `Complex`, `Char`, `DateOnly`, `DateTime`, `DateTimeOffset`, `Decimal`, `Double`, `Guid`, `Half`, `IPAddress`, `IPNetwork`, `Int16`, `Int32`, `Int64`, `Int128`, `IntPtr`, `NFloat`, `SByte`, `Single`, `Rune`, `TimeOnly`, `TimeSpan`, `UInt16`, `UInt32`, `UInt64`, `UInt128`, `UIntPtr`, and `Version`.

New `System.Text.Unicode.Utf8.TryWrite*` methods provide a UTF8-based counterpart to the existing `System.MemoryExtensions.TryWrite*` methods, which are UTF16-based. You can use interpolated string syntax to format a complex expression directly into a span of UTF8 bytes, for example:

```csharp
static bool FormatHexVersion(
    short major,
    short minor,
    short build,
    short revision,
    Span<byte> utf8Bytes,
    out int bytesWritten) =>
    Utf8.TryWrite(
        utf8Bytes,
        CultureInfo.InvariantCulture,
        $"{major:X4}.{minor:X4}.{build:X4}.{revision:X4}",
        out bytesWritten);
```

The implementation recognizes `System.IUtf8SpanFormattable` on the format values and uses their implementations to write their UTF8 representations directly to the destination span.

The implementation also utilizes the new `System.Text.Encoding.TryGetBytes(System.ReadOnlySpan{System.Char},System.Span{System.Byte},System.Int32@)` method, which together with its `System.Text.Encoding.TryGetChars(System.ReadOnlySpan{System.Byte},System.Span{System.Char},System.Int32@)` counterpart, supports encoding and decoding into a destination span. If the span isn't long enough to hold the resulting state, the methods return `false` rather than throwing an exception.

### Methods for working with randomness

The `System.Random` and `System.Security.Cryptography.RandomNumberGenerator` types introduce two new methods for working with randomness.

#### GetItems\<T>()

The new `System.Random.GetItems*` and `System.Security.Cryptography.RandomNumberGenerator.GetItems*` methods let you randomly choose a specified number of items from an input set. The following example shows how to use `System.Random.GetItems<T>()` (on the instance provided by the `System.Random.Shared` property) to randomly insert 31 items into an array. This example could be used in a game of "Simon" where players must remember a sequence of colored buttons.

```csharp
private static ReadOnlySpan<Button> s_allButtons = new[]
{
    Button.Red,
    Button.Green,
    Button.Blue,
    Button.Yellow,
};

// ...

Button[] thisRound = Random.Shared.GetItems(s_allButtons, 31);
// Rest of game goes here ...
```

#### Shuffle\<T>()

The new `System.Random.Shuffle*` and `System.Security.Cryptography.RandomNumberGenerator.Shuffle``1(System.Span{``0})` methods let you randomize the order of a span. These methods are useful for reducing training bias in machine learning (so the first thing isn't always training, and the last thing always test).

```csharp
YourType[] trainingData = LoadTrainingData();
Random.Shared.Shuffle(trainingData);

IDataView sourceData = mlContext.Data.LoadFromEnumerable(trainingData);

DataOperationsCatalog.TrainTestData split = mlContext.Data.TrainTestSplit(sourceData);
model = chain.Fit(split.TrainSet);

IDataView predictions = model.Transform(split.TestSet);
// ...
```

### Performance-focused types

.NET 8 introduces several new types aimed at improving app performance.

- The new `System.Collections.Frozen` namespace includes the collection types `System.Collections.Frozen.FrozenDictionary`2` and `System.Collections.Frozen.FrozenSet`1`. These types don't allow any changes to keys and values once a collection is created. That requirement allows faster read operations (for example, `TryGetValue()`). These types are particularly useful for collections that are populated on first use and then persisted for the duration of a long-lived service, for example:

  ```csharp
  private static readonly FrozenDictionary<string, bool> s_configurationData =
      LoadConfigurationData().ToFrozenDictionary();

  // ...
  if (s_configurationData.TryGetValue(key, out bool setting) && setting)
  {
      Process();
  }
  ```

- Methods like `System.MemoryExtensions.IndexOfAny*` look for the first occurrence of *any value in the passed collection*. The new `System.Buffers.SearchValues`1` type is designed to be passed to such methods. Correspondingly, .NET 8 adds new overloads of methods like `System.MemoryExtensions.IndexOfAny*` that accept an instance of the new type. When you create an instance of `System.Buffers.SearchValues`1`, all the data that's necessary to optimize subsequent searches is derived *at that time*, meaning the work is done up front. (The `SearchValues<T>` type was expanded in .NET 9. For more information, see `SearchValues` expansion.)

- The new `System.Text.CompositeFormat` type is useful for optimizing format strings that aren't known at compile time (for example, if the format string is loaded from a resource file). A little extra time is spent up front to do work such as parsing the string, but it saves the work from being done on each use.

  ```csharp
  private static readonly CompositeFormat s_rangeMessage =
      CompositeFormat.Parse(LoadRangeMessageResource());

  // ...
  static string GetMessage(int min, int max) =>
      string.Format(CultureInfo.InvariantCulture, s_rangeMessage, min, max);
  ```

- New `System.IO.Hashing.XxHash3` and `System.IO.Hashing.XxHash128` types provide implementations of the fast XXH3 and XXH128 hash algorithms.

### System.Numerics and System.Runtime.Intrinsics

This section covers improvements to the `System.Numerics` and `System.Runtime.Intrinsics` namespaces.

- `System.Runtime.Intrinsics.Vector256`1`, `System.Numerics.Matrix3x2`, and `System.Numerics.Matrix4x4` have improved hardware acceleration on .NET 8. For example, `System.Runtime.Intrinsics.Vector256`1` was reimplemented to internally be `2x Vector128<T>` operations, where possible. This allows partial acceleration of some functions when `Vector128.IsHardwareAccelerated == true` but `Vector256.IsHardwareAccelerated == false`, such as on Arm64.
- Hardware intrinsics are now annotated with the `ConstExpected` attribute. This ensures that users are aware when the underlying hardware expects a constant and therefore when a non-constant value may unexpectedly hurt performance.
- The `System.Numerics.IFloatingPointIeee754`1.Lerp(`0,`0,`0)` `Lerp` API has been added to `System.Numerics.IFloatingPointIeee754`1` and therefore to `float` (`System.Single`), `double` (`System.Double`), and `System.Half`. This API allows a linear interpolation between two values to be performed efficiently and correctly.

#### Vector512 and AVX-512

.NET Core 3.0 expanded SIMD support to include the platform-specific hardware intrinsics APIs for x86/x64. .NET 5 added support for Arm64 and .NET 7 added the cross-platform hardware intrinsics. .NET 8 furthers SIMD support by introducing `System.Runtime.Intrinsics.Vector512`1` and support for Intel Advanced Vector Extensions 512 (AVX-512) instructions.

Specifically, .NET 8 includes support for the following key <example-value> of AVX-512:

- 512-bit vector operations
- Additional 16 SIMD registers
- Additional instructions available for 128-bit, 256-bit, and 512-bit vectors

If you have hardware that supports the functionality, then `System.Runtime.Intrinsics.Vector512.IsHardwareAccelerated` now reports `true`.

.NET 8 also adds several platform-specific classes under the `System.Runtime.Intrinsics.X86` namespace:

- `System.Runtime.Intrinsics.X86.Avx512F` (foundational)
- `System.Runtime.Intrinsics.X86.Avx512BW` (byte and word)
- `System.Runtime.Intrinsics.X86.Avx512CD` (conflict detection)
- `System.Runtime.Intrinsics.X86.Avx512DQ` (doubleword and quadword)
- `System.Runtime.Intrinsics.X86.Avx512Vbmi` (vector byte manipulation instructions)

These classes follow the same general shape as other instruction set architectures (ISAs) in that they expose an `System.Runtime.Intrinsics.X86.Avx512F.IsSupported` property and a nested `System.Runtime.Intrinsics.X86.Avx512F.X64` class for instructions available only to 64-bit processes. Additionally, each class has a nested `System.Runtime.Intrinsics.X86.Avx512F.VL` class that exposes the `Avx512VL` (vector length) extensions for the corresponding instruction set.

Even if you don't explicitly use `Vector512`-specific or `Avx512F`-specific instructions in your code, you'll likely still benefit from the new AVX-512 support. The JIT can take advantage of the additional registers and instructions implicitly when using `System.Runtime.Intrinsics.Vector128`1` or `System.Runtime.Intrinsics.Vector256`1`. The base class library uses these hardware intrinsics internally in most operations exposed by `System.Span`1` and `System.ReadOnlySpan`1` and in many of the math APIs exposed for the primitive types.

### Data validation

The `System.ComponentModel.DataAnnotations` namespace includes new data validation attributes intended for validation scenarios in cloud-native services. While the pre-existing `DataAnnotations` validators are geared towards typical UI data-entry validation, such as fields on a form, the new attributes are designed to validate non-user-entry data, such as configuration options. In addition to the new attributes, new properties were added to the `System.ComponentModel.DataAnnotations.RangeAttribute` type.

| New API | Description |
|--|--|
| `System.ComponentModel.DataAnnotations.RangeAttribute.MinimumIsExclusive``System.ComponentModel.DataAnnotations.RangeAttribute.MaximumIsExclusive` | Specifies whether bounds are included in the allowable range. |
| `System.ComponentModel.DataAnnotations.LengthAttribute` | Specifies both lower and upper bounds for strings or collections. For example, `[Length(10, 20)]` requires at least 10 elements and at most 20 elements in a collection. |
| `System.ComponentModel.DataAnnotations.Base64StringAttribute` | Validates that a string is a valid Base64 representation. |
| `System.ComponentModel.DataAnnotations.AllowedValuesAttribute``System.ComponentModel.DataAnnotations.DeniedValuesAttribute` | Specify allow lists and deny lists, respectively. For example, `[AllowedValues("apple", "banana", "mango")]`. |

### Metrics

New APIs let you attach key-value pair tags to `System.Diagnostics.Metrics.Meter` and `System.Diagnostics.Metrics.Instrument` objects when you create them. Aggregators of published metric measurements can use the tags to differentiate the aggregated values.

```csharp
var options = new MeterOptions("name")
{
    Version = "version",
    // Attach these tags to the created meter.
    Tags = new TagList()
    {
        { "MeterKey1", "MeterValue1" },
        { "MeterKey2", "MeterValue2" }
    }
};

Meter meter = meterFactory!.Create(options);

Counter<int> counterInstrument = meter.CreateCounter<int>(
    "counter", null, null, new TagList() { { "counterKey1", "counterValue1" } }
);
counterInstrument.Add(1);
```
The new APIs include:

- `System.Diagnostics.Metrics.MeterOptions`
- `System.Diagnostics.Metrics.Meter.#ctor(System.Diagnostics.Metrics.MeterOptions)`
- `System.Diagnostics.Metrics.Meter.CreateCounter``1(System.String,System.String,System.String,System.Collections.Generic.IEnumerable{System.Collections.Generic.KeyValuePair{System.String,System.Object}})`
