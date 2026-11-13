---
title: "Building an Internet-Connected Phone with PeerJS"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/build_a_phone_with_peerjs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Building an Internet-Connected Phone with PeerJS

One of WebRTC's main issues is that it is pretty complicated to use and develop with — handling the signaling service and knowing when to call the right endpoint can get confusing. But there is some good news; PeerJS is a WebRTC framework that abstracts away all of the ice and signaling logic so that you can focus on the functionality of your application. There are two parts to PeerJS, the client-side framework and the server.

In this series of articles we will create a simple phone application using PeerJS. We'll be using both the server and the client-side framework, but most of our work will be involved with handling the client-side code.

## Prerequisites

This is an intermediate level tutorial; before attempting it you should already be comfortable with:

- Vanilla JavaScript
- Node
- Express
- HTML

Before you get started, you'll want to make sure you've installed node and Yarn (the instructions in later articles assume Yarn, but you can feel free to use npm or another manager if you'd prefer).

> **Note:**
> If you learn better by following step-by-step code, we've also provided this tutorial in code, which you can use instead.

### Table of contents

1. Setup
2. Building the server
3. Connecting the peers
   1. Getting browser microphone permission
   2. Showing and hiding HTML
   3. Creating a peer connection
   4. Creating a call
   5. Answering a call
   6. Ending a call
