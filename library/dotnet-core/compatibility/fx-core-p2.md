---
title: "Breaking changes - .NET Framework to .NET Core (part 2 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/fx-core.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Breaking changes - .NET Framework to .NET Core (part 2 of 4)

## Windows Forms

Windows Forms support was added to .NET Core in version 3.0. If you're migrating a Windows Forms app from .NET Framework to .NET Core, the breaking changes listed here might affect your app.

- Removed controls
- CellFormatting event not raised if tooltip is shown
- Control.DefaultFont changed to Segoe UI 9 pt
- Modernization of the FolderBrowserDialog
- SerializableAttribute removed from some Windows Forms types
- AllowUpdateChildControlIndexForTabControls compatibility switch not supported
- DomainUpDown.UseLegacyScrolling compatibility switch not supported
- DoNotLoadLatestRichEditControl compatibility switch not supported
- DoNotSupportSelectAllShortcutInMultilineTextBox compatibility switch not supported
- DontSupportReentrantFilterMessage compatibility switch not supported
- EnableVisualStyleValidation compatibility switch not supported
- UseLegacyContextMenuStripSourceControlValue compatibility switch not supported
- UseLegacyImages compatibility switch not supported
- About and SplashScreen templates are broken for Visual Basic
- Types in Microsoft.VisualBasic.ApplicationServices namespace not available
- Types in Microsoft.VisualBasic.Devices namespace not available
- Types in Microsoft.VisualBasic.MyServices namespace not available

### Removed controls

Starting in .NET Core 3.1, some Windows Forms controls are no longer available.

#### Change description

Starting with .NET Core 3.1, various Windows Forms controls are no longer available. Replacement controls that have better design and support were introduced in .NET Framework 2.0. The deprecated controls were previously removed from designer toolboxes but were still available to be used.

The following types are no longer available:

- `System.Windows.Forms.ContextMenu`
- `System.Windows.Forms.DataGrid`
- `System.Windows.Forms.DataGrid.HitTestType`
- `System.Windows.Forms.DataGrid.HitTestInfo`
- `System.Windows.Forms.DataGridBoolColumn`
- `System.Windows.Forms.DataGridCell`
- `System.Windows.Forms.DataGridColumnStyle`
- `System.Windows.Forms.DataGridColumnStyle.DataGridColumnHeaderAccessibleObject`
- `System.Windows.Forms.DataGridColumnStyle.CompModSwitches`
- `System.Windows.Forms.DataGridLineStyle`
- `System.Windows.Forms.DataGridParentRowsLabelStyle`
- `System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter`
- `System.Windows.Forms.DataGridTableStyle`
- `System.Windows.Forms.DataGridTextBox`
- `System.Windows.Forms.DataGridTextBoxColumn`
- `System.Windows.Forms.GridColumnStylesCollection`
- `System.Windows.Forms.GridTablesFactory`
- `System.Windows.Forms.GridTableStylesCollection`
- `System.Windows.Forms.IDataGridEditingService`
- `System.Windows.Forms.Design.IMenuEditorService`
- `System.Windows.Forms.MainMenu`
- `System.Windows.Forms.Menu`
- `System.Windows.Forms.Menu.MenuItemCollection`
- `System.Windows.Forms.MenuItem`
- `System.Windows.Forms.ToolBar`
- `System.Windows.Forms.ToolBarAppearance`
- `System.Windows.Forms.ToolBarButton`
- `System.Windows.Forms.ToolBar.ToolBarButtonCollection`
- `System.Windows.Forms.ToolBarButtonClickEventArgs`
- `System.Windows.Forms.ToolBarButtonStyle`
- `System.Windows.Forms.ToolBarTextAlign`

#### Version introduced

3.1

#### Recommended action

Each removed control has a recommended replacement control. Refer to the following table:

| Removed control (API) | Recommended replacement | Associated APIs that are removed |
|-|-|-|
| ContextMenu | ContextMenuStrip | |
| DataGrid | DataGridView | DataGridCell, DataGridRow, DataGridTableCollection, DataGridColumnCollection, DataGridTableStyle, DataGridColumnStyle, DataGridLineStyle, DataGridParentRowsLabel, DataGridParentRowsLabelStyle, DataGridBoolColumn, DataGridTextBox, GridColumnStylesCollection, GridTableStylesCollection, HitTestType |
| MainMenu | MenuStrip | |
| Menu | ToolStripDropDown, ToolStripDropDownMenu | MenuItemCollection |
| MenuItem | ToolStripMenuItem | |
| ToolBar | ToolStrip | ToolBarAppearance |
| ToolBarButton | ToolStripButton | ToolBarButtonClickEventArgs, ToolBarButtonClickEventHandler, ToolBarButtonStyle, ToolBarTextAlign|

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.ContextMenu`
- `System.Windows.Forms.GridColumnStylesCollection`
- `System.Windows.Forms.GridTablesFactory`
- `System.Windows.Forms.GridTableStylesCollection`
- `System.Windows.Forms.IDataGridEditingService`
- `System.Windows.Forms.MainMenu`
- `System.Windows.Forms.Menu`
- `System.Windows.Forms.Menu.MenuItemCollection`
- `System.Windows.Forms.MenuItem`
- `System.Windows.Forms.ToolBar`
- `System.Windows.Forms.ToolBar.ToolBarButtonCollection`
- `System.Windows.Forms.ToolBarAppearance`
- `System.Windows.Forms.ToolBarButton`
- `System.Windows.Forms.ToolBarButtonClickEventArgs`
- `System.Windows.Forms.ToolBarButtonStyle`
- `System.Windows.Forms.ToolBarTextAlign`
- `System.Windows.Forms.DataGrid`
- `System.Windows.Forms.DataGrid.HitTestType`
- `System.Windows.Forms.DataGridBoolColumn`
- `System.Windows.Forms.DataGridCell`
- `System.Windows.Forms.DataGridColumnStyle`
- `System.Windows.Forms.DataGridLineStyle`
- `System.Windows.Forms.DataGridParentRowsLabelStyle`
- `System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter`
- `System.Windows.Forms.DataGridTableStyle`
- `System.Windows.Forms.DataGridTextBox`
- `System.Windows.Forms.DataGridTextBoxColumn`
- `System.Windows.Forms.Design.IMenuEditorService`

***

### CellFormatting event not raised if tooltip is shown

A `System.Windows.Forms.DataGridView` now shows a cell's text and error tooltips when hovered by a mouse and when selected via the keyboard. If a tooltip is shown, the `System.Windows.Forms.DataGridView.CellFormatting` event is not raised.

#### Change description

Prior to .NET Core 3.1, a `System.Windows.Forms.DataGridView` that had the `System.Windows.Forms.DataGridView.ShowCellToolTips*` property set to `true` showed a tooltip for a cell's text and errors when the cell was hovered by a mouse. Tooltips were not shown when a cell was selected via the keyboard (for example, by using the Tab key, shortcut keys, or arrow navigation). If the user edited a cell, and then, while the `System.Windows.Forms.DataGridView` was still in edit mode, hovered over a cell that did not have the `System.Windows.Forms.DataGridViewCell.ToolTipText` property set, a `System.Windows.Forms.DataGridView.CellFormatting` event was raised to format the cell's text for display in the cell.

To meet accessibility standards, starting in .NET Core 3.1, a `System.Windows.Forms.DataGridView` that has the `System.Windows.Forms.DataGridView.ShowCellToolTips*` property set to `true` shows tooltips for a cell's text and errors not only when the cell is hovered, but also when it's selected via the keyboard. As a consequence of this change, the `System.Windows.Forms.DataGridView.CellFormatting` event is *not* raised when cells that don't have the `System.Windows.Forms.DataGridViewCell.ToolTipText` property set are hovered while the `System.Windows.Forms.DataGridView` is in edit mode. The event is not raised because the content of the hovered cell is shown as a tooltip instead of being displayed in the cell.

#### Version introduced

3.1

#### Recommended action

Refactor any code that depends on the `System.Windows.Forms.DataGridView.CellFormatting` event while the `System.Windows.Forms.DataGridView` is in edit mode.

#### Category

Windows Forms

#### Affected APIs

None

***

### Default control font changed to Segoe UI 9 pt

#### Change description

In .NET Framework, the `System.Windows.Forms.Control.DefaultFont` property was set to `Microsoft Sans Serif 8.25 pt`. The following image shows a window that uses the default font.

Starting in .NET Core 3.0, the default font is set to `Segoe UI 9 pt` (the same font as `System.Drawing.SystemFonts.MessageBoxFont`). As a result of this change, forms and controls are sized about 27% larger to account for the larger size of the new default font. For example:

This change was made to align with Windows user experience (UX) guidelines.

#### Version introduced

3.0

#### Recommended action

Because of the change in the size of forms and controls, ensure that your application renders correctly.

To retain the original font for a single form, set its default font to `Microsoft Sans Serif 8.25 pt`. For example:

```csharp
public MyForm()
{
    InitializeComponent();
    Font = new Font(new FontFamily("Microsoft Sans Serif"), 8.25f);
}
```

Or, you can change the default font for an entire application in either of the following ways:

- By setting the `ApplicationDefaultFont` MSBuild property to "Microsoft Sans Serif, 8.25pt". This is the preferred technique because it allows Visual Studio to use the new settings in the designer.

  ```xml
  <PropertyGroup>
    <ApplicationDefaultFont>Microsoft Sans Serif, 8.25pt</ApplicationDefaultFont>
  </PropertyGroup>
  ```

- By calling `System.Windows.Forms.Application.SetDefaultFont(System.Drawing.Font)`.

  ```csharp
  class Program
  {
      [STAThread]
      static void Main()
      {
          Application.EnableVisualStyles();
          Application.SetCompatibleTextRenderingDefault(false);
          Application.SetHighDpiMode(HighDpiMode.SystemAware);
          Application.SetDefaultFont(new Font(new FontFamily("Microsoft Sans Serif"), 8.25f));
          Application.Run(new Form1());
      }
  }
  ```

#### Category

- Windows Forms

#### Affected APIs

None.

***

### Modernization of the FolderBrowserDialog

The `System.Windows.Forms.FolderBrowserDialog` control has changed in Windows Forms applications for .NET Core.

#### Change description

In the .NET Framework, Windows forms uses the following dialog for the `System.Windows.Forms.FolderBrowserDialog` control:

In .NET Core 3.0, Windows Forms uses a newer COM-based control that was introduced in Windows Vista:

#### Version introduced

3.0

#### Recommended action

The dialog will be upgraded automatically.

If you desire to retain the original dialog, set the `System.Windows.Forms.FolderBrowserDialog.AutoUpgradeEnabled` property to `false` before showing the dialog, as illustrated by the following code fragment:

```csharp
var dialog = new FolderBrowserDialog();
dialog.AutoUpgradeEnabled = false;
dialog.ShowDialog();
```

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.FolderBrowserDialog`

***

### SerializableAttribute removed from some Windows Forms types

The `System.SerializableAttribute` has been removed from some Windows Forms classes that have no known binary serialization scenarios.

#### Change description

The following types are decorated with the `System.SerializableAttribute` in .NET Framework, but the attribute has been removed in .NET Core:

- `System.InvariantComparer`
- `System.ComponentModel.Design.ExceptionCollection`
- `System.ComponentModel.Design.Serialization.CodeDomSerializerException`
- `System.ComponentModel.Design.Serialization.CodeDomComponentSerializationService.CodeDomSerializationStore`
- `System.Drawing.Design.ToolboxItem`
- `System.Resources.ResXNullRef`
- `System.Resources.ResXDataNode`
- `System.Resources.ResXFileRef`
- `System.Windows.Forms.Cursor`
- `System.Windows.Forms.NativeMethods.MSOCRINFOSTRUCT`
- `System.Windows.Forms.NativeMethods.MSG`

Historically, this serialization mechanism has had serious maintenance and security concerns. Maintaining `SerializableAttribute` on types means those types must be tested for version-to-version serialization changes and potentially framework-to-framework serialization changes. This makes it harder to evolve those types and can be costly to maintain. These types have no known binary serialization scenarios, which minimizes the impact of removing the attribute.

For more information, see Binary serialization.

#### Version introduced

3.0

#### Recommended action

Update any code that may depend on these types being marked as serializable.

#### Category

Windows Forms

#### Affected APIs

- None

***

### AllowUpdateChildControlIndexForTabControls compatibility switch not supported

The `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` compatibility switch is supported in Windows Forms on .NET Framework 4.6 and later versions but is not supported on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework 4.6 and later versions, selecting a tab reorders its control collection. The `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` compatibility switch allows an application to skip this reordering when this behavior is undesirable.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

***

### DomainUpDown.UseLegacyScrolling compatibility switch not supported

The `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch, which was introduced in .NET Framework 4.7.1, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.1, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch allowed developers to opt-out of independent `System.Windows.Forms.DomainUpDown.DownButton` and `System.Windows.Forms.DomainUpDown.UpButton` actions. The switch restored the legacy behavior, in which the `System.Windows.Forms.DomainUpDown.UpButton` is ignored if context text is present, and the developer is required to use `System.Windows.Forms.DomainUpDown.DownButton` action on the control before the `System.Windows.Forms.DomainUpDown.UpButton` action. For more information, see \<AppContextSwitchOverrides> element.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.DomainUpDown.DownButton`
- `System.Windows.Forms.DomainUpDown.UpButton`

***
