---
title: "Breaking change - BufferedStream.WriteByte no longer performs implicit flush"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/10.0/bufferedstream-writebyte-flush.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# BufferedStream.WriteByte no longer performs implicit flush

The `System.IO.BufferedStream.WriteByte(System.Byte)` method no longer performs an implicit flush when the internal buffer is full. This change aligns the behavior of `BufferedStream.WriteByte` with other `Write` methods in the `System.IO.BufferedStream` class, such as `System.IO.BufferedStream.Write(System.Byte[],System.Int32,System.Int32)` and `System.IO.BufferedStream.WriteAsync(System.Byte[],System.Int32,System.Int32,System.Threading.CancellationToken)`, which don't perform an implicit flush.

## Version introduced

.NET 10

## Previous behavior

Previously, when the internal buffer of a `BufferedStream` was full, calling `WriteByte` automatically flushed the buffer to the underlying stream. This behavior was inconsistent with other `Write` methods in `BufferedStream`.

The following example demonstrates the previous behavior:

```csharp
StreamWithFlush streamWithFlush = new();
BufferedStream bufferedStream = new(streamWithFlush, bufferSize: 4);

// Write 4 bytes to fill the buffer
bufferedStream.WriteByte(1);
bufferedStream.WriteByte(2);
bufferedStream.WriteByte(3);
bufferedStream.WriteByte(4); // In .NET 9 and earlier, this caused an implicit flush

class StreamWithFlush : MemoryStream
{
    public override void Flush()
    {
        Console.WriteLine("Flush was called.");

        base.Flush();
    }
}
```
```vb
Module PreviousBehaviorExample
    Sub Example()
        Dim streamWithFlush As New StreamWithFlush()
        Dim bufferedStream As New BufferedStream(streamWithFlush, bufferSize:=4)

        ' Write 4 bytes to fill the buffer
        bufferedStream.WriteByte(1)
        bufferedStream.WriteByte(2)
        bufferedStream.WriteByte(3)
        bufferedStream.WriteByte(4) ' In .NET 9 and earlier, this caused an implicit flush
    End Sub

    Class StreamWithFlush
        Inherits MemoryStream

        Public Overrides Sub Flush()
            Console.WriteLine("Flush was called.")
            MyBase.Flush()
        End Sub
    End Class
End Module
```
## New behavior

Starting in .NET 10, the `WriteByte` method no longer performs an implicit flush when the internal buffer is full. The buffer is only flushed when the `System.IO.BufferedStream.Flush` method is explicitly called or when the `BufferedStream` is disposed.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The implicit flush behavior of `System.IO.BufferedStream.WriteByte(System.Byte)` was inconsistent with other `Write` methods in the `BufferedStream` class, such as `Write` and `WriteAsync`. This inconsistency could lead to unexpected performance issues or unintended side effects when working with streams that are sensitive to flush operations. Removing the implicit flush ensures consistent behavior across all `Write` methods in `BufferedStream`.

## Recommended action

If your application relies on the implicit flush behavior of `BufferedStream.WriteByte`, update your code to explicitly call the `Flush` method when needed. For example:

**Before:**

```csharp
BufferedStream bufferedStream = new(new MemoryStream(), bufferSize: 4);
bufferedStream.WriteByte(1);
bufferedStream.WriteByte(2);
bufferedStream.WriteByte(3);
bufferedStream.WriteByte(4); // Implicit flush occurred here in .NET 9 and earlier
```
```vb
Dim bufferedStream As New BufferedStream(New MemoryStream(), bufferSize:=4)
bufferedStream.WriteByte(1)
bufferedStream.WriteByte(2)
bufferedStream.WriteByte(3)
bufferedStream.WriteByte(4) ' Implicit flush occurred here in .NET 9 and earlier
```
**After:**

```csharp
BufferedStream bufferedStream = new(new MemoryStream(), bufferSize: 4);
bufferedStream.WriteByte(1);
bufferedStream.WriteByte(2);
bufferedStream.WriteByte(3);
bufferedStream.WriteByte(4);
bufferedStream.Flush(); // Explicit flush
```
```vb
Dim bufferedStream As New BufferedStream(New MemoryStream(), bufferSize:=4)
bufferedStream.WriteByte(1)
bufferedStream.WriteByte(2)
bufferedStream.WriteByte(3)
bufferedStream.WriteByte(4)
bufferedStream.Flush() ' Explicit flush
```
## Affected APIs

- `System.IO.BufferedStream.WriteByte(System.Byte)`
