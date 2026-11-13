---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 78 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 78 of 102)

```csharp
            object userToken) : base( progressPercentage, userToken )
        {
            this.latestPrimeNumberValue = latestPrime;
        }

        public int LatestPrimeNumber
        {
            get
            {
                return latestPrimeNumberValue;
            }
        }
    }

    public class CalculatePrimeCompletedEventArgs :
        AsyncCompletedEventArgs
    {
        private int numberToTestValue = 0;
        private int firstDivisorValue = 1;
        private bool isPrimeValue;

        public CalculatePrimeCompletedEventArgs(
            int numberToTest,
            int firstDivisor,
            bool isPrime,
            Exception e,
            bool canceled,
            object state) : base(e, canceled, state)
        {
            this.numberToTestValue = numberToTest;
            this.firstDivisorValue = firstDivisor;
            this.isPrimeValue = isPrime;
        }

        public int NumberToTest
        {
            get
            {
                // Raise an exception if the operation failed or
                // was canceled.
                RaiseExceptionIfNecessary();

                // If the operation was successful, return the
                // property value.
                return numberToTestValue;
            }
        }

        public int FirstDivisor
        {
            get
            {
                // Raise an exception if the operation failed or
                // was canceled.
                RaiseExceptionIfNecessary();

                // If the operation was successful, return the
                // property value.
                return firstDivisorValue;
            }
        }

        public bool IsPrime
        {
            get
            {
                // Raise an exception if the operation failed or
                // was canceled.
                RaiseExceptionIfNecessary();

                // If the operation was successful, return the
                // property value.
                return isPrimeValue;
            }
        }
    }

}
```
     ```vb
Imports System.Collections
Imports System.Collections.Specialized
Imports System.ComponentModel
Imports System.Drawing
Imports System.Globalization
Imports System.Threading
Imports System.Windows.Forms

' This form tests the PrimeNumberCalculator component.
Public Class PrimeNumberCalculatorMain
    Inherits System.Windows.Forms.Form

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    ' Private fields
    '
    #Region "Private fields"
    
    Private WithEvents primeNumberCalculator1 As PrimeNumberCalculator
    Private taskGroupBox As System.Windows.Forms.GroupBox
    Private WithEvents listView1 As System.Windows.Forms.ListView
    Private taskIdColHeader As System.Windows.Forms.ColumnHeader
    Private progressColHeader As System.Windows.Forms.ColumnHeader
    Private currentColHeader As System.Windows.Forms.ColumnHeader
    Private buttonPanel As System.Windows.Forms.Panel
    Private panel2 As System.Windows.Forms.Panel
    Private WithEvents startAsyncButton As System.Windows.Forms.Button
    Private WithEvents cancelAsyncButton As System.Windows.Forms.Button
    Private testNumberColHeader As System.Windows.Forms.ColumnHeader
    Private resultColHeader As System.Windows.Forms.ColumnHeader
    Private firstDivisorColHeader As System.Windows.Forms.ColumnHeader
    Private components As System.ComponentModel.IContainer
    Private progressCounter As Integer
    Private progressInterval As Integer = 100

#End Region

    
    Public Sub New()

        InitializeComponent()

    End Sub

    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing Then
            If (components IsNot Nothing) Then
                components.Dispose()
            End If
        End If
        MyBase.Dispose(disposing)

    End Sub

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
#Region "Implementation"

    ' This event handler selects a number randomly to test
    ' for primality. It then starts the asynchronous 
    ' calculation by calling the PrimeNumberCalculator
    ' component's CalculatePrimeAsync method.
    Private Sub startAsyncButton_Click( _
        ByVal sender As System.Object, _
        ByVal e As System.EventArgs) _
        Handles startAsyncButton.Click

        ' Randomly choose test numbers 
        ' up to 200,000 for primality.
        Dim rand As New Random
        Dim testNumber As Integer = rand.Next(200000)

        ' Task IDs are Guids.
        Dim taskId As Guid = Guid.NewGuid()
        Me.AddListViewItem(taskId, testNumber)

        ' Start the asynchronous task.
        Me.primeNumberCalculator1.CalculatePrimeAsync( _
        testNumber, _
        taskId)

    End Sub

    Private Sub listView1_SelectedIndexChanged( _
        ByVal sender As Object, ByVal e As EventArgs) _
        Handles listView1.SelectedIndexChanged

        Me.cancelAsyncButton.Enabled = CanCancel()

    End Sub

    ' This event handler cancels all pending tasks that are
    ' selected in the ListView control.
    Private Sub cancelAsyncButton_Click( _
        ByVal sender As System.Object, _
        ByVal e As System.EventArgs) _
        Handles cancelAsyncButton.Click

        Dim taskId As Guid = Guid.Empty

        ' Cancel all selected tasks.
        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.SelectedItems
            ' Tasks that have been completed or canceled have 
            ' their corresponding ListViewItem.Tag property
            ' set to Nothing.
            If (lvi.Tag IsNot Nothing) Then
                taskId = CType(lvi.Tag, Guid)
                Me.primeNumberCalculator1.CancelAsync(taskId)
                lvi.Selected = False
            End If
        Next lvi

        cancelAsyncButton.Enabled = False

    End Sub

    ' This event handler updates the ListView control when the
    ' PrimeNumberCalculator raises the ProgressChanged event.
    '
    ' On fast computers, the PrimeNumberCalculator can raise many
    ' successive ProgressChanged events, so the user interface 
    ' may be flooded with messages. To prevent the user interface
    ' from hanging, progress is only reported at intervals. 
    Private Sub primeNumberCalculator1_ProgressChanged( _
        ByVal e As ProgressChangedEventArgs) _
        Handles primeNumberCalculator1.ProgressChanged

        Me.progressCounter += 1

        If Me.progressCounter Mod Me.progressInterval = 0 Then

            Dim taskId As Guid = CType(e.UserState, Guid)

            If TypeOf e Is CalculatePrimeProgressChangedEventArgs Then
                Dim cppcea As CalculatePrimeProgressChangedEventArgs = e
                Me.UpdateListViewItem( _
                    taskId, _
                    cppcea.ProgressPercentage, _
                    cppcea.LatestPrimeNumber)
            Else
                Me.UpdateListViewItem( _
                    taskId, e.ProgressPercentage)
            End If
        ElseIf Me.progressCounter > Me.progressInterval Then
            Me.progressCounter = 0
        End If

    End Sub

    ' This event handler updates the ListView control when the
    ' PrimeNumberCalculator raises the CalculatePrimeCompleted
    ' event. The ListView item is updated with the appropriate
    ' outcome of the calculation: Canceled, Error, or result.
    Private Sub primeNumberCalculator1_CalculatePrimeCompleted( _
        ByVal sender As Object, _
        ByVal e As CalculatePrimeCompletedEventArgs) _
        Handles primeNumberCalculator1.CalculatePrimeCompleted

        Dim taskId As Guid = CType(e.UserState, Guid)

        If e.Cancelled Then
            Dim result As String = "Canceled"

            Dim lvi As ListViewItem = UpdateListViewItem( _
                taskId, _
                result)

            If (lvi IsNot Nothing) Then
                lvi.BackColor = Color.Pink
                lvi.Tag = Nothing
            End If

        ElseIf e.Error IsNot Nothing Then

            Dim result As String = "Error"

            Dim lvi As ListViewItem = UpdateListViewItem( _
                taskId, result)

            If (lvi IsNot Nothing) Then
                lvi.BackColor = Color.Red
                lvi.ForeColor = Color.White
                lvi.Tag = Nothing
            End If
        Else
            Dim result As Boolean = e.IsPrime

            Dim lvi As ListViewItem = UpdateListViewItem( _
                taskId, _
                result, _
                e.FirstDivisor)

            If (lvi IsNot Nothing) Then
                lvi.BackColor = Color.LightGray
                lvi.Tag = Nothing
            End If
        End If

    End Sub

#End Region

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
#Region "Private Methods"

    Private Function AddListViewItem( _
        ByVal guid As Guid, _
        ByVal testNumber As Integer) As ListViewItem

        Dim lvi As New ListViewItem
        lvi.Text = testNumber.ToString( _
        CultureInfo.CurrentCulture.NumberFormat)

        lvi.SubItems.Add("Not Started")
        lvi.SubItems.Add("1")
        lvi.SubItems.Add(guid.ToString())
        lvi.SubItems.Add("---")
        lvi.SubItems.Add("---")
        lvi.Tag = guid

        Me.listView1.Items.Add(lvi)

        Return lvi

    End Function

    Private Overloads Function UpdateListViewItem( _
        ByVal guid As Guid, _
        ByVal percentComplete As Integer, _
        ByVal current As Integer) As ListViewItem

        Dim lviRet As ListViewItem = Nothing

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.Items
            If (lvi.Tag IsNot Nothing) Then
                If guid.CompareTo(CType(lvi.Tag, Guid)) = 0 Then
                    lvi.SubItems(1).Text = percentComplete.ToString( _
                    CultureInfo.CurrentCulture.NumberFormat)
                    lvi.SubItems(2).Text = current.ToString( _
                    CultureInfo.CurrentCulture.NumberFormat)
                    lviRet = lvi
                    Exit For
                End If
            End If
        Next lvi

        Return lviRet

    End Function

    Private Overloads Function UpdateListViewItem( _
        ByVal guid As Guid, _
        ByVal percentComplete As Integer, _
        ByVal current As Integer, _
        ByVal result As Boolean, _
        ByVal firstDivisor As Integer) As ListViewItem

        Dim lviRet As ListViewItem = Nothing

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.Items
            If guid.CompareTo(CType(lvi.Tag, Guid)) = 0 Then
                lvi.SubItems(1).Text = percentComplete.ToString( _
                CultureInfo.CurrentCulture.NumberFormat)
                lvi.SubItems(2).Text = current.ToString( _
                CultureInfo.CurrentCulture.NumberFormat)
                lvi.SubItems(4).Text = _
                    IIf(result, "Prime", "Composite")
                lvi.SubItems(5).Text = firstDivisor.ToString( _
                CultureInfo.CurrentCulture.NumberFormat)

                lviRet = lvi

                Exit For
            End If
        Next lvi

        Return lviRet

    End Function

    Private Overloads Function UpdateListViewItem( _
        ByVal guid As Guid, _
        ByVal percentComplete As Integer) As ListViewItem

        Dim lviRet As ListViewItem = Nothing

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.Items
            If (lvi.Tag IsNot Nothing) Then
                If guid.CompareTo(CType(lvi.Tag, Guid)) = 0 Then
                    lvi.SubItems(1).Text = percentComplete.ToString( _
                    CultureInfo.CurrentCulture.NumberFormat)
                    lviRet = lvi
                    Exit For
                End If
            End If
        Next lvi

        Return lviRet

    End Function

    Private Overloads Function UpdateListViewItem( _
        ByVal guid As Guid, _
        ByVal result As Boolean, _
        ByVal firstDivisor As Integer) As ListViewItem

        Dim lviRet As ListViewItem = Nothing

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.Items
            If (lvi.Tag IsNot Nothing) Then
                If guid.CompareTo(CType(lvi.Tag, Guid)) = 0 Then
                    lvi.SubItems(4).Text = _
                        IIf(result, "Prime", "Composite")
                    lvi.SubItems(5).Text = firstDivisor.ToString( _
                    CultureInfo.CurrentCulture.NumberFormat)
                    lviRet = lvi
                    Exit For
                End If
            End If
        Next lvi

        Return lviRet

    End Function

    Private Overloads Function UpdateListViewItem( _
        ByVal guid As Guid, _
        ByVal result As String) As ListViewItem

        Dim lviRet As ListViewItem = Nothing

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.Items
            If (lvi.Tag IsNot Nothing) Then
                If guid.CompareTo(CType(lvi.Tag, Guid)) = 0 Then
                    lvi.SubItems(4).Text = result
                    lviRet = lvi
                    Exit For
                End If
            End If
        Next lvi

        Return lviRet

    End Function

    Private Function CanCancel() As Boolean
        Dim oneIsActive As Boolean = False

        Dim lvi As ListViewItem
        For Each lvi In Me.listView1.SelectedItems
            If (lvi.Tag IsNot Nothing) Then
                oneIsActive = True
                Exit For
            End If
        Next lvi

        Return oneIsActive = True

    End Function

#End Region

    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container
        Me.taskGroupBox = New System.Windows.Forms.GroupBox
        Me.buttonPanel = New System.Windows.Forms.Panel
        Me.cancelAsyncButton = New System.Windows.Forms.Button
        Me.startAsyncButton = New System.Windows.Forms.Button
        Me.listView1 = New System.Windows.Forms.ListView
        Me.testNumberColHeader = New System.Windows.Forms.ColumnHeader
        Me.progressColHeader = New System.Windows.Forms.ColumnHeader
        Me.currentColHeader = New System.Windows.Forms.ColumnHeader
        Me.taskIdColHeader = New System.Windows.Forms.ColumnHeader
        Me.resultColHeader = New System.Windows.Forms.ColumnHeader
        Me.firstDivisorColHeader = New System.Windows.Forms.ColumnHeader
        Me.panel2 = New System.Windows.Forms.Panel
        Me.primeNumberCalculator1 = New PrimeNumberCalculator(Me.components)
        Me.taskGroupBox.SuspendLayout()
        Me.buttonPanel.SuspendLayout()
        Me.SuspendLayout()
        ' 
        ' taskGroupBox
        ' 
        Me.taskGroupBox.Controls.Add(Me.buttonPanel)
        Me.taskGroupBox.Controls.Add(Me.listView1)
        Me.taskGroupBox.Dock = System.Windows.Forms.DockStyle.Fill
        Me.taskGroupBox.Location = New System.Drawing.Point(0, 0)
```
