# Challenger :trophy:

2017 CDK Global Summer Internship Program Project

**Table of Contents**

- [Live Updating and Realtime Database](#live-updating-and-realtime-database)
- [Bracket Generation](#bracket-generation)
  - [Balanced Binary Search Trees](#balanced-binary-search-trees)
  - [Applying Balanced Binary Search Trees](#applying-balanced-binary-search-trees)

Features

- Create a bracket with any number of people
- Create and Join Tournaments
- View interactive bracketsthat will auto update
- Live updating

View it live [here](https://ping-pong-scheduler.firebaseapp.com/)!

***

### Live Updating and Realtime Database

My project utilizes [Firebase Realtime Database](https://firebase.google.com/) to store and display tournament information. For example, the live updating is done with the **child_added** listener.

```javascript
    updatePlayersRef = database.ref(details_firebase_route+tournament_firebase_route + key +"/"+players_firebase_route);
    updatePlayersRef.on('child_added', function(snapshot) {
      updateList(snapshot.val().name);
    });
```
The initial loading of the data is done with **.once**, which will only retrieve the data from the specified child once.
```javascript
loadQuery.once('value', function(snapshot){

});
```
Firebase is a great tool for small projects and creating quick proof of concepts. However, it does not scale well and the pricing model is a bit on the high end.

You can read a 5-10 minute tutorial on Firebase [here](https://github.com/JSneak/firebase-tutorial)!

### Bracket Generation

The problem with other online bracket generation solutions is that they **fail to account for non powers of 2**. Along with the fact that [Go.js](https://gojs.net/latest/index.html), a data visualization library, does not solve this issue, I was required to come up with my own solution.

Thankfully, I found the solution in **Balanced Binary Trees**.

#### Balanced Binary Search Trees

A binary tree is a group of nodes that each have a left and right property to them. With one node acting as a root node, aka the starting node, a node is programmaticaly set as either the left or right property of the current node. If both left and right are occupied, it moves to the next node with no values in either left or right.

```javascript
var Node = function(name) {
    this.name = name;
    this.left = null;
    this.right = null;
};
```

![alt tag](BinaryTree.png)

A tree is considered balanced when the nodes in the bottom rows are within 1 row of each other.

#### Applying Balanced Binary Search Trees
 
 The reason a BST solves our problem is that it ensures no player has more than 1 by in the actual bracket. It prevents that issue by creating a new row, in which players compete to fill a spot in a higher row. 
 
 You can see a standalone interactive demo [here](http://seankim.tech/tournament/demo.html)
