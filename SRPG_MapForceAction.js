//=============================================================================
// SRPG_MapForceAction.js
//=============================================================================
/*:
 * @plugindesc v2.0 Adds <SRPG_MapForceAction> ScriptCalls to SRPG 
 * @author dopan (UNDER CONSTRUCTION! DO NOT DownLoad!)
 *
 * @param MFAisAktive_SwitchID 
 * @desc SwitchID of MFAisAktive_Switch,used to disable mapAktionText & mapPreActionPhase
 * @type switch
 * @default 0
 * 
 * @param Controll Global MultiWield
 * @desc (true) is using MultiWield on All BattleUnits depemding on the Equiped Weapons. 
 * @type boolean
 * @default false
 * 
 * @help  
 *
 * This Plugin helps to replicate the "force Action" Function for skills in: MapBattle"True" BattleMode.
 * the Plugin ScriptCall will activate a "force Action" on Map without using "SV battleMode"
 * Note: the Plugin is still experimental pls report any Bugs or Issues u might find.
 *
 * => Note, added skills will still be affected by "Skillrange" ect.. 
 * 
 * => AOEs Skills cant be used for the Skill_IDs of these Scriptcalls..
 *
 * => this is only for usage in "Custom Execution" triggered CommonEvent,
 *     in order to add a Skill to another..
 *
 * Plugin Scriptcalls:
 *
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapExtraAction(extraSkillID);"
 *-------------------------------------------------------------------------------------------------------
 * Example : "$gameSystem.EventToUnit(eventiD)[1].useMapExtraAction(10);"
 *                                                               //skillId = 10
 *
 * => this will add a second attack to the user if used in a Custom Ex SkillNoteTag triggered CommonEvent ,..
 *   ..using "Skill 10" 
 * => user & target are "active event" and "target event" by default
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapForceDuoAction(duoSkillID, duoUserID);"
 *-------------------------------------------------------------------------------------------------------
 * Example : "$gameSystem.EventToUnit(eventiD)[1].useMapForceDuoAction(2, 10);" 
 *                        //skillId = 2 // user eventID = 10
 *
 * => this attack will be used from another Unit(user) on the same target(target event).
 * => by default the normal Skill user wont consume his turn this way, but the"helper" Unit will..
 * => this can be corrected with common events ect.. (by changing turn end status of units)
 * => this can be used for "friend-Combo"attacks" for example..
 *
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);;"
 *-------------------------------------------------------------------------------------------------------
 * Example : "$gameSystem.EventToUnit(9)[1].useMapForceAction(1, 28);" 
 *                  // user eventID = 9           //skillID = 1 // target eventID = 28 
 *
 * => this will forceAction, with "user"(event id 9 ),"target"(event id 28 ),using "Skill 1" 
 *
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * And dont forget:
 * this is only for usage in "Custom Execution" triggered CommonEvent in order to add a Skill to another..
 * That means the BattleAction must be triggered by any Unit that uses a Skill
 * (this skill should trigger a Common Event and these Scriptcalls should be in that Common Event)
 * 
 * the MFAisAktive Switch must be used to disable the PreActionPhase & MapActionText of the added skills
 * (by using "if conditions" that only use MapActionText&PreActionPhase when the Switch is OFF)
 * this switch will be activated from this Plugin & should be deactivated
 * in the "event after action"..
 * 
 *
 * Sry but this stuff is required! 
 *
 *  <srpgWield> (ClassNotetag) , <srpgForceAction> (SkillNoteTag)
 *
 * ===========================================================================================
 * Terms of Use
 * ===========================================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ===========================================================================================
 * Changelog 
 * ===========================================================================================
 * Version 2.0:
 * - updated Release 02.10.2020 for SRPG (rpg mv)! 
 * => better compatiblety and reworked Functions
 * upgrade into new plugin named "SRPG_forceAction"
 * CREDITS: 
 * - DrQ & his plugin SRPG_MapBattle.js
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_MapForceAction") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_MapForceAction>'); });

  var _srpg_Controll_MultiWield = (parameters['Controll Global MultiWield'] || 'false');
  var _mfaIsAktiveSwitch = Number(parameters['MFAisAktive_SwitchID'] || 0); 
  var _faDuoUser = -1;
  var _faDuoTarget = -1;
  var _duoLeader = -1;
  var _faUser = -1;
  var _faTarget = -1;
  var _faSkill = -1;
  var _duoSkill = -1;
  var _extraUser = -1
  var _extraTarget = -1;
  var _extraSkill = -1;
  var _resetTurn = false;	  
  var _callMapForceAction = false;
  var _callMapForceExtraAction = false;
  var _callMapForceDuoAction = false;
  var _callSVForceAction = false;
  var _callSVForceExtraAction = false;
  var _callSVForceDuoAction = false;

// console.log();
//-----------------------------------------------------------------------------------------

//====================================================================
// Scene_Map 
//====================================================================


 var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
Scene_Map.prototype.srpgAfterAction = function() {
     _srpgAfterActionScene.call(this);
     $gameSystem._srpgForceAction = true;
     $gameSwitches.setValue(_mfaIsAktiveSwitch, false);
     if (_resetTurn === true) {
	$gameSystem.EventToUnit(_faDuoUser)[1]._srpgTurnEnd = false;
	$gameSystem.EventToUnit(_duoLeader)[1]._srpgTurnEnd = true;
	_resetTurn = false;
     };´
     if (_callSVForceDuoAction === true) {
         $gameTemp.setShouldPayCost(true);
         this.svForceAction(_duoSkill, _faDuoUser, _faDuoTarget);
         _callSVForceDuoAction = false;return;
     };
     if (_callSVForceAction === true) {
         $gameTemp.setShouldPayCost(false);
         this.svForceAction(_faSkill, _faUser, _faTarget);
         _callSVForceAction = false;return;
     };	
};

Scene_Map.prototype.svForceAction = function(skill, user, target) {
     if (!$gameSystem.isSRPGMode()) return;
     // make sure that SV_battle is used
     $gameSystem.forceSRPGBattleMode('normal');
     // queue up svForceAction
     var userUnit = $gameSystem.EventToUnit(user);
     var targetUnit = $gameSystem.EventToUnit(target);
     if ((!userUnit[1].isDead()) && (!targetUnit[1].isDead())) {
          // make sure that active & target event are set properly before "ForceAction" is used
          $gameTemp.setActiveEvent($gameMap.event(user));
          $gameTemp.setTargetEvent($gameMap.event(target));
          userUnit[1].forceAction(skill, targetUnit[1]);
          $gameSystem.setSubBattlePhase('invoke_action');
          this.srpgBattleStart(userUnit, targetUnit);
     }
};	

Scene_Map.prototype.mapForceAction = function(skill, user, target) {	
     if (!$gameSystem.isSRPGMode()) return;
     // make sure that Mapbattle is used
     $gameSystem.forceSRPGBattleMode('map');
     var userUnit = $gameSystem.EventToUnit(user);
     var targetUnit = $gameSystem.EventToUnit(target);
     if ((!userUnit[1].isDead()) && (!targetUnit[1].isDead())) { 
          // make sure that active & target event are set properly before "ForceAction" is used
          $gameTemp.setActiveEvent($gameMap.event(user));
          $gameTemp.setTargetEvent($gameMap.event(target));
          userUnit[1].forceAction(skill, targetUnit[1]);
          $gameSystem.setSubBattlePhase('invoke_action');
          this.srpgBattleStart(userUnit, targetUnit);
     }
};

// update Scene_Map .. this adds Actions to the MapBattles
var _SRPG_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
     _SRPG_SceneMap_update.call(this);
     // there are definitely no map skills in play
     if (!$gameSystem.isSRPGMode() || !$gameSystem.useMapBattle()) {
	 return;
     };
     // process extra MapActions
     while (_callMapForceExtraAction == true || _callMapForceDuoAction == true || _callMapForceAction == true) {
            // queue up extraMapAction
            if (_callMapForceExtraAction == true) {
	        $gameTemp.setShouldPayCost(false);
                this.mapForceAction(_extraSkill, _extraUser, _extraTarget);
                _callMapForceExtraAction = false;
                return;
            };                     
            // queue up mapDuoAction 
            if (_callMapForceDuoAction == true) {
                $gameTemp.setShouldPayCost(true);
                this.mapForceAction(_duoSkill, _faDuoUser, _faDuoTarget);
                _callMapForceDuoAction = false;	  
                return;
            }; 
            // queue up mapForceAction 
            if (_callMapForceAction == true) {
	        $gameTemp.setShouldPayCost(false);
                this.mapForceAction(_faSkill, _faUser, _faTarget);
                _callMapForceAction = false;
                return;
            }; 
     }
};

//====================================================================
// Game_Battler
//====================================================================

// get the right timing to add SV"extraAction".. happens when battler hp has changed
var _srpgBattlerRefresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    _srpgBattlerRefresh.call(this);
    // make sure we are in sv battle & battler is alive
    if (!$gameSystem.isSRPGMode() || $gameSystem.useMapBattle() || !this.isAlive()) {
	return;
    };
    // check if any SV forceExtraAction is active & if target = battler
    if (_callSVForceExtraAction === true && this.event().eventId() === $gameTemp.targetEvent().eventId()) {
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
        user[1].forceAction(_extraSkill, target[1]); 
        _callSVForceExtraAction = false;
    };
};

// ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapExtraAction(extraSkillID);"
Game_Battler.prototype.useMapExtraAction = function(extraSkillID) {
    // get skill data
    _extraSkill = extraSkillID;
    _extraUser = $gameTemp.activeEvent().eventId();
    _extraTarget = $gameTemp.targetEvent().eventId();
    // clean up "waiting" status
    if (this._actionState == ("waiting")) {
        this.setActionState("");
    };
    // make sure that Mapbattle is used
    $gameSystem.forceSRPGBattleMode('map');
    // Enable the "MapForceExtraAction" Trigger ,this will happen with "update Scene_Map"
    _callMapForceExtraAction = true;
    // MFA is Aktive Switch 
    $gameSwitches.setValue(_mfaIsAktiveSwitch, true);  
};

// ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceDuoAction(duoSkillID, duoUserID);"
Game_Battler.prototype.useMapDuoAction = function(duoSkillID, duoUserID) {
    // get the data (event&skill id)
    _faDuoUser = duoUserID;
    _faDuoTarget = $gameTemp.targetEvent().eventId();
    _duoLeader = this.event().eventId();
    _duoSkill = duoSkillID;
    // insert event id 
    var user = $gameSystem.EventToUnit(_faDuoUser);
    // clean up "waiting" status
    if (user[1]._actionState == ("waiting")) {
        user[1].setActionState("");
    };
    // make sure that Mapbattle is used
    $gameSystem.forceSRPGBattleMode('map');
    // Enable the "MapDoubleAction" Trigger ,this will happen with "update Scene_Map"
    _callMapForceDuoAction = true;
    // MFA is Aktive Switch  
    $gameSwitches.setValue(_mfaIsAktiveSwitch, true);
};
	
// ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);" 
Game_Battler.prototype.useMapForceAction = function(skillID, targetID) {
    // get the data (event&skill id)
    _faUser = this.event().eventId();
    _faTarget = targetID;
    _faSkill = skillID;
    //insert event id 
    var target = $gameSystem.EventToUnit(targetID);
    // clean up "waiting" status
    if (this._actionState == ("waiting")) {
        this.setActionState("");
    };
    // make sure that Mapbattle is used
    $gameSystem.forceSRPGBattleMode('map');
    // Enable the "MapForceAction" Trigger ,this will happen with "update Scene_Map"
    _callMapForceAction = true; 
    // MFA is Aktive Switch 
    $gameSwitches.setValue(_mfaIsAktiveSwitch, true);  
};


// importent data info below: 
//----------------------------------------------------------------- 
// $gameSystem._wieldSlot = 1; $gameSystem._srpgForceAction = true;
// <srpgWield> (ClassNotetag) , <srpgForceAction> (SkillNoteTag) 

var _srpg_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _srpg_apply.call(this ,target);
    // add codechain for extra Actions to "GameActionApply"
    if ($gameSystem.isSRPGMode() == true) {
        // enable the forceAction controll switch
        if ($gameSystem._srpgForceAction === undefined) $gameSystem._srpgForceAction = true;
        // Check plugin param and userClassNote
        var user = $gameSystem.EventToUnit(this._userEventID);
        if (_srpg_Controll_MultiWield === 'true' || user[1].currentClass().meta.srpgWield) {
            this.srpgWieldSetup(target);return;
        };
        // check SkillNote
        if ($gameSystem._srpgForceAction === true && this.item().meta.srpgForceAction) {
            this.srpgWieldSetup(target);return;
        };
    };
};

// process forceActionNote 
Game_Action.prototype.svForceExtraAction = function() { 
    var result = target.result();
    var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
    var targetID = $gameTemp.targetEvent().eventId();	    
    if (this.item().meta.srpgForceAction && result.isHit()) { 
        var forceSkill = Number(this.item().meta.srpgForceAction);
        this.srpgForceAction(forceSkill, user, targetID);
        return true;
    };
return false;
};

// use force action no matter if sv or map -mode, can be used as scriptcall aswell..
// ..,but the timing is importent in order to work correctly (added to skillCommonEvent might work)
Game_Action.prototype.srpgForceAction = function(skill, user, targetID) { 
    if (!$gameSystem.isSRPGMode() == true) return false;	    
    var forceSkill = Number(skill);
    var target = $gameSystem.EventToUnit(targetID);
    $gameSystem._srpgForceAction = false;
    if (!$gameSystem.useMapBattle()) user[1].forceAction(forceSkill, target[1]);return true;
    if ($gameSystem.useMapBattle()) user[1].useMapForceAction(forceSkill, target);return true;
return false;
};

// check Notetag & plugin param, to process Wield attacks based on equiped weapons
Game_Action.prototype.srpgWieldSetup = function(target) { 
    if ($gameSystem.isSRPGMode() == true) {
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var attSkill = user[1].attackSkillId();
        var userSkill = this._item._itemId;
        var skillType = this._item._dataClass;
        // if forceActionNote is active go to forceAction setup instead finishing this function
        if ($gameSystem._srpgForceAction === true && this.item().meta.srpgForceAction) {
            this.svForceExtraAction();return;
        };
        // enable the ControllVar that makes sure this wont be a neverending action chain
        if ($gameSystem._wieldSlot === undefined) $gameSystem._wieldSlot = 1;
        var wSlot = $gameSystem._wieldSlot - 1;
        // check equiped Weapons & weaponSkills
        if (user[1].weapons()[wSlot] && user[1].weapons()[wSlot].meta.srpgWeaponSkill) {
            var userWeaponSkill = user[1].weapons()[wSlot].meta.srpgWeaponSkill; 
        // if no weaponSkill, use a placeholder that wont trigger anything (-3)
        } else {var userWeaponSkill = -3};
        // if weponSkill or attackskill is used trigger next function=> "this.srpgWield()"
        if (user[1].weapons()[wSlot] && skillType === "skill" && ((attSkill || userWeaponSkill) === userSkill)) {
            this.srpgWield(target);
        // else reset ControllVar
        } else {$gameSystem._wieldSlot = 1};
    };
};

// process & trigger wield action
Game_Action.prototype.srpgWield = function(target) { 
    if (!$gameSystem.isSRPGMode() == true) return;
    var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
    var userWeapons = user[1].weapons();
    var forceSkill = user[1].attackSkillId();
    var wSlot = $gameSystem._wieldSlot;
    // only process if there is a not used weapon
    if (wSlot < userWeapons.length) {
         var result = target.result();
         // check WeaponSlot
         if (userWeapons[wSlot]) {
             // check weaponSkill
             if (userWeapons[wSlot].meta.srpgWeaponSkill) {
                 forceSkill = userWeapons[wSlot].meta.srpgWeaponSkill;
             };
             // check if not Hit => process forceAction (sv action)
             if (!result.isHit()) {
                 if (!$gameSystem.useMapBattle()) user[1].forceAction(forceSkill, -2);
             //else => transfer data & process forceAction (sv action) 
             } else {
                 _extraSkill = forceSkill;
                 if (!$gameSystem.useMapBattle()) _callSVForceExtraAction = true;
             }; 
             // process map action & process wieldSlot controll Var
             if ($gameSystem.useMapBattle()) user[1].useMapExtraAction(forceSkill);
             $gameSystem._wieldSlot = Number(wSlot + 1);
        }; 
    // else reset ControllVar 
    } else {$gameSystem._wieldSlot = 1};
};

//--End:

})();
