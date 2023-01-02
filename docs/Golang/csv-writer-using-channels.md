---
title: "High Performance CSV writer in golang"
date: "2021-03-07"
categories: 
  - "golang"
---

Though i am new to golang i am very much fascinated by the ease of use and few features of golang like [channels](), [pipelines]()A which arre extremely easy to use and highly performant. In this exercise we will read data from mongo and write the csv.

Packages Used  
`go.mongodb.org/mongo-driver/bson`

The data type of channel is IDataRow which is generic interface with a single function `GetColumn` which returns interface type which is base of all types in go. This interface will remove the dependency on the internal data structure used to fetch each column value.

type IDataRow interface {
	GetColumn(fieldName string) interface{}
}

Let's create a type MongoDataRow which will implement the above interface and return each column value. `MongoDataRow` contains field row which is of type `bson.M` which is a Map document in Bson library. This document will contain Map of field name as key and value as Key value.

type MongoDataRow struct {
	row bson.M
}

func (t \*MongoDataRow) GetColumn(fieldName string) interface{} {
	if t.row\[fieldName\] != nil {
		return fmt.Sprint(t.row\[fieldName\])
	}
	return ""
}

Next, we will declare a function which will return the data rows that needs to be written and feed it into the channel. The channel is of DataType IDataRow. In below function, we are querying the Mongo collection and iterating the cursor. MongoCursor function `cur.Next` returns true until the data is empty. for each item we are writing it to the channel.

func Data(db \*mongo.Database, docChannel chan IDataRow) {
	cur, err := db.Collection("movies").Find(context.Background(), bson.D{})
	if err != nil {
		log.Panic("Not able to get data: ", err)
	}

	defer close(docChannel)
	defer cur.Close(context.Background())
	for cur.Next(context.Background()) {
		var result bson.D
		err := cur.Decode(&result)
		if err != nil {
			log.Panic("Unable to decode: ", err)
		}

		docChannel <- datasource.CreateDataRow(result)
	}
}

Now, we have created the data source uptil now and now data is ready to be consumed.So, we will create a CsvWriter that will receive the data and write it to the `io.Writer` object.

In below code, we have create a CsvWriter which contains information about the Input and output.  
`NewCsvWriter` will create a new instant of the CsvWriter object. This function requried the io.Writer type. This is generic type which is implemented by all go writers. The reason we have used it so that CsvWriter needs not to know where to write to. It can either be a File, Stream etc . As long as destination implements io.Writer we should be able to write to it. Another useful feature is we don't need to keep data in memory and we can directly write it to the stream.  
Function `WriteRows` takes the data source channel from where it will fetch each time the data is writtem to the channel. As datassource type is **interface{}** we have used **`fmt.SPrint`** to convert it to the string.

type CsvWriter struct {
	writer   io.Writer
	columns  \[\]string
	fileName string
}

func NewCsvWriter(writer io.Writer, columns \[\]string) \*CsvWriter {
  return &CsvWriter{writer: writer, columns: columns}
}

func (t \*CsvWriter) WriteHeader() {
	for index, col := range t.columns {
		t.writer.Write(\[\]byte(col))
		if index < len(t.columns)-1 {
			t.writer.Write(\[\]byte(","))
		}
	}
	t.writer.Write(\[\]byte("\\n"))
}

func (t \*CsvWriter) WriteRows(docChannel chan datasource.IDataRow) {
	for {
		doc, ok := <-docChannel
		if !ok {
			return
		}
		for index, col := range t.columns {
			t.writer.Write(\[\]byte(fmt.Sprint(doc.GetColumn(col))))
			if index < len(t.columns)-1 {
				t.writer.Write(\[\]byte(","))
			}
		}

		t.writer.Write(\[\]byte("\\n"))
	}
}

Now, finally we will connect the pieces together through main function which will create CsvWriter and fetch the data and provide it to the CsvWriter. We are providing the FileWriter to the instant.

func main() {
  columns := \[\]string{"title", "lastUpdatedDate"}
  file, \_ := os.Open("testfile.txt")
  defer file.close()
  csvWriter := csv.NewCsvWriter(file, columns)
  csvWriter.WriteHeader()
  docChannel := make(chan datasource.IDataRow)
  go Data(db, docChannel)
  csvWriter.WriteRows(docChannel)
}

Now, when we run the file it will generate **`testFile.txt`** with data. The time taken is very less around 5 seconds for 30000 records.

As the writer is writte generic, we can extend it to host it as api and provide ResponseWriter instead of File and so on.
