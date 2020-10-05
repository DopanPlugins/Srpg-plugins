//=============================================================================
// SRPG_Aura.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_Aura> for SRPG 
 * @author dopan
 *
 *
 *
 *
 *
 *
 * @help  
 *
 *
 * Info About Aura Function:
 *
 *- "unitId" = Event ID of the Unit that is Affected with Aura_State (can be a variable which stores EventID)
 *
 *- "auraId" = StateID of Aura_State
 *
 *- "effectId" = EffectRange in Numbers (betwen Aura-affected-Unit & All other Units)
 * 
 *- "childId" = StateId of the Child_State (which is the Aura Effect and get added to Units that are in EffectRange)
 *
 *- "modeId" = ID in Numbers ; this works like a Varible-Switch..
 *
 *- "xtraID" = ID in Numbers ; this is for adding amount or id ,depending on the mode which is used..
 *
 *  ..if "modeId" = 0 => the ChildState will stay if leaving Aura-EffectRange..
 *  ..if "modeId" = 1 => Child State will be removed as soon the Unit leaves EffectRange.
 *  ..if "modeId" = 2 => Child State will be removed as soon the Unit leaves EffectRange.and get HP(xtra)
 *  ..if "modeId" = 3 => Child State will be removed as soon the Unit leaves EffectRange.and get MP(xtra) 
 *  ..if "modeId" = 4 => Child State will be removed as soon the Unit leaves EffectRange.and get TP(xtra)
 *  ..if "modeId" = 5 => Child State will be removed as soon the Unit leaves EffectRange.& Play Animation(xtra)
 *  ..if "modeId" = 6 => the ChildState will stay if leaving Aura-EffectRange..and get HP(xtra)
 *  ..if "modeId" = 7 => the ChildState will stay if leaving Aura-EffectRange..and get MP(xtra)
 *  ..if "modeId" = 8 => the ChildState will stay if leaving Aura-EffectRange..and get TP(xtra)
 *  ..if "modeId" = 9 => the ChildState will stay if leaving Aura-EffectRange..& Play Animation(xtra)
 *
 * ==> "xtra" can be the amount of HP/MP/TP for EG ( "-10" for EG works aswell) ,..
 *     ..OR the *ID of the Animation* depending on the Mode which is used
 *
 *
 *
 *
 * Example ScriptCall AURA: 
 *------------------------>
 *
 * "this.isUnitAura(unitId, auraId, effectId, childId, modeId, xtra);"
 *
 * "this.isUnitAura(12, 2, 3, 4, 1, 0);" (Xtra = 0 ,because "xtra" is not needed in "mode:1")
 *
 * => "UnitEvent(12)" has Aura(2)" with "EffectRange(3)" and "childState(4)" on "auraMode(1)" with "xtra(0)" 
 * -> this call will Affect all Units because it has "Unit" in the Scriptcall-name (and NOT "Actor" or "Enemy")
 * -> the "childState" in this EG would be removed as soon the affected Unit leaves the AuraEffectRange (auraMode=1)
 *
 *----------------->
 * AURA Scriptcalls:
 *----------------->
 *
 *- "this.isUnitAura(unitId, auraId, effectId, childId, modeId, xtra);" // affects All Units (Actors & Enemys)
 *
 *
 *- "this.isActorAura(unitId, auraId, effectId, childId, modeId, xtra);" // affects All Actors
 *
 *
 *- "this.isEnemyAura(unitId, auraId, effectId, childId, modeId, xtra);" // affects All Enemys
 *
 *----------------------------------------------------------------------------------------------------------------
 *
 *- ReviveAURA *SCRIPTCALL* for all Units: "this.isReviveAllUx(unitId, deathId, rangeId, aniId);"
 *---------------------------------------------------------------------------------------------->
 *
 * => "unitId" = Event ID of the Unit which defines the RangeCenter
 *
 * => "deathId" = State Id of the Deathstate which is used .This defines the DeathStateCondition for the effect to trigger
 *
 * => "rangeId" = the Distance betwen "unitId" and every Unit on Map,this defines the RangeCondition for the Effect to trigger
 *
 * => "aniId" = ID of the Animation that is played (one time) when the effect happens
 *
 * 
 * => EXAMPLE "this.isReviveAllUx(3, 1, 4, 120);"
 *
 * The EventUnit"3" and all Units within a Distance"4" to the EventUnit"3", will be Revived and Animation"120",
 * will be playe once on them,IF the Unit is State Affected with Deathstate"1"
 * -> in this case The EventUnit"3" could cast this on selftarget and would affect all units within a range of 4 which are DeathState affected
 * -> i recommend to use the "target event ID Variable" or the "active Event ID Variable", for the "unitId" 
 *
 *---------------------------------------------------------------------------------------------------------------
 *
 *- ReviveAURA *SCRIPTCALL* for all Actors: "this.isReviveAllAx(unitId, deathId, rangeId, aniId);" 
 *----------------------------------------------------------------------------------------------->
 *
 * -works the same way like the first ReviveAURA Example
 * => but this ScriptCall only Affects ACTORS (Ax)
 *---------------------------------------------------------------------------------------------------------------
 *
 *- ReviveAURA *SCRIPTCALL* for all Enemys: "this.isReviveAllEx(unitId, deathId, rangeId, aniId);"
 *----------------------------------------------------------------------------------------------->
 *
 * -works the same way like the first ReviveAURA Example
 * => but this ScriptCall only Affects ENEMYS (Ex)
 *---------------------------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------------------------
 *
 *- Passive AOE ScripCalls:
 *------------------------->
 *
 *-PassiveAOE for ALL UNITS: "this.isPassiveAoeUx(unitId, rangeId, aniId, hpId, mpId, tpId);" 
 *
 *-PassiveAOE: for ALL ACTORS "this.isPassiveAoeAx(unitId, rangeId, aniId, hpId, mpId, tpId);"
 *
 *-PassiveAOE: for ALL ENEMYS "this.isPassiveAoeEx(unitId, rangeId, aniId, hpId, mpId, tpId);"
 *
 * => A Passive AOE works similar like the "ReviveAura".
 *
 * -> "unitId" = EventID of the Unit which defines the Center of the PassiveAOE
 *
 * -> "rangeId" = Distance betwen "unitId" and every other Unit, this defines the RangeCondition for the Effect to trigger
 *
 * -> "aniId" = Id of the Animation that will be played one time on every Units which is affected by this function
 *
 * -> "hpId" & "mpId" & "tpId" = can be any Number "+" or "-" Value .Use "0" if u dont want to use the function
 *
 * -> i recommend to use the "target event ID Variable" or the "active Event ID Variable", for the "unitId" 
 *
 *
 *---------------------------------------------------------------------------------------------------------
 *---------------------------------------------------------------------------------------------------------
 * Team ScriptCalls: (they work like the others but got 1 more Input to work only for the used Team) 
 *---------------------------------------------------------------------------------------------------------
 *
 *-TeamAura "this.isTeamAura(unitId, auraId, effectId, childId, modeId, xtraId, "team");" // Aura only for the "team"
 *
 *-TeamReviveAURA: "this.isReviveAllTeam(unitId, deathId, rangeId, aniId, "team");" // ReviveAura only for the "team"
 *
 *-TeamPassiveAOE: "this.isPassiveAoeTeam(unitId, rangeId, aniId, hpId, mpId, tpId, "team");" // PassiveAOE only for the "team"
 *
 * => in every Scriptcall "team" is allways the name of the Team which u want to affect..
 *  ..can be "actor" or "enemy" for example or whatever team name you are using and want to affect! 
 *
 * EXAMPLE: TeamAura "this.isTeamAura(unitId, auraId, effectId, childId, modeId, xtraId, "team");"
 *
 *  example..the used Scriptcall ==>   "this.isTeamAura(12, 2, 3, 4, 1, 0, "actor");"
 *
 * -> this will affect only team "actors" !
 * => "UnitEvent(12)" has Aura(2)" with "EffectRange(3)" and "childState(4)" on "auraMode(1)" with "xtra(0)" 
 *
 *----------------------------------------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------------------------------------
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 08.08.2020 for SRPG (rpg mv)!
 */
 
(function() {


  var parameters = PluginManager.parameters("SRPG_Aura") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_Aura>'); });


//--------->Start 

//--------->Aura:

//------>For All:

                // AURA: "this.isUnitAura(unitId, auraId, effectId, childId, modeId, xtraId);"
                Game_Interpreter.prototype.isUnitAura = function(unitId, auraId, effectId, childId, modeId, xtraId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (!battleunit[1].isDead() && $gameSystem.EventToUnit(unitId)[1].isStateAffected(auraId)) {                            
                                 if ((effectId) >= uxd) {
                                      battleunit[1].addState(childId);
                                 }
                                 if (!battleunit[1].isDead() && battleunit[1].isStateAffected(childId)) {                                                                                                    
                                     if ((effectId) < uxd) {
                                        
                                          // this Part can be edited in order to Add new Modes or change the old Modes
                                          if ((modeId) === 1) {   
                                               battleunit[1].removeState(childId);
                                          }

                                          if ((modeId) === 2) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 3) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 4) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 5) {   
                                               battleunit[1].removeState(childId);requestAnimation(xtraId);
                                          }

                                          if ((modeId) === 6) {   
                                               battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 7) {   
                                               battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 8) {   
                                               battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 9) {   
                                               battleunit[1].eventunit.requestAnimation(xtraId);
                                          }
                                     }                                       
                                 }                                       
                             }                                     
                         }
                    }
                    return true;
                };

//------------->

                // ReviveAURA: "this.isReviveAllUx(unitId, deathId, rangeId, aniId);"
                Game_Interpreter.prototype.isReviveAllUx = function(unitId, deathId, rangeId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);       
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (battleunit[1].isStateAffected(deathId)) {                        
                                 if ((rangeId) >= uxd) {
                                      eventunit.requestAnimation(aniId);
                                      this.unitRevive((eventunit._eventId));
                                      this.unitRecoverAll((eventunit._eventId));

                                 }                                    
                             }                                     
                         }
                    }
                    return true;
                };

//-------------->

                // PassiveAOE: "this.isPassiveAoeUx(unitId, rangeId, aniId, hpId, mpId, tpId);"
                Game_Interpreter.prototype.isPassiveAoeUx = function(unitId, rangeId, aniId, hpId, mpId, tpId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {  
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));                                                 
                             if (!battleunit[1].isDead() && (rangeId) >= uxd) {
                                  eventunit.requestAnimation(aniId);
                                  battleunit[1].gainHp(hpId);  
                                  battleunit[1].gainMp(mpId);
                                  battleunit[1].gainTp(tpId);battleunit[1].startDamagePopup();
                                  if (battleunit[1].isDead()) {
                                      battleunit[1].performCollapse();
                                      $gameMap.eraseEvent(eventunit._eventId);
                                  }
                             }                                    
                         }
                    }
                    return true;
                };

//--->For Actors:

                // AURA: "this.isActortAura(unitId, auraId, effectId, childId, modeId, xtraId);"
                Game_Interpreter.prototype.isActorAura = function(unitId, auraId, effectId, childId, modeId, xtraId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (!battleunit[1].isDead() && $gameSystem.EventToUnit(unitId)[1].isStateAffected(auraId)) {                            
                                 if ((effectId) >= uxd) {
                                      battleunit[1].addState(childId);
                                 }
                                 if (!battleunit[1].isDead() && battleunit[1].isStateAffected(childId)) {                                                                                                    
                                     if ((effectId) < uxd) {
                                        
                                          // this Part can be edited in order to Add new Modes or change the old Modes
                                          if ((modeId) === 1) {   
                                               battleunit[1].removeState(childId);
                                          }

                                          if ((modeId) === 2) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 3) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 4) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 5) {   
                                               battleunit[1].removeState(childId);requestAnimation(xtraId);
                                          }

                                          if ((modeId) === 6) {   
                                               battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 7) {   
                                               battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 8) {   
                                               battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 9) {   
                                               battleunit[1].eventunit.requestAnimation(xtraId);
                                          }
                                     }                                       
                                 }                                       
                             }                                     
                         }
                    }
                    return true;
                };
//------------->


                // ReviveAURA: "this.isReviveAllAx(unitId, deathId, rangeId, aniId);"
                Game_Interpreter.prototype.isReviveAllAx = function(unitId, deathId, rangeId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);     
                         if (battleunit && eventunit && (battleunit[0] === 'actor')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (battleunit[1].isStateAffected(deathId)) {                            
                                 if ((rangeId) >= uxd) {
                                      eventunit.requestAnimation(aniId);
                                      this.unitRevive((eventunit._eventId));
                                      this.unitRecoverAll((eventunit._eventId));

                                 }                                    
                             }                                     
                         }
                    }
                    return true;
                };

//------------->

                // PassiveAOE: "this.isPassiveAoeAx(unitId, rangeId, aniId, hpId, mpId, tpId);"
                Game_Interpreter.prototype.isPassiveAoeAx = function(unitId, rangeId, aniId, hpId, mpId, tpId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));                                                 
                             if (!battleunit[1].isDead() && (rangeId) >= uxd) {
                                  eventunit.requestAnimation(aniId);
                                  battleunit[1].gainHp(hpId);  
                                  battleunit[1].gainMp(mpId);
                                  battleunit[1].gainTp(tpId);battleunit[1].startDamagePopup();
                                  if (battleunit[1].isDead()) {
                                      battleunit[1].performCollapse();
                                      $gameMap.eraseEvent(eventunit._eventId);
                                  }                                   
                             }                                                                                                     
                         }
                    }
                    return true;
                };

//--->For Enemys:


                // AURA: "this.isEnemyAura(unitId, auraId, effectId, childId, modeId, xtraId);"
                Game_Interpreter.prototype.isEnemyAura = function(unitId, auraId, effectId, childId, modeId, xtraId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'enemy')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (!battleunit[1].isDead() && $gameSystem.EventToUnit(unitId)[1].isStateAffected(auraId)) {                            
                                 if ((effectId) >= uxd) {
                                      battleunit[1].addState(childId);
                                 }
                                 if (!battleunit[1].isDead() && battleunit[1].isStateAffected(childId)) {                                                                                                    
                                     if ((effectId) < uxd) {
                                        
                                          // this Part can be edited in order to Add new Modes or change the old Modes
                                          if ((modeId) === 1) {   
                                               battleunit[1].removeState(childId);
                                          }

                                          if ((modeId) === 2) {   
                                               battleunit[1].removeState(childId);
                                               battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 3) {   
                                               battleunit[1].removeState(childId);
                                               battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 4) {   
                                               battleunit[1].removeState(childId);
                                               battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 5) {   
                                               battleunit[1].removeState(childId);
                                               requestAnimation(xtraId);
                                          }

                                          if ((modeId) === 6) {   
                                               battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 7) {   
                                               battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 8) {   
                                               battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 9) {   
                                               battleunit[1].eventunit.requestAnimation(xtraId);
                                          }
                                     }                                       
                                 }                                       
                             }                                     
                         }
                    }
                    return true;
                };

//------------->


                // ReviveAURA: "this.isReviveAllEx(unitId, deathId, rangeId, aniId);"
                Game_Interpreter.prototype.isReviveAllEx = function(unitId, deathId, rangeId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'enemy')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if ((battleunit[1].isStateAffected(deathId))) {                            
                                 if ((rangeId) >= uxd) {
                                      eventunit.requestAnimation(aniId);
                                      this.unitRevive((eventunit._eventId));
                                      this.unitRecoverAll((eventunit._eventId));
                                      
                                 }                                    
                             }                                     
                         }
                    }
                    return true;
                };


//------------->

                // PassiveAOE: "this.isPassiveAoeEx(unitId, rangeId, aniId, hpId, mpId, tpId);"
                Game_Interpreter.prototype.isPassiveAoeEx = function(unitId, rangeId, aniId, hpId, mpId, tpId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'enemy')) {   
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));                                                
                             if (!battleunit[1].isDead() && (rangeId) >= uxd) {
                                  eventunit.requestAnimation(aniId);
                                  battleunit[1].gainHp(hpId);  
                                  battleunit[1].gainMp(mpId);
                                  battleunit[1].gainTp(tpId);battleunit[1].startDamagePopup();
                                  if (battleunit[1].isDead()) {
                                      battleunit[1].performCollapse();
                                      $gameMap.eraseEvent(eventunit._eventId);
                                  }
                             }                                                                             
                         }
                    }
                    return true;
                };


//--->For Teams:


                // AURA: "this.isTeamAura(unitId, auraId, effectId, childId, modeId, xtraId, "team");"
                Game_Interpreter.prototype.isTeamAura = function(unitId, auraId, effectId, childId, modeId, xtraId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (battleunit[1].srpgTeam() == team)) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (!battleunit[1].isDead() && $gameSystem.EventToUnit(unitId)[1].isStateAffected(auraId)) {                            
                                 if ((effectId) >= uxd) {
                                      battleunit[1].addState(childId);
                                 }
                                 if (!battleunit[1].isDead() && battleunit[1].isStateAffected(childId)) {                                                                                                    
                                     if ((effectId) < uxd) {
                                        
                                          // this Part can be edited in order to Add new Modes or change the old Modes
                                          if ((modeId) === 1) {   
                                               battleunit[1].removeState(childId);
                                          }

                                          if ((modeId) === 2) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 3) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 4) {   
                                               battleunit[1].removeState(childId);battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 5) {   
                                               battleunit[1].removeState(childId);requestAnimation(xtraId);
                                          }

                                          if ((modeId) === 6) {   
                                               battleunit[1].gainHp(xtraId);battleunit[1].startDamagePopup();
                                          }

                                          if ((modeId) === 7) {   
                                               battleunit[1].gainMp(xtraId);
                                          }

                                          if ((modeId) === 8) {   
                                               battleunit[1].gainTp(xtraId);
                                          }

                                          if ((modeId) === 9) {   
                                               battleunit[1].eventunit.requestAnimation(xtraId);
                                          }
                                     }                                       
                                 }                                       
                             }                                     
                         }
                    }
                    return true;
                };

//------------->

                // ReviveAURA: "this.isReviveAllTeam(unitId, deathId, rangeId, aniId, "team");"
                Game_Interpreter.prototype.isReviveAllTeam = function(unitId, deathId, rangeId, aniId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);       
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) { 
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));
                             if (battleunit[1].isStateAffected(deathId) && battleunit[1].srpgTeam() == team) {                        
                                 if ((rangeId) >= uxd) {
                                      eventunit.requestAnimation(aniId);
                                      this.unitRevive((eventunit._eventId));
                                      this.unitRecoverAll((eventunit._eventId));

                                 }                                    
                             }                                     
                         }
                    }
                    return true;
                };

//-------------->

                // PassiveAOE: "this.isPassiveAoeTeam(unitId, rangeId, aniId, hpId, mpId, tpId, "team");"
                Game_Interpreter.prototype.isPassiveAoeTeam = function(unitId, rangeId, aniId, hpId, mpId, tpId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                         var battleunit = $gameSystem.EventToUnit([i]);
                         var eventunit = $gameMap.event([i]);    
                         if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {  
                             var uxd = ($gameMap.distance((eventunit).x, (eventunit).y, $gameMap.event(unitId).x, $gameMap.event(unitId).y));                                                 
                             if (!battleunit[1].isDead() && (rangeId) >= uxd && battleunit[1].srpgTeam() == team) {
                                  eventunit.requestAnimation(aniId);
                                  battleunit[1].gainHp(hpId);  
                                  battleunit[1].gainMp(mpId);
                                  battleunit[1].gainTp(tpId);battleunit[1].startDamagePopup();
                                  if (battleunit[1].isDead() && battleunit[1].srpgTeam() == team) {
                                      battleunit[1].performCollapse();
                                      $gameMap.eraseEvent(eventunit._eventId);
                                  }
                             }                                    
                         }
                    }
                    return true;
                };


//------------->

//----------End:Thanks for the Attention,have a nice day^^





 
 })();