---
title: "std::sync::mpsc (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/mpsc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::mpsc (part 2 of 2)

## SyncSender::try_send

```rust
pub fn try_send(&self, t: T) -> Result<(), TrySendError<T>>
```

Attempts to send a value on this channel without blocking.

This method differs from `send` by returning immediately if the
channel's buffer is full or no receiver is waiting to acquire some
data. Compared with `send`, this function has two failure cases
instead of one (one for disconnection, one for a full buffer).

See `send` for notes about guarantees of whether the
receiver has received the data or not if this function is successful.

# Examples

```rust
use std::sync::mpsc::sync_channel;
use std::thread;

// Create a sync_channel with buffer size 1
let (sync_sender, receiver) = sync_channel(1);
let sync_sender2 = sync_sender.clone();

// First thread owns sync_sender
let handle1 = thread::spawn(move || {
    sync_sender.send(1).unwrap();
    sync_sender.send(2).unwrap();
    // Thread blocked
});

// Second thread owns sync_sender2
let handle2 = thread::spawn(move || {
    // This will return an error and send
    // no message if the buffer is full
    let _ = sync_sender2.try_send(3);
});

let mut msg;
msg = receiver.recv().unwrap();
println!("message {msg} received");

msg = receiver.recv().unwrap();
println!("message {msg} received");

// Third message may have never been sent
match receiver.try_recv() {
    Ok(msg) => println!("message {msg} received"),
    Err(_) => println!("the third message was never sent"),
}

// Wait for threads to complete
handle1.join().unwrap();
handle2.join().unwrap();
```

## Receiver::try_recv

```rust
pub fn try_recv(&self) -> Result<T, TryRecvError>
```

Attempts to return a pending value on this receiver without blocking.

This method will never block the caller in order to wait for data to
become available. Instead, this will always return immediately with a
possible option of pending data on the channel. (See `std::sync` for
precise guarantees on blocking.)

This is useful for a flavor of "optimistic check" before deciding to
block on a receiver.

Compared with `recv`, this function has two failure cases instead of one
(one for disconnection, one for an empty buffer).

# Examples

```rust
use std::sync::mpsc::{Receiver, channel};

let (_, receiver): (_, Receiver<i32>) = channel();

assert!(receiver.try_recv().is_err());
```

## Receiver::recv

```rust
pub fn recv(&self) -> Result<T, RecvError>
```

Attempts to wait for a value on this receiver, returning an error if the
corresponding channel has hung up.

This function will always block the current thread if there is no data
available and it's possible for more data to be sent (at least one sender
still exists). Once a message is sent to the corresponding `Sender`
(or `SyncSender`), this receiver will wake up and return that
message.

If the corresponding `Sender` has disconnected, or it disconnects while
this call is blocking, this call will wake up and return `Err` to
indicate that no more messages can ever be received on this channel.
However, since channels are buffered, messages sent before the disconnect
will still be properly received.

# Examples

```rust
use std::sync::mpsc;
use std::thread;

let (send, recv) = mpsc::channel();
let handle = thread::spawn(move || {
    send.send(1u8).unwrap();
});

handle.join().unwrap();

assert_eq!(Ok(1), recv.recv());
```

Buffering behavior:

```rust
use std::sync::mpsc;
use std::thread;
use std::sync::mpsc::RecvError;

let (send, recv) = mpsc::channel();
let handle = thread::spawn(move || {
    send.send(1u8).unwrap();
    send.send(2).unwrap();
    send.send(3).unwrap();
    drop(send);
});

// wait for the thread to join so we ensure the sender is dropped
handle.join().unwrap();

assert_eq!(Ok(1), recv.recv());
assert_eq!(Ok(2), recv.recv());
assert_eq!(Ok(3), recv.recv());
assert_eq!(Err(RecvError), recv.recv());
```

## Receiver::recv_timeout

```rust
pub fn recv_timeout(&self, timeout: Duration) -> Result<T, RecvTimeoutError>
```

Attempts to wait for a value on this receiver, returning an error if the
corresponding channel has hung up, or if it waits more than `timeout`.

This function will always block the current thread if there is no data
available and it's possible for more data to be sent (at least one sender
still exists). Once a message is sent to the corresponding `Sender`
(or `SyncSender`), this receiver will wake up and return that
message.

If the corresponding `Sender` has disconnected, or it disconnects while
this call is blocking, this call will wake up and return `Err` to
indicate that no more messages can ever be received on this channel.
However, since channels are buffered, messages sent before the disconnect
will still be properly received.

# Examples

Successfully receiving value before encountering timeout:

```rust
use std::thread;
use std::time::Duration;
use std::sync::mpsc;

let (send, recv) = mpsc::channel();

thread::spawn(move || {
    send.send('a').unwrap();
});

assert_eq!(
    recv.recv_timeout(Duration::from_millis(400)),
    Ok('a')
);
```

Receiving an error upon reaching timeout:

```rust
use std::thread;
use std::time::Duration;
use std::sync::mpsc;

let (send, recv) = mpsc::channel();

thread::spawn(move || {
    thread::sleep(Duration::from_millis(800));
    send.send('a').unwrap();
});

assert_eq!(
    recv.recv_timeout(Duration::from_millis(400)),
    Err(mpsc::RecvTimeoutError::Timeout)
);
```

## Receiver::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Returns an iterator that will block waiting for messages, but never
`panic!`. It will return `None` when the channel has hung up.

# Examples

```rust
use std::sync::mpsc::channel;
use std::thread;

let (send, recv) = channel();

thread::spawn(move || {
    send.send(1).unwrap();
    send.send(2).unwrap();
    send.send(3).unwrap();
});

let mut iter = recv.iter();
assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), Some(3));
assert_eq!(iter.next(), None);
```

## Receiver::try_iter

```rust
pub fn try_iter(&self) -> TryIter<'_, T>
```

Returns an iterator that will attempt to yield all pending values.
It will return `None` if there are no more pending values or if the
channel has hung up. The iterator will never `panic!` or block the
user by waiting for values.

# Examples

```rust
use std::sync::mpsc::channel;
use std::thread;
use std::time::Duration;

let (sender, receiver) = channel();

// nothing is in the buffer yet
assert!(receiver.try_iter().next().is_none());

thread::spawn(move || {
    thread::sleep(Duration::from_secs(1));
    sender.send(1).unwrap();
    sender.send(2).unwrap();
    sender.send(3).unwrap();
});

// nothing is in the buffer yet
assert!(receiver.try_iter().next().is_none());

// block for two seconds
thread::sleep(Duration::from_secs(2));

let mut iter = receiver.try_iter();
assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), Some(3));
assert_eq!(iter.next(), None);
```
