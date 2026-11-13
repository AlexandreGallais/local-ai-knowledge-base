---
title: "BinaryFormatter migration guide: Read BinaryFormatter (NRBF) payloads (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/read-nrbf-payloads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Read BinaryFormatter (NRBF) payloads

[BinaryFormatter] used the .NET Remoting: Binary Format for serialization. This format is known by its abbreviation of MS-NRBF or just NRBF. A common challenge involved in migrating from [BinaryFormatter] is dealing with payloads persisted to storage as reading these payloads previously required [BinaryFormatter]. Some systems need to retain the ability to read these payloads for gradual migrations to new serializers while avoiding a reference to [BinaryFormatter] itself.

As part of .NET 9, a new [NrbfDecoder] class was introduced to decode NRBF payloads without performing _deserialization_ of the payload. This API can safely be used to decode trusted or untrusted payloads without any of the risks that [BinaryFormatter] deserialization carries. However, [NrbfDecoder] merely decodes the data into structures an application can further process. Care must be taken when using [NrbfDecoder] to safely load the data into the appropriate instances.

> **Caution:**
> [NrbfDecoder] is _an_ implementation of an NRBF reader, but its behaviors don't strictly follow [BinaryFormatter]'s implementation. Thus you shouldn't use the output of [NrbfDecoder] to determine whether a call to [BinaryFormatter] would be safe.

You can think of `System.Formats.Nrbf.NrbfDecoder` as being the equivalent of using a JSON/XML reader without the deserializer.
