---
title: "Breaking change: TreeView checkbox image truncation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/10.0/treeview-text-location.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TreeView checkbox image truncation

The `System.Windows.Forms.TreeNode` in the `System.Windows.Forms.TreeView` control allows users to customize the DrawMode and add checkboxes. However, the checkbox image will be truncated due to the position of the TreeNode text drawing. To avoid affecting normal, common use, you can use an AppContext switch setting to avoid checkbox truncation in these specific situations.

The checkbox image is truncated when all of the following conditions are met:

- `CheckBoxes` is set to `true`
- `DrawMode` is set to `OwnerDrawText`
- `DrawDefault` is set to `true` in the `OnDrawNode` event

## Previous behavior

In previous versions, when the TreeView control had `CheckBoxes` set to `true`, `DrawMode` set to `OwnerDrawText`, and `DrawDefault` set to `true` in the `OnDrawNode` event, the TreeNode checkbox images were shown truncated on the right border.

## New behavior

By setting the switch `"System.Windows.Forms.TreeView.MoveTreeViewTextLocationOnePixel": true` in the project's runtime config file, the TreeNode checkboxes are displayed completely when the TreeView has `CheckBoxes` set to `true`, `DrawMode` set to `OwnerDrawText`, and `DrawDefault` set to `true` in the `OnDrawNode` event.

## Version introduced

.NET 10

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change ensures that the checkbox of the node in the TreeView control can be fully displayed.

## Recommended action

Manually add `"System.Windows.Forms.TreeView.MoveTreeViewTextLocationOnePixel": true` to the project's *runtimeconfig.json* file to enable the switch.

```json
{
    "runtimeOptions": {
        "configProperties": {
            "System.Windows.Forms.TreeView.MoveTreeViewTextLocationOnePixel": true
        }
    }
}
```

## Affected APIs

- `System.Windows.Forms.TreeView.CheckBoxes`
