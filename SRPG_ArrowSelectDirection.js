//=============================================================================
//SRPG_ArrowSelectDirection.js
//=============================================================================
/*:
 * @plugindesc Adds the ability for players to choose a direction of an actor after an action
 * @author dopan (PluginOriginal "SRPG_DirectionSelection.js" by Boomy) 
 * 
 * 
 * @param E Not Visible
 * @desc Enable/Disable if Actor's "TurnEnd E img" is only visible after arrowUse is done. (Actors TurnEnd is added anyway)
 * @type boolean
 * @default true
 * 
 * 
 * @param Touch Mouse Usage
 * @desc Enable/Disable Touch Mouse Usage when choosing their direction after an action (Disable = only Keyboard/gamepad)
 * @type boolean
 * @default true
 * 
 * @param After Battle Character Image
 * @desc If set to -1, do not change Cursor at actor turn End. If using after battle direction selection. Exclude .png suffix
 * @default -1
 * 
 * @param After Battle Lunatic Code 
 * @desc Run code during the direction selection phase; will only run during actor phase 
 * @default 
 * 
 * @param SRPG Image
 * @desc Name of character image of SRPG Set (Cursor image). Exclude .png suffix
 * @default srpg_set
 *
 * @param Disable Switch
 * @desc Switch that is used to disable direction selection. If set to "None" , then this script is always active
 * @type switch
 *
 * @help
 * This plugin is plug and play. Works best with a character image that indicates which direction a unit will be facing
 * Best used with the SRPG_DirectionMod.js plugin which gives bonuses depending on unit direction
 *
 * Place BELOW/UNDER following plugins for compatability:
 * - srpg_core.js  (REQUIRED for all srpg plugins)
 * - SRPG_AoE.js (optional)
 * - SRPG_PositionEffects.js (optional)
 * - SRPG_DirectionMod.js (optional)
 * - SRPG_Prediction.js (optional)
 * - SRPG_MoveAfterAction.js (optional)
 * - THIS PLUGIN (somewhere below these others)
 * - SRPG_ForceAction (optional & always somewhere below most other srpg plugins)
 *
 * Lunatic code is run only during actor phase .(right before direction selection)  
 * Its main role is to display a message to the player to select a direction
 * No example is included as it would require an external plugin to look good 
 *(such as YEP Message Core Extension 2)
 * Change Log
 * 8/11/20 - First Release
 * 5/8/21 - Update to enable compatability with Shoukang's MoveAfterAction
 * 2/11/22 - dopan edited Version into "srpgArrowSelectDirection" (bugfixed and code changed)
 */
(function () {
    var substrBegin = document.currentScript.src.lastIndexOf('/');
    var substrEnd = document.currentScript.src.indexOf('.js');
    var scriptName = document.currentScript.src.substring(substrBegin + 1, substrEnd);
    var parameters = PluginManager.parameters(scriptName);
    var _touchMouse = parameters['Touch Mouse Usage'] || 'true' || 'false';
    var _eNotVisible = parameters['E Not Visible'] || 'true' || 'false';
    var _directionSelectionLunaticCode = parameters['After Battle Lunatic Code'];
    var _directionSelectionCharacterName = parameters['After Battle Character Image'];
    var _disableSwitch = parameters['Disable Switch'] || 'true' || 'false';
    var _srpgSet = parameters['SRPG Image'];
    var _waitUser = false;
    var _forceAction = false;
    var _mousehover = 'false';
    var _cursorPriority = 1;


//-----------------------------------------------------------------------------------------------

    // Map update
    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _SRPG_SceneMap_update.call(this);
        //Process Direction Selection
        if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'arrow_direction_selection') {
            // if arrowUser alive => trigger arrow usage
            if ($gameSystem._arrowUser && !$gameSystem._arrowUser[1].isDead()) this.srpgArrowDirectionSelection();
            // if arrowUser dead => reset data
            if ($gameSystem._arrowUser && $gameSystem._arrowUser[1].isDead()) {
                $gameSystem._arrowUser[1]._arrowUse = "false";$gameSystem._arrowUser = undefined;
            }
        return;
        }
    };

    // overwright srpg_core function to turn off turn end img visiblety
    Sprite_Character.prototype.isTurnEndUnit = function() {
        if (this._character.isEvent() == true) {
            var battlerArray = $gameSystem.EventToUnit(this._character.eventId());
            if (battlerArray) {
                if (battlerArray[0] === 'actor' || battlerArray[0] === 'enemy') {
                    if (battlerArray[1]._arrowUse === "true" && _eNotVisible === 'true') return false;// added
                    return battlerArray[1].srpgTurnEnd();
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    // clean up at global srpg Turn End ( when all units have ended their turns
    var _srpgGMSYSTurnEnd = Game_System.prototype.srpgTurnEnd;
       Game_System.prototype.srpgTurnEnd = function() {
       _srpgGMSYSTurnEnd.call(this);
       $gameTemp.clearASD();
    return;
    };

    // no pausing during $gameSystem.isSubBattlePhase() === 'arrow_direction_selection')
    var _updateCallMenu_MB = Scene_Map.prototype.updateCallMenu;
    Scene_Map.prototype.updateCallMenu = function () {
        if ($gameSystem.isSRPGMode() && ($gameSystem.isSubBattlePhase() === 'invoke_action' || $gameSystem.isSubBattlePhase() === 'arrow_direction_selection')) {
            this.menuCalling = false;
            return;
        }
        _updateCallMenu_MB.call(this);
    };

    // get prediction user to know the first action trigger user (works only on actors without autobattle)
    var _SRPG_SrpgPredictionWindow = Window_SrpgPrediction.prototype.drawContents;
    Window_SrpgPrediction.prototype.drawContents = function() {
          _SRPG_SrpgPredictionWindow.call(this);
          $gameSystem._predictionUser = this._actionArray;
    };

    // no moving during $gameSystem.isSubBattlePhase() === 'arrow_direction_selection')
    var _Game_Player_MB_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function () {
        if ($gameSystem.isSRPGMode() && ($gameSystem.isSubBattlePhase() === 'invoke_action' || $gameSystem.isSubBattlePhase() === 'arrow_direction_selection')) { 
            return false;
        }
        return _Game_Player_MB_canMove.call(this);
    };

    // add data to game actor
    var _SRPG_GameActor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _SRPG_GameActor_initMembers.call(this);
        this._arrowUse = "false";
    };

    // after action scene -> trigger for "$gameSystem.setSubBattlePhase('arrow_direction_selection')"
    var _SRPG_SceneMap_after = Scene_Map.prototype.srpgAfterAction;
    Scene_Map.prototype.srpgAfterAction = function() {
         var userEvId = $gameTemp.activeEvent().eventId();
         var actUser = $gameSystem.EventToUnit(userEvId);
         _SRPG_SceneMap_after.call(this);
         if (actUser[1].isActor() && !actUser[1].isAutoBattle() && _disableSwitch !== 'true' && !$gameSystem.srpgForceAction()) {
             if ($gameSystem._predictionUser !== undefined) var user = $gameSystem._predictionUser;
          // if wait command usage
             if (_waitUser === true) {
               $gameSystem._arrowUser = actUser; _waitUser = false;
               $gameSystem.setSubBattlePhase('arrow_direction_selection');
             return;
             };
          // if thats NOT wait command usage & prediction user .. means gamer controlled UnitSkill usage
             if (user) { // thats prediction user
             // if forceAction Plugin NoteTag usage right now
                if (user[1]._arrowUse === "false" && actUser[1] !== user[1] && _forceAction === true) user[1]._arrowUse = "true"; _forceAction = false;
                if (user[1].isDead()) user[1]._arrowUse === "false";
                if (user[1].isActor() && user[1]._arrowUse === "true" && user[1].srpgTurnEnd() === true) { 
                    $gameSystem._arrowUser = user;
                    eval(_directionSelectionLunaticCode);
                    $gameSystem.setSubBattlePhase('arrow_direction_selection');
                return;
                };
             // if combo skill triggered by prediction user.. so that active user is not prediction user
                if (actUser[1].isDead()) actUser[1]._arrowUse === "false";
                if (actUser[1].isActor() && actUser[1]._arrowUse === "true" && user[1].srpgTurnEnd() === true) { 
                    $gameSystem._arrowUser = actUser;
                    eval(_directionSelectionLunaticCode);
                    $gameSystem.setSubBattlePhase('arrow_direction_selection');
                return;
                };
             };
         };
    };

  // pre action scene	
  var _srpgPreAction = Scene_Map.prototype.eventBeforeBattle;
  Scene_Map.prototype.eventBeforeBattle = function() {
       var userEvId = $gameTemp.activeEvent().eventId();
       var actUser = $gameSystem.EventToUnit(userEvId);
       _srpgPreAction.call(this);
       if (actUser[1].isActor() && !actUser[1].isAutoBattle() && _disableSwitch !== 'true') {
        //if prediction user
          if ($gameSystem._predictionUser !== undefined) {
              var user = $gameSystem._predictionUser;
              if (user[1].isActor() && user[1]._arrowUse === "false" && user[1].currentAction()) user[1]._arrowUse = "true";
              if (user[1].isActor() && user[1].currentAction()) {
                  if (($gameTemp._areaTargets !== undefined) && ($gameTemp.areaTargets().length > 0)) user[1]._arrowUse = "false";
                  if (user[1].currentAction().item().meta.srpgForceAction) user[1]._arrowUse = "false"; _forceAction = true;
              };
          };
       };
  };

   var _srpgcommandWait = Scene_Map.prototype.commandWait;
  Scene_Map.prototype.commandWait = function() {
       var userEvId = $gameTemp.activeEvent().eventId();
       var actUser = $gameSystem.EventToUnit(userEvId);
       if ($gameSystem.isSRPGMode() && actUser[1].isActor() && !actUser[1].isAutoBattle() && _disableSwitch !== 'true') {
           var actor = actUser[1];
        // if not "Shoukang MoveAfterAction-usage" on this actor
           if (actor.canMoveAfterAction == undefined || !actor.canMoveAfterAction()) {
            // if Final command wait usage trigger direction selection
               if (actor && actor._arrowUse === "false") actor._arrowUse = "true"; _waitUser = true;
           };
        // "Shoukang MoveAfterAction-plugin compatability"
        // if actor can still move, ignore direction selection
           if (actor.canMoveAfterAction !== undefined) {
               var flag = $gameMap.eventsXy($gameTemp.activeEvent().posX(), $gameTemp.activeEvent().posY()).some(function(event) {
                   if (event.isType() === 'unitEvent' && event.pageIndex() >= 0) return true;
                   });
               if (!flag || actor.isSrpgAfterActionMove()){
                   // trigger arrowDirection
                   if (actor && actor._arrowUse === "false") actor._arrowUse = "true"; _waitUser = true;
               }    
           }; 
       };
  _srpgcommandWait.call(this);
  };

  Scene_Map.prototype.srpgArrowDirectionSelection = function () {
       var unit = $gameSystem._arrowUser;
       var userEvent = unit[1].event();
      // handle srpgCursor aka $gamePlayer
       if (_directionSelectionCharacterName !== "-1") {
          $gamePlayer._priorityType = 3;
          $gamePlayer._characterName = _directionSelectionCharacterName;
          $gamePlayer.setPosition(userEvent.x, userEvent.y);
       };
       $gamePlayer._direction = userEvent._direction;
       $gameTemp.clearMoveTable();
       $gameSystem.clearSrpgActorCommandWindowNeedRefresh(); //Remove command window
       $gameSystem.clearSrpgActorCommandStatusWindowNeedRefresh(); //Remove quick status window 
      // Set direction of unit based on position of mouse 
       if (TouchInput.isMouseMoving()) {
          if ((Math.abs(userEvent.screenX() - TouchInput._mouseOverX) < 24 && Math.abs(userEvent.screenY() - 24 - TouchInput._mouseOverY) < 24) == false) {
             if (Math.abs(userEvent.screenX() - TouchInput._mouseOverX) >= Math.abs(userEvent.screenY() - 24 - TouchInput._mouseOverY)) {
                 if (userEvent.screenX() - TouchInput._mouseOverX > 0) {
                    userEvent._direction = 4;
                 } else {
                    userEvent._direction = 6;
                 }
             } else {
                if (userEvent.screenY() - TouchInput._mouseOverY > 0) {
                   userEvent._direction = 8;
                } else {
                   userEvent._direction = 2;
                }
             }
          }
      // handle keyboard/gamepad input
       } else if (Input.dir4 >= 2 && Input.dir4 <= 8) { userEvent._direction = Input.dir4 };
      //Confirm direction upon ok 
       if (Input.isTriggered('ok')) {
           if (_directionSelectionCharacterName !== "-1") $gamePlayer._characterName = _srpgSet;$gamePlayer._priorityType = _cursorPriority;
      // clean up & get next actor or next phase    
           unit[1]._arrowUse = "false";$gameSystem._predictionUser = undefined;
           $gameSystem._arrowUser = undefined;_mousehover = 'false';

           if (this.isSrpgActorTurnEnd()) {
              $gameSystem.setSubBattlePhase('normal');
           } else {$gameSystem.srpgStartAutoActorTurn()};
       }
      // Confirm direction when user released touch/mouse 
       if (TouchInput.isTriggered() && (_touchMouse === 'true') && ((Math.abs(userEvent.screenX() - TouchInput._mouseOverX) < 24 && Math.abs(userEvent.screenY() - 24 - TouchInput._mouseOverY) < 24) == false)) {
          if (Math.abs(userEvent.screenX() - TouchInput._mouseOverX) >= Math.abs(userEvent.screenY() - 24 - TouchInput._mouseOverY)) {
             if (userEvent.screenX() - TouchInput._mouseOverX > 0) {
                userEvent._direction = 4;
             } else {
                userEvent._direction = 6;
             }
          } else {
             if (userEvent.screenY() - TouchInput._mouseOverY > 0) {
                userEvent._direction = 8;
             } else {
                userEvent._direction = 2;
             }
          }
          if (_directionSelectionCharacterName !== "-1") {
             $gamePlayer._characterName = _srpgSet;$gamePlayer._priorityType = _cursorPriority;   
          }
      // clean up & get next actor or next phase 
          unit[1]._arrowUse = "false";$gameSystem._predictionUser = undefined;
          $gameSystem._arrowUser = undefined;_mousehover = 'false';

          if (this.isSrpgActorTurnEnd()) {
             $gameSystem.setSubBattlePhase('normal');
          } else {$gameSystem.srpgStartAutoActorTurn()};
       }
  };

//-----------------------------------------------------------------------------------------------
    /**
     * The static class that handles input data from the mouse and touchscreen.
     *
     * @class TouchInput
     */
    TouchInput.isMouseMoving = function () {
        if (_touchMouse == 'false') {return false}; 
        if (_touchMouse == 'true') _mousehover = 'true';
        TouchInput._mouseOverX = this._x;
        TouchInput._mouseOverY = this._y;
        if ($gameTemp._mouseOverX) {
            if ($gameTemp._mouseOverY) {
                if (!($gameTemp._mouseOverX == TouchInput._mouseOverX && $gameTemp._mouseOverY == TouchInput._mouseOverY)) {
                    $gameTemp._mouseOverX = TouchInput._mouseOverX;
                    $gameTemp._mouseOverY = TouchInput._mouseOverY;
                    return true;
                } else {
                    return false;
                }
            }
        }
        $gameTemp._mouseOverX = TouchInput._mouseOverX;
        $gameTemp._mouseOverY = TouchInput._mouseOverY;
    };

    TouchInput._onMouseMove = function(event) {
         if (this._mousePressed ||  _mousehover === 'true') {
             var x = Graphics.pageToCanvasX(event.pageX);
             var y = Graphics.pageToCanvasY(event.pageY);
             this._onMove(x, y);
         }
    };

     var _sceneMenu_commandTurnEnd = Scene_Menu.prototype.commandTurnEnd;
    Scene_Menu.prototype.commandTurnEnd = function() {
         if ($gameSystem.isSRPGMode()) $gameTemp.clearASD();
    _sceneMenu_commandTurnEnd.call(this);
    };

     var _sceneMenu_commandAutoBattle = Scene_Menu.prototype.commandAutoBattle;
    Scene_Menu.prototype.commandAutoBattle = function() {
         if ($gameSystem.isSRPGMode()) $gameTemp.clearASD();
    _sceneMenu_commandAutoBattle.call(this);
    };

    Game_Temp.prototype.clearASD = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) { 
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);          
             if (battleunit && eventunit && (battleunit[0] === 'actor')) {
                 if (battleunit[1]._arrowUse && battleunit[1]._arrowUse === "true") { 
                     battleunit[1]._arrowUse = "false";
                 };
                 // srpg MobeAfterAction compatiblety
                 if (battleunit[1].SrpgRemainingMove()) {
                     battleunit[1]._srpgTurnEnd = true;
                     battleunit[1].setSrpgRemainingMove(0);
                     battleunit[1].setSrpgAfterActionMove(false);
                 };
             };
        };
    // reset stuff
    _mousehover = 'false';$gameSystem._predictionUser = undefined;$gameSystem._arrowUser = undefined;
    };

    // clean up before srpgbattle end is executed
    var _Game_System_endSRPG = Game_System.prototype.endSRPG;
    Game_System.prototype.endSRPG = function() {
        $gameTemp.clearASD();
        _Game_System_endSRPG.call(this);
    };


//--------------------------
//PluginEnd("thanks for reading") dopan.say = "have a nice Day"; 
})();
