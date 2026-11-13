---
title: "Breaking change: Some APIs throw ArgumentNullException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/6.0/apis-throw-argumentnullexception.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Some APIs throw ArgumentNullException

Some APIs now validate input parameters and throw an `System.ArgumentNullException` where previously they threw a `System.NullReferenceException`, if invoked with `null` input arguments.

## Change description

In previous .NET versions, the affected APIs throw a `System.NullReferenceException` if invoked with an argument that's `null`.

Starting in .NET 6, the affected APIs throw an `System.ArgumentNullException` if invoked with an argument that's `null`.

## Change category

This change affects binary compatibility.

## Reason for change

Throwing `System.ArgumentNullException` conforms to .NET Runtime behavior. It provides a better debug experience by clearly communicating which argument caused the exception.

## Version introduced

.NET 6

## Recommended action

- Review and, if necessary, update your code to prevent passing `null` input arguments to the affected APIs.
- If your code handles `System.NullReferenceException`, replace or add an additional handler for `System.ArgumentNullException`.

## Affected APIs

The following table lists the affected APIs and specific parameters:

| Method/property | Parameter name |
|-|-|
| `System.Windows.Forms.TreeNodeCollection.Item(System.Int32)` | `index` |
| `System.Windows.Forms.DrawTreeNodeEventArgs.#ctor(System.Drawing.Graphics,System.Windows.Forms.TreeNode,System.Drawing.Rectangle,System.Windows.Forms.TreeNodeStates)` | `graphics` |
| `System.Windows.Forms.DataGridViewRowStateChangedEventArgs.#ctor(System.Windows.Forms.DataGridViewRow,System.Windows.Forms.DataGridViewElementStates)` | `dataGridViewRow` |
| `System.Windows.Forms.DataGridViewColumnStateChangedEventArgs.#ctor(System.Windows.Forms.DataGridViewColumn,System.Windows.Forms.DataGridViewElementStates)` | `dataGridViewColumn` |

## See also

- TreeNodeCollection.Item throws exception if node is assigned elsewhere
