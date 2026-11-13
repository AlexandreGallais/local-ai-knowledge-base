---
title: "Insights and analytics (part 4 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/trusted-content/insights-analytics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Insights and analytics (part 4 of 7)

| Field                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATE_GRANULARITY`           | Weekly or monthly granularity of the data.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `DATE_REFERENCE`             | The start date of the week or month in YYYY-MM-DD format.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `PUBLISHER_NAME`             | The name of the organization that owns the DVP repository.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `DOMAIN`                     | The consuming domain (e.g., `docker.com`) associated with the image pulls.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `IP_COUNTRY`                 | The country code (ISO 3166-1 alpha-2) where the pull request originated from.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CLOUD_SERVICE_PROVIDER`     | The cloud service provider used for the pull request or `no csp` for non-cloud providers.                                                                                                                                                                                                                                                                                                                                                                                               |
| `USER_AGENT`                 | The client application or tool used to pull the image.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `INFERRED_USE_CASE`          | The inferred deployment environment based on user agent and cloud provider analysis. Values include: • `Local Dev`: Local development environment (e.g., Docker Desktop, direct `docker` commands) • `CI/CD`: Continuous integration/deployment pipelines (e.g., containerd, build tools, registry mirroring) • `Prod`: Production environments (e.g., Kubernetes, container orchestration platforms) • `Unknown`: Unable to determine the use case from available data |
| `IMAGE_REPOSITORY`           | The specific DVP image repository that was pulled.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DATA_DOWNLOADS`             | The number of actual image layer downloads for this combination.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `VERSION_CHECKS`             | The number of version checks (HEAD requests) performed without downloading the full image.                                                                                                                                                                                                                                                                                                                                                                                              |
| `PULLS`                      | The total number of pull requests (data downloads + version checks).                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `UNIQUE_AUTHENTICATED_USERS` | The number of unique authenticated users from this domain who performed pulls.                                                                                                                                                                                                                                                                                                                                                                                                          |

> **Note:**
>
> Use case inference is determined by analyzing user agent patterns and cloud
> service provider usage. Local development tools used on cloud infrastructure
> are reclassified as CI/CD, and CI/CD tools used on cloud infrastructure are
> reclassified as production to better reflect actual deployment patterns.

#### Benchmark report

The benchmark report shows how consuming domains interact with the specific
images you've configured to benchmark against, such as a single repository.
The report is generated per repository, so each benchmark repository
you configure produces its own report.

To access the report:

1. Sign in to Docker Hub.
2. Select **My Hub** in the top navigation.
3. Select your organization in the left navigation.
4. Select **Analytics** > **Benchmark** in the left navigation.
5. Select **DATA BY WEEK** or **DATA BY MONTH** to choose the data granularity.
6. Select **Download report** for the desired week or month.

The benchmark report is a CSV file that contains the following data points:

| Field                         | Description                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `DATE_GRANULARITY`            | Weekly or monthly granularity of the data.                                                   |
| `DATE_REFERENCE`              | The start date of the week or month in YYYY-MM-DD format.                                    |
| `PUBLISHER_NAME`              | The name of the organization that owns the DVP repository.                                   |
| `DOMAIN`                      | The consuming domain associated with the pulls.                                              |
| `IP_COUNTRY`                  | The country code (ISO 3166-1 alpha-2) where the pull request originated from.                |
| `CLOUD_SERVICE_PROVIDER`      | The cloud service provider used for the pull request, or `no csp` for non-cloud providers.    |
| `USER_AGENT`                  | The client application or tool used to pull the image.                                       |
| `INFERRED_USE_CASE`           | The inferred deployment environment, using the same rules as the consuming domains report. |
| `IMAGE_REPOSITORY`            | The benchmark-configured image repository that was pulled.                                   |
| `DATA_DOWNLOADS`              | The number of actual image layer downloads for this combination.                             |
| `VERSION_CHECKS`              | The number of version checks (HEAD requests) performed without downloading the full image.    |
| `PULLS`                       | The total number of pull requests (data downloads + version checks).                         |
| `UNIQUE_AUTHENTICATED_USERS`  | The number of unique authenticated users from this domain who performed pulls.               |

To configure which repositories are benchmarked, see Configure DVP analytics
settings.

### Configure DVP analytics settings

Organization owners and editors can configure DVP analytics settings through the
Admin Console to control consuming domain and benchmark report allocations for
your verified publisher namespaces.

1. Sign in to Docker Home and select your organization.
2. Select **Admin Console** > **Verified Publisher**.
3. Configure the settings:
   - **Consuming domains**: Set the number of consuming domains to track for
     reporting purposes. This setting determines how many domains appear in
     your Domain-level reports. You can only set this
     number up to the maximum included in your DVP subscription.
   - **Benchmark report allocations**: If your organization has benchmark
     reports enabled, enter the number of consuming domains to include in the
     benchmark report for each namespace listed.
4. Select **Save** to apply your changes.

Changes to your report configuration take effect at the next reporting
cadence, either the next weekly or monthly report.
