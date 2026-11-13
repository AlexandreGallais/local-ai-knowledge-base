---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 79 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 79 of 102)

```vb
        Me.taskGroupBox.Name = "taskGroupBox"
        Me.taskGroupBox.Size = New System.Drawing.Size(608, 254)
        Me.taskGroupBox.TabIndex = 1
        Me.taskGroupBox.TabStop = False
        Me.taskGroupBox.Text = "Tasks"
        ' 
        ' buttonPanel
        ' 
        Me.buttonPanel.Controls.Add(Me.cancelAsyncButton)
        Me.buttonPanel.Controls.Add(Me.startAsyncButton)
        Me.buttonPanel.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.buttonPanel.Location = New System.Drawing.Point(3, 176)
        Me.buttonPanel.Name = "buttonPanel"
        Me.buttonPanel.Size = New System.Drawing.Size(602, 75)
        Me.buttonPanel.TabIndex = 1
        ' 
        ' cancelAsyncButton
        ' 
        Me.cancelAsyncButton.Enabled = False
        Me.cancelAsyncButton.Location = New System.Drawing.Point(128, 24)
        Me.cancelAsyncButton.Name = "cancelAsyncButton"
        Me.cancelAsyncButton.Size = New System.Drawing.Size(88, 23)
        Me.cancelAsyncButton.TabIndex = 1
        Me.cancelAsyncButton.Text = "Cancel"
        ' 
        ' startAsyncButton
        ' 
        Me.startAsyncButton.Location = New System.Drawing.Point(24, 24)
        Me.startAsyncButton.Name = "startAsyncButton"
        Me.startAsyncButton.Size = New System.Drawing.Size(88, 23)
        Me.startAsyncButton.TabIndex = 0
        Me.startAsyncButton.Text = "Start New Task"
        ' 
        ' listView1
        ' 
        Me.listView1.Columns.AddRange(New System.Windows.Forms.ColumnHeader() {Me.testNumberColHeader, Me.progressColHeader, Me.currentColHeader, Me.taskIdColHeader, Me.resultColHeader, Me.firstDivisorColHeader})
        Me.listView1.Dock = System.Windows.Forms.DockStyle.Fill
        Me.listView1.FullRowSelect = True
        Me.listView1.GridLines = True
        Me.listView1.Location = New System.Drawing.Point(3, 16)
        Me.listView1.Name = "listView1"
        Me.listView1.Size = New System.Drawing.Size(602, 160)
        Me.listView1.TabIndex = 0
        Me.listView1.View = System.Windows.Forms.View.Details
        ' 
        ' testNumberColHeader
        ' 
        Me.testNumberColHeader.Text = "Test Number"
        Me.testNumberColHeader.Width = 80
        ' 
        ' progressColHeader
        ' 
        Me.progressColHeader.Text = "Progress"
        ' 
        ' currentColHeader
        ' 
        Me.currentColHeader.Text = "Current"
        ' 
        ' taskIdColHeader
        ' 
        Me.taskIdColHeader.Text = "Task ID"
        Me.taskIdColHeader.Width = 200
        ' 
        ' resultColHeader
        ' 
        Me.resultColHeader.Text = "Result"
        Me.resultColHeader.Width = 80
        ' 
        ' firstDivisorColHeader
        ' 
        Me.firstDivisorColHeader.Text = "First Divisor"
        Me.firstDivisorColHeader.Width = 80
        ' 
        ' panel2
        ' 
        Me.panel2.Location = New System.Drawing.Point(200, 128)
        Me.panel2.Name = "panel2"
        Me.panel2.TabIndex = 2
        ' 
        ' PrimeNumberCalculatorMain
        '
        Me.ClientSize = New System.Drawing.Size(608, 254)
        Me.Controls.Add(taskGroupBox)
        Me.Name = "PrimeNumberCalculatorMain"
        Me.Text = "Prime Number Calculator"
        Me.taskGroupBox.ResumeLayout(False)
        Me.buttonPanel.ResumeLayout(False)
        Me.ResumeLayout(False)

    End Sub

End Class

Public Delegate Sub ProgressChangedEventHandler( _
    ByVal e As ProgressChangedEventArgs)

Public Delegate Sub CalculatePrimeCompletedEventHandler( _
    ByVal sender As Object, _
    ByVal e As CalculatePrimeCompletedEventArgs)

' This class implements the Event-based Asynchronous Pattern.
' It asynchronously computes whether a number is prime or
' composite (not prime).
Public Class PrimeNumberCalculator
    Inherits System.ComponentModel.Component

    Private Delegate Sub WorkerEventHandler( _
    ByVal numberToCheck As Integer, _
    ByVal asyncOp As AsyncOperation)

    Private onProgressReportDelegate As SendOrPostCallback
    Private onCompletedDelegate As SendOrPostCallback

    Private userStateToLifetime As New HybridDictionary()

    Private components As System.ComponentModel.Container = Nothing

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
#Region "Public events"

    Public Event ProgressChanged _
        As ProgressChangedEventHandler
    Public Event CalculatePrimeCompleted _
        As CalculatePrimeCompletedEventHandler

#End Region

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
#Region "Construction and destruction"

    Public Sub New(ByVal container As System.ComponentModel.IContainer)

        container.Add(Me)
        InitializeComponent()

        InitializeDelegates()

    End Sub

    Public Sub New()

        InitializeComponent()

        InitializeDelegates()

    End Sub

    Protected Overridable Sub InitializeDelegates()
        onProgressReportDelegate = _
            New SendOrPostCallback(AddressOf ReportProgress)
        onCompletedDelegate = _
            New SendOrPostCallback(AddressOf CalculateCompleted)
    End Sub

    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing Then
            If (components IsNot Nothing) Then
                components.Dispose()
            End If
        End If
        MyBase.Dispose(disposing)

    End Sub

#End Region

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
#Region "Implementation"

    ' This method starts an asynchronous calculation. 
    ' First, it checks the supplied task ID for uniqueness.
    ' If taskId is unique, it creates a new WorkerEventHandler 
    ' and calls its BeginInvoke method to start the calculation.
    Public Overridable Sub CalculatePrimeAsync( _
        ByVal numberToTest As Integer, _
        ByVal taskId As Object)

        ' Create an AsyncOperation for taskId.
        Dim asyncOp As AsyncOperation = _
            AsyncOperationManager.CreateOperation(taskId)

        ' Multiple threads will access the task dictionary,
        ' so it must be locked to serialize access.
        SyncLock userStateToLifetime.SyncRoot
            If userStateToLifetime.Contains(taskId) Then
                Throw New ArgumentException( _
                    "Task ID parameter must be unique", _
                    "taskId")
            End If

            userStateToLifetime(taskId) = asyncOp
        End SyncLock

        ' Start the asynchronous operation.
        Dim workerDelegate As New WorkerEventHandler( _
            AddressOf CalculateWorker)

        workerDelegate.BeginInvoke( _
            numberToTest, _
            asyncOp, _
            Nothing, _
            Nothing)

    End Sub

    ' Utility method for determining if a 
    ' task has been canceled.
    Private Function TaskCanceled(ByVal taskId As Object) As Boolean
        Return (userStateToLifetime(taskId) Is Nothing)
    End Function

    ' This method cancels a pending asynchronous operation.
    Public Sub CancelAsync(ByVal taskId As Object)

        Dim obj As Object = userStateToLifetime(taskId)
        If (obj IsNot Nothing) Then

            SyncLock userStateToLifetime.SyncRoot

                userStateToLifetime.Remove(taskId)

            End SyncLock

        End If

    End Sub

    ' This method performs the actual prime number computation.
    ' It is executed on the worker thread.
    Private Sub CalculateWorker( _
        ByVal numberToTest As Integer, _
        ByVal asyncOp As AsyncOperation)

        Dim prime As Boolean = False
        Dim firstDivisor As Integer = 1
        Dim exc As Exception = Nothing

        ' Check that the task is still active.
        ' The operation may have been canceled before
        ' the thread was scheduled.
        If Not Me.TaskCanceled(asyncOp.UserSuppliedState) Then

            Try
                ' Find all the prime numbers up to the
                ' square root of numberToTest.
                Dim primes As ArrayList = BuildPrimeNumberList( _
                    numberToTest, asyncOp)

                ' Now we have a list of primes less than 
                'numberToTest.
                prime = IsPrime( _
                    primes, _
                    numberToTest, _
                    firstDivisor)

            Catch ex As Exception
                exc = ex
            End Try

        End If

        Me.CompletionMethod( _
            numberToTest, _
            firstDivisor, _
            prime, _
            exc, _
            TaskCanceled(asyncOp.UserSuppliedState), _
            asyncOp)

    End Sub

    ' This method computes the list of prime numbers used by the
    ' IsPrime method.
    Private Function BuildPrimeNumberList( _
        ByVal numberToTest As Integer, _
        ByVal asyncOp As AsyncOperation) As ArrayList

        Dim e As ProgressChangedEventArgs = Nothing
        Dim primes As New ArrayList
        Dim firstDivisor As Integer
        Dim n As Integer = 5

        ' Add the first prime numbers.
        primes.Add(2)
        primes.Add(3)

        ' Do the work.
        While n < numberToTest And _
            Not Me.TaskCanceled(asyncOp.UserSuppliedState)

            If IsPrime(primes, n, firstDivisor) Then
                ' Report to the client that you found a prime.
                e = New CalculatePrimeProgressChangedEventArgs( _
                    n, _
                    CSng(n) / CSng(numberToTest) * 100, _
                    asyncOp.UserSuppliedState)

                asyncOp.Post(Me.onProgressReportDelegate, e)

                primes.Add(n)

                ' Yield the rest of this time slice.
                Thread.Sleep(0)
            End If

            ' Skip even numbers.
            n += 2

        End While

        Return primes

    End Function

    ' This method tests n for primality against the list of 
    ' prime numbers contained in the primes parameter.
    Private Function IsPrime( _
        ByVal primes As ArrayList, _
        ByVal n As Integer, _
        ByRef firstDivisor As Integer) As Boolean

        Dim foundDivisor As Boolean = False
        Dim exceedsSquareRoot As Boolean = False

        Dim i As Integer = 0
        Dim divisor As Integer = 0
        firstDivisor = 1

        ' Stop the search if:
        ' there are no more primes in the list,
        ' there is a divisor of n in the list, or
        ' there is a prime that is larger than 
        ' the square root of n.
        While i < primes.Count AndAlso _
            Not foundDivisor AndAlso _
            Not exceedsSquareRoot

            ' The divisor variable will be the smallest prime number 
            ' not yet tried.
            divisor = primes(i)
            i = i + 1

            ' Determine whether the divisor is greater than the 
            ' square root of n.
            If divisor * divisor > n Then
                exceedsSquareRoot = True
                ' Determine whether the divisor is a factor of n.
            ElseIf n Mod divisor = 0 Then
                firstDivisor = divisor
                foundDivisor = True
            End If
        End While

        Return Not foundDivisor

    End Function

    ' This method is invoked via the AsyncOperation object,
    ' so it is guaranteed to be executed on the correct thread.
    Private Sub CalculateCompleted(ByVal operationState As Object)
        Dim e As CalculatePrimeCompletedEventArgs = operationState

        OnCalculatePrimeCompleted(e)

    End Sub

    ' This method is invoked via the AsyncOperation object,
    ' so it is guaranteed to be executed on the correct thread.
    Private Sub ReportProgress(ByVal state As Object)
        Dim e As ProgressChangedEventArgs = state

        OnProgressChanged(e)

    End Sub

    Protected Sub OnCalculatePrimeCompleted( _
        ByVal e As CalculatePrimeCompletedEventArgs)

        RaiseEvent CalculatePrimeCompleted(Me, e)

    End Sub

    Protected Sub OnProgressChanged( _
        ByVal e As ProgressChangedEventArgs)

        RaiseEvent ProgressChanged(e)

    End Sub

    ' This is the method that the underlying, free-threaded 
    ' asynchronous behavior will invoke.  This will happen on
    '  an arbitrary thread.
    Private Sub CompletionMethod( _
        ByVal numberToTest As Integer, _
        ByVal firstDivisor As Integer, _
        ByVal prime As Boolean, _
        ByVal exc As Exception, _
        ByVal canceled As Boolean, _
        ByVal asyncOp As AsyncOperation)

        ' If the task was not previously canceled,
        ' remove the task from the lifetime collection.
        If Not canceled Then
            SyncLock userStateToLifetime.SyncRoot
                userStateToLifetime.Remove(asyncOp.UserSuppliedState)
            End SyncLock
        End If

        ' Package the results of the operation in a 
        ' CalculatePrimeCompletedEventArgs.
        Dim e As New CalculatePrimeCompletedEventArgs( _
            numberToTest, _
            firstDivisor, _
            prime, _
            exc, _
            canceled, _
            asyncOp.UserSuppliedState)

        ' End the task. The asyncOp object is responsible 
        ' for marshaling the call.
        asyncOp.PostOperationCompleted(onCompletedDelegate, e)

        ' Note that after the call to PostOperationCompleted, asyncOp
        ' is no longer usable, and any attempt to use it will cause.
        ' an exception to be thrown.

    End Sub

#End Region

    Private Sub InitializeComponent()

    End Sub

End Class

Public Class CalculatePrimeProgressChangedEventArgs
    Inherits ProgressChangedEventArgs
    Private latestPrimeNumberValue As Integer = 1

    Public Sub New( _
        ByVal latestPrime As Integer, _
        ByVal progressPercentage As Integer, _
        ByVal UserState As Object)

        MyBase.New(progressPercentage, UserState)
        Me.latestPrimeNumberValue = latestPrime

    End Sub

    Public ReadOnly Property LatestPrimeNumber() As Integer
        Get
            Return latestPrimeNumberValue
        End Get
    End Property
End Class

Public Class CalculatePrimeCompletedEventArgs
    Inherits AsyncCompletedEventArgs
    Private numberToTestValue As Integer = 0
    Private firstDivisorValue As Integer = 1
    Private isPrimeValue As Boolean

    Public Sub New( _
    ByVal numberToTest As Integer, _
    ByVal firstDivisor As Integer, _
    ByVal isPrime As Boolean, _
    ByVal e As Exception, _
    ByVal canceled As Boolean, _
    ByVal state As Object)

        MyBase.New(e, canceled, state)
        Me.numberToTestValue = numberToTest
        Me.firstDivisorValue = firstDivisor
        Me.isPrimeValue = isPrime

    End Sub

    Public ReadOnly Property NumberToTest() As Integer
        Get
            ' Raise an exception if the operation failed 
            ' or was canceled.
            RaiseExceptionIfNecessary()

            ' If the operation was successful, return 
            ' the property value.
            Return numberToTestValue
```
