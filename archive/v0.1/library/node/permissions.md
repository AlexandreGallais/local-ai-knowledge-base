---
title: "Permissions (part 1 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/permissions.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Permissions

Permissions can be used to control what system resources the
Node.js process has access to or what actions the process can take
with those resources.

* Process-based permissions control the Node.js
  process's access to resources.
  The resource can be entirely allowed or denied, or actions related to it can
  be controlled. For example, file system reads can be allowed while denying
  writes.
  This feature does not protect against malicious code. According to the Node.js
  Security Policy, Node.js trusts any code it is asked to run.

The permission model implements a "seat belt" approach, which prevents trusted
code from unintentionally changing files or using resources that access has
not explicitly been granted to. It does not provide security guarantees in the
presence of malicious code. Malicious code can bypass the permission model and
execute arbitrary code without the restrictions imposed by the permission
model.

If you find a potential security vulnerability, please refer to our
Security Policy.
