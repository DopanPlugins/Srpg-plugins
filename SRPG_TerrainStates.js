//=============================================================================
// SRPG_TerrainStates.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_TerrainStates> (and Variables) for more Control over BattleUnits in SRPG 
 * @author dopan
 *
 *
 *
 * 
 * @param Tag0_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=0
 * @type variable
 * @default 0
 *
 *
 * @param Tag1_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=1
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag2_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=2
 * @type variable
 * @default 0
 *
 *
 * @param Tag3_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=3
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag4_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=4
 * @type variable
 * @default 0
 *
 *
 * @param Tag5_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=5
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag6_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=6
 * @type variable
 * @default 0
 *
 *
 * @param Tag7_removeStateID
 * @desc variable ID which value = StateID, that is suppossed to be removed on Terrain-Tag=7
 * @type variable
 * @default 0
 *
 *
 *
 * 
 * @param Tag0_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=0
 * @type variable
 * @default 0
 *
 *
 * @param Tag1_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=1
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag2_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=2
 * @type variable
 * @default 0
 *
 *
 * @param Tag3_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=3
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag4_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=4
 * @type variable
 * @default 0
 *
 *
 * @param Tag5_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=5
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag6_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=6
 * @type variable
 * @default 0
 *
 *
 * @param Tag7_addStateID
 * @desc variable ID which value = StateID, that is suppossed to be Added on Terrain-Tag=7
 * @type variable
 * @default 0
 *
 *
 *
 * 
 * @param Tag0_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=0
 * @type variable
 * @default 0
 *
 *
 * @param Tag1_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=1
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag2_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=2
 * @type variable
 * @default 0
 *
 *
 * @param Tag3_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=3
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag4_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=4
 * @type variable
 * @default 0
 *
 *
 * @param Tag5_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=5
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Tag6_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=6
 * @type variable
 * @default 0
 *
 *
 * @param Tag7_UnitEventID
 * @desc variable ID which value = EventID,of the Unit that is supposed to be affected by Terrain-Tag=7
 * @type variable
 * @default 0
 *
 *
 *
 *
 * @help 
 * This Plugin allows to Add or Remove States from BattleUnits, 
 * related to the Terrain-Tag,where the Unit is located 
 * and the Variable that has the EventID of the Unit stored.
 * Its recommended to use "SRPG_ActorUnits" & "SRPG_EnemyUnits" , to store the eventID,
 * of every BattleUnit in Variables.
 *
 *
 *
 *
 *
 *
 *
 *
 * Plugin Command:
 * "SRPG_TerrainStates" ->is the Trigger for the Plugin, this will
 * check the State-status and the Position-Terrain-Tag.Than it will Add or Remove 
 * the State that is stored in the Variable related to the Terrain-Tag.
 * This happens 1 time every time the Plugin Command is used.
 *
 *
 *
 *
 *
 *
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 28.07.2020 for SRPG (rpg mv)!
 */
 
(function() {

  var parameters = $plugins.filter(function (plugin) { return plugin.description.contains('SRPG_TerrainStates'); });
  var parameters = PluginManager.parameters("SRPG_TerrainStates");
  
  var _varSOFFT0ID = Number(parameters['Tag0_removeStateID'] || 0);
  var _varSOFFT1ID = Number(parameters['Tag1_removeStateID'] || 0);
  var _varSOFFT2ID = Number(parameters['Tag2_removeStateID'] || 0);
  var _varSOFFT3ID = Number(parameters['Tag3_removeStateID'] || 0);
  var _varSOFFT4ID = Number(parameters['Tag4_removeStateID'] || 0);
  var _varSOFFT5ID = Number(parameters['Tag5_removeStateID'] || 0);
  var _varSOFFT6ID = Number(parameters['Tag6_removeStateID'] || 0);
  var _varSOFFT7ID = Number(parameters['Tag7_removeStateID'] || 0);

  var _varSONT0ID = Number(parameters['Tag0_addStateID'] || 0);
  var _varSONT1ID = Number(parameters['Tag1_addStateID'] || 0);
  var _varSONT2ID = Number(parameters['Tag2_addStateID'] || 0);
  var _varSONT3ID = Number(parameters['Tag3_addStateID'] || 0);
  var _varSONT4ID = Number(parameters['Tag4_addStateID'] || 0);
  var _varSONT5ID = Number(parameters['Tag5_addStateID'] || 0);
  var _varSONT6ID = Number(parameters['Tag6_addStateID'] || 0);
  var _varSONT7ID = Number(parameters['Tag7_addStateID'] || 0);

  var _varEVT0ID = Number(parameters['Tag0_UnitEventID'] || 0);
  var _varEVT1ID = Number(parameters['Tag1_UnitEventID'] || 0);
  var _varEVT2ID = Number(parameters['Tag2_UnitEventID'] || 0);
  var _varEVT3ID = Number(parameters['Tag3_UnitEventID'] || 0);
  var _varEVT4ID = Number(parameters['Tag4_UnitEventID'] || 0);
  var _varEVT5ID = Number(parameters['Tag5_UnitEventID'] || 0);
  var _varEVT6ID = Number(parameters['Tag6_UnitEventID'] || 0);
  var _varEVT7ID = Number(parameters['Tag7_UnitEventID'] || 0);


 





var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'SRPG_TerrainStates') {


        if (_varEVT0ID >= 1 && ($gameVariables.value(_varEVT0ID)) >= 1 && _varSOFFT0ID >= 1 && ($gameVariables.value(_varSOFFT0ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT0ID))[1].isStateAffected($gameVariables.value(_varSOFFT0ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT0ID)).x),($gameMap.event($gameVariables.value(_varEVT0ID)).y))==0)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT0ID))[1].removeState($gameVariables.value(_varSOFFT0ID))
            }
        }                                                                                                                      

        if (_varEVT0ID >= 1 && ($gameVariables.value(_varEVT0ID)) >= 1 && _varSONT0ID >= 1 && ($gameVariables.value(_varSONT0ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT0ID))[1].isStateAffected($gameVariables.value(_varSONT0ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT0ID)).x),($gameMap.event($gameVariables.value(_varEVT0ID)).y))==0)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT0ID))[1].addState($gameVariables.value(_varSONT0ID))
            }
        }

        if (_varEVT1ID >= 1 && ($gameVariables.value(_varEVT1ID)) >= 1 && _varSOFFT1ID >= 1 && ($gameVariables.value(_varSOFFT1ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT1ID))[1].isStateAffected($gameVariables.value(_varSOFFT1ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT1ID)).x),($gameMap.event($gameVariables.value(_varEVT1ID)).y))==1)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT1ID))[1].removeState($gameVariables.value(_varSOFFT1ID))
            }
        }                                                                                                                      

        if (_varEVT1ID >= 1 && ($gameVariables.value(_varEVT1ID)) >= 1 && _varSONT1ID >= 1 && ($gameVariables.value(_varSONT1ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT1ID))[1].isStateAffected($gameVariables.value(_varSONT1ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT1ID)).x),($gameMap.event($gameVariables.value(_varEVT1ID)).y))==1)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT1ID))[1].addState($gameVariables.value(_varSONT1ID))
            }
        }

        if (_varEVT2ID >= 1 && ($gameVariables.value(_varEVT2ID)) >= 1 && _varSOFFT2ID >= 1 && ($gameVariables.value(_varSOFFT2ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT2ID))[1].isStateAffected($gameVariables.value(_varSOFFT2ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT2ID)).x),($gameMap.event($gameVariables.value(_varEVT2ID)).y))==2)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT2ID))[1].removeState($gameVariables.value(_varSOFFT2ID))
            }
        }                                                                                                                      

        if (_varEVT2ID >= 1 && ($gameVariables.value(_varEVT2ID)) >= 1 && _varSONT2ID >= 1 && ($gameVariables.value(_varSONT2ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT2ID))[1].isStateAffected($gameVariables.value(_varSONT2ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT2ID)).x),($gameMap.event($gameVariables.value(_varEVT2ID)).y))==2)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT2ID))[1].addState($gameVariables.value(_varSONT2ID))
            }
        }

        if (_varEVT3ID >= 1 && ($gameVariables.value(_varEVT3ID)) >= 1 && _varSOFFT3ID >= 1 && ($gameVariables.value(_varSOFFT3ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT3ID))[1].isStateAffected($gameVariables.value(_varSOFFT3ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT3ID)).x),($gameMap.event($gameVariables.value(_varEVT3ID)).y))==3)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT3ID))[1].removeState($gameVariables.value(_varSOFFT3ID))
            }
        }                                                                                                                      

        if (_varEVT3ID >= 1 && ($gameVariables.value(_varEVT3ID)) >= 1 && _varSONT3ID >= 1 && ($gameVariables.value(_varSONT3ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT3ID))[1].isStateAffected($gameVariables.value(_varSONT3ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT3ID)).x),($gameMap.event($gameVariables.value(_varEVT3ID)).y))==3)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT3ID))[1].addState($gameVariables.value(_varSONT3ID))
            }
        }

        if (_varEVT4ID >= 1 && ($gameVariables.value(_varEVT4ID)) >= 1 && _varSOFFT4ID >= 1 && ($gameVariables.value(_varSOFFT4ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT4ID))[1].isStateAffected($gameVariables.value(_varSOFFT4ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT4ID)).x),($gameMap.event($gameVariables.value(_varEVT4ID)).y))==4)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT4ID))[1].removeState($gameVariables.value(_varSOFFT4ID))
            }
        }                                                                                                                      

        if (_varEVT4ID >= 1 && ($gameVariables.value(_varEVT4ID)) >= 1 && _varSONT4ID >= 1 && ($gameVariables.value(_varSONT4ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT4ID))[1].isStateAffected($gameVariables.value(_varSONT4ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT4ID)).x),($gameMap.event($gameVariables.value(_varEVT4ID)).y))==4)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT4ID))[1].addState($gameVariables.value(_varSONT4ID))
            }
        }

        if (_varEVT5ID >= 1 && ($gameVariables.value(_varEVT5ID)) >= 1 && _varSOFFT5ID >= 1 && ($gameVariables.value(_varSOFFT5ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT5ID))[1].isStateAffected($gameVariables.value(_varSOFFT5ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT5ID)).x),($gameMap.event($gameVariables.value(_varEVT5ID)).y))==5)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT5ID))[1].removeState($gameVariables.value(_varSOFFT5ID))
            }
        }                                                                                                                      

        if (_varEVT5ID >= 1 && ($gameVariables.value(_varEVT5ID)) >= 1 && _varSONT5ID >= 1 && ($gameVariables.value(_varSONT5ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT5ID))[1].isStateAffected($gameVariables.value(_varSONT5ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT5ID)).x),($gameMap.event($gameVariables.value(_varEVT5ID)).y))==5)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT5ID))[1].addState($gameVariables.value(_varSONT5ID))
            }
        }

        if (_varEVT6ID >= 1 && ($gameVariables.value(_varEVT6ID)) >= 1 && _varSOFFT6ID >= 1 && ($gameVariables.value(_varSOFFT6ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT6ID))[1].isStateAffected($gameVariables.value(_varSOFFT6ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT6ID)).x),($gameMap.event($gameVariables.value(_varEVT6ID)).y))==6)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT6ID))[1].removeState($gameVariables.value(_varSOFFT6ID))
            }
        }                                                                                                                      

        if (_varEVT6ID >= 1 && ($gameVariables.value(_varEVT6ID)) >= 1 && _varSONT6ID >= 1 && ($gameVariables.value(_varSONT6ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT6ID))[1].isStateAffected($gameVariables.value(_varSONT6ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT6ID)).x),($gameMap.event($gameVariables.value(_varEVT6ID)).y))==6)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT6ID))[1].addState($gameVariables.value(_varSONT6ID))
            }
        }

        if (_varEVT7ID >= 1 && ($gameVariables.value(_varEVT7ID)) >= 1 && _varSOFFT7ID >= 1 && ($gameVariables.value(_varSOFFT7ID)) >= 1) {
            if ($gameSystem.EventToUnit($gameVariables.value(_varEVT7ID))[1].isStateAffected($gameVariables.value(_varSOFFT7ID)) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT7ID)).x),($gameMap.event($gameVariables.value(_varEVT7ID)).y))==7)) {
                $gameSystem.EventToUnit($gameVariables.value(_varEVT7ID))[1].removeState($gameVariables.value(_varSOFFT7ID))
            }
        }                                                                                                                      

        if (_varEVT7ID >= 1 && ($gameVariables.value(_varEVT7ID)) >= 1 && _varSONT7ID >= 1 && ($gameVariables.value(_varSONT7ID)) >= 1) {
            if ((!$gameSystem.EventToUnit($gameVariables.value(_varEVT7ID))[1].isStateAffected($gameVariables.value(_varSONT7ID))) && ($gameMap.terrainTag(($gameMap.event($gameVariables.value(_varEVT7ID)).x),($gameMap.event($gameVariables.value(_varEVT7ID)).y))==7)) {
                  $gameSystem.EventToUnit($gameVariables.value(_varEVT7ID))[1].addState($gameVariables.value(_varSONT7ID))
            }
        }



        }
    };

 
})();