---
title: "Using Channels in Golang"
date: "2021-03-04"
categories: 
  - "golang"
tags: 
  - "channel"
  - "cli"
  - "golang"
  - "readonly-channel"
  - "writeonly-channel"
---

The channels in go are way of sharing the data between go routines. Channels can be of any primitive type as well as custom types which is called element type of channel. Also, we will know about ReadOnly and WriteOnly channels.

- Use `<-` to write data to the channel (see line 22)
- Use `->` to read data from the channel (see line 8)
- Writing to ReadOnly channel and Reading from WriteOnly channel is a compilation error.

#### **Writing/Reading a channel**

Let us both reader and writer for a Channel which accepts dtaa type of Integer. Below, we are executing writeChannel method in 3 seperate go routines. We have placed it in loop of three counts. As soon as the data is written to the channel that is printed and after loop is finished the channel is closed. Observe that channel is declared globally and passes between different go routines with different data values to be written. The execution order of go routines is indetermenenstic and output might show different when run on your machine.

func main() {
	intChannel := make(chan int)
	go writeChannel(intChannel, 20)
	go writeChannel(intChannel, 10)
	go writeChannel(intChannel, 30)

	for i := 0; i < 3; i++ {
		channelData, ok := <-intChannel
		if ok {
			fmt.Println("Channel is open and reading")
			fmt.Println("Channel Data: ", channelData)
		}
	}

	close(intChannel)
	time.Sleep(time.Second \* 5)
	fmt.Println("Done")
}

func writeChannel(intChannel chan int, data int) {
	fmt.Println("Data to be written is :", data)
	intChannel <- data
	fmt.Println("Data Written")
}

Data to be written is : 30
Data Written
Channel is open and reading
Channel Data:  30
Data to be written is : 20
Data Written
Channel is open and reading
Channel Data:  20
Data to be written is : 10
Data Written
Channel is open and reading
Channel Data:  10
Done

#### **_It is mandatory to have a writer and reader on a channel_**

If only data is written and not read then channel will not proceed with the rest of the execution of function `writeChannel`.

func main() {
	intChannel := make(chan int)
	go writeChannel(intChannel, 10)
	go writeChannel(intChannel, 20)

	time.Sleep(time.Second \* 2)
	close(intChannel)
    fmt.Println("Done")
}

func writeChannel(intChannel chan int, data int) {
	fmt.Println("Data to be written is :", data)
	intChannel <- data
	fmt.Println("Data Written")
}

Data to be written is : 20
Data to be written is : 10
Done

As you can see from the output the `line 15` was never called for both go routines. Reason being there is no reader for the channel. So channel will block the execution of the rest of the function. As both are go routines the main program will not wait for the completion of `writeChannel` method.  

#### **_Reading from a closed channel will return default value for the data type of channel_**.

if you write the channel that is already been closed will throw an panic exception. Let us modify the program to close the channel after it is written and observe the impact.

func readClosedChannel(){
	intChannel := make(chan int)
	go writeChannelWithClose(intChannel, 20)

	channelData, ok := <-intChannel
	if ok {
		fmt.Println("Channel is open and reading")
		fmt.Println("Channel Data: ", channelData)
	}

	go writeChannelWithClose(intChannel, 10)
	channelData, ok = <-intChannel
	fmt.Println("Channel Data: ", channelData)

	fmt.Println("Done")
}

func writeChannelWithClose(intChannel chan int, data int) {
	fmt.Println("Data to be written is :", data)
	intChannel <- data
	fmt.Println("Data Written")
	close(intChannel)
}

Data to be written is : 20
Data Written
Channel is open and reading
Channel Data:  20
Channel Data:  0
Done

Observing the output on line 5, this value was read after the inital channel was closed on first go routine call to `writeChannelWithClose` function. So, the default type of 0 was read from closed channel as the data type of the channel in integer.

#### **Channels as parameters to functions**

Though channels can be passed to functions as any other regular parameters, but there are few unique ways avaiable for channel type only. You can specify whether channel parameter can be used as ReadOnly or WriteOnly.  
**ReadOnly Channel parameter (chan<- ) see line 1  
WriteOnly Channel parameter (<-chan) see line 6**

func writeOnlyChannel(intChannel chan<- int, data int){
	fmt.Println("Writing to Write only Channel :", data)
	intChannel <- data
}

func readOnlyChannel(intChannel <-chan int) {
	fmt.Println("Reading from Read only Channel :", <-intChannel)
}

//TODO : Advanced Use Cases
