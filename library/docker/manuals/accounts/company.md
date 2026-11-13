---
title: "Company accounts"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/accounts/company/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Company accounts

A company is where you configure sign-in and administration for multiple
Docker organizations.

> **Tip:**
>
> Organization owners with a Docker Business subscription can
> create a company in
> Docker Home.

## Company structure

A company sits above its organizations, giving company owners full
administrative access across every organization in the company.

The following diagram shows that hierarchy:

```mermaid
flowchart TB
  co(("Company owners")) -.->|"manage"| C
  subgraph C["Company"]
    direction TB
    subgraph O1["Organization A"]
      direction TB
      m1(("Members"))
      r1[("Repositories")]
    end
    subgraph O2["Organization B"]
      direction TB
      m2(("Members"))
      r2[("Repositories")]
    end
    O1 ~~~ O2
  end
  style C fill:#3b82f622,stroke:#3b82f6
```

## What a company lets you do

When you create a company, you can:

- Administer every organization in the company from one place.
- Configure single sign-on (SSO) and System for Cross-domain Identity
  Management (SCIM) once for every organization in the company.
- Verify your domains once at the company level instead of in each
  organization. When you turn on auto-provisioning for a domain, you
  choose which organization new users join.
- View members and invitations from every organization in one list, and
  export that list as a CSV.

You can assign up to 10 company owners. Company owners occupy a purchased
seat only when they are also members of an organization. A company owner
who is not an organization member does not occupy a seat.

## Next steps

Set up the company, then manage members and access from the pages below.
