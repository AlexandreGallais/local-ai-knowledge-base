---
title: "Breaking change: BinaryReader.ReadString() returns '\\uFFFD' on malformed sequences"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/9.0/binaryreader.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryReader.ReadString() returns "\uFFFD" on malformed sequences

A minor breaking change was introduced that only affects malformed encoded payloads.

Prior to .NET 9, a malformed encoded string `[0x01, 0xC2]` that was parsed with `System.IO.BinaryReader.ReadString` returned an empty string.

Starting in .NET 9, `System.IO.BinaryReader.ReadString` returns "\uFFFD", which is the `REPLACEMENT CHARACTER` used to replace an unknown, unrecognized, or unrepresentable character. This change only affects malformed payloads and matches Unicode standards.

## Previous behavior

```csharp
var ms = new MemoryStream(new byte[] { 0x01, 0xC2 });
using (var br = new BinaryReader(ms))
{
    string s = br.ReadString();
    Console.WriteLine(s == "\uFFFD"); // false
    Console.WriteLine(s.Length); // 0
}
```

## New behavior

Starting in .NET 9, the same code snippet produces different results for `s == "\uFFFD"` and `s.Length`, as shown in the code comments:

```csharp
var ms = new MemoryStream(new byte[] { 0x01, 0xC2 });
using (var br = new BinaryReader(ms))
{
    string s = br.ReadString();
    Console.WriteLine(s == "\uFFFD"); // true
    Console.WriteLine(s.Length); // 1
}
```

## Version introduced

.NET 9 Preview 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made as a performance improvement that affects a rare scenario.

## Recommended action

If you want to keep the previous behavior where incomplete byte sequence were omitted at the end of the string, call `TrimEnd("\uFFFD")` on the result.

## Affected APIs

- `System.IO.BinaryReader.ReadString`
