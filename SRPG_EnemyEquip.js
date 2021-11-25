//=============================================================================
// SRPG_EnemyEquip.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_EnemyEquip> for SRPG this includes Stealing Options
 * @author dopan
 *
 * @param Break Chance
 * @desc this Number makes the Break chance in %. Min is "1", Max is "100".
 * @type number
 * @min 1
 * @max 100
 * @default 50
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
 * @help  
 *
 * this Plugins requires: 
 *  "SRPG_Core.js"
 *
 * This Plugin let Enemys use Equipment (only 5 base slots) & and it adds the Equipment
 * into the battleStatusWindow of actor&enemys 
 * (also only 5 slots,the first window page couldnt store more without looking ugly)
 * ->i considered using 6 slots, but i didnt like the visual Result on the BattleStatusWindow
 *
 * Actors can still use more slots, but only the 5 will be displayed in that Window,
 * and only these 5_Slots_equipment can be stolen..
 * => if you wanna use more you need to edit and expand the Plugin..  
 * 
 *
 * this Plugin includes a stealing function!
 * I admit that this plugin stealing_function is limited aswell as the enemy equipment
 * (having only 5 base slots ect)
 *
 *
 * The plugin param allows you to change a few things.
 *
 * Everything else is handled with EnemyNotetags, SkillNoteTags & Scriptcalls..
 *
 * (by editing the Plugins JS_code the battleStatusWindow can be changed if needed,
 *  but i think i already made the best of it)
 *
 * When using EnemyNote to set Equip,
 * every enemyClone with the same EnemyID will have the same Equip..
 * 
 * But you can also use 2 Scriptcalls,for changing BattlerUnits Equipment on Battlemap,
 * based on the eventID..
 *
 * By default the stealchance is 50%, this can be changed in the Plugin param,
 *  or by using the plugin Scriptcall.Incase its wanted to have a UnitRelated Chance:
 * ->Such change should happen in the eventBeforeAction,or with "customExecution" (with scriptcall).
 * Pls Note: (plugin auto reset Chance)
 * The "BreakChance"&"StealChance" will always be reseted to the Plugin param "BreakChance"&"StealChance",
 * ..in the AfterAction_Scene.
 *
 * Default equipSlots are :
 *-------------------------
 * 0 = weapon slot
 * 1 = shield slot
 * 2 = head slot
 * 3 = body slot
 * 4 = accessory slot
 * (can be used otherways aswell)
 *
 * Plugin Scriptcalls:
 *--------------------
 *
 * (Change equip related to event ID works for Actors&Enemys .. and on all slots)
 * -> this allows individual EquipChange to every battleUnit
 *
 * $gameTemp.changeUnitArmor(eventID, SlotID, ArmorID);   //by Default armor Slot IDs are "1","2","3","4"
 *                                                      
 *
 * $gameTemp.changeUnitWeapon(eventID, SlotID, WeaponID); //by Default weapon Slot ID is "0"
 *
 * (weaponID and ArmorID , is the Number related to the equipment in your Project)
 * => using 0 on weaponID or ArmorID, will delete any equipment in that slot!!
 *
 * these 2 Scriptcalls above can be used on battlemap to change the Equipment of battleUnits individually
 *
 *----------------------------------------------
 * Scriptcall to change the Stealchance in Game:
 *----------------------------------------------
 * BreakChance:
 *--------------
 * "this.changeBreakChance(chanceNumber);"// usage in Events ,commonEvents ,"Game_Interpreter.prototype"-functions ect
 *
 * or "Game_Interpreter.prototype.changeBreakChance.call(this, chanceNumber);"// usage if used in other pluginsCodes
 *
 *
 * StealChance:
 *--------------
 * "this.changeStealChance(chanceNumber);"// usage in Events ,commonEvents ,"Game_Interpreter.prototype"-functions ect
 *
 * or "Game_Interpreter.prototype.changeStealChance.call(this, chanceNumber);"// usage if used in other pluginsCodes
 *
 *
 *
 * => "chanceNumber" can be any number betwen "1" and "100". "100" means 100% stealChance.
 * (default is ChanceNumber in the Plugin param)
 *
 *
 *
 * Plugin NoteTags:
 *-----------------
 *----------------
 * Enemy noteTags:
 *----------------
 *   <srpgSlot0Type:x>
 *   <srpgSlot1Type:x>
 *   <srpgSlot2Type:x>
 *   <srpgSlot3Type:x>
 *   <srpgSlot4Type:x>
 *
 *  Type "x" is "armor" or "weapon" (it can only be "armor" or "weapon",never both)
 * Example => <srpgSlot0Type:weapon>  
 * (this tells the plugin that SlotType0 is an WeaponSlot,means EquipID of Slot0 from below will be a weapon_ID)
 *
 *   <srpgSlot0EquipID:x>
 *   <srpgSlot1EquipID:x>
 *   <srpgSlot2EquipID:x>
 *   <srpgSlot3EquipID:x>
 *   <srpgSlot4EquipID:x>
 *
 * EquipID "x" is the number of the ID of Weapon or Armor in your project
 * (the plugin will know if its an armor or weapon because of the "SlotType" from above)
 *
 * 
 *---------------
 * SkillNoteTags:
 *---------------
 * These noteTags , make a Skill into a "stealing_Skill" or "breaking_Skill"
 * (Skills can be break&steal Skills at the same time)
 * -> the Chance apllys to the whole Skill, if you steal/brak more than 1 slot ,the same Chance will be used.
 * => if "srpgBreak" is used it will trigger the breakChance, "srpgSteal" will trigger stealChance
 * ==> incase both Chances are triggered,remember that broken Equip wont get stolen anyway.
 *
 * <srpgBreak:slot0Equip> 
 * <srpgBreak:slot1Equip> 
 * <srpgBreak:slot2Equip> 
 * <srpgBreak:slot3Equip> 
 * <srpgBreak:slot4Equip> 
 *
 * <srpgSteal:slot0Equip> 
 * <srpgSteal:slot1Equip> 
 * <srpgSteal:slot2Equip> 
 * <srpgSteal:slot3Equip> 
 * <srpgSteal:slot4Equip> 
 *----------------------------------------------------------------------------------------------------------
 * "BreakChance" & "StealChance" are by default "50" or whatever you added to the plugin param
 * (if Equip get broken, stealing wont work ,event if stealChance was succesfull)
 *
 * <srpgSkillBreakChance:x> 
 * <srpgSkillStealChance:x>
 * 
 * "x" is a number betwen 1 and 100. Example => 100 would mean %100 chance => <srpgSkillBreakChance:100>
 * (these scriptcalls are only needed if you want a skill with other chances)
 *
 * Chances can be changed global with Scriptcall for usage with "custom execution" or in the "preActionPhase"
 * The "BreakChance"&"StealChance" will always be reseted to the Plugin param "BreakChance"&"StealChance",
 * ..in the AfterAction_Scene.
 * 
 *------------------------------------
 * About gain Exp & gain Gold -Skills:
 *------------------------------------
 *
 * for Skills that add gold or extra exp, you can use an CommonEvent on the Skill.
 * (This can probably also be solved with the battleformula)
 * There you can put a math script or a variable that rolls the succes rate.
 * Default Scripts for gainGold and gainExp are :
 * 
 *  $gameParty.gainGold(n);
 *  $gameActors.actor(ActorID).gainExp(exp)
 *
 *
 * (i might implement such Steal Skills with later Plugin updates,but for now i preffer
 * to figure out if this plugins works completly bugfree,before adding such Skills)
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
 * - bugfix and Upgrade 26.11.2021
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

  var _breakChance = Number(parameters['Break Chance'] || 50);

  var _stealChance = Number(parameters['Steal Chance'] || 50);
     
  var _broken = false;
  var _stolen = false; 
	
//-----------------------------------------------------------------------------------------

// Setup for Steal Skill:
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
         // reset break&steal-Chance to the Plugin param Setup
	 _breakChance = Number(parameters['Break Chance']);
         _stealChance = Number(parameters['Steal Chance']);
    };
    //this.nothingToSteal();
    Game_Action.prototype.nothingToSteal = function() {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add("There is Nothing to Steal \\|\\^");
    };
    //this.failedToSteal();
    Game_Action.prototype.srpgFailedText = function() {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add("Failed \\|\\^");
    };
    //this.stealResult(itemName, msgIconID, eName);
    Game_Action.prototype.stealResult = function(itemName, msgIconID, eName) {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add(eName + "'s \\i["+ msgIconID +"]"+ itemName +" stolen!\\|\\^");
    };
    //this.breakResult(itemName, msgIconID, eName);
    Game_Action.prototype.breakResult = function(itemName, msgIconID, eName) {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add(eName + "'s \\i["+ msgIconID +"]"+ itemName +" broken!\\|\\^");
    };
    // scriptcall "$gameTemp.changeUnitArmor(eventID, SlotID, ArmorID);"
    Game_Temp.prototype.changeUnitArmor = function(eventID, SlotID, ArmorID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleunit[0] === 'enemy') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID]._itemId = ArmorID;
            battleUnit[1]._equips[SlotID]._dataClass = "armor";
            battleUnit[1]._equips[SlotID].equipIsGone = false;
            if (ArmorID === 0)  {
            battleUnit[1]._equips[SlotID]._dataClass = "";
            battleUnit[1]._equips[SlotID].equipIsGone = true;
            }
        }
        if ((battleunit[0] === 'actor') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID]._itemId = ArmorID;
            battleUnit[1]._equips[SlotID]._dataClass = "armor";
            battleUnit[1]._equips[SlotID].equipIsGone = false;
            if (ArmorID === 0)  {
            battleUnit[1]._equips[SlotID]._dataClass = "";
            battleUnit[1]._equips[SlotID].equipIsGone = true;
            }
        }	   
    return battleUnit[1]._equips[SlotID];
    };
    // scriptcall to change enemy weapon "$gameTemp.changeUnitWeapon(eventID, SlotID, WeaponID);"
    Game_Temp.prototype.changeUnitWeapon = function(eventID, SlotID, WeaponID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleUnit[0] === 'enemy') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID]._itemId = WeaponID;
            battleUnit[1]._equips[SlotID]._dataClass = "weapon";
            battleUnit[1]._equips[SlotID].equipIsGone = false;
            if (WeaponID === 0)  {
            battleUnit[1]._equips[SlotID]._dataClass = "";
            battleUnit[1]._equips[SlotID].equipIsGone = true;
            }
        }
        if ((battleUnit[0] === 'actor') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID]._itemId = WeaponID;
            battleUnit[1]._equips[SlotID]._dataClass = "weapon";
            battleUnit[1]._equips[SlotID].equipIsGone = false;
            if (WeaponID === 0)  {
            battleUnit[1]._equips[SlotID]._dataClass = "";
            battleUnit[1]._equips[SlotID].equipIsGone = true;
            }
        }	 
    return battleUnit[1]._equips[SlotID];
    };
    Game_Temp.prototype.resetActorEquip = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);
             if (battleunit && eventunit && (battleunit[0] === 'actor')) { 
                 if ((battleunit[1]._equipIsGone[0] === true) && (battleunit[1]._equips[0]._itemId > 0)) {
                      battleunit[1]._equipIsGone[0] = false;
                 }
                 if ((battleunit[1]._equipIsGone[1] === true) && (battleunit[1]._equips[1]._itemId > 0)) {
                      battleunit[1]._equipIsGone[1] = false;
                 }
                 if ((battleunit[1]._equipIsGone[2] === true) && (battleunit[1]._equips[2]._itemId > 0)) {
                      battleunit[1]._equipIsGone[2] = false;
                 }
                 if ((battleunit[1]._equipIsGone[3] === true) && (battleunit[1]._equips[3]._itemId > 0)) {
                      battleunit[1]._equipIsGone[3] = false;
                 }
                 if ((battleunit[1]._equipIsGone[4] === true) && (battleunit[1]._equips[4]._itemId > 0)) {
                      battleunit[1]._equipIsGone[4] = false;
                 }
             }
        }
    };
    Game_Action.prototype.setUserEventId = function() {
        this._userEventID = $gameTemp.activeEvent().eventId();
        return this._userEventID;
    };
    Game_Action.prototype.setTargetEventId = function() {
        this._targetEventID = $gameTemp.targetEvent().eventId();
        return this._targetEventID;
    };	
    // check used SkillAction_itemObeject for meta"srpgSteal"
    var SRPG_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        SRPG_Game_Action_apply.call(this, target);
            // add stuff to Game action if Break/Steal Meta & Hit
             var result = target.result();
             this._userEventID = 0;
             this._targetEventID = 0;
             this.setUserEventId();
             this.setTargetEventId();
             if ((this.item().meta.srpgSteal && result.isHit()) ||
                 (this.item().meta.srpgBreak && result.isHit())) {
	         this.checkBreakSteal();
             }
    };
    Game_Action.prototype.checkBreakSteal = function() {
	_broken = false;
	_stolen = false;
	if (this.item().meta.srpgSkillBreakChance) {
	    _breakChance = this.item().meta.srpgSkillBreakChance;
	} 
	if (this.item().meta.srpgSkillStealChance) {
	    _stealChance = this.item().meta.srpgSkillStealChance;
	}    
   	if (this.item().meta.srpgBreak) {
            // breakChanceRoll var that represents the chance you rolled.
            var breakChanceRoll = Math.floor(Math.random() * 100) + 1; 
            //_breakChance is the PluginVar that stores % chance 
            if (breakChanceRoll <= _breakChance) {		     
                _broken = true;
            };  
        }
   	if (this.item().meta.srpgSteal) {
            // stealChanceRoll var that represents the chance you rolled.
            var stealChanceRoll = Math.floor(Math.random() * 100) + 1; 
            //_stealChance is the PluginVar that stores % chance 
            if (stealChanceRoll <= _stealChance) {		     
                _stolen = true;
            };  
        }
        if (_broken === true)  {
	    this.srpgBreaking();
	}
        if ((_broken === false) && (_stolen === true))  {
	    this.srpgStealing();
	} 
        if ((_broken === false) && (_stolen === false))  {
            this.srpgFailedText();
	} 	    
    };
    //srpgBreaking Setup
    Game_Action.prototype.srpgBreaking = function() {
	if ($gameSystem.isSRPGMode() == true) {
            //get Unit data:
	    var anythingToBreak = false;	
            var activeEventID = this._userEventID;
            var targetEventID = this._targetEventID;
            var activeBattleUnit = $gameSystem.EventToUnit(activeEventID);
            var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
            if ((this.item().meta.srpgBreak === "slot0Equip") && (targetBattleUnit[1]._equips[0]._itemId > 0)) {
                this.srpgBreakingSlot0(activeBattleUnit, targetBattleUnit);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot1Equip") && (targetBattleUnit[1]._equips[1]._itemId > 0)) {
                this.srpgBreakingSlot1(activeBattleUnit, targetBattleUnit);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot2Equip") && (targetBattleUnit[1]._equips[2]._itemId > 0)) {
                this.srpgBreakingSlot2(activeBattleUnit, targetBattleUnit);anythingToBreak = true;
	    };
            if ((this.item().meta.srpgBreak === "slot3Equip") && (targetBattleUnit[1]._equips[3]._itemId > 0)) {
                this.srpgBreakingSlot3(activeBattleUnit, targetBattleUnit);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot4Equip") && (targetBattleUnit[1]._equips[4]._itemId > 0)) {
                this.srpgBreakingSlot4(activeBattleUnit, targetBattleUnit);anythingToBreak = true;
	    };
        if (anythingToBreak === false) {this.nothingToBreak()};
	};  
    };	
    Game_Action.prototype.srpgBreakingSlot0 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[0]._itemId;
	if (targetBattleUnit[1]._equips[0]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[0]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[0] = true;
        targetBattleUnit[1]._equips[0] = new Game_Item();
        // get data for breakResult
        var eName = targetBattleUnit[1].name();
        this.breakResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgBreakingSlot1 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[1]._itemId;
	if (targetBattleUnit[1]._equips[1]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[1]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[1] = true;
        targetBattleUnit[1]._equips[1] = new Game_Item();
        // get data for breakResult
        var eName = targetBattleUnit[1].name();
        this.breakResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgBreakingSlot2 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[2]._itemId;
	if (targetBattleUnit[1]._equips[2]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[2]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[2] = true;
        targetBattleUnit[1]._equips[2] = new Game_Item();
        // get data for breakResult
        var eName = targetBattleUnit[1].name();
        this.breakResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgBreakingSlot3 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[3]._itemId;
	if (targetBattleUnit[1]._equips[3]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[3]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[3] = true;
        targetBattleUnit[1]._equips[3] = new Game_Item();
        // get data for breakResult
        var eName = targetBattleUnit[1].name();
        this.breakResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgBreakingSlot4 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[4]._itemId;
	if (targetBattleUnit[1]._equips[4]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[4]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[4] = true;
        targetBattleUnit[1]._equips[4] = new Game_Item();
        // get data for breakResult
        var eName = targetBattleUnit[1].name();
        this.breakResult(itemName, msgIconID, eName);	
    };	
    //srpgStealing Setup
    Game_Action.prototype.srpgStealing = function() {
	if ($gameSystem.isSRPGMode() == true) {
            //get Unit data:
	    var anythingToSteal = false;	
            var activeEventID = this._userEventID;
            var targetEventID = this._targetEventID;
            var activeBattleUnit = $gameSystem.EventToUnit(activeEventID);
            var targetBattleUnit = $gameSystem.EventToUnit(targetEventID);
            if ((this.item().meta.srpgSteal === "slot0Equip") && (targetBattleUnit[1]._equips[0]._itemId > 0)) {
                this.srpgStealingSlot0(activeBattleUnit, targetBattleUnit);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot1Equip") && (targetBattleUnit[1]._equips[1]._itemId > 0)) {
                this.srpgStealingSlot1(activeBattleUnit, targetBattleUnit);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot2Equip") && (targetBattleUnit[1]._equips[2]._itemId > 0)) {
                this.srpgStealingSlot2(activeBattleUnit, targetBattleUnit);anythingToSteal = true;
	    };
            if ((this.item().meta.srpgSteal === "slot3Equip") && (targetBattleUnit[1]._equips[3]._itemId > 0)) {
                this.srpgStealingSlot3(activeBattleUnit, targetBattleUnit);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot4Equip") && (targetBattleUnit[1]._equips[4]._itemId > 0)) {
                this.srpgStealingSlot4(activeBattleUnit, targetBattleUnit);anythingToSteal = true;
	    };
        if (anythingToSteal === false) {this.nothingToSteal()};
        };
    };
    Game_Action.prototype.srpgStealingSlot0 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[0]._itemId;
	if (targetBattleUnit[1]._equips[0]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[0]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[0] = true;
        targetBattleUnit[1]._equips[0] = new Game_Item();
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgStealingSlot1 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[1]._itemId;
	if (targetBattleUnit[1]._equips[1]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[1]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[1] = true;
        targetBattleUnit[1]._equips[1] = new Game_Item();
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgStealingSlot2 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[2]._itemId;
	if (targetBattleUnit[1]._equips[2]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[2]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[2] = true;
        targetBattleUnit[1]._equips[2] = new Game_Item();
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgStealingSlot3 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[3]._itemId;
	if (targetBattleUnit[1]._equips[3]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[3]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[3] = true;
        targetBattleUnit[1]._equips[3] = new Game_Item();
        // get data for stealResult
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };
    Game_Action.prototype.srpgStealingSlot4 = function(activeBattleUnit, targetBattleUnit) {	
	var stolenEquipId = targetBattleUnit[1]._equips[4]._itemId;
	if (targetBattleUnit[1]._equips[4]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[4]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[4] = true;
        targetBattleUnit[1]._equips[4] = new Game_Item();
        // get data for stealResult
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };

// Setup for Equipment of Units:
//-------------------------------
	
    var srpgActorIni = Game_Actor.prototype.initialize
    Game_Actor.prototype.initialize = function(actorId) {
        srpgActorIni.call(this, actorId)
        this._equipIsGone = [false, false, false, false, false];
        this._battleUnit = 'actor';     
    };
    var srpgEnemyIni = Game_Enemy.prototype.initialize
    Game_Enemy.prototype.initialize = function(enemyId, x, y) {
        srpgEnemyIni.call(this, enemyId, x, y)
        this.setEquipSlots(); 
        this._equipIsGone = [false, false, false, false, false];
        this._battleUnit = 'enemy';    
    };
    // add EquipSlots to Game_Enemy
    Game_Enemy.prototype.setEquipSlots = function() {
        this._equips = []; 
        this._equips = [new Game_Item(), new Game_Item(), new Game_Item(), new Game_Item(), new Game_Item()];
    };
    // add Equip if enemyNote fits & enemy is not already equiped
    Game_Enemy.prototype.equips = function() {
        if (this._equips) { 
            for (var i = 1; i <= $gameMap.events().length; i++) {
                 var eU = $gameMap.event([i]);
                 var bU = $gameSystem.EventToUnit([i]);
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgSlot0EquipID") > 0) &&
                    (bU[1]._equips[0]._itemId === 0) && (bU[1]._equipIsGone[0] === false)) {
		     var slotType = bU[1].enemy().meta.srpgSlot0Type;
                     if (slotType === "weapon") {bU[1]._equips[0].setObject($dataWeapons[Number(bU[1].enemy().meta.srpgSlot0EquipID)])}
	             if (slotType === "armor") {bU[1]._equips[0].setObject($dataArmors[Number(bU[1].enemy().meta.srpgSlot0EquipID)])}
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgSlot1EquipID") > 0) &&
                    (bU[1]._equips[1]._itemId === 0) && (bU[1]._equipIsGone[1] === false)) {
		     var slotType = bU[1].enemy().meta.srpgSlot1Type;
                     if (slotType === "weapon") {bU[1]._equips[1].setObject($dataWeapons[Number(bU[1].enemy().meta.srpgSlot1EquipID)])}
	             if (slotType === "armor") {bU[1]._equips[1].setObject($dataArmors[Number(bU[1].enemy().meta.srpgSlot1EquipID)])}
                 };
                  if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgSlot2EquipID") > 0) &&
                    (bU[1]._equips[2]._itemId === 0) && (bU[1]._equipIsGone[2] === false)) {
		     var slotType = bU[1].enemy().meta.srpgSlot2Type;
                     if (slotType === "weapon") {bU[1]._equips[2].setObject($dataWeapons[Number(bU[1].enemy().meta.srpgSlot2EquipID)])}
	             if (slotType === "armor") {bU[1]._equips[2].setObject($dataArmors[Number(bU[1].enemy().meta.srpgSlot2EquipID)])}
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgSlot3EquipID") > 0) &&
                    (bU[1]._equips[3]._itemId === 0) && (bU[1]._equipIsGone[3] === false)) {
		     var slotType = bU[1].enemy().meta.srpgSlot3Type;
                     if (slotType === "weapon") {bU[1]._equips[3].setObject($dataWeapons[Number(bU[1].enemy().meta.srpgSlot3EquipID)])}
	             if (slotType === "armor") {bU[1]._equips[3].setObject($dataArmors[Number(bU[1].enemy().meta.srpgSlot3EquipID)])}
                 };
                 if (bU && eU && (bU[0] === 'enemy') && (bU[1].enemy().note.indexOf("srpgSlot4EquipID") > 0) &&
                    (bU[1]._equips[4]._itemId === 0) && (bU[1]._equipIsGone[4] === false)) {
		     var slotType = bU[1].enemy().meta.srpgSlot4Type;
                     if (slotType === "weapon") {bU[1]._equips[4].setObject($dataWeapons[Number(bU[1].enemy().meta.srpgSlot4EquipID)])}
	             if (slotType === "armor") {bU[1]._equips[4].setObject($dataArmors[Number(bU[1].enemy().meta.srpgSlot4EquipID)])}
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
                 var equipSlot = equips[i];
                 if (equipSlot && (equipSlot._itemId !== 0)) {
                     if (equipSlot._dataClass === "weapon") {
                         item = $dataWeapons[equipSlot._itemId];
                         objects.push(item);
                     }
                     if (equipSlot._dataClass === "armor") {
                         item = $dataArmors[equipSlot._itemId];
                         objects.push(item);
                     }
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
                 var equipSlot = equips[i];
                 if (equipSlot && (equipSlot._itemId !== 0)) {
                     if (equipSlot._dataClass === "weapon") {
                         item = $dataWeapons[equipSlot._itemId];
                         value += item.params[paramId];
                     }
                     if (equipSlot._dataClass === "armor") {
                         item = $dataArmors[equipSlot._itemId];
                         value += item.params[paramId];
                     }
                 };
            };
        };
    return value;
    };
    // drawn contents Enemy Status window
    Window_SrpgStatus.prototype.drawContentsEnemy = function() {
	if (this._battler._battleUnit === "enemy") {var battleEnemy = this._battler};   
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawEnemyClass(this._battler, 12, lineHeight * 5);
        this.drawEnemyFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoEnemy(12, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4); 
        // check Enemys & draw Equip to BattleStatusWindow
        if (battleEnemy._equipIsGone[0] === false) { 
            this.drawEnemySrpgEqiup(this._battler, 150, lineHeight * 5);
        }
        if ((battleEnemy._equipIsGone[0] === true) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, 250, lineHeight * 5);
        } 
        if (battleEnemy._equipIsGone[1] === false) {
            this.drawEnemySrpgSlot1(this._battler, 150, lineHeight * 6);  
        }
        if ((battleEnemy._equipIsGone[1] === true) && (_drawText === 'true')) {
            this.drawText(_textNoShield, 250, lineHeight * 6);
        } 
        if (battleEnemy._equipIsGone[2] === false) {
            this.drawEnemySrpgSlot2(this._battler, 150, lineHeight * 7);
        }
        if ((battleEnemy._equipIsGone[2] === true) && (_drawText === 'true')) {
            this.drawText(_textNoHead, 250, lineHeight * 7);
        } 
        if (battleEnemy._equipIsGone[3] === false) {
            this.drawEnemySrpgSlot3(this._battler, 150, lineHeight * 8);
        }
        if ((battleEnemy._equipIsGone[3] === true) && (_drawText === 'true')) {
            this.drawText(_textNoBody, 250, lineHeight * 8);
        } 
        if (battleEnemy._equipIsGone[4] === false) {
            this.drawEnemySrpgSlot4(this._battler, 150, lineHeight * 9);
        }
        if ((battleEnemy._equipIsGone[4] === true) && (_drawText === 'true')) {
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
	//this is Slot0 !    
        var slotType = enemy.enemy().meta.srpgSlot0Type;
	var itemID = Number(enemy.enemy().meta.srpgSlot0EquipID); 
	var equip = 0;
        if (enemy._equips) {
            if (enemy._equips[0]._itemId > 0) {itemID = enemy._equips[0]._itemId};
        }
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip !== 0) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((equip === 0) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        }
    };
    // draw shield 
    Window_Base.prototype.drawEnemySrpgSlot1 = function(enemy, x, y) {
        var slotType = enemy.enemy().meta.srpgSlot1Type;
	var itemID = Number(enemy.enemy().meta.srpgSlot1EquipID); 
	var equip = 0;
        if (enemy._equips) {
            if (enemy._equips[1]._itemId > 0) {itemID = enemy._equips[1]._itemId};
        }
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip !== 0) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((equip === 0) && (_drawText === 'true')) {
            this.drawText(_textNoShield, x + 96, y, 240);
        }
    };
    // draw head
    Window_Base.prototype.drawEnemySrpgSlot2 = function(enemy, x, y) {
        var slotType = enemy.enemy().meta.srpgSlot2Type;
	var itemID = Number(enemy.enemy().meta.srpgSlot2EquipID); 
	var equip = 0;
        if (enemy._equips) {
            if (enemy._equips[2]._itemId > 0) {itemID = enemy._equips[2]._itemId};
        }
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip !== 0) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((equip === 0) && (_drawText === 'true')) {
            this.drawText(_textNoHead, x + 96, y, 240);
        }
    };
    // draw body
    Window_Base.prototype.drawEnemySrpgSlot3 = function(enemy, x, y) {
        var slotType = enemy.enemy().meta.srpgSlot3Type;
	var itemID = Number(enemy.enemy().meta.srpgSlot3EquipID); 
	var equip = 0;
        if (enemy._equips) {
            if (enemy._equips[3]._itemId > 0) {itemID = enemy._equips[3]._itemId};
        }
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip !== 0) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((equip === 0) && (_drawText === 'true')) {
            this.drawText(_textNoBody, x + 96, y, 240);
        }
    };
    // draw accessory
    Window_Base.prototype.drawEnemySrpgSlot4 = function(enemy, x, y) {
        var slotType = enemy.enemy().meta.srpgSlot4Type;
	var itemID = Number(enemy.enemy().meta.srpgSlot4EquipID); 
	var equip = 0;
        if (enemy._equips) {
            if (enemy._equips[4]._itemId > 0) {itemID = enemy._equips[4]._itemId};
        }
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip !== 0) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((equip === 0) && (_drawText === 'true')) {
            this.drawText(_textNoAccessory, x + 96, y, 240);
        }
    };
// Actors:
//------------------

    // draw Actor Content
    Window_SrpgStatus.prototype.drawContentsActor = function() {
	if (this._battler._battleUnit === "actor") {var battleActor = this._battler};	    
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawActorClass(this._battler, 12, lineHeight * 5);
        this.drawActorFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoActor(12, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4);
	     
        if (battleActor._equipIsGone[0] === false) {
            this.drawActorSrpgEqiup(this._battler, 150, lineHeight * 5);
        }
        if ((_drawText === 'true') && (this._battler._equipIsGone[0] === true)) {
            this.drawText(_textNoWeapon, 250, lineHeight * 5);
        }

        if (battleActor._equipIsGone[1] === false) {
            this.drawActorSrpgSlot1(this._battler, 150, lineHeight * 6); 
        }
        if ((_drawText === 'true') && (this._battler._equipIsGone[1] === true)) {
            this.drawText(_textNoShield, 250, lineHeight * 6);
        }

        if (battleActor._equipIsGone[2] === false) {
            this.drawActorSrpgSlot2(this._battler, 150, lineHeight * 7);
        }
        if ((_drawText === 'true') && (this._battler._equipIsGone[2] === true)) {
            this.drawText(_textNoHead, 250, lineHeight * 7);
        }

        if (battleActor._equipIsGone[3] === false) {
             this.drawActorSrpgSlot3(this._battler, 150, lineHeight * 8);
        }
        if ((_drawText === 'true') && (this._battler._equipIsGone[3] === true)) {
            this.drawText(_textNoBody, 250, lineHeight * 8);
        }

        if (battleActor._equipIsGone[4] === false) {
            this.drawActorSrpgSlot4(this._battler, 150, lineHeight * 9);
        }
        if ((_drawText === 'true') && (this._battler._equipIsGone[4] === true)) {
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
	//this is Slot0 ! 
        var slotType = actor._equips[0]._dataClass;
	var itemID = actor._equips[0]._itemId; 
	var equip = actor._equips[0];
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((!equip) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };
    // draw weapon $dataWeapons[itemID] 
    Window_Base.prototype.drawActorSrpgSlot1 = function(actor, x, y) {
        var slotType = actor._equips[1]._dataClass;
	var itemID = actor._equips[1]._itemId; 
	var equip = actor._equips[1];
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};  
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((!equip) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };
    // draw head
    Window_Base.prototype.drawActorSrpgSlot2 = function(actor, x, y) {
        var slotType = actor._equips[2]._dataClass;
	var itemID = actor._equips[2]._itemId; 
	var equip = actor._equips[2];
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]};     
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((!equip) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };
    // draw body
    Window_Base.prototype.drawActorSrpgSlot3 = function(actor, x, y) {
        var slotType = actor._equips[3]._dataClass;
	var itemID = actor._equips[3]._itemId; 
	var equip = actor._equips[3];
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]}; 	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((!equip) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };
    // draw accessory
    Window_Base.prototype.drawActorSrpgSlot4 = function(actor, x, y) {
        var slotType = actor._equips[4]._dataClass;
	var itemID = actor._equips[4]._itemId; 
	var equip = actor._equips[4];
	if (slotType === "weapon") {equip = $dataWeapons[itemID]};
	if (slotType === "armor") {equip = $dataArmors[itemID]}; 	    
        this.changeTextColor(this.systemColor());
        this.resetTextColor();
        if (equip) {
            this.drawItemName(equip, x + 96, y, 240);
        } else if ((!equip) && (_drawText === 'true')) {
            this.drawText(_textNoWeapon, x + 96, y, 240);
        } 
    };

//-----------------------------------------------------------------------------------------
// 
                 
//--End:

})();
