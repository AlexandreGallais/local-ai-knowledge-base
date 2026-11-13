---
title: "ch21-01-single-threaded (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch21-01-single-threaded.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch21-01-single-threaded (part 3 of 3)

### Writing a Response

We’re going to implement sending data in response to a client request.
Responses have the following format:

```text
HTTP-Version Status-Code Reason-Phrase CRLF
headers CRLF
message-body
```

The first line is a _status line_ that contains the HTTP version used in the
response, a numeric status code that summarizes the result of the request, and
a reason phrase that provides a text description of the status code. After the
CRLF sequence are any headers, another CRLF sequence, and the body of the
response.

Here is an example response that uses HTTP version 1.1 and has a status code of
200, an OK reason phrase, no headers, and no body:

```text
HTTP/1.1 200 OK\r\n\r\n
```

The status code 200 is the standard success response. The text is a tiny
successful HTTP response. Let’s write this to the stream as our response to a
successful request! From the `handle_connection` function, remove the
`println!` that was printing the request data and replace it with the code in
Listing 21-3.

**Listing 21-3: Writing a tiny successful HTTP response to the stream** (src/main.rs)

```rust
fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    let response = "HTTP/1.1 200 OK\r\n\r\n";

    stream.write_all(response.as_bytes()).unwrap();
}
```

The first new line defines the `response` variable that holds the success
message’s data. Then, we call `as_bytes` on our `response` to convert the
string data to bytes. The `write_all` method on `stream` takes a `&[u8]` and
sends those bytes directly down the connection. Because the `write_all`
operation could fail, we use `unwrap` on any error result as before. Again, in
a real application, you would add error handling here.

With these changes, let’s run our code and make a request. We’re no longer
printing any data to the terminal, so we won’t see any output other than the
output from Cargo. When you load _127.0.0.1:7878_ in a web browser, you should
get a blank page instead of an error. You’ve just handcoded receiving an HTTP
request and sending a response!

### Returning Real HTML

Let’s implement the functionality for returning more than a blank page. Create
the new file _hello.html_ in the root of your project directory, not in the
_src_ directory. You can input any HTML you want; Listing 21-4 shows one
possibility.

**Listing 21-4: A sample HTML file to return in a response** (hello.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello!</title>
  </head>
  <body>
    <h1>Hello!</h1>
    <p>Hi from Rust</p>
  </body>
</html>
```

This is a minimal HTML5 document with a heading and some text. To return this
from the server when a request is received, we’ll modify `handle_connection` as
shown in Listing 21-5 to read the HTML file, add it to the response as a body,
and send it.

**Listing 21-5: Sending the contents of *hello.html* as the body of the response** (src/main.rs)

```rust
use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
};
// --snip--
```

We’ve added `fs` to the `use` statement to bring the standard library’s
filesystem module into scope. The code for reading the contents of a file to a
string should look familiar; we used it when we read the contents of a file for
our I/O project in Listing 12-4.

Next, we use `format!` to add the file’s contents as the body of the success
response. To ensure a valid HTTP response, we add the `Content-Length` header,
which is set to the size of our response body—in this case, the size of
`hello.html`.

Run this code with `cargo run` and load _127.0.0.1:7878_ in your browser; you
should see your HTML rendered!

Currently, we’re ignoring the request data in `http_request` and just sending
back the contents of the HTML file unconditionally. That means if you try
requesting _127.0.0.1:7878/something-else_ in your browser, you’ll still get
back this same HTML response. At the moment, our server is very limited and
does not do what most web servers do. We want to customize our responses
depending on the request and only send back the HTML file for a well-formed
request to _/_.

### Validating the Request and Selectively Responding

Right now, our web server will return the HTML in the file no matter what the
client requested. Let’s add functionality to check that the browser is
requesting _/_ before returning the HTML file and to return an error if the
browser requests anything else. For this we need to modify `handle_connection`,
as shown in Listing 21-6. This new code checks the content of the request
received against what we know a request for _/_ looks like and adds `if` and
`else` blocks to treat requests differently.

**Listing 21-6: Handling requests to */* differently from other requests** (src/main.rs)

```rust
// --snip--

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    if request_line == "GET / HTTP/1.1" {
        let status_line = "HTTP/1.1 200 OK";
        let contents = fs::read_to_string("hello.html").unwrap();
        let length = contents.len();

        let response = format!(
            "{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}"
        );

        stream.write_all(response.as_bytes()).unwrap();
    } else {
        // some other request
    }
}
```

We’re only going to be looking at the first line of the HTTP request, so rather
than reading the entire request into a vector, we’re calling `next` to get the
first item from the iterator. The first `unwrap` takes care of the `Option` and
stops the program if the iterator has no items. The second `unwrap` handles the
`Result` and has the same effect as the `unwrap` that was in the `map` added in
Listing 21-2.

Next, we check the `request_line` to see if it equals the request line of a GET
request to the _/_ path. If it does, the `if` block returns the contents of our
HTML file.

If the `request_line` does _not_ equal the GET request to the _/_ path, it
means we’ve received some other request. We’ll add code to the `else` block in
a moment to respond to all other requests.

Run this code now and request _127.0.0.1:7878_; you should get the HTML in
_hello.html_. If you make any other request, such as
_127.0.0.1:7878/something-else_, you’ll get a connection error like those you
saw when running the code in Listing 21-1 and Listing 21-2.

Now let’s add the code in Listing 21-7 to the `else` block to return a response
with the status code 404, which signals that the content for the request was
not found. We’ll also return some HTML for a page to render in the browser
indicating the response to the end user.

**Listing 21-7: Responding with status code 404 and an error page if anything other than */* was requested** (src/main.rs)

```rust
// --snip--
} else {
    let status_line = "HTTP/1.1 404 NOT FOUND";
    let contents = fs::read_to_string("404.html").unwrap();
    let length = contents.len();

    let response = format!(
        "{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}"
    );

    stream.write_all(response.as_bytes()).unwrap();
}
```

Here, our response has a status line with status code 404 and the reason phrase
`NOT FOUND`. The body of the response will be the HTML in the file _404.html_.
You’ll need to create a _404.html_ file next to _hello.html_ for the error
page; again, feel free to use any HTML you want, or use the example HTML in
Listing 21-8.

**Listing 21-8: Sample content for the page to send back with any 404 response** (404.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello!</title>
  </head>
  <body>
    <h1>Oops!</h1>
    <p>Sorry, I don't know what you're asking for.</p>
  </body>
</html>
```

With these changes, run your server again. Requesting _127.0.0.1:7878_ should
return the contents of _hello.html_, and any other request, like
_127.0.0.1:7878/foo_, should return the error HTML from _404.html_.

### Refactoring

At the moment, the `if` and `else` blocks have a lot of repetition: They’re
both reading files and writing the contents of the files to the stream. The
only differences are the status line and the filename. Let’s make the code more
concise by pulling out those differences into separate `if` and `else` lines
that will assign the values of the status line and the filename to variables;
we can then use those variables unconditionally in the code to read the file
and write the response. Listing 21-9 shows the resultant code after replacing
the large `if` and `else` blocks.

**Listing 21-9: Refactoring the `if` and `else` blocks to contain only the code that differs between the two cases** (src/main.rs)

```rust
// --snip--

fn handle_connection(mut stream: TcpStream) {
    // --snip--
```

Now the `if` and `else` blocks only return the appropriate values for the
status line and filename in a tuple; we then use destructuring to assign these
two values to `status_line` and `filename` using a pattern in the `let`
statement, as discussed in Chapter 19.

The previously duplicated code is now outside the `if` and `else` blocks and
uses the `status_line` and `filename` variables. This makes it easier to see
the difference between the two cases, and it means we have only one place to
update the code if we want to change how the file reading and response writing
work. The behavior of the code in Listing 21-9 will be the same as that in
Listing 21-7.

Awesome! We now have a simple web server in approximately 40 lines of Rust code
that responds to one request with a page of content and responds to all other
requests with a 404 response.

Currently, our server runs in a single thread, meaning it can only serve one
request at a time. Let’s examine how that can be a problem by simulating some
slow requests. Then, we’ll fix it so that our server can handle multiple
requests at once.
