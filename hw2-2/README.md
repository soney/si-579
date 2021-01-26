# Assignment2-2: Basic JavaScript
This assignment practices your ability to use the basic syntax of JavaScript. 
There are 5 coding exercises. 
Please fill in the blanks under `<script>` in `./template/index.html` and submit the HTML file to Canvas.

## Exercise 1: Fibonacci Sequence

A Fibonacci sequence is the integer sequence of 0, 1, 1, 2, 3, 5, 8...
Wrote a function that will print out the n-th element in the Fibonacci sequence.

```
// Exercise 1
// Step 1. Define the Function


// Step 2. Evaluate the Output
console.log(`Q1 - the 5th number is `) // expect output: Q1 - the 5th number is 3
console.log(`Q1 - the 7th number is `) // expect output: Q1 - the 7th number is 8
```

## Exercise 2: Farm Market

Suppose the farm has the following types of fruits. Find a proper way to represent the data in JavaScript. Sort the fruit names by the number and total price (from the greatest to the least), separate by `, `.

| Fruit Name | Number | Unit Price |
| ---------- | ------ | ---------- |
| Apple      | 12     | 3          |
| Orange     | 16     | 5          |
| Grape      | 5      | 8          |

```
// Exercise 2
// Step 1. Represent the Data


// Step 2. Sort the Name
console.log(`Q2 - sort by number:`) // expect output: Q2 - sort by number: Orange, Apple, Grape
console.log(`Q2 - sort by total price:`) // expect output: Q2 - sort by total price: Orange, Grape, Apple
```

## Exercise 3: Roster
Find a proper way to represent the data in JavaScript. Write a function to search for UM handle through the one's initials (the first letter of the name). The search should not be case sensitive.

| First Name | Last Name | UM Handle |
| ---------- | --------- | --------- |
| April      | Wang      | @aprilww  |
| Shiyu      | Xu        | @shiyuxu  |
| Steve      | Oney      | @soney    |

```
// Exercise 3
// Step 1. Represent the Data

// Step 2. Search through Initials
console.log(`Q3 - the UM handle for aw is`) // expect output: Q3 - the UM handle for aw is @aprilww
console.log(`Q3 - the UM handle for SX is`) // expect output: Q3 - the UM handle for SX is @shiyuxu
```

## Exercise 4: Lottery
Wrote a function that takes an array as an input and returns a random element in the array.
```
// Exercise 4
// Step 1. Define the Function 'getLottery'

// Step 2. Evaluate
// console.log(`Q4 - random fruit ${getLottery(['Apple', 'Peach', 'Banana'])}`)
// console.log(`Q4 - random number ${getLottery([1, 2, 3, 4, 5, 6, 7])}`) 
```

## Exercise 5: Stopwatch
Create a stopwatch object with three basic methods, `start`, `stop`, and `reset`. The `start` method will start the timer from the current time. The `stop` method will pause the timer and print out the current time past in the console. The `reset` method will reset the timer to 0.

```
// Exercise 5
// Step 1. Define the Stopwatch Object
// let stopwatch = ...

// Step 2. Evaluate

// stopwatch.start()
//
// setTimeout(function(){
//    stopwatch.stop()
// }, 3000)
```