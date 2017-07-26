function viewWin(){
    $(".button-collapse").sideNav('hide');
    $("#homeButton").attr("class", "")
    $("#homeButtonNav").attr("class", "")
    $("#winnerButton").attr("class","active")
    $("#winnerButtonNav").attr("class","active")
    screenState = "winner";
    transition(screenState);
}
function addWinnerNameToHtml(teamName,winningTeamName, date) {
    var str ='<tr><td>' + teamName + '</td><td>' + winningTeamName + '</td><td>' + date + '</td></tr>';
    $("#winnerRow").append(str);
}
