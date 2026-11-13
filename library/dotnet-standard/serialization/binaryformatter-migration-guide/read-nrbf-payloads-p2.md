---
title: "BinaryFormatter migration guide: Read BinaryFormatter (NRBF) payloads (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/read-nrbf-payloads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter migration guide: Read BinaryFormatter (NRBF) payloads (part 2 of 3)

## NrbfDecoder

[NrbfDecoder] is part of the new System.Formats.Nrbf NuGet package. It targets not only .NET 9, but also older monikers like .NET Standard 2.0 and .NET Framework. That multi-targeting makes it possible for everyone who uses a supported version of .NET to migrate away from [BinaryFormatter]. [NrbfDecoder] can read payloads that were serialized with [BinaryFormatter] using `System.Runtime.Serialization.Formatters.FormatterTypeStyle.TypesAlways` (the default).

[NrbfDecoder] is designed to treat all input as untrusted. As such it has these principles:

- No type loading of any kind (to avoid risks such as remote code execution).
- No recursion of any kind (to avoid unbound recursion, stack overflow, and denial of service).
- No buffer pre-allocation based on size provided in the payload, if the payload is too small to contain the promised data (to avoid running out of memory and denial of service).
- Decode every part of the input only once (to perform the same amount of work as the potential attacker who created the payload).
- Use collision-resistant randomized hashing to store records referenced by other records (to avoid running out of memory for dictionary backed by an array whose size depends on the number of hash-code collisions).
- Only primitive types can be instantiated in an implicit way. Arrays can be instantiated on demand. Other types are never instantiated.

> **Caution:**
> When using [NrbfDecoder], it's important not to reintroduce those capabilities in general-purpose code, as doing so would negate these safeguards.

### Deserialize a closed set of types

[NrbfDecoder] is useful only when the list of serialized types is a known, closed set. To put it another way, you need to know up front what you want to read, because you also need to create instances of those types and populate them with data that was read from the payload. Consider two opposite examples:

- All `[Serializable]` types from Quartz.NET that can be persisted by the library itself are `sealed`. So there are no custom types that users could create, and the payload can contain only known types. The types also provide public constructors, so it's possible to recreate these types based on the information read from the payload.
- The `System.Configuration.SettingsPropertyValue` type exposes the property `System.Configuration.SettingsPropertyValue.PropertyValue` of type `object` that might internally use [BinaryFormatter] to serialize and deserialize any object that was stored in the configuration file. It could be used to store an integer, a custom type, a dictionary, or literally anything.  Because of that, **it's impossible to migrate this library without introducing breaking changes to the API**.

### Identify NRBF payloads

[NrbfDecoder] provides two `System.Formats.Nrbf.NrbfDecoder.StartsWithPayloadHeader*` methods that let you check whether a given stream or buffer starts with the NRBF header. It's recommended to use these methods when you're migrating payloads persisted with [BinaryFormatter] to a different serializer:

- Check if the payload read from storage is an NRBF payload with `System.Formats.Nrbf.NrbfDecoder.StartsWithPayloadHeader*`.
- If so, read it with `System.Formats.Nrbf.NrbfDecoder.Decode*`, serialize it back with a new serializer, and overwrite the data in the storage.
- If not, use the new serializer to deserialize the data.

```csharp
internal static T LoadFromFile<T>(string path)
{
    bool update = false;
    T value;

    using (FileStream stream = File.OpenRead(path))
    {
        if (NrbfDecoder.StartsWithPayloadHeader(stream))
        {
            value = LoadLegacyValue<T>(stream);
            update = true;
        }
        else
        {
            value = LoadNewValue<T>(stream);
        }
    }

    if (update)
    {
        File.WriteAllBytes(path, NewSerializer(value));
    }

    return value;
}
```
