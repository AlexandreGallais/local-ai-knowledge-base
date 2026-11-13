---
title: "Insights and analytics (part 3 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/trusted-content/insights-analytics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Insights and analytics (part 3 of 7)

### Available reports

The following reports are available for download as CSV files, based on your
organization's DVP subscription tier:

- Starter tier
  - Summary
- Growth tier
  - Summary
  - Trends
  - Domain-level reports
  - Benchmark

The Domain-level reports and Benchmark report each provide a different slice
of reporting on consuming domains:

- Domain-level reports show how those domains use your own images, and which
  other images they use alongside yours.
- Benchmark shows how those domains use the specific images you've configured to
  benchmark against, such as a single repository.

After your organization is provisioned for DVP analytics, it takes up to one
week for the first reports to become available.

#### Summary report

The summary report provides high-level usage metrics aggregated across all your
Docker Hub content, organized by namespace and repository. This report gives you
a comprehensive overview of your image portfolio performance, helping you
understand which repositories, tags, and specific image versions are most
popular with your users.

You can use this report to answer questions like:

- Which of my repositories are getting the most usage?
- How do different image tags compare in terms of adoption?
- What's the ratio of actual downloads versus version checks across my
  portfolio?
- Which specific image digests are being pulled most frequently?
- How has overall usage changed over time for my entire image collection?

To access the report:

1. Sign in to Docker Hub.
2. Select **My Hub** in the top navigation.
3. Select your organization in the left navigation.
4. Select **Analytics** > **Overview** in the left navigation.
5. Download the report by doing one of the following:
   - Select **Download Weekly Summary**.
   - Select the **Download Monthly Summary**.
   - Expand the **Summary reports for the year** drop-down and then select
     **Download report** for the desired week or month.

The summary report is a CSV file that contains the following data points:

| Field              | Description                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATE_GRANULARITY` | Weekly or monthly granularity of the data. Indicates whether the data is aggregated by week or month.                                                                 |
| `DATE_REFERENCE`   | The start date of the week or month in YYYY-MM-DD format (e.g., `2025-09-29` for the week starting September 29, 2025).                                               |
| `PUBLISHER_NAME`   | The name of the Docker organization that owns the repository (e.g., `demonstrationorg`).                                                                              |
| `LEVEL`            | The aggregation level of the data - either `repository` (summary for entire repository), `tag` (summary for specific tag), or `digest` (summary for specific digest). |
| `REFERENCE`        | The specific reference being summarized - the repository name, tag name, or digest hash depending on the level.                                                       |
| `DATA_DOWNLOADS`   | The number of actual image downloads.                                                                                                                                 |
| `VERSION_CHECKS`   | The number of version checks performed (HEAD requests to check for updates without downloading the full image).                                                       |
| `EVENT_COUNT`      | The total number of events, calculated as the sum of data downloads and version checks.                                                                               |

#### Trends report

The trends report helps you understand how adoption of your container images
evolves over time. It provides visibility into pull activity across repositories
and tags, enabling you to identify adoption patterns, version migration trends,
and usage environments (e.g., local development, CI/CD, production).

You can use this report to answer questions like:

- Which versions are gaining or losing traction?
- Is a new release being adopted?
- How does usage vary across cloud providers?

To access the report:

1. Sign in to Docker Hub.
2. Select **My Hub** in the top navigation.
3. Select your organization in the left navigation.
4. Select **Analytics** > **Trends** in the left navigation.
5. Select **DATA BY WEEK** or **DATA BY MONTH** to choose the data granularity.
6. Select **Download report** for the desired week or month.

The trends report is a CSV file that contains the following data points:

| Field                          | Description                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `DATE_GRANULARITY`             | Weekly or monthly granularity of the data.                                                                              |
| `DATE_REFERENCE`               | The start date of the week or month.                                                                                    |
| `PUBLISHER_NAME`               | The name of the organization that owns the repository.                                                                  |
| `IMAGE_REPOSITORY`             | The full name of the image repository (e.g., `demonstrationorg/scout-demo`).                                            |
| `NAMESPACE`                    | The Docker organization or namespace that owns the repository.                                                          |
| `IP_COUNTRY`                   | The country code (ISO 3166-1 alpha-2) where the pull request originated from (e.g., `US`, `CA`).                        |
| `CLOUD_SERVICE_PROVIDER`       | The cloud service provider used for the pull request (e.g., `gcp`, `aws`, `azure`) or `no csp` for non-cloud providers. |
| `USER_AGENT`                   | The client application or tool used to pull the image (e.g., `docker`, `docker-scout`, `node-fetch`, `regclient`).      |
| `TAG`                          | The specific image tag that was pulled, or `\\N` if no specific tag was used.                                           |
| `DATA_DOWNLOADS`               | The number of data downloads for the specified criteria.                                                                |
| `VERSION_CHECKS`               | The number of version checks (HEAD requests) performed without downloading the full image.                              |
| `PULLS`                        | The total number of pull requests (data downloads + version checks).                                                    |
| `UNIQUE_AUTHENTICATED_USERS`   | The number of unique authenticated users who performed pulls.                                                           |
| `UNIQUE_UNAUTHENTICATED_USERS` | The number of unique unauthenticated users who performed pulls.                                                         |

#### Domain-level reports

Domain-level reports provide detailed insights into how specific consuming
domains use your Docker Verified Publisher (DVP) images, both on their own and
alongside other container images. These reports help you understand usage
patterns, deployment environments, adoption trends, and technology stack
combinations across your customer base and potential prospects.

You can use these reports to answer questions like:

- How are specific consuming domains using my images across different
  environments?
- What deployment patterns do I see across local development, CI/CD, and
  production?
- Which consuming domains are heavy users of my images?
- How does usage vary by geography and cloud providers for consuming domains?
- Which consuming domains are using my image alongside specific complementary
  technologies?
- What technology stacks are adopted by enterprise customers in my target
  market?
- Which organizations might be good candidates for partnership discussions?
- How can I identify potential customers who are already using related
  technologies?

##### Technographic report

The technographic report provides a detailed view of which specific consuming
domains are using your DVP images together with other container images. This
report gives you visibility into the actual organizations adopting your
technology stack combinations, enabling targeted business development and
partnership opportunities.

To access the report:

1. Sign in to Docker Hub.
2. Select **My Hub** in the top navigation.
3. Select your organization in the left navigation.
4. Select **Analytics** > **Technographic** in the left navigation.
5. Select **DATA BY WEEK** or **DATA BY MONTH** to choose the data granularity.
6. Select **Download report** for the desired week or month.

The technographic report is a CSV file that contains the following
data points:

| Field              | Description                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `DATE_GRANULARITY` | Weekly or monthly granularity of the data.                                                         |
| `DATE_REFERENCE`   | The start date of the week or month in YYYY-MM-DD format.                                          |
| `PUBLISHER_NAME`   | The name of the organization that owns the DVP repository.                                         |
| `DOMAIN`           | The consuming domain that pulled both your DVP image and the paired image (e.g., `example.com`). |
| `DVPP_IMAGE`       | Your Docker Verified Publisher image repository name.                                              |
| `PAIRED_IMAGE`     | The other image repository that was used together with your DVP image by this domain.              |

Each row represents a unique combination of a consuming domain, your DVP
image, and another image that were used together during the specified time
period.

> **Note:**
>
> To protect privacy and ensure data quality, this report excludes personal
> email domains, disposable email services, and university domains. Only
> business and organizational domains are included in the analysis.

##### Consuming domains report

The consuming domains report provides detailed insights into how specific
consuming domains use your Docker Verified Publisher (DVP) images. This
report helps you understand usage patterns, deployment environments, and
adoption trends across your customer base and potential prospects.

To access the report:

1. Sign in to Docker Hub.
2. Select **My Hub** in the top navigation.
3. Select your organization in the left navigation.
4. Select **Analytics** > **Consuming Domains** in the left navigation.
5. Select **DATA BY WEEK** or **DATA BY MONTH** to choose the data granularity.
6. Select **Download report** for the desired week or month.

The consuming domains report is a CSV file that contains the following data
points:
