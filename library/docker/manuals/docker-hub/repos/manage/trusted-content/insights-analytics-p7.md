---
title: "Insights and analytics (part 7 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/trusted-content/insights-analytics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Insights and analytics (part 7 of 7)

## Privacy

This section contains information about privacy-protecting measures that ensures
consumers of content on Docker Hub remain completely anonymous.

> **Important:**
>
> Docker never shares any Personally Identifiable Information (PII) as part of
> analytics data.

The image pulls summary dataset includes unique IP address count. This data point only
includes the number of distinct unique IP addresses that request an image.
Individual IP addresses are never shared.

The image pulls raw dataset includes user IP domains as a data point. This is
the domain name associated with the IP address used to pull an image. If the IP
type is `business`, the domain represents the company or organization associated
with that IP address (for example, `docker.com`). For any other IP type that's
not `business`, the domain represents the internet service provider or hosting
provider used to make the request. On average, only about 30% of all pulls
classify as the `business` IP type (this varies between publishers and images).
