//=============================================================================
// SRPG_MapForceAction.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_MapForceAction> ScriptCall to SRPG 
 * @author dopan
 *
 * @param DisableText_SwitchID 
 * @desc SwitchID of DisableText_Switch for MapActionText
 * @type switch
 * @default 0
 *
 * @param UsedCE_ID
 * @desc Variable ID of the Used-CommonEvent for MapActionText
 * @type common_event
 * @default 1
 *
 * @param UsedSkillVarID
 * @desc Variable ID of the Used-Skill for MapActionText
 * @type variable
 * @default 1
 *
 *
 *
 * @help  
 *
 * This Plugin helps to replicate the "force Action" Function for skills in: MapBattle"True" BattleMode.
 * the Plugin ScriptCall will activate a "force Action" on Map without using "SV battleMode"
 * Note: the Plugin is still experimental pls report any Bugs or Issues u might find.
 *
 * => Note, added skills will still be affected by "Skillrange" ect.. 
 * 
 * => this plugin needs the Plugin SRPG_Mapbattle.js & SRPG_Core.js and works as Extension..
 *
 *
 * => AOEs Skills cant be used for the Skill_IDs of these Scriptcalls..
 *
 *
 * Note:- "MapForceAction" uses NO "Scene_map Functions",thats why this works different than "MapForceActionNote" & "MapDoubleAction"
 *
 *      -"MapForceActionNote" & "MapDoubleAction"  works with "Scene_map Functions" and Add Actions to the MapBattle Setup,
 *        which is made in the "SRPG_MapBattle.js" Plugin.
 *
 *
 * Plugin Scriptcalls:
 *---------------------
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "this.isMapForceAction(userID, targetID, skillID, payCost);"
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * Example : "this.isMapForceAction(9, 28, 1, true);"
 *
 * => this will forceAction, with "user"(event id 9 ),"target"(event id 28 ),using "Skill 1" with "PayCost"= true
 *
 * => there is an Example for this in the Updated-SRPG_demo. 
 * => this is NOT for Custom Execution usage and it doesnt check for "counter,reflect..ect"
 * => it also doesnt open a battle result window.. its just the Action & its Animation & Dmg PopUp.
 * => this can be used with eventing, for Story Sequenses in the Battle Map,
 *    when the right (selfmade) "if Conditions" are solved..
 * 
 * => this Function doesnt work with "Scene_map" like "Mapbattle.js" does, thats why it works a bit different..
 * => thats why DirectionalAnimations wont work and why MovingAnimations only work if created in Switch-triggered_CommonEvents..
 *
 * => this Function has no PreAction Phase(the Code is disabled ,can be changed) ,but it has a PostAction Phase 
 *   (thats because PreAction Phase would trigger after the Effect in this Function)
 *
 * there is an Exampel Event (little girl next to chuck) to test this function:
 * Used Skills that use Custom Execution(like MovingAnimations), need to happen with "Switch"-triggered CEs in Custom Execution
 * and NOT "reserve common event" because this Function let Custom Execution-"reserve common event" happen later..
 *  ("switch usage" on parrallel CommonEvents works fine!)
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "this.isMapForceActionNote(skillNoteID, payCost);"
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * Example : "this.isMapForceActionNote(10, false);"
 * 
 * => this will add a second attack if used in a Custom Ex SkillNoteTag CommonEvent ,..
 *   ..using "Skill 10" with "PayCost"= false 
 *
 * this is only for usage in "Custom Execution" triggered CommonEvent in order to add a Skill to another..
 *
 * => there is an Example Skill for this in the Updated-SRPG_demo ..
 * => "PayCost = false" can Disable "user Animation" & "Custom Execution-Notetag"-trigger of added Action_Skill
 *
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * - "this.isMapDoubleAction(daUserID, daSkillID, payCost);"
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * Example : "this.isMapDoubleAction(2, 10, true);" 
 * ..(this is for "Custom Execution" similar to "MapForceActionNote")
 * 
 * => this will add a second attack if used in a Custom Ex SkillNoteTag ,..
 *   ..using "Skill 10" with "PayCost"= true 
 *
 * => this attack will be used from another Unit(helper) on the same target.
 * => by default the normal Skill user wont consume his turn this way, but the"helper" Unit will..
 * => i added an eventing solution in CommonEvents (only 1 example) to show how to edit "turn of Unit"..
 * => so in the demo this Example skill will seem to work "normal" about the "consume turn behavior".
 * => payCost change in this skill will affect BOTH Units !(skill user and skill helper)
 * => this can be used for "friend-Combo"attacks" for example..
 *
 * this is only for usage in "Custom Execution" triggered CommonEvent in order to add a Skill to another..
 * => "PayCost = false" can Disable "user Animation" & "Custom Execution-Notetag"-trigger of added Action_Skill
 * => there is an Example Skill for this in the Updated-SRPG_demo ..
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 *-------------------------------------------------------------------------------------------------------
 * The MapActionText Function is basicly A Plugin Common Event that get triggered at MapBattleStart
 * 
 * => there is an Example for this in the Updated-SRPG_demo ..
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
 * Version 1.2:
 * - updated Release 02.10.2020 for SRPG (rpg mv)! 
 *  =>better compatiblety and reworked Functions
 * CREDITS: 
 * - DrQ & his plugin SRPG_MapBattle.js
 * - caethyril thx for the help in the forum^^ 
 *  (needed for "this.isMapForceAction" Script Code) 
 */
 
(function() {

  // Plugin param Variables:

  var parameters = $plugins.filter(function (plugin) { return plugin.description.contains('SRPG_MapForceAction'); });
  var parameters = PluginManager.parameters("SRPG_MapForceAction");

  var _usedCE =  Number(parameters['UsedCE_ID'] || 1); // Used for "MapActionText"
  var _usedSkill = Number(parameters['UsedSkillVarID'] || 1);
  var _disableTextSwitch = Number(parameters['DisableText_SwitchID'] || 0); 

  var coreParameters = PluginManager.parameters('SRPG_core');
  var _srpgTroopID = Number(coreParameters['srpgTroopID'] || 1);
  var _rewardSe = coreParameters['rewardSound'] || 'Item3';

  var _mapForceDoubleActionUser = 1 || daUserID;
  var _mapForceDoubleActionTarget = 1 || daTargetID;
  var _mapForceDoubleActionSkill = 1 || daSkillID;

  var _mapForceUserNote = 1 || userNoteID;
  var _mapForceTargetNote = 1 || targetNoteID;
  var _mapForceSkillNote = 1 || skillNoteID;

  var _mapForceUser = 1 || userID;
  var _mapForceTarget = 1 || targetID;
  var _mapForceSkill = 1 || skillID;

  var _mapForceTestUser = 1 || userTestID;
  var _mapForceTestTarget = 1 || targetTestID;
  var _mapForceTestSkill = 1 || skillTestID;

  var _mapForcePayCost = 'true' || 'false' || payCost;
  var _sceneMapProto = Scene_Map.prototype;core

  var mapbattleParameters = PluginManager.parameters('SRPG_MapBattle');
  var _animDelay = Number(mapbattleParameters['SRPG_MapBattle'] || coreParameters['SRPG_MapBattle'] || -1);
  var _BeforeMapBattleCE =  Number(mapbattleParameters['BeforeMapBattleCE_ID'] || coreParameters['SRPG_MapBattle'] || 1);
  var _changed_Skill_CE_Timing = Number(mapbattleParameters['Skill_CE_Timing_SwitchID'] || coreParameters['SRPG_MapBattle'] || 0);

  var _callMapForceAction = false; // default Disabled

  var _callMapForceActionTest = false; // default Disabled
  var _callMapBattleTest = false; // default Disabled

  var _callMapForceActionNote = false; // default Disabled
  var _callMapBattleNote = false; // default Disabled

  var _callMapForceDoubleAction = false; // default Disabled
  var _callMapBattleDA = false; // Disabled by Default
//-----------------------------------------------------------------------------------------



//Plugin Function:


	// set up the map attacks for "ForceDoubleAction"	
        var _forceDoubleAction = Scene_Map.prototype.forceDoubleAction;
	Scene_Map.prototype.forceDoubleAction = function(userArray, targetArray) {
             // check if "_callMapBattleDA == true" and reset it.
             if (_callMapBattleDA == true ) {          
                _callMapBattleDA = false;

		// get the data
		var user = userArray[1];
		var target = targetArray[1];
		var action = user.action(0);
		var reaction = null;

		// prepare action timing
		user.setActionTiming(0);
		if (user != target) target.setActionTiming(1);

		// pre-skill setup
		$gameSystem.clearSrpgStatusWindowNeedRefresh();
		$gameSystem.clearSrpgBattleWindowNeedRefresh();

		// make free actions work
		var addActionTimes = Number(action.item().meta.addActionTimes || 0);
		if (addActionTimes > 0) {
			user.SRPGActionTimesAdd(addActionTimes);
		}

                // user look at target
		this.preBattleSetDirection();

		// set up the troop and the battle party
		$gameTroop.clearSrpgBattleEnemys();
		$gameTroop.clear();
		$gameParty.clearSrpgBattleActors();
		if (userArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(user);
		else $gameParty.pushSrpgBattleActors(user);
		if (targetArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(target);
		else $gameParty.pushSrpgBattleActors(target);
		BattleManager.setup(_srpgTroopID, false, true);
		action.setSubject(user);

                //queue up the Action: //default = "this.srpgAddMapSkill(action, user, target);"
		// check if "_callMapForceDoubleAction == true" & if so, reset its check_Switch.
                if (_callMapForceDoubleAction == true ) {
                    // queue the edited action 
                    this.srpgAddMapSkill(action, user, target);
                    _callMapForceDoubleAction = false;

                };			

		// queue up counterattack
		if (userArray[0] !== targetArray[0] && target.canMove() && !action.item().meta.srpgUncounterable) {
			target.srpgMakeNewActions();
			reaction = target.action(0);
			reaction.setSubject(target);
			reaction.setAttack();
			var actFirst = (reaction.speed() > action.speed());
			this.srpgAddMapSkill(reaction, target, user, actFirst);
		}

                // Check payCost // if "paycost==false", disables a few things one of them will be rebuilded here.
		if ($gameTemp.shouldPayCost() == false) {		
                    // Replicate Animation Setup
	            var castAnim = false;
		    // cast animation, is a skill, isn't an attack or guard
		    if (action.item().castAnimation && action.isSkill() && !action.isAttack() && !action.isGuard()) {
			user.event().requestAnimation(action.item().castAnimation);
			castAnim = true;
		    }
		    // target animation
		    if (action.item().meta.targetAnimation) {
			$gamePlayer.requestAnimation(Number(action.item().meta.targetAnimation));
			castAnim = true;
		    }
		    // directional target animation
		    if (action.item().meta.directionalAnimation) {
		        var dir = user.event().direction()/2 - 1;
		        $gamePlayer.requestAnimation(dir + Number(action.item().meta.directionalAnimation));
			castAnim = true;
		    }
                }
             }
	};

	// set up the map attacks for "MapActionNote"
	var _forceMapBattle = Scene_Map.prototype.forceMapBattle;
	Scene_Map.prototype.forceMapBattle = function(userArray, targetArray) {
             // check if "_callMapBattleNote == true" and reset it.
             if (_callMapBattleNote == true ) {          
                _callMapBattleNote = false;

		// get the data
		var user = userArray[1];
		var target = targetArray[1];
		var action = user.action(0);
		var reaction = null;

		// prepare action timing
		user.setActionTiming(0);
		if (user != target) target.setActionTiming(1);

		// pre-skill setup
		$gameSystem.clearSrpgStatusWindowNeedRefresh();
		$gameSystem.clearSrpgBattleWindowNeedRefresh();

		// make free actions work
		var addActionTimes = Number(action.item().meta.addActionTimes || 0);
		if (addActionTimes > 0) {
			user.SRPGActionTimesAdd(addActionTimes);
		}

                // user look at target
		this.preBattleSetDirection();

		// set up the troop and the battle party
		$gameTroop.clearSrpgBattleEnemys();
		$gameTroop.clear();
		$gameParty.clearSrpgBattleActors();
		if (userArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(user);
		else $gameParty.pushSrpgBattleActors(user);
		if (targetArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(target);
		else $gameParty.pushSrpgBattleActors(target);
		BattleManager.setup(_srpgTroopID, false, true);
		action.setSubject(user);

                //queue up the Action: // this.srpgAddMapSkill(action, user, target);            
		// check if we are using  "mapForceActionNote" & if so, reset its check_Switch.
                if (_callMapForceActionNote == true ) {        
                    // queue the edited action
                    this.srpgAddMapSkill(action, user, target);
                    _callMapForceActionNote = false;
                };

		// queue up counterattack
		if (userArray[0] !== targetArray[0] && target.canMove() && !action.item().meta.srpgUncounterable) {
			target.srpgMakeNewActions();
			reaction = target.action(0);
			reaction.setSubject(target);
			reaction.setAttack();
			var actFirst = (reaction.speed() > action.speed());
			this.srpgAddMapSkill(reaction, target, user, actFirst);
		}

                // Check payCost // if "paycost==false", disables a few things one of them will be rebuilded here.
		if ($gameTemp.shouldPayCost() == false) {		
                    // Replicate Animation Setup
	            var castAnim = false;
		    // cast animation, is a skill, isn't an attack or guard
		    if (action.item().castAnimation && action.isSkill() && !action.isAttack() && !action.isGuard()) {
			user.event().requestAnimation(action.item().castAnimation);
			castAnim = true;
		    }
		    // target animation
		    if (action.item().meta.targetAnimation) {
			$gamePlayer.requestAnimation(Number(action.item().meta.targetAnimation));
			castAnim = true;
		    }
		    // directional target animation
		    if (action.item().meta.directionalAnimation) {
		        var dir = user.event().direction()/2 - 1;
		        $gamePlayer.requestAnimation(dir + Number(action.item().meta.directionalAnimation));
			castAnim = true;
		    }
                }
             }
	};

	// set up the map attacks for "MapBattleTest"
	var _forceMapBattleTest = Scene_Map.prototype.forceMapBattleTest;
	Scene_Map.prototype.forceMapBattleTest = function(userArray, targetArray) {
             // check if "_callMapBattleTest == true" and reset it.
             if (_callMapBattleTest == true ) {          
                _callMapBattleTest = false;

		// get the data
		var user = userArray[1];
		var target = targetArray[1];
		var action = user.action(0);
		var reaction = null;

		// prepare action timing
		user.setActionTiming(0);
		if (user != target) target.setActionTiming(1);

		// pre-skill setup
		$gameSystem.clearSrpgStatusWindowNeedRefresh();
		$gameSystem.clearSrpgBattleWindowNeedRefresh();

		// make free actions work
		var addActionTimes = Number(action.item().meta.addActionTimes || 0);
		if (addActionTimes > 0) {
			user.SRPGActionTimesAdd(addActionTimes);
		}

                // user look at target
		this.preBattleSetDirection();

		// set up the troop and the battle party
		$gameTroop.clearSrpgBattleEnemys();
		$gameTroop.clear();
		$gameParty.clearSrpgBattleActors();
		if (userArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(user);
		else $gameParty.pushSrpgBattleActors(user);
		if (targetArray[0] === 'enemy') $gameTroop.pushSrpgBattleEnemys(target);
		else $gameParty.pushSrpgBattleActors(target);
		BattleManager.setup(_srpgTroopID, false, true);
		action.setSubject(user);

                //queue up the Action: // this.srpgAddMapSkill(action, user, target);            
		// check if we are using  "mapForceActionNote" & if so, reset its check_Switch.
                if (_callMapForceActionTest == true ) {        
                    // queue the edited action
                    this.srpgAddMapSkill(action, user, target);
                    _callMapForceActionTest = false;
                };

		// queue up counterattack
		if (userArray[0] !== targetArray[0] && target.canMove() && !action.item().meta.srpgUncounterable) {
			target.srpgMakeNewActions();
			reaction = target.action(0);
			reaction.setSubject(target);
			reaction.setAttack();
			var actFirst = (reaction.speed() > action.speed());
			this.srpgAddMapSkill(reaction, target, user, actFirst);
		}

                // Check payCost // if "paycost==false", disables a few things, one of them will be rebuilded here.
		if ($gameTemp.shouldPayCost() == false) {		
                    // Replicate Animation Setup
	            var castAnim = false;
		    // cast animation, is a skill, isn't an attack or guard
		    if (action.item().castAnimation && action.isSkill() && !action.isAttack() && !action.isGuard()) {
			user.event().requestAnimation(action.item().castAnimation);
			castAnim = true;
		    }
		    // target animation
		    if (action.item().meta.targetAnimation) {
			$gamePlayer.requestAnimation(Number(action.item().meta.targetAnimation));
			castAnim = true;
		    }
		    // directional target animation
		    if (action.item().meta.directionalAnimation) {
		        var dir = user.event().direction()/2 - 1;
		        $gamePlayer.requestAnimation(dir + Number(action.item().meta.directionalAnimation));
			castAnim = true;
		    }
                }
             }
	};
		        
	// update Scene_Map .. this adds Actions to the MapBattles
	var _SRPG_SceneMap_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_SRPG_SceneMap_update.call(this);

		// there are definitely no map skills in play
		if (!$gameSystem.isSRPGMode() || $gameSystem.isSubBattlePhase() !== 'invoke_action' || !$gameSystem.useMapBattle()) {
			return;
		}

		// process extra Actions 
		while (_callMapForceActionNote == true || _callMapForceDoubleAction == true || _callMapForceActionTest == true) {

                      // queue up extra MapBattleActionNote //
        	      if (_callMapForceActionNote == true) {
                          var actionArray = $gameSystem.EventToUnit(_mapForceUserNote);
                          var targetArray = $gameSystem.EventToUnit(_mapForceTargetNote);
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               this.forceMapBattle(actionArray, targetArray);
            	               return;
                          }
        	      };                     

                      // queue up extra MapDoubleAction //
        	      if (_callMapForceDoubleAction == true) {
                          var actionArray = $gameSystem.EventToUnit(_mapForceDoubleActionUser);
                          var targetArray = $gameSystem.EventToUnit(_mapForceDoubleActionTarget);
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               this.forceDoubleAction(actionArray, targetArray);
            	               return;
                          }
        	      }; 

                      // queue up extra MapForceActionTest // for testing purposes
        	      if (_callMapForceActionTest == true) {
                          var actionArray = $gameSystem.EventToUnit(_mapForceTestUser);
                          var targetArray = $gameSystem.EventToUnit(_mapForceTestTarget);
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               $gameSystem.setSubBattlePhase('invoke_action');
                               this.forceMapBattleTest(actionArray, targetArray);
            	               return;
                          }
        	      }; 
		}
        
        };


//====================================================================
//Plugin ScriptCalls
//====================================================================

        //ScriptCall = "this.isMapForceActionNote(skillNoteID, payCost);"
        Game_Interpreter.prototype.isMapForceActionNote = function(skillNoteID, payCost) {
            // get the data
            _mapForceUserNote = $gameTemp.activeEvent().eventId();//userNoteID;
            _mapForceTargetNote = $gameTemp.targetEvent().eventId();//targetNoteID;
            _mapForceSkillNote = skillNoteID;
            _mapForcePayCost = payCost;
            var actionArray = $gameSystem.EventToUnit(_mapForceUserNote);
            var targetArray = $gameSystem.EventToUnit(_mapForceTargetNote);
            // clean up "waiting" status
            if (actionArray[1]._actionState == ("waiting")) {
                actionArray[1].setActionState("");
            };
            // make sure that active & target event are set properly before "ForceAction" is used
            $gameTemp.setActiveEvent($gameMap.event(_mapForceUserNote));
            $gameTemp.setTargetEvent($gameMap.event(_mapForceTargetNote));
            //set "PayCost" for the MapForceNote-Action
            $gameTemp.setShouldPayCost(_mapForcePayCost);
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all needed data..
            actionArray[1].forceAction(_mapForceSkillNote, targetArray[1]);
            // Enable the "MapForceActionNote" Trigger ,this will happen with "update Scene_Map"
            _callMapForceActionNote = true;
            // Enable the "ForceMapBattle" Trigger ,this will happen with "update Scene_Map"
            _callMapBattleNote = true; 
            // add Pre actionPhase
            $gameTemp.reserveCommonEvent(_BeforeMapBattleCE);
            // Disable MapActionText on this ActionNote 
            $gameSwitches.setValue(_disableTextSwitch, true);  
        };

        //ScriptCall = "this.isMapDoubleAction(daUserID, daSkillID, payCost);"
        Game_Interpreter.prototype.isMapDoubleAction = function(daUserID, daSkillID, payCost) {
            // get the data
            _mapForceDoubleActionUser = daUserID;
            _mapForceDoubleActionTarget = $gameTemp.targetEvent().eventId();// daTargetID;
            _mapForceDoubleActionSkill = daSkillID;
            _mapForcePayCost = payCost;
            var actionArray = $gameSystem.EventToUnit(_mapForceDoubleActionUser);
            var targetArray = $gameSystem.EventToUnit(_mapForceDoubleActionTarget);
            // clean up "waiting" status
            if (actionArray[1]._actionState == ("waiting")) {
                actionArray[1].setActionState("");
            };
            // make sure that active & target event are set properly before "ForceAction" is used
            $gameTemp.setActiveEvent($gameMap.event(_mapForceDoubleActionUser));
            $gameTemp.setTargetEvent($gameMap.event(_mapForceDoubleActionTarget));
            //set "PayCost" for the MapForceNote-Action
            $gameTemp.setShouldPayCost(_mapForcePayCost);
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all needed data..
            actionArray[1].forceAction(daSkillID, targetArray[1]);
            // Enable the "MapDoubleAction" Trigger ,this will happen with "update Scene_Map"
            _callMapForceDoubleAction = true;
            // Enable the "MapBattle" Trigger ,this will happen with "update Scene_Map"
            _callMapBattleDA = true;
            // add Pre actionPhase
            $gameTemp.reserveCommonEvent(_BeforeMapBattleCE);      
        };

//-----------------------------------------------------------------------------------------
// Edit and testing stuff
//-----------------------------------------------------------------------------------------

        // make the "_callMapForceAction" Global 
        // Examples for copy paste usage
        //  _SRPG_SceneMap_callMapForceAction.call(this);// only for usage in the Plugin
        //  Scene_Map.prototype.callMapForceAction.call(this);// will return the Number active in console F8
        //  Scene_Map.prototype.callMapForceAction.call(this) === 1;// will return true or false in console F8
        //var _SRPG_SceneMap_callMapForceAction = Scene_Map.prototype.callMapForceAction;
        //Scene_Map.prototype.callMapForceAction = function() {
        //  	return _callMapForceAction;
        //};

        // this Scene is not needed its for testing purposes..
        //Scene_Map.prototype.srpgMapActionEND.call(this); 
        // "this.srpgMapActionEND();" "_srpgMapActionEND.call(this);" "_sceneMapProto.srpgMapActionEND();"
        var _srpgMapActionEND = Scene_Map.prototype.srpgMapActionEND;
        Scene_Map.prototype.srpgMapActionEND = function() {
             this._MapActionEND = true;
             return true;
        };


        //ScriptCall = "this.isMapForceActionTest(userID, targetID, skillID, payCost);" // for testing purposes..
        Game_Interpreter.prototype.isMapForceActionTest = function(userID, targetID, skillID, payCost) {
            // get the data
            _mapForceTestUser = userID;
            _mapForceTestTarget = targetID;
            _mapForceTestSkill = skillID;
            _mapForcePayCost = payCost;
            var actionArray = $gameSystem.EventToUnit(_mapForceTestUser);
            var targetArray = $gameSystem.EventToUnit(_mapForceTestTarget);
            // clean up "waiting" status
            if (actionArray[1]._actionState == ("waiting")) {
                actionArray[1].setActionState("");
            };
            // make sure that active & target event are set properly before "ForceAction" is used
            $gameTemp.setActiveEvent($gameMap.event(_mapForceTestUser));
            $gameTemp.setTargetEvent($gameMap.event(_mapForceTestTarget));
            //set "PayCost" for the MapForceNote-Action
            $gameTemp.setShouldPayCost(_mapForcePayCost);
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all needed data..
            actionArray[1].forceAction(_mapForceTestSkill, targetArray[1]);
            // Enable the "MapForceActionTest" Trigger ,this will happen with "update Scene_Map"
            _callMapForceActionTest = true; 
            // Enable the "TestMapBattle" Trigger ,this will happen with "update Scene_Map"
            _callMapBattleTest = true; 
            // add Pre actionPhase
            $gameTemp.reserveCommonEvent(_BeforeMapBattleCE);
            // Disable MapActionText on this ActionNote 
            $gameSwitches.setValue(_disableTextSwitch, true);  
        };

//-----------------------------------------------------------------------------------------
// MapForceAction SETUP
//-----------------------------------------------------------------------------------------


        // this.isMapForceAction(userID, targetID, skillID, payCost);
        Game_Interpreter.prototype.isMapForceAction = function(userID, targetID, skillID, payCost) {
            _mapForceUser = userID;
            _mapForceTarget = targetID;
            _mapForceSkill = skillID;
            _mapForcePayCost = payCost;
             if ($gameSystem.isSRPGMode()) { 
                 var actionArray = $gameSystem.EventToUnit(_mapForceUser);
                 var targetArray = $gameSystem.EventToUnit(_mapForceTarget);
                 if (!actionArray[1].isDead() && !targetArray[1].isDead()) { 

                     // Prepare Action..           
                     $gameTemp.setActiveEvent($gameMap.event(_mapForceUser));
                     $gameTemp.setTargetEvent($gameMap.event(_mapForceTarget));
                     $gameTemp.setShouldPayCost(_mapForcePayCost);
                     $gameSystem.forceSRPGBattleMode('map');
                     actionArray[1].forceAction(_mapForceSkill, targetArray[1]);
                     $gameSystem.setSubBattlePhase('invoke_action');
                     this.playerMoveTo($gameTemp.targetEvent().posX(), $gameTemp.targetEvent().posY());  
          
		     // get the data   
		     var user = actionArray[1];
		     var target = targetArray[1];
		     var action = user.action(0);   
                                                             
                     // setup the chain of Commands
                     var aniCom = 212;              // Show Animation command
                     var scriptCom = 355;               // Script command
                     var ind = this._indent;     // interpreter branch depth
                     var p1 = ['this.firstActionPhaseMFA();']; // first Script Part
                     var p2 = [_mapForceUser, action.item().castAnimation, true];  //user params (char, anim, wait)
                     var p3 = [_mapForceTarget, action.item().animationId, true]; //target params (char, anim, wait)
                     var p4 = ['this.endActionPhaseMFA();']; // script happens at the end
                     // Make command objects
                     var com1 = { code: scriptCom, indent: ind, parameters: p1 };
                     var com2 = { code: aniCom, indent: ind, parameters: p2 };
                     var com3 = { code: aniCom, indent: ind, parameters: p3 };
                     var com4 = { code: scriptCom, indent: ind, parameters: p4 };
                     // Insert commands at next position
                     this._list.splice(this._index + 1, 0, com1, com2, com3, com4);

		     // prepare action timing
		     user.setActionTiming(0);
		     if (user != target) target.setActionTiming(1);

		     // make free actions work
		     var addActionTimes = Number(action.item().meta.addActionTimes || 0);
		     if (addActionTimes > 0) {
			 user.SRPGActionTimesAdd(addActionTimes);
		     } 

                 }
                 return true;
             }
        };

        // "this.firstActionPhaseMFA();"
        Game_Interpreter.prototype.firstActionPhaseMFA = function() {
             //get data
             var actionArray = $gameSystem.EventToUnit(_mapForceUser);
             var targetArray = $gameSystem.EventToUnit(_mapForceTarget);
             var user = actionArray[1];
	     var target = targetArray[1];
             var action = user.action(0);

             //use skill and apply skill CE
             user.useItem(action.item());
             action.applyGlobal();

             // call PreBattle Phase Event (disabled because it would happen after the effect)
             //$gameMap.events().forEach(function(event) {
             //if (event.isType() === 'beforeBattle') {
             //    if (event.pageIndex() >= 0) event.start();
             //    $gameTemp.pushSrpgEventList(event);
             //    }
             //});

             // Insert "MapActionText" CE
             var commonEvent = $dataCommonEvents[_usedCE];
             if (commonEvent) {
                 var eventId = this.isOnCurrentMap() ? this._eventId : 0;
                 this.setupChild(commonEvent.list, eventId);
             }
             return true;
        };

        // "this.endActionPhaseMFA();"
        Game_Interpreter.prototype.endActionPhaseMFA = function() {
             //get data
             var actionArray = $gameSystem.EventToUnit(_mapForceUser);
             var targetArray = $gameSystem.EventToUnit(_mapForceTarget);
             var user = actionArray[1];
	     var target = targetArray[1];
             var action = user.action(0);

             // trigger action and show DMG popups
             action.apply(target);
	     user.srpgShowResults();
	     target.srpgShowResults();
             // user look at target
             Scene_Map.prototype.preBattleSetDirection.call(this);
             //call ending scene
             //"_srpgMapActionEND.call(this);" // this line is not needed its for testing purposes.. 

             return true;
 
        };

//--End:

})();