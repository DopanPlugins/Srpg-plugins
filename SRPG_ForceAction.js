//=============================================================================
// SRPG_ForceAction.js
//=============================================================================
/*:
 * @plugindesc v2.4 Adds <SRPG_ForceAction> for MultiWield & ForceAction usage in srpg
 * @author dopan (done but not fully bugtested!) test version5
 *
 * 
 * @param Controll Global MultiWield
 * @desc (true) is using MultiWield on All BattleUnits depemding on the Equiped Weapons. 
 * @type boolean
 * @default false
 * 
 * @help  
 *
 * This Plugin requires the my "edited-SRPG_core" & ("SRPG_UnitCore" OR "SRPG_EventUnitGraves" for the "UnitId" usage in this plugin)
 *
 * This Plugin uses "forceAction" and handles SV & Map "ForceActions" to add an Action to another
 *
 * New state, weapon, armor, class, actor, and enemy notetag:
 * <srpgCounterSkill:X>   counter attacks use skill X instead of your attack
 * ->this is global and should work for: default counter & drQs statbased counter
 * => depending on which counterSetup your project uses
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
 *   (this plugin enables and disables this switch on its own..its for eventing purposes on mapBattle Actions)
 *   
 * This plugin is not fully tested and more Complex Setups with Scriptcalls,might be difficult,
 * but i plan to show more complex eventing_setups in an ShowCase demo in the future..
 *
 * This plugin will know if mapBattle OR SVbattle is used^^
 *
 *===========================================================================================
 * Plugin Scriptcalls: (these are only required for more complex Setups)
 *===========================================================================================
 * - "this.triggerBattleStart();"         (Game_Interpreter function for eventing purposes)
 *
 * this can trigger the battleStart scene ,use this right after the default "forceAction" script,
 * incase your script isnt attached to any battleaction..
 *
 * but make sure that "$gameTemp.activeEvent" and "$gameTemp.targetEvent" are set properly,
 * aswell as the wanted mapbattleMode..before "battleStart" is triggered!
 *-------------------------------------------------------------------------------------------------------
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);"
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
 * this is the default forceAction script,but it needs a "battleAction" or "battleStart"
 *
 * same as above this can be added in a Skill Common Event, to be chained into the battleAction
 *
 * 
 *-------------------------------------------------------------------------------------------------------
 * (copy/pasted Function from "eventUnitGraves"-plugin) => "$gameSystem.EnemyUnit(unitID)"
 *-------------------------------------------------------------------------------------------------------
 * example $gameSystem.EnemyUnit("2")
 *
 * (by default enemyUnitId has "" added..this plugin doesnt change that)
 *
 *  this returns the event ID based on enemy Unit ID!
 *  that way you can use the enemy UnitID instead of EventID..
 * (this requires usage of "unitCore" or "eventUnitGraves" because of unit ID.. both plugins will add the needed data)
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
 * example1 : <srpgForceAction:0, 0, 0>
 * 
 * userID = "0" => $gameTemp.activeEvent.eventId() 
 * targetID = "0" => $gameTemp.targetEvent().eventId()
 * SkillID = "0" => use "attackSkill" or "weaponSkill" of "user"(which is added by userID)
 * 
 * (this is triggered while the skill with that notetag applys)
 *
 *
 * example2 : <srpgForceAction:10, -10, 10>
 *
 * "skillID = 10"              // skill ID of forcedSkill which is added
 * "UsedID = actorID_10"       // negative Number "-10" => means Actor ID "10" 
 * "targetID = enemyUnitID_10" // positive Number "10" => means EnemyUnitID "10"
 *
 * i used negative and positive numbers to tell the plugin if we use "actorID" or "enemyUnitID"
 * => for this the usage of enemyUnitID is required, which is used in "EventUnitGraves"&"UnitCore"
 * (i used actorID&unitID ,because without other scripts its hard to know the event ID of actors or enemys)
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
 * Thats why its recommened,to use the common events that are triggered by skills.
 * In order to get into the "battleAction"..
 * Or you can try to use the "this.triggerBattleStart();"-scriptcall..
 * which will triggered in the sceneMap update, as soon "no $gameMapEvent is running"
 * Thats why its recommened to use commonEvents for such more complex setups and not
 * "$gameMap events" even if that commonEvent is not added to a skill..
 *
 * ("$gameMap events" are handling the pre/post action phases, UnitMovement ect ,
 *  and for timming purposes,we wait for them to end before any action happens)
 * ===========================================================================================
 * Terms of Use
 * ===========================================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ===========================================================================================
 * Changelog 
 * ===========================================================================================
 * Version 2.4:
 * - updated Release 02.10.2020 for SRPG (rpg mv)! 
 * => better compatiblety and reworked Functions
 * upgrade into new plugin named "SRPG_forceAction"
 * CREDITS: 
 * - DrQ & his plugin SRPG_MapBattle.js
 *
 * changelog:
 *            - 2.1 => on actor sv wield attacks ,display the used wieldWeapon 
 *            - 2.2 => reworked wield counters,added global counterskillNote
 *            - 2.3 => upgraded CounterSkill NoteTag for enemys incase "SRPG_UnitCore" is used
 *
 *
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_ForceAction") || 
  $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_ForceAction>')});

  var coreParam = PluginManager.parameters('SRPG_core');
  var _withYEP_BattleEngineCore = coreParam['WithYEP_BattleEngineCore'] || 'false';


  var _srpg_Controll_MultiWield = (parameters['Controll Global MultiWield'] || 'false');
  var _lastUserID = -1;
  var _faUser = -1;
  var _faTarget = -1;
  var _faSkill = -1;
  var _extraUser = -1
  var _extraTarget = -1;
  var _extraSkill = -1;  
  var _callSVForceAction = false;
  var _callSVNextAction = false;
  var _callMapNextAction = false;
  var _finalCallMFA = false;
  var _triggerBattleStart = false;
  var _mapCounter = false;


// console.log();
//-----------------------------------------------------------------------------------------

//====================================================================
// BattleManager
//====================================================================

//replace function to add counterSkill note check
BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    action.setAttack();
    if (subject.counterSkillId() !== 0) action.setSkill(subject.counterSkillId());
    action.apply(subject); 
    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(target, subject);
};

//====================================================================
// Scene_Map 
//====================================================================

// update Scene_Map .. this adds Actions to the MapBattles
 var _SRPG_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
     _SRPG_SceneMap_update.call(this);
     // there are definitely no map skills in play
     if (!$gameSystem.isSRPGMode()) return;

     // process extra MapActions
     while ((_triggerBattleStart === true || _finalCallMFA == true) && $gameMap.isEventRunning() !== true) {	
            // queue up _finalCallMFA 
            if (_finalCallMFA == true) {
                _finalCallMFA = false;
                this.mapForceAction(_faSkill, _faUser, _faTarget);
                return;
            }; 
            if (_triggerBattleStart === true) { 
                _triggerBattleStart = false;
                var userUnit = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
                var targetUnit = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
                $gameSystem.setSubBattlePhase('invoke_action');
                this.srpgBattleStart(userUnit, targetUnit);        
                return;
            };
     }

};

 var _srpgPreAction = Scene_Map.prototype.eventBeforeBattle;
Scene_Map.prototype.eventBeforeBattle = function() {
     _srpgPreAction.call(this);
     // if srpg mapbattle

};

 var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
Scene_Map.prototype.srpgAfterAction = function() {
     if (_callMapNextAction === true || _callSVNextAction === true) this.mfaCheck();
     _srpgAfterActionScene.call(this);
     // reset Global var
     $gameSystem._srpgForceAction = true;
     $gameSystem._mfaIsActive = false;
     // reset freeCost
     for (var i = 1; i <= $gameMap.events().length; i++) {
          var battler = $gameSystem.EventToUnit([i]);
          var eventUnit = $gameMap.event([i]);                
          if (battler && eventUnit && (battler[1] && battler[1]._freeCost === true)) {                     
              battler[1]._freeCost = false;
          };
     };
};

Scene_Map.prototype.mfaCheck = function() {
     // queue up svNextAction 
     if (_callSVNextAction === true) {
         _callSVNextAction = false;
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) $gameSystem.EventToUnit(_faUser)[1].SRPGActionTimesAdd(1);
         this.svForceAction(_faSkill, _faUser, _faTarget);
         return;
     };	
     // queue up mapNextAction 
     if (_callMapNextAction === true) {
         _callMapNextAction = false; 
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) $gameSystem.EventToUnit(_faUser)[1].SRPGActionTimesAdd(1);
         _finalCallMFA = true;
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
          userUnit[1]._freeCost = true;
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
          // move cursor to target
	  $gameTemp.setAutoMoveDestinationValid(true);
	  $gameTemp.setAutoMoveDestination($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY());
          // process action
          userUnit[1].forceAction(skill, targetUnit[1]);
          userUnit[1]._actions[0].setUserEventId();
          userUnit[1]._actions[0].setTargetEventId(); 
          userUnit[1]._freeCost = true;
          $gameSystem.setSubBattlePhase('invoke_action');
          this.srpgBattleStart(userUnit, targetUnit); 
     }
};

 var _mapCounterScene = Scene_Map.prototype.srpgMapCounter;
Scene_Map.prototype.srpgMapCounter = function(userArray, targetArray) {
     if (targetArray[1].weapons().length < 1) _mapCounterScene.call(this, userArray, targetArray);
     if (targetArray[1].weapons().length > 0) {
         // get the data
         var user = userArray[1];
	 var target = targetArray[1];
	 var action = user.action(0);
	 var reaction = null;
         //get data for activeSkil
         var activeSkill = user._actions[0].item();
	 // queue up counterattack
	 if (userArray[1] !== targetArray[1] && target.canMove() && !action.item().meta.srpgUncounterable) {
             for (var i = 0; i < target.weapons().length; i++) {
                  // add action & get skill to Mapbattle related to equiped weapons
                  // get skill 
                  var skill = target.attackSkillId();
                  var weaponMeta = target.weapons()[i].meta;
                  if (weaponMeta.srpgWeaponSkill) skill = weaponMeta.srpgWeaponSkill;
                  if (target.counterSkillId() !== 0) skill = target.counterSkillId(); //added counterskill check
                  // add action
                  target.forceAction(skill, user);
                  var reaction = target.currentAction();
                  var actFirst = (reaction.speed() > action.speed());
                  this.srpgAddMapSkill(reaction, target, user, actFirst);
                  // trigger forceAction if skill has forceAction note
                  if (reaction.item().meta.srpgForceAction) {
                     // trigger forceSetup
                     //this.forceSetup(user, target);
                  };

             };
         };
     };
};

var _addDefaultCounter = Scene_Map.prototype.srpgAddCounterAttack;
Scene_Map.prototype.srpgAddCounterAttack = function(user, target) {
     if (targetArray[1].weapons().length < 1) _addDefaultCounter.call(this, user, target);
     for (var i = 0; i < target.weapons().length; i++) {
         target.srpgMakeNewActions();
         target.action(0).setSubject(target);
         target.action(0).setAttack();
         if (target.counterSkillId() !== 0) target.action(0).setSkill(target.counterSkillId()); //added counterskill check
         this.srpgAddMapSkill(target.action(0), target, user, true);
         this._srpgSkillList[0].counter = true;
         // trigger forceAction if skill has forceAction note
         if (target.action(0).item().meta.srpgForceAction) {
             // trigger forceSetup
             this.forceSetup(user, target);
             this._srpgSkillList[0].counter = true;
         };
     };
};
Scene_Map.prototype.forceSetup = function(user, target) {
     if (!$gameSystem.isSRPGMode() == true || !$gameSystem.useMapBattle()) return;
     //var result = target.result();    
     if (user[1]._actions[0].item().meta.srpgForceAction) { // && result.isHit()
        // read skill meta data
        var metaSplit = user[1]._actions[0].item().meta.srpgForceAction.split(", ");
        var forceSkill = Number(metaSplit[0]);
        var forceUser = Number(metaSplit[1]); 
        var forceTarget = Number(metaSplit[2]);
        var skillID = 0;
        var userEID = 0;
        var targetEID = 0;
        // gameTemp active/target eventID
        if (forceUser == 0) userEID = $gameTemp.activeEvent().eventId();
        if (forceTarget == 0) targetEID = $gameTemp.targetEvent().eventId();
        //if enemy get eventID
        if (forceUser > 0) userEID = $gameSystem.EnemyUnit(forceUser);
        if (forceTarget > 0) targetEID = $gameSystem.EnemyUnit(forceTarget); 
        //if actor get eventID
        if (forceUser < 0) {
            forceUser = Number(forceUser * -1);
            userEID = $gameSystem.ActorToEvent(forceUser);
        };
        if (forceTarget < 0) {
            forceTarget = Number(forceTarget * -1);
            targetEID  = $gameSystem.ActorToEvent(forceTarget);
        };
        // get skillID
        if (forceSkill > 0) skillID = Number(forceSkill);
        if (forceSkill === 0) {  
            var unit = $gameSystem.EventToUnit(userEID);
            if (unit[1].weapons()[0] && unit[1].weapons()[0].meta.srpgWeaponSkill) {
                skillID = Number(unit[1].weapons()[0].meta.srpgWeaponSkill);
            } else {skillID = Number(unit[1].attackSkillId())};
        };

        $gameSystem.EventToUnit(userEID)[1].forceMetaAction(skillID, $gameSystem.ActorToEvent(forceTarget)[1]);
        var action = $gameSystem.EventToUnit(userEID)[1]._metaActions[0];
        return action;
    };
    return false;
};
Scene_Map.prototype.mapforceSetup = function(user, target) {
     if (!$gameSystem.isSRPGMode() == true || !$gameSystem.useMapBattle()) return;
     //var result = target.result();    
     if (user[1]._actions[0].item().meta.srpgForceAction) { // && result.isHit()
        // read skill meta data
        var metaSplit = user[1]._actions[0].item().meta.srpgForceAction.split(", ");
        var forceSkill = Number(metaSplit[0]);
        var forceUser = Number(metaSplit[1]); 
        var forceTarget = Number(metaSplit[2]);
        var skillID = 0;
        var userEID = 0;
        var targetEID = 0;
        // gameTemp active/target eventID
        if (forceUser == 0) userEID = $gameTemp.activeEvent().eventId();
        if (forceTarget == 0) targetEID = $gameTemp.targetEvent().eventId();
        //if enemy get eventID
        if (forceUser > 0) userEID = $gameSystem.EnemyUnit(forceUser);
        if (forceTarget > 0) targetEID = $gameSystem.EnemyUnit(forceTarget); 
        //if actor get eventID
        if (forceUser < 0) {
            forceUser = Number(forceUser * -1);
            userEID = $gameSystem.ActorToEvent(forceUser);
        };
        if (forceTarget < 0) {
            forceTarget = Number(forceTarget * -1);
            targetEID  = $gameSystem.ActorToEvent(forceTarget);
        };
        // get skillID
        if (forceSkill > 0) skillID = Number(forceSkill);
        if (forceSkill === 0) {  
            var unit = $gameSystem.EventToUnit(userEID);
            if (unit[1].weapons()[0] && unit[1].weapons()[0].meta.srpgWeaponSkill) {
                skillID = Number(unit[1].weapons()[0].meta.srpgWeaponSkill);
            } else {skillID = Number(unit[1].attackSkillId())};
        };
        // check if user&target have changed or if its a counter action
        if (user[1] === forceUser[1] && target[1] === forceTarget[1]) { 
            this.srpgForceAction(skillID, userID, targetID);
            forceUser[1]._freeCost = true;
            this.srpgAddMapSkill(user[1].action(0), target[1], user[1]);
        } else {
            // call action with "after action scene" because user&target have changed
            user[1].useMapForceAction(skillID, targetID);
        };return
    };
    return false;
};
    
Scene_Map.prototype.mapWieldAttack = function(user, target) {
     //get data
     var userWeapons = user[1].weapons();
     var attSkill = user[1].attackSkillId();
     var skill = 0;
     var action = user[1].currentAction();console.log(this._srpgSkillList);
              if (action.item().meta.srpgForceAction) {
                  // trigger forceSetup
                  var metaAction = this.forceSetup(user, target);console.log(metaAction);
                  this.srpgAddMapSkill(metaAction, user[1], target[1]);
              }; 
//check if this is an default attack
     if (user[1].currentAction()._item._itemId !== attSkill) return;
//
     for (var i = 1; i <= (userWeapons.length - 1); i++) {
          var weaponMeta = userWeapons[i].meta;
          // get skill 
          skill = attSkill;
          if (weaponMeta.srpgWeaponSkill) skill = weaponMeta.srpgWeaponSkill;
          if (i) { // add action & skill to Mapbattle related to equiped weapon
              
              this.srpgAddMapSkill(action, user[1], target[1]);this.srpgMapActionText(user);
              // trigger forceAction if skill has forceAction note
              if (action.item().meta.srpgForceAction) {
                  // trigger forceSetup
                  var metaAction = this.forceSetup(user, target);console.log(metaAction);
                  this.srpgAddMapSkill(metaAction, user[1], target[1]);
              };
          }; console.log(user[1].currentAction());

     };
};
Scene_Map.prototype.srpgMapForceActionSetup = function(userArray, targetArray) {
     if ($gameSystem.isSRPGMode() == true && $gameSystem.useMapBattle()) {
         //get data
         var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
         var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
         var action = user[1]._actions[0];
         var dataSkill = action._item._dataClass === "skill";
         // if skill & (wield or frorceAction) trigger wield setup
         if (dataSkill && (_srpg_Controll_MultiWield === 'true' || user[1].currentClass().meta.srpgWield || action.item().meta.srpgForceAction)) {
             this.mapWieldAttack(user, target);  
         };
     };
}; 
Game_Battler.prototype.forceMetaAction = function(skillId, targetIndex) {
    this._metaActions = [];
    var action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    this._metaActions.push(action);
};

//====================================================================
// Game_Battler & Game_BattlerBase
//====================================================================
    // this adresses the target batler in SVbattles
    Game_Battler.prototype.addSVforceAction = function(battler, skill) {
        if (!$gameSystem.isSRPGMode() || $gameSystem.useMapBattle() || !this.isAlive()) {
	    return;
        };
        if (!this.currentAction()) {
            var target = this; 
            battler._freeCost = true;
            battler.forceAction(skill, target);
            _callSVForceAction = false;
        }
    };

    var _SRPG_AAP_BattleManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        if (_withYEP_BattleEngineCore) {
            var battler = _SRPG_AAP_BattleManager_getNextSubject.call(this);
            if (battler && _callSVForceAction == true) { 
                battler.addSVforceAction(battler, _extraSkill); 
            }
        } else {
            var battler = this.getNextSubjectWithYEP();
            if (battler) {
                battler.addSVforceAction(battler, _extraSkill);
            }
        }
        return battler;
    };

// disable tp/mp cost for forced actions
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    if (this._freeCost && this._freeCost === true) return;
    this._mp -= this.skillMpCost(skill);
    this._tp -= this.skillTpCost(skill);
};

// ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);" 
Game_Battler.prototype.useMapForceAction = function(skillID, targetID) {
    // get the data (event&skill id)
    _faUser = this.event().eventId();console.log(_faUser);
    _faTarget = targetID;
    _faSkill = skillID;
    // clean up "waiting" status
    if (this._actionState == ("waiting")) {
        this.setActionState("");
    };
    // make sure that Mapbattle is used
    $gameSystem.forceSRPGBattleMode('map');
    // Enable the "MapForceAction" Trigger ,this will happen with "update Scene_Map"
    _lastUserID = Number($gameTemp.activeEvent().eventId());
    _callMapNextAction = true;
    $gameSystem._mfaIsActive = true;  
};

//====================================================================
// Game_Action
//====================================================================
// importent data info below: 
//----------------------------------------------------------------- 
// $gameSystem._wieldSlot = 1; $gameSystem._srpgForceAction = true;
// <srpgWield> (ClassNotetag) , <srpgForceAction:skillID, UserID, TargetID> (SkillNoteTag) 



Game_Action.prototype.subject = function() {
    if (this._subjectActorId > 0) {
        return $gameActors.actor(this._subjectActorId);
    } else {
        if ($gameSystem.useMapBattle() === false) return $gameTroop.members()[this._subjectEnemyIndex];
        return ($gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1]);
    }
}; 

var _srpg_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _srpg_apply.call(this ,target);
    if ($gameSystem.isSRPGMode() == true) {
        if (this._forcing == false) $gameSystem._lastNormalAction = this;
        if (this._forcing == true) $gameSystem._lastForceAction = this;
        $gameSystem._lastAction = this;
    };
    // add codechain for extra Actions to "GameActionApply"
    if ($gameSystem.isSRPGMode() == true && !$gameSystem.useMapBattle()) {
        // enable the forceAction controll switch
        if ($gameSystem._srpgForceAction === undefined) $gameSystem._srpgForceAction = true;
        // Check plugin param and userClassNote
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var gtTarget = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
        //check if this is an counter action & change user if so
        if (user[1] === target) user = gtTarget;
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
    if (this.item().meta.srpgForceAction) {
        // read skill meta data
        var metaSplit = this.item().meta.srpgForceAction.split(", ");
        var forceSkill = Number(metaSplit[0]);	
        var forceUser = Number(metaSplit[1]); 
        var forceTarget = Number(metaSplit[2]);
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
    if ($gameSystem.isSRPGMode() == true && !$gameSystem.useMapBattle()) {
        var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        var gtTarget = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
        //check if this is an counter action & change user if so
        if (user[1] === target) user = gtTarget;
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
    if (!$gameSystem.isSRPGMode() == true || $gameSystem.useMapBattle()) return;
    var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
    var gtTarget = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
    //check if this is an counter action & change user if so
    if (user[1] === target) user = gtTarget;
    var userWeapons = user[1].weapons();
    var forceSkill = user[1].attackSkillId();
    var wSlot = $gameSystem._wieldSlot;
    var targetID = $gameTemp.targetEvent().eventId();
    // only process if there is a "not used" weapon
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
                user[1].forceAction(forceSkill, -2);
            //else if Hit => transfer data & process forceAction (sv action) 
            } else {
                _extraSkill = forceSkill;
                _callSVForceAction = true;
            }; 
            //process wieldSlot controll Var
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

//====================================================================
// Game_Interpreter
//====================================================================

// scriptcall "this.triggerBattleStart();"
Game_Interpreter.prototype.triggerBattleStart = function() {
    _triggerBattleStart = true;
};

//====================================================================
// Game_Actor
//====================================================================

// overwrite default function to make sure that "actor_sv_wield_attacks" display the used wieldWeapon
Game_Actor.prototype.performAttack = function() {
    var slot = 0; // added
    if ($gameSystem._wieldSlot) slot = $gameSystem._wieldSlot - 1; // added
    var weapons = this.weapons();
    var wtypeId = weapons[slot] ? weapons[slot].wtypeId : 0; //edited "slot" instead of "0"
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
        if (attackMotion.type === 0) {
            this.requestMotion('thrust');
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing');
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile');
        }
        this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

//========================================================================================
// add global CounterSkill Note => edited code from drQs "statbasedCounter-plugin"
//========================================================================================

// check state
Game_BattlerBase.prototype.counterSkillId = function() {
    var skill = 0;
    this.states().some(function(state) {
         if (state.meta.srpgCounterSkill) {
	     skill = Number(state.meta.srpgCounterSkill);
	     return true;
	 }
	 return false;
    });
    return skill;
};

// check state > equipment > class > actor
Game_Actor.prototype.counterSkillId = function() {
    var skill = Game_BattlerBase.prototype.counterSkillId.call(this);
    if (skill > 0) return skill;
    this.equips().some(function(item) {
	 if (item && item.meta.srpgCounterSkill) {
	     skill = Number(item.meta.srpgCounterSkill);
	     return true;
	 }
	 return false;
    });
    if (this.currentClass().meta.srpgCounterSkill) {
	return Number(this.currentClass().meta.srpgCounterSkill);
    }
    if (this.actor().meta.srpgCounterSkill) {
	return Number(this.actor().meta.srpgCounterSkill);
    }
    return skill;
};

// check state > equip/weapon > class > enemy
Game_Enemy.prototype.counterSkillId = function() {
    var skill = Game_BattlerBase.prototype.counterSkillId.call(this);
    if (skill > 0) return skill;
    // if UnitCore plugin adds "this.equips" to enemy, check all equip
    if (this.equips()) {
 	this.equips().some(function(item) {
	     if (item && item.meta.srpgCounterSkill) {
		 skill = Number(item.meta.srpgCounterSkill);
		 return true;
	     }
	     return false;
        });
    } else { 
	if (!this.hasNoWeapons()) {
	    var weapon = $dataWeapons[this.enemy().meta.srpgWeapon];
	    if (weapon && weapon.meta.srpgCounterSkill) skill = Number(weapon.meta.srpgCounterSkill);
	}
    };
    //  if UnitCore plugin adds "Class" to enemy, check currentClass
    if (this.currentClass() && this.currentClass().meta.srpgCounterSkill) {
	return Number(this.currentClass().meta.srpgCounterSkill);
    }
    if (this.enemy().meta.srpgCounterSkill) {
	return Number(this.enemy().meta.srpgCounterSkill);
    }
    return skill;
};

//====================================================================

//====================================================================
//--End:

})();

