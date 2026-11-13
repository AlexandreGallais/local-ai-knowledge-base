---
title: "Breaking change: In-box BinaryFormatter implementation removed and always throws"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/9.0/binaryformatter-removal.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# In-box BinaryFormatter implementation removed and always throws

The "in box" `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` implementation now throws exceptions at runtime in all cases. This is the final stage of the BinaryFormatter obsoletion plan.

## Previous behavior

You could construct a `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` instance and use it to serialize and deserialize payloads.

## New behavior

Starting in .NET 9, the in-box `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` implementation throws exceptions on use, even with the settings that previously enabled its use. Those settings are also removed.

## Version introduced

.NET 9 Preview 6

## Type of breaking change

This change is a behavioral change.

## Reason for change

`BinaryFormatter` is an insecure format and the cause of many security bugs. Removing it from the framework increases the overall safety of .NET.

## Recommended action

If your code uses `BinaryFormatter`, you should select a new serialization format and migrate your code.

If you judge the risk of `BinaryFormatter` acceptable for your use cases and you're committed to using a class that can't be made secure, you'll still be able to use `BinaryFormatter` through a separate, unsupported NuGet package.

For more information, including guidance on alternative serializers, see the BinaryFormatter migration guide.

## Affected APIs

- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`

## See also

- Announcement: BinaryFormatter is being removed in .NET 9
- BinaryFormatter disabled across most project types (.NET 8)
- BinaryFormatter serialization APIs produce compiler errors (.NET 7)
- SerializationFormat.Binary is obsolete (.NET 7)
- BinaryFormatter serialization methods are obsolete (.NET 5)
