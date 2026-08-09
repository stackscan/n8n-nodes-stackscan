# n8n-nodes-stackscan

Look up the technologies and companies behind any website, from inside n8n.

[StackScan](https://www.stackscan.com) tracks which technologies run on which
websites. Give it a domain and it returns the stack. Give it a technology and it
returns who uses it.

[Installation](#installation) · [Credentials](#credentials) ·
[Operations](#operations) · [What it costs](#what-it-costs) ·
[Example workflows](#example-workflows) · [Troubleshooting](#troubleshooting)

## Installation

Community node, installed the usual way.

**n8n Cloud and self hosted, from the editor**: go to **Settings** then
**Community nodes**, choose **Install**, and enter `n8n-nodes-stackscan`.

**Self hosted, manually**:

```bash
npm install n8n-nodes-stackscan
```

Restart n8n and StackScan appears in the node picker.

## Credentials

You need a StackScan account and an API token.

1. Sign in at [app.stackscan.com](https://app.stackscan.com).
2. Open **My Account** then **API Tokens** and create one.
3. **Copy it there and then.** The token is shown once. If you lose it, revoke
   it and make another; there is no way to read an existing one back.
4. In n8n, add a **StackScan API** credential and paste the token.

The credential is tested against `GET /v1/me` when you save it, so a bad token
fails immediately rather than on the first run.

### Choosing a workspace

Every operation has a **Workspace** dropdown that fills itself in from your
token. One credential reaches every workspace you belong to, so you do not need
a second credential to work across two of them.

**Each workspace has its own credits and its own data.** Picking the wrong one
spends the wrong balance.

## Operations

No trigger node. StackScan answers questions about domains rather than emitting
a stream of records, so there is nothing honest to wake a workflow up. Your
workflow starts somewhere else and calls StackScan in the middle.

### Domain

| Operation | Give it | Get back |
|---|---|---|
| Look Up Technologies | one domain | every technology detected on that site |
| Look Up Technologies in Bulk | up to 100 domains | the same, for all of them in one call |

Bulk is far cheaper in n8n executions than looping a single lookup, and it is
the same price per resolved domain.

### Company

| Operation | Give it | Get back |
|---|---|---|
| Look Up Company | one domain | the business behind it: name, industry, location, LinkedIn |

### Technology

| Operation | Give it | Get back |
|---|---|---|
| Get Usage | a technology name | how many sites run it, and the top countries |
| Start List Export | a technology name | a report ID and a status URL for a full export |

**Start List Export returns immediately.** A whole-technology export can run to
millions of rows and take minutes, so the operation hands back a `status_url`
rather than waiting. Poll it, and the file is there once `status` reads `ready`.

A workflow cannot carry the file itself. Lists reach well over a gigabyte, so
what moves through n8n is the link and the counts, never the rows.

## What it costs

Two separate balances. A full balance of one will not pay for the other.

| Operation | Wallet | Charge |
|---|---|---|
| Look Up Technologies | bulk lookup | 1 per resolved domain |
| Look Up Technologies in Bulk | bulk lookup | 1 per resolved domain |
| Look Up Company | bulk lookup | 1 per resolved domain |
| Get Usage | bulk lookup | 1 |
| Start List Export | **standard** | 1 flat, whatever the size |

Domains we hold no data for are not charged. Repeating a technology export
inside the same billing period is free, so a monthly refresh costs one credit a
month rather than one a run.

`GET /v1/me` reports both balances, and every response carries the remaining
balance in its headers.

## Example workflows

**Enrich a new CRM company**

```
New company in HubSpot
  -> StackScan: Look Up Company
  -> Update the company record
```

**Alert on a competitor's stack**

```
New row in Google Sheets
  -> StackScan: Look Up Technologies
  -> Filter: technologies contains your competitor
  -> Send a Slack message
```

Put the filter after the lookup. You cannot filter on data you have not
fetched.

**Enrich a list weekly**

```
Schedule Trigger (weekly)
  -> StackScan: Look Up Technologies in Bulk (up to 100 domains)
  -> Append rows to a sheet
```

**Refresh a whole technology list monthly**

```
Schedule Trigger (monthly)
  -> StackScan: Start List Export
  -> Send yourself the status URL
```

## Troubleshooting

**"Insufficient Bulk Lookup Credits" or "no standard credits".** Check which
balance the operation needs against the table above. The two are not
interchangeable, and a list export spends standard credits while everything else
spends bulk lookup credits.

**The workspace dropdown is empty.** The token is valid but the account belongs
to no workspace yet, or the token was pasted with surrounding whitespace.

**"Unauthenticated".** The token was mistyped or has been revoked. Create a
fresh one and update the credential.

**A lookup found nothing.** We hold no record for that domain. Nothing is
charged. Unlike some platforms, n8n does not have to stop here: turn on
**Continue On Fail** on the node and the workflow carries on to the next item,
which is what you usually want when running a list where some will miss.

**A list export says `truncated`.** Plans cap how many rows an export may hold,
and the ceiling is 1,000,000 even on unlimited plans. `result_count` is how many
websites matched, `exported_rows` is how many the file holds. Check this before
treating a file as the full population.

## Compatibility

Tested against n8n 1.x. Requires Node.js 20 or later.

## Resources

- [StackScan API documentation](https://api.stackscan.com/docs)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Report an issue](https://github.com/stackscan/n8n-nodes-stackscan/issues)

## Licence

[MIT](LICENSE.md)
