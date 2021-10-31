//=============================================================================
// ScriptCallList_SRPG.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <ScriptCallList_SRPG> for whatever in SRPG 
 * @author (dopan)
 *
 * ============================================================================
 * Terms of Use : THIS IS NOT A PLUGIN!!
 * -> the plugin Structure is only used to have the JS displayed better
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 00.00.2020 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables: this code is related to Plugin name and text in the Plugin description above

  var parameters = PluginManager.parameters("ScriptCallList_SRPG") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_Blank>'); });
 
//----------------------------------------------------------------------------------------------------------
// List of helpfull SRPG related Scriptcalls for usage in SRPG battleMode(requires SRPG Core)
// this is just a little help & reminder, for more pls try to read SRPG Plugins, or use Console F8 In SRPG Battle
//----------------------------------------------------------------------------------------------------------
 
// Code to ask about All EventUnits with the option to add code if Conditions are "True":
//----------------------------------------------------------------------------------------------------------
// (different Codes that are made out of this,with small edits, can be found in the plugin "SRPG_UnitsGroups")
 
// check all MapEvents , "[i]" is the Event ID 
   for (var i = 1; i <= $gameMap.events().length; i++) {
// access to Battler data. In usage its needed to add [0] for the event_Type, or [1] for the event_Unit
// That will look like this -> "battleunit[0]" "battleunit[1]"
// in the following context, [0] or [1] is NOT added,thats to store event ID so that "battleunit"&"eventunit" can be equal
        var battleunit = $gameSystem.EventToUnit([i]);
// access to GameMap event data 
        var eventunit = $gameMap.event([i]);
// if the event ID of "Event" and "Battler" are same ,beeing "actor"- or "enemy"- eventType & The Unit is NOT Death                    
        if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
// example for executed script after all "if conditions" are "true"
// here i wanna show how "$gameSystem.EventToUnit(eventID)[1]" is replaced by "battleunit[1]"
// this adds a State to all Units that fit to the Conditions above.. its only needed to add the StateID (Replace "addID")                     
            battleunit[1].addState(addId);
// Free Room to add more Execution Scripts that are used if all Conditions are "true"                      
                     
            // <-insert test code here & remove this help text + the "//"
        }
                       
   };

//----------------------------------------------------------------------------------------------------------
// Code for Unit Battler:(a few Examples) Using this in the F8 console will show a lot of more Options 
//----------------------------------------------------------------------------------------------------------
   $gameSystem.EventToUnit(eventID)[1];
                    
// Unit battler ActorID: 
// if that Battler is an Actor,this will return the "actor ID
   $gameSystem.EventToUnit(eventID)[1]._actorId;
// Unit Battler HP                    
// This will return the Units hp,and it works with all stats the same way
   $gameSystem.EventToUnit(eventID)[1].hp;
// another example: agi
   $gameSystem.EventToUnit(eventID)[1].agi;
                     
// code for Gain-HP,MP,TP
   $gameSystem.EventToUnit(eventID)[1].gainHp(number);
   $gameSystem.EventToUnit(eventID)[1].gainMp(number);
   $gameSystem.EventToUnit(eventID)[1].gainTp(number);
                     
//----------------------------------------------------------------------------------------------------------

// State related:
// check State for if conditions, returns true if aftected:
   $gameSystem.EventToUnit(eventID)[1].isStateAffected(checkId);
// remove State from Unit
   $gameSystem.EventToUnit(eventID)[1].removeState(removeId);
// Add State to Unit
   $gameSystem.EventToUnit(eventID)[1].addState(addId);
//----------------------------------------------------------------------------------------------------------

// Skill Related for ActorUnits only  :
// check skill:
   $gameSystem.EventToUnit(eventID)[1].hasSkill(skillId);
// forget skill:
   $gameSystem.EventToUnit(eventID)[1].forgetSkill(skillId);
// learn skill:
   $gameSystem.EventToUnit(eventID)[1].learnSkill(skillId);
                        
// this returns the currently Active skill Id ,works for actors&enemys
   $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1]._actions[0]._item._itemId;
                        
//----------------------------------------------------------------------------------------------------------
// Other Code "gameTemp" for ative and target event
//----------------------------------------------------------------------------------------------------------
 
// Active Event:
   $gameTemp.activeEvent();
// Target Event:
   $gameTemp.targetEvent();
// active eventID:
   $gameTemp.activeEvent().eventId();
// target eventID:
   $gameTemp.targetEvent().eventId();

//----------------------------------------------------------------------------------------------------------
// Incase of reinforcement spwaned events the events need to be initialized again
//----------------------------------------------------------------------------------------------------------
 
// by default that happens at BattleStart:

   $gameSystem.setAllEventType();
// initialzes the meta of "EventNote" from all_Events..
// note: this one must be used first 

   $gameSystem.setSrpgEnemys();
// can be used instead of "add enemy",for allEnemys
// it uses the eventNote meta-Info: "<type:enemy>"

   $gameSystem.setSrpgActors();
// same as above only for Actors & "<type:actor>"
 
//----------------------------------------------------------------------------------------------------------
// PLS Note This List might get more Updates in the Future
//----------------------------------------------------------------------------------------------------------


  
  


//--End:

})();
