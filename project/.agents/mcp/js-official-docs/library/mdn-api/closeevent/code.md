---
title: "CloseEvent: code property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closeevent/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseEvent: code property

The **`code`** read-only property of the `CloseEvent` interface returns a WebSocket connection close code indicating the reason the connection was closed.

## Value

An integer WebSocket connection close code in the range `1000` - `4999`, indicating the reason the connection was closed.

       | Status code
       | Meaning
       | Description

       | `0`–`999`
       |
       | Not used.

       | `1000`
       | Normal Closure
       |
        The connection successfully completed the purpose for which it was
        created.

       | `1001`
       | Going Away
       |
        The endpoint is going away, either because of a server failure or
        because the browser is navigating away from the page that opened the
        connection.

       | `1002`
       | Protocol error
       |
        The endpoint is terminating the connection due to a protocol error.

       | `1003`
       | Unsupported Data
       |
        The connection is being terminated because the endpoint received data of
        a type it cannot accept. (For example, a text-only endpoint received
        binary data.)

       | `1004`
       | Reserved
       |
        Reserved. A meaning might be defined in the future.

       | `1005`
       | No Status Received
       |
        Reserved. Indicates that no status code was provided even though one was expected.

       | `1006`
       | Abnormal Closure
       |
       Reserved. Indicates that a connection was closed abnormally (that is, with no
        close frame being sent) when a status code is expected.

       | `1007`
       | Invalid frame payload data
       |
        The endpoint is terminating the connection because a message was
        received that contained inconsistent data (e.g., non-UTF-8 data within a
        text message).

       | `1008`
       | Policy Violation
       |
        The endpoint is terminating the connection because it received a message
        that violates its policy. This is a generic status code, used when codes
        1003 and 1009 are not suitable.

       | `1009`
       | Message Too Big
       |
        The endpoint is terminating the connection because a data frame was
        received that is too large.

       | `1010`
       | Mandatory Ext.
       |
        The client is terminating the connection because it expected the server
        to negotiate one or more extension, but the server didn't.

       | `1011`
       | Internal Error
       |
        The server is terminating the connection because it encountered an
        unexpected condition that prevented it from fulfilling the request.

       | `1012`
       | Service Restart
       |
        The server is terminating the connection because it is restarting.

       | `1013`
       | Try Again Later
       |
        The server is terminating the connection due to a temporary condition,
        e.g., it is overloaded and is casting off some of its clients.

       | `1014`
       | Bad Gateway
       |
        The server was acting as a gateway or proxy and received an invalid
        response from the upstream server. This is similar to 502 HTTP Status
        Code.

       | `1015`
       | TLS handshake
       |
        Reserved. Indicates that the connection was closed due
        to a failure to perform a TLS handshake (e.g., the server certificate
        can't be verified).

       | `1016`–`2999`
       |
       |
        For definition by future revisions of the WebSocket Protocol specification, and for definition by extension specifications.

       | `3000`–`3999`
       |
       |
        For use by libraries, frameworks, and applications. These status codes are registered directly with IANA. The interpretation of these codes is undefined by the WebSocket protocol.

       | `4000`–`4999`
       |
       |
         For private use, and thus can't be registered. Such codes can be used by prior agreements between WebSocket applications. The interpretation of these codes is undefined by the WebSocket protocol.

## Examples

The following example prints the value of `code` to the console.

```js
WebSocket.onclose = (event) => {
  console.log(event.code);
};
```

## See also

- RFC 6455 (the WebSocket Protocol specification)
- WebSocket Close Code Number Registry (IANA)
