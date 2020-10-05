//=============================================================================
// SRPG_UnitCall.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_UnitCall> (& Variables+Switches) for more Control over Singel Units in SRPG 
 * @author dopan
 *
 *
 *
 * 
 * @param B-Unit_AnimationVarID
 * @desc 
 * @type variable
 * @default 0
 *
 *
 * @param B-Unit_StateVarID
 * @desc  
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Affected_B-UnitID
 * @desc 
 * @type variable
 * @default 0
 *
 *
 * @param UnitDistanceVarID
 * @desc  
 * @type variable
 * @default 0
 *
 *
 *
 *
 * @param Target_UnitID
 * @desc  
 * @type variable
 * @default 0
 *
 *
 * 
 * @param Unit_y_VarID
 * @desc 
 * @type variable
 * @default 0
 *
 *
 * @param Unit_x_VarID
 * @desc  
 * @type variable
 * @default 0
 *
 *
 *
 *
 *
 * @help  
 *
 * This Plugin Uses Scriptcalls for Events with Variables,the usage is for Solo Units.. 
 * ..for Example add State or remove State of a Single Affected BattleUnit..
 * there is even a Plugin Command that allows u to Start the 2nd EventPage of an UnitEvent
 * -> we will use the 2nd ,because the first will get used to set the eventID Value to the BattleUnit
 * => this happens when the Unit is active the first time with "parrallel"-trigger..
 * .. and ends with changing the main eventPage to Page2 (Examples in the UpdatedSRPGdemo)
 * after that the EventPage 2 can be used for anything that is needed if u like to use:
 *  "this.eventId()"-script later in battle for Example ,or the EventPage can be used for whatever else..
 *
 * => Note : this Plugin may not be needed if u know how to use JS Code, Scriptcalls ect..
 *          ..but if JS Scripcalls are new for you ,this plugin might be helpfull.
 *
 *
 * Plugin Commands:
 * 
 * 
 * "SRPG_UnitCall StartEvent":
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall StartEvent" = Calls the second EventPage of AffectedUnit to Start 
 *
 *
 * "SRPG_UnitCall Teleport":
 *
 * -> *Affected_B-UnitID ->setValue* + *Unit_x_VarID ->setValue* + *Unit_y_VarID ->setValue* 
 * => Use "SRPG_UnitCall Teleport" = AffectedUnit NewPosition
 *
 *
 * "SRPG_UnitCall Revive":
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall Revive" = Revive dead AffectedUnit
 *
 *
 * "SRPG_UnitCall Recover"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall Recover" = Full Recover AffectedUnit
 *
 *
 * "SRPG_UnitCall AddState"
 *
 * -> *Affected_B-UnitID ->setValue* + *B-Unit_StateVarID ->setValue*
 * => Use "SRPG_UnitCall AddState" = Add *B-Unit_StateVarID =>Value=StateID* to AffectedUnit  
 *
 *
 * "SRPG_UnitCall RemoveState"
 *
 * -> *Affected_B-UnitID ->setValue* + *B-Unit_StateVarID ->setValue*
 * => Use "SRPG_UnitCall RemoveState" = Remove *B-Unit_StateVarID =>Value=StateID* from AffectedUnit  
 *
 *
 * "SRPG_UnitCall Animation"
 *
 * -> *Affected_B-UnitID ->setValue* + *B-Unit_AnimationVarID ->setValue*
 * => Use "SRPG_UnitCall Animation" = Request Animation on AffectedUnit (no wait delay)
 *
 *
 * "SRPG_UnitCall Distance"
 *
 * -> *Affected_B-UnitID ->setValue* + *Target_UnitID ->setValue* + *UnitDistanceVarID must be set in Plugin*
 * => Use "SRPG_UnitCall Distance" = Stores Distance Betwen AffectedUnit&TargetUnit in Variable(=UnitDistanceVarID)
 *
 *
 * "SRPG_UnitCall Location"
 *
 * -> *Affected_B-UnitID ->setValue* + *Unit_x_VarID must be set in Plugin* + *Unit_y_VarID must be set in Plugin* 
 * => Use "SRPG_UnitCall Location" = Stores X&Y data from AffectedUnit in *Unit_x_VarID*&*Unit_y_VarID*
 *
 *
 * "SRPG_UnitCall AimUnit"
 *
 * -> *Affected_B-UnitID ->setValue* + *Target_UnitID ->setValue* 
 * => Use "SRPG_UnitCall AimUnit" = AffectedUnit Aim TargetUnit
 *
 *
 * "SRPG_UnitCall normal"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall normal" = AffectedUnit sets MoveModus normal
 *
 *
 * "SRPG_UnitCall stand"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall stand" = AffectedUnit sets MoveModus stand
 *
 *
 * "SRPG_UnitCall goUp"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall goUp" = AffectedUnit sets MoveModus goRegionsUp
 *
 *
 * "SRPG_UnitCall goDown"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall goDown" = AffectedUnit sets MoveModus goRegionsDown
 *
 *
 * "SRPG_UnitCall absUp"
 *
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall absUp" = AffectedUnit sets MoveModus absRegionsUp(even if enemy is around)
 *
 *
 * "SRPG_UnitCall absDown"
 * 
 * -> *Affected_B-UnitID ->setValue*
 * => Use "SRPG_UnitCall absDown" = AffectedUnit sets MoveModus absRegionsDown(even if enemy is around)
 *
 *
 *----------------------------------------------------------------------------------
 *
 *
 * Higly recommended for Usage in "Event-If-Conditions":  (for all units with event id stored in Var)
 * 
 * "$gameSystem.EventToUnit($gameVariables.value(VarID1=EventID))[1].isStateAffected($gameVariables.value(VarID2=StateID));"
 *
 *   (the VarID replaces the State&EventID, this is for copy paste usage,dont forget to add the VarID pls)
 * this example is, if u want to use a if Condition like : "if unit(VarID1) has the State(VarID2) ect"
 * => of course you can aswell use the Event ID or the State ID without the Variables.. that would be :
 *
 * "$gameSystem.EventToUnit(eventID)[1].isStateAffected(stateID);"
 * 
 * => or you could use only one variable replacement and the other use the "normal" ID which is required:
 *
 * "$gameSystem.EventToUnit($gameVariables.value(VarID1=EventID))[1].isStateAffected(stateID);"
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
 * - fixed Release 26.07.2020 for SRPG (rpg mv)!
 */
 
(function() {

  var parameters = PluginManager.parameters("SRPG_UnitCall") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_UnitCall>'); });  
  
  var _varBxUnitID = Number(parameters['Unit_x_VarID'] || 0);

  var _varByUnitID = Number(parameters['Unit_y_VarID'] || 0); 
  
  var _varTargetUnitID = Number(parameters['Target_UnitID'] || 0);

  var _varUnitDistanceID = Number(parameters['UnitDistanceVarID'] || 0);

  var _varAunitID = Number(parameters['Affected_B-UnitID'] || 0);

  var _varUnitStateID = Number(parameters['B-Unit_StateVarID'] || 0);

  var _varUnitAniID = Number(parameters['B-Unit_AnimationVarID'] || 0);

//------------------------

//------------------------
var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === 'SRPG_UnitCall') {
            switch (args[0]) {


            case 'StartEvent':

                $gameMap.event(($gameVariables.value(_varAunitID)), 2).start();

                break;

            case 'Teleport':

                $gameMap.event(($gameVariables.value(_varAunitID))).setPosition($gameVariables.value(_varBxUnitID), $gameVariables.value(_varByUnitID));

                break;

            case 'Revive':

                this.unitRevive(($gameVariables.value(_varAunitID)));

                break;

            case 'Recover':

                this.unitRecoverAll(($gameVariables.value(_varAunitID)));

                break;

            case 'AddState':

                this.unitAddState(($gameVariables.value(_varAunitID)), ($gameVariables.value(_varUnitStateID)));

                break;

            case 'RemoveState':

                $gameSystem.EventToUnit($gameVariables.value(_varAunitID))[1].removeState($gameVariables.value(_varUnitStateID));

                break;

            case 'Animation':

                $gameMap.event(($gameVariables.value(_varAunitID))).requestAnimation(($gameVariables.value(_varUnitAniID)));

                break;

            case 'AimUnit':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'aimingEvent');
                this.setTargetId(($gameVariables.value(_varAunitID)), ($gameVariables.value(_varTargetUnitID)));

                break;

            case 'normal':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'normal');

                break;

            case 'stand':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'stand');

                break;

            case 'goUp':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'regionUp');

                break;

            case 'goDown':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'regionDown');

                break;

            case 'absUp':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'absRegionUp');

                break;

            case 'absDown':

                this.setBattleMode(($gameVariables.value(_varAunitID)), 'absRegionDown');

                break;

            case 'Distance':

                this.EventDistance(($gameVariables.value(_varUnitDistanceID)), ($gameVariables.value(_varAunitID)), ($gameVariables.value(_varTargetUnitID)));

                break;

            case 'Location':

                $gameVariables.setValue($gameVariables.value(_varBxUnitID), $gameMap.event($gameVariables.value(_varAunitID).x));
                $gameVariables.setValue($gameVariables.value(_varByUnitID), $gameMap.event($gameVariables.value(_varAunitID).y));

                break;











            }       
        

        }
    };

 
})();