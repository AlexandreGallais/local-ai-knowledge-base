---
title: "DHI plans"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/subscription-billing/plans/dhi.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# DHI plans

Docker Hardened Images (DHI) are secure, minimal, production-ready container images maintained by Docker.

- DHI Community is free and available to every developer.
- DHI Select is a paid plan for organizations that need compliance-ready images and SLA-backed patching. You can self-serve it in the billing portal.
- DHI Enterprise is for organizations with advanced security and customization requirements. To subscribe, contact sales.

For a full plan comparison, see the Docker pricing page.

## Usage

DHI Community gives you access to hardened base images from a public registry at no cost or additional setup. Any organization can pull hardened base images directly from `dhi.io`.

When you upgrade from DHI Community to DHI Select, you purchase a set number of repositories that are mirrored into your organization's namespace. Entitlements are scoped to the organization account that you assign them to during checkout. All organization members can then pull from those mirrored repositories.

DHI Enterprise extends DHI Select with unlimited customizations, optional full catalog access, the Hardened System Packages repository, and an Extended Lifecycle Support add-on.

For details on setting up and managing repositories, see Get started with DHI Select and Enterprise.

> **Tip:**
>
> EU data residency is in early access. Docker can provision your organization's DHI subscription in the EU region. To request it, contact your Docker account representative or Docker sales. For details, see EU data residency for Docker Hardened Images.

## Billing cycle

DHI Select is an annual plan billed per repository from the date your plan starts. Repositories added mid-cycle are prorated for the remainder of the billing period. For steps, see Add repositories.

## Add repositories

Repositories you add take effect immediately and are prorated for the rest
of the billing period.

1. Sign in to Docker Home and go to **Billing**.
1. From **Active plans**, select **Manage** next to **Hardened Images**.
1. Select **Add repositories**.
1. Choose the number of repositories, verify your billing details, continue
   to payment, and complete checkout.

## Disable auto-renewal

If you want to revert your plan to DHI Community, you must disable auto-renewal. Disabling auto-renewal is deferred to the end of the current billing cycle and your repository access remains active until then. To disable auto-renewal:

1. Sign in to Docker Home and go to **Billing**.
1. From **Active plans**, select **Manage** next to **Hardened Images**.
1. Select **Disable auto-renewal**.

If you disabled auto-renewal and the plan is still active, **Manage** includes **Enable auto-renewal**.

## Remove repositories

You may also remove repositories from your plan. Repository removals are deferred to the end of the current billing cycle. You can remove repositories at any time, but you cannot stop a plan mid-cycle to receive a partial refund. Repository access remains active until the cycle ends.

To remove repositories:

1. Sign in to Docker Home and go to **Billing**.
1. From **Active plans**, select **Manage** next to **Hardened Images**.
    - Select **Remove repositories** to adjust your repository count.
    - To keep your current repository count after renewal, select **Cancel scheduled change**.
    - Cancellations and repository removals take effect at the end of the current annual billing cycle.

If you're subscribed to DHI Enterprise, reach out to your sales representative to change your DHI plan.
