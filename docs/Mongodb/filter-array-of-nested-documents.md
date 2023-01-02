---
title: "$filter Array of Nested documents"
date: "2021-03-07"
categories: 
  - "mongodb"
---

`$filter` operator is used to remove unwanted nested documents or or data in array field

As `$match` condition doesn't work for the nested documents in an array we will use $filter to remove the nested documents from `"item"` field where "name" starts with movie. Though we have one problem that $filter cannot be used as regular operator expression. It can only be used ins"id"e `$project` operator or `$addFields` operator. We will leverage $addFields operator for this exercise.

```json
[{
		"id": 1,
		"item": [{
			"name": "movie",
			"code": "123"
		}, {
			"name": "Pearl White",
			"code": "456"
		}],
		"qty": 15,
		"tags": ["A", "B", "C"]
	},
	{
		"id": 2,
		"item": [{
			"name": "cd",
			"code": "123"
		}],
		"qty": 20,
		"tags": ["B"]
	},
	{
		"id": 3,
		"item": [{
			"name": "Stanley Hunt",
			"code": "1045"
		}, {
			"name": "movie",
			"code": "256"
		}],
		"qty": 25,
		"tags": ["A", "B"]
	},
	{
		"id": 4,
		"item": [{
			"name": "movie Matric",
			"code": "1045"
		}],
		"qty": 30,
		"tags": ["B", "A"]
	},
	{
		"id": 5,
		"item": [{
			"name": "mn",
			"code": "000"
		}],
		"qty": 20,
		"tags": [
			["A", "B"], "C"
		]
	}
]
```

- #### `$filter` syntax
```text
{ "$filter": { input: , as: , cond: } }
```

- #### `$addFields` syntax
```text
{ $addFields: { newField: expression } }
```

Observing the query we are adding new field `new_"item"` to the document which will be computed using the `$filter` expression on the `"item"` field where "name" field ins"id"e "item" is movie. "item" alias is optional but is kept for clarity on the usage. The "item"s which have the "name" field ins"id"e "item" as movie thos "item"s will be removed from original "item"s.

![](/assets/images/unwind_06-1024x184.png)
