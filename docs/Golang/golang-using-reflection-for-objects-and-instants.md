---
title: "Golang Using Reflection for Objects and Instants"
date: "2021-03-04"
categories: 
  - "golang"
tags: 
  - "golang"
  - "reflection"
---

Like other languages it is also possible for reverse engineer code or reflection in golang. Package `reflect` is used for this.  
Method `reflect.ValueOf` returns Value structure which defines many methods on Getting, Setting etc. on the target type and object

![Go](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.draveness.me%2Fgolang-bidirectional-reflection.png&f=1&nofb=1)

package main

import (
	"fmt"
	"reflect"
)

func main() {
	x := "test"
  	y := "test2"
  
	// Type of instant
	reflType := reflect.TypeOf(x)
	// Value of instant
	reflValue := reflect.ValueOf(x)
	reflAddValue := reflect.ValueOf(&x).Elem()
	fmt.Println(reflType)
	fmt.Println(reflValue)
	fmt.Println(reflAddValue)
  
  	// Compare Two Types
	fmt.Println(reflect.TypeOf(x) == reflect.TypeOf(y))
}

string
test
test
true

//TODO : add more use cases
