# HttpResponse interface (java.net.http)

```java
public interface HttpResponse<T>
```

An HTTP response.

<p> An {@code HttpResponse} is not created directly, but rather returned as
a result of sending an {@link HttpRequest}. An {@code HttpResponse} is
made available when the response status code and headers have been received,
and typically after the response body has also been completely received.
Whether or not the {@code HttpResponse} is made available before the response
body has been completely received depends on the {@link BodyHandler
BodyHandler} provided when sending the {@code HttpRequest}.

<p> This class provides methods for accessing the response status code,
headers, the response body, and the {@code HttpRequest} corresponding
to this response.

<p> The following is an example of retrieving a response as a String:

{@snippet :
    HttpResponse<String> response = client
      .send(request, BodyHandlers.ofString()); }

<p> The class {@link BodyHandlers BodyHandlers} provides implementations
of many common response handlers. Alternatively, a custom {@code BodyHandler}
implementation can be used.

@param <T> the response body type
@since 11

## HttpResponse.statusCode()

```java
public int statusCode()
```

Returns the status code for this response.

@return the response code

## HttpResponse.connectionLabel()

```java
default Optional<String> connectionLabel()
```

{@return if present, a label identifying the connection on which the
response was received}
<p>
The format of the string is opaque, but the value is fixed and unique
for any connection in the scope of the associated {@link HttpClient}
instance.

@implSpec
The default implementation of this method returns
{@link Optional#empty() Optional.empty()}.

@implNote
Instances of {@code HttpResponse} returned by the JDK built-in
implementation of {@code HttpClient} always return a non-empty value.

@since 25

## HttpResponse.request()

```java
public HttpRequest request()
```

Returns the {@link HttpRequest} corresponding to this response.

<p> The returned {@code HttpRequest} may not be the initiating request
provided when {@linkplain HttpClient#send(HttpRequest, BodyHandler)
sending}. For example, if the initiating request was redirected, then the
request returned by this method will have the redirected URI, which will
be different from the initiating request URI.

@see #previousResponse()

@return the request

## HttpResponse.previousResponse()

```java
public Optional<HttpResponse<T>> previousResponse()
```

Returns an {@code Optional} containing the previous intermediate response
if one was received. An intermediate response is one that is received
as a result of redirection or authentication. If no previous response
was received then an empty {@code Optional} is returned.

@return an Optional containing the HttpResponse, if any.

## HttpResponse.headers()

```java
public HttpHeaders headers()
```

Returns the received response headers.

@return the response headers

## HttpResponse.body()

```java
public T body()
```

Returns the body. Depending on the type of {@code T}, the returned body
may represent the body after it was read (such as {@code byte[]}, or
{@code String}, or {@code Path}) or it may represent an object with
which the body is read, such as an {@link java.io.InputStream}.

<p> If this {@code HttpResponse} was returned from an invocation of
{@link #previousResponse()} then this method returns {@code null}

@return the body

## HttpResponse.sslSession()

```java
public Optional<SSLSession> sslSession()
```

Returns an {@link Optional} containing the {@link SSLSession} in effect
for this response. Returns an empty {@code Optional} if this is not a
<i>HTTPS</i> response.

@return an {@code Optional} containing the {@code SSLSession} associated
        with the response

## HttpResponse.uri()

```java
public URI uri()
```

Returns the {@code URI} that the response was received from. This may be
different from the request {@code URI} if redirection occurred.

@return the URI of the response

## HttpResponse.version()

```java
public HttpClient.Version version()
```

Returns the HTTP protocol version that was used for this response.

@return HTTP protocol version

## HttpResponse.statusCode()

```java
public int statusCode()
```

Provides the response status code.
@return the response status code

## HttpResponse.headers()

```java
public HttpHeaders headers()
```

Provides the response headers.
@return the response headers

## HttpResponse.version()

```java
public HttpClient.Version version()
```

Provides the response protocol version.
@return the response protocol version

## HttpResponse.apply(ResponseInfo)

```java
public BodySubscriber<T> apply(ResponseInfo responseInfo)
```

Returns a {@link BodySubscriber BodySubscriber} considering the
given response status code and headers. This method is invoked before
the actual response body bytes are read and its implementation must
return a {@link BodySubscriber BodySubscriber} to consume the response
body bytes.

<p> The response body can be discarded using one of {@link
BodyHandlers#discarding() discarding} or {@link
BodyHandlers#replacing(Object) replacing}.

@param responseInfo the response info
@return a body subscriber

## HttpResponse.fromSubscriber(Subscriber<? super List<ByteBuffer>>)

```java
public static BodyHandler<Void> fromSubscriber(Subscriber<? super List<ByteBuffer>> subscriber)
```

Returns a response body handler that returns a {@link BodySubscriber
BodySubscriber}{@code <Void>} obtained from {@link
BodySubscribers#fromSubscriber(Subscriber)}, with the given
{@code subscriber}.

<p> The response body is not available through this, or the {@code
HttpResponse} API, but instead all response body is forwarded to the
given {@code subscriber}, which should make it available, if
appropriate, through some other mechanism, e.g. an entry in a
database, etc.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

<p> For example:
{@snippet :
 TextSubscriber subscriber = new TextSubscriber();
 HttpResponse<Void> response = client.sendAsync(request,
     BodyHandlers.fromSubscriber(subscriber)).join();
 System.out.println(response.statusCode()); }

@param subscriber the subscriber
@return a response body handler

## HttpResponse.fromSubscriber(S, Function<? super S,? extends T>)

```java
public static <S extends Subscriber<? super List<ByteBuffer>>,T> BodyHandler<T> fromSubscriber(S subscriber, Function<? super S,? extends T> finisher)
```

Returns a response body handler that returns a {@link BodySubscriber
BodySubscriber}{@code <T>} obtained from {@link
BodySubscribers#fromSubscriber(Subscriber, Function)}, with the
given {@code subscriber} and {@code finisher} function.

<p> The given {@code finisher} function is applied after the given
subscriber's {@code onComplete} has been invoked. The {@code finisher}
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

<p> For example:
{@snippet :
 TextSubscriber subscriber = ...;  // accumulates bytes and transforms them into a String
 HttpResponse<String> response = client.sendAsync(request,
     BodyHandlers.fromSubscriber(subscriber, TextSubscriber::getTextResult)).join();
 String text = response.body(); }

@param <S> the type of the Subscriber
@param <T> the type of the response body
@param subscriber the subscriber
@param finisher a function to be applied after the subscriber has completed
@return a response body handler

## HttpResponse.fromLineSubscriber(Subscriber<? super String>)

```java
public static BodyHandler<Void> fromLineSubscriber(Subscriber<? super String> subscriber)
```

Returns a response body handler that returns a {@link BodySubscriber
BodySubscriber}{@code <Void>} obtained from {@link
BodySubscribers#fromLineSubscriber(Subscriber, Function, Charset, String)
BodySubscribers.fromLineSubscriber(subscriber, s -> null, charset, null)},
with the given {@code subscriber}.
The {@linkplain Charset charset} used to decode the response body bytes is
obtained from the HTTP response headers as specified by {@link #ofString()},
and lines are delimited in the manner of {@link BufferedReader#readLine()}.

<p> The response body is not available through this, or the {@code
HttpResponse} API, but instead all response body is forwarded to the
given {@code subscriber}, which should make it available, if
appropriate, through some other mechanism, e.g. an entry in a
database, etc.

@apiNote This method can be used as an adapter between a {@code
BodySubscriber} and a text based {@code Flow.Subscriber} that parses
text line by line.

<p> For example:
{@snippet :
 // A PrintSubscriber that implements Flow.Subscriber<String>
 // and print lines received by onNext() on System.out
 PrintSubscriber subscriber = new PrintSubscriber(System.out);
 client.sendAsync(request, BodyHandlers.fromLineSubscriber(subscriber))
     .thenApply(HttpResponse::statusCode)
     .thenAccept((status) -> {
         if (status != 200) {
             System.err.printf("ERROR: %d status received%n", status);
         }
     }); }

@param subscriber the subscriber
@return a response body handler

## HttpResponse.fromLineSubscriber(S, Function<? super S,? extends T>, String)

```java
public static <S extends Subscriber<? super String>,T> BodyHandler<T> fromLineSubscriber(S subscriber, Function<? super S,? extends T> finisher, String lineSeparator)
```

Returns a response body handler that returns a {@link BodySubscriber
BodySubscriber}{@code <T>} obtained from {@link
BodySubscribers#fromLineSubscriber(Subscriber, Function, Charset, String)
BodySubscribers.fromLineSubscriber(subscriber, finisher, charset, lineSeparator)},
with the given {@code subscriber}, {@code finisher} function, and line separator.
The {@linkplain Charset charset} used to decode the response body bytes is
obtained from the HTTP response headers as specified by {@link #ofString()}.

<p> The given {@code finisher} function is applied after the given
subscriber's {@code onComplete} has been invoked. The {@code finisher}
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

@apiNote This method can be used as an adapter between a {@code
BodySubscriber} and a text based {@code Flow.Subscriber} that parses
text line by line.

<p> For example:
{@snippet :
 // A LineParserSubscriber that implements Flow.Subscriber<String>
 // and accumulates lines that match a particular pattern
 Pattern pattern = ...;
 LineParserSubscriber subscriber = new LineParserSubscriber(pattern);
 HttpResponse<List<String>> response = client.send(request,
     BodyHandlers.fromLineSubscriber(subscriber, s -> s.getMatchingLines(), "\n"));
 if (response.statusCode() != 200) {
     System.err.printf("ERROR: %d status received%n", response.statusCode());
 } }


@param <S> the type of the Subscriber
@param <T> the type of the response body
@param subscriber the subscriber
@param finisher a function to be applied after the subscriber has completed
@param lineSeparator an optional line separator: can be {@code null},
                     in which case lines will be delimited in the manner of
                     {@link BufferedReader#readLine()}.
@return a response body handler
@throws IllegalArgumentException if the supplied {@code lineSeparator}
        is the empty string

## HttpResponse.discarding()

```java
public static BodyHandler<Void> discarding()
```

Returns a response body handler that discards the response body.

@return a response body handler

## HttpResponse.replacing(U)

```java
public static <U> BodyHandler<U> replacing(U value)
```

Returns a response body handler that returns the given replacement
value, after discarding the response body.

@param <U> the response body type
@param value the value of U to return as the body, may be {@code null}
@return a response body handler

## HttpResponse.ofString(Charset)

```java
public static BodyHandler<String> ofString(Charset charset)
```

Returns a {@code BodyHandler<String>} that returns a
{@link BodySubscriber BodySubscriber}{@code <String>} obtained from
{@link BodySubscribers#ofString(Charset) BodySubscribers.ofString(Charset)}.
The body is decoded using the given character set.

@param charset the character set to convert the body with
@return a response body handler

## HttpResponse.ofFile(Path, OpenOption...)

```java
public static BodyHandler<Path> ofFile(Path file, OpenOption... openOptions)
```

Returns a {@code BodyHandler<Path>} that returns a
{@link BodySubscriber BodySubscriber}{@code <Path>} obtained from
{@link BodySubscribers#ofFile(Path, OpenOption...)
BodySubscribers.ofFile(Path,OpenOption...)}.

<p> When the {@code HttpResponse} object is returned, the body has
been completely written to the file, and {@link #body()} returns a
reference to its {@link Path}.

@param  file the file to store the body in
@param  openOptions any options to use when opening/creating the file
@return a response body handler
@throws IllegalArgumentException if an invalid set of open options
        are specified

## HttpResponse.ofFile(Path)

```java
public static BodyHandler<Path> ofFile(Path file)
```

Returns a {@code BodyHandler<Path>} that returns a
{@link BodySubscriber BodySubscriber}{@code <Path>}.

<p> Equivalent to: {@code ofFile(file, CREATE, WRITE)}

@param  file the file to store the body in
@return a response body handler

## HttpResponse.ofFileDownload(Path, OpenOption...)

```java
public static BodyHandler<Path> ofFileDownload(Path directory, OpenOption... openOptions)
```

Returns a {@code BodyHandler<Path>} that returns a
{@link BodySubscriber BodySubscriber}&lt;{@link Path}&gt;
where the download directory is specified, but the filename is
obtained from the {@code Content-Disposition} response header. The
{@code Content-Disposition} header must specify the <i>attachment</i>
type and must also contain a <i>filename</i> parameter. If the
filename specifies multiple path components only the final component
is used as the filename (with the given directory name).

<p> When the {@code HttpResponse} object is returned, the body has
been completely written to the file and {@link #body()} returns a
{@code Path} object for the file. The returned {@code Path} is the
combination of the supplied directory name and the file name supplied
by the server. If the destination directory does not exist or cannot
be written to, then the response will fail with an {@link IOException}.

@param  directory the directory to store the file in
@param  openOptions open options used when opening the file
@return a response body handler
@throws IllegalArgumentException if the given path does not exist,
        is not of the default file system, is not a directory,
        is not writable, or if an invalid set of open options
        are specified

## HttpResponse.ofInputStream()

```java
public static BodyHandler<InputStream> ofInputStream()
```

Returns a {@code BodyHandler<InputStream>} that returns a
{@link BodySubscriber BodySubscriber}{@code <InputStream>} obtained from
{@link BodySubscribers#ofInputStream() BodySubscribers.ofInputStream}.

<p> When the {@code HttpResponse} object is returned, the response
headers will have been completely read, but the body may not have
been fully received yet. The {@link #body()} method returns an
{@link InputStream} from which the body can be read as it is received.

@apiNote See {@link BodySubscribers#ofInputStream()} for more
information.
<p>
To ensure that all resources associated with the
corresponding exchange are properly released the caller must
eventually obtain and close the {@linkplain BodySubscribers#ofInputStream()
returned stream}.

@return a {@linkplain HttpClient##streaming streaming} response body handler

## HttpResponse.ofLines()

```java
public static BodyHandler<Stream<String>> ofLines()
```

Returns a {@code BodyHandler<Stream<String>>} that returns a
{@link BodySubscriber BodySubscriber}{@code <Stream<String>>} obtained
from {@link BodySubscribers#ofLines(Charset) BodySubscribers.ofLines(charset)}.
The {@linkplain Charset charset} used to decode the response body bytes is
obtained from the HTTP response headers as specified by {@link #ofString()},
and lines are delimited in the manner of {@link BufferedReader#readLine()}.

<p> When the {@code HttpResponse} object is returned, the body may
not have been completely received.

@apiNote
To ensure that all resources associated with the
corresponding exchange are properly released the caller must
eventually obtain and close the {@linkplain BodySubscribers#ofLines(Charset)
returned stream}.

@return a {@linkplain HttpClient##streaming streaming} response body handler

## HttpResponse.ofByteArrayConsumer(Consumer<Optional<byte[]>>)

```java
public static BodyHandler<Void> ofByteArrayConsumer(Consumer<Optional<byte[]>> consumer)
```

Returns a {@code BodyHandler<Void>} that returns a
{@link BodySubscriber BodySubscriber}{@code <Void>} obtained from
{@link BodySubscribers#ofByteArrayConsumer(Consumer)
BodySubscribers.ofByteArrayConsumer(Consumer)}.

<p> When the {@code HttpResponse} object is returned, the body has
been completely written to the consumer.

@apiNote
The subscriber returned by this handler is not flow controlled.
Therefore, the supplied consumer must be able to process whatever
amount of data is delivered in a timely fashion.

@param consumer a Consumer to accept the response body
@return a response body handler

## HttpResponse.ofByteArray()

```java
public static BodyHandler<byte[]> ofByteArray()
```

Returns a {@code BodyHandler<byte[]>} that returns a
{@link BodySubscriber BodySubscriber}{@code <byte[]>} obtained
from {@link BodySubscribers#ofByteArray() BodySubscribers.ofByteArray()}.

<p> When the {@code HttpResponse} object is returned, the body has
been completely written to the byte array.

@return a response body handler

## HttpResponse.ofString()

```java
public static BodyHandler<String> ofString()
```

Returns a {@code BodyHandler<String>} that returns a
{@link BodySubscriber BodySubscriber}{@code <String>} obtained from
{@link BodySubscribers#ofString(Charset) BodySubscribers.ofString(Charset)}.
The body is decoded using the character set specified in
the {@code Content-Type} response header. If there is no such
header, or the character set is not supported, then
{@link StandardCharsets#UTF_8 UTF_8} is used.

<p> When the {@code HttpResponse} object is returned, the body has
been completely written to the string.

@return a response body handler

## HttpResponse.ofPublisher()

```java
public static BodyHandler<Publisher<List<ByteBuffer>>> ofPublisher()
```

Returns a {@code BodyHandler<Publisher<List<ByteBuffer>>>} that creates a
{@link BodySubscriber BodySubscriber}{@code <Publisher<List<ByteBuffer>>>}
obtained from {@link BodySubscribers#ofPublisher()
BodySubscribers.ofPublisher()}.

<p> When the {@code HttpResponse} object is returned, the response
headers will have been completely read, but the body may not have
been fully received yet. The {@link #body()} method returns a
{@link Publisher Publisher}{@code <List<ByteBuffer>>} from which the body
response bytes can be obtained as they are received. The publisher
can and must be subscribed to only once.

@apiNote
See {@link BodySubscribers#ofPublisher()} for more
information.
<p>
To ensure that all resources associated with the
corresponding exchange are properly released the caller must
subscribe to the publisher and conform to the rules outlined in
{@link BodySubscribers#ofPublisher()}

@return a {@linkplain HttpClient##streaming publishing} response body handler

## HttpResponse.buffering(BodyHandler<T>, int)

```java
public static <T> BodyHandler<T> buffering(BodyHandler<T> downstreamHandler, int bufferSize)
```

Returns a {@code BodyHandler} which, when invoked, returns a {@linkplain
BodySubscribers#buffering(BodySubscriber,int) buffering BodySubscriber}
that buffers data before delivering it to the downstream subscriber.
These {@code BodySubscriber} instances are created by calling
{@link BodySubscribers#buffering(BodySubscriber,int)
BodySubscribers.buffering} with a subscriber obtained from the given
downstream handler and the {@code bufferSize} parameter.

@param <T> the response body type
@param downstreamHandler the downstream handler
@param bufferSize the buffer size parameter passed to {@link
       BodySubscribers#buffering(BodySubscriber,int) BodySubscribers.buffering}
@return a body handler
@throws IllegalArgumentException if {@code bufferSize <= 0}

## HttpResponse.limiting(BodyHandler<T>, long)

```java
public static <T> BodyHandler<T> limiting(BodyHandler<T> downstreamHandler, long capacity)
```

{@return a {@code BodyHandler} that limits the number of body bytes
that are delivered to the given {@code downstreamHandler}}
<p>
If the number of body bytes received exceeds the given
{@code capacity}, {@link BodySubscriber#onError(Throwable) onError}
is called on the downstream {@code BodySubscriber} with an
{@link IOException} indicating that the capacity is exceeded, and
the upstream subscription is cancelled.

@param downstreamHandler the downstream handler to pass received data to
@param capacity the maximum number of bytes that are allowed
@throws IllegalArgumentException if {@code capacity} is negative
@since 25

## HttpResponse.applyPushPromise(HttpRequest, HttpRequest, Function<HttpResponse.BodyHandler<T>,CompletableFuture<HttpResponse<T>>>)

```java
public void applyPushPromise( HttpRequest initiatingRequest, HttpRequest pushPromiseRequest, Function<HttpResponse.BodyHandler<T>,CompletableFuture<HttpResponse<T>>> acceptor )
```

Notification of an incoming push promise.

<p> This method is invoked once for each push promise received, up
to the point where the response body of the initiating client-sent
request has been fully received.

<p> A push promise is accepted by invoking the given {@code acceptor}
function. The {@code acceptor} function must be passed a non-null
{@code BodyHandler}, that is to be used to handle the promise's
response body. The acceptor function will return a {@code
CompletableFuture} that completes with the promise's response.

<p> If the {@code acceptor} function is not successfully invoked,
then the push promise is rejected. The {@code acceptor} function will
throw an {@code IllegalStateException} if invoked more than once.

@param initiatingRequest the initiating client-send request
@param pushPromiseRequest the synthetic push request
@param acceptor the acceptor function that must be successfully
                invoked to accept the push promise

## HttpResponse.of(Function<HttpRequest,BodyHandler<T>>, ConcurrentMap<HttpRequest,CompletableFuture<HttpResponse<T>>>)

```java
public static <T> PushPromiseHandler<T> of(Function<HttpRequest,BodyHandler<T>> pushPromiseHandler, ConcurrentMap<HttpRequest,CompletableFuture<HttpResponse<T>>> pushPromisesMap)
```

Returns a push promise handler that accumulates push promises, and
their responses, into the given map.

<p> Entries are added to the given map for each push promise accepted.
The entry's key is the push request, and the entry's value is a
{@code CompletableFuture} that completes with the response
corresponding to the key's push request. A push request is rejected /
cancelled if there is already an entry in the map whose key is
{@linkplain HttpRequest#equals equal} to it. A push request is
rejected / cancelled if it  does not have the same origin as its
initiating request.

<p> Entries are added to the given map as soon as practically
possible when a push promise is received and accepted. That way code,
using such a map like a cache, can determine if a push promise has
been issued by the server and avoid making, possibly, unnecessary
requests.

<p> The delivery of a push promise response is not coordinated with
the delivery of the response to the initiating client-sent request.
However, when the response body for the initiating client-sent
request has been fully received, the map is guaranteed to be fully
populated, that is, no more entries will be added. The individual
{@code CompletableFutures} contained in the map may or may not
already be completed at this point.

@param <T> the push promise response body type
@param pushPromiseHandler the body handler to use for push promises
@param pushPromisesMap a map to accumulate push promises into
@return a push promise handler

## HttpResponse.getBody()

```java
public CompletionStage<T> getBody()
```

Returns a {@code CompletionStage} which when completed will return
the response body object. This method can be called at any time
relative to the other {@link Flow.Subscriber} methods and is invoked
using the client's {@linkplain HttpClient#executor() executor}.

@return a CompletionStage for the response body

## HttpResponse.fromSubscriber(Subscriber<? super List<ByteBuffer>>)

```java
public static BodySubscriber<Void> fromSubscriber(Subscriber<? super List<ByteBuffer>> subscriber)
```

Returns a body subscriber that forwards all response body to the
given {@code Flow.Subscriber}. The {@linkplain BodySubscriber#getBody()
completion stage} of the returned body subscriber completes after one
of the given subscribers {@code onComplete} or {@code onError} has
been invoked.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

@param subscriber the subscriber
@return a body subscriber

## HttpResponse.fromSubscriber(S, Function<? super S,? extends T>)

```java
public static <S extends Subscriber<? super List<ByteBuffer>>,T> BodySubscriber<T> fromSubscriber(S subscriber, Function<? super S,? extends T> finisher)
```

Returns a body subscriber that forwards all response body to the
given {@code Flow.Subscriber}. The {@linkplain BodySubscriber#getBody()
completion stage} of the returned body subscriber completes after one
of the given subscribers {@code onComplete} or {@code onError} has
been invoked.

<p> The given {@code finisher} function is applied after the given
subscriber's {@code onComplete} has been invoked. The {@code finisher}
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

@param <S> the type of the Subscriber
@param <T> the type of the response body
@param subscriber the subscriber
@param finisher a function to be applied after the subscriber has
                completed
@return a body subscriber

## HttpResponse.fromLineSubscriber(Subscriber<? super String>)

```java
public static BodySubscriber<Void> fromLineSubscriber(Subscriber<? super String> subscriber)
```

Returns a body subscriber that forwards all response body to the
given {@code Flow.Subscriber}, line by line.
The {@linkplain BodySubscriber#getBody() completion
stage} of the returned body subscriber completes after one of the
given subscribers {@code onComplete} or {@code onError} has been
invoked.
Bytes are decoded using the {@link StandardCharsets#UTF_8
UTF-8} charset, and lines are delimited in the manner of
{@link BufferedReader#readLine()}.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

@implNote This is equivalent to calling {@snippet :
     fromLineSubscriber(subscriber, s -> null, StandardCharsets.UTF_8, null) }

@param subscriber the subscriber
@return a body subscriber

## HttpResponse.fromLineSubscriber(S, Function<? super S,? extends T>, Charset, String)

```java
public static <S extends Subscriber<? super String>,T> BodySubscriber<T> fromLineSubscriber(S subscriber, Function<? super S,? extends T> finisher, Charset charset, String lineSeparator)
```

Returns a body subscriber that forwards all response body to the
given {@code Flow.Subscriber}, line by line. The {@linkplain
BodySubscriber#getBody() completion stage} of the returned body
subscriber completes after one of the given subscribers
{@code onComplete} or {@code onError} has been invoked.

<p> The given {@code finisher} function is applied after the given
subscriber's {@code onComplete} has been invoked. The {@code finisher}
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

@apiNote This method can be used as an adapter between {@code
BodySubscriber} and {@code Flow.Subscriber}.

@param <S> the type of the Subscriber
@param <T> the type of the response body
@param subscriber the subscriber
@param finisher a function to be applied after the subscriber has
                completed
@param charset a {@link Charset} to decode the bytes
@param lineSeparator an optional line separator: can be {@code null},
                     in which case lines will be delimited in the manner of
                     {@link BufferedReader#readLine()}.
@return a body subscriber
@throws IllegalArgumentException if the supplied {@code lineSeparator}
        is the empty string

## HttpResponse.ofString(Charset)

```java
public static BodySubscriber<String> ofString(Charset charset)
```

Returns a body subscriber which stores the response body as a {@code
String} converted using the given {@code Charset}.

<p> The {@link HttpResponse} using this subscriber is available after
the entire response has been read.

@param charset the character set to convert the String with
@return a body subscriber

## HttpResponse.ofByteArray()

```java
public static BodySubscriber<byte[]> ofByteArray()
```

Returns a {@code BodySubscriber} which stores the response body as a
byte array.

<p> The {@link HttpResponse} using this subscriber is available after
the entire response has been read.

@return a body subscriber

## HttpResponse.ofFile(Path, OpenOption...)

```java
public static BodySubscriber<Path> ofFile(Path file, OpenOption... openOptions)
```

Returns a {@code BodySubscriber} which stores the response body in a
file opened with the given options and name. The file will be opened
with the given options using {@link FileChannel#open(Path,OpenOption...)
FileChannel.open} just before the body is read. Any exception thrown
will be returned or thrown from {@link HttpClient#send(HttpRequest,
BodyHandler) HttpClient::send} or {@link HttpClient#sendAsync(HttpRequest,
BodyHandler) HttpClient::sendAsync} as appropriate.

<p> The {@link HttpResponse} using this subscriber is available after
the entire response has been read.

@param  file the file to store the body in
@param  openOptions the list of options to open the file with
@return a body subscriber
@throws IllegalArgumentException if an invalid set of open options
        are specified

## HttpResponse.ofFile(Path)

```java
public static BodySubscriber<Path> ofFile(Path file)
```

Returns a {@code BodySubscriber} which stores the response body in a
file opened with the given name.

<p> Equivalent to: {@code ofFile(file, CREATE, WRITE)}

@param  file the file to store the body in
@return a body subscriber

## HttpResponse.ofByteArrayConsumer(Consumer<Optional<byte[]>>)

```java
public static BodySubscriber<Void> ofByteArrayConsumer(Consumer<Optional<byte[]>> consumer)
```

Returns a {@code BodySubscriber} which provides the incoming body
data to the provided Consumer of {@code Optional<byte[]>}. Each
call to {@link Consumer#accept(java.lang.Object) Consumer.accept()}
will contain a non-empty {@code Optional}, except for the final
invocation after all body data has been read, when the {@code
Optional} will be empty.

<p> The {@link HttpResponse} using this subscriber is available after
the entire response has been read.

@apiNote
This subscriber is not flow controlled.
Therefore, the supplied consumer must be able to process whatever
amount of data is delivered in a timely fashion.

@param consumer a Consumer of byte arrays
@return a body subscriber

## HttpResponse.ofInputStream()

```java
public static BodySubscriber<InputStream> ofInputStream()
```

Returns a {@code BodySubscriber} which streams the response body as
an {@link InputStream}.

<p> The {@link HttpResponse} using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body can then be read directly from the {@link InputStream}.

@apiNote To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure to either read all bytes until EOF is reached, or call
{@link InputStream#close} if it is unable or unwilling to do so.
Calling {@code close} before exhausting the stream may cause
the underlying HTTP connection to be closed and prevent it
from being reused for subsequent operations.

@implNote The {@code read} method of the {@code InputStream}
returned by the default implementation of this method will
throw an {@code IOException} with the {@linkplain Thread#isInterrupted()
thread interrupt status set} if the thread is interrupted
while blocking on read. In that case, the request will also be
cancelled and the {@code InputStream} will be closed.

@return a {@linkplain HttpClient##streaming streaming body subscriber}
        which streams the response body as an {@link InputStream}.

## HttpResponse.ofLines(Charset)

```java
public static BodySubscriber<Stream<String>> ofLines(Charset charset)
```

Returns a {@code BodySubscriber} which streams the response body as
a {@link Stream Stream}{@code <String>}, where each string in the stream
corresponds to a line as defined by {@link BufferedReader#lines()}.

<p> The {@link HttpResponse} using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body can then be read directly from the {@link Stream}.

@apiNote To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure to either read all lines until the stream is exhausted,
or call {@link Stream#close} if it is unable or unwilling to do so.
Calling {@code close} before exhausting the stream may cause
the underlying HTTP connection to be closed and prevent it
from being reused for subsequent operations.

@param charset the character set to use when converting bytes to characters
@return a {@linkplain HttpClient##streaming streaming body subscriber} which streams
         the response body as a {@link Stream Stream}{@code <String>}.

@see BufferedReader#lines()

## HttpResponse.ofPublisher()

```java
public static BodySubscriber<Publisher<List<ByteBuffer>>> ofPublisher()
```

Returns a response subscriber which publishes the response body
through a {@code Publisher<List<ByteBuffer>>}.

<p> The {@link HttpResponse} using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body bytes can then be obtained by subscribing to the publisher
returned by the {@code HttpResponse} {@link HttpResponse#body() body}
method.

<p>The publisher returned by the {@link HttpResponse#body() body}
method can be subscribed to only once. The first subscriber will
receive the body response bytes if successfully subscribed, or will
cause the subscription to be cancelled otherwise.
If more subscriptions are attempted, the subsequent subscribers will
be immediately subscribed with an empty subscription and their
{@link Subscriber#onError(Throwable) onError} method
will be invoked with an {@code IllegalStateException}.

@apiNote To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure that the provided publisher is subscribed once, and either
{@linkplain Subscription#request(long) requests} all bytes
until {@link Subscriber#onComplete() onComplete} or
{@link Subscriber#onError(Throwable) onError} are invoked, or
cancel the provided {@linkplain Subscriber#onSubscribe(Subscription)
subscription} if it is unable or unwilling to do so.
Note that depending on the actual HTTP protocol {@linkplain
HttpClient.Version version} used for the exchange, cancelling the
subscription instead of exhausting the flow may cause the underlying
HTTP connection to be closed and prevent it from being reused for
subsequent operations.

@return A {@linkplain HttpClient##streaming publishing body subscriber}
        which publishes the response body
        through a {@code Publisher<List<ByteBuffer>>}.

## HttpResponse.replacing(U)

```java
public static <U> BodySubscriber<U> replacing(U value)
```

Returns a response subscriber which discards the response body. The
supplied value is the value that will be returned from
{@link HttpResponse#body()}.

@param <U> the type of the response body
@param value the value to return from HttpResponse.body(), may be {@code null}
@return a body subscriber

## HttpResponse.discarding()

```java
public static BodySubscriber<Void> discarding()
```

Returns a response subscriber which discards the response body.

@return a response body subscriber

## HttpResponse.buffering(BodySubscriber<T>, int)

```java
public static <T> BodySubscriber<T> buffering(BodySubscriber<T> downstream, int bufferSize)
```

Returns a {@code BodySubscriber} which buffers data before delivering
it to the given downstream subscriber. The subscriber guarantees to
deliver {@code bufferSize} bytes of data to each invocation of the
downstream's {@link BodySubscriber#onNext(Object) onNext} method,
except for the final invocation, just before
{@link BodySubscriber#onComplete() onComplete} is invoked. The final
invocation of {@code onNext} may contain fewer than {@code bufferSize}
bytes.

<p> The returned subscriber delegates its {@link BodySubscriber#getBody()
getBody()} method to the downstream subscriber.

@param <T> the type of the response body
@param downstream the downstream subscriber
@param bufferSize the buffer size
@return a buffering body subscriber
@throws IllegalArgumentException if {@code bufferSize <= 0}

## HttpResponse.mapping(BodySubscriber<T>, Function<? super T, ? extends U>)

```java
public static <T,U> BodySubscriber<U> mapping(BodySubscriber<T> upstream, Function<? super T, ? extends U> mapper)
```

Returns a {@code BodySubscriber} whose response body value is that of
the result of applying the given function to the body object of the
given {@code upstream} {@code BodySubscriber}.

<p> The mapping function is executed using the client's {@linkplain
HttpClient#executor() executor}, and can therefore be used to map any
response body type, including blocking {@link InputStream}.
However, performing any blocking operation in the mapper function
runs the risk of blocking the executor's thread for an unknown
amount of time (at least until the blocking operation finishes),
which may end up starving the executor of available threads.
Therefore, in the case where mapping to the desired type might
block (e.g. by reading on the {@code InputStream}), then mapping
to a {@link java.util.function.Supplier Supplier} of the desired
type and deferring the blocking operation until {@link Supplier#get()
Supplier::get} is invoked by the caller's thread should be preferred,
as shown in the following example which uses a well-known JSON parser to
convert an {@code InputStream} into any annotated Java type.

<p>For example:
{@snippet :
  public static <W> BodySubscriber<Supplier<W>> asJSON(Class<W> targetType) {
    BodySubscriber<InputStream> upstream = BodySubscribers.ofInputStream();

    BodySubscriber<Supplier<W>> downstream = BodySubscribers.mapping(
          upstream,
          (InputStream is) -> () -> {
              try (InputStream stream = is) {
                  ObjectMapper objectMapper = new ObjectMapper();
                  return objectMapper.readValue(stream, targetType);
              } catch (IOException e) {
                  throw new UncheckedIOException(e);
              }
          });
   return downstream;
 } }

@param <T> the upstream body type
@param <U> the type of the body subscriber returned
@param upstream the body subscriber to be mapped
@param mapper the mapping function
@return a mapping body subscriber

## HttpResponse.limiting(BodySubscriber<T>, long)

```java
public static <T> BodySubscriber<T> limiting(BodySubscriber<T> downstreamSubscriber, long capacity)
```

{@return a {@code BodySubscriber} that limits the number of body
bytes that are delivered to the given {@code downstreamSubscriber}}
<p>
If the number of body bytes received exceeds the given
{@code capacity}, {@link BodySubscriber#onError(Throwable) onError}
is called on the downstream {@code BodySubscriber} with an
{@link IOException} indicating that the capacity is exceeded, and
the upstream subscription is cancelled.

@param downstreamSubscriber the downstream subscriber to pass received data to
@param capacity the maximum number of bytes that are allowed
@throws IllegalArgumentException if {@code capacity} is negative
@since 25