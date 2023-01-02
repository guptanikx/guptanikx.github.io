---
title: Azure- CosmosDB - Resource Token
---

Using Resource Token end user can access the MongoDB directly as per `resource token permissions`
{: .msg-info }


### Using Resource Token (SQL API) {#notes}
- Create CosmosDb SQL account - [Command Ref](index)
```bash
az cosmosdb create -g lab -n cloudxlabsql --enable-free-tier true
```

- Create mongodb database in above cosmos account
```bash
az cosmosdb mongodb database create --account-name cloudxlabsql -g lab -n inserttest
```

- Create a container in above database
```bash
az cosmosdb sql container create --account-name cloudxlabsql --database-name subscriptions -n testContainer
```

- Create User with `Read Permission` on above Container using DotNetSdk
  - Install Package Microsoft.Azure.Cosmos
  - Create Cosmos Client and add User
    ```csharp
    var client = new CosmosClient("https://cloudxlabsql.documents.azure.com:443", <primary key>);
    var db = client.GetDatabase("subscriptions");
    var user = db.CreateUserAsync("testUser");
    var container = client.GetContainer(db.Id, "testContainer");
    await user.CreatePermissionAsync(new PermissionProperties("read", PermissionMode.Read, container))
    
    // With Optional Expiry for short lived tokens (in seconds)
    await user.CreatePermissionAsync(new PermissionProperties("read", PermissionMode.Read, container), TimeSpan.FromMinutes(5).Seconds);
    ```
    - Permission Response
      ```json
      {
        "permission": {
        "id": "read"
        },
        "headers": [
            "Cache-Control",
            "Pragma",
            "Transfer-Encoding",
            "Server",
            "Strict-Transport-Security",
            "x-ms-activity-id",
            "x-ms-last-state-change-utc",
            "ETag",
            "x-ms-resource-quota",
            "x-ms-resource-usage",
            "x-ms-schemaversion",
            "lsn",
            "x-ms-request-charge",
            "x-ms-alt-content-path",
            "x-ms-content-path",
            "x-ms-quorum-acked-lsn",
            "x-ms-current-write-quorum",
            "x-ms-current-replica-set-size",
            "x-ms-xp-role",
            "x-ms-global-Committed-lsn",
            "x-ms-number-of-read-regions",
            "x-ms-transport-request-id",
            "x-ms-cosmos-llsn",
            "x-ms-cosmos-quorum-acked-llsn",
            "x-ms-session-token",
            "x-ms-request-duration-ms",
            "x-ms-serviceversion",
            "x-ms-gatewayversion",
            "Date",
            "Content-Type"
        ],
        "resource": {
        "id": "read",
        "resourceUri": "dbs/subscriptions/colls/testContainer",
        "resourcePartitionKey": null,
        "permissionMode": 1,
        "token": "",
        "lastModified": "2020-12-13T10:35:06Z",
        "selfLink": ""
        },
        "statusCode": 201,
        "diagnostics": {},
        "requestCharge": 4.95,
        "activityId": ""
      }
      ```
  
---
#### References
- [Create Resource Token](https://docs.microsoft.com/en-us/azure/cosmos-db/secure-access-to-data#resource-tokens)
