---
title: Join MongoDB Collections
description: $unwind, $lookup, $out, $merge
---

### Operators
- ### `$lookup`
  - Join two collections 
  - Syntax
  	```bash
    $lookup: {
        from: "<collection name>",
        localField: "field name to join from current document",
        foreignField: "field name in target collection document",
        as: "alias name for joined field"
    }
  	```
    - The joined collection documents will appear as alias field in each source document

- ### `$unwind`
  - Deconstructs the alias field and merge each entry in source document creating n * m documents
  - Syntax
    ```bash
    { $uwnind: "$<alias field name>" }
    ```
    - when calling $unwind on below document  
    ```bash
    {x: 1, y: 2, alias_field: [1, 2, 3]}
    ```
      - Response
      ```bash
      { x: 1, y: 2, alias_field: 1 }
        { x: 1, y: 2, alias_field: 2 }
        { x: 1, y: 2, alias_field: 3 }     
      ```
- ### `$out` & `$merge`
  - Saves the results to the provided collection
  - Syntax
  ```bash
  { $out: "<target collection name>" }
  ```

### Examples
- Join `comments` and `users` collection on email of name
	```bash
  var pipeline = [
      { $lookup: { 
              from: "comments",
              localField: "email",
              foreignField: "email",
              as: "user_comments"
          } 
      },
      { $limit: 2 }
  ]
  db.users.aggregate(pipeline).toArray()
	```
