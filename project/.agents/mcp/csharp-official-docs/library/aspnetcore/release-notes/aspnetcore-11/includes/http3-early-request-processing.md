---
title: "http3-early-request-processing"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/http3-early-request-processing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# http3-early-request-processing

### HTTP/3 starts processing requests earlier

Kestrel now starts processing HTTP/3 requests without waiting for the control stream and SETTINGS frame first, which reduces first-request latency on new connections.
