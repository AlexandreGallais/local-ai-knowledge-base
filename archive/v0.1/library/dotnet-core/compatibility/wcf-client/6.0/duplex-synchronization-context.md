---
title: "Breaking change: DuplexChannelFactory captures synchronization context"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/wcf-client/6.0/duplex-synchronization-context.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Duplex contract captures synchronization context

`System.ServiceModel.DuplexChannelFactory`1` now captures the synchronization context when it's opened, and it dispatches callbacks to the captured context.

## Previous behavior

In previous versions, `System.ServiceModel.DuplexChannelFactory`1` failed to capture the current synchronization context when the channel factory was opened.

## New behavior

Starting in WCF Client 6.0 RC, `System.ServiceModel.DuplexChannelFactory`1` captures the current synchronization context when opened and dispatches callbacks to the captured context. This behavior matches that of .NET Framework.

## Version introduced

WCF Client 6.0 RC

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to fix a bug where callbacks were happening on the wrong thread. The new behavior matches .NET Framework functionality.

## Recommended action

If the new behavior is undesirable, you can revert to version 4.x behavior by applying the `System.ServiceModel.CallbackBehaviorAttribute` to your callback contract with the `System.ServiceModel.CallbackBehaviorAttribute.UseSynchronizationContext` property set to `false`.

## Affected APIs

- DuplexChannelFactory\<TChannel>.Open
- DuplexChannelFactory\<TChannel>.BeginOpen
- DuplexChannelFactory\<TChannel>.EndOpen
