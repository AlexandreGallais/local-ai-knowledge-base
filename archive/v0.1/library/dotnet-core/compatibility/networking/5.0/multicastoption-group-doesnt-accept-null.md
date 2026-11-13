---
title: "Breaking change: MulticastOption.Group doesn't accept a null value"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/5.0/multicastoption-group-doesnt-accept-null.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MulticastOption.Group doesn't accept a null value

`System.Net.Sockets.MulticastOption.Group` no longer accepts a value of `null`. If you set the property to `null`, an `System.ArgumentNullException` is thrown.

## Version introduced

5.0

## Change description

In previous versions of .NET, you can set the `System.Net.Sockets.MulticastOption.Group` property to `null`. If the `System.Net.Sockets.MulticastOption` is later passed to `System.Net.Sockets.Socket.SetSocketOption*`, the runtime throws a `System.NullReferenceException`.

In .NET 5 and later, an `System.ArgumentNullException` is thrown if you set the property to `null`.

## Reason for change

To be consistent with the Framework Design Guidelines, the property has been updated to throw an `System.ArgumentNullException` if the value is `null`.

## Recommended action

Make sure that you don't set `System.Net.Sockets.MulticastOption.Group` to `null`.

## Affected APIs

- `System.Net.Sockets.MulticastOption.Group`
