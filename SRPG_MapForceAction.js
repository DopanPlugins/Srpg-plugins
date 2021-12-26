//=============================================================================
// SRPG_MapForceAction.js
//=============================================================================
/*:
 * @plugindesc v1.3 Adds <SRPG_MapForceAction> ScriptCalls to SRPG 
 * @author dopan (UNDER CONSTRUCTION! DO NOT DoanLoad!)
 *
 * @param MFAisAktive_SwitchID 
 * @desc SwitchID of MFAisAktive_Switch,used to disable mapAktionText & preActionPhase
 * @type switch
 * @default 0
 *´
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
 * - "$gameSystem.EventToUnit(eventiD)[1].useMapForceExtraAction(extraSkillID);"
 *-------------------------------------------------------------------------------------------------------
 * Example : "$gameSystem.EventToUnit(eventiD)[1].useMapForceExtraAction(10);"
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
 * ===========================================================================================
 * Terms of Use
 * ===========================================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ===========================================================================================
 * Changelog 
 * ===========================================================================================
 * Version 1.3:
 * - updated Release 02.10.2020 for SRPG (rpg mv)! 
 *  =>better compatiblety and reworked Functions
 * CREDITS: 
 * - DrQ & his plugin SRPG_MapBattle.js
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_MapForceAction") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_MapForceAction>'); });

  var _mfaIsAktiveSwitch = Number(parameters['MFAisAktive_SwitchID'] || 0); 
  var _mfaDuoUser = -1;
  var _mfaTarget = -1;
  var _callMapForceAction = false; // default Disabled
  var _callMapForceExtraAction = false; // default Disabled
  var _callMapForceDuoAction = false; // default Disabled

//-----------------------------------------------------------------------------------------
//Plugin Scene_Map_update Function:

	// update Scene_Map .. this adds Actions to the MapBattles
	var _SRPG_SceneMap_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_SRPG_SceneMap_update.call(this);
		// there are definitely no map skills in play
		if (!$gameSystem.isSRPGMode() || $gameSystem.isSubBattlePhase() !== 'invoke_action' || !$gameSystem.useMapBattle()) {
		    return;
		}
		// process extra Actions 
		while (_callMapForceExtraAction == true || _callMapForceDuoAction == true || _callMapForceAction == true) {
                      // queue up extra MapBattleActionNote //
        	      if (_callMapForceExtraAction == true) {
                          var actionArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
                          var targetArray = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               this.srpgBattleStart(actionArray, targetArray);
                               _callMapForceExtraAction = false;
            	               return;
                          }
        	      };                     
                      // queue up extra MapDoubleAction //
        	      if (_callMapForceDuoAction == true) {
                          var actionArray = $gameSystem.EventToUnit(_mfaDuoUser);
                          var targetArray = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               this.srpgBattleStart(actionArray, targetArray);
                               _callMapForceDuoAction = false;
            	               return;
                          }
        	      }; 
                      // queue up extra MapForceAction 
        	      if (_callMapForceAction == true) {
                          var actionArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
                          var targetArray = $gameSystem.EventToUnit(_mfaTarget);
                          if ((!actionArray[1].isDead()) && (!targetArray[1].isDead())) { 
                               this.srpgBattleStart(actionArray, targetArray);
                               _callMapForceAction = false;
            	               return;
                          }
        	      }; 
		}
        };

//====================================================================
//Game_Battler
//====================================================================

        //ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceExtraAction(extraSkillID);"
        Game_Battler.prototype.useMapForceExtraAction = function(extraSkillID) {
            // clean up "waiting" status
            if (this._actionState == ("waiting")) {
                this.setActionState("");
            };
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all target data => -2
            this.forceAction(extraSkillID, -2);
            // Enable the "MapForceActionNote" Trigger ,this will happen with "update Scene_Map"
            _callMapForceExtraAction = true;
            // MFA is Aktive Switch 
            $gameSwitches.setValue(_mfaIsAktiveSwitch, true);  
        };

        //ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceDuoAction(duoSkillID, duoUserID);"
        Game_Battler.prototype.useMapDuoAction = function(duoSkillID, duoUserID) {
            // get the data (event&skill id)
            _mfaDuoUser = duoUserID;
            // insert event id 
            var actionArray = $gameSystem.EventToUnit(_mfaDuoUser);
            var targetArray = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
            // clean up "waiting" status
            if (actionArray[1]._actionState == ("waiting")) {
                actionArray[1].setActionState("");
            };
            // make sure that active event is set properly before "ForceAction" is used
            $gameTemp.setActiveEvent($gameMap.event(_mfaDuoUser));
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all needed data..
            actionArray[1].forceAction(duoSkillID, targetArray[1]);
            // Enable the "MapDoubleAction" Trigger ,this will happen with "update Scene_Map"
            _callMapForceDuoAction = true;
            // MFA is Aktive Switch  
            $gameSwitches.setValue(_mfaIsAktiveSwitch, true);
        };
	
        //ScriptCall = "$gameSystem.EventToUnit(eventiD)[1].useMapForceAction(skillID, targetID);" 
        Game_Battler.prototype.useMapForceAction = function(skillID, targetID) {
            // get the data (event&skill id)
            _mfaTarget = targetID;
            //insert event id 
            var targetArray = $gameSystem.EventToUnit(targetID);
            // clean up "waiting" status
            if (this._actionState == ("waiting")) {
                this.setActionState("");
            };
            // make sure that active & target event are set properly before "ForceAction" is used
            //$gameTemp.setActiveEvent($gameMap.event(this.event().eventId()));
            $gameTemp.setTargetEvent($gameMap.event(_mfaTarget));
            // make sure that Mapbattle is used
            $gameSystem.forceSRPGBattleMode('map');
            // add New Action including Skill_ID and all needed data..
            this.forceAction(skillID, targetArray[1]);
            // Enable the "MapForceAction" Trigger ,this will happen with "update Scene_Map"
            _callMapForceAction = true; 
            // MFA is Aktive Switch 
            $gameSwitches.setValue(_mfaIsAktiveSwitch, true);  
        };


//--End:

})();
