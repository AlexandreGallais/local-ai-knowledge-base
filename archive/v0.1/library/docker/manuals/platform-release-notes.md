---
title: "Accounts and admin release notes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/platform-release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Accounts and admin release notes

This page lists new features, enhancements, known issues, and bug fixes for
Docker accounts and admin features, including Docker Home, billing, security,
and subscriptions.

## 2026-11-03

### New

- Docker Offload is now included with a
  Docker Agentic Platform
  subscription for individual accounts. You pay for the time the cloud
  sandbox runs. Organizations can still subscribe to
  Docker Offload v1.

## 2026-11-02

### Bug fixes and enhancements

- Converting a user account into an organization
  emails the new owner.

## 2026-10-29

### Bug fixes and enhancements

- Severity choices on the
  support request form use longer
  labels that describe the impact of each level.
- The support request form **Legal** topic includes **DMCA takedown
  requests**.

## 2026-10-28

### Bug fixes and enhancements

- You can
  assign a license to a team
 as long as you have sufficient licenses remaining for all team members who do not already hold a license. Docker only assigns a license to
  members who don't already have one.
- If you add seats without a street address on file, Docker opens the
  address form and asks you to add it, instead of failing with a generic
  error.
- Billing details
  show addresses that have no city.

## 2026-10-26

### Bug fixes and enhancements

- Support cases show **PENDING SUPPORT** and **PENDING CUSTOMER** instead
  of **OPEN** and **ACTION REQUIRED**.

## 2026-10-22

### Bug fixes and enhancements

- Access token <example-value> emails include the revocation date.
  Organization access token <example-value> also include the organization name.

## 2026-10-16

### Bug fixes and enhancements

- Users with a custom role that includes the **Manage repositories** and
  **Manage organization access tokens** permissions can
  create an organization access token
  scoped to all repositories in the organization. A role with only **View
  repositories** can't.

## 2026-10-15

### New

- Custom roles now include the
  Manage licenses
  permission, so owners can delegate assigning and revoking member
  licenses and managing automatic assignment. The permission doesn't
  include changing the organization's license count by buying more,
  dropping some, or otherwise resizing the pool.
- You can now create a
  personal access token
  with **Allow Cloud Sandboxes access** (`sandbox:use`) on its own, or
  with one repository permission. Select **No repository access** when
  the token <example-value> not access repositories.

## 2026-09-30

### Bug fixes and enhancements

- Accounts that already have cloud sandboxes skip
  Docker Agentic Platform
  checkout.

## 2026-09-29

### New

- Organization owners can now
  assign a license to a team.
  Every member of the team receives the license, including people who join the
  team later. Each member uses one license per product.
- The
  Licenses page
  in Docker Home shows how many licenses are available and whether they are
  assigned to teams or to individual members.

## 2026-09-28

### Bug fixes and enhancements

- Creating a team
  in Docker Home opens that team's page.
- The
  member list CSV
  includes a **Licenses** column when the organization has at least one active
  license pool. The column lists each member's assigned licenses.

## 2026-09-24

### New

- You can now subscribe to the
  Docker Agentic Platform
  pay-as-you-go plan with an individual account to run agents in cloud
  sandboxes. Compute is metered by the second while a sandbox runs.

### Bug fixes and enhancements

- The support request form **Legal**
  topic includes **PII/Sensitive information**, **Service abuse**, and
  **Trademark takedowns**.

## 2026-09-14

### New

- Organization owners can now
  export a member list
  from Docker Home and receive the CSV by email. Docker generates the file
  asynchronously and emails a download link to the owner.

## 2026-08-20

### New

- Docker Verified Publisher
  Starter and Growth plans are now available via self-serve. Organizations
  can apply and subscribe without contacting sales.

## 2026-08-14

### New

- Administrators can now
  select a product license when inviting a member.
  Docker assigns the license when the invitee accepts.

## 2026-07-31

### New

- Administrators can now create
  OIDC connections
  so GitHub Actions workflows authenticate to Docker with short-lived tokens
  instead of stored personal or organization access tokens. Available for
  Docker Team, Docker Business, Docker Hardened Images, and Docker Sponsored
  Open Source organizations.

## 2026-06-18

### New

- Custom roles now include
  AI Governance permissions
  so owners can delegate policy management to other users and teams.

## 2026-06-02

### New

- Administrators can now provision products to organization members with
  licenses.
  Licenses were introduced with AI Governance. Owners can assign or revoke
  them from the Members page, or turn on automatic assignment when a member
  first uses a supported product.

## 2026-05-19

### New

- You can now purchase
  Gordon Plus, Max, and Ultra plans
  for individual accounts from the billing portal in Docker Home.
- Organizations can now purchase
  DHI Select repositories via
  self-serve from the billing portal in Docker Home.

## 2026-05-12

### New

- AI Governance is
  now available. Administrators can purchase licenses through sales,
  assign them to members,
  and enforce
  organization policies for
  Docker AI products from Docker Home.

## 2026-03-03

### New

- DHI Select is now available
  as a Docker Hardened Images plan for organizations that need SLA-backed
  patching and compliance-ready images.

## 2026-02-18

### New

- Administrators can now
  configure DVP analytics settings
  for consuming domain and benchmark report allocations in the Admin
  Console.

## 2026-02-13

### New

- Administrators can now control whether organization members can push content
  to their personal namespaces on Docker Hub with
  namespace access control.
- Administrators can now prevent creating public repositories within
  organization namespaces using the
  Disable public repositories
  setting.

## 2026-01-27

### New

- Administrators can now use an allow list with
  Image Access Management
  to approve specific repositories that bypass image access controls.

## 2025-11-04

### New

- Owners can now create
  custom roles
  and assign them to members and teams.

## 2025-10-28

### New

- Docker Business subscribers can now add
  Premium Support,
  with faster response times and 24/7 availability.

## 2025-10-22

### New

- Organizations can now
  pay by invoice.

## 2025-10-14

### Bug fixes and enhancements

- Docker Home now keeps
  activity logs
  for 30 days. Use the Docker Hub API to retrieve older events.

## 2025-10-07

### Bug fixes and enhancements

- Organization management has moved out of Docker Hub. Manage organizations in
  Docker Home.

## 2025-06-30

### New

- Organization owners can now
  export Docker Desktop user data
  from Insights as a CSV file.

## 2025-06-23

### Bug fixes and enhancements

- Organization access tokens
  now work with Docker Scout.

## 2025-06-18

### New

- Organization owners can now
  resend invitations in bulk
  from the Members page.

## 2025-06-10

### Bug fixes and enhancements

- Activity logs now record
  single sign-on connection changes, and changes to SCIM and just-in-time
  provisioning.

## 2025-05-12

### New

- You can now connect
  more than one identity provider
  to a single sign-on domain. Users choose a provider when they sign in with
  SSO.

## 2025-04-30

### New

- You can now pay for a subscription with a
  verified US bank account.

## 2025-04-22

### Bug fixes and enhancements

- Personal access tokens
  now transfer to the organization owners when you
  convert a user account into an organization.

## 2025-04-08

### New

- Organization owners can now onboard an organization with
  guided setup
  in Docker Home.

## 2025-04-01

### New

- Organization access tokens
  are now generally available.
- Single sign-on now supports the
  `dockerSessionMinutes` attribute,
  so a session can follow the identity provider timeout.
- Administrators can now
  track whether users comply with Docker Desktop settings policies
  from Docker Home (Early Access). Compliance status is reported by Docker
  Desktop version 4.40 and later.

## 2025-03-12

### New

- You can now
  disconnect a linked Google or GitHub account
  from Account settings.

## 2025-03-11

### New

- Organization access tokens
  now include repository scopes and organization management scopes for members,
  invites, and groups.

## 2025-02-21

### Bug fixes and enhancements

- Organization access tokens now work with Docker Build Cloud and the Docker
  Hub APIs. Company owners can manage them.

## 2025-02-11

### New

- Docker Home and the Docker Admin Console are now generally available.

## 2025-01-31

### Bug fixes and enhancements

- Docker began collecting VAT for all European countries on March 1, 2025. See
  Sales tax exemption and VAT.

## 2025-01-30

### New

- Installing Docker Desktop via the PKG installer is now generally available.
- Enforcing sign-in via configuration profiles is now generally available.

## 2025-01-10

### Bug fixes and enhancements

- Activity logs now record
  when a settings policy is created, updated, deleted, or transferred.

## 2024-12-10

### New

- New Docker subscriptions are now available. For more information, see
  Docker subscriptions and features
  and
  Announcing Upgraded Docker Plans: Simpler, More Value, Better Development and Productivity.

## 2024-11-18

### New

- Administrators can now:
  - Enforce sign-in with
    configuration profiles
    (Early Access).
  - Enforce sign-in for more than one organization at a time (Early Access).
  - Deploy Docker Desktop for Mac in bulk with the
    PKG installer
    (Early Access).
  - Use Desktop Settings Management via the Docker Admin Console
    (Early Access).

### Bug fixes and enhancements

- Enhanced Container Isolation (ECI) has been improved to:
  - Permit administrators to
    turn off Docker socket mount restrictions.
  - Support wildcard tags when using the
    `allowedDerivedImages` setting.

## 2024-11-11

### New

- Personal access tokens
  (PATs) now support expiration dates.

## 2024-10-15

### New

- Beta: You can now create
  organization access tokens
  (OATs) to enhance security for organizations and streamline access
  management for organizations in the Docker Admin Console.

## 2024-08-29

### New

- Deploying Docker Desktop via the
  MSI installer
  is now generally available.
- Two new methods to
  enforce sign-in
  (Windows registry key and `.plist` file) are now generally available.

## 2024-08-24

### New

- Administrators can now view
  organization Insights.

## 2024-07-17

### New

- You can now centrally access and manage Docker products in
  Docker Home.
