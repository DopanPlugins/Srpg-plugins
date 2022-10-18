//=============================================================================
// SRPG_ForceAction.js
//=============================================================================
/*:
 * @plugindesc v2.5 Adds <SRPG_ForceAction> for MultiWield & ForceAction usage in srpg
 * @author dopan (not fully bugtested!)
 *
 * 
 * @param Controll Global MultiWield
 * @desc (true) is using MultiWield on All BattleUnits depemding on the Equiped Weapons. 
 * @type boolean
 * @default false
 * 
 * @help  
 *
 * Put this plugin at the end of your SRPG plugins
 *
 * This Plugin requires the my "edited-SRPG_core" & "SRPG_UnitCore" & "SRPG_StatBasedCounter"
 *
 * This Plugin uses "forceAction" and handles SV & Map "forceActions" to add an Action to another with SkillNotes
 * You can even trigger actions by using plugin scriptcalls, which allows a lot of more complex Action&battleStart usage.
 *
 * this plugin also adds WieldAttacks:
 * - wield atts trigger att&counter action for each weapon
 *
 * 
 *
 *===========================================================================================
 * Plugin Scriptcalls: (these are only required for more complex Setups)
 *===========================================================================================
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
 * -> one action must be triggered after the other was finished,
 *   the scriptcall above will trigger by default in the after action scene)
 * -> the after action scene triggers right after  a skill common event is finished
 *
 * -> the scriptcall above will also add needed data & trigger a battlestart
 *
 *
 *--------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------- 
 * $gameTemp.srpgForceAction = function(skill, userID, targetID)
 *--------------------------------------------------------------------------------------------------------
 * this function can trigger both kind of actions (sv/map) depending on the battle system setup & Mapbattle skillnote. 
 *
 * if that happens while an action where user & target are the same as before,
 * this will happen in the same battle action.
 * Or else it will trigger a new BattleAction after the after aktion scene..
 * (same happens on skillNote triggered ForcedActions,cause of timing)
 * 
 *
 *
 *
 *-------------------------------------------------------------------------------------------------------
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
 *
 *-------------------------------------------------------------------------------------------------------
 * Plugin NoteTags 
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
 *  ===========================================================================================
 *  ===========================================================================================
 *
 * Known Issue:
 * - on wield counters, only the first weapon will use the counterskill_ID 
 * (for Units with more than 1 weapon better use the weapon skills to define which skill is used)
 *
 *
 * 
 * 
 *
 * ===========================================================================================
 * Terms of Use
 * ===========================================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ===========================================================================================
 * Changelog 
 * ===========================================================================================
 * Version 2.5:
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
 *            - 2.4 => Fixed Counter not depending on skill range (now they do depend on it)
 *            - 2.5 => reworked plugin code and made bugfixes 
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
  var _metaUser = -1; 
  var _metaTarget = -1;
  var _extraSkill = -1;  
  var _callSVForceAction = false;
  var _callSVNextAction = false;
  var _callSVComboActor = false;
  var _callMapNextAction = false;
  var _finalCallMFA = false;
  var _triggerBattleStart = false;


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

// update Scene_Map 
 var _SRPG_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
     _SRPG_SceneMap_update.call(this);
     // there are definitely no map skills in play
     if (!$gameSystem.isSRPGMode()) return;

     // process extra MapActions // && $gamePlayer.canMove() == true
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

// pre action scene	
 var _srpgPreAction = Scene_Map.prototype.eventBeforeBattle;
Scene_Map.prototype.eventBeforeBattle = function() {
     _srpgPreAction.call(this);
     // if srpg mapbattle

};	

// after action scene	
 var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
Scene_Map.prototype.srpgAfterAction = function() {
     _srpgAfterActionScene.call(this);
     if (_callMapNextAction === true || _callSVNextAction === true) this.mfaCheck();
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
	
// add stuff dierectly to the MapAction battle Chain
Scene_Map.prototype.srpgMapForceActionSetup = function(userArray, targetArray) {
     if ($gameSystem.isSRPGMode() == true && $gameSystem.useMapBattle()) {
         //get data
         var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
         var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
         var action = user[1]._actions[0];
         var dataSkill = action._item._dataClass === "skill";
         // if skill & (wield or forceAction) trigger wield setup
         if (dataSkill) { 
	    if (_srpg_Controll_MultiWield === 'true' || user[1].currentClass().meta.srpgWield || action.item().meta.srpgForceAction) { 
                this.mapWieldAttack(user, target); 
	    };
         };
     };
}; 

// handle mapWieldAttack & srpgForceAction skillNote	
Scene_Map.prototype.mapWieldAttack = function(user, target) {
     //get data
     var userWeapons = user[1].weapons();
     var attSkill = user[1].attackSkillId();
     var skill = 0;
     var action = user[1].currentAction();
     // trigger srpgForceAction skillNote if SkillNote
     if (action.item().meta.srpgForceAction) {
         // transfer meta data to plugin var
         $gameTemp.getForceMeta();
         if (_faUser == $gameTemp.activeEvent().eventId()) {
            // if User hasnt changed add MapAction
            var metaAction = this.forceMetaSetup(user, target);
            this.srpgAddMapSkill(metaAction, $gameSystem.EventToUnit(_metaUser)[1], $gameSystem.EventToUnit(_metaTarget)[1]);
            // if user has Changed Trigger new MapAction 
         } else {$gameSystem.EventToUnit(_faUser)[1].useMapForceAction(_faSkill, _faTarget)};
     }; 
     //check if this is an default attack ,if not stop here
     if (user[1].currentAction()._item._itemId !== attSkill) return;
     //trigger wieldAtts based on equiped weapons
     for (var i = 1; i <= (userWeapons.length - 1); i++) {
          var weaponMeta = userWeapons[i].meta;
          // get skill 
          skill = attSkill;
          if (weaponMeta.srpgWeaponSkill) skill = weaponMeta.srpgWeaponSkill;
          if (i) { 
              // add skill for next weapon
              this.srpgAddMapSkill(action, user[1], target[1]);this.srpgMapActionText(user);
              // trigger forceAction if skill has forceAction note
              if (action.item().meta.srpgForceAction) {
                  // trigger srpgForceAction skillNote
                  var metaWieldAction = this.forceMetaSetup(user, target);
                  this.srpgAddMapSkill(metaWieldAction, $gameSystem.EventToUnit(_metaUser)[1], $gameSystem.EventToUnit(_metaTarget)[1]);
              };
          };
     };
};

Scene_Map.prototype.forceMetaSetup = function(user, target) {
     if (!$gameSystem.isSRPGMode() == true || !$gameSystem.useMapBattle()) return;
     //var result = target.result();    
     if (user[1]._actions[0].item().meta.srpgForceAction) { 
        $gameTemp.getForceMeta();
	// store metaBattlers eventID     
	_metaUser = _faUser;
	_metaTarget = _faTarget;
        // store metaAction
        $gameSystem.EventToUnit(userEID)[1].forceMetaAction(skillID, $gameSystem.ActorToEvent(forceTarget)[1]);
        var action = $gameSystem.EventToUnit(userEID)[1]._metaActions[0];
        return action;
    };
    return false;
};

// handle wield & srpgForceAction skillnote on counterScene	
 var _mapCounterScene = Scene_Map.prototype.srpgMapCounter;
Scene_Map.prototype.srpgMapCounter = function(userArray, targetArray) {
     if (targetArray[1].weapons().length < 1) _mapCounterScene.call(this, userArray, targetArray);
        if (_srpg_Controll_MultiWield === 'true' || user[1].currentClass().meta.srpgWield) {		
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
                         var metaWieldAction = this.forceMetaSetup(user, target);
                         this.srpgAddMapSkill(metaWieldAction, _metaUser[1], _metaTarget[1]);
                      };
                  };
               }; 
        };
     };
};	

// handle wield & srpgForceAction skillnote on counterScene
var _addDefaultCounter = Scene_Map.prototype.srpgAddCounterAttack;
Scene_Map.prototype.srpgAddCounterAttack = function(user, target) {
     if (target[1].weapons().length < 1) _addDefaultCounter.call(this, user, target);
     for (var i = 0; i < target.weapons().length; i++) {
         target.srpgMakeNewActions();
         target.action(0).setSubject(target);
         target.action(0).setAttack();
         if (target.counterSkillId() !== 0) target.action(0).setSkill(target.counterSkillId());//added counterskill check
         this.srpgAddMapSkill(target.action(0), target, user, true);
         this._srpgSkillList[0].counter = true;
         // trigger forceAction if skill has forceAction note
         if (reaction.item().meta.srpgForceAction) {
            var metaWieldAction = this.forceMetaSetup(user, target);
            this.srpgAddMapSkill(metaWieldAction, _metaUser[1], _metaTarget[1]);
	 };
     };
};


// checks if any Action should be triggered with "after action scene"
Scene_Map.prototype.mfaCheck = function() {
     // queue up svNextAction 
     if (_callSVNextAction === true) {
         _callSVNextAction = false;
         var user = $gameSystem.EventToUnit(_faUser)[1];
	 $gameTemp.setAutoMoveDestinationValid(true);
	 $gameTemp.setAutoMoveDestination(user.event().posX(), user.event().posY());
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) user.SRPGActionTimesAdd(1);
         this.svForceAction(_faSkill, _faUser, _faTarget);
         return;
     };	
     // queue up mapNextAction 
     if (_callMapNextAction === true) {
         _callMapNextAction = false; 
         var user = $gameSystem.EventToUnit(_faUser)[1];
	 $gameTemp.setAutoMoveDestinationValid(true);
	 $gameTemp.setAutoMoveDestination(user.event().posX(), user.event().posY());
         // if new user ,disable turnEnd trigger by adding "actionTimeAdd + 1"
         if (_lastUserID !== _faUser) user.SRPGActionTimesAdd(1);
         _finalCallMFA = true;
         return;
     };
};

// SV_Action triggered with "after action scene"
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
          this.srpgMapActionText(userUnit);
          $gameSystem.setSubBattlePhase('invoke_action');
          this.srpgBattleStart(userUnit, targetUnit); 
     }
};	

// Map_Action triggered with "after action scene"
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

//====================================================================
// Game_Battler & Game_BattlerBase
//====================================================================

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
    _lastUserID = Number($gameTemp.activeEvent().eventId());
    _callMapNextAction = true;
    $gameSystem._mfaIsActive = true;  
}; 

// build storage for metaActions
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
 
// this adresses the target batler in SVbattles to add actions to user/battler
Game_Battler.prototype.addSVforceAction = function(battler, skill) {
    if (!$gameSystem.isSRPGMode() || $gameSystem.useMapBattle() || !this.isAlive()) return;
        if (!this.currentAction()) {
            var target = this; 
            battler._freeCost = true;
            battler.forceAction(skill, target);
            _callSVForceAction = false;
        };
};

// disable tp/mp cost for forced actions
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    if (this._freeCost && this._freeCost === true) return;
    this._mp -= this.skillMpCost(skill);
    this._tp -= this.skillTpCost(skill);
};

//====================================================================
// BattleManager
//====================================================================

// add stuff dierectly to SV battleActions
var _SRPG_AAP_BattleManager_getNextSubject = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() { 
      if (_withYEP_BattleEngineCore == 'true') {
        if (_callSVForceAction == true) var battler = this._subject;console.log(battler);
        if (_callSVForceAction == false) var battler = this.getNextSubjectWithYEP();
        if (battler && _callSVForceAction == true) { 
           battler.addSVforceAction(battler, _extraSkill); 
        }
      } else {
        if (_callSVForceAction == true) var battler = this._subject;console.log(battler);
        if (_callSVForceAction == false) var battler = _SRPG_AAP_BattleManager_getNextSubject.call(this);console.log(battler);
        if (battler && _callSVForceAction == true) { 
           battler.addSVforceAction(battler, _extraSkill);
        }
      }
return battler;
};

var _SRPG_AAP_BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
        _SRPG_AAP_BattleManager_makeActionOrders.call(this);  
        if (!$gameSystem.isSRPGMode() == true) return;      
        var battlers = this._actionBattlers;
        var user = battlers[0];
        var target = battlers[1];
        if (user.currentAction() && user.currentAction()._forcing == true) {
            user.reserveSvAction();
            battlers.push(user);
            this._actionBattlers = battlers;
            return;
        };
        if (target.currentAction() && target.currentAction()._forcing == true) { 
            target.reserveSvAction();
            battlers.push(target);
            this._actionBattlers = battlers;console.log(target);
            return;
        };
        if (user.currentAction()) {
            user.reserveSvAction();
            battlers.sort(function(a, b) {
            return a.srpgActionTiming() - b.srpgActionTiming(); 
            });
         battlers.push(user);
         this._actionBattlers = battlers;
        }
};

//====================================================================
// Game_Action
//====================================================================
// importent data info below: 
//----------------------------------------------------------------- 
// $gameSystem._wieldSlot = 1; $gameSystem._srpgForceAction = true;
// <srpgWield> (ClassNotetag) , <srpgForceAction:skillID, UserID, TargetID> (SkillNoteTag) 
 
// modify Subject related to battlemode
Game_Action.prototype.subject = function() {
    if (this._subjectActorId > 0) {
        return $gameActors.actor(this._subjectActorId);
    } else {
        if ($gameSystem.useMapBattle() === false) return $gameTroop.members()[this._subjectEnemyIndex];
        return ($gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1]);
    }
}; 

// add stuff to Apply for Sv battles
var _srpg_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _srpg_apply.call(this ,target);
    // store last actions for uttility purposes 	
    if ($gameSystem.isSRPGMode() == true) {
        if (this._forcing == false) $gameSystem._lastNormalAction = this;
        if (this._forcing == true) $gameSystem._lastForceAction = this;
        $gameSystem._lastAction = this;
    };
    // add codechain for extra Actions to "GameActionApply" in SV battles
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

// check Notetag & plugin param, to process svWield attacks based on equiped weapons
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

// process & trigger svWield action
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

// process forceActionNote Setup (used on Sv Wield & SkillNote ForceActions)
Game_Action.prototype.srpgForceActionSetup = function(target) {    
    if (this.item().meta.srpgForceAction) {
        // read skill meta data
        $gameTemp.getForceMeta();
        // process srpgForceAction
        $gameTemp.srpgForceAction(_faSkilID, _faUser, _faTarget);
        return true;
    };
return false;
};

//====================================================================
// Game_Temp 
//====================================================================
//(This is part of the Game_Action Chain, game_Temp is only used for better scriptcall usage)

//ForceAction trigger function
Game_Temp.prototype.srpgForceAction = function(skill, userID, targetID) { 
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

// read and store skillnote meta 
Game_Temp.prototype.getForceMeta = function () { 
    var user = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId()); 
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
    _faUser = userEID;
    _faTarget = targetEID;
    _faSkill = skillID;
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
// experimental
//====================================================================





//--End:

})();

