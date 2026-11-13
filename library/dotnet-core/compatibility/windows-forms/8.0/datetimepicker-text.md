---
title: "Breaking change: DateTimePicker.Text is empty string"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/8.0/datetimepicker-text.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DateTimePicker.Text is empty string

The `System.Windows.Forms.DateTimePicker.Text` property of the `System.Windows.Forms.DateTimePicker` control is now set to the empty string until a handle to the control is created.

## Version introduced

.NET 8

## Previous behavior

Previously, the `System.Windows.Forms.DateTimePicker.Text` property was available as soon as the `System.Windows.Forms.DateTimePicker` was constructed.

## New behavior

Starting in .NET 8, the `System.Windows.Forms.DateTimePicker.Text` property is the empty string until a handle is created. Once the handle is created, `System.Windows.Forms.DateTimePicker.Text` is set to the date that's currently displayed in the control.

## Change category

This change is a *behavioral change*.

## Reason for change

This change was introduced so that what the narrator (screen reader) announces matches the displayed text.

## Recommended action

If your code is affected by this change, access the `Text` property later on, as shown in the following code snippet.

```csharp
public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
        Shown += DateTimePicker_Shown;
    }

    private void DateTimePicker_Shown(object sender, EventArgs e)
    {
        string date = this.dateTimePicker1.Text;
    }
}
```

## Affected APIs

- `System.Windows.Forms.DateTimePicker.Text`
