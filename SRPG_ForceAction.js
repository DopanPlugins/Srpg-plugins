//=============================================================================
// SRPG_ForceAction.js
//=============================================================================
/*:
 * @plugindesc v2.0 Adds <SRPG_ForceAction> for MultiWield & ForceAction usage in srpg
 * @author dopan (done but not fully bugtested!)
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
 * This Plugin uses "forceAction" and handles SV & Map "ForceActions" to add an Action to another
 *
 * => Note: This Plugin uses "enemyUnitID" which is used in "EventUnitGraves"&"UnitCore" aswell
 *
 * => Note, added skills will still be affected by "Skillrange" ect.. 
 * 
 * => AOEs Skills cant be used for the Skill_IDs of ForcedAction 
 *   (not tested yet, but the last plugin Version wasnt compatible)
 *
 * => this Plugin provides a SkillNote to "force Actions"
 *   
 * => this Plugin adds "MultiWield", that means all weapons that are equiped by actors or enemys,  
 *    will be used.Even Weaposkills will be used if existing. 
 * ..other plugins will still use the data of main weapon to controll enemyAI and other stuff..
 * (i simply cant add data to all other plugins and other plugins assume 1 weapon usage^^)   
 *
 * => you can enable/disable "MultiWield" in the plugin param Globaly for all Units
 * if "disabled" you can use a ClasNotetag to enable it for that Class only. 
 *(recommended but not required,to use "SRPG_UnitCore", for more EquipmentStuff and enemyClass usage)   
 *   
 *   PLS make sure to add a Switch ID in the PluginParam to avoid Bugs even if that switch isnt used!
 *   
 *   The "MFAisAktive Switch" can be used for timming controll and add "wait" on mapBattlePreActionPhase
 *   (this plugin enables and disables this switch on its own..its for eventing purposes)
 *   
 * This plugin is not fully tested and more Complex Setups with Scriptcalls,might be difficult,
 * but i plan to show more complex eventing_setups in an ShowCase demo in the future..
 *
 * This plugin will know if mapBattle OR SVbattle is used^^
 *
 *===========================================================================================
 * Plugin Scriptcalls: (these are only required for more complex Setups)
 *===========================================================================================
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);;"
 *-------------------------------------------------------------------------------------------------------
 * plugin script to use forceAction on mapBattle Skills:
 *
 * Example : "$gameSystem.EventToUnit(9)[1].useMapForceAction(1, 28);" 
 *                  // user eventID = 9           //skillID = 1 // target eventID = 28 
 *
 * => this will forceAction, with "user"(event id 9 ),"target"(event id 28 ),using "Skill 1" 
 * 
 * this can be used in common event that are added to skills,
 * but you cant use several forced actions add the same time!
 * (there must be made an action chain, if its wanted to force several actions)
 *
 *
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].forceAction(skillID, $gameSystem.EventToUnit(eventiD)[1]);"
 *-------------------------------------------------------------------------------------------------------
 * this is the default forceAction script which only triggers SVbattles
 *
 * same as above this can be added in a Skill Common Event
 *
 *
 *-------------------------------------------------------------------------------------------------------
 * (imported from "eventUnitGraves"-plugin) => "$gameSystem.EnemyUnit(unitID)"
 *-------------------------------------------------------------------------------------------------------
 * 
 *  this returns the event ID based on enemy Unit ID!
 *  that way you can use the enemy UnitID instead of EventID..
 *
 *-------------------------------------------------------------------------------------------------------
 * Plugin NoteTags (recommended!)
 *-------------------------------------------------------------------------------------------------------
 *--------------
 * ClassNotetag:
 *--------------
 *  <srpgWield> (ClassNotetag) // enables multiWield for that Class,
 *                                only required if PluginParam is disabled Globaly ..
 *--------------
 * SkillNoteTag:(recommended!)
 *--------------
 *  <srpgForceAction:SkillID, UserID, TargetID> (SkillNoteTag) // adds action to a Skill
 *
 * example : <srpgForceAction:0, 0, 0>
 * 
 * in this example the same "user" & "target" are used.. thats what "0" does in this NoteTag
 * ..on "skill", "0" means use "attackSkill" or "weaponSkill" of "user"
 * (this is triggered while the skill with that notetag applys)
 *
 *
 * example : <srpgForceAction:10, -10, 10>
 *
 * "skillID = 10"              // skill ID of forcedSkill which is added
 * "UsedID = actorID_10"       // negative Number "-10" => means Actor ID "10" 
 * "targetID = enemyUnitID_10" // positive Number "10" => means EnemyUnitID "10"
 *
 * i used negative and positive numbers to tell the plugin if we use "actorID" or "enemyUnitID"
 * => for this the usage of enemyUnitID is required, which is used in "EventUnitGraves"&"UnitCore"
 *
 *
 * ===========================================================================================
 * about more complex forced action chains:
 * ===========================================================================================
 * this is not tested yet, but it should be possible to make a longer chain of forced Actions,
 * by forcingActions where the forced Skills have the "srpgForceAction" SkillNotetag aswell.
 *
 * Or you can try to do that by eventing, but its not easy to trigger the right timing,
 * to not overwrite one scriptcall with another.
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

  var parameters = PluginManager.parameters("SRPG_ForceAction") || 
  $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_ForceAction>')});

  var _srpg_Controll_MultiWield = (parameters['Controll Global MultiWield'] || 'false');
  var _mfaIsAktiveSwitch = Number(parameters['MFAisAktive_SwitchID'] || 0); 
  var _lastUserID = -1;
  var _faUser = -1;
  var _faTarget = -1;
  var _faSkill = -1;
  var _extraUser = -1
  var _extraTarget = -1;
  var _extraSkill = -1;  
  var _callMapForceAction = false;
  var _callMapNextAction = false;
  var _callSVForceAction = false;
  var _callSVNextAction = false;

// console.log();
//-----------------------------------------------------------------------------------------

//====================================================================
// Scene_Map 
//====================================================================

 var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
Scene_Map.prototype.srpgAfterAction = function() {
     _srpgAfterActionScene.call(this);
     // reset Global var
     $gameSystem._srpgForceAction = true;
     $gameSwitches.setValue(_mfaIsAktiveSwitch, false);
     // reset freeCost
     for (var i = 1; i <= $gameMap.events().length; i++) {
          var battler = $gameSystem.EventToUnit([i]);
          var eventUnit = $gameMap.event([i]);                
          if (battler && eventUnit && (battler[1]._freeCost === true)) {                     
              battler[1]._freeCost = false;
          };
     };
     // queue up svNextAction 
     if (_callSVNextAction === true) {
         _callSVNextAction = false;
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) $gameSystem.EventToUnit(_faUser)[1].SRPGActionTimesAdd(1);
         $gameSystem.EventToUnit(_faUser)[1]._freeCost = true;
         this.svForceAction(_faSkill, _faUser, _faTarget);
         return;
     };	
     // queue up mapNextAction 
     if (_callMapNextAction === true) {
         _callMapNextAction = false; 
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) $gameSystem.EventToUnit(_faUser)[1].SRPGActionTimesAdd(1);
         $gameSystem.EventToUnit(_faUser)[1]._freeCost = true;
         this.mapForceAction(_faSkill, _faUser, _faTarget);
         return;
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
	  $gameTemp.setAutoMoveDestinationValid(true);
	  $gameTemp.setAutoMoveDestination($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY());
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
	  $gameTemp.setAutoMoveDestinationValid(true);
	  $gameTemp.setAutoMoveDestination($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY());
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
     if (!$gameSystem.isSRPGMode()) return;
     // process extra MapActions
     while (_callMapForceAction == true) {	
            // queue up mapForceAction 
            if (_callMapForceAction == true) {
                _callMapForceAction = false;
                var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId()); 
                var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId()); 
                var userForce = $gameSystem.EventToUnit(_faUser); 
                var targetForce = $gameSystem.EventToUnit(_faTarget);
                // check if user&target have changed
                if (user[1] === userForce[1] && target[1] === targetForce[1]) { 
                    userForce[1]._freeCost = true;
                    this.mapForceAction(_faSkill, _faUser, _faTarget);
                } else {
                    // call action with "after action scene"
                    _lastUserID = Number($gameTemp.activeEvent().eventId());
                    _callMapNextAction = true;
                };
                return;
            }; 
     }
};

//====================================================================
// Game_Battler & Game_BattlerBase
//====================================================================

// disable tp/mp cost for forced actions
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    if (this._freeCost && this._freeCost === true) return;
    this._mp -= this.skillMpCost(skill);
    this._tp -= this.skillTpCost(skill);
};

// get the right timing to add SV"extraAction".. happens when battler hp has changed while SVbattle
var _srpgBattlerRefresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    _srpgBattlerRefresh.call(this);
    // make sure we are in sv battle & battler is alive
    if (!$gameSystem.isSRPGMode() || $gameSystem.useMapBattle() || !this.isAlive()) {
	return;
    };
    // check if any SV forceExtraAction is active & if target = battler
    if (_callSVForceAction === true && this.event().eventId() === $gameTemp.targetEvent().eventId()) {
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
        user[1]._freeCost = true;
        user[1].forceAction(_extraSkill, target[1]); 
        _callSVForceAction = false;
    };
};
	
// ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);" 
Game_Battler.prototype.useMapForceAction = function(skillID, targetID) {
    // get the data (event&skill id)
    _faUser = this.event().eventId();
    _faTarget = targetID;
    _faSkill = skillID;
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

//====================================================================
// Game_Action
//====================================================================
// importent data info below: 
//----------------------------------------------------------------- 
// $gameSystem._wieldSlot = 1; $gameSystem._srpgForceAction = true;
// <srpgWield> (ClassNotetag) , <srpgForceAction:skillID, UserID, TargetID> (SkillNoteTag) 

var _srpg_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _srpg_apply.call(this ,target);
    // add codechain for extra Actions to "GameActionApply"
    if ($gameSystem.isSRPGMode() == true) {
        // enable the forceAction controll switch
        if ($gameSystem._srpgForceAction === undefined) $gameSystem._srpgForceAction = true;
        // Check plugin param and userClassNote
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        if (_srpg_Controll_MultiWield === 'true' || user[1].currentClass().meta.srpgWield) {
            this.srpgWieldSetup(target);return;
        };
        // check SkillNote
        if ($gameSystem._srpgForceAction === true && this.item().meta.srpgForceAction) {
            this.srpgWieldSetup(target);return;
        };
    };
};

// process forceActionNote Setup
Game_Action.prototype.srpgForceActionSetup = function(target) { 
    var result = target.result();    
    if (this.item().meta.srpgForceAction && result.isHit()) { 
        // read skill meta data
        var metaSplit = this.item().meta.srpgForceAction.split(", ");
        var forceSkill = Number(metaSplit[0]);	
        var forceUser = metaSplit[1]; 
        var forceTarget = metaSplit[2];
        var skillID = 0;
        var userID = 0;
        var targetID = 0;
        // gameTemp active/target eventID
        if (forceUser == 0) userID = $gameTemp.activeEvent().eventId();
        if (forceTarget == 0) targetID = $gameTemp.targetEvent().eventId();
        //if enemy get eventID
        if (forceUser > 0) userID = $gameSystem.EnemyUnit(forceUser);
        if (forceTarget > 0) targetID = $gameSystem.EnemyUnit(forceTarget); 
        //if actor get eventID
        if (forceUser < 0) {
            forceUser = Number(forceUser * -1);
            userID = $gameSystem.ActorToEvent(forceUser);
        };
        if (forceTarget < 0) {
            forceTarget = Number(forceTarget * -1);
            targetID  = $gameSystem.ActorToEvent(forceTarget);
        };
        // get skillID
        if (forceSkill > 0) skillID = Number(forceSkill);
        if (forceSkill === 0) {  
            var user = $gameSystem.EventToUnit(userID);
            if (user[1].weapons()[0] && user[1].weapons()[0].meta.srpgWeaponSkill) {
                skillID = Number(user[1].weapons()[0].meta.srpgWeaponSkill);
            } else {skillID = Number(user[1].attackSkillId())};
        };
        // process srpgForceAction
        this.srpgForceAction(skillID, userID, targetID);
        return true;
    };
return false;
};
 
// use force action no matter if sv or map -mode, can be used as scriptcall aswell..
// ..,but the timing is importent in order to work correctly (added to skillCommonEvent might work)
Game_Action.prototype.srpgForceAction = function(skill, userID, targetID) { 
    if (!$gameSystem.isSRPGMode() == true) return false;	    
    var forceSkill = Number(skill);
    var target = $gameSystem.EventToUnit(targetID);
    var user = $gameSystem.EventToUnit(userID);
    var mapTag = $dataSkills[skill].meta.mapbattle;
    var useMap = false;
    $gameSystem._srpgForceAction = false;
    if ($gameSystem.useMapBattle()) useMap = true; 
    if (mapTag == 'true') useMap = true; 
    if (mapTag == 'false') useMap = false;  
    if (useMap === true) { 
        user[1].useMapForceAction(forceSkill, targetID);
        return true;
    } else {
        // if extra action (same user and same target)
        if ($gameTemp.activeEvent().eventId() === userID && targetID === $gameTemp.targetEvent().eventId()) { 
            _extraSkill = forceSkill;
            _callSVForceAction = true;
        // if user/target is diefferent than the activeAction's used user/target
        } else {
            _lastUserID = Number($gameTemp.activeEvent().eventId());
            _faUser = userID;
            _faTarget = targetID;
            _faSkill = forceSkill;
            _callSVNextAction = true;
        };
        return true;
    }
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
            this.srpgForceActionSetup(target);
            return;
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
    var targetID = $gameTemp.targetEvent().eventId();
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
                 user[1]._freeCost = true;
                 if (!$gameSystem.useMapBattle()) user[1].forceAction(forceSkill, -2);
             //else if not Hit => transfer data & process forceAction (sv action) 
             } else {
                 _extraSkill = forceSkill;
                 if (!$gameSystem.useMapBattle()) _callSVForceAction = true;
             }; 
             // process map action & process wieldSlot controll Var
             if ($gameSystem.useMapBattle()) user[1].useMapForceAction(forceSkill, targetID);
             $gameSystem._wieldSlot = Number(wSlot + 1);
        }; 
    // else reset ControllVar 
    } else {$gameSystem._wieldSlot = 1};
};

//====================================================================
// Game_System
//====================================================================
// function from "SRPG_UnitGraves" to convert unit id into event id
// this is just incase "SRPG_UnitGraves" isnt used.. 

Game_System.prototype.EnemyUnit = function(unitID) {
    var eventId = 0;
    $gameMap.events().forEach(function(event) {
         if (event.isType() === 'enemy') {
	     eventID = event.eventId();    
             var enemyUnit = $gameMap.event(eventID)._eventEnemyUnitId;
	     if (enemyUnit) { 
                 if (enemyUnit === unitID) {
                     eventId = eventID;
	         }
             }
         }
    });
return eventId;
};


//--End:

})();
