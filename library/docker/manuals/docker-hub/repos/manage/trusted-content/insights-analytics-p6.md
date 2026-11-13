---
title: "Insights and analytics (part 6 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/docker-hub/repos/manage/trusted-content/insights-analytics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Insights and analytics (part 6 of 7)

### Data points

Export data in either raw or summary format. Each format contains different data
points and with different structure.

The following sections describe the available data points for each format. The
**Date added** column shows when the field was first introduced.

#### Image pulls raw data

The raw data format contains the following data points. Each row in the CSV file
represents an image pull.

| Data point                    | Description                                                                                                  | Date added        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------- |
| Action                        | Request type, see Action classification rules. One of `pull_by_tag`, `pull_by_digest`, `version_check`. | January 1, 2022   |
| Action day                    | The date part of the timestamp: `YYYY-MM-DD`.                                                                | January 1, 2022   |
| Country                       | Request origin country.                                                                                      | January 1, 2022   |
| Digest                        | Image digest.                                                                                                | January 1, 2022   |
| HTTP method                   | HTTP method used in the request, see registry API documentation for details.                            | January 1, 2022   |
| Host                          | The cloud service provider used in an event.                                                                 | January 1, 2022   |
| Namespace                     | Docker organization (image namespace).                                                                  | January 1, 2022   |
| Reference                     | Image digest or tag used in the request.                                                                     | January 1, 2022   |
| Repository                    | Docker repository (image name).                                                                         | January 1, 2022   |
| Tag (included when available) | Tag name that's only available if the request referred to a tag.                                             | January 1, 2022   |
| Timestamp                     | Date and time of the request: `YYYY-MM-DD 00:00:00`.                                                         | January 1, 2022   |
| Type                          | The industry from which the event originates. One of `business`, `isp`, `hosting`, `education`, `null`.      | January 1, 2022   |
| User agent tool               | The application a user used to pull an image (for example, `docker` or `containerd`).                        | January 1, 2022   |
| User agent version            | The version of the application used to pull an image.                                                        | January 1, 2022   |
| Domain                        | Request origin domain, see Privacy.                                                              | October 11, 2022  |
| Owner                         | The name of the organization that owns the repository.                                                       | December 19, 2022 |

#### Image pulls summary data

There are two levels of summary data available:

- Repository-level, a summary of every namespace and repository
- Tag- or digest-level, a summary of every namespace, repository, and reference
  (tag or digest)

The summary data formats contain the following data points for the selected time
span:

| Data point        | Description                                             | Date added        |
| ----------------- | ------------------------------------------------------- | ----------------- |
| Unique IP address | Number of unique IP addresses, see Privacy. | January 1, 2022   |
| Pull by tag       | GET request, by digest or by tag.                       | January 1, 2022   |
| Pull by digest    | GET or HEAD request by digest, or HEAD by digest.       | January 1, 2022   |
| Version check     | HEAD by tag, not followed by a GET                      | January 1, 2022   |
| Owner             | The name of the organization that owns the repository.  | December 19, 2022 |

#### Image pulls action classification rules

An action represents the multiple request events associated with a
`docker pull`. Pulls are grouped by category to make the data more meaningful
for understanding user behavior and intent. The categories are:

- Version check
- Pull by tag
- Pull by digest

Automated systems frequently check for new versions of your images. Being able
to distinguish between "version checks" in CI versus actual image pulls by a
user grants you more insight into your users' behavior.

The following table describes the rules applied for determining intent behind
pulls. To provide feedback or ask questions about these rules,
fill out the Google Form.

| Starting event | Reference | Followed by                                                     | Resulting action | Use case(s)                                                                                                    | Notes                                                                                                                                                                                                                                                                                 |
| :------------- | :-------- | :-------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HEAD           | tag       | N/A                                                             | Version check    | User already has all layers existing on local machine                                                          | This is similar to the use case of a pull by tag when the user already has all the image layers existing locally, however, it differentiates the user intent and classifies accordingly.                                                                                              |
| GET            | tag       | N/A                                                             | Pull by tag      | User already has all layers existing on local machine and/or the image is single-arch                          |                                                                                                                                                                                                                                                                                       |
| GET            | tag       | Get by different digest                                         | Pull by tag      | Image is multi-arch                                                                                            | Second GET by digest must be different from the first.                                                                                                                                                                                                                                |
| HEAD           | tag       | GET by same digest                                              | Pull by tag      | Image is multi-arch but some or all image layers already exist on the local machine                            | The HEAD by tag sends the most current digest, the following GET must be by that same digest. There may occur an additional GET, if the image is multi-arch (see the next row in this table). If the user doesn't want the most recent digest, then the user performs HEAD by digest. |
| HEAD           | tag       | GET by the same digest, then a second GET by a different digest | Pull by tag      | Image is multi-arch                                                                                            | The HEAD by tag sends the most recent digest, the following GET must be by that same digest. Since the image is multi-arch, there is a second GET by a different digest. If the user doesn't want the most recent digest, then the user performs HEAD by digest.                      |
| HEAD           | tag       | GET by same digest, then a second GET by different digest       | Pull by tag      | Image is multi-arch                                                                                            | The HEAD by tag sends the most current digest, the following GET must be by that same digest. Since the image is multi-arch, there is a second GET by a different digest. If the user doesn't want the most recent digest, then the user performs HEAD by digest.                     |
| GET            | digest    | N/A                                                             | Pull by digest   | User already has all layers existing on local machine and/or the image is single-arch                          |                                                                                                                                                                                                                                                                                       |
| HEAD           | digest    | N/A                                                             | Pull by digest   | User already has all layers existing on their local machine                                                    |                                                                                                                                                                                                                                                                                       |
| GET            | digest    | GET by different digest                                         | Pull by digest   | Image is multi-arch                                                                                            | The second GET by digest must be different from the first.                                                                                                                                                                                                                            |
| HEAD           | digest    | GET by same digest                                              | Pull by digest   | Image is single-arch and/or image is multi-arch but some part of the image already exists on the local machine |                                                                                                                                                                                                                                                                                       |
| HEAD           | digest    | GET by same digest, then a second GET by different digest       | Pull by Digest   | Image is multi-arch                                                                                            |                                                                                                                                                                                                                                                                                       |

#### Extension Summary data

There are two levels of extension summary data available:

- Core summary, with basic extension usage information: number of extension
  installs, uninstalls, and total install all times

The core-summary-data file contains the following data points for the selected time
span:

| Data point      | Description                                      | Date added  |
| --------------- | ------------------------------------------------ | ----------- |
| Installs        | Number of installs for the extension             | Feb 1, 2024 |
| TotalInstalls   | Number of installs for the extension all times   | Feb 1, 2024 |
| Uninstalls      | Number of uninstalls for the extension           | Feb 1, 2024 |
| TotalUninstalls | Number of uninstalls for the extension all times | Feb 1, 2024 |
| Updates         | Number of updates for the extension              | Feb 1, 2024 |

- Premium summary, with advanced extension usage information: installs,
  uninstalls by unique users, extension opening by unique users.

The core-summary-data file contains the following data points for the selected time
span:

| Data point       | Description                                       | Date added  |
| ---------------- | ------------------------------------------------- | ----------- |
| Installs         | Number of installs for the extension              | Feb 1, 2024 |
| UniqueInstalls   | Number of unique users installing the extension   | Feb 1, 2024 |
| Uninstalls       | Number of uninstalls for the extension            | Feb 1, 2024 |
| UniqueUninstalls | Number of unique users uninstalling the extension | Feb 1, 2024 |
| Usage            | Number of openings of the extension tab           | Feb 1, 2024 |
| UniqueUsers      | Number of unique users openings the extension tab | Feb 1, 2024 |

### Changes in data over time

The insights and analytics service is continuously improved to increase the
value it brings to publishers. Some changes might include adding new data
points, or improving existing data to make it more useful.

Changes in the dataset, such as added or removed fields, generally only apply
from the date of when the field was first introduced, and going forward.

Refer to the tables in the Data points section to see from which
date a given data point is available.
