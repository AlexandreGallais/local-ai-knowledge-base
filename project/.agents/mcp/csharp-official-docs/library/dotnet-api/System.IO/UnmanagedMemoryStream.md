---
title: "UnmanagedMemoryStream class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/UnmanagedMemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedMemoryStream class

Namespace: `System.IO`

```csharp
public class UnmanagedMemoryStream : System.IO.Stream
```

Provides access to unmanaged blocks of memory from managed code.

#### Remarks
This class supports access to unmanaged memory using the existing stream-based model and does not require that the contents in the unmanaged memory be copied to the heap.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class.  A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/Overview/sample.cs._
## UnmanagedMemoryStream.UnmanagedMemoryStream() constructor

```csharp
protected UnmanagedMemoryStream ();
```

Initializes a new instance of the `UnmanagedMemoryStream` class.

Exceptions:

- `SecurityException`: The user does not have the required permission.

To be added.

## UnmanagedMemoryStream.UnmanagedMemoryStream(Byte*, Int64) constructor

```csharp
public UnmanagedMemoryStream (byte* pointer, long length);
```

Initializes a new instance of the `UnmanagedMemoryStream` class using the specified location and memory length.

Parameters:

- `pointer`: A pointer to an unmanaged memory location.
- `length`: The length of the memory to use.

Exceptions:

- `SecurityException`: The user does not have the required permission.
- `ArgumentNullException`: The `pointer` value is `null`.
- `ArgumentOutOfRangeException`: The `length` value is less than zero.

-or-

The `length` is large enough to cause an overflow.

#### Remarks
This constructor creates a new instance of the `UnmanagedMemoryStream` class, and by default sets the `CanWrite` property to `false` and the `CanRead` property to `true`. The `Length` property is set to the value of the `length` parameter and cannot be changed.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
## UnmanagedMemoryStream.UnmanagedMemoryStream(SafeBuffer, Int64, Int64) constructor

```csharp
public UnmanagedMemoryStream (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long length);
```

Initializes a new instance of the `UnmanagedMemoryStream` class in a safe buffer with a specified offset and length.

Parameters:

- `buffer`: The buffer to contain the unmanaged memory stream.
- `offset`: The byte position in the buffer at which to start the unmanaged memory stream.
- `length`: The length of the unmanaged memory stream.

To be added.

## UnmanagedMemoryStream.UnmanagedMemoryStream(Byte*, Int64, Int64, FileAccess) constructor

```csharp
public UnmanagedMemoryStream (byte* pointer, long length, long capacity, System.IO.FileAccess access);
```

Initializes a new instance of the `UnmanagedMemoryStream` class using the specified location, memory length, total amount of memory, and file access values.

Parameters:

- `pointer`: A pointer to an unmanaged memory location.
- `length`: The length of the memory to use.
- `capacity`: The total amount of memory assigned to the stream.
- `access`: One of the `FileAccess` values.

Exceptions:

- `SecurityException`: The user does not have the required permission.
- `ArgumentNullException`: The `pointer` value is `null`.
- `ArgumentOutOfRangeException`: The `length` value is less than zero.

-or-

The `capacity` value is less than zero.

-or-

The `length` value is greater than the `capacity` value.

#### Remarks
The `length` parameter defines the current amount of memory in use. If reading or appending data to the stream, the `length` value should be equal to the amount of valid data in the stream to be read from or preserved. If writing to the stream, this value should be zero.

The `capacity` parameter indicates the amount of total memory available. This value can describe a region that is longer than the length specified, or indicate a region that can be appended to. Any attempt to write beyond this value will fail.

The `access` parameter sets the `UnmanagedMemoryStream.CanRead`, and `UnmanagedMemoryStream.CanWrite` properties. Note that specifying `Write` does not guarantee that the stream will be writable. The access parameters allow the implementer to create an object whose implementation can match the actual stream that is exposed.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class.  A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/Overview/sample.cs._
## UnmanagedMemoryStream.UnmanagedMemoryStream(SafeBuffer, Int64, Int64, FileAccess) constructor

```csharp
public UnmanagedMemoryStream (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long length, System.IO.FileAccess access);
```

Initializes a new instance of the `UnmanagedMemoryStream` class in a safe buffer with a specified offset, length, and file access.

Parameters:

- `buffer`: The buffer to contain the unmanaged memory stream.
- `offset`: The byte position in the buffer at which to start the unmanaged memory stream.
- `length`: The length of the unmanaged memory stream.
- `access`: The mode of file access to the unmanaged memory stream.

To be added.

## UnmanagedMemoryStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether a stream supports reading.

Returns: `false` if the object was created by a constructor with an `access` parameter that did not include reading the stream and if the stream is closed; otherwise, `true`.

#### Remarks
This property indicates whether the current stream object supports reading.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class. In this example, an `UnmanagedMemoryStream` object is passed to a method that checks the `CanRead` property before attempting to display the contents to the console.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
## UnmanagedMemoryStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether a stream supports seeking.

Returns: `false` if the stream is closed; otherwise, `true`.

#### Remarks
This property indicates whether the current stream object supports seeking.

## UnmanagedMemoryStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether a stream supports writing.

Returns: `false` if the object was created by a constructor with an `access` parameter value that supports writing or was created by a constructor that had no parameters, or if the stream is closed; otherwise, `true`.

#### Remarks
This property indicates whether the current stream object supports writing.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class. In this example, an `UnmanagedMemoryStream` object is passed to a method that checks the `CanWrite` property before attempting to write the data to the stream.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
## UnmanagedMemoryStream.Capacity property

```csharp
public long Capacity { get; }
```

Gets the stream length (size) or the total amount of memory assigned to a stream (capacity).

Returns: The size or capacity of the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.

#### Remarks
This property returns the `capacity` value provided to the constructor. If no `capacity` value was specified when the stream was initialized, this property returns the stream length.

## UnmanagedMemoryStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of the data in a stream.

Returns: The length of the data in the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.

#### Remarks
If unchanged since the stream was initialized, this property returns the length value provided to the constructor. If changes to the stream have occurred, this property reflects any changes to the length of the data.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
## UnmanagedMemoryStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position in a stream.

Returns: The current position in the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `ArgumentOutOfRangeException`: The position is set to a value that is less than zero, or the position is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> or results in overflow when added to the current pointer.

#### Remarks
When a stream is initialized, this property is set to zero.

Although you can set the position of the stream beyond the stream's capacity, you will not be able to access that area using the `UnmanagedMemoryStream.Read` and `UnmanagedMemoryStream.Write` methods. `UnmanagedMemoryStream.Read` will return 0 and `UnmanagedMemoryStream.Write` will throw a `NotSupportedException`. This support is primarily for design and code compatibility with basic <example-value> operations.

## UnmanagedMemoryStream.PositionPointer property

```csharp
public byte* PositionPointer { get; set; }
```

Gets or sets a byte pointer to a stream based on the current position in the stream.

Returns: A byte pointer.

Exceptions:

- `IndexOutOfRangeException`: The current position is larger than the capacity of the stream.
- `ArgumentOutOfRangeException`: The position is being set is not a valid position in the current stream.
- `IOException`: The pointer is being set to a lower value than the starting position of the stream.
- `NotSupportedException`: The stream was initialized for use with a `SafeBuffer`. The `UnmanagedMemoryStream.PositionPointer` property is valid only for streams that are initialized with a `Byte` pointer.

#### Remarks
To return a pointer to the entire stream, set the `Position` property to zero, and then call this property.

## UnmanagedMemoryStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `UnmanagedMemoryStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `UnmanagedMemoryStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `UnmanagedMemoryStream.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `UnmanagedMemoryStream` references. This method invokes the `Dispose` method of each referenced object.

## UnmanagedMemoryStream.Flush() method

```csharp
public override void Flush ();
```

Overrides the `Stream.Flush` method so that no action is performed.

Exceptions:

- `ObjectDisposedException`: The stream is closed.

#### Remarks
This method performs no action for this class but is included as part of the `Stream` base class. Since any data is written to RAM, this method is redundant.

## UnmanagedMemoryStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Overrides the `Stream.FlushAsync` method so that the operation is cancelled if specified, but no other action is performed.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If the operation isn't cancelled, the `UnmanagedMemoryStream` calls the `UnmanagedMemoryStream.Flush` method, which means that no action performed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## UnmanagedMemoryStream.Initialize(Byte*, Int64, Int64, FileAccess) method

```csharp
protected void Initialize (byte* pointer, long length, long capacity, System.IO.FileAccess access);
```

Initializes a new instance of the `UnmanagedMemoryStream` class by using a pointer to an unmanaged memory location.

Parameters:

- `pointer`: A pointer to an unmanaged memory location.
- `length`: The length of the memory to use.
- `capacity`: The total amount of memory assigned to the stream.
- `access`: One of the `FileAccess` values.

Exceptions:

- `SecurityException`: The user does not have the required permission.
- `ArgumentNullException`: The `pointer` value is `null`.
- `ArgumentOutOfRangeException`: The `length` value is less than zero.

-or-

The `capacity` value is less than zero.

-or-

The `length` value is large enough to cause an overflow.

#### Remarks

This method is equivalent to the `UnmanagedMemoryStream.%23ctor` constructor. It supports methods that need to initialize the pointer before setting stream variables and, therefore, cannot call the parameterized constructor. Such methods should use the parameterless constructor, `%23ctor`, initialize the pointer, and then invoke the `UnmanagedMemoryStream.Initialize` method.
