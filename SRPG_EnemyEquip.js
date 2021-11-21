//=============================================================================
// SRPG_EnemyEquip.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_EnemyEquip> for SRPG this includes Stealing Options
 * @author dopan
 *
 *
 * @param Steal Chance
 * @desc this Number makes the Steal chance in %. Min is "1", Max is "100".
 * @type number
 * @min 1
 * @max 100
 * @default 50
 *
 * @param Controll Draw Text
 * @desc Switch that lets you decide if a text is drawn into BattleStatus Window if unequiped
 * @type boolean
 * @default true
 *
 * @param noWeapon Text
 * @desc Text that is used on weaponSlot, if "Controll Draw Text" is "true"
 * @default No Weapon
 *
 * @param noShield Text
 * @desc Text that is used on shieldSlot, if "Controll Draw Text" is "true"
 * @default No Shield
 *
 * @param noHead Text
 * @desc Text that is used on headSlot, if "Controll Draw Text" is "true"
 * @default No Head
 *
 * @param noBody Text
 * @desc Text that is used on bodySlot, if "Controll Draw Text" is "true"
 * @default No Body 
 *
 * @param noAccessory Text
 * @desc Text that is used on accessorySlot, if "Controll Draw Text" is "true"
 * @default No Accessory
 *
 *
 * @help  
 *
 * this Plugins requires: 
 *  "SRPG_Core.js"
 *
 * This Plugin let Enemys use Equipment (only 5 base slots) & and it adds the Equipment
 * into the battleStatusWindow of actor&enemys (also only 5 slots,the window couldnt store more)
 *
 * Actors can still use more slots, but only the 5 will be displayed in that window,
 * and only these 5_Slots_equipment can be stolen..
 *
 * this Plugin includes a stealing fundtion!
 * I admit that this plugin stealing_function is limited aswell as the enemy equipment
 * (having only 5 base slots ect)
 *
 * But that way its easier to Setup for the PluginUser,its easier to explain the Setup. 
 * And it was easier to code it that way (atleast for me,my JS skills are still limited).
 *
 * The plugin param allows you to change a few things on the "draw text" in the battleStatusWindow.
 *
 * Everything else is handled with EnemyNotetags, SkillNoteTags & Scriptcalls..
 *
 * (by editing the Plugins JS_code the battleStatusWindow can be changed if needed,
 *  but i think i already made the best of it)
 *
 * When using EnemyNote to set Equip,
 * every enemyClone with the same EnemyID will have the same Equip..
 * 
 * But you can also use 2 Scriptcalls,for changing Enemy equipment on Battlemap,
 * based on the EnemyUnits eventID..
 *
 * By default the stealchance is 50%, this can be changed in the Plugin param,
 *  or by using the plugin Scriptcall.Incase its wanted to have a UnitRelated or SkillRelated StealChance:
 * ->Such change should happen in the eventBeforeAction,or with "customExecution" (with scriptcall).
 * Pls Note: (plugin auto reset stealChance)
 * The StealChance will always be reseted to the Plugin param stealChance, in the AfterAction_Scene.
 *
 * Default equipSlots are :
 *-------------------------
 * 0 = weapon slot
 * 1 = shield slot
 * 2 = head slot
 * 3 = body slot
 * 4 = accessory slot
 *
 *
 * Plugin Scriptcalls:
 *--------------------
 *
 * $gameTemp.changeEnemyArmor(eventID, SlotID, ArmorID);   //by Default armor Slot IDs are "1","2","3","4"
 *                                                      
 *
 * $gameTemp.changeEnemyWeapon(eventID, SlotID, WeaponID); //by Default weapon Slot ID is "0"
 *
 * (weaponID and ArmorID , is the Number related to the equipment in your Project)
 * => using 0 on weaponID or ArmorID, will delete any equipment in that slot!!
 *
 * these 2 Scriptcalls above can be used on battlemap to change the Equipment of Enemy Units individually
 *
 *----------------------------------------------
 * Scriptcall to change the Stealchance in Game:
 *----------------------------------------------
 *
 * "this.changeStealChance(chanceNumber);"// usage in Events ,commonEvents ,"Game_Interpreter.prototype"-functions ect
 *
 * or "Game_Interpreter.prototype.changeStealChance.call(this, chanceNumber);"// usage if used in other pluginsCodes
 *
 * chanceNumber can be any number betwen "1" and "100". "100" means 100% stealChance.
 * (default is StealChanceNumber in the Plugin param)
 *
 * pls Note:
 *-> i might implement Actor/Enemy/Class/State/Skill -Notetags, that can change the stealChance in later pluginUpdates
 *
 *
 * Plugin NoteTags:
 *-----------------
 *----------------
 * Enemy noteTags:
 *----------------
 *   <srpgWeapon:x>
 *   <srpgShield:x>
 *   <srpgHead:x>
 *   <srpgBody:x>
 *   <srpgAccessory:x>
 *
 * "x" is the number of the ID of Weapon or Armor in your project
 *
 *---------------
 * SkillNoteTags:
 *---------------
 * These noteTags , make a skill into a "stealing_skill"
 *
 * <srpgSteal:weapon> 
 * <srpgSteal:shield> 
 * <srpgSteal:head> 
 * <srpgSteal:body> 
 * <srpgSteal:accessory> 
 *
 *
 *------------------------------------
 * About gain Exp & gain Gold -skills:
 *------------------------------------
 *
 * for skills that add gold or extra exp, you can use an CommonEvent on the skill.
 * (This can probably also be solved with the battleformula)
 * There you can put a math script or a variable that rolls the succes rate.
 * Default Scripts for gainGold and gainExp are :
 * 
 *  $gameParty.gainGold(n);
 *  $gameActors.actor(ActorID).gainExp(exp)
 *
 *
 * (i might implement such Steal skills with later Plugin updates,but for now i preffer
 * to figure out if this plugins works completly bugfree,before adding such skills)
 *
 * => if you find any bugs pls let me know!
 *
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
 * - first Release 21.11.2021 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_EnemyEquip") || $plugins.filter(function (plugin) {
                   return plugin.description.contains('<SRPG_EnemyEquip>'); });

  var _drawText = parameters['Controll Draw Text'] || 'true';

  var _textNoWeapon = parameters['noWeapon Text'] || _textNoWeapon;

  var _textNoShield = parameters['noShield Text'] || _textNoShield;

  var _textNoHead = parameters['noHead Text'] || _textNoHead;

  var _textNoBody = parameters['noBody Text'] || _textNoBody;

  var _textNoAccessory = parameters['noAccessory Text'] || _textNoAccessory;

  var _stealChance = Number(parameters['Steal Chance'] || 50);

//-----------------------------------------------------------------------------------------

// Setup for Steal skill:
//-----------------------

    // this.changeStealChance(chanceNumber);Game_Interpreter.prototype.changeStealChance.call(this, chanceNumber); 
    Game_Interpreter.prototype.changeStealChance = function(chanceNumber) {
        _stealChance = Number(chanceNumber);
        return _stealChance;
    };

    // add stuff to eventAfterAction_scene
    var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
    Scene_Map.prototype.srpgAfterAction = function() {
	 _srpgAfterActionScene.call(this);
         //reset ActorEquip Setup after Action,its needed incase actorUnit_Equip was stolen..
         //..and actorUnit equips something else during battle.
         $gameTemp.resetActorEquip();
         
         // reset stealChance to the Plugin param stealChance
         _stealChance = Number(parameters['Steal Chance']);
    };

    //this.nothingToSteal();
    Game_Action.prototype.nothingToSteal = function() {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add("There is Nothing to Steal \\|\\^");
    };
    //this.failedToSteal();
    Game_Action.prototype.failedToSteal = function() {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add("Failed to Steal \\|\\^");
    };
    //this.stealResult(itemName, msgIconID, eName);
    Game_Action.prototype.stealResult = function(itemName, msgIconID, eName) {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add(eName + "'s \\i["+ msgIconID +"]"+ itemName +" stolen!\\|\\^");
    };
    // scriptcall to change enemy armor "$gameTemp.changeEnemyArmor(eventID, SlotID, ArmorID);"
    Game_Temp.prototype.changeEnemyArmor = function(eventID, SlotID, ArmorID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleunit[0] === 'enemy') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID] = $dataArmors[ArmorID];
        }
    };
    // scriptcall to change enemy weapon "$gameTemp.changeEnemyWeapon(eventID, SlotID, ArmorID);"
    Game_Temp.prototype.changeEnemyWeapon = function(eventID, SlotID, WeaponID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleunit[0] === 'enemy') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID] = $dataWeapons[WeaponID];
        }
    };
    Game_Temp.prototype.resetActorEquip = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);
             if (battleunit && eventunit && (battleunit[0] === 'actor')) { 
                 if ((battleunit[1]._actorWeaponStolen === true) && (battleunit[1]._equips[0] !== 0)) {
                      battleunit[1]._actorWeaponStolen = false;
                 }
                 if ((battleunit[1]._actorShieldStolen === true) && (battleunit[1]._equips[1] !== 0)) {
                      battleunit[1]._actorShieldStolen = false;
                 }
                 if ((battleunit[1]._actorHeadStolen === true) && (battleunit[1]._equips[2] !== 0)) {
                      battleunit[1]._actorHeadStolen = false;
                 }
                 if ((battleunit[1]._actorBodyStolen === true) && (battleunit[1]._equips[3] !== 0)) {
                      battleunit[1]._actorBodyStolen = false;
                 }
                 if ((battleunit[1]._actorAccessoryStolen === true) && (battleunit[1]._equips[4] !== 0)) {
                      battleunit[1]._actorAccessoryStolen = false;
                 }
             }
        }
    };
    //overwrite  Game_Action.prototype.initialize
    //var SRPG_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.initialize = function(subject, forcing) {
        //SRPG_Game_Action_apply.call(subject, forcing);
        this._userEventID = 0;
        this._targetEventID = 0;
        this._subjectActorId = 0;
        this._subjectEnemyIndex = -1;
        this._forcing = forcing || false;
        this.setSubject(subject);
        this.clear();
    };
    Game_Action.prototype.setUserEventId = function() {
        this._userEventID = $gameTemp.activeEvent().eventId();
        return this._userEventID;
    };
    Game_Action.prototype.setTargetEventId = function() {
        this._targetEventID = $gameTemp.targetEvent().eventId();
        return this._targetEventID;
    };	
    // check used skillAction_itemObeject for meta"srpgSteal"
    var SRPG_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        SRPG_Game_Action_apply.call(this, target);
	     var result = target.result();
             this.setUserEventId();
             this.setTargetEventId();
	     if (this.item().meta.srpgSteal && result.isHit()) {
                 // chanceRoll var that represents the chance you rolled.
                 var chanceRoll = Math.floor(Math.random() * 100) + 1; 
                 //_stealChance is the PluginVar that stores % chance 
                 if (chanceRoll <= _stealChance) {		     
                     this.srpgStealing();
                 } else {this.failedToSteal()};
             }
    };
    //srpgStealing Setup
    Game_Action.prototype.srpgStealing = function() {
	if ($gameSystem.isSRPGMode() == true) {
            //get Unit data:
            var activeEventID = this._userEventID;
            var targetEventID = this._targetEventID;
            var activeBattleUnit = $gameSystem.EventToUnit(activeEventID);
            var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
            // check user&target: actorUser & enemyTarget
            if ((activeBattleUnit[0] === 'actor') && (targetBattleUnit[0] === 'enemy')) {
                 this.actorStealEnemy(activeEventID, targetEventID);
            };
            // check user&target: actorUser & actorTarget
            if ((activeBattleUnit[0] === 'actor') && (targetBattleUnit[0] === 'actor')) {
                 this.actorStealActor(activeEventID, targetEventID);
            };
            // check user&target: enemyUser & actorTarget
            if ((activeBattleUnit[0] === 'enemy') && (targetBattleUnit[0] === 'actor')) {
                 this.enemyStealActor(activeEventID, targetEventID);  
            };
            // check user&target: enemyUser & enemyTarget
            if ((activeBattleUnit[0] === 'enemy') && (targetBattleUnit[0] === 'enemy')) {
                 this.enemyStealEnemy(activeEventID, targetEventID);
            };
        };
    };
    // process stealing => actorUser & enemyTarget
    Game_Action.prototype.actorStealEnemy = function(activeEventID, targetEventID) {
        var userBattleUnit = $gameSystem.EventToUnit(activeEventID);
        var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[0] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "weapon") {
                var stolenWeaponId = targetBattleUnit[1]._equips[0].id;
                $gameParty.gainItem($dataWeapons[stolenWeaponId], 1);
                targetBattleUnit[1]._enemyWeaponStolen = true;
                targetBattleUnit[1]._equips[0] = 0;
                // get data for stealResult
                var itemName =  $dataWeapons[stolenWeaponId].name;
                var msgIconID = $dataWeapons[stolenWeaponId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[1] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "armor") {
                var stolenShieldId = targetBattleUnit[1]._equips[1].id;
                $gameParty.gainItem($dataArmors[stolenShieldId], 1);
                targetBattleUnit[1]._enemyShieldStolen = true;
                targetBattleUnit[1]._equips[1] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenShieldId].name;
                var msgIconID = $dataArmors[stolenShieldId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[2] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "head") {
                var stolenHeadId = targetBattleUnit[1]._equips[2].id;
                $gameParty.gainItem($dataArmors[stolenHeadId], 1);
                targetBattleUnit[1]._enemyHeadStolen = true;
                targetBattleUnit[1]._equips[2] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenHeadId].name;
                var msgIconID = $dataArmors[stolenHeadId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[3] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "body") {
                var stolenBodyId = targetBattleUnit[1]._equips[3].id;
                $gameParty.gainItem($dataArmors[stolenBodyId], 1);
                targetBattleUnit[1]._enemyBodyStolen = true;
                targetBattleUnit[1]._equips[3] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenBodyId].name;
                var msgIconID = $dataArmors[stolenBodyId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[4] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "accessory") {
                var stolenAccessoryId = targetBattleUnit[1]._equips[4].id;
                $gameParty.gainItem($dataArmors[stolenAccessoryId], 1);
                targetBattleUnit[1]._enemyAccessoryStolen = true;
                targetBattleUnit[1]._equips[4] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenAccessoryId].name;
                var msgIconID = $dataArmors[stolenAccessoryId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
    };
    // process stealing => actorUser & actorTarget
    Game_Action.prototype.actorStealActor = function(activeEventID, targetEventID) {
        var userBattleUnit = $gameSystem.EventToUnit(activeEventID);
        var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
	var targetActorId = targetBattleUnit[1]._actorId;
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[0]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "weapon") {
                var stolenWeaponId = $gameActors.actor(targetActorId).equips()[0].baseItemId;
                $gameParty.gainItem($dataWeapons[stolenWeaponId], 1);
                targetBattleUnit[1]._actorWeaponStolen = true;
                targetBattleUnit[1]._equips[0] = 0;
                // get data for stealResult
                var itemName =  $dataWeapons[stolenWeaponId].name;
                var msgIconID = $dataWeapons[stolenWeaponId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[1]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "armor") {
                var stolenShieldId = $gameActors.actor(targetActorId).equips()[1].baseItemId;
                $gameParty.gainItem($dataArmors[stolenShieldId], 1);
                targetBattleUnit[1]._actorShieldStolen = true;
                targetBattleUnit[1]._equips[1] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenShieldId].name;
                var msgIconID = $dataArmors[stolenShieldId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[2]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "head") {
                var stolenHeadId = $gameActors.actor(targetActorId).equips()[2].baseItemId;
                $gameParty.gainItem($dataArmors[stolenHeadId], 1);
                targetBattleUnit[1]._actorHeadStolen = true;
                targetBattleUnit[1]._equips[2] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenHeadId].name;
                var msgIconID = $dataArmors[stolenHeadId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[3]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "body") {
                var stolenBodyId = $gameActors.actor(targetActorId).equips()[3].baseItemId;
                $gameParty.gainItem($dataArmors[stolenBodyId], 1);
                targetBattleUnit[1]._actorBodyStolen = true;
                targetBattleUnit[1]._equips[3] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenBodyId].name;
                var msgIconID = $dataArmors[stolenBodyId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[4]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "accessory") {
                var stolenAccessoryId = $gameActors.actor(targetActorId).equips()[4].baseItemId;
                $gameParty.gainItem($dataArmors[stolenAccessoryId], 1);
                targetBattleUnit[1]._actorAccessoryStolen = true;
                targetBattleUnit[1]._equips[4] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenAccessoryId].name;
                var msgIconID = $dataArmors[stolenAccessoryId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
    };
    // process stealing => enemyUser & actorTarget 
    Game_Action.prototype.enemyStealActor = function(activeEventID, targetEventID) {
        var userBattleUnit = $gameSystem.EventToUnit(activeEventID);
        var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
	var targetActorId = targetBattleUnit[1]._actorId;
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[0]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "weapon") {
                var stolenWeaponId = $gameActors.actor(targetActorId).equips()[0].baseItemId;
                targetBattleUnit[1]._actorWeaponStolen = true;
                targetBattleUnit[1]._equips[0] = 0;
                // get data for stealResult
                var itemName =  $dataWeapons[stolenWeaponId].name;
                var msgIconID = $dataWeapons[stolenWeaponId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[1]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "armor") {
                var stolenShieldId = $gameActors.actor(targetActorId).equips()[1].baseItemId;
                targetBattleUnit[1]._actorShieldStolen = true;
                targetBattleUnit[1]._equips[1] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenShieldId].name;
                var msgIconID = $dataArmors[stolenShieldId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[2]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "head") {
                var stolenHeadId = $gameActors.actor(targetActorId).equips()[2].baseItemId;
                targetBattleUnit[1]._actorHeadStolen = true;
                targetBattleUnit[1]._equips[2] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenHeadId].name;
                var msgIconID = $dataArmors[stolenHeadId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[3]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "body") {
                var stolenBodyId = $gameActors.actor(targetActorId).equips()[3].baseItemId;
                targetBattleUnit[1]._actorBodyStolen = true;
                targetBattleUnit[1]._equips[3] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenBodyId].name;
                var msgIconID = $dataArmors[stolenBodyId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[4]._itemId > 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "accessory") {
                var stolenAccessoryId = $gameActors.actor(targetActorId).equips()[4].baseItemId;
                targetBattleUnit[1]._actorAccessoryStolen = true;
                targetBattleUnit[1]._equips[4] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenAccessoryId].name;
                var msgIconID = $dataArmors[stolenAccessoryId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
    };
    // process stealing => enemyUser & enemyTarget 
    Game_Action.prototype.enemyStealEnemy = function(activeEventID, targetEventID) {
        var userBattleUnit = $gameSystem.EventToUnit(activeEventID);
        var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[0] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "weapon") {
                var stolenWeaponId = targetBattleUnit[1]._equips[0].id;
                targetBattleUnit[1]._enemyWeaponStolen = true;
                targetBattleUnit[1]._equips[0] = 0;
                // get data for stealResult
                var itemName =  $dataWeapons[stolenWeaponId].name;
                var msgIconID = $dataWeapons[stolenWeaponId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[1] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "armor") {
                var stolenShieldId = targetBattleUnit[1]._equips[1].id;
                targetBattleUnit[1]._enemyShieldStolen = true;
                targetBattleUnit[1]._equips[1] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenShieldId].name;
                var msgIconID = $dataArmors[stolenShieldId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[2] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "head") {
                var stolenHeadId = targetBattleUnit[1]._equips[2].id;
                targetBattleUnit[1]._enemyHeadStolen = true;
                targetBattleUnit[1]._equips[2] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenHeadId].name;
                var msgIconID = $dataArmors[stolenHeadId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[3] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "body") {
                var stolenBodyId = targetBattleUnit[1]._equips[3].id;
                targetBattleUnit[1]._enemyBodyStolen = true;
                targetBattleUnit[1]._equips[3] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenBodyId].name;
                var msgIconID = $dataArmors[stolenBodyId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
        // check if the target has any equip
        if (targetBattleUnit[1]._equips[4] !== 0) {
            //check what gets stolen
            if (this.item().meta.srpgSteal === "accessory") {
                var stolenAccessoryId = targetBattleUnit[1]._equips[4].id;
                targetBattleUnit[1]._enemyAccessoryStolen = true;
                targetBattleUnit[1]._equips[4] = 0;
                // get data for stealResult
                var itemName =  $dataArmors[stolenAccessoryId].name;
                var msgIconID = $dataArmors[stolenAccessoryId].iconIndex;
                var eName = targetBattleUnit[1].name();
                this.stealResult(itemName, msgIconID, eName);
            }
        } else {this.nothingToSteal()};
    };

// Setup for Equipment of Units:
//-------------------------------
//
    // overwrite rpg objects function, to add Steal function
    Game_Actor.prototype.initialize = function(actorId) {
        Game_Battler.prototype.initialize.call(this);
        this.setup(actorId);
        //stuff above is default stuff below is added
        this._actorWeaponStolen = false;
        this._actorShieldStolen = false;
        this._actorHeadStolen = false;
        this._actorBodyStolen = false;
        this._actorAccessoryStolen = false;
        this._battleUnit = 'actor';
    };
    // overwrite rpg objects function, to add Steal function
    Game_Enemy.prototype.initialize = function(enemyId, x, y) {
        Game_Battler.prototype.initialize.call(this);
        this.setup(enemyId, x, y);
        //stuff above is default stuff below is added
        this._enemyWeaponStolen = false;
        this._enemyShieldStolen = false;
        this._enemyHeadStolen = false;
        this._enemyBodyStolen = false;
        this._enemyAccessoryStolen = false;
        this._battleUnit = 'enemy';
        this.setEquipSlots();
    };
    // add EquipSlots to Game_Enemy
    Game_Enemy.prototype.setEquipSlots = function() {
        this._equips = [];
        var weaponSlot0 = 0;      
        var shieldSlot1 = 0;
        var headSlot2 = 0;
        var bodySlot3 = 0;
        var accessorySlot4 = 0;
        this._equips.push(weaponSlot0, shieldSlot1, headSlot2, bodySlot3, accessorySlot4);
    };
    // add Equip if enemyNote fits & enemy is not already equiped
    Game_Enemy.prototype.equips = function() {
        if (this._equips) { 
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var eU = $gameMap.event([i]);
                 var bU = $gameSystem.EventToUnit([i]);
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgWeapon") > 0) &&
                    (bU[1]._equips[0] === 0) && (bU[1]._enemyWeaponStolen === false)) {
                     bU[1]._equips[0] = $dataWeapons[Number(bU[1].enemy().meta.srpgWeapon)]
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgShield") > 0) &&
                    (bU[1]._equips[1] === 0) && (bU[1]._enemyShieldStolen === false)) {
                     bU[1]._equips[1] = $dataArmors[Number(bU[1].enemy().meta.srpgShield)]
                 };
                  if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgHead") > 0) &&
                    (bU[1]._equips[2] === 0) && (bU[1]._enemyHeadStolen === false)) {
                     bU[1]._equips[2] = $dataArmors[Number(bU[1].enemy().meta.srpgHead)]
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgBody") > 0) &&
                    (bU[1]._equips[3] === 0) && (bU[1]._enemyBodyStolen === false)) {
                     bU[1]._equips[3] = $dataArmors[Number(bU[1].enemy().meta.srpgBody)]
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgAccessory") > 0) &&
                    (bU[1]._equips[4] === 0) && (bU[1]._enemyAccessoryStolen === false)) {
                     bU[1]._equips[4] = $dataArmors[Number(bU[1].enemy().meta.srpgAccessory)]
                 };
            }       
        } if (this._equips) {return this._equips} else {return 0};
    };
    // Reflect the characteristics of the Enemy_equipment  (add trairs ect)
    var _SRPG_Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function() {
        var objects = _SRPG_Game_Enemy_traitObjects.call(this);
        if ($gameSystem.isSRPGMode() == true) {
            var equips = this.equips();
            for (var i = 0; i < equips.length; i++) {
                 var item = equips[i];
                 if (item) {
                     objects.push(item);
                 };
            };
        };
    return objects;
    };
    // Reflects the ability change value of the Enemy_equipment (add item stats)
    Game_Enemy.prototype.paramPlus = function(paramId) {
        var value = Game_Battler.prototype.paramPlus.call(this, paramId);
        if ($gameSystem.isSRPGMode() == true) {
            var equips = this.equips();
            for (var i = 0; i < equips.length; i++) {
                 var item = equips[i];
                 if (item) {
                     value += item.params[paramId];
                 };
            };
        };
    return value;
    };
    // drawn contents Enemy Status window
    Window_SrpgStatus.prototype.drawContentsEnemy = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawEnemyClass(this._battler, 12, lineHeight * 5);
        this.drawEnemyFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoEnemy(12, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4);
        // check Enemys & draw Equip to BattleStatusWindow
        if (this._battler._enemyWeaponStolen === false) { 
            this.drawEnemySrpgEqiup(this._battler, 150, lineHeight * 5);
        }
        if ((this._battler._enemyWeaponStolen === true) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, 250, lineHeight * 5);
        } 
        if (this._battler._enemyShieldStolen === false) {
            this.drawEnemySrpgShield(this._battler, 150, lineHeight * 6);  
        }
        if ((this._battler._enemyShieldStolen === true) && (_drawText === 'true')) {
            this.drawText(_textNoShield, 250, lineHeight * 6);
        } 
        if (this._battler._enemyHeadStolen === false) {
            this.drawEnemySrpgHead(this._battler, 150, lineHeight * 7);
        }
        if ((this._battler._enemyHeadStolen === true) && (_drawText === 'true')) {
            this.drawText(_textNoHead, 250, lineHeight * 7);
        } 
        if (this._battler._enemyBodyStolen === false) {
            this.drawEnemySrpgBody(this._battler, 150, lineHeight * 8);
        }
        if ((this._battler._enemyBodyStolen === true) && (_drawText === 'true')) {
            this.drawText(_textNoBody, 250, lineHeight * 8);
        } 
        if (this._battler._enemyAccessoryStolen === false) {
            this.drawEnemySrpgAccessory(this._battler, 150, lineHeight * 9);
        }
        if ((this._battler._enemyAccessoryStolen === true) && (_drawText === 'true')) {
            this.drawText(_textNoAccessory, 250, lineHeight * 9);
        } 
    };
    // related to the function above "this.drawBasicInfoEnemy"
    Window_SrpgStatus.prototype.drawBasicInfoEnemy = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawEnemyLevel(this._battler, x, y + lineHeight * 1);
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 2);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 3, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 3, 90);
        } else {
           this.drawActorMp(this._battler, x, y + lineHeight * 3);
        }
    };
    // Status Window Width
    Window_SrpgStatus.prototype.windowWidth = function() {
        return 550;
    };
    // Status Window Height (amount of lines starts from the top with 0) 
    Window_SrpgStatus.prototype.windowHeight = function() {
        return this.fittingHeight(10);
    };
    // draw weapon, the Typo  mistake is from the srpg core..("Eqiup")
    Window_Base.prototype.drawEnemySrpgEqiup = function(enemy, x, y) {
        var ItemID = Number(enemy.enemy().meta.srpgWeapon);
        if (enemy.enemy()._equips) {
            if (enemy.enemy()._equips[0] > 0) {ItemID = enemy.enemy()._equips[0].id};
        }
        var weapon = $dataWeapons[ItemID];
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (weapon) {
            this.drawItemName(weapon, x + 96, y, 240);
        } else if ((!weapon) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        }
    };
    // draw shield
    Window_Base.prototype.drawEnemySrpgShield = function(enemy, x, y) {
        var ItemID = Number(enemy.enemy().meta.srpgShield);
        if (enemy.enemy()._equips) {
            if (enemy.enemy()._equips[1] > 0) {ItemID = enemy.enemy()._equips[1].id};
        }
        var shield = $dataArmors[ItemID];
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (shield) {
            this.drawItemName(shield, x + 96, y, 240);
        } else 
        if ((!shield) && (_drawText === 'true')) {
            this.drawText(_textNoShield, x + 96, y, 240);
        }
    };
    // draw head
    Window_Base.prototype.drawEnemySrpgHead = function(enemy, x, y) {
        var ItemID = Number(enemy.enemy().meta.srpgHead);
        if (enemy.enemy()._equips) {
            if (enemy.enemy()._equips[2] > 0) {ItemID = enemy.enemy()._equips[2].id};
        }
        var head = $dataArmors[ItemID];
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (head) {
            this.drawItemName(head, x + 96, y, 240);
        } else 
        if ((!head) && (_drawText === 'true')) {
            this.drawText(_textNoHead, x + 96, y, 240);
        }
    };
    // draw body
    Window_Base.prototype.drawEnemySrpgBody = function(enemy, x, y) {
        var ItemID = Number(enemy.enemy().meta.srpgBody);
        if (enemy.enemy()._equips) {
            if (enemy.enemy()._equips[3] > 0) {ItemID = enemy.enemy()._equips[3].id};
        }
        var body = $dataArmors[ItemID];
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (body) {
            this.drawItemName(body, x + 96, y, 240);
        } else 
        if ((!body) && (_drawText === 'true')) {
            this.drawText(_textNoBody, x + 96, y, 240);
        }
    };
    // draw accessory
    Window_Base.prototype.drawEnemySrpgAccessory = function(enemy, x, y) {
        var ItemID = Number(enemy.enemy().meta.srpgAccessory);
        if (enemy.enemy()._equips) {
            if (enemy.enemy()._equips[4] > 0) {ItemID = enemy.enemy()._equips[4].id};
        }
        var accessory = $dataArmors[ItemID];
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (accessory) {
            this.drawItemName(accessory, x + 96, y, 240);
        } else 
        if ((!accessory) && (_drawText === 'true')) {
            this.drawText(_textNoAccessory, x + 96, y, 240);
        }
    };
// Actors:
//------------------

    // draw Actor Content
    Window_SrpgStatus.prototype.drawContentsActor = function() {
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawActorClass(this._battler, 12, lineHeight * 5);
        this.drawActorFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoActor(12, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4);

        if (this._battler._actorWeaponStolen === false) {
            this.drawActorSrpgEqiup(this._battler, 150, lineHeight * 5);
        }
        if ((_drawText === 'true') && (this._battler._actorWeaponStolen === true)) {
            this.drawText(_textNoWeapon, 250, lineHeight * 5);
        }

        if (this._battler._actorShieldStolen === false) {
            this.drawActorSrpgShield(this._battler, 150, lineHeight * 6); 
        }
        if ((_drawText === 'true') && (this._battler._actorShieldStolen === true)) {
            this.drawText(_textNoShield, 250, lineHeight * 6);
        }

        if (this._battler._actorHeadStolen === false) {
            this.drawActorSrpgHead(this._battler, 150, lineHeight * 7);
        }
        if ((_drawText === 'true') && (this._battler._actorHeadStolen === true)) {
            this.drawText(_textNoHead, 250, lineHeight * 7);
        }

        if (this._battler._actorBodyStolen === false) {
             this.drawActorSrpgBody(this._battler, 150, lineHeight * 8);
        }
        if ((_drawText === 'true') && (this._battler._actorBodyStolen === true)) {
            this.drawText(_textNoBody, 250, lineHeight * 8);
        }

        if (this._battler._actorAccessoryStolen === false) {
            this.drawActorSrpgAccessory(this._battler, 150, lineHeight * 9);
        }
        if ((_drawText === 'true') && (this._battler._actorAccessoryStolen === true)) {
            this.drawText(_textNoAccessory, 250, lineHeight * 9);
        }
    };
    // this is related to "this.drawBasicInfoActor" from above
    Window_SrpgStatus.prototype.drawBasicInfoActor = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawSrpgExpRate(this._battler, x, y + lineHeight * 1);
        this.drawActorLevel(this._battler, x, y + lineHeight * 1);
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 2);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 3, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 3, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 3);
        }
    };
    // draw weapon (typo is from the core ,i keeped it do avoid bugs ("Eqiup")
    Window_Base.prototype.drawActorSrpgEqiup = function(actor, x, y) {
        var weapon = actor.weapons()[0]
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (weapon) {
            this.drawItemName(weapon, x + 96, y, 240);
        }
        if ((!weapon) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };
    // draw shield
    Window_Base.prototype.drawActorSrpgShield = function(actor, x, y) {
        var shield = actor.armors()[0]
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (shield) {
            this.drawItemName(shield, x + 96, y, 240);
        }
        if ((!shield) && (_drawText === 'true')) {
            this.drawText(_textNoShield, x + 96, y, 240);
        } 
    };
    // draw head
    Window_Base.prototype.drawActorSrpgHead = function(actor, x, y) {
        var head = actor.armors()[1]
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (head) {
            this.drawItemName(head, x + 96, y, 240);
        }
        if ((!head) && (_drawText === 'true')) {
            this.drawText(_textNoHead, x + 96, y, 240);
        } 
    };
    // draw body
    Window_Base.prototype.drawActorSrpgBody = function(actor, x, y) {
        var body = actor.armors()[2]
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (body) {
            this.drawItemName(body, x + 96, y, 240);
        }
        if ((!body) && (_drawText === 'true')) {
            this.drawText(_textNoBody, x + 96, y, 240);
        }
    };
    // draw accessory
    Window_Base.prototype.drawActorSrpgAccessory = function(actor, x, y) {
        var accessory = actor.armors()[3]
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (accessory) {
            this.drawItemName(accessory, x + 96, y, 240);
        }
        if ((!accessory) && (_drawText === 'true')) {
            this.drawText(_textNoAccessory, x + 96, y, 240);
        }
    };

//-----------------------------------------------------------------------------------------
// 
                 
//--End:

})();
