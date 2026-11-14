---
title: "Securing State Data"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/securing-state-data.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Securing State Data

Applications that handle sensitive data or make any kind of security decisions need to keep that data under their own control and cannot allow other potentially malicious code to access the data directly. The best way to protect data in memory is to declare the data as private or internal (with scope limited to the same assembly) variables. However, even this data is subject to access you should be aware of:

- Using reflection mechanisms, highly trusted code that can reference your object can get and set private members.

- Using serialization, highly trusted code can effectively get and set private members if it can access the corresponding data in the serialized form of the object.

- Under debugging, this data can be read.

 Make sure none of your own methods or properties exposes these values unintentionally.

## See also

- Secure Coding Guidelines
- ASP.NET Core Security
