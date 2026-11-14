---
title: "What's new in .NET libraries for .NET 9 (part 2 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-9/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9 (part 2 of 6)

## Cryptography

- CryptographicOperations.HashData() method
- KMAC algorithm
- AES-GCM and ChaChaPoly1305 algorithms enabled for iOS/tvOS/MacCatalyst
- X.509 certificate loading
- OpenSSL providers support
- Windows CNG virtualization-based security

### CryptographicOperations.HashData() method

.NET includes several static "one-shot" implementations of hash functions and related functions. These APIs include `System.Security.Cryptography.SHA256.HashData*` and `System.Security.Cryptography.HMACSHA256.HashData*`. One-shot APIs are preferable to use because they can provide the best possible performance and reduce or eliminate allocations.

If a developer wants to provide an API that supports hashing where the caller defines which hash algorithm to use, it's typically done by accepting a `System.Security.Cryptography.HashAlgorithmName` argument. However, using that pattern with one-shot APIs would require switching over every possible `System.Security.Cryptography.HashAlgorithmName` and then using the appropriate method. To solve that problem, .NET 9 introduces the `System.Security.Cryptography.CryptographicOperations.HashData*` API. This API lets you produce a hash or HMAC over an input as a one-shot where the algorithm used is determined by a `System.Security.Cryptography.HashAlgorithmName`.

```csharp
static void HashAndProcessData(HashAlgorithmName hashAlgorithmName, byte[] data)
{
    byte[] hash = CryptographicOperations.HashData(hashAlgorithmName, data);
    ProcessHash(hash);
}
```
### KMAC algorithm

.NET 9 provides the KMAC algorithm as specified by NIST SP-800-185. KECCAK Message Authentication Code (KMAC) is a pseudorandom function and keyed hash function based on KECCAK.

The following new classes use the KMAC algorithm. Use instances to accumulate data to produce a MAC, or use the static `HashData` method for a one-shot over a single input.

- `System.Security.Cryptography.Kmac128`
- `System.Security.Cryptography.Kmac256`
- `System.Security.Cryptography.KmacXof128`
- `System.Security.Cryptography.KmacXof256`

KMAC is available on Linux with OpenSSL 3.0 or later, and on Windows 11 Build 26016 or later. You can use the static `IsSupported` property to determine if the platform supports the desired algorithm.

```csharp
if (Kmac128.IsSupported)
{
    byte[] key = GetKmacKey();
    byte[] input = GetInputToMac();
    byte[] mac = Kmac128.HashData(key, input, outputLength: 32);
}
else
{
    // Handle scenario where KMAC isn't available.
}
```
### AES-GCM and ChaChaPoly1305 algorithms enabled for iOS/tvOS/MacCatalyst

`System.Security.Cryptography.AesGcm.IsSupported` and `ChaChaPoly1305.IsSupported` now return true when running on iOS 13+, tvOS 13+, and Mac Catalyst.

`System.Security.Cryptography.AesGcm` only supports 16-byte (128-bit) tag values on Apple operating systems.

### X.509 certificate loading

Since .NET Framework 2.0, the way to load a certificate has been `new X509Certificate2(bytes)`. There have also been other patterns, such as `new X509Certificate2(bytes, password, flags)`, `new X509Certificate2(path)`, `new X509Certificate2(path, password, flags)`, and `X509Certificate2Collection.Import(bytes, password, flags)` (and its overloads).

Those methods all used content-sniffing to figure out if the input was something it could handle, and then loaded it if it could. For some callers, this strategy was very convenient. But it also has some problems:

- Not every file format works on every OS.
- It's a protocol deviation.
- It's a source of security issues.

.NET 9 introduces a new `System.Security.Cryptography.X509Certificates.X509CertificateLoader` class, which has a "one method, one purpose" design. In its initial version, it only supports two of the five formats that the `System.Security.Cryptography.X509Certificates.X509Certificate2` constructor supported. Those are the two formats that worked on all operation systems.

### OpenSSL providers support

.NET 8 introduced the OpenSSL-specific APIs `System.Security.Cryptography.SafeEvpPKeyHandle.OpenPrivateKeyFromEngine(System.String,System.String)` and `System.Security.Cryptography.SafeEvpPKeyHandle.OpenPublicKeyFromEngine(System.String,System.String)`. They enable interacting with OpenSSL `ENGINE` components and use hardware security modules (HSM), for example.

.NET 9 introduces `System.Security.Cryptography.SafeEvpPKeyHandle.OpenKeyFromProvider(System.String,System.String)`, which enables using OpenSSL providers and interacting with providers such as `tpm2` or `pkcs11`.

Some distros have removed `ENGINE` support since it is now deprecated.

The following snippet shows basic usage:

```csharp
byte[] data = [ /* example data */ ];

// Refer to your provider documentation, for example, https://github.com/tpm2-software/tpm2-openssl/tree/master.
using (SafeEvpPKeyHandle priKeyHandle = SafeEvpPKeyHandle.OpenKeyFromProvider("tpm2", "handle:0x81000007"))
using (ECDsa ecdsaPri = new ECDsaOpenSsl(priKeyHandle))
{
    byte[] signature = ecdsaPri.SignData(data, HashAlgorithmName.SHA256);
    // Do stuff with signature created by TPM.
}
```

There are some performance improvements during the TLS handshake as well as improvements to interactions with RSA private keys that use `ENGINE` components.

### Windows CNG virtualization-based security

Windows 11 has added new APIs to help secure Windows keys with virtualization-based security (VBS). With this new capability, keys can be protected from admin-level key theft attacks with negligible effect on performance, reliability, and scale.

.NET 9 has added matching `System.Security.Cryptography.CngKeyCreationOptions` flags. The following three flags were added:

- `CngKeyCreationOptions.PreferVbs` matching `NCRYPT_PREFER_VBS_FLAG`
- `CngKeyCreationOptions.RequireVbs` matching `NCRYPT_REQUIRE_VBS_FLAG`
- `CngKeyCreationOptions.UsePerBootKey` matching `NCRYPT_USE_PER_BOOT_KEY_FLAG`

The following snippet demonstrates how to use one of the flags:

```csharp
using System.Security.Cryptography;

CngKeyCreationParameters cngCreationParams = new()
{
    Provider = CngProvider.MicrosoftSoftwareKeyStorageProvider,
    KeyCreationOptions = CngKeyCreationOptions.RequireVbs | CngKeyCreationOptions.OverwriteExistingKey,
};

using (CngKey key = CngKey.Create(CngAlgorithm.ECDsaP256, "myKey", cngCreationParams))
using (ECDsaCng ecdsa = new ECDsaCng(key))
{
    // Do stuff with the key.
}
```

## Date and time - new TimeSpan.From\* overloads

The `System.TimeSpan` class offers several `From*` methods that let you create a `TimeSpan` object using a `double`. However, since `double` is a binary-based floating-point format, inherent imprecision can lead to errors. For instance, `TimeSpan.FromSeconds(101.832)` might not precisely represent `101 seconds, 832 milliseconds`, but rather approximately `101 seconds, 831.9999999999936335370875895023345947265625 milliseconds`. This discrepancy has caused frequent confusion, and it's also not the most efficient way to represent such data. To address this, .NET 9 adds new overloads that let you create `TimeSpan` objects from integers. There are new overloads from `FromDays`, `FromHours`, `FromMinutes`, `FromSeconds`, `FromMilliseconds`, and `FromMicroseconds`.

The following code shows an example of calling the `double` and one of the new integer overloads.

```csharp
TimeSpan timeSpan1 = TimeSpan.FromSeconds(value: 101.832);
Console.WriteLine($"timeSpan1 = {timeSpan1}");
// timeSpan1 = 00:01:41.8319999

TimeSpan timeSpan2 = TimeSpan.FromSeconds(seconds: 101, milliseconds: 832);
Console.WriteLine($"timeSpan2 = {timeSpan2}");
// timeSpan2 = 00:01:41.8320000
```
## Dependency injection - `ActivatorUtilities.CreateInstance` constructor

The constructor resolution for `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` has changed in .NET 9. Previously, a constructor that was explicitly marked using the `Microsoft.Extensions.DependencyInjection.ActivatorUtilitiesConstructorAttribute` attribute might not be called, depending on the ordering of constructors and the number of constructor parameters. The logic has changed in .NET 9 such that a constructor that has the attribute is always called.

## Diagnostics

- Debug.Assert reports assert condition by default
- New Activity.AddLink method
- Metrics.Gauge instrument
- Out-of-proc Meter wildcard listening

### Debug.Assert reports assert condition by default

`System.Diagnostics.Debug.Assert*` is commonly used to help validate conditions that are expected to always be true. Failure typically indicates a bug in the code. There are many overloads of `System.Diagnostics.Debug.Assert*`, the simplest of which just accepts a condition:

```csharp
Debug.Assert(a > 0 && b > 0);
```

The assert fails if the condition is false. Historically, however, such asserts were void of any information about what condition failed. Starting in .NET 9, if no message is explicitly provided by the user, the assert will contain the textual representation of the condition. For example, for the previous assert example, rather than getting a message like:

```console
Process terminated. Assertion failed.
   at Program.SomeMethod(Int32 a, Int32 b)
```

The message would now be:

```console
Process terminated. Assertion failed.
a > 0 && b > 0
   at Program.SomeMethod(Int32 a, Int32 b)
```

### New Activity.AddLink method

Previously, you could only link a tracing `System.Diagnostics.Activity` to other tracing contexts when you created the `Activity`?displayProperty=nameWithType). New in .NET 9, the `System.Diagnostics.Activity.AddLink(System.Diagnostics.ActivityLink)` API lets you link an `Activity` object to other tracing contexts after it's created. This change aligns with the OpenTelemetry specifications as well.

```csharp
ActivityContext activityContext = new(ActivityTraceId.CreateRandom(), ActivitySpanId.CreateRandom(), ActivityTraceFlags.None);
ActivityLink activityLink = new(activityContext);

Activity activity = new("LinkTest");
activity.AddLink(activityLink);
```
### Metrics.Gauge instrument

`System.Diagnostics.Metrics` now provides the `System.Diagnostics.Metrics.Gauge`1` instrument according to the OpenTelemetry specification. The `Gauge` instrument is designed to record non-additive values when changes occur. For example, it can measure the background noise level, where summing the values from multiple rooms would be nonsensical. The `Gauge` instrument is a generic type that can record any value type, such as `int`, `double`, or `decimal`.

The following example demonstrates using the `Gauge` instrument.

```csharp
Meter soundMeter = new("MeasurementLibrary.Sound");
Gauge<int> gauge = soundMeter.CreateGauge<int>(
    name: "NoiseLevel",
    unit: "dB", // Decibels.
    description: "Background Noise Level"
    );
gauge.Record(10, new TagList() { { "Room1", "dB" } });
```
### Out-of-proc Meter wildcard listening

It's already possible to listen to meters out-of-process using the `System.Diagnostics.Metrics` event source provider, but prior to .NET 9, you had to specify the full meter name. In .NET 9, you can listen to all meters by using the wildcard character `*`, which allows you to capture metrics from every meter in a process. Additionally, it adds support for listening by meter prefix, so you can listen to all meters whose names start with a specified prefix. For example, specifying `MyMeter*` enables listening to all meters with names that begin with `MyMeter`.

```csharp
// The complete meter name is "MyCompany.MyMeter".
var meter = new Meter("MyCompany.MyMeter");
// Create a counter and allow publishing values.
meter.CreateObservableCounter("MyCounter", () => 1);

// Create the listener to use the wildcard character
// to listen to all meters using prefix names.
MyEventListener listener = new MyEventListener();
```
The `MyEventListener` class is defined as follows.

```csharp
internal class MyEventListener : EventListener
{
    protected override void OnEventSourceCreated(EventSource eventSource)
    {
        Console.WriteLine(eventSource.Name);
        if (eventSource.Name == "System.Diagnostics.Metrics")
        {
            // Listen to all meters with names starting with "MyCompany".
            // If using "*", allow listening to all meters.
            EnableEvents(
                eventSource,
                EventLevel.Informational,
                (EventKeywords)0x3,
                new Dictionary<string, string?>() { { "Metrics", "MyCompany*" } }
                );
        }
    }

    protected override void OnEventWritten(EventWrittenEventArgs eventData)
    {
        // Ignore other events.
        if (eventData.EventSource.Name != "System.Diagnostics.Metrics" ||
            eventData.EventName == "CollectionStart" ||
            eventData.EventName == "CollectionStop" ||
            eventData.EventName == "InstrumentPublished"
            )
            return;

        Console.WriteLine(eventData.EventName);

        if (eventData.Payload is not null)
        {
            for (int i = 0; i < eventData.Payload.Count; i++)
                Console.WriteLine($"\t{eventData.PayloadNames![i]}: {eventData.Payload[i]}");
        }
    }
}
```
When you execute the code, the output is as follows:

```txt
CounterRateValuePublished
        sessionId: 7cd94a65-0d0d-460e-9141-016bf390d522
        meterName: MyCompany.MyMeter
        meterVersion:
        instrumentName: MyCounter
        unit:
        tags:
        rate: 0
        value: 1
        instrumentId: 1
CounterRateValuePublished
        sessionId: 7cd94a65-0d0d-460e-9141-016bf390d522
        meterName: MyCompany.MyMeter
        meterVersion:
        instrumentName: MyCounter
        unit:
        tags:
        rate: 0
        value: 1
        instrumentId: 1
```

You can also use the wildcard character to listen to metrics with monitoring tools like dotnet-counters.
