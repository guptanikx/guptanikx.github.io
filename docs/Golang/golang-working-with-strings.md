---
title: "Golang Working with Strings"
date: "2021-03-03"
categories: 
  - "golang"
  - "languages"
---

Golang default to UTF-8 characters in strings  
It is readonly slice of bytes. String indexing is reperesented as

![](/assets/images/go-string-index.png)

String Indexing

Below are the widely used Escape characters allowed in string literals

<table><tbody><tr><td>Escape Character</td><td>Details</td></tr><tr><td>\\</td><td>Backlash \</td></tr><tr><td>\a</td><td>ASCII</td></tr><tr><td>\b \r \n \t</td><td>ASCII backspace, Carrige feed, Line feed, Tab</td></tr><tr><td>\000</td><td>Represents Unicode character with octal code</td></tr><tr><td>\xhh</td><td>Unicode 8 bit hex code point</td></tr></tbody></table>

When Unicode characters are present in String literal the length of the string is calculated as number of unicode character bytes and not each character.  
**_Example_**  
The below literal has string length as 7 and not 28 (if we count each invididual character in regular scenario). We can access each unicode character as index. Each Unicode code point inside a string is called **_Rune_**

const sLiteral = "\\x99\\x42\\x32\\x55\\x50\\x35\\x23"
fmt.Println("String length: ", len(sLiteral))
for i := 0; i < len(sLiteral); i++ {
  fmt.Println("Char at Index: ", i," is :",sLiteral\[i\])
}

String length:  7
Char at Index:  0  is : 153
Char at Index:  1  is : 66
Char at Index:  2  is : 50
Char at Index:  3  is : 85
Char at Index:  4  is : 80
Char at Index:  5  is : 53
Char at Index:  6  is : 35

#### **String with Unicode Characters**

We can use \\U+ format for Unicode characters as below. using `**%x**` prints bytes for each character which range for 4 to 8 bytes if character is unicode. if we print length of this string it will be based on bytes of each unicode character. It comes out to be length 9 (3 bytes per unicode character)

const sUniCode = "\\u2318\\u2317\\u1319"
// Print Unicode Bytes
fmt.Printf("% x \\n", sUniCode)
fmt.Println("Length: ", len(sUniCode))

e2 8c 98 e2 8c 97 e1 8c 99 
Length:  9

#### **Runes**

When a string contains unicode characters or Non-ASCII chars, go lang divides string internally into runes. Each rune consists of sinle unicode codepoint and all these runes collectively creates string. Repeating above example each **_\\u2318_** is rune.  
We can identify runes using Unicode package in go. In below example we are identifying which are valid unicode chars or runes in a string

const sLiteral = "\\x99\\x42\\x32\\x55\\x50\\x35\\x23"
for i := 0; i < len(sLiteral); i++ {
  if unicode.IsPrint(rune(sLiteral\[i\])) {
    fmt.Printf("%c \\n", sLiteral\[i\])
  } else{
    fmt.Println("Not a unicode char: ", sLiteral\[i\])
  }
}

Not a unicode char:  153
B 
2 
U 
P 
5
#

## References

- [Golang Strings](https://blog.golang.org/strings)
