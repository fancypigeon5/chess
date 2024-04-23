# Tests

## General Tests 

### Header

| Test | Expected result | Pass |
|:---|:---|:---:|
| How does the navigation look on smaller screens | The navigation should be displayed as a hamburger icon that when clicked expands into a menu with the different navigation items. | :heavy_check_mark: |
| Clicking on reset. | The board should return to the initial setup and the times should be reset to the normal times. | :heavy_check_mark: |
| Clicking on settings. | The settings overlay should appear. | :heavy_check_mark: |

### Settings

| Test | Expected result | Pass |
|:---|:---|:---:|
| Clicking the start game button when the players names are filled in. | they should replace the placeholders in the player info sections. | :heavy_check_mark: |
| Clicking the start game button when the value of the time is changed. | The time in the player info section should start from the new chosen time. | :heavy_check_mark: |
| Clicking the start game button when an increment is chosen. | players should recieve that much extra seconds after every move. | :heavy_check_mark: |
| Clicking the start game button when the flip board is turned on. | The board should flip after each turn so that the pwans of the player whose turn it is move to the top. | :heavy_check_mark: |

### Player info 

| Test | Expected result | Pass |
|:---|:---|:---:|
| On larger devices such as laptop or desktop. | The player info sections should display next to the main board area. | :heavy_check_mark: |
| On smaller devices. | The player info section should display below the main board. | :heavy_check_mark: |

## Game tests

### Gameplay

| Test | Expected result | Pass |
|:---|:---|:---:|
| Clicking a piece of the player whose turn it is. | The square of the piece should highlight in yellow and all its legal moves should highlight in green. | :heavy_check_mark: |
| Clicking a green highlighted square. | The chosen piece should move to the clicked square. | :heavy_check_mark: |
| Clicking a green highlighted square with an opponents piece. | The opponents piece is captured and should be removed from the board | :heavy_check_mark: |
| After each move. | That players timer should stop and the opponents timer should start. | :heavy_check_mark: |
| Whenever a pawn reaches the other side. | The promotion overlay should appear. | :heavy_check_mark: |
| Clicking a piece on the promotion overlay. | The pawn should turn into that piece. | :heavy_check_mark: |

### Checks and winning the game

| Test | Expected result | Pass |
|:---|:---|:---:|
| The king can be captured on the opponents next move. | The king should be highlighted in red and only moves that prevent its capure are allowed. | :heavy_check_mark: |
| The king can be captured on the opponents next move and there is no way to prevent its capture. | the checkmate overlay should appear. | :heavy_check_mark: |
| A players timer reaches 0. | The out of time overlay should appear. | :heavy_check_mark: |

### Draws

| Test | Expected result | Pass |
|:---|:---|:---:|
| The same position is reached 3 times this game. | The 3 time repetition overlay should appear. | :heavy_check_mark: |
| There have been 50 full moves without any captures. | The 50 move rule overlay should appear. | :heavy_check_mark: |
| On a players turn, they have no legal moves left but are not currently in check. | The stalemate overlay should appear. | :heavy_check_mark: |
