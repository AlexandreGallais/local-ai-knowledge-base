---
title: "Insights and analytics (part 5 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/trusted-content/insights-analytics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Insights and analytics (part 5 of 7)

## DSOS & Legacy DVP programs

> **Important:**
>
> The Legacy DVP program applies to existing customers who have not yet renewed
> to DVP Core. The DVP Legacy program is deprecated and will be retired. Contact
> your Docker sales representative or
> Docker for more information.

### View the image's analytics data

You can find analytics data for your repositories on the **Insights and
analytics** dashboard at the following URL:
`https://hub.docker.com/orgs/{namespace}/insights/images`. The dashboard
contains a visualization of the usage data and a table where you can download
the data as CSV files.

To view data in the chart:

- Select the data granularity: weekly or monthly
- Select the time interval: 3, 6, or 12 months
- Select one or more repositories in the list

> **Tip:**
>
> Hovering your cursor over the chart displays a tooltip, showing precise data
> for points in time.

#### Share analytics data

You can share the visualization with others using the **Share** icon at the top
of the chart. This is a convenient way to share statistics with others in your
organization.

Selecting the icon generates a link that's copied to your clipboard. The link
preserves the display selections you made. When someone follows the link, the
**Insights and analytics** page opens and displays the chart with the same
configuration as you had set up when creating the link.

### Extension analytics data

If you have published Docker Extensions in the Extension marketplace, you can
also get analytics about your extension usage, available as CSV files. You can
download extension CSV reports from the **Insights and analytics** dashboard at
the following URL:
`https://hub.docker.com/orgs/{namespace}/insights/extensions`. If your Docker
namespace contains extensions known in the marketplace, you will see an
**Extensions** tab listing CSV files for your extension(s).

### Exporting analytics data

You can export the analytics data either from the web dashboard, or using the
DVP Data API. All members of an organization
have access to the analytics data.

The data is available as a downloadable CSV file, in a weekly (Monday through
Sunday) or monthly format. Monthly data is available from the first day of the
following calendar month. You can import this data into your own systems, or you
can analyze it manually as a spreadsheet.

#### Export data

Export usage data for your organization's images using the Docker Hub website by
following these steps:

1.  Sign in to Docker Hub and select **My Hub**.

2.  Choose your organization and select **Analytics**.

3.  Set the time span for which you want to export analytics data.

    The downloadable CSV files for summary and raw data appear on the right-hand
    side.

#### Export data using the API

The HTTP API endpoints are available at:
`https://hub.docker.com/api/publisher/analytics/v1`. Learn how to export data
using the API in the DVP Data API documentation.
