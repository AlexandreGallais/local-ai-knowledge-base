---
title: "RTCRtpSender: transport property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpsender/transport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpSender: transport property

The read-only **`transport`** property of an
`RTCRtpSender` object provides the `RTCDtlsTransport` object
used to interact with the underlying transport over which the sender is exchanging
Real-time Transport Control Protocol (RTCP) packets.

This transport is responsible for receiving the data for the media on the sender's
`track`.

## Value

An `RTCDtlsTransport` object representing the underlying transport being
used by the sender to exchange packets with the remote peer, or `null` if the
sender isn't yet connected to a transport.

## Description

When the `RTCRtpSender` is first created, the value of
`transport` is `null`. This is replaced with an
`RTCDtlsTransport` once the sender's transport has been established.

Note that when bundling is in effect—that is, when the `RTCPeerConnection`
was created with a configuration object whose `bundlePolicy` is `max-compat`
or `max-bundle`—multiple senders may be sharing the same transport; in this
case, all of them are using the same connection to transmit and/or receive
RTP and RTCP packets.
