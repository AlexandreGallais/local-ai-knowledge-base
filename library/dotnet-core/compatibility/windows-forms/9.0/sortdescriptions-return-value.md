---
title: "Breaking change: BindingSource.SortDescriptions doesn't return null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/9.0/sortdescriptions-return-value.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BindingSource.SortDescriptions doesn't return null

`System.Windows.Forms.BindingSource.SortDescriptions` has been updated to return an empty `System.ComponentModel.ListSortDescriptionCollection` instead of `null` if the data source is not an `System.ComponentModel.IBindingListView`.

## Version introduced

.NET 9 Preview 1

## Previous behavior

Previously, `System.Windows.Forms.BindingSource.SortDescriptions` returned `null` if the data source wasn't an `System.ComponentModel.IBindingListView`.

## New behavior

Starting in .NET 9, `System.Windows.Forms.BindingSource.SortDescriptions` returns an empty `System.ComponentModel.ListSortDescriptionCollection` if the data source is not an `System.ComponentModel.IBindingListView`.

## Change category

This change is a *behavioral change*.

## Reason for change

The previous behavior was incorrect.

`System.Windows.Forms.BindingSource.SortDescriptions` has historically returned `null` if the data source was not an `IBindingListView`. However `BindingSource.SortDescriptions` implements `System.ComponentModel.IBindingListView.SortDescriptions`, whose return type is non-nullable. To align with the interface it implements, `BindingSource.SortDescriptions` was changed to return an empty `ListSortDescriptionCollection` instead.

## Recommended action

If your code expects `null` from `System.Windows.Forms.BindingSource.SortDescriptions` for any reason, update your code to expect an empty `System.ComponentModel.ListSortDescriptionCollection` instead.

## Affected APIs

- `System.Windows.Forms.BindingSource.SortDescriptions`
