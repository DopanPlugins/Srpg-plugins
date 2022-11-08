//=============================================================================
// prioCharZ.js
//=============================================================================
/*:
 * @plugindesc v1.0 <prioCharZ> Controll the Z_Anchor of Chars & manipulate prioType
 * @author (dopan)
 *
 *
 *
 * 
 *
 *
 *
 *
 *
 *
 * @help  
 *
 * this plugin allows to change the z data of Chars
 *
 * it works for $gameMap.events() & $gamePlayer() & "gameFollowers"
 *
 * this wont edit the prioType directly, and can be reseted to default prioType
 *
 * the default prioTypes have following default rpgMV maker system Z data:
 *
 * # prio0 = screenZ_1 # prio1 = screenZ_3 # prio2 = screenZ_5 #
 *
 * default rpgMV maker system prio 0 is called "bellowChara"
 *
 * default rpgMV maker system prio 1 is called "sameAsChara"
 *
 * default rpgMV maker system prio 2 is called "AboveChara"
 *
 * 
 * __Plugin ScriptCalls __ ALWAYS INSERT NUMBERS AS DATA TO THE ScriptCall-ARRAYS
 *
 * # for $gameMap.event() # insert eventId number & zValue number
 *
 * - $gameMap.setCharPrio(eventId, zValue); # eventId of manipulated event ,zValue is the z Achor and can be any Number
 *
 * - $gameMap.resetCharPrio(eventId);       # eventId of event ,that will be reseted to default prioType data
 *
 * # for $gamePlayer # insert zValue number
 *
 * - $gamePlayer.setCharPrio(zValue);       # zValue is the z Achor and can be any Number, it replaces the prioType data
 *
 * - $gamePlayer.resetCharPrio();           # reset $gamePlayer to default prioType data
 *
 * # for "gameFollowers" # insert dataId number & zValue number
 *
 * - $gamePlayer._followers.setCharPrio([dataId], zValue); # dataId starts with 0 (decides which followers is triggered), zValue is the new Z Anchor
 *
 * - $gamePlayer._followers.resetCharPrio([dataId]);       # dataId starts with 0 (decides which followers is triggered)
 *
 *
 *
 *
 * # default rpgMV maker system Scriptcalls to check ScreenZ is:
 * (it cant change data it only shows the final data which is used, its often updated by the system)
 *
 * # for $gameMap.event() # insert eventId
 *
 * - $gameMap.event(eventId).screenZ();              # shows the Final Z data which is used for eventCharAnchor based on eventId
 *
 * # for $gamePlayer # insert nothing
 *
 * - $gamePlayer.screenZ();                        # shows the Final Z data which is used for gamePlayer Char Anchor
 *
 * # for "gameFollowers" # insert dataId number
 *
 * - $gamePlayer._followers._data[dataId].screenZ(); # dataId starts with 0 (decides which follower is triggered)
 *---------------------------------------------------------------------------------------------------------------
 *
 * pls Note: All scriptCalls return the current active Z anchor in Console F8 !
 *
 *(Plugin scriptCalls return false if any added data/eventId/Number ect is wrong)
 *
 * CREDITS to Eliaquim who mentioned a similar idea in rpg maker Forum
 *
 * ============================================================================
 * Terms of Use (MIT License)
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 08.11.2022 for rpg mv!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("prioCharZ") ||
  $plugins.filter(function (plugin) {return plugin.description.contains('<prioCharZ>')});
 
//-----------------------------------------------------------------------------------------

// replace Default function
// dopan add Z controll.. by default=> # prio0 = screenZ 1 # prio1 = screenZ 3 # prio2 = screenZ 5 #
Game_CharacterBase.prototype.screenZ = function() { 
    // if new Z was installed
    if (this._charZ !== undefined) return this._charZ;    
    // default function usage
    return this._priorityType * 2 + 1;
};

// new functions:

    Game_Map.prototype.setCharPrio = function(eventId, zValue) { 
        var evId = eventId; var charZ = zValue;
        if (this.event(evId) && charZ) this.event(evId)._charZ = charZ; return this.event(evId)._charZ 
        return false;
    };

    Game_Map.prototype.resetCharPrio = function(eventId) { 
        if (this.event(evId)._charZ !== undefined) this.event(evId)._charZ = undefined;return this.event(evId).screenZ();
        return false;
    };

    Game_Player.prototype.setCharPrio = function(zValue) { 
        var charZ = zValue;
        if (charZ) this._charZ = charZ; return this._charZ
        return false;
    };

    Game_Player.prototype.resetCharPrio = function() { 
        if (this._charZ !== undefined) this._charZ = undefined;return this.screenZ();
        return false;
    };

    Game_Followers.prototype.setCharPrio = function(dataId, zValue) {
        var dId = dataId; var charZ = zValue;
        if (dId && charZ) this._data[dId]._charZ = charZ; return this._data[dId]._charZ
        return false;
    };

    Game_Followers.prototype.resetCharPrio = function(dataId) {
        var dId = dataId; 
        if (dId && this._charZ !== undefined) this._data[dId]._charZ = undefined; return this._data[dId].screenZ();
        return false; 
    };

//--End:

})();
