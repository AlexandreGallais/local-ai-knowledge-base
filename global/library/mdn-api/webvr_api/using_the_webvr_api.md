---
title: "Using the WebVR API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvr_api/using_the_webvr_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the WebVR API

> **Note:**
> WebVR API is replaced by WebXR API. WebVR was never ratified as a standard, was implemented and enabled by default in very few browsers and supported a small number of devices.

The WebVR API is a fantastic addition to the web developer's toolkit, allowing WebGL scenes to be presented in virtual reality displays such as the Oculus Rift and HTC Vive. But how do you get started with developing VR apps for the Web? This article will guide you through the basics.

## Getting started

To get started, you need:

- Supporting VR hardware.
  - The cheapest option is to use a mobile device, supporting browser, and device mount (e.g., Google Cardboard). This won't be quite as good an experience as dedicated hardware, but you won't need to purchase a powerful computer or dedicated VR display.
  - Dedicated hardware can be costly, but it does provide a better experience. The most WebVR-compatible hardware at the moment is the HTC VIVE, and The Oculus Rift. The front page of webvr.info has some further useful information about available hardware, and what browser support them.

- A computer powerful enough to handle rendering/displaying of VR scenes using your dedicated VR Hardware, if required. To give you an idea of what you need, look at the relevant guide for the VR you are purchasing (e.g., VIVE READY Computers).
- A supporting browser installed — the latest Firefox Nightly or Chrome are your best options right now, on desktop or mobile.

Once you have everything assembled, you can test to see whether your setup works with WebVR by going to our simple A-Frame demo, and seeing whether the scene renders and whether you can enter VR display mode by pressing the button at the bottom right.

A-Frame is by far the best option if you want to create a WebVR-compatible 3D scene quickly, without needing to understand a bunch of new JavaScript code. It doesn't however teach you how the raw WebVR API works, and this is what we'll get on to next.

## Introducing our demo

To illustrate how the WebVR API works, we'll study our raw-webgl-example, which looks a bit like this:

> **Note:**
> You can find the source code of our demo on GitHub, and view it live also.

> **Note:**
> If WebVR isn't working in your browser, you might need to make sure it is running through your graphics card. For example for NVIDIA cards, if you've got the NVIDIA control panel set up successfully, there will be a context menu option available — right click on Firefox, then choose _Run with graphics processor > High-performance NVIDIA processor_.

Our demo features the holy grail of WebGL demos — a rotating 3D cube. We've implemented this using raw WebGL API code. We won't be teaching any basic <example-value> or WebGL, just the WebVR parts.

Our demo also features:

- A button to start (and stop) our scene from being presented in the VR display.
- A button to show (and hide) VR pose data, i.e., the position and orientation of the headset, updated in real time.

When you look through the source code of our demo's main JavaScript file, you can easily find the WebVR-specific parts by searching for the string "WebVR" in preceding comments.

> **Note:**
> To find out more about basic <example-value> and WebGL, consult our JavaScript learning material, and our WebGL Tutorial.
