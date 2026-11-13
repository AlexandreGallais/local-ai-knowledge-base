---
title: "ch21-02-multithreaded (part 2 of 5)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch21-02-multithreaded.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch21-02-multithreaded (part 2 of 5)

## From a Single-Threaded to a Multithreaded Server

Right now, the server will process each request in turn, meaning it won’t
process a second connection until the first connection is finished processing.
If the server received more and more requests, this serial execution would be
less and less optimal. If the server receives a request that takes a long time
to process, subsequent requests will have to wait until the long request is
finished, even if the new requests can be processed quickly. We’ll need to fix
this, but first we’ll look at the problem in action.

### Simulating a Slow Request

We’ll look at how a slowly processing request can affect other requests made to
our current server implementation. Listing 21-10 implements handling a request
to _/sleep_ with a simulated slow response that will cause the server to sleep
for five seconds before responding.

**Listing 21-10: Simulating a slow request by sleeping for five seconds** (src/main.rs)

```rust
use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
};
// --snip--
```

We switched from `if` to `match` now that we have three cases. We need to
explicitly match on a slice of `request_line` to pattern-match against the
string literal values; `match` doesn’t do automatic referencing and
dereferencing, like the equality method does.

The first arm is the same as the `if` block from Listing 21-9. The second arm
matches a request to _/sleep_. When that request is received, the server will
sleep for five seconds before rendering the successful HTML page. The third arm
is the same as the `else` block from Listing 21-9.

You can see how primitive our server is: Real libraries would handle the
recognition of multiple requests in a much less verbose way!

Start the server using `cargo run`. Then, open two browser windows: one for
_http://127.0.0.1:7878_ and the other for _http://127.0.0.1:7878/sleep_. If you
enter the _/_ URI a few times, as before, you’ll see it respond quickly. But if
you enter _/sleep_ and then load _/_, you’ll see that _/_ waits until `sleep`
has slept for its full five seconds before loading.

There are multiple techniques we could use to avoid requests backing up behind
a slow request, including using async as we did Chapter 17; the one we’ll
implement is a thread pool.
