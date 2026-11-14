---
title: "xmlrpc --- XMLRPC server and client modules"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xmlrpc.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `xmlrpc` --- XMLRPC server and client modules

Module `xmlrpc`.

XML-RPC is a Remote Procedure Call method that uses XML passed via HTTP as a
transport.  With it, a client can call methods with parameters on a remote
server (the server is named by a URI) and get back structured data.

`xmlrpc` is a package that collects server and client modules implementing
XML-RPC.  The modules are:

- `xmlrpc.client`
- `xmlrpc.server`
