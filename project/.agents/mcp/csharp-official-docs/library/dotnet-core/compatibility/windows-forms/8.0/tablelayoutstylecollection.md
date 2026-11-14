---
title: "Breaking change: TableLayoutStyleCollection throws ArgumentException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/8.0/tablelayoutstylecollection.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TableLayoutStyleCollection throws ArgumentException

`System.Windows.Forms.TableLayoutStyleCollection` enforces the type passed to its collection operations. The affected APIs now throw an `System.ArgumentException` instead of an `System.InvalidCastException` if the input is not of type `System.Windows.Forms.TableLayoutStyle`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, if the input couldn't be converted to type `System.Windows.Forms.TableLayoutStyle`, an `System.InvalidCastException` was thrown.

## New behavior

Starting in .NET 8, if the input can't be converted to type `System.Windows.Forms.TableLayoutStyle`, an `System.ArgumentException` is thrown.

## Change category

This change is a *behavioral change*.

## Reason for change

This change helps to make exception types consistent across the code base.

## Recommended action

For most scenarios, this change should not have a significant impact. However, if you previously handled `System.InvalidCastException`, update your code to handle `System.ArgumentException` instead.

## Affected APIs

- `System.Windows.Forms.TableLayoutStyleCollection.System#Collections#IList#Add(System.Object)`
- `System.Windows.Forms.TableLayoutStyleCollection.System#Collections#IList#Insert(System.Int32,System.Object)`
- `System.Windows.Forms.TableLayoutStyleCollection.System#Collections#IList#Remove(System.Object)`
