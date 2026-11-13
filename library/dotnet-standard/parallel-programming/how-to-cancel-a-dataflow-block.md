---
title: "How to: Cancel a Dataflow Block (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-cancel-a-dataflow-block.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Cancel a Dataflow Block

This document demonstrates how to enable cancellation in your application. This example uses Windows Forms to show where work items are active in a dataflow pipeline and also the effects of cancellation.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## To Create the Windows Forms Application

1. Create a C# or Visual Basic **Windows Forms Application** project. In the following steps, the project is named `CancellationWinForms`.

2. On the form designer for the main form, Form1.cs (Form1.vb for Visual Basic), add a `System.Windows.Forms.ToolStrip` control.

3. Add a `System.Windows.Forms.ToolStripButton` control to the `System.Windows.Forms.ToolStrip` control. Set the `System.Windows.Forms.ToolStripItem.DisplayStyle` property to `System.Windows.Forms.ToolStripItemDisplayStyle.Text` and the `System.Windows.Forms.ToolStripItem.Text` property to **Add Work Items**.

4. Add a second `System.Windows.Forms.ToolStripButton` control to the `System.Windows.Forms.ToolStrip` control. Set the `System.Windows.Forms.ToolStripItem.DisplayStyle` property to `System.Windows.Forms.ToolStripItemDisplayStyle.Text`, the `System.Windows.Forms.ToolStripItem.Text` property to **Cancel**, and the `System.Windows.Forms.ToolStripItem.Enabled` property to `False`.

5. Add four `System.Windows.Forms.ToolStripProgressBar` objects to the `System.Windows.Forms.ToolStrip` control.
