//=============================================================================>
// SRPG_UnitGroups.js
//=============================================================================>
/*:
 * @plugindesc v1.0 Adds <SRPG_UnitGroups> to use 68 new Scriptcalls in SRPG 
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
 *  This Plugin provides New Sriptcalls,they are all adress at Multiple EventUnits in SRPG_Battle:
 *  
 *  -> "actors" "enemys" "Units" ("Units"  = "actors" & "enemys") and also "team"-Units
 *
 * -> if u look into the code, the first part "//0U_Add Test:" shows the main Part of the Plugin-Code.
 *    This can be used to test new Functions where u want to adress one of these 4 Groups:("actors" "enemys" "Units" and "team"-Units)
 *    
 *
 *--------------------->
 * Plugin Command: None
 *--------------------->
 *
 * the whole Plugin uses New SRPG Scripcalls which are stored in the Plugin..
 *----------------------------------------------------------------------------------------->
 *
 * Plugin Scriptcalls: (68 New Sriptcalls for SRPG)
 *----------------------------------------------------------------------------------------->
 *-AllBattleUnits:(U1-15)
 *----------------
 *- "this.allUxAddState(x);" // "x" = State ID // adds State to all BattleUnits
 *
 *- "this.allUxRemoveState(x);" // "x" = State ID // removes State from all BattleUnits
 *
 *- "this.allUxAnimation(x);" // "x" = Animation ID // Play Animation on all BattleUnits
 *
 *- "this.allUxStartPage(x);" // "x" = Page number ID // runs the EventPage of all BattleUnits
 *
 *- "this.allUxRecover();" // nothing else needed ->everything will be recovered on all BattleUnits  
 *
 *- "this.allUxGainHp(x);" // "x" =  Amount that is changed in Numbers on all BattleUnits
 *
 *- "this.allUxGainMp(x);" // "x" =  Amount that is changed in Numbers on all BattleUnits
 *
 *- "this.allUxGainTp(x);" // "x" =  Amount that is changed in Numbers on all BattleUnits
 *
 *- "this.allUxCheckRemoveState(checkId, removeId);" // 2 different States can be used if needed
 *
 *- "this.allUxCheckAddState(checkId, addId);" // 2 different States can be used if needed
 *
 *- "this.allUxRevive(Id);" // The "Id" should be the "Id" of the *Death-State* which all Units are Using
 *                            ..this is to make sure the fuction only triggers units that are Death
 *                            (this function checks a "State(Id)" before tryin to Revive any Unit)
 *
 *
 *- "this.allUxSelfSwitch(checkId , letters);" //(reset SelfSwitches) "checkid" = State Id // "letters" = 'A''B''C''D' 
 *
 *- "this.allUxEraseEvent(checkId);" // "checkid" = State Id // Erase all Unit Events if State is affected
 *
 *- "this.allUxBalloon(checkId, Id);" // checkId = StateID of the Unit, "Id" = BalloonId
 *                                      -> if Unit is State Affected play Ballon
 *                                      -> the state check is to give the chance to use 
 *                                       "subgroups" depending on permanent States (eg. infantery,cavalrie ect)
 *
 *
 *- "this.allUxCheckAddAni(checkId, aniId);"// "checkid" = State Id //"aniId" = Animation Id
 *                                          =>this will check the state on all Units and ..:
 *                                          =>if "checkid" is affected the Animation "aniId" will be used (1 time)
 *                                          => to loop the Animation,..loop the ScriptCall..
 *
 *-AllActorUnits:(A1-23)
 *---------------------->
 *- "this.allAxAddState(x);" // "x" = State ID // adds State to all ActorUnits
 *
 *- "this.allAxRemoveState(x);" // "x" = State ID // removes State from all ActorUnits
 *
 *- "this.allAxAnimation(x);" // "x" = Animation ID // Play Animation on all ActorUnits
 *
 *- "this.allAxStartPage(x);" // "x" = Page number ID // runs the EventPage of all ActorUnits
 *
 *- "this.allAxLearnSkill(x);" // "x" = Skill ID (Only for Actors) // add Skill to all ActorUnits
 *
 *- "this.allAxForgetSkill(x);" // "x" = Skill ID (Only for Actors) // remove Skill from all ActorUnits
 *
 *- "this.allAxRecover();" // nothing else needed ->everything will be recovered on all ActorUnits
 *
 *- "this.allAxGainHp(x);" // "x" =  Amount that is changed in Numbers on all ActorUnits
 *
 *- "this.allAxGainMp(x);" // "x" =  Amount that is changed in Numbers on all ActorUnits
 *
 *- "this.allAxGainTp(x);" // "x" =  Amount that is changed in Numbers on all ActorUnits
 *
 *- "this.allAxCheckRemoveState(checkId, removeId);" // 2 different States can be used if needed
 *
 *- "this.allAxCheckAddState(checkId, addId);"  // 2 different States can be used if needed
 *
 *- "this.allAxCheckAddSkill(checkId, addId);" //(Only for Actors) 2 different Skills can be used if needed
 *
 *- "this.allAxCheckRemoveSkill(checkId, removeId);" //(Only for Actors) 2 different Skills can be used if needed
 *
 *- "this.allAxCheckStateAddSkill(checkId, addId);" //(Only for Actors) Checks State & Adds Skill (if state affected)
 *
 *- "this.allAxCheckSkillAddState(checkId, addId);" //(Only for Actors) Checks Skill & Adds State (if Unit hasSkill)
 *
 *- "this.allAxCheckStateRemoveSkill(checkId, removeId);" //(Only for Actors) Checks State & Removes Skill (if state affected)
 *
 *- "this.allAxCheckSkillRemoveState(checkId, removeId);" //(Only for Actors) Checks Skill & Removes State (if Unit hasSkill)
 *
 *- "this.allAxRevive(Id);" // The "Id" should be the "Id" of the *Death-State* which all Units are Using
 *                            ..this is to make sure the fuction only triggers units that are Death
 *                            (this function checks a "State(Id)" before tryin to Revive any Unit)
 *
 *
 *- "this.allAxSelfSwitch(checkId, letters);" //(reset SelfSwitches) "checkid" = State Id // "letters" = 'A''B''C''D' 
 *
 *- "this.allAxEraseEvent(checkId);" // "checkid" = State Id // Erase all ActorUnit Events if State is affected
 *
 *- "this.allAxBalloon(checkId, Id);" // checkId = StateID of the Unit, "Id" = BalloonId
 *                                      -> if ActorUnit is State Affected play Ballon
 *                                      -> the state check is to give the chance to use 
 *                                       "subgroups" depending on permanent States (eg. infantery,cavalry ect)
 *
 *
 *
 *- "this.allAxCheckAddAni(checkId, aniId);"// "checkid" = State Id //"aniId" = Animation Id
 *                                          =>this will check the state on all Actors and ..:
 *                                          =>if "checkid" is affected the Animation "aniId" will be used (1 time)
 *                                          => to loop the Animation,..loop the ScriptCall..
 *
 *-AllEnemyUnits:(E1-15)
 *---------------------->
 *- "this.allExAddState(x);" // "x" = State ID // adds State to all EnemyUnits
 *
 *- "this.allExRemoveState(x);" // "x" = State ID // removes State from all EnemyUnits
 *
 *- "this.allExAnimation(x);" // "x" = Animation ID // Play Animation on all EnemyUnits
 *
 *- "this.allExStartPage(x);" // "x" = Page number ID // runs the EventPage of all EnemyUnits
 *
 *- "this.allExRecover();" // nothing else needed ->everything will be recovered on all EnemyUnits 
 *
 *- "this.allExGainHp(x);" // "x" =  Amount that is changed in Numbers on all EnemyUnits
 *
 *- "this.allExGainMp(x);" // "x" =  Amount that is changed in Numbers on all EnemyUnits
 *
 *- "this.allExGainTp(x);" // "x" =  Amount that is changed in Numbers on all EnemyUnits
 *
 *- "this.allExCheckRemoveState(checkId, removeId);" // 2 different States can be used if needed
 *
 *- "this.allExCheckAddState(checkId, addId);" // 2 different States can be used if needed
 *
 *- "this.allExRevive(Id);" // The "Id" should be the "Id" of the *Death-State* which all Units are Using
 *                            ..this is to make sure the fuction only triggers units that are Death
 *                            (this function checks a "State(Id)" before tryin to Revive any Unit)
 *
 *- "this.allExSelfSwitch(checkId, letters);" //(reset SelfSwitches) "checkid" = State Id // "letters" = 'A''B''C''D' 
 *
 *- "this.allExEraseEvent(checkId);" // "checkid" = State Id // Erase all EnemyUnit Events if State is affected
 *
 *- "this.allExBalloon(checkId, Id);" // checkId = StateID of the Unit, "Id" = BalloonId
 *                                      -> if EnemyUnit is State Affected play Ballon
 *                                      -> the state check is to give the chance to use 
 *                                       "subgroups" depending on permanent States (eg. infantery,cavalrie ect)
 *
 *- "this.allExCheckAddAni(checkId, aniId);"// "checkid" = State Id //"aniId" = Animation Id
 *                                          =>this will check the state on all Enemys and ..:
 *                                          =>if "checkid" is affected the Animation "aniId" will be used (1 time)
 *                                          => to loop the Animation,..loop the ScriptCall..
 *
 *
 *-AllTeamUnits:(T1-15)
 *----------------
 *- "this.allTxAddState(x, "team");" // "x" = State ID // adds State to all TeamUnits
 *
 *- "this.allTxRemoveState(x, "team");" // "x" = State ID // removes State from all TeamUnits
 *
 *- "this.allTxAnimation(x, "team");" // "x" = Animation ID // Play Animation on all TeamUnits
 *
 *- "this.allTxStartPage(x, "team");" // "x" = Page number ID // runs the EventPage of all TeamUnits
 *
 *- "this.allTxRecover("team");" // nothing else needed ->everything will be recovered on all TeamUnits  
 *
 *- "this.allTxGainHp(x, "team");" // "x" =  Amount that is changed in Numbers on all TeamUnits
 *
 *- "this.allTxGainMp(x, "team");" // "x" =  Amount that is changed in Numbers on all TeamUnits
 *
 *- "this.allTxGainTp(x, "team");" // "x" =  Amount that is changed in Numbers on all TeamUnits
 *
 *- "this.allTxCheckRemoveState(checkId, removeId, "team");" // 2 different States can be used if needed affects all TeamUnits
 *
 *- "this.allTxCheckAddState(checkId, addId, "team");" // 2 different States can be used if needed affects all TeamUnits
 *
 *- "this.allTxRevive(Id, "team");" // The "Id" should be the "Id" of the *Death-State* which all TeamUnits are Using
 *                                  ..this is to make sure the fuction only triggers units that are Death
 *                                  (this function checks a "State(Id)" before tryin to Revive any Unit)
 *
 *
 *- "this.allTxSelfSwitch(checkId, letters, "team");" //(reset SelfSwitches) "checkid" = State Id // "letters" = 'A''B''C''D' ..affects all TeamUnits
 *
 *- "this.allTxEraseEvent(checkId, "team");" // "checkid" = State Id // Erase all Unit Events if State is affected..affects all TeamUnits
 *
 *- "this.allTxBalloon(checkId, Id, "team");" // checkId = StateID of the Unit, "Id" = BalloonId
 *                                            -> if Unit is State Affected play Ballon
 *                                            -> the state check is to give the chance to use 
 *                                            "subgroups" depending on permanent States (eg. infantery,cavalrie ect) ..affects all TeamUnits
 *
 *
 *- "this.allTxCheckAddAni(checkId, aniId, "team");"// "checkid" = State Id //"aniId" = Animation Id
 *                                                  =>this will check the state on all Units and ..:
 *                                                  =>if "checkid" is affected the Animation "aniId" will be used (1 time)
 *                                                  => to loop the Animation,..loop the ScriptCall..affects all TeamUnits
 *
 *
 * =====>> "team" is allways the team name you want to affect.. for example *team actor*  is => "actor"
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.1:
 * - first Release 07.08.2020 for SRPG (rpg mv)!
 */
 
(function() {


  var parameters = PluginManager.parameters("SRPG_UnitGroups") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_UnitGroups>'); });

                 
//Plugin Functions:
                   
//BattleUnit:
//---------->

                //0U_Add Test: THIS IF FOR TESTING NEW FUNCTIONS "this.allUxTest();"
                Game_Interpreter.prototype.allUxTest = function() {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        // <-insert test code here
                    }
                       
                    }
                    return true;
                };

                //1U_Add State: "this.allUxAddState(Id)"
                Game_Interpreter.prototype.allUxAddState = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].addState(Id); 
                    }
                       
                    }
                    return true;
                };

                //2U_Remove State: "this.allUxRemoveState(Id)"
                Game_Interpreter.prototype.allUxStateRemove = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].removeState(Id); 
                    }
                       
                    }
                    return true;
                };

                //3U_Request Animation: "this.allUxRemoveState(Id)"
                Game_Interpreter.prototype.allUxAnimation = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        eventunit.requestAnimation(Id); 
                    }
                       
                    }
                    return true;
                };

                //4U_Start EventPage: "this.allUxStartPage(Id)"
                Game_Interpreter.prototype.allUxStartPage = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        eventunit = $gameMap.event([i], id);
                        eventunit.start();     
                    }
                       
                    }
                    return true;
                };

                //5U_Add Recover "this.allUxRecover()"
                Game_Interpreter.prototype.allUxRecover = function() {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].recoverAll(); 
                    }
                       
                    }
                    return true;
                };

                //6U_Add Gain HP: "this.allUxGainHp(Id)"
                Game_Interpreter.prototype.allUxGainHp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainHp(id);battleunit[1].startDamagePopup();
                    }
                       
                    }
                    return true;
                };

                //7U_Add Gain MP: "this.allUxGainMp(Id)"
                Game_Interpreter.prototype.allUxGainMp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainMp(id); 
                    }
                       
                    }
                    return true;
                };

                //8U_Add Gain TP: "this.allUxGainTp(Id)"
                Game_Interpreter.prototype.allUxGainTp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainTp(id); 
                    }
                       
                    }
                    return true;
                };

                //9U_Add Check&RemoveState: "this.allUxCheckRemoveState(checkId, removeId)"
                Game_Interpreter.prototype.allUxCheckRemoveState = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].removeState(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //10U_Add Check&AddState: "this.allUxCheckAddState(checkId, addId)"
                Game_Interpreter.prototype.allUxCheckAddState = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].addState(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //11U_Add Revive: "this.allUxRevive(Id)"
                Game_Interpreter.prototype.allUxRevive = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(Id)) {
                            this.unitRevive([i]);
                        }
                    }
                       
                    }
                    return true;
                };

                //12U_Add SelfSwitch: "this.allUxSelfSwitch(checkId, letters)"
                Game_Interpreter.prototype.allUxSelfSwitch = function(checkId, letters) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            var key = [this._mapId, ([i]), letters];$gameSelfSwitches.setValue(key, false);
                        }
                    }
                       
                    }
                    return true;
                };

                //13U_Add EraseEvent: "this.allUxEraseEvent(checkId)"
                Game_Interpreter.prototype.allUxEraseEvent = function(checkId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {  
                        if ((battleunit[1].isStateAffected(checkId)) && (!eventunit._erased)) {
                            $gameMap.eraseEvent([i])
                        }
                    }
                       
                    }
                    return true;
                };

                //14U_Add Balloon: "this.allUxBalloon(checkId, Id)"
                Game_Interpreter.prototype.allUxBalloon = function(checkId, Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) { 
                            eventunit.requestBalloon(Id) 
                        }
                    }
                       
                    }
                    return true;
                };

                //15U_CheckAddAnimation:  "this.allUxCheckAddAni(checkId, aniId);"
                Game_Interpreter.prototype.allUxCheckAddAni = function(checkId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {  
                            eventunit.requestAnimation(aniId);
                        }
                    }
                       
                    }
                    return true;
                };


//ActorUnit:
//---------->

                //1A_Add State: "this.allAxAddState(Id)"
                Game_Interpreter.prototype.allAxAddState = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        battleunit[1].addState(Id); 
                    }
                       
                    }
                    return true;
                };

                //2A_Remove State: "this.allAxRemoveState(Id)" 
                Game_Interpreter.prototype.allAxRemoveState = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        battleunit[1].removeState(Id); 
                    }
                       
                    }
                    return true;
                };

                //3A_Request Animation: "this.allAxAnimation(Id)"
                Game_Interpreter.prototype.allAxAnimation = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        eventunit.requestAnimation(Id); 
                    }
                       
                    }
                    return true;
                };

                //4A_Start EventPage: "this.allAxStartPage(Id)"
                Game_Interpreter.prototype.allAxStartPage = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        eventunit = $gameMap.event([i], id);
                        eventunit.start();     
                    }
                       
                    }
                    return true;
                };

                //5A_Add LearnSkill: "this.allAxAddSkill(Id)"
                Game_Interpreter.prototype.allAxAddSkill = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        battleunit[1].learnSkill(Id); 
                    }
                       
                    }
                    return true;
                };

                //6A_Add ForgetSkill: "this.allAxForgetSkill(Id)"
                Game_Interpreter.prototype.allAxForgetSkill = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        battleunit[1].forgetSkill(Id); 
                    }
                       
                    }
                    return true;
                };

                //7A_Add Recover All: "this.allAxRecover()"
                Game_Interpreter.prototype.allAxRecover = function() {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' ) && (!battleunit[1].isDead())) {  
                        battleunit[1].recoverAll(); 
                    }
                       
                    }
                    return true;
                };

                //8A_Add Gain HP: "this.allAxGainHp(Id)"
                Game_Interpreter.prototype.allAxGainHp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainHp(id);battleunit[1].startDamagePopup();
                    }
                       
                    }
                    return true;
                };

                //9A_Add Gain MP: "this.allAxGainMp(Id)"
                Game_Interpreter.prototype.allAxGainMp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainMp(id); 
                    }
                       
                    }
                    return true;
                };

                //10A_Add Gain Tp: "this.allAxGainTp(Id)"
                Game_Interpreter.prototype.allAxGainTp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainTp(id); 
                    }
                       
                    }
                    return true;
                };

                //11A_Add Check&RemoveState: "this.allAxCheckRemoveState(checkId, removeId)"
                Game_Interpreter.prototype.allAxCheckRemoveState = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].removeState(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //12A_Add Check&AddState: "this.allAxCheckAddState(checkId, addId)"
                Game_Interpreter.prototype.allAxCheckAddState = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].addState(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //13A_Add Check&AddSkill: "this.allAxCheckAddSkill(checkId, addId)"
                Game_Interpreter.prototype.allAxCheckAddSkill = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if (battleunit[1].hasSkill(checkId)) {
                            battleunit[1].learnSkill(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //14A_Add Check&RemoveSkill: "this.allAxCheckRemoveSkill(checkId, removeId)"
                Game_Interpreter.prototype.allAxCheckRemoveSkill = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if (battleunit[1].hasSkill(checkId)) {
                            battleunit[1].forgetSkill(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //15A_Add CheckState&AddSkill: "this.allAxCheckStateAddSkill(checkId, addId)"
                Game_Interpreter.prototype.allAxCheckStateAddSkill = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].learnSkill(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //16A_Add CheckSkill&AddState:"this.allAxCheckSkillAddState(checkId, addId)"
                Game_Interpreter.prototype.allAxCheckSkillAddState = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if (battleunit[1].hasSkill(checkId)) {
                            battleunit[1].addState(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //17A_Add CheckState&RemoveSkill:"this.allAxCheckStateRemoveSkill(checkId, removeId)"
                Game_Interpreter.prototype.allAxCheckStateRemoveSkill = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].forgetSkill(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //18A_Add CheckSkill&RemoveState:"this.allAxCheckSkillRemoveState(checkId, removeId)"
                Game_Interpreter.prototype.allAxCheckSkillRemoveState = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].hasSkill(checkId)) {
                            battleunit[1].removeState(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //19A_Add Revive: "this.allAxRevive(Id)"
                Game_Interpreter.prototype.allAxRevive = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(Id)) {
                            this.unitRevive([i]);
                        }
                    }
                       
                    }
                    return true;
                };

                //20A_Add SelfSwitch: "this.allAxSelfSwitch(checkId, letters)"
                Game_Interpreter.prototype.allAxSelfSwitch = function(checkId, letters) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            var key = [this._mapId, ([i]), letters];$gameSelfSwitches.setValue(key, false);
                        }
                    }
                       
                    }
                    return true;
                };

                //21A_Add EraseEvent: "this.allAxEraseEvent(checkId)"
                Game_Interpreter.prototype.allAxEraseEvent = function(checkId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor')) {  
                        if ((battleunit[1].isStateAffected(checkId)) && (!eventunit._erased)) {
                            $gameMap.eraseEvent([i])
                        }
                    }
                       
                    }
                    return true;
                };

                //22A_Add Balloon: "this.allAxBalloon(checkId, Id)"
                Game_Interpreter.prototype.allAxBalloon = function(checkId, Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) { 
                            eventunit.requestBalloon(Id) 
                        }
                    }
                       
                    }
                    return true;
                };

                //23A_CheckAddAnimation:  "this.allAxCheckAddAni(checkId, aniId);"
                Game_Interpreter.prototype.allAxCheckAddAni = function(checkId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {  
                            eventunit.requestAnimation(aniId);
                        }
                    }
                       
                    }
                    return true;
                };


//EnemyUnit:
//---------->

                //1E_Add State: "this.allExAddState(Id)"
                Game_Interpreter.prototype.allExAddState = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].addState(Id); 
                    }
                       
                    }
                    return true;
                };

                //2E_Remove State: "this.allExRemoveState(Id)"
                Game_Interpreter.prototype.allExRemoveState = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].removeState(Id); 
                    }
                       
                    }
                    return true;
                };

                //3E_Request Animation: "this.allExAnimation(Id)"
                Game_Interpreter.prototype.allExAnimation = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        eventunit.requestAnimation(Id); 
                    }
                       
                    }
                    return true;
                };

                //4E_Start EventPage: "this.allExStartPage(Id)"
                Game_Interpreter.prototype.allExStartPage = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        eventunit = $gameMap.event([i], id);
                        eventunit.start();     
                    }
                       
                    }
                    return true;
                };

                //5E_Add Recover All: "this.allExRecover()"
                Game_Interpreter.prototype.allExRecover = function() {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].recoverAll(); 
                    }
                       
                    }
                    return true;
                };

                //6E_Add Gain HP: "this.allExGainHp(Id)"
                Game_Interpreter.prototype.allExGainHp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainHp(id);battleunit[1].startDamagePopup();
                    }
                       
                    }
                    return true;
                };

                //7E_Add Gain MP: "this.allExGainMp(Id)"
                Game_Interpreter.prototype.allExGainMp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainMp(id); 
                    }
                       
                    }
                    return true;
                };

                //8E_Add Gain TP: "this.allExGainTp(Id)"
                Game_Interpreter.prototype.allExGainTp = function(id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        battleunit[1].gainTp(id); 
                    }
                       
                    }
                    return true;
                };

                //9E_Add Check&RemoveState:"this.allExCheckRemoveState(checkId, removeId)"
                Game_Interpreter.prototype.allExCheckRemoveState = function(checkId, removeId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].removeState(removeId)
                        }
                    }
                       
                    }
                    return true;
                };
       
                //10E_Add Check&AddState:"this.allExCheckAddState(checkId, addId)"
                Game_Interpreter.prototype.allExCheckAddState = function(checkId, addId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            battleunit[1].addState(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //11E_Add Revive: "this.allExRevive(Id)"
                Game_Interpreter.prototype.allExRevive = function(Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(Id)) {
                            this.unitRevive([i]);
                        }
                    }
                       
                    }
                    return true;
                };

                //12E_Add SelfSwitch: "this.allExSelfSwitch(checkId, letters)"
                Game_Interpreter.prototype.allExSelfSwitch = function(checkId, letters) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {
                            var key = [this._mapId, ([i]), letters];$gameSelfSwitches.setValue(key, false);
                        }
                    }
                       
                    }
                    return true;
                };

                //13E_Add EraseEvent: "this.allExEraseEvent(checkId)"
                Game_Interpreter.prototype.allExEraseEvent = function(checkId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy')) {  
                        if ((battleunit[1].isStateAffected(checkId)) && (!eventunit._erased)) {
                            $gameMap.eraseEvent([i])
                        }
                    }
                       
                    }
                    return true;
                };

                //14E_Add Balloon: "this.allExBalloon(checkId, Id)"
                Game_Interpreter.prototype.allExBalloon = function(checkId, Id) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) { 
                            eventunit.requestBalloon(Id) 
                        }
                    }
                       
                    }
                    return true;
                };

                //15E_CheckAddAnimation:  "this.allExCheckAddAni(checkId, aniId);"
                Game_Interpreter.prototype.allExCheckAddAni = function(checkId, aniId) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId)) {  
                            eventunit.requestAnimation(aniId);
                        }
                    }
                       
                    }
                    return true;
                };

//TeamUnit:
//---------->

                //1T_Add State: "this.allTxAddState(Id, "team")"
                Game_Interpreter.prototype.allTxAddState = function(Id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].addState(Id); 
                    }
                       
                    }
                    return true;
                };

                //2T_Remove State: "this.allTxRemoveState(Id, "team")"
                Game_Interpreter.prototype.allTxStateRemove = function(Id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].removeState(Id); 
                    }
                       
                    }
                    return true;
                };

                //3T_Request Animation: "this.allTxRemoveState(Id, "team")"
                Game_Interpreter.prototype.allTxAnimation = function(Id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        eventunit.requestAnimation(Id); 
                    }
                       
                    }
                    return true;
                };

                //4T_Start EventPage: "this.allTxStartPage(Id, "team")"
                Game_Interpreter.prototype.allTxStartPage = function(id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        eventunit = $gameMap.event([i], id);
                        eventunit.start();     
                    }
                       
                    }
                    return true;
                };

                //5T_Add Recover "this.allTxRecover("team")"
                Game_Interpreter.prototype.allTxRecover = function(team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].recoverAll(); 
                    }
                       
                    }
                    return true;
                };

                //6T_Add Gain HP: "this.allTxGainHp(Id, "team")"
                Game_Interpreter.prototype.allTxGainHp = function(id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].gainHp(id);battleunit[1].startDamagePopup();
                    }
                       
                    }
                    return true;
                };

                //7T_Add Gain MP: "this.allTxGainMp(Id, "team")"
                Game_Interpreter.prototype.allTxGainMp = function(id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].gainMp(id); 
                    }
                       
                    }
                    return true;
                };

                //8T_Add Gain TP: "this.allTxGainTp(Id, "team")"
                Game_Interpreter.prototype.allTxGainTp = function(id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead()) && (battleunit[1].srpgTeam() == team)) {  
                        battleunit[1].gainTp(id); 
                    }
                       
                    }
                    return true;
                };

                //9T_Add Check&RemoveState: "this.allTxCheckRemoveState(checkId, removeId, "team")"
                Game_Interpreter.prototype.allTxCheckRemoveState = function(checkId, removeId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId) && (battleunit[1].srpgTeam() == team)) {
                            battleunit[1].removeState(removeId)
                        }
                    }
                       
                    }
                    return true;
                };

                //10T_Add Check&AddState: "this.allTxCheckAddState(checkId, addId, "team")"
                Game_Interpreter.prototype.allTxCheckAddState = function(checkId, addId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId) && (battleunit[1].srpgTeam() == team)) {
                            battleunit[1].addState(addId)
                        }
                    }
                       
                    }
                    return true;
                };

                //11T_Add Revive: "this.allTxRevive(Id, "team")"
                Game_Interpreter.prototype.allTxRevive = function(Id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(Id) && (battleunit[1].srpgTeam() == team)) {
                            this.unitRevive([i]);
                        }
                    }
                       
                    }
                    return true;
                };

                //12T_Add SelfSwitch: "this.allTxSelfSwitch(checkId, letters, "team")"
                Game_Interpreter.prototype.allTxSelfSwitch = function(checkId, letters, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId) && (battleunit[1].srpgTeam() == team)) {
                            var key = [this._mapId, ([i]), letters];$gameSelfSwitches.setValue(key, false);
                        }
                    }
                       
                    }
                    return true;
                };

                //13T_Add EraseEvent: "this.allTxEraseEvent(checkId, "team")"
                Game_Interpreter.prototype.allTxEraseEvent = function(checkId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {  
                        if ((battleunit[1].isStateAffected(checkId)) && (!eventunit._erased) && (battleunit[1].srpgTeam() == team)) {
                            $gameMap.eraseEvent([i])
                        }
                    }
                       
                    }
                    return true;
                };

                //14T_Add Balloon: "this.allTxBalloon(checkId, Id, "team")"
                Game_Interpreter.prototype.allTxBalloon = function(checkId, Id, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId) && (battleunit[1].srpgTeam() == team)) { 
                            eventunit.requestBalloon(Id) 
                        }
                    }
                       
                    }
                    return true;
                };

                //15T_CheckAddAnimation:  "this.allTxCheckAddAni(checkId, aniId, "team");"
                Game_Interpreter.prototype.allTxCheckAddAni = function(checkId, aniId, team) {
                    for (var i = 1; i <= $gameMap.events().length; i++) {
                    var battleunit = $gameSystem.EventToUnit([i]);
                    var eventunit = $gameMap.event([i]);
                    if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                        if (battleunit[1].isStateAffected(checkId) && (battleunit[1].srpgTeam() == team)) {  
                            eventunit.requestAnimation(aniId);
                        }
                    }
                       
                    }
                    return true;
                };


//----------End-:Thanks for the Attention,have a nice day^^


      
  

 
 })();
