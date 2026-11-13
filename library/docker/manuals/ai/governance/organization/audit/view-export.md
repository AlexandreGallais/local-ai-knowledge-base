---
title: "View and export audit events"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/governance/organization/audit/view-export.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# View and export audit events

Cloud delivery stores AI Governance audit records in Docker Cloud and makes
them available in the hosted audit log view. Use it to investigate
policy decisions, such as why a developer's request was blocked or what
sandboxes reached over the past week. Open the view to see recent events,
narrow it to the ones you care about, then export them to CSV if you need an
offline copy.

## Before you begin

- Cloud delivery must be turned on for your
  organization. The hosted view shows only records delivered to Docker Cloud,
  not records written to local disk.
- You need organization owner access, or a
  custom role
  with AI Governance audit permissions.

## View audit events

1. Sign in to Docker Home and select your
   organization.
1. Go to **AI Platform** > **Audit logs**.
1. Open **Audit events**.

The **Audit events** view includes summary tiles for **Events**, **Allowed**,
**Denied**, and **Consent required**. **Consent required** counts the events
with an Approval required decision. The event table includes:

| Column    | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| Time      | When Docker recorded the event.                                     |
| Event     | The event type or policy action.                                    |
| Principal | The Docker user associated with the event.                          |
| Resource  | The target resource, such as a domain, file path, or tool.          |
| Decision  | The governance decision, such as Allow, Deny, or Approval required. |
| Agent     | The AI agent associated with the event, when Docker knows it.       |

For every field in a record and what its values mean, see
Audit record reference.

## Filter and search events

The event table can hold a large number of events, so narrow it to the ones
you're investigating. Use the filters above the table:

- **Date range**: Today, Last 7 days, Last 14 days, Last 30 days, or a custom
  range. The table shows the last 7 days by default.
- **Decision**: Allow, Deny, Approval required, or Approval unavailable.
- **Event type**: the kind of action, such as a network or filesystem
  evaluation. For the full list, see
  Action types.
- **Agent**: the AI agent associated with the event.
- **Principal**: a Docker username.
- **Session ID**: an audit session ID. This filter shows the whole session,
  whatever the date range.

To search across events, principals, resources, and decisions, enter at least
three characters in the search box, then press Enter.

For example, set **Decision** to Deny and **Principal** to a developer's
username to see what their sandboxes were blocked from.

The table shows 25 events per page by default. You can show 100 per page
instead.

## Export events to CSV

When you need an offline copy of the events you found, export them. The export
uses your current filters and search terms:

1. Open **Audit events**.
1. Apply the filters and search terms for the events you want to export.
1. Select **Export**.
1. Download the generated CSV file from the link Docker provides.

CSV exports include up to 1,000,000 rows. An export stays available to download
for 24 hours after Docker generates it.

To monitor audit events continuously instead of searching them by hand,
forward them to your SIEM.
