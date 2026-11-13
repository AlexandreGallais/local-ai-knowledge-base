---
title: "How to: Use Components That Support the Event-based Asynchronous Pattern (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/how-to-use-components-that-support-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use Components That Support the Event-based Asynchronous Pattern (part 3 of 5)

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace AsyncPattern
{
    public class Form1 : Form
    {
        private Button loadButton;
        private Button cancelLoadButton;
        private PictureBox pictureBox1;

        public Form1()
        {
            InitializeComponent();

            this.pictureBox1.LoadCompleted +=
                new System.ComponentModel.AsyncCompletedEventHandler(this.pictureBox1_LoadCompleted);
        }

        private void loadButton_Click(object sender, EventArgs e)
        {
            // Replace with a real url.
            pictureBox1.LoadAsync("https://unsplash.com/photos/qhixfmpqN8s/download?force=true&w=1920");
        }

        private void cancelLoadButton_Click(object sender, EventArgs e)
        {
            pictureBox1.CancelAsync();
        }

        private void pictureBox1_LoadCompleted(object sender, AsyncCompletedEventArgs e)
        {
            if (e.Error != null)
            {
                MessageBox.Show(e.Error.Message, "Load Error");
            }
            else if (e.Cancelled)
            {
                MessageBox.Show("Load canceled", "Canceled");
            }
            else
            {
                MessageBox.Show("Load completed", "Completed");
            }
        }

        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.loadButton = new System.Windows.Forms.Button();
            this.cancelLoadButton = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            //
            // pictureBox1
            //
            this.pictureBox1.BackColor = System.Drawing.SystemColors.ControlDark;
            this.pictureBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.pictureBox1.Location = new System.Drawing.Point(10, 10);
            this.pictureBox1.Margin = new System.Windows.Forms.Padding(10);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(323, 300);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            //
            // loadButton
            //
            this.loadButton.Location = new System.Drawing.Point(88, 323);
            this.loadButton.Name = "loadButton";
            this.loadButton.Size = new System.Drawing.Size(75, 23);
            this.loadButton.TabIndex = 1;
            this.loadButton.Text = "Load";
            this.loadButton.Click += new System.EventHandler(this.loadButton_Click);
            //
            // cancelLoadButton
            //
            this.cancelLoadButton.Location = new System.Drawing.Point(170, 323);
            this.cancelLoadButton.Name = "cancelLoadButton";
            this.cancelLoadButton.Size = new System.Drawing.Size(75, 23);
            this.cancelLoadButton.TabIndex = 2;
            this.cancelLoadButton.Text = "Cancel";
            this.cancelLoadButton.Click += new System.EventHandler(this.cancelLoadButton_Click);
            //
            // Form1
            //
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(343, 364);
            this.Controls.Add(this.cancelLoadButton);
            this.Controls.Add(this.loadButton);
            this.Controls.Add(this.pictureBox1);
            this.Name = "Form1";
            this.Padding = new System.Windows.Forms.Padding(10);
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
        }

    }
}
```
     ```vb
Imports System.Windows.Forms

Public Class Form1
    Inherits System.Windows.Forms.Form

    Sub New()

        InitializeComponent()

    End Sub

    Friend WithEvents PictureBox1 As System.Windows.Forms.PictureBox
    Friend WithEvents loadButton As System.Windows.Forms.Button
    Friend WithEvents cancelLoadButton As System.Windows.Forms.Button

    Private Sub loadButton_Click( _
        ByVal sender As System.Object, _
        ByVal e As System.EventArgs) _
        Handles loadButton.Click

        ' Replace with a real url.
        PictureBox1.LoadAsync("https://unsplash.com/photos/qhixfmpqN8s/download?force=true&w=1920")

    End Sub

    Private Sub cancelLoadButton_Click( _
        ByVal sender As System.Object, _
        ByVal e As System.EventArgs) _
        Handles cancelLoadButton.Click

        PictureBox1.CancelAsync()

    End Sub

    Private Sub PictureBox1_LoadCompleted( _
        ByVal sender As System.Object, _
        ByVal e As System.ComponentModel.AsyncCompletedEventArgs) _
        Handles PictureBox1.LoadCompleted

        If (e.Error IsNot Nothing) Then
            MessageBox.Show(e.Error.Message, "Load Error")
        ElseIf e.Cancelled Then
            MessageBox.Show("Load cancelled", "Canceled")
        Else
            MessageBox.Show("Load completed", "Completed")
        End If

    End Sub

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing AndAlso components IsNot Nothing Then
            components.Dispose()
        End If
        MyBase.Dispose(disposing)
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox
        Me.loadButton = New System.Windows.Forms.Button
        Me.cancelLoadButton = New System.Windows.Forms.Button
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'PictureBox1
        '
        Me.PictureBox1.Dock = System.Windows.Forms.DockStyle.Top
        Me.PictureBox1.Location = New System.Drawing.Point(10, 10)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(311, 300)
        Me.PictureBox1.SizeMode = PictureBoxSizeMode.AutoSize.StretchImage
        Me.PictureBox1.TabIndex = 0
        Me.PictureBox1.TabStop = False
        '
        'loadButton
        '
        Me.loadButton.Location = New System.Drawing.Point(87, 330)
        Me.loadButton.Name = "loadButton"
        Me.loadButton.Size = New System.Drawing.Size(75, 23)
        Me.loadButton.TabIndex = 1
        Me.loadButton.Text = "Load"
        '
        'cancelLoadButton
        '
        Me.cancelLoadButton.Location = New System.Drawing.Point(168, 330)
        Me.cancelLoadButton.Name = "cancelLoadButton"
        Me.cancelLoadButton.Size = New System.Drawing.Size(75, 23)
        Me.cancelLoadButton.TabIndex = 2
        Me.cancelLoadButton.Text = "Cancel"
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(331, 385)
        Me.Controls.Add(Me.cancelLoadButton)
        Me.Controls.Add(Me.loadButton)
        Me.Controls.Add(Me.PictureBox1)
        Me.Name = "Form1"
        Me.Padding = New System.Windows.Forms.Padding(10)
        Me.Text = "Form1"
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

End Class
```  

3. Add two buttons, called `loadButton` and `cancelLoadButton`, to your form. Add `System.Windows.Forms.Control.Click` event handlers to start and cancel the download.
