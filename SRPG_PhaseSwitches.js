//=============================================================================
// SRPG_PhaseSwitches.js
//=============================================================================
/*:
 * @plugindesc v1.0 This Plugins uses fuctions from SRPG_Core Plugin and connects them to ScriptCalls.  Adds <SRPG_PhaseSwitches> (ScriptCalls) for more Control in SRPG 
 * @author dopan
 *
 *
 *
 * 
 *
 *
 * @help
 *  
 * after understanding what the Scriptcall "this.isSubPhaseNormal(SwitchID)" does, 
 * i was looking into the SRPG_Core,and decided to add Scriptcalls for any Subphase that i could find in SRPG_Core..
 *
 * When these Scriptcalls are used ,they will connect the Switch which ID is used to the "Subphase".
 * That way the Switch will be "ON" = "true" whenever the used Subphase is Active and the Switch will 
 * turn "Off" = "false" whenever the "Subphase" is NOT active.
 *
 * this can be very Helpfull if somme Functions can conflict if they work at the same time.
 * In  such Situations the SubPhase Switches can be used as trigger to enable or disable whatever is needed.
 *
 *
 *
 *
 * Plug an Play .. and of course ScritCalls required..
 *
 * 
 *
 *
 *
 *
 *
 * NEW Scriptcalls:
 *
 * 1. "this.isBattlePhaseEnemy(SwitchID);" // = Switch is "ON",when "EnemyPhase" happens (similar to "<type:enemyTurn>")
 *
 * 2. "this.isBattlePhaseAutoActor(SwitchID);" // = Switch is "ON",when "AutoActorPhase" happens
 *
 * 3. "this.isBattlePhaseActor(SwitchID);" // = Switch is "ON",when "ActorPhase" happens (similar to "<type:actorTurn>")
 *
 * 4. "this.isSubPhaseIni(SwitchID);" // = Switch is "ON",when "initialize" happens 
 *
 * 5. "this.isSubPhaseAfterBattle(SwitchID);"// = Switch is "ON", "After Battle" 
 *
 * 6. "this.isSubPhaseActorMove(SwitchID);"// = Switch is "ON",when "Actor is moving" (moverange)
 *
 * 7. "this.isSubPhaseActorTarget(SwitchID);"// = Switch is "ON",when "Actor Target" happens 
 *
 * 8. "this.isSubPhaseActorCommandWindow(SwitchID);"// = Switch is "ON",when "ActorCommandWindow" is active
 *
 * 9. "this.isSubPhaseAutoActorCommand(SwitchID);"// = Switch is "ON",when "AutoActorCommand" is active
 *
 * 10. "this.isSubPhaseAutoActorMove(SwitchID);"// = Switch is "ON",when "AutoActor is moving" (moverange)
 *
 * 11. "this.isSubPhaseStatusWindow(SwitchID);"// = Switch is "ON",when "StatusWindow" is active
 *
 * 12. "this.isSubPhaseBattleWindow(SwitchID);"// = Switch is "ON",when "BattleWindow" is active
 *
 * 13. "this.isSubPhaseEnemyCommand(SwitchID);"// = Switch is "ON",when "EnemyCommand" happens
 *
 * 14. "this.isSubPhaseEnemyMove(SwitchID);"// = Switch is "ON",when "Enemy is moving" (moverange)
 *
 * 15. "this.isSubPhaseEnemyAction(SwitchID);"// = Switch is "ON",when "Enemy is acting" 
 *
 * 16. "this.isSubPhaseWaitMoving(SwitchID);"// = Switch is "ON",when "Units\Events are Walking" 
 *
 *
 * old default : "this.isSubPhaseNormal(SwitchID);" 
 * // this Switch is "ON" in Actor Phase when no Action is made. 
 * (= no target; no Command window open; ect)
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 4.08.2020 for SRPG (rpg mv)!
 */
 
(function() {

  var parameters = PluginManager.parameters("PhaseSwitches") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_PhaseSwitches>'); });

// -->Code Storage:

//$gameSystem.isBattlePhase() === 'enemy_phase' //1
//$gameSystem.isBattlePhase() === 'auto_actor_phase' //2
//$gameSystem.isBattlePhase() === 'actor_phase' //3
//$gameSystem.isSubBattlePhase() === 'initialize' //4
//$gameSystem.isSubBattlePhase() === 'after_battle' //5
//$gameSystem.isSubBattlePhase() === 'actor_move' //6
//$gameSystem.isSubBattlePhase() === 'actor_target' //7
//$gameSystem.isSubBattlePhase() === 'actor_command_window'//8
//$gameSystem.isSubBattlePhase() === 'auto_actor_command'//9
//$gameSystem.isSubBattlePhase() === 'auto_actor_move' //10
//$gameSystem.isSubBattlePhase() === 'status_window' //11
//$gameSystem.isSubBattlePhase() === 'battle_window' //12
//$gameSystem.isSubBattlePhase() === 'enemy_command' //13
//$gameSystem.isSubBattlePhase() === 'enemy_move' //14
//$gameSystem.isSubBattlePhase() === 'enemy_action' //15
//$gameSystem.srpgWaitMoving() == true //16

//--------->Start :


//--> 1. "isBattlePhaseEnemy" :

                   Game_Interpreter.prototype.isBattlePhaseEnemy = function(id) {
                       if ($gameSystem.isBattlePhase() === 'enemy_phase') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 2. "isBattlePhaseAutoActor" :

                   Game_Interpreter.prototype.isBattlePhaseAutoActor = function(id) {
                       if ($gameSystem.isBattlePhase() === 'auto_actor_phase') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 3. : "isBattlePhaseActor" :

                   Game_Interpreter.prototype.isBattlePhaseActor = function(id) {
                       if ($gameSystem.isBattlePhase() === 'actor_phase') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 4. "isSubPhaseIni" :

                   Game_Interpreter.prototype.isSubPhaseIni = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'initialize') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 5. "isSubPhaseAfterBattle" :

                   Game_Interpreter.prototype.isSubPhaseAfterBattle = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'after_battle') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 6. "isSubPhaseActorMove" :

                   Game_Interpreter.prototype.isSubPhaseActorMove = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'actor_move') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 7.: "isSubPhaseActorTarget"

                   Game_Interpreter.prototype.isSubPhaseActorTarget = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'actor_target') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 8. "isSubPhaseActorCommandWindow" :

                   Game_Interpreter.prototype.isSubPhaseActorCommandWindow = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'actor_command_window') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 9. "isSubPhaseAutoActorCommand" :

                   Game_Interpreter.prototype.isSubPhaseAutoActorCommand = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'auto_actor_command') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 10. "isSubPhaseAutoActorMove" :

                   Game_Interpreter.prototype.isSubPhaseAutoActorMove = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'auto_actor_move') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 11. "isSubPhaseStatusWindow" : 

                   Game_Interpreter.prototype.isSubPhaseStatusWindow = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'status_window') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 12. "isSubPhaseBattleWindow" :

                   Game_Interpreter.prototype.isSubPhaseBattleWindow = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'battle_window') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 13. "isSubPhaseEnemyCommand" :

                   Game_Interpreter.prototype.isSubPhaseEnemyCommand = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'enemy_command') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 14. "isSubPhaseEnemyMove" :

                   Game_Interpreter.prototype.isSubPhaseEnemyMove = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'enemy_move') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 15. "isSubPhaseEnemyAction" :

                   Game_Interpreter.prototype.isSubPhaseEnemyAction = function(id) {
                       if ($gameSystem.isSubBattlePhase() === 'enemy_action') {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };

//--> 16. "isSubPhaseWaitMoving" :

                   Game_Interpreter.prototype.isSubPhaseWaitMoving = function(id) {
                       if ($gameSystem.srpgWaitMoving() == true) {
                       $gameSwitches.setValue(id, true);
                       } else {
                        $gameSwitches.setValue(id, false);
                       }
                       return true;
                   };





//----------> END        



 
 })();
