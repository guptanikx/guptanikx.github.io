---
title: "$unwind on Array of Nested documents and Primitive types"
date: "2021-03-07"
categories: 
  - "mongodb"
---

`$unwind` operator is used to flatten an array field, so that multiple root documents are obtained each having invidividual value from array item.  
`$replaceRoot` operator can be used to replace completely or update the top level document  
`$mergeObjects` can be used to merge into parent document but keeping the parent document intact

Insert below records in the collection for query operations. In below records we can see `item` field is an array of nested documents and `tags` field is array of strings. we will observe how `$unwind` operator behaves differently for array of nested documents and array of primitive values like string. we will be using compass and also mention code in different languages for the same.

\[
{ \_id: 1, item: \[{ name: "movie", code: "123" }, { name: "Pearl White", code: "456" }\], qty: 15, tags: \[ "A", "B", "C" \] },
{ \_id: 2, item: \[{ name: "cd", code: "123" }\], qty: 20, tags: \[ "B" \] },
{ \_id: 3, item: \[{ name: "Stanley Hunt", code: "1045" }, { name: "George McManus", code: "256" }\], qty: 25, tags: \[ "A", "B" \] },
{ \_id: 4, item: \[{ name: "xy", code: "456" }\], qty: 30, tags: \[ "B", "A" \] },
{ \_id: 5, item: \[{ name: "mn", code: "000" }\], qty: 20, tags: \[ \[ "A", "B" \], "C" \] }
\]

**$unwind syntax is as below**

> **path** : the reference to the array field which in our case is `**items**`  
> **includeArrayIndex** : if we want to include index of each item in parent document. In our case see highlighted **`itemIndex`**  
> **preserveNullAndEmptyArrays** : true if you think the field might be null or empty the target document will still contains the field and will not remove it as with normal operations

#### **$unwind on array of strings**

We will use the field name **tags** as highlighted in the image below. Tags field is array of strings

[![](/assets/images/unwind_03.png)](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/wp-content/uploads/2021/03/unwind_03.png)

Applying $unwind operator on the above field. Observing the output the invidual strings have been merged in the parent document while keeping the same name for the field. It has created three documents for each of the invdivudal items in tags array

[![](/assets/images/unwind_04.png)](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/wp-content/uploads/2021/03/unwind_04.png)

#### **$unwind on array of nested documents**

Lets see how $unwind operator behaves for nested documents. Applying `$unwind` on the `items` field.

[![](/assets/images/unwind_01.png)](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/wp-content/uploads/2021/03/unwind_01.png)

Observing the ouput the field type has now field has been replaced Object which means its a single entity of one of array item and we have received 2 documents as the no of items were 2. The major difference is that the document is not merged with parent document unlike it was when the field was array of strings. The reason being we have another operator for that which is `$replaceRoot` or `$mergeObjects` which we will use next to merge this document in parent document.

[![](/assets/images/unwind_02-1024x217.png)](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/wp-content/uploads/2021/03/unwind_02.png)

**$mergeObjects syntax is as below**

> **{ $mergeObjects** : \[<document 1>, <document 2>\]

**$replaceRoot syntax is as below**

> **{ $replaceRoot**: { newRoot: <document> }

In both the queries the <document> can be any document expression means it can point to specific fields and those fields will only be merged in the top document. For our case as we need to merge the `item` object into Root document without changing any other field we have to use both $replaceRoot and $mergeObjects together. So, the `newRoot` will be document we obtained from `$mergeObjects`.

Observing the $mergeObjects  
**First Argument** \- { name: "", code: "" } is meant for the default values for the case when the field item is not present or any sub field of item we are merging is null or not available. This should be the first argument of $mergeObjects. If we do not specify this as first argument then $mergeObjects will throw error if fields we have specified for merging is not found.  
**Second Argument** - $item - This will merge the content or nested fields of the `item` in Root document. See the higlighted documents  
**Third Argument** - $$ROOT - This is special keyword in mongo aggregate which points to the Top level or ROOT document in the pipeline. We are telling the $mergeObjects to merge the fields we have specified to the top document. If we do not mention the $$ROOT document the only fields we will see in the results will be the content of `item` field and all the original fields of the top document will be gone.

[![](/assets/images/unwind_05-1-1024x154.png)](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/wp-content/uploads/2021/03/unwind_05-1.png)
