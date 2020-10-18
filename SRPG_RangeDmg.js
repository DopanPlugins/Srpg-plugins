//=============================================================================
// SRPG_RangeDmg.js
//=============================================================================
/*:
 * @plugindesc v1.0 <SRPG_RangeDmg> for Changing the Dmg&Hitrate of Ranged Weapons depending on the Distance
 * @author dopan
 *
 *
 *
 *
 * @param srpgLowestHRstate
 * @desc This state is used for 70% & 80% .The State should have an ExParam of "HitRate -25%". 
 * @type state
 * @default 0
 * 
 * @param srpgLowHRstate
 * @desc  This state is used for 90% & 100% .The State should have an ExParam of "HitRate -15%". 
 * @type state
 * @default 0
 *
 * @param srpgHighHRstate
 * @desc This state is used for 120% & 130% .The State should have an ExParam of "HitRate +15%".  
 * @type state
 * @default 0
 * 
 * @param srpgHighestHRstate
 * @desc This state is used for 140% & 150% .The State should have an ExParam of "HitRate +25%".  
 * @type state
 * @default 0
 * 
 * @param srpgCustomHRstate
 * @desc This state is ca be used for a Custom HitRate state.(disabled = 0) 
 * @type state
 * @default 0
 *
 *
 * @param Dmg_Multiplier
 * @desc Use this VarID instead of "x" in the Skill DMGformula.Example:"(your default formula) * (v[x] * 0.1)".
 * @type variable
 * @default 0
 *
 *
 *
 * @param srpgCustomEditDMG%
 * @desc This is the Selfmade DMG_Multiplier which can be a number or a formula that results in a number (10 = 100%).
 * @default 2
 *
 * @param srpgRangeDMG_CustomEdit%
 * @desc "0 && 1" Disables this Distance_Option,there cant be 2Distances at the same Time.(use valid Distance_Option).
 * @default 0 && 1
 *
 * @param srpgRangeDMG_CustomEdit%_b
 * @desc A Valid Distance_Option is any Number.By default "CustomEdit" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_70%
 * @desc (insert Distance_Option)By default "1" is the Distance that will set the Dmg to 70%.
 * @default 1
 *
 * @param srpgRangeDMG_70%_b
 * @desc (insert extra Distance_Option)By default "10" is the 2nd Distance that will set the Dmg to 70%.
 * @default 11
 *
 * @param srpgRangeDMG_80%
 * @desc (insert Distance_Option)By default "9" is the Distance that will set the Dmg to 80%.
 * @default 9
 *
 * @param srpgRangeDMG_80%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_90%
 * @desc (insert Distance_Option)By default "8" is the Distance that will set the Dmg to 90%.
 * @default 8
 *
 * @param srpgRangeDMG_90%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_90%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_100%
 * @desc (insert Distance_Option)By default "7" is the Distance that will set the Dmg to 100%.
 * @default 7
 *
 * @param srpgRangeDMG_100%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_100%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_110%
 * @desc (insert Distance_Option)By default "6" is the Distance that will set the Dmg to 110%.
 * @default 6
 *
 * @param srpgRangeDMG_110%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_110%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_120%
 * @desc (insert Distance_Option)By default "5" is the Distance that will set the Dmg to 120%.
 * @default 5
 *
 * @param srpgRangeDMG_120%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_120%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_130%
 * @desc (insert Distance_Option)By default "4" is the Distance that will set the Dmg to 130%.
 * @default 4
 *
 * @param srpgRangeDMG_130%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_130%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_140%
 * @desc (insert Distance_Option)By default "3" is the Distance that will set the Dmg to 140%.
 * @default 3
 *
 * @param srpgRangeDMG_140%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_140%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeDMG_150%
 * @desc (insert Distance_Option)By default "2" is the Distance that will set the Dmg to 150%.
 * @default 2
 *
 * @param srpgRangeDMG_150%_b
 * @desc (insert extra Distance_Option)By default "2nd Distance_150%DMG_b" is Disabled with using "0 && 1".
 * @default 0 && 1
 *
 * @param srpgRangeTypeBow
 * @desc Insert the ID of "Bow" (ranged)Weapon_Type to work with this Plugin.(default is Bow = 7).
 * @default 7
 *
 * @param srpgRangeTypeCrossbow
 * @desc Insert the ID of "Crossbow" (ranged)Weapon_Type to work with this Plugin.(default is Crossbow = 8).
 * @default 8
 *
 * @param srpgRangeTypeGun
 * @desc Insert the ID of "Gun" (ranged)Weapon_Type to work with this Plugin.(default is Gun = 9).
 * @default 9
 *
 * @param srpgRangeTypeCustom1
 * @desc Insert the ID of "Custom1" (ranged)Weapon_Type to work with this Plugin.(Disabled = 0).
 * @default 0
 *
 * @param srpgRangeTypeCustom2
 * @desc Insert the ID of "Custom2" (ranged)Weapon_Type to work with this Plugin.(Disabled = 0).
 * @default 0
 *
 *
 * @help  
 *
 * This Plugin allows you to change the DMG and the Hitrate that is used on Ranged Weapons.
 *
 * There are different Options by Default:
 * - 70% DMG uses the State : "srpgLowestHRstate" which is suppossed to use "HitRate -25%" 
 * - 80% DMG uses the State : "srpgLowestHRstate" which is suppossed to use "HitRate -25%"
 * - 90% DMG uses the State : "srpgLowHRstate" which is suppossed to use "HitRate -15%"
 * - 100% DMG uses the State : "srpgLowHRstate" which is suppossed to use "HitRate -15%"
 * - 110% DMG uses no State to change the Hitrate.
 * - 120% DMG uses the State : "srpgHighHRstate" which is suppossed to use "HitRate +15%"
 * - 130% DMG uses the State : "srpgHighHRstate" which is suppossed to use "HitRate +15%"
 * - 140% DMG uses the State : "srpgHighestHRstate" which is suppossed to use "HitRate +25%"
 * - 150% DMG uses the State : "srpgHighestHRstate" which is suppossed to use "HitRate +25%"
 * => you can also add your Custom HitRate state "srpgCustomHRstate" which is disabled by default.
 * => the "srpgCustomHRstate" will only affect the "Custom Distances"(max 2 different) & "Custom DMG multiplier".
 * => you cant change what DMG% uses what State, but its up to you to set up the States.
 *
 * Default List of Distances and DMG% :
 * - 70% DMG uses Distance 1 . And 70% DMG_b uses Distance 10.(Distances 1 and 10 will have 70% DMG) 
 * - 80% DMG uses Distance 9 . And 80% DMG_b is disabled. 
 * - 90% DMG uses Distance 8 . And 90% DMG_b is disabled.  
 * - 100% DMG uses Distance 7 . And 100% DMG_b is disabled.  
 * - 110% DMG uses Distance 6 . And 110% DMG_b is disabled.  
 * - 120% DMG uses Distance 5 . And 120% DMG_b is disabled.  
 * - 130% DMG uses Distance 4 . And 130% DMG_b is disabled.  
 * - 140% DMG uses Distance 3 . And 140% DMG_b is disabled.  
 * - 150% DMG uses Distance 2 . And 150% DMG_b is disabled.  
 * => All Default-distances can be Changed in the Plugin Param.
 *
 * Example How a Skill Damage Formula has to Setup for this Plugin:
 * -> you need to change any Damage Formula this way which is used on ranged weapons attackSkill.
 *
 * Example :  (Skill DMG Formula)
 * - Default Battle Formula = " a.atk * 4 - b.def * 2 " (example for a default attack Formula)
 * - Edited Damage Formula = " (a.atk * 4 - b.def * 2)  * (v[97] * 0.1) " (new attack Formula for this Plugin)
 *
 * => you always have to put your default Formula in "()" and add "  * (v[97] * 0.1)  " at the End.
 * => this has to be this way because $GameVariables dont use "decimals"
 * => so we use "10" as DMG Multiplier for "100% DMG". Or "7" for "70% DMG".Or "15" for "150% DMG".. ect.
 *
 * Pls Note : All Units that Dont use Ranged Weapons which are Connected to this Plugin with "srpgRangeType",
 *            and their WeaponTypeID,will use "10" as DMG multiplier to get the Default DMG of 100%.
 *
 * Plugin Scriptcalls:
 *---------------------
 *
 * - "this.srpgRangeDmgEditor(true/false);"
 *
 *
 * "true" or "false" decides if you use the States for changing the HitRates or Not. 
 * - "true" = Use the states.
 * - "false" = Dont use State to change Hitrate.
 *
 * => so where do we put this?
 * - in the demo i used a Common Event "Battle" which runs if SRPG Batte Map is active. 
 *  also i added the if Condition,to only trigger if "actor target"-Subphase is active
 * -> this way it should only work on actors,but with using an additional enemy subphase, this should also work for enemys
 *    (thats not tested on enemys) 
 *
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
 * - first Release 18.10.2020 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_RangeDmg") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_RangeDmg>'); });

  
  var _srpgRangeDmg = parameters['Dmg_Multiplier'] || 0;
  
  var _srpgEditedRangeDmg = parameters['srpgCustomEditDMG%'] || 2;
  
  var _srpgRangeDmgCustom = parameters['srpgRangeDMG_CustomEdit%'] || 0 && 1;
  var _srpgRangeDmgCustom_b = parameters['srpgRangeDMG_CustomEdit%_b'] || 0 && 1;
  var _srpgRangeDmg_70 = parameters['srpgRangeDMG_70%'];//default_distance 1
  var _srpgRangeDmg_70_b = parameters['srpgRangeDMG_70%_b'];//default_distance 10
  var _srpgRangeDmg_80 = parameters['srpgRangeDMG_80%'];//default_distance 9
  var _srpgRangeDmg_80_b = parameters['srpgRangeDMG_80%_b'];// no default_distance
  var _srpgRangeDmg_90 = parameters['srpgRangeDMG_90%'];//default_distance 8
  var _srpgRangeDmg_90_b = parameters['srpgRangeDMG_90%_b'];// no default_distance
  var _srpgRangeDmg_100 = parameters['srpgRangeDMG_100%'];//default_distance 7
  var _srpgRangeDmg_100_b = parameters['srpgRangeDMG_100%_b'];// no default_distance
  var _srpgRangeDmg_110 = parameters['srpgRangeDMG_110%'];//default_distance 6
  var _srpgRangeDmg_110_b = parameters['srpgRangeDMG_110%_b'];// no default_distance
  var _srpgRangeDmg_120 = parameters['srpgRangeDMG_120%'];//default_distance 5
  var _srpgRangeDmg_120_b = parameters['srpgRangeDMG_120%_b'];// no default_distance
  var _srpgRangeDmg_130 = parameters['srpgRangeDMG_130%'];//default_distance 4
  var _srpgRangeDmg_130_b = parameters['srpgRangeDMG_130%_b'];// no default_distance
  var _srpgRangeDmg_140 = parameters['srpgRangeDMG_140%'];//default_distance 3
  var _srpgRangeDmg_140_b = parameters['srpgRangeDMG_140%_b'];// no default_distance
  var _srpgRangeDmg_150 = parameters['srpgRangeDMG_150%'];//default_distance 2
  var _srpgRangeDmg_150_b = parameters['srpgRangeDMG_150%_b'];// no default_distance

  var _srpgRangeTypeBow = parameters['srpgRangeTypeBow'];// default WT is 7
  var _srpgRangeTypeCrossbow = parameters['srpgRangeTypeCrossbow'];// default WT is 8
  var _srpgRangeTypeGun = parameters['srpgRangeTypeGun'];// default WT is 9
  var _srpgRangeTypeCustom1 = parameters['srpgRangeTypeCustom1'];// default WT is Disabled with "0"
  var _srpgRangeTypeCustom2 = parameters['srpgRangeTypeCustom2'];// default WT is Disabled with "0"

  var _lowestHRstate = parameters['srpgLowestHRstate'] || 0;
  var _lowHRstate = parameters['srpgLowHRstate'] || 0;
  var _highHRstate = parameters['srpgHighHRstate'] || 0;
  var _highestHRstate = parameters['srpgHighestHRstate'] || 0;
  var _customHRstate = parameters['srpgCustomHRstate'] || 0;
  
  var changeHR = false || true;
  var _srpgRangeDmgCheck = false || true;
  
//-----------------------------------------------------------------------------------------

//Plugin ScriptCall:

	var _srpgAfterAction = Scene_Map.prototype.srpgAfterAction;
	Scene_Map.prototype.srpgAfterAction = function() {
             for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);
             if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {  
                 // check HitRate States and remove them if Affected
                 if (battleunit[1].isStateAffected(_lowestHRstate)) {
                     battleunit[1].removeState(_lowestHRstate);
                 };  
                 if (battleunit[1].isStateAffected(_lowHRstate)) {
                     battleunit[1].removeState(_lowHRstate);
                 }; 
                 if (battleunit[1].isStateAffected(_highHRstate)) {
                     battleunit[1].removeState(_highHRstate);
                 };  
                 if (battleunit[1].isStateAffected(_highestHRstate)) {
                     battleunit[1].removeState(_highestHRstate);
                 }; 
                 if (battleunit[1].isStateAffected(_customHRstate)) {
                     battleunit[1].removeState(_customHRstate);
                 }; 
             }
                       
             }
	     _srpgAfterAction.call(this);
	};




        // ScriptCall:  "this.srpgRangeDmgEditor(true/false);"
	Game_Interpreter.prototype.srpgRangeDmgEditor = function(changeHR) {
            if (($gameTemp.activeEvent() != null)) { 
                var activeEventID = $gameTemp.activeEvent().eventId();  
                var activeUnit = $gameSystem.EventToUnit(activeEventID)[1];
                var distance = $gameMap.distance($gameMap.event(activeEventID).x, $gameMap.event(activeEventID).y, $gamePlayer.x, $gamePlayer.y );
                if ((activeUnit.weapons()[0].wtypeId == _srpgRangeTypeBow) || 
                    (activeUnit.weapons()[0].wtypeId == _srpgRangeTypeCrossbow) || 
                    (activeUnit.weapons()[0].wtypeId == _srpgRangeTypeGun) || 
                    (activeUnit.weapons()[0].wtypeId == _srpgRangeTypeCustom1) ||
                    (activeUnit.weapons()[0].wtypeId == _srpgRangeTypeCustom2) ) {
                    if (distance > 0) {
                        if ((distance == _srpgRangeDmg_70) || (distance == _srpgRangeDmg_70_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 7);
                            if (changeHR == true) {
                                activeUnit.addState(_lowestHRstate);
                            }; 
                            if (activeUnit.isStateAffected(_lowHRstate)) {
                                activeUnit.removeState(_lowHRstate);
                            };  
                            if (activeUnit.isStateAffected(_highHRstate)) {
                                activeUnit.removeState(_highHRstate);
                            };  
                            if (activeUnit.isStateAffected(_highestHRstate)) {
                                activeUnit.removeState(_highestHRstate);
                            }; 
                            if (activeUnit.isStateAffected(_customHRstate)) {
                                activeUnit.removeState(_customHRstate);
                            };   
                        }; 
		   
                        if ((distance == _srpgRangeDmg_80) || (distance == _srpgRangeDmg_80_b)) {
                           $gameVariables.setValue(_srpgRangeDmg, 8);
                            if (changeHR == true) {
                                activeUnit.addState(_lowestHRstate);
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                };   
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };    
                            }; 
                        };
							   
                        if ((distance == _srpgRangeDmg_90) || (distance == _srpgRangeDmg_90_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 9);
                            if (changeHR == true) {
                                activeUnit.addState(_lowHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };  
                            }; 
                        };
							   
                        if ((distance == _srpgRangeDmg_100) || (distance == _srpgRangeDmg_100_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 10);
                            if (changeHR == true) {
                                activeUnit.addState(_lowHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };
                            }; 
                        };
							   
                        if ((distance == _srpgRangeDmg_110) || (distance == _srpgRangeDmg_110_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 11);
                            //activeUnit.addState(nothing); // & remove all 4 other States if affected
                            if (activeUnit.isStateAffected(_lowestHRstate)) {
                                activeUnit.removeState(_lowestHRstate);
                            };  
                            if (activeUnit.isStateAffected(_lowHRstate)) {
                                activeUnit.removeState(_lowHRstate);
                            }; 
                            if (activeUnit.isStateAffected(_highHRstate)) {
                                activeUnit.removeState(_highHRstate);
                            };  
                            if (activeUnit.isStateAffected(_highestHRstate)) {
                                activeUnit.removeState(_highestHRstate);
                            }; 
                            if (activeUnit.isStateAffected(_customHRstate)) {
                                activeUnit.removeState(_customHRstate);
                            }; 
                        };
							   
                        if ((distance == _srpgRangeDmg_120) || (distance == _srpgRangeDmg_120_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 12);
                            if (changeHR == true) {							   
                                activeUnit.addState(_highHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };   
                            };
                        };
							   
                        if ((distance == _srpgRangeDmg_130) || (distance == _srpgRangeDmg_130_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 13);
                            if (changeHR == true) {								   
                                activeUnit.addState(_highHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };
                            };
                        };
							   
                        if ((distance == _srpgRangeDmg_140) || (distance == _srpgRangeDmg_140_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 14);
                            if (changeHR == true) {
                                activeUnit.addState(_highestHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };
                            };
                        };
							   
                        if ((distance == _srpgRangeDmg_150) || (distance == _srpgRangeDmg_150_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, 15);
                            if (changeHR == true) {
                                activeUnit.addState(_highestHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_customHRstate)) {
                                    activeUnit.removeState(_customHRstate);
                                };
                            };
                        };
			   
                        if ((distance == _srpgRangeDmgCustom) || (distance == _srpgRangeDmgCustom_b)) {
                            $gameVariables.setValue(_srpgRangeDmg, _srpgEditedRangeDmg);
                            if (changeHR == true) {	   
                                activeUnit.addState(_customHRstate);
                                if (activeUnit.isStateAffected(_lowestHRstate)) {
                                    activeUnit.removeState(_lowestHRstate);
                                };  
                                if (activeUnit.isStateAffected(_lowHRstate)) {
                                    activeUnit.removeState(_lowHRstate);
                                }; 
                                if (activeUnit.isStateAffected(_highHRstate)) {
                                    activeUnit.removeState(_highHRstate);
                                };  
                                if (activeUnit.isStateAffected(_highestHRstate)) {
                                    activeUnit.removeState(_highestHRstate);
                                };
                            };
                        };

                    }; // closes the "if Distance > 0"

                // If the Units used WeapopnType isnt a Type of "_srpgRangeDmgType"..
                }else{
                        $gameVariables.setValue(_srpgRangeDmg, 10); // ..that will put the DMG Multiplier to Default (100%)
                        // check HitRate States and remove them if Affected
                        if (activeUnit.isStateAffected(_lowestHRstate)) {
                            activeUnit.removeState(_lowestHRstate);
                        };  
                        if (activeUnit.isStateAffected(_lowHRstate)) {
                            activeUnit.removeState(_lowHRstate);
                        }; 
                        if (activeUnit.isStateAffected(_highHRstate)) {
                            activeUnit.removeState(_highHRstate);
                        };  
                        if (activeUnit.isStateAffected(_highestHRstate)) {
                            activeUnit.removeState(_highestHRstate);
                        }; 
                        if (activeUnit.isStateAffected(_customHRstate)) {
                            activeUnit.removeState(_customHRstate);
                        }; 

                }; // closes the "else"

            }; // closes the "(($gameTemp.activeEvent() != null) && ($gameTemp.targetEvent() != null))"

	}; // closes the "Game_Interpreter"   


//-----------------------------------------------------------------------------------------


//--End:

})();