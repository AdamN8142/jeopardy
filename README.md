# Jeopardy

[Play here!](https://dfordeveloper.github.io/jeopardy/)

### The goal of this project was to recreate the hit game show, Jeopardy! It is designed for three players and features two full rounds and Final Jeopardy.

![screenshot of home screen](images/HomeScreen.png)
![screenshot of main screen](images/MainScreen.png)

## Installation Instructions
`git clone git@github.com:dForDeveloper/jeopardy.git`
`npm install`

## Gameplay

### There two rounds that contain four categories, and each category has four questions. The first round has one Daily Double and the second adds another. On a player's turn, they select a question and if they answer correctly, they will have another turn. If they answer incorrectly, their score will decrease by the question's point value and the next player's turn will start. If a player lands on a Daily Double, they have the opportunity to place a wager. The Daily Double's point value is equal to the wager. Once both rounds have ended, the game will move to Final Jeopardy. Only players with a positive score will be allowed to place a wager for Final Jeopardy. After all wagers have been placed, the final question will be revealed. The players' scores will be evaluated after answering the question, and the player with the highest score will be crowned the victor! 

## Development Process

### Creating this project was our first attempt using Object Oriented Programming and Test Driven Development. We used Mocha as our testing framework and Chai as our assertion library. We have 100% test coverage of our classes and methods. 

## Contributors 
* Jeo D
* Adam Niedzwiecki
