//=============================================================================
// ScriptCallList_SRPG.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <ScriptCallList_SRPG> for Tutorial usage 
 * @author (dopan) code from SRPG Core
 *
 * ============================================================================
 * Terms of Use : THIS IS NOT A PLUGIN!!
 * -> the plugin Structure is only used to have the JS displayed better
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 31.10.2021 for SRPG (rpg mv)!
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
// if the event ID of "Event" and "Battler" are same ,beeing "actor"- or "enemy"- eventType & The Unit is NOTdeath("!" at the beginning means NOT)                    
        if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
// example for executed script after all "if conditions" are "true"
// here i wanna show how "$gameSystem.EventToUnit(eventID)[1]" is replaced by "battleunit[1]"
// this adds a State to all Units that fit to the Conditions above.. its only needed to add the StateID (Replace "addID")                     
            battleunit[1].addState(addId);
// Free Room to add more Execution Scripts that are used if all Conditions are "true"                      
            //        
            // <-insert test code here & remove this help text + those "//"
            //
        }
                       
   };

//----------------------------------------------------------------------------------------------------------
// Code for Unit Battler:(a few Examples) Using this in the F8 console will show a lot of more Options 
//----------------------------------------------------------------------------------------------------------
   $gameSystem.EventToUnit(eventID)[1];
                    
// Unit battler ActorID: 
// if that Battler is an Actor,this will return the "actor ID"
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

// Skill Related for ActorUnits only:
// check skill:
   $gameSystem.EventToUnit(eventID)[1].hasSkill(skillId);
// forget skill:
   $gameSystem.EventToUnit(eventID)[1].forgetSkill(skillId);
// learn skill:
   $gameSystem.EventToUnit(eventID)[1].learnSkill(skillId);
                        
// this returns the currently Active skill Id ,works for actors&enemys:
   $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1]._actions[0]._item._itemId;
                        
//----------------------------------------------------------------------------------------------------------
// Other Code "gameTemp" for active and target event
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
// How to get the Event ID based on the Actor ID
//----------------------------------------------------------------------------------------------------------
 
   $gameSystem.ActorToEvent(ActorID);
// (is Part of any default SRPG Core even older Versions)
// Incase the Actor isnt in srpgBattle it will return 0
 
// incase the Actor is in battle & deathState affected,it will still return the event id..
// "deathState" affeted Units have Event with the status "erased",
// but the eventID is still there & can be used to revive Units for example.. 
 
// Example in Usage instead of event ID :
 
   $gameSystem.EventToUnit($gameSystem.ActorToEvent(ActorID))[1];
// this way we getting the battler(EventToUnit) of an Actor by using Actor ID instead of Event ID
// but this example_Code can only be used if the Actor Is in Battle ,
// because "EventToUnit" needs a valid EventID other than 0 or errors will be caused when using it.
 
// Using this Example_code when eventing with script without causing errors:
// this can be handled by a simple "if Condtion"
// we will use "$gameSystem.EventToUnit(EventID)[1].addState(StateID);" as execution order example

if ($gameSystem.ActorToEvent(ActorID) > 0) {$gameSystem.EventToUnit($gameSystem.ActorToEvent(ActorID))[1].addState(StateID)};
// pls note "$gameSystem.EventToUnit(EventID)[1].addState(StateID);"
// needs a valid event ID other than 0, thats solved with the "if condition"
// also this Example still needs a State ID,
// but however this way we can use Actor ID instead of Event ID

// SideNote:
 
   $gameActors.actor(ActorID).event().eventId(); 
// also returns the Event_ID based on Actor_ID 
//(it was added by the mapbattle Plugin which is implemented in newer srpg core Versions)
// it should work similar like:
   $gameSystem.ActorToEvent(ActorID); 
// and return 0 if the unit is not in battle & has no event used
 
//----------------------------------------------------------------------------------------------------------
 // If Using the "SRPG_UnitCore" i will add some script examples here:
 
var target = $gameSystem.EventToUnit($gameTemp.targetEvent().eventId());
if (target[1].isStateAffected(StateID)) this.changeStealChance(100);
// trigger this with "Custom Execution" or the "eventBeforeBattle"
// this will change the stealchance to 100% if the target is StateAffected (insert state Id!) 
 
 
 
 
 
 
 
 
//----------------------------------------------------------------------------------------------------------
// PLS Note This List might get more Updates in the Future
//----------------------------------------------------------------------------------------------------------


  
  


//--End:

})();
