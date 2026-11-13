---
title: "FIPS compliance - .NET Core"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/fips-compliance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET Core Federal Information Processing Standard (FIPS) compliance

The Federal Information Processing Standard (FIPS) Publication 140-2 is a U.S. government standard that defines minimum security requirements for cryptographic modules in information technology products, as defined in Section 5131 of the Information Technology Management Reform Act of 1996.

.NET Core:

* Passes cryptographic primitives calls through to the standard modules the underlying operating system provides.
* Does **not** enforce the use of FIPS Approved algorithms or key sizes in .NET Core apps.

The system administrator is responsible for configuring the FIPS compliance for an operating system.

If code is written for a FIPS-compliant environment, the developer is responsible for ensuring that non-compliant FIPS algorithms aren't used.

For more information on FIPS compliance, see the following articles:

* Windows FIPS Compliance
* Configuring Windows for FIPS Compliance
* Chapter 8. Federal Standards and Regulations Red Hat Enterprise Linux 7
