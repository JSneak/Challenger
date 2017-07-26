# Ping Pong Tournament Website


## Table of Contents
1. [Firebase](#firebase)
2. [Creating a tournament](#)

# Firebase

1. Login to Gmail
    ```
    Username: comicsanscdk@gmail.com
	Password: CDK Global
    ```
2. Go to your Firebase console
3. Add a new project
4. Copy **Add Firebase to your web app** code into your program
5. Go to the database tab
6. Go to the rules tab
7. Set the rules to 
    ```javascript
    {
      "rules": {
        ".read": true ,
        ".write": true
      }
    }
    ```

#Tournament Homepage: http://api-int.dit.connectcdk.com/api/dm-ping-pong-scheduler/v1/tournament/bracket.html

##Table of Contents:
1. Hoffman Ping Pong Homepage
2. Join Tournament Screen
3. View In Progress Screen

The tournament homepage allows for the user to generate a tournament and find out when different tournaments are in progress. By clicking the join button in the Open Tournaments column the user can view and add people to the tournaments. In addition the user can view a countdown timer. This timer indicates when the tournament will begin. By clicking the view button in the In Progress Tournaments column the user can view the tournament bracket.


#iPad Timer Status:http://api-int.dit.connectcdk.com/api/dm-ping-pong-scheduler/v1/tableTimer.html

##Table of Contents:
1. Game Selection Page
2. Timer Page

This application allows users to select the number of games they wish to play on the Game Selection page. Selecting 1 game sets a timer for 10 minutes, while selecting 2 games sets a timer for 20 minutes and selecting 3 games sets a timer for an additional 10 minutes. 2 minutes before the game ends, there will be a warning sound that will remind players that their game is about to end. The purpose of the timer is to resolve the long waits at the ping pong station. On the Timer page, players also have the option to end the game early if they wish to do so.  


#Table Status: http://api-int.dit.connectcdk.com/api/dm-ping-pong-scheduler/v1/tablestatus.html

This webpage is to be used at your desk. It will inform you whether the table is open or what time the table will be open depending on the number of games players at the ping pong table have chosen on the iPad. 

