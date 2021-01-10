//=============================================================================
// SRPG_TerrainStates.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_TerrainStates> for more Control over BattleUnits in SRPG 
 * @author dopan
 *
 *
 *
 *
 *
 *
 * @help 
 * This Plugin allows to Add or Remove States from BattleUnits, 
 * related to the Terrain-Tag,where the Unit is located 
 *
 * ->because of team usage this Plugin requires DrQs "SRPG_Teams.js"
 *
 * NEW ScriptCalls:
 * ----------------
 *
 * (for solo units)
 *
 * - "this.unitAddTerrainState(unitID, tagID, stateID);"
 *
 * => checks if state"ID" is NOT affected , and if unit"ID" is on terrainTag"ID",..
 *    .. the State will be Added to the Unit.
 *
 *-------------------------------
 *
 * - "this.unitRemoveTerrainState(unitID, tagID, stateID);"
 *
 * => checks if state"ID" IS affected , and if unit"ID" is on terrainTag"ID",..
 *    .. the State will be Removed from the Unit.
 *
 *
 *-------------------------------
 *
 * (for All team units)
 *
 * - "this.teamAddTerrainState("team", tagID, stateID);"
 *
 * => checks if state"ID" IS affected , and if the TEAM_Unit is on terrainTag"ID",..
 *    .. the State will be Added to all Team_Units.
 *
 * => "team" ,..- is the name of the team that is used
 *
 * ==> EXAMPLE : " this.teamAddTerrainState("actor", 1, 23); "
 *
 * (add "state 23" to every unit from "actor"-team which is located on "terrain tag 1")
 *
 *-------------------------------
 *
 * - "this.teamRemoveTerrainState("team", tagID, stateID);"
 *
 * => checks if state"ID" IS affected , and if the TEAM_Unit is on terrainTag"ID",..
 *    .. the State will be Removed from all Team_Units.
 *
 * => "team" ,..- is the name of the team that is used
 * 
 *
 *-------------------------------
 * (for  All Units = actors and enemys )
 *
 * - "this.allAddTerrainState(tagID, stateID);"
 *
 * => checks if state"ID" IS affected , and if Unit is on terrainTag"ID",..
 *    .. the State will be Added to all All_Units.
 *
 *
 *-------------------------------
 *
 * - "this.allRemoveTerrainState(tagID, stateID);"
 *
 * => checks if state"ID" IS affected , and if Unit is on terrainTag"ID",..
 *    .. the State will be Removed from all All_Units.
 *
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog (added scriptcalls, removed plugin Variables)
 * ============================================================================
 * Version 1.0:
 * - first Release 28.07.2020 for SRPG (rpg mv)!
 */
 
(function() {

  var parameters = PluginManager.parameters("SRPG_TerrainStates") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_TerrainStates>'); });


//-------- ScriptCalls

//solo EventUnits:

    // ScriptCall => "this.unitAddTerrainState(unitID, tagID, stateID);"
    Game_Interpreter.prototype.unitAddTerrainState = function(unitID, tagID, stateID) {
        if ((unitID >= 1) && (stateID >= 1) && (tagID >= 0)) {
           if ((!$gameSystem.EventToUnit(unitID)[1].isStateAffected(stateID)) &&
               ($gameMap.terrainTag(($gameMap.event(unitID).x),($gameMap.event(unitID).y))== tagID)) {
                $gameSystem.EventToUnit(unitID)[1].addState(stateID);
           }
        }
    };

    // ScriptCall => "this.unitRemoveTerrainState(unitID, tagID, stateID);"
    Game_Interpreter.prototype.unitRemoveTerrainState = function(unitID, tagID, stateID) {
        if ((unitID >= 1) && (stateID >= 1) && (tagID >= 0)) {
           if (($gameSystem.EventToUnit(unitID)[1].isStateAffected(stateID)) &&
               ($gameMap.terrainTag(($gameMap.event(unitID).x),($gameMap.event(unitID).y))== tagID)) {
                $gameSystem.EventToUnit(unitID)[1].removeState(stateID);
           }
        }
    };

// Teams:

    // ScriptCall => "this.teamAddTerrainState("team", tagID, stateID);"
    Game_Interpreter.prototype.teamAddTerrainState = function(team, tagID, stateID) {
        if ((stateID >= 1) && (tagID >= 0)) {
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var battleunit = $gameSystem.EventToUnit([i]);
                 var eventunit = $gameMap.event([i]);
                 if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                     if ((!battleunit[1].isStateAffected(stateID)) && (battleunit[1].srpgTeam() == team)) {  
                         if  ($gameMap.terrainTag((eventunit.x),(eventunit.y))== tagID) {
                              battleunit[1].addState(stateID);
                         }
                     }
                 }                   
            }
        }
    };


    // ScriptCall => "this.teamRemoveTerrainState("team", tagID, stateID);"
    Game_Interpreter.prototype.teamRemoveTerrainState = function(team, tagID, stateID) {
        if ((stateID >= 1) && (tagID >= 0)) {
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var battleunit = $gameSystem.EventToUnit([i]);
                 var eventunit = $gameMap.event([i]);
                 if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                     if (battleunit[1].isStateAffected(stateID) && (battleunit[1].srpgTeam() == team)) {  
                         if ($gameMap.terrainTag((eventunit.x),(eventunit.y))== tagID) {
                             battleunit[1].removeState(stateID);
                         }
                     }
                 } 
            }
        }
    };

// all Units:

    // ScriptCall => "this.allAddTerrainState(tagID, stateID);"
    Game_Interpreter.prototype.allAddTerrainState = function(tagID, stateID) {
        if ((stateID >= 1) && (tagID >= 0)) {
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var battleunit = $gameSystem.EventToUnit([i]);
                 var eventunit = $gameMap.event([i]);
                 if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                     if (!battleunit[1].isStateAffected(stateID)) {  
                         if  ($gameMap.terrainTag((eventunit.x),(eventunit.y))== tagID) {
                              battleunit[1].addState(stateID);
                         }
                     }
                 }                   
            }
        }
    };


    // ScriptCall => "this.allRemoveTerrainState(tagID, stateID);"
    Game_Interpreter.prototype.allRemoveTerrainState = function(tagID, stateID) {
        if ((stateID >= 1) && (tagID >= 0)) {
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var battleunit = $gameSystem.EventToUnit([i]);
                 var eventunit = $gameMap.event([i]);
                 if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                     if (battleunit[1].isStateAffected(stateID)) {  
                         if ($gameMap.terrainTag((eventunit.x),(eventunit.y))== tagID) {
                             battleunit[1].removeState(stateID);
                         }
                     }
                 } 
            }
        }
    };


})();
