---
title: "Comparison Query Operator $eq"
date: "2021-03-06"
categories: 
  - "mongodb"
"tags":
  - "query"
  - "comparison operator"
---

`$eq` is also an implicit operator, so we can use it as below without specifying `$eq` operator  
Insert below records in the collection for query operations
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
			"name": "George McManus",
			"code": "256"
		}],
		"qty": 25,
		"tags": ["A", "B"]
	},
	{
		"id": 4,
		"item": [{
			"name": "xy",
			"code": "456"
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

### Query Top Document Fields

- Find by 1st level field
```go
db.Collection(CollectionName).Find(context.Background(), bson.D\{\{"qty", 15\}\})
```

- Find in array of strings
```go
db.Collection(CollectionName).Find(context.Background(), bson.D\{\{"tags", "A"\}\})
```
```text
---- Filter Used:  [{qty 15}]
[{id 1} {item [[{name movie} {code 123}] [{name Pearl White} {code 456}]]} {qty 15} {tags [A B C]}]
```
```text
---- Filter Used:  [{tags A}]
[{id 1} {item [[{name movie} {code 123}] [{name Pearl White} {code 456}]]} {qty 15} {tags [A B C]}]
[{id 3} {item [[{name Stanley Hunt} {code 1045}] [{name George McManus} {code 256}]]} {qty 25} {tags [A B]}]
[{id 4} {item [[{name xy} {code 456}]]} {qty 30} {tags [B A]}]
```

### Query Embedded or child Document Fields

- Find by 2nd Level sub field
```go
db.Collection(CollectionName).Find(context.Background(), bson.D\{\{"item.name", "cd"\}\})
```