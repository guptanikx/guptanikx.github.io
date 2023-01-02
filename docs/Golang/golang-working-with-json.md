---
title: "Golang JSON Reading/Writing"
date: "2021-03-04"
categories: 
  - "golang"
tags: 
  - "golang-json"
---

Using JsonEncoder/Decoder and Marhsal/Unmarshal for JSON Serialization and Deserialization in Golang
{: .msg-info }

- Create a sample JSON file `samplemflix.json` with below single record
```json
{% include_relative test.json %}
```

- Creating structure for storing JSON as variable
	```golang
	type Movie struct {
		Title  string
		Genres []string
		Rated  string
		Award  Awards
	}

	type Awards struct {
		Wins        int
		Nominations int
		Text        string
	}
	```


Golang by default supports serializing/deserializing JSON ignoring casing  
Golang has two ways to read/write `JSON JsonEncoder/Decoder` & `Marshal/Unmarshal`
{: .msg-info }

- ### Using JsonDecoder/Encoder
JSONDecoder is used to decode or read JSON file. JSONDecoder supports single record reading only. we will try to read the file we created above.  
New instance of JSONDecoder requires `io.Reader` interface which in our case is obtainer from opening the json file.(line 2). As stated before decoder supports only reading single record and `decoder.Decode` method requires pointe to the variable we need to read. we created a variable first for target record which in this case is on line 10. When calling decode method we need to pass the pointer to the record.
```golang
func readJSONFile() {
	in, err := os.Open("samplemflix.json")
	if err != nil {
		fmt.Println("Error in Reading file: ", err)
		return
	}
	defer in.Close()

	jsonDecoder := json.NewDecoder(in)
	var record = Movie{}
	err = jsonDecoder.Decode(&record)
	if err != nil {
		fmt.Println("Error in parsing file: ", err)
		return
	}

	fmt.Println(record)
}
```
```bash
{Blacksmith Scene [Short] UNRATED {0 0 }}
```

Encoder is used to write a struct into JSON format. Encoder requires `io.Writer` interface when creating new encoder. In our case we are providing os.Stdout which willl write it to the terminal or console.
```golang
func writingJSONFile() {
	record := Movie{
		Title:  "Sample Movie",
		Rated:  "Approved",
		Genres: []string{"Horror", "Action"},
		Award: Awards{
			Text:        "1 win",
			Nominations: 2,
			Wins:        1,
		},
	}

	var encoder = json.NewEncoder(os.Stdout)
	encoder.Encode(record)
}
```

- ### Using Marshal/Unmarshal
`json.Marshal` method serializes structure to String format. Marshal does not support writing to Writer interface. Though, Marshal/Unmarshal supports multi record read/write. Similarly, `json.Unmarshal` requires `[]byte` as input and assign data to struct.

```golang
func marshalJson() {
	record := Movie{
		Title:  "Sample Movie",
		Rated:  "Approved",
		Genres: []string{"Horror", "Action"},
		Award: Awards{
			Text:        "1 win",
			Nominations: 2,
			Wins:        1,
		},
	}

	rec, err := json.Marshal(&record)
	if err != nil {
		fmt.Println("Error in Marhsalling: ", err)
		return
	}

	fmt.Println("Marshaled Json n", string(rec)) 
  	UnmarshalJson(rec)
}

func UnmarshalJson(input []byte) {
	var rec Movie
	err := json.Unmarshal(input, &rec)
	if err != nil {
		fmt.Println("Error in unmarshal json: ", err)
		return
	}

	fmt.Println(rec)
}
```
```bash
Marshaled Json 
 {"Title":"Sample Movie","Genres":["Horror","Action"],"Rated":"Approved","Award":{"Wins":1,"Nominations":2,"Text":"1 win"}}
{Sample Movie[Horror Action] Approved {1 2 1 win}}
```

If we want to customize Seralizing and Deserializing we can implement either of two interface `Marshaler` and `Unmarshaler`

- ### Reading JSON into Maps
If at runtime we are not sure what will be the structure of JSON, or the requirement is dynamic JSON, then it is not possible to create dynamic structures on fly. To tackle this problem we can read JSON as Maps and process.  
Here we are using `os.ReadFile` which can read the file as byte. We can then pass the data bytes to `json.Unmarshal` method and pointer to the Map interface variable we have declared. When parsing to Map structure each JSON key is Map key
```golang
func ReadJsonAsMap(){
	fileData, err := os.ReadFile("samplemflix.json")
	if err != nil {
		fmt.Println("Error in Reading file: ", err)
		return
	}

	var parsedMap map[string]interface{}
	json.Unmarshal(fileData, &parsedMap)

	fmt.Println("Json Map: ", parsedMap)
}
```

