---
title: "Breaking change: IntPtr and UIntPtr implement IFormattable"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/intptr-uintptr-implement-iformattable.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IntPtr and UIntPtr implement IFormattable

`System.IntPtr` and `System.UIntPtr` now implement `System.IFormattable`. Functions that check for `System.IFormattable` support may now return different results for these types, because they may pass in a format specifier and a culture.

## Change description

In previous versions of .NET, `System.IntPtr` and `System.UIntPtr` do not implement `System.IFormattable`. Functions that check for `System.IFormattable` may fall back to just calling `System.IntPtr.ToString*` or `System.UIntPtr.ToString*`, which means that format specifiers and cultures are not respected.

In .NET 5 and later versions, `System.IntPtr` and `System.UIntPtr` implement `System.IFormattable`. Functions that check for `System.IFormattable` support may now return different results for these types, because they may pass in a format specifier and a culture.

This change impacts scenarios like interpolated strings and `System.Console.WriteLine*`, among others.

## Reason for change

`System.IntPtr` and `System.UIntPtr` now have language support in C# through the `nint` and `nuint` keywords. The backing types were updated to provide near parity (where possible) with functionality exposed by other primitive types, such as `System.Int32`.

## Version introduced

5.0

## Recommended action

If you don't want a format specifier or custom culture to be used when displaying values of these types, you can call the `System.IntPtr.ToString` and `System.UIntPtr.ToString` overloads of `ToString()`.

## Affected APIs

Not detectable via API analysis.
