---
title: "Use Pipelines to count characters in text file"
date: "2021-03-05"
categories: 
  - "golang"
tags: 
  - "channel"
  - "count-characters"
  - "golang"
  - "pipeline"
---

The pipelines in go use [channels](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/2021/03/04/golang-channels/) to share data between multiple go routines within a defined workflow. It passes the input from one pipeline stage to next pipeline stage using channels. It enables continous data flow in a pipeline without use of Sync blocks.

Write below content and save to a text file `pipeline_txt.txt`

this is text for the pipeline code
this is another text line

#### **Read Lines in Text File**

First, we will create a channel `fileChannel` to which file data will be pushed for each line. We will create function `readFileToChannel` and pass the `` `lineChannel` `` to it. The responsibility of the function is to read file line by line and push it to the channel. We have restricted the channel parameter to be WriteOnly. We will close the channel and file once the data is completely read.

func readFileToChannel(lineChannel chan<- string) {
	file, err := os.Open("pipeline\_txt.txt")
	if err != nil {
		fmt.Println("Error reading file: ", err)
	}

	reader := bufio.NewReader(file)
	for {
		// Byte is implicitly convertible from char inside ''
		line, err := reader.ReadString('\\n')
        lineChannel <- line
		if err == io.EOF {	
			fmt.Println("End of file")
			break
		}
    }

	// LIFO
	defer close(lineChannel)
	defer file.Close()
}

Second, we need to create a function `readChars` which will read each line from the `lineChannel` and split it by spaces. Then, the function will push each character to another channel called `charChannel`. We have retricted the parameter for `lineChannel` to be ReadOnly and `charChannel` to be WriteOnly. we will close the channel once all lines are complete.

func readChars(fileChannel <-chan string, countCharChannel chan<- string) {
	for {
		line, ok := <-fileChannel
		if ok {
			fmt.Println("Received data from channel")
			fmt.Println(line)
			for \_, lineChar := range strings.Split(line, " ") {
				countCharChannel <- lineChar
			}
		} else {
			close(countCharChannel)
			break
		}
	}
}

Third, we will create a function `countChars` which will read each character pushed to the channel by `readChars` method. Once the character is received we will look into the char map and if it contains the char it will increment the count else it will push new char to charMap.

func countChars(charChannel <-chan string) {
	charMap := make(map\[string\]int)
	for {
		line, ok := <-charChannel
		if ok {
			fmt.Println("Received data from channel")
			fmt.Println(line)
			for \_, lineChar := range strings.Split(line, " ") {
				charMap\[lineChar\] = charMap\[lineChar\] + 1
			}
		} else {
			break
		}
	}

	fmt.Println("Total Char Counts: ", charMap)
}

Finally, we will create corresponding channels required by the functions and pass to them. we will execute the first two functions as goroutines and the last charCount function synchronously.

func main() {
	fileChannel := make(chan string)
	charChannel := make(chan string)
	go readFileToChannel(fileChannel)
	go readChars(fileChannel, charChannel)
	countChars(charChannel)

	fmt.Println("done")
}

Received data from channel
this is text for the pipeline code

Received data from channel
this
Received data from channel
is
Received data from channel
text
Received data from channel
for
Received data from channel
the
Received data from channel
pipeline
Received data from channel
this is another text line
End of file
Received data from channel
code

Received data from channel
this
Received data from channel
is
Received data from channel
another
Received data from channel
text
Received data from channel
line
Total Char Counts:  
map\[another:1 code:1 for:1 is:2 line:1 pipeline:1 text:2 the:1 this:2\]
done

The major takeway is the continous flow of the data across different functions without sleeping the thread or using any kind of thread block. Channels are a excellent way to propogate data across multiple go routines as seen in example above.
