---
title: "Walkthrough: Using Dataflow in a Windows Forms Application (part 1 of 12)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/walkthrough-using-dataflow-in-a-windows-forms-application.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Using Dataflow in a Windows Forms Application

This article demonstrates how to create a network of dataflow blocks that perform image processing in a Windows Forms application.

 This example loads image files from the specified folder, creates a composite image, and displays the result. The example uses the dataflow model to route images through the network. In the dataflow model, independent components of a program communicate with one another by sending messages. When a component receives a message, it performs some action and then passes the result to another component. Compare this with the control flow model, in which an application uses control structures, for example, conditional statements, loops, and so on, to control the order of operations in a program.

## Prerequisites

 Read Dataflow before you start this walkthrough.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Sections

 This walkthrough contains the following sections:

- Creating the Windows Forms Application

- Creating the Dataflow Network

- Connecting the Dataflow Network to the User Interface

- The Complete Example

## Creating the Windows Forms Application

 This section describes how to create the basic Windows Forms application and add controls to the main form.

### To Create the Windows Forms Application

1. In Visual Studio, create a Visual C# or Visual Basic **Windows Forms Application** project. In this document, the project is named `CompositeImages`.

2. On the form designer for the main form, Form1.cs (Form1.vb for Visual Basic), add a `System.Windows.Forms.ToolStrip` control.

3. Add a `System.Windows.Forms.ToolStripButton` control to the `System.Windows.Forms.ToolStrip` control. Set the `System.Windows.Forms.ToolStripItem.DisplayStyle` property to `System.Windows.Forms.ToolStripItemDisplayStyle.Text` and the `System.Windows.Forms.ToolStripItem.Text` property to **Choose Folder**.

4. Add a second `System.Windows.Forms.ToolStripButton` control to the `System.Windows.Forms.ToolStrip` control. Set the `System.Windows.Forms.ToolStripItem.DisplayStyle` property to `System.Windows.Forms.ToolStripItemDisplayStyle.Text`, the `System.Windows.Forms.ToolStripItem.Text` property to **Cancel**, and the `System.Windows.Forms.ToolStripItem.Enabled` property to `False`.

5. Add a `System.Windows.Forms.PictureBox` object to the main form. Set the `System.Windows.Forms.Control.Dock` property to `System.Windows.Forms.DockStyle.Fill`.
