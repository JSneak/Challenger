var bracket = go.GraphObject.make;  // for conciseness in defining templates
    myDiagram =
      bracket(go.Diagram, "bracketDiv",  // create a Diagram for the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,  // center the content
          "textEditingTool.starting": go.TextEditingTool.SingleClick,
          "textEditingTool.textValidation": isValidScore,
          layout: bracket(go.TreeLayout, { angle: 180 }),
          "undoManager.isEnabled": true
        });
    // validation function for editing text
    function isValidScore(textblock, oldstr, newstr) {
      if (newstr === "") return true;
      var num = parseInt(newstr, 10);
      return !isNaN(num) && num >= 0 && num < 1000;
    }
    // define a simple Node template
    myDiagram.nodeTemplate =
      bracket(go.Node, "Auto",
        { selectable: false },
        bracket(go.Shape, "Rectangle",
          { fill: '#8C8C8C', stroke: null },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color")),
        bracket(go.Panel, "Table",
          bracket(go.RowColumnDefinition, { column: 0, separatorStroke: "black" }),
          bracket(go.RowColumnDefinition, { column: 1, separatorStroke: "black", background: "#BABABA" }),
          bracket(go.RowColumnDefinition, { row: 0, separatorStroke: "black" }),
          bracket(go.RowColumnDefinition, { row: 1, separatorStroke: "black" }),
          bracket(go.TextBlock, "",
            { row: 0,
              wrap: go.TextBlock.None, margin: 5, width: 90,
              isMultiline: false, textAlign: 'left',
              font: '10pt  Segoe UI,sans-serif', stroke: 'white' },
            new go.Binding("text", "player1").makeTwoWay()),
          bracket(go.TextBlock, "",
            { row: 1,
              wrap: go.TextBlock.None, margin: 5, width: 90,
              isMultiline: false, textAlign: 'left',
              font: '10pt  Segoe UI,sans-serif', stroke: 'white' },
            new go.Binding("text", "player2").makeTwoWay()),
          bracket(go.TextBlock, "",
            { column: 1, row: 0,
              wrap: go.TextBlock.None, margin: 2, width: 25,
              isMultiline: false, editable: true, textAlign: 'center',
              font: '10pt  Segoe UI,sans-serif', stroke: 'black' },
            new go.Binding("text", "score1").makeTwoWay()),
          bracket(go.TextBlock, "",
            { column: 1, row: 1,
              wrap: go.TextBlock.None, margin: 2, width: 25,
              isMultiline: false, editable: true, textAlign: 'center',
              font: '10pt  Segoe UI,sans-serif', stroke: 'black' },
            new go.Binding("text", "score2").makeTwoWay())
        )
      );
    // define the Link template
    myDiagram.linkTemplate =
      bracket(go.Link,
        { routing: go.Link.Orthogonal,
          selectable: false },
        bracket(go.Shape, { strokeWidth: 2, stroke: 'white' }));

    function makeModel(tree) {
      var model = new go.TreeModel(tree.nodeDataArray);
      checkWinner(model)
      myDiagram.model = model;
    }
    function updateModel(tournamentJSON) {
      Materialize.toast('Tournament has been updated', 1000)
      var model = new go.TreeModel(tournamentJSON);
      checkWinner(model)
      myDiagram.model = model;
    }

    function checkWinner(model)
    {
        if(isConnected == true){
          model.addChangedListener(function(e) {
          saveTournamentState();
          if(e.Tm == "score1" || e.Tm == "score2")
          {
            Materialize.toast('Tournament has been updated', 1000)
            if(e.object.parent == "-1-0")
            {
              if(e.object.score1 && e.object.score2 != undefined || "")
              {
                if(e.object.score1 > e.object.score2)
                {
                  addWinner(e.object.player1)
                }else{
                  addWinner(e.object.player2)
                }
                Materialize.toast('Tournament is Over!', 1000)
                finishTournament();
              }
            }
           }
          if (e.propertyName !== 'score1' && e.propertyName !== 'score2') return;
          var data = e.object;
          if (isNaN(data.score1) || isNaN(data.score2)) return;
          var parent = myDiagram.findNodeForKey(data.parent);
          if (parent === null) return;
          var playerName = parseInt(data.score1) > parseInt(data.score2) ? data.player1 : data.player2;
          if (parseInt(data.score1) === parseInt(data.score2)) playerName = "";
          myDiagram.model.setDataProperty(parent.data, (data.parentNumber === 0 ? "player1" : "player2"), playerName);
          });
        }else{
          Materialize.toast('No Internet Connection', 1000)
          homePage()
          isTourOver = "";
        }
    }
// BINARY TREE CODE
var Node = function(name) {
    this.name = name;
    this.left = null;
    this.right = null;
    this.col = null;
    this.row = null;
    this.pv = null;
};

var numPlayer;
var dataT = {
    "class": "go.TreeModel",
    "nodeDataArray": [
    ]
}

var createArrayWithEmptyAndNodes = function(list) {
    numPlayer = list.length;//Length of people
    var exponent = -1;//Exponent
    var m = (2 * (numPlayer - Math.pow(2, exponent))) - numPlayer; // # of nodes
    var nodeList = [];
    for(var x = m; x > 0; x--) {
        nodeList.push(new Node(""))
    }

    for(var c = 0;c<numPlayer;c++) {
        nodeList.push(new Node(list[c]))
    }
    makeTree(nodeList)
}

var makeTree = function(list) {
    var maxCol;
    var newBinaryTree = []
    for(var i = 0; i < list.length - numPlayer; i++) {
        var currentNode = list[i];
        currentNode.left = list[2 * i + 1].name;
        currentNode.right = list[2 * i + 2].name;
        newBinaryTree.push(currentNode)
    }
    list.length = 0;

    for(var i = 0; i <newBinaryTree.length;i++)
    {
        newBinaryTree[i].col = Math.floor(Math.log2(i+1));
        maxCol = Math.floor(Math.log2(i+1));
    }
    var currentCol = 0;
    while(currentCol <= maxCol)
    {
        var parentValue = 0;
        var pairCounter = 0;
        var parentRow = 0;
        for(var i = 0;i < newBinaryTree.length;i++)
        {
            if(newBinaryTree[i].col == currentCol)
            {
                newBinaryTree[i].row = parentRow;
                parentRow = parentRow + 1;
                if(pairCounter === 0 || pairCounter === 1)
                {
                    newBinaryTree[i].pv = parentValue;
                    pairCounter = pairCounter + 1;
                }
                else
                {
                    pairCounter = 1;
                    parentValue = parentValue + 1;
                    newBinaryTree[i].pv = parentValue;
                }
            }
        }
        currentCol = currentCol + 1
    }
    prepareJSONForGoJS(newBinaryTree)
}

function prepareJSONForGoJS(list){
    var x = 0;
    for(var i = 0;i<list.length;i++)
    {
        var goJsFormat = {
          "key": list[i].col + "-" + list[i].row,
          "parent": (list[i].col - 1) + "-" + list[i].pv,
          "parentNumber": x,
          "player1": null,
          "player2": null
        };
        if(list[i].left == "")
        {
          goJsFormat.player1 = list[i].right;
          goJsFormat.player2 = list[i].left;
        }else{
          goJsFormat.player1 = list[i].left,
          goJsFormat.player2 = list[i].right
        }

        dataT.nodeDataArray.push(goJsFormat)
        if(x == 0){
            x = 1;
        }else{
            x = 0;
        }
    }
    makeModel(dataT)
    dataT = {
      "class": "go.TreeModel",
      "nodeDataArray": [
      ]
    }
}
