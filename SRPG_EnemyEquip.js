//=============================================================================
// SRPG_EnemyEquip.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_EnemyEquip> for SRPG this includes Stealing Options
 * @author dopan
 *
 *
 * @param Enemy Slot Amount
 * @desc Default Amount of EquipSlots for all Enemys.EnemyNote can change this indivudually.
 * @type number
 * @default 5
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
 *  "SRPG_Core.js" & "SRPG_Teams" (default actor team "actor" must be used)
 *
 * This Plugin let Enemys use Equipment (default is = 5 base slots) & and it adds the Equipment
 * into the battleStatusWindow of actor&enemys 
 * 
 * => the max Amount of used EnemySlots is 10
 * (but if using more than the default 5, you need to edit the BattleStatusWindow,or only default5 will be displayed)
 * (such BattleStatusWindow_edit can be made in this plugin or in the "SRPG_StatusWindow(patch)" plugin)
 * 
 * => the max Amount of Slots from which can be stolen/broken is also 10
 * 
 * => this Plugin includes a stealing/breaking function!
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
 * By default the chanceRates are 50%, this can be changed in the Plugin param,
 *  or by using the plugin Scriptcall.Incase its wanted to have a UnitRelated Chance:
 * ->Such change should happen in the "eventBeforeAction",or with "customExecution" (with scriptcall).
 * Pls Note: (plugin auto reset Chance)
 * The "BreakChance"&"StealChance" will always be reseted to the Plugin param "BreakChance"&"StealChance",
 * ..in the AfterAction_Scene.
 *
 * Default equipSlots are : (BattleStatusWindow related)
 *-------------------------
 * 0 = weapon slot or shield slot (plugin checks if equip is armor or weapon)
 * 1 = shield slot or weapon slot (plugin checks if equip is armor or weapon)
 * 2 = head slot (plugin asumes armor)
 * 3 = body slot (plugin asumes armor)
 * 4 = accessory slot  (plugin asumes armor)
 * (can be used otherways aswell)
 *
 * Plugin Scriptcalls:
 *--------------------
 *
 * (Change Equip related to event ID works for Actors&Enemys .. and on all slots)
 * -> this allows individual EquipChange to every battleUnit
 *
 * $gameTemp.changeUnitArmor(eventID, SlotID, ArmorID);   //by Default armor Slot IDs are "1","2","3","4"
 *                                                      
 * $gameTemp.changeUnitWeapon(eventID, SlotID, WeaponID); //by Default weapon Slot ID is "0"
 *
 * (weaponID and ArmorID , is the Number related to the equipment in your Project)
 * => using 0 on weaponID or ArmorID, will delete any equipment in that slot!!
 *
 * these 2 Scriptcalls above can be used on battlemap to change the Equipment of battleUnits individually
 *-------------------------------------------------------------------------------------------------------
 * ScriptCall to change the Enemys ItemSlot_Item (3slots availleble). This is only for enemyUnits!
 *
 * $gameTemp.changeEnemyItem(eventID, SlotID, ItemID, typeID);
 * 
 * 
 *  eventID of the enemyUnit
 *  SlotID can be 0 ,1 or 2 (first slot is 0, last slot is 2)
 *  ItemID the ID of the Item or Equip, if id 0 this will leave an empty Slot
 *  typeID can be "item","armor" or "weapon"
 * 
 * 
 * Example:  $gameTemp.changeEnemyItem(30, 0, 3, "item");
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
 *   <srpgSlot5Type:x>
 *   <srpgSlot6Type:x>
 *   <srpgSlot7Type:x>
 *   <srpgSlot8Type:x>
 *   <srpgSlot9Type:x>
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
 *   <srpgSlot5EquipID:x>
 *   <srpgSlot6EquipID:x>
 *   <srpgSlot7EquipID:x>
 *   <srpgSlot8EquipID:x>
 *   <srpgSlot9EquipID:x>
 *
 * EquipID "x" is the number of the ID of Weapon or Armor in your project
 * (the plugin will know if its an armor or weapon because of the "SlotType" from above)
 *
 *------------------------------------------------------------------------------------
 * EquipSlotAmount:
 *-----------------
 * by default the Global EquipSlotAmount for enemys is set in the plugin param, 
 * it can be any number from 1 up to 10 (default is 5) 
 *
 * This enemyNote can set the slotAmount for that enemy ID individually!
 * (if not used default 5 will be used)
 *
 *   <enemySlotSize:x>
 * 
 *---------------
 * SkillNoteTags:
 *---------------
 * These noteTags , make a Skill into a "stealing_Skill" or "breaking_Skill"
 * (Skills can be break&steal Skills at the same time)
 * -> the Chance apllys to the whole Skill, if you steal/break more than 1 slot ,the same Chance will be used.
 * => if "srpgBreak" is used it will trigger the breakChance, "srpgSteal" will trigger stealChance
 * ==> incase both Chances are triggered,remember that broken Equip wont get stolen anyway.
 *
 * <srpgBreak:slot0Equip> 
 * <srpgBreak:slot1Equip> 
 * <srpgBreak:slot2Equip> 
 * <srpgBreak:slot3Equip> 
 * <srpgBreak:slot4Equip> 
 * <srpgBreak:slot5Equip> 
 * <srpgBreak:slot6Equip> 
 * <srpgBreak:slot7Equip> 
 * <srpgBreak:slot8Equip> 
 * <srpgBreak:slot9Equip> 
 *
 * <srpgSteal:slot0Equip> 
 * <srpgSteal:slot1Equip> 
 * <srpgSteal:slot2Equip> 
 * <srpgSteal:slot3Equip> 
 * <srpgSteal:slot4Equip> 
 * <srpgSteal:slot5Equip> 
 * <srpgSteal:slot6Equip> 
 * <srpgSteal:slot7Equip> 
 * <srpgSteal:slot8Equip> 
 * <srpgSteal:slot9Equip> 
 *
 *------------------
 * Steal Item Skill: (skillnote for Actor Skills)
 *------------------
 *
 *  <actorStealItem>
 *
 * Whatever Items the Enemy ID has on its "dropItems setup" (3slots) can be stolen by actors
 * (these items will be added to the enemys "itemSlot"-storage which has 3 slots aswell)
 *
 * The Chance rate that is Used for such skills is "stealChance"
 *
 * This chance is not related to the dropItem chance from the enemy setup
 *
 * Stolen items are erased from the "itemSlot"-storage, this has no Effect on "dropItem Slot" of that enemyUnit.
 * (enemy can still drop that item if killed in such case)
 * => if we would try to change the "dropItem Slot", this would affect all Enemys with the same enemy ID
 *
 * When actors steal items from enemys, the plugins checks the 3 ItemSlots,
 *  and the first slot which contains an Item will get stolen.The Item will be erased from that ItemSlot.
 * => for example if actors want to steal an item from slot 3, actor must steal items from slot1&2 first..
 *
 *
 * => you can also change the Items in the "itemSlot"storage of each enemyUnit individually with a ScriptCall
 *    (this has no Effect on dropItem Slot of that enemyUnit) 
 *----------------------------------------------------------------------------------------------------------
 * "BreakChance" & "StealChance" are by default "50" or whatever you added to the plugin param
 * (if Equip get broken, stealing wont work ,even if stealChance was succesfull)
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
     
  var _enemySlotSize = Number(parameters['Enemy Slot Amount'] || 5);

  var _broken = false;
  var _stolen = false; 	
//-----------------------------------------------------------------------------------------

//Scene.map.AfterAction:

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

//Game_interpreter

    // this.changeBreakChance(chanceNumber);Game_Interpreter.prototype.changeBreakChance.call(this, chanceNumber); 
    Game_Interpreter.prototype.changeBreakChance = function(chanceNumber) {
        _breakChance = Number(chanceNumber);
        return _breakChance;
    };
    // this.changeStealChance(chanceNumber);Game_Interpreter.prototype.changeStealChance.call(this, chanceNumber); 
    Game_Interpreter.prototype.changeStealChance = function(chanceNumber) {
        _stealChance = Number(chanceNumber);
        return _stealChance;
    };

//Game_Temp: ScripCalls

    // scriptcall "$gameTemp.changeEnemyItem(eventID, SlotID, ItemID, typeID);"
    Game_Temp.prototype.changeEnemyItem = function(eventID, SlotID, ItemID, typeID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleUnit[0] === 'enemy') && (battleUnit[1]._itemSlot)) {
            battleUnit[1]._itemSlot[SlotID]._itemId = ItemID;
            battleUnit[1]._itemSlot[SlotID]._dataClass = typeID;
            if (ItemID === 0)  {
                battleUnit[1]._equips[SlotID]._dataClass = "";
            }
        }
    return battleUnit[1]._itemSlot[SlotID];
    };

    // scriptcall "$gameTemp.changeUnitArmor(eventID, SlotID, ArmorID);"
    Game_Temp.prototype.changeUnitArmor = function(eventID, SlotID, ArmorID) {
        var battleUnit = $gameSystem.EventToUnit(eventID);
        if ((battleUnit[0] === 'enemy') && (battleUnit[1]._equips)) {
            battleUnit[1]._equips[SlotID]._itemId = ArmorID;
            battleUnit[1]._equips[SlotID]._dataClass = "armor";
            battleUnit[1]._equips[SlotID].equipIsGone = false;
            if (ArmorID === 0)  {
            battleUnit[1]._equips[SlotID]._dataClass = "";
            battleUnit[1]._equips[SlotID].equipIsGone = true;
            }
        }
        if ((battleUnit[0] === 'actor') && (battleUnit[1]._equips)) {
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
	if ($gameSystem.isSRPGMode() == true) {
            $gameMap.events().forEach(function(event) {
                 if (event.isType() === 'actor') {
                     var actorUnit = $gameSystem.EventToUnit(event.eventId);
                     if (actorUnit) {
                         var equips = actorUnit[1]._equips;
                         var count = equips.length;
                         for (var i = 0; i < count; i++) {
                              if ((actorUnit[1]._equipIsGone[i] === true) && (actorUnit[1]._equips[i]._itemId > 0)) {
                                  actorUnit[1]._equipIsGone[i] = false;
                              }
                         } 
                     }
                 } 	  
           });
        } 
    };

// Setup for Equipment of Units:
//-------------------------------
	
    var srpgActorIni = Game_Actor.prototype.initialize
    Game_Actor.prototype.initialize = function(actorId) {
        srpgActorIni.call(this, actorId)
        this._equipIsGone = [];
        this._battleUnit = 'actor';   
        var slotSize = this._equips.length;
        var count = slotSize;
        for (var i = 0; i < count; i++) {
             this._equipIsGone[i] = false;      
        }   
    };

    var srpgEnemyIni = Game_Enemy.prototype.initialize
    Game_Enemy.prototype.initialize = function(enemyId, x, y) {
        srpgEnemyIni.call(this, enemyId, x, y)
        this.setEquipSlots(); 
        this._battleUnit = 'enemy'; 
        this._itemSlot = [new Game_Item(), new Game_Item(), new Game_Item(), new Game_Item()];
        this.enemyItemStorage();
    };

    Game_Enemy.prototype.enemyItemStorage = function() {
        var count = 3;
        for (var i = 0; i < count; i++) {
             var itemType = this.enemy().dropItems[i].kind;
             var itemID =  this.enemy().dropItems[i].dataId;
	     if (itemType === 1) {var dataType = $dataItems[itemID]};
	     if (itemType === 2) {var dataType = $dataWeapons[itemID]};
	     if (itemType === 3) {var dataType = $dataArmors[itemID]};
             if (itemID > 0) {this._itemSlot[i].setObject(dataType)};   
        }
    return this._itemSlot;
    };

    // add EquipSlots to Game_Enemy
    Game_Enemy.prototype.setEquipSlots = function() {
        this._equips = [];
        this._equipIsGone = [];
        var slotSize = _enemySlotSize;
        if (this.enemy().meta.enemySlotSize) {slotSize = this.enemy().meta.enemySlotSize};
        var count = slotSize;
        for (var i = 0; i < count; i++) {
             this._equips[i] = new Game_Item();
             this._equipIsGone[i] = false;      
        } 

    };
    Game_Enemy.prototype.enemyEquips = function() {
        return this._equips.map(function(item) {
               return item.object();
        });
    };
    // add Equip if enemyNote fits & enemy is not already equiped
    Game_Enemy.prototype.equips = function() {
        if (this._equips) { 
            var enemy = this.enemy()
            if ((enemy.note.indexOf("srpgSlot0EquipID") > 0) && (this._equips[0]._itemId === 0) && (this._equipIsGone[0] === false)) {    
		var slotType = enemy.meta.srpgSlot0Type;
                if (slotType === "weapon") {this._equips[0].setObject($dataWeapons[Number(enemy.meta.srpgSlot0EquipID)])}
	        if (slotType === "armor") {this._equips[0].setObject($dataArmors[Number(enemy.meta.srpgSlot0EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot1EquipID") > 0) && (this._equips[1]._itemId === 0) && (this._equipIsGone[1] === false)) {    
		var slotType = enemy.meta.srpgSlot1Type;
                if (slotType === "weapon") {this._equips[1].setObject($dataWeapons[Number(enemy.meta.srpgSlot1EquipID)])}
	        if (slotType === "armor") {this._equips[1].setObject($dataArmors[Number(enemy.meta.srpgSlot1EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot2EquipID") > 0) && (this._equips[2]._itemId === 0) && (this._equipIsGone[2] === false)) {    
		var slotType = enemy.meta.srpgSlot2Type;
                if (slotType === "weapon") {this._equips[2].setObject($dataWeapons[Number(enemy.meta.srpgSlot2EquipID)])}
	        if (slotType === "armor") {this._equips[2].setObject($dataArmors[Number(enemy.meta.srpgSlot2EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot3EquipID") > 0) && (this._equips[3]._itemId === 0) && (this._equipIsGone[3] === false)) {    
		var slotType = enemy.meta.srpgSlot3Type;
                if (slotType === "weapon") {this._equips[3].setObject($dataWeapons[Number(enemy.meta.srpgSlot3EquipID)])}
	        if (slotType === "armor") {this._equips[3].setObject($dataArmors[Number(enemy.meta.srpgSlot3EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot4EquipID") > 0) && (this._equips[4]._itemId === 0) && (this._equipIsGone[4] === false)) {    
		var slotType = enemy.meta.srpgSlot4Type;
                if (slotType === "weapon") {this._equips[4].setObject($dataWeapons[Number(enemy.meta.srpgSlot4EquipID)])}
	        if (slotType === "armor") {this._equips[4].setObject($dataArmors[Number(enemy.meta.srpgSlot4EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot5EquipID") > 0) && (this._equips[5]._itemId === 0) && (this._equipIsGone[5] === false)) {    
		var slotType = enemy.meta.srpgSlot5Type;
                if (slotType === "weapon") {this._equips[5].setObject($dataWeapons[Number(enemy.meta.srpgSlot5EquipID)])}
	        if (slotType === "armor") {this._equips[5].setObject($dataArmors[Number(enemy.meta.srpgSlot5EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot6EquipID") > 0) && (this._equips[6]._itemId === 0) && (this._equipIsGone[6] === false)) {    
		var slotType = enemy.meta.srpgSlot6Type;
                if (slotType === "weapon") {this._equips[6].setObject($dataWeapons[Number(enemy.meta.srpgSlot6EquipID)])}
	        if (slotType === "armor") {this._equips[6].setObject($dataArmors[Number(enemy.meta.srpgSlot6EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot7EquipID") > 0) && (this._equips[7]._itemId === 0) && (this._equipIsGone[7] === false)) {    
		var slotType = enemy.meta.srpgSlot7Type;
                if (slotType === "weapon") {this._equips[7].setObject($dataWeapons[Number(enemy.meta.srpgSlot7EquipID)])}
	        if (slotType === "armor") {this._equips[7].setObject($dataArmors[Number(enemy.meta.srpgSlot7EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot8EquipID") > 0) && (this._equips[8]._itemId === 0) && (this._equipIsGone[8] === false)) {    
		var slotType = enemy.meta.srpgSlot8Type;
                if (slotType === "weapon") {this._equips[8].setObject($dataWeapons[Number(enemy.meta.srpgSlot8EquipID)])}
	        if (slotType === "armor") {this._equips[8].setObject($dataArmors[Number(enemy.meta.srpgSlot8EquipID)])}
            }  
            if ((enemy.note.indexOf("srpgSlot9EquipID") > 0) && (this._equips[9]._itemId === 0) && (this._equipIsGone[9] === false)) {    
		var slotType = enemy.meta.srpgSlot9Type;
                if (slotType === "weapon") {this._equips[9].setObject($dataWeapons[Number(enemy.meta.srpgSlot9EquipID)])}
	        if (slotType === "armor") {this._equips[9].setObject($dataArmors[Number(enemy.meta.srpgSlot9EquipID)])}
            } 
        this.metaDebug();
        } 
    if (this._equips) {return this.enemyEquips()} else {return 0};
    };

    Game_Enemy.prototype.metaDebug = function() {
        var eMeta = this.enemy().meta;
        if (!eMeta.srpgWeapon) {
            var count = _enemySlotSize;
            for (var i = 0; i < count; i++) {
                 if (this._equips[i]._dataClass === "weapon") eMeta.srpgWeapon = this._equips[i]._itemId;return;
            }
        }
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
            var item = equips[i];
            if (item) {
                value += item.params[paramId];
            }
        }
    return value;
    }
};
	
    // overwrite srpg core stuff
   
    Game_Enemy.prototype.hasNoWeapons = function() {
        return this.weapons().length === 0;
    };

    Game_Enemy.prototype.attackAnimationId = function() {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        } else {
            var weapons = $dataWeapons[Number(this._equips[0]._itemId)];
            return weapons ? weapons.animationId : 1;
        }
    };

    Game_Enemy.prototype.attackSkillId = function() {
        var weapon = this.weapons()[0];
        if (weapon && weapon.meta.srpgWeaponSkill) {
            return Number(weapon.meta.srpgWeaponSkill);
        } else {
            return Game_BattlerBase.prototype.attackSkillId.call(this);
        }
    };

    Game_Enemy.prototype.weapons = function() {
        return this.equips().filter(function(item) {
               return item && DataManager.isWeapon(item);
        });
    };

//Window Setup
//-----------------------------------------

//enemys
//--------

    // drawn contents Enemy Status window
    Window_SrpgStatus.prototype.drawContentsEnemy = function() {   
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawEnemyClass(this._battler, 12, lineHeight * 5);
        this.drawEnemyFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoEnemy(4, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4); 
        var equips = this._battler._equips;
        // only 5 slots are used by default
        // slot 0 check if weapon or shield assume weapon
        if (equips[0]._itemId === 0) {
            if (this._battler.enemy().meta.srpgSlot0Type === "armor") {
                if (_drawText === 'true') {this.drawText(_textNoShield, 250, lineHeight * 5)};
            } else {
                if (_drawText === 'true') {this.drawText(_textNoWeapon, 250, lineHeight * 5)};
            }           
        } else {//if slot has equip, check type & display equip
                var slotType = this._battler.enemy().meta.srpgSlot0Type;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[0]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[0]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 5 ); 
        };
        //slot 1 check if weapon or shield,assume shield
        if (equips[1]._itemId === 0) {
            if (this._battler.enemy().meta.srpgSlot1Type === "weapon") {
                if (_drawText === 'true') {this.drawText(_textNoWeapon, 250, lineHeight * 6)};
            } else {
                if (_drawText === 'true') {this.drawText(_textNoShield, 250, lineHeight * 6)};   
            }           
        } else {//if slot has equip, check type & display equip
                var slotType = this._battler.enemy().meta.srpgSlot1Type;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[1]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[1]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 6 ); 
        };
        //slot 2 assume Head
        if (equips[2]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoHead, 250, lineHeight * 7)};
        } else {//if slot has equip, check type & display equip
                var slotType = this._battler.enemy().meta.srpgSlot2Type;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[2]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[2]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 7 ); 
        };  
        //slot 3 assume Body
        if (equips[3]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoBody, 250, lineHeight * 8)};
        } else {//if slot has equip, check type & display equip
                var slotType = this._battler.enemy().meta.srpgSlot3Type;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[3]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[3]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 8 ); 
        };
        //slot 4 assume Accessory
        if (equips[4]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoAccessory, 250, lineHeight * 9)};
        } else {//if slot has equip, check type & display equip
                var slotType = this._battler.enemy().meta.srpgSlot4Type;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[4]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[4]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 9 ); 
        };
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

// actors:
//--------

    // draw Actor Content
    Window_SrpgStatus.prototype.drawContentsActor = function() {    
        var lineHeight = this.lineHeight();
        this.drawActorName(this._battler, 12, lineHeight * 0);
        this.drawActorClass(this._battler, 12, lineHeight * 5);
        this.drawActorFace(this._battler, 4, lineHeight * 1);
        this.drawBasicInfoActor(4, lineHeight * 6);
        this.drawParameters(156, lineHeight * 1);
        this.drawSrpgParameters(156, lineHeight * 4);
        var equips = this._battler._equips;
        // only 5 slots are used by default
        // slot 0 check if weapon or shield assume weapon
        if (equips[0]._itemId === 0) {
            if (equips[0]._dataClass === "armor") {
                if (_drawText === 'true') {this.drawText(_textNoShield, 250, lineHeight * 5)};
            } else {
                if (_drawText === 'true') {this.drawText(_textNoWeapon, 250, lineHeight * 5)};
            }           
        } else {//if slot has equip, check type & display equip
                var slotType = equips[0]._dataClass;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[0]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[0]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 5 ); 
        };
        //slot 1 check if weapon or shield,assume shield
        if (equips[1]._itemId === 0) {
            if (equips[1]._dataClass === "weapon") {
                if (_drawText === 'true') {this.drawText(_textNoWeapon, 250, lineHeight * 6)};
            } else {
                if (_drawText === 'true') {this.drawText(_textNoShield, 250, lineHeight * 6)};   
            }           
        } else {//if slot has equip, check type & display equip
                var slotType = equips[1]._dataClass;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[1]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[1]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 6 ); 
        };
        //slot 2 assume Head
        if (equips[2]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoHead, 250, lineHeight * 7)};
        } else {//if slot has equip, check type & display equip
                var slotType = equips[2]._dataClass;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[2]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[2]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 7 ); 
        };  
        //slot 3 assume Body
        if (equips[3]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoBody, 250, lineHeight * 8)};
        } else {//if slot has equip, check type & display equip
                var slotType = equips[3]._dataClass;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[3]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[3]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 8 ); 
        };
        //slot 4 assume Accessory
        if (equips[4]._itemId === 0) {
            if (_drawText === 'true') {this.drawText(_textNoAccessory, 250, lineHeight * 9)};
        } else {//if slot has equip, check type & display equip
                var slotType = equips[4]._dataClass;
	        if (slotType === "weapon") {var equip = $dataWeapons[equips[4]._itemId]};
	        if (slotType === "armor") {var equip = $dataArmors[equips[4]._itemId]};
                this.drawItemName(equip, 200, lineHeight * 9 ); 
        };
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



// Setup for Skills:
//-----------------------

    //this.nothingToSteal();
    Game_Action.prototype.nothingToSteal = function() {
        $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
        $gameMessage.add("There is Nothing to Steal \\|\\^");
    };
    //this.srpgFailedText();
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
        if ($gameSystem.isSRPGMode() == true) {
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
             if (this.item().meta.actorStealItem && result.isHit()) {
                 this.actorStealItem();
             }
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

    Game_Action.prototype.actorStealItem = function() {	
        var activeBattleUnit = $gameSystem.EventToUnit(this._userEventID);
        var targetBattleUnit = $gameSystem.EventToUnit(this._targetEventID);
        if (activeBattleUnit[0] === 'actor' && targetBattleUnit[0] === 'enemy' ) {
            var itemStolen = false;	
	    if (this.item().meta.srpgSkillStealChance) {
	        _stealChance = this.item().meta.srpgSkillStealChance;
	    } 
            // stealChanceRoll var that represents the chance you rolled.
            var stealChanceRoll = Math.floor(Math.random() * 100) + 1; 
            //_stealChance is the PluginVar that stores % chance 
            if (stealChanceRoll <= _stealChance) {		     
                itemStolen = true;
            }
	}
        if (itemStolen === true) {
            var doneStealing = false;
            var stolenItemType = 0;
            var stolenItem = 0;
            if ((doneStealing === false) && (targetBattleUnit[1]._itemSlot[0]._itemId > 0)) {
                stolenItemType = targetBattleUnit[1]._itemSlot[0]._dataClass;
                stolenItem = targetBattleUnit[1]._itemSlot[0]._itemId;
                targetBattleUnit[1]._itemSlot[0]._dataClass = "";
                targetBattleUnit[1]._itemSlot[0]._itemId = 0;
                doneStealing = true;
	    }
            if ((doneStealing === false) && (targetBattleUnit[1]._itemSlot[1]._itemId > 0)) {
                stolenItemType = targetBattleUnit[1]._itemSlot[1]._dataClass;
                stolenItem = targetBattleUnit[1]._itemSlot[1]._itemId;
                targetBattleUnit[1]._itemSlot[1]._dataClass = "";
                targetBattleUnit[1]._itemSlot[1]._itemId = 0;
                doneStealing = true;
	    }
            if ((doneStealing === false) && (targetBattleUnit[1]._itemSlot[2]._itemId > 0)) {
                stolenItemType = targetBattleUnit[1]._itemSlot[2]._dataClass;
                stolenItem = targetBattleUnit[1]._itemSlot[2]._itemId;
                targetBattleUnit[1]._itemSlot[2]._dataClass = "";
                targetBattleUnit[1]._itemSlot[2]._itemId = 0;
                doneStealing = true;
	    }
            if ((doneStealing === false) && (targetBattleUnit[1]._itemSlot[3]._itemId > 0)) {
                stolenItemType = targetBattleUnit[1]._itemSlot[3]._dataClass;
                stolenItem = targetBattleUnit[1]._itemSlot[3]._itemId;
                targetBattleUnit[1]._itemSlot[3]._dataClass = "";
                targetBattleUnit[1]._itemSlot[3]._itemId = 0;
                doneStealing = true;
	    }
            if (doneStealing === false)  {this.nothingToSteal()};
            if (doneStealing === true && stolenItem > 0)  {
	        if (stolenItemType === "item") {var dataType = $dataItems[stolenItem]};
	        if (stolenItemType === "weapon") {var dataType = $dataWeapons[stolenItem]};
	        if (stolenItemType === "armor") {var dataType = $dataArmors[stolenItem]};
                var itemName = dataType.name;
                var msgIconID = dataType.iconIndex;
                var eName = targetBattleUnit[1].name();
                $gameParty.gainItem(dataType, 1);
                this.stealResult(itemName, msgIconID, eName);
            }
	}
        if (itemStolen === false) {this.srpgFailedText()};	
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
            var slotID = 0;
            if ((this.item().meta.srpgBreak === "slot0Equip") && (targetBattleUnit[1]._equips[0]._itemId > 0)) {
                this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot1Equip") && (targetBattleUnit[1]._equips[1]._itemId > 0)) {
                slotID = 1;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot2Equip") && (targetBattleUnit[1]._equips[2]._itemId > 0)) {
                slotID = 2;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };
            if ((this.item().meta.srpgBreak === "slot3Equip") && (targetBattleUnit[1]._equips[3]._itemId > 0)) {
                slotID = 3;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot4Equip") && (targetBattleUnit[1]._equips[4]._itemId > 0)) {
                slotID = 4;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };
            if ((this.item().meta.srpgBreak === "slot5Equip") && (targetBattleUnit[1]._equips[5]._itemId > 0)) {
                slotID = 5;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot6Equip") && (targetBattleUnit[1]._equips[6]._itemId > 0)) {
                slotID = 6;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot7Equip") && (targetBattleUnit[1]._equips[7]._itemId > 0)) {
                slotID = 7;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };
            if ((this.item().meta.srpgBreak === "slot8Equip") && (targetBattleUnit[1]._equips[8]._itemId > 0)) {
                slotID = 8;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };	
            if ((this.item().meta.srpgBreak === "slot9Equip") && (targetBattleUnit[1]._equips[9]._itemId > 0)) {
                slotID = 9;this.srpgBreakingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToBreak = true;
	    };
        if (anythingToBreak === false) {this.nothingToBreak()};
	};  
    };	

    Game_Action.prototype.srpgBreakingSlot = function(activeBattleUnit, targetBattleUnit, slotID) {	
	var stolenEquipId = targetBattleUnit[1]._equips[slotID]._itemId;
	if (targetBattleUnit[1]._equips[slotID]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	}   
	if (targetBattleUnit[1]._equips[slotID]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;		
	}  
        targetBattleUnit[1]._equipIsGone[slotID] = true;
        targetBattleUnit[1]._equips[slotID] = new Game_Item();
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
            var slotID = 0;
            if ((this.item().meta.srpgSteal === "slot0Equip") && (targetBattleUnit[1]._equips[0]._itemId > 0)) {
                this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot1Equip") && (targetBattleUnit[1]._equips[1]._itemId > 0)) {
                slotID = 1;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot2Equip") && (targetBattleUnit[1]._equips[2]._itemId > 0)) {
                slotID = 2;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };
            if ((this.item().meta.srpgSteal === "slot3Equip") && (targetBattleUnit[1]._equips[3]._itemId > 0)) {
                slotID = 3;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot4Equip") && (targetBattleUnit[1]._equips[4]._itemId > 0)) {
                slotID = 4;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };
            if ((this.item().meta.srpgSteal === "slot5Equip") && (targetBattleUnit[1]._equips[5]._itemId > 0)) {
                slotID = 5;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot6Equip") && (targetBattleUnit[1]._equips[6]._itemId > 0)) {
                slotID = 6;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot7Equip") && (targetBattleUnit[1]._equips[7]._itemId > 0)) {
                slotID = 7;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };
            if ((this.item().meta.srpgSteal === "slot8Equip") && (targetBattleUnit[1]._equips[8]._itemId > 0)) {
                slotID = 8;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };	
            if ((this.item().meta.srpgSteal === "slot9Equip") && (targetBattleUnit[1]._equips[9]._itemId > 0)) {
                slotID = 9;this.srpgStealingSlot(activeBattleUnit, targetBattleUnit, slotID);anythingToSteal = true;
	    };
        if (anythingToSteal === false) {this.nothingToSteal()};
        };
    };

    Game_Action.prototype.srpgStealingSlot = function(activeBattleUnit, targetBattleUnit, slotID) {	
	var stolenEquipId = targetBattleUnit[1]._equips[slotID]._itemId;
	if (targetBattleUnit[1]._equips[slotID]._dataClass === "weapon") {
	    var itemName =  $dataWeapons[stolenEquipId].name;
            var msgIconID = $dataWeapons[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataWeapons[stolenEquipId], 1);
	    }  		
	}   
	if (targetBattleUnit[1]._equips[slotID]._dataClass === "armor") {
	    var itemName =  $dataArmors[stolenEquipId].name;
            var msgIconID = $dataArmors[stolenEquipId].iconIndex;
	    if ((targetBattleUnit[0] === "enemy") || 
		((targetBattleUnit[1].srpgTeam()) && (targetBattleUnit[1].srpgTeam() !== "actor"))) {
		$gameParty.gainItem($dataArmors[stolenEquipId], 1);
	    }  
	}  
        targetBattleUnit[1]._equipIsGone[slotID] = true;
        targetBattleUnit[1]._equips[slotID] = new Game_Item();
        var eName = targetBattleUnit[1].name();
        this.stealResult(itemName, msgIconID, eName);	
    };



//-----------------------------------------------------------------------------------------
// 
                 
//--End:

})();
