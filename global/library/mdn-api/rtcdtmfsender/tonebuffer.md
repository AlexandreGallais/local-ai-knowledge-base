---
title: "RTCDTMFSender: toneBuffer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmfsender/tonebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFSender: toneBuffer property

The **`toneBuffer`** read-only property of the `RTCDTMFSender` interface returns a string containing a list of the DTMF tones currently queued for sending to the remote peer over the `RTCPeerConnection`. To place tones into the buffer, call `insertDTMF()`.

Tones are removed from the string as they're played, so only upcoming tones are listed.

## Value

A string listing the tones to be played. If the string is empty,
there are no tones pending.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if a character is not a DTMF tone character (`0-9`, `A-D`, `#`, or `,`).

### Tone buffer format

The tone buffer is a string which can contain any combination of the characters that
are permitted by the DTMF standard.

#### DTMF tone characters

- The digits 0-9
    These characters represent the digit keys on a telephone keypad.
- The letters A-D
    These characters represent the "A" through "D" keys which are part of the DTMF
    standard but not included on most telephones. These are _not_ interpreted as
    digits. Lower-case "a"-"d" automatically gets converted to upper-case.
- The pound/hash sign ("#") and the asterisk ("\*")
    These correspond to the similarly-labeled keys which are typically on the bottom row
    of the telephone keypad.
- The comma (",")
    This character instructs the dialing process to pause for two seconds before sending
    the next character in the buffer.

> **Note:**
> All other characters are unrecognized and will cause
> `insertDTMF()` to throw an
> `InvalidCharacterError` `DOMException`.

#### Using tone buffer strings

For example, if you're writing code to control a voicemail system by sending DTMF
codes, you might use a string such as `"*,1,5555"`. In this example, we would send `"*"` to
request access to the VM system, then, after a pause, send a "1" to start playback of
voicemail messages, then after a pause, dial "5555" as a PIN number to open the
messages.

Setting the tone buffer to an empty string (`""`) cancels any pending DTMF
codes.

## Example

tbd

## See also

- WebRTC API
- Using DTMF with WebRTC
- `RTCDTMFSender.insertDTMF()`
- `RTCPeerConnection`
- `RTCDTMFSender`
- `RTCRtpSender`
