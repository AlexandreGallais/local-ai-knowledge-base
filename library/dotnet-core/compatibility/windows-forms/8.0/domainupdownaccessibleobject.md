---
title: "Breaking change: WFDEV002 obsoletion is now an error"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/8.0/domainupdownaccessibleobject.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# WFDEV002 obsoletion is now an error

The WFDEV002 obsoletion has been promoted from a warning to an error in .NET 8. Any reference to `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject` will result in a compilation error that can't be suppressed. In addition, `System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance` now returns an object of the internal type `UpDownBase.UpDownBaseAccessibleObject`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, if you referenced the `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject` type, you got compile-time warning WFDEV002.

Also, `System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance` returned an object of type `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject`.

## New behavior

If you reference the `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject` type, you'll get a compile-time error with the same diagnostic ID (WFDEV002).

In addition, since the type has been removed, `System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance` now returns an object of type `UpDownBase.UpDownBaseAccessibleObject` (which is an internal type).

## Change category

This change can affect *source compatibility*.

## Reason for change

The `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject` class has always been documented as "internal use only". All functionality of the class was moved to the base class.

## Recommended action

Update your code to use `System.Windows.Forms.Control.ControlAccessibleObject` or `System.Windows.Forms.AccessibleObject` instead of `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject`.

## Affected APIs

- `System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject`
- `System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance`
