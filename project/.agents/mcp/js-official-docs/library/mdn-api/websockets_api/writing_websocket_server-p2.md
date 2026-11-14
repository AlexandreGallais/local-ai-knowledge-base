---
title: "Writing a WebSocket server in C# (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websockets_api/writing_websocket_server/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Writing a WebSocket server in C# (part 2 of 2)

## Put together

### ws-server.cs

```cs
//
// csc ws-server.cs
// ws-server.exe

using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class Server {
    static void SendText(NetworkStream stream, string message) {
        byte[] payload = Encoding.UTF8.GetBytes(message);
        int headerLength = payload.Length <= 125 ? 2 : payload.Length <= 65535 ? 4 : 10;
        byte[] frame = new byte[headerLength + payload.Length];
        frame[0] = 0x81; // FIN = 1, opcode = 1 (text)

        // Server-to-client frames are not masked.
        if (headerLength == 2) {
            frame[1] = (byte)payload.Length;
        } else if (headerLength == 4) {
            frame[1] = 126;
            frame[2] = (byte)(payload.Length >> 8);
            frame[3] = (byte)(payload.Length & 0xff);
        } else {
            frame[1] = 127;
            ulong length = (ulong)payload.Length;
            for (int i = 0; i < 8; i++) {
                frame[2 + i] = (byte)((length >> (8 * (7 - i))) & 0xff);
            }
        }

        Array.Copy(payload, 0, frame, headerLength, payload.Length);
        // Keep frames intact if multiple server tasks use this helper.
        lock (stream) {
            stream.Write(frame, 0, frame.Length);
        }
    }

    public static void Main() {
        string ip = "127.0.0.1";
        int port = 80;
        var server = new TcpListener(IPAddress.Parse(ip), port);

        server.Start();
        Console.WriteLine("Server has started on {0}:{1}, Waiting for a connection…", ip, port);

        TcpClient client = server.AcceptTcpClient();
        Console.WriteLine("A client connected.");

        NetworkStream stream = client.GetStream();

        // enter to an infinite cycle to be able to handle every change in stream
        while (true) {
            while (!stream.DataAvailable);
            while (client.Available < 3); // match against "get"

            byte[] bytes = new byte[client.Available];
            stream.Read(bytes, 0, bytes.Length);
            string s = Encoding.UTF8.GetString(bytes);

            if (Regex.IsMatch(s, "^GET", RegexOptions.IgnoreCase)) {
                Console.WriteLine("=====Handshaking from client=====\n{0}", s);

                // 1. Obtain the value of the "Sec-WebSocket-Key" <example-value> header without any leading or trailing whitespace
                // 2. Concatenate it with "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" (a special GUID specified by RFC 6455)
                // 3. Compute SHA-1 and Base64 hash of the new value
                // 4. Write the hash back as the value of "Sec-WebSocket-Accept" response header in an HTTP response
                string swk = Regex.Match(s, "Sec-WebSocket-Key: (.*)").Groups[1].Value.Trim();
                string swkAndSalt = swk + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
                byte[] swkAndSaltSha1 = System.Security.Cryptography.SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(swkAndSalt));
                string swkAndSaltSha1Base64 = Convert.ToBase64String(swkAndSaltSha1);

                // HTTP/1.1 defines the sequence CR LF as the end-of-line marker
                byte[] response = Encoding.UTF8.GetBytes(
                    "HTTP/1.1 101 Switching Protocols\r\n" +
                    "Connection: Upgrade\r\n" +
                    "Upgrade: websocket\r\n" +
                    "Sec-WebSocket-Accept: " + swkAndSaltSha1Base64 + "\r\n\r\n");

                stream.Write(response, 0, response.Length);

                // Terminal input can send messages without any client request.
                Task.Run(() => {
                    Console.WriteLine("Type a message and press Enter to send it to the browser.");
                    try {
                        string message;
                        while ((message = Console.ReadLine()) != null) {
                            SendText(stream, message);
                        }
                    } catch (IOException ex) {
                        Console.WriteLine("Could not send the message: {0}", ex.Message);
                    } catch (ObjectDisposedException) {
                        Console.WriteLine("The connection is closed.");
                    }
                });
            } else {
                bool fin = (bytes[0] & 0b10000000) != 0,
                    mask = (bytes[1] & 0b10000000) != 0; // must be true, "All messages from the client to the server have this bit set"
                int opcode = bytes[0] & 0b00001111; // expecting 1 - text message
                ulong offset = 2,
                      msgLen = bytes[1] & (ulong)0b01111111;

                if (msgLen == 126) {
                    // bytes are reversed because websocket will print them in Big-Endian, whereas
                    // BitConverter will want them arranged in little-endian on windows
                    msgLen = BitConverter.ToUInt16(new byte[] { bytes[3], bytes[2] }, 0);
                    offset = 4;
                } else if (msgLen == 127) {
                    // To test the below code, we need to manually buffer larger messages — since the NIC's autobuffering
                    // may be too latency-friendly for this code to run (that is, we may have only some of the bytes in this
                    // websocket frame available through client.Available).
                    msgLen = BitConverter.ToUInt64(new byte[] { bytes[9], bytes[8], bytes[7], bytes[6], bytes[5], bytes[4], bytes[3], bytes[2] },0);
                    offset = 10;
                }

                if (msgLen == 0) {
                    Console.WriteLine("msgLen == 0");
                } else if (mask) {
                    byte[] decoded = new byte[msgLen];
                    byte[] masks = new byte[4] { bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3] };
                    offset += 4;

                    for (ulong i = 0; i < msgLen; ++i)
                        decoded[i] = (byte)(bytes[offset + i] ^ masks[i % 4]);

                    string text = Encoding.UTF8.GetString(decoded);
                    Console.WriteLine("{0}", text);
                } else
                    Console.WriteLine("mask bit not set");

                Console.WriteLine();
            }
        }
    }
}
```

### client.html

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css" />
    <script src="client.js" defer></script>
  </head>
  <body>
    <h2>WebSocket Test</h2>
    <textarea cols="60" rows="6"></textarea>
    <button>send</button>
    <div id="output"></div>
  </body>
</html>
```

### styles.css

```css
textarea {
  vertical-align: bottom;
}
#output {
  overflow: auto;
}
#output > p {
  overflow-wrap: break-word;
}
#output .received {
  color: blue;
}
#output .error {
  color: red;
}
```

### client.js

```js
const button = document.querySelector("button");
const output = document.querySelector("#output");
const textarea = document.querySelector("textarea");
const wsUri = "ws://127.0.0.1/";
const websocket = new WebSocket(wsUri);

button.addEventListener("click", onClickButton);

websocket.onopen = (e) => {
  writeToScreen("CONNECTED");
};

websocket.onclose = (e) => {
  writeToScreen("DISCONNECTED");
};

websocket.onmessage = (e) => {
  writeToScreen(`RECEIVED: ${e.data}`, "received");
};

websocket.onerror = () => {
  writeToScreen(
    "A WebSocket error occurred. Check the browser console.",
    "error",
  );
};

function doSend(message) {
  writeToScreen(`SENT: ${message}`);
  websocket.send(message);
}

function writeToScreen(message, className = "") {
  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  paragraph.className = className;
  output.prepend(paragraph);
}

function onClickButton() {
  const text = textarea.value;

  text && doSend(text);
  textarea.value = "";
  textarea.focus();
}
```

## Related

- Writing WebSocket servers
