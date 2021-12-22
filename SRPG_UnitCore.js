//=============================================================================
// SRPG_UnitCore.js
//=============================================================================
/*:
 * @plugindesc v2.1 Adds <SRPG_UnitCore> for SRPG.This Plugin includes "SRPG_Teams".               
 *               And it replaces the "SRPG_EnemyEquip"-Plugin.                     
 *
 * @author dopan ("SRPG_Teams" is made by doctorQ)
 *
 * @param ----- SRPG_Teams -----
 *
 * @param Default Actor Team
 * @desc Default team for actors if none is specified
 * @default actor
 *
 * @param Default Enemy Team
 * @desc Default team for enemies if none is specified
 * @default enemy
 *
 *
 * @param ---- SRPG_UnitCore ----
 *
 * @param Yep Item Core Compatiblety
 * @desc set this switch to "true" if using the Yep Item Core. 
 * @type boolean
 * @default false
 * 
 * @param Controll MenuChar_Img
 * @desc (true) is using SV battler IMG for the MenuChar of ItemSlots Menu.(false) is using MapChar. 
 * @type boolean
 * @default false
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
 * @desc Switch that lets you decide if a Text is drawn into BattleStatus Window if unequiped.
 * @type boolean
 * @default true
 *
 * @param noWeapon Text
 * @desc Text that is used on weaponSlot, if "Controll Draw Text" is "true".
 * @default No Weapon
 *
 * @param noShield Text
 * @desc Text that is used on shieldSlot, if "Controll Draw Text" is "true".
 * @default No Shield
 *
 * @param noHead Text
 * @desc Text that is used on headSlot, if "Controll Draw Text" is "true".
 * @default No Head
 *
 * @param noBody Text
 * @desc Text that is used on bodySlot, if "Controll Draw Text" is "true".
 * @default No Body 
 *
 * @param noAccessory Text
 * @desc Text that is used on accessorySlot, if "Controll Draw Text" is "true".
 * @default No Accessory
 *
 * @param Enemy EquipSlot Size
 * @desc Default Amount of EquipSlots for all Enemys.EnemyNote can change this indivudually.(Actors use the ActorData)
 * @type number
 * @min 1
 * @max 10
 * @default 5
 *
 * @param Enemy ItemSlot Size
 * @desc Global Size of EnemyItemSlots.(3 is minimum ,related to the 3_dropItems)
 * @type number
 * @min 3
 * @max 20
 * @default 4
 *
 * @param Actor ItemSlot Size
 * @desc Global Size of ActorItemSlots.ActorNote can change this individually.
 * @type number
 * @min 1
 * @max 20
 * @default 5
 *
 * @param Actor ItemStack Size
 * @desc The Amount of same Items that can be equipped to each Actor ItemSlot.
 * @min 1
 * @max 99
 * @default 5
 *
 * @param Menu Command
 * @desc The Text for the Main Menu Command.Used in The ActorItemSlot Menu.
 * @default ItemSlots
 *
 * @param Add Item Text
 * @desc Text used for adding Items in The ActorItemSlot Menu. 
 * @default Add
 *
 * @param Remove Item Text
 * @desc Text used for clearing singel Items in the ActorItemSlot Menu.
 * @default Remove 
 *
 * @param Reset Text
 * @desc Text used for reseting all Items Command in the ActorItemSlot Menu.
 * @default Reset
 *
 * @param Add Item Amount Text
 * @desc Text used for how many Items to Add to an ItemSlot in the ActorItemSlot Menu.
 * @default Add Item Amount:
 *
 * @param Remove Item Amount Text
 * @desc Text used for how many Items to remove from an ItemSlot in the ActorItemSlot Menu.
 * @default Remove Item Amount:
 *
 * @param Empty Slot Text
 * @desc Text displayed for an empty ActorItemSlot in The Menu.
 * @default _________Empty_________
 *
 *
 *
 *
 * @help  
 *
 * this Plugins requires: 
 *  "SRPG_Core.js" 
 *
 * This Plugin let Enemys use Equipment (default is = 5 base slots) & and it adds the Equipment
 * into the battleStatusWindow of actor&enemys.And it adds enemyClasses & enemyEXP. 
 * 
 * => the max Amount of used EnemySlots is 10
 * (but if using more than the default 5, you need to edit the BattleStatusWindow,or only the default_5 will be displayed)
 *  => such BattleStatusWindow_edit can be made in this plugin or in the "SRPG_StatusWindow(patch)" plugin
 * 
 * => the max Amount of  EquipSlots from which can be stolen/broken is also 10
 * (itemSlotSize can be 20 or more if changing the param, but never try to change a ItemSlot which doesnt exist) 
 *
 *
 * => this Plugin includes a stealing/breaking function!
 *
 * 
 * Pls check out the Plugin param to change a few things if needed.
 *
 * Everything else is handled with EnemyNotetags, SkillNoteTags & Scriptcalls..
 *
 * (by editing the Plugins JS_code the battleStatusWindow can be changed if needed,
 *  but i think i already made the best of it) 
 *
 * For the default  BattleStatusWindow Setup pls use resolution of  "1110 x 768"
 * -> if using resolution of "1110 x 768", you can put "SRPG_StatusWindow(patch)" below this plugin.
 * -> if using the default resoluton of "816x624", you can put "SRPG_StatusWindow(816x624)" below this plugin.
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
 * $gameTemp.changeUnitArmor(eventID, slotID, armorID);   //by Default armor Slot IDs are "1","2","3","4"
 *                                                      
 * $gameTemp.changeUnitWeapon(eventID, slotID, weaponID); //by Default weapon Slot ID is "0"
 *
 * (weaponID and armorID , is the Number related to the equipment in your Project)
 * => using 0 on weaponID or armorID, will delete any equipment in that slot!!
 *
 * these 2 Scriptcalls above can be used on battlemap to change the Equipment of battleUnits individually
 *-------------------------------------------------------------------------------------------------------
 * ScriptCall to change the Enemys ItemSlot_Item (min 3slots availleble). This is only for enemyUnits!
 *
 * $gameTemp.changeEnemyItem(eventID, slotID, itemID, typeID);
 * 
 * 
 *  "eventID" of the enemyUnit
 *  "slotID" can be 0 or higher, depending on the ItemslotSize (it starts with 0 = first slot)
 *  "itemID" the ID of the Item or Equip, if id 0 this will leave an empty Slot!!
 *  "typeID" can be "item","armor" or "weapon" 
 * 
 * 
 * Example:  $gameTemp.changeEnemyItem(30, 0, 3, "item");
 * 
 *----------------------------------------------
 * Scriptcall to change the Stealchance in Game:
 *----------------------------------------------
 * BreakChance:
 *--------------
 *
 *
 *  "this.changeBreakChance(chanceNumber);" // usage in Events ,commonEvents  ect
 *
 *
 * StealChance:
 *--------------
 *
 *
 *   "this.changeStealChance(chanceNumber);" // usage in Events ,commonEvents  ect
 *
 *
 *
 * => "chanceNumber" can be any number betwen "1" and "100". "100" means 100% stealChance.
 * (default is ChanceNumber in the Plugin param)
 * => if you want more complex Chance_options you can make a script or $gameVariable to define the number ,
 *    and put it in a common event. This common event can use this scriptcall as final trigger
 * 
 * (in such case the common event should be triggered with "custom execution" or the "preBattle phase" for example)
 *
 *
 * Scriptcall to enable/disable "ItemSlots menuCommand":
 *------------------------------------------------------
 *  
 *  "this.enableItemSlotsCommand(true/false);"
 * 
 * Plugin default is true, if false the MenuCommand is disabled.
 * 
 * 
 *
 * Plugin NoteTags:
 *-----------------
 * Enemy noteTags: (for classes and Levels)
 *
 *   <srpgClass:X>      # set class id.THIS IS REQUIRED! (number)
 *   <srpgLevel:X>      # set level id (number).If not used default level is 1
 *----------------
 * Enemy noteTags: (for equip)
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
 * Example1 => <srpgSlot0Type:weapon>  
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
 * Example2 => <srpgSlot0EquipID:1> 
 *
 * ..so to equip the weapon with id_1 to "equipSlot_0" we need both together (Example1 and Example2)
 * ==>
 *      <srpgSlot0Type:weapon>  
 *      <srpgSlot0EquipID:1>
 *
 * 
 *
 *------------------------------------------------------------------------------------
 * ENEMY EquipSlotAmount & ItemSlotAmount:
 *---------------------------------------------------
 * by default the Global EquipSlotAmount for enemys is set in the plugin param, 
 * it can be any number from 1 up to 20 (default is 4) 
 *
 * This enemyNote can set the slotAmount for that enemy ID individually!
 * (if not used default 4 will be used)
 *
 *   <enemyEquipSlotSize:x>  //enemyNote
 * 
 *---------------
 * SkillNoteTags: (for actors & enemys)
 *---------------
 *
 * Pls note : you can combine these Notetags by using more than one in 1 skill,
 * BUT make sure to NEVER use the SAME NoteTag 2 times in the same skill
 * (or else the second one will overwrite the first, even if "x" is different)
 *
 * incase of combining Notetags it can be helpfull to know in what order they are executed..
 * => its the same order from top to down in which they are displayed and explained below!  
 *    (for obvius reasons all break skills are executed first, broken stuff cant be stolen^^)
 *
 * by default "x" is used to define whats explained below,
 *  and that will always just steal 1 Item/Equip per NoteTag_Usage
 * But we can also use the "all&next-Options" for more complex Usage
 * (the "all&next-Options" will be explained below after the NoteTags)
 *
 *                      //EXPLANATION: "breakSkills" show what "x" is, "stealSkills" add usage info
 *
 *                      // X data info:
 *                             
 * <srpgBreak:x>           //"x" is "item" "armor" "weapon" ("item" = ItemSlot else=> EquipSlot)
 * <srpgItemBreak:x>       //"x" is itemName (example "potion" => "<srpgItemBreak:potion>" only for items!!)
 * <srpgTypeBreakEquip:x>  //"x" is eTypeID = EquipmentTypeID of your System (starts with 1)
 * <srpgTypeBreakWeapon:x> //"x" is wTypeID = WeaponTypeID of your System (starts with 1)
 * <srpgTypeBreakArmor:x>  //"x" is aTypeID = ArmorTypeID of your System  (starts with 1)
 * <srpgSlotBreakEquip:x>  //"x" is slotID of EquipSlot (starts with 0 ) 
 * <srpgSlotBreakItem:x>   //"x" is slotID of ItemSlot (starts with 0 )  
 *                            
 *
 * <srpgSteal:x>           // this will target the next fitting Slot from the top if it matches with "x"
 * <srpgItemSteal:x>       // this will target the next fitting ItemSlot from the top if it matches with "x"
 * <srpgTypeStealWeapon:x> // this will target the next fitting EquipSlot from the top if it matches with "x"
 * <srpgTypeStealArmor:x>  // this will target the next fitting EquipSlot from the top if it matches with "x"
 * <srpgTypeStealEquip:x>  // this will target the next fitting EquipSlot from the top if it matches with "x"
 * <srpgSlotStealEquip:x>  // this will target the SlotID of EquipSlot "x"
 * <srpgSlotStealItem:x>   // this will target the SlotID of ItemSlot "x"
 *
 * "All & Next"-Options:
 *---------------------
 * in some cases you might want to use Options to break OR steal "all" or the "next" Item/Equip
 *
 * SCHOWCASE EXAMPLES: to show where you can use these extra options
 *
 * <srpgBreak:allItems>              //"x" can be "allItems" or "allWeapons" or "allArmors"
 * <srpgItemBreak:allNames>          //"x" can be only "allNames"
 * <srpgTypeBreakEquip:allTypes>     //"x" can be only "allTypes"
 * <srpgTypeBreakWeapon:allTypes>    //"x" can be only "allTypes"  
 * <srpgTypeBreakArmor:allTypes>     //"x" can be only "allTypes"   
 * <srpgSlotBreakEquip:allSlots>     //"x" can be "allSlots" or "nextSlot"
 * <srpgSlotBreakItem:nextSlot>      //"x" can be "allSlots" or "nextSlot" 
 *
 * <srpgSteal:x>            // "x" is same as on break noteTags, if "allItems" = ItemSlot. Else => EquipSlot
 * <srpgItemSteal:x>        // this will target all ItemNames of the targetBattleUnit's ItemSlots..
 * <srpgTypeStealWeapon:x>  // this will target all Weapons of all WeaponTypes (EquipSlots)
 * <srpgTypeStealArmor:x>   // this will target all Armor of all ArmorTypes (EquipSlots)
 * <srpgTypeStealEquip:x>   // this will target all Equip of all EquipTypes (EquipSlots)
 * <srpgSlotStealEquip:x>   // this targets "all" or only 1 which is the "next" Equiped from the Top (EquipSlot)
 * <srpgSlotStealItem:x>    // this targets "all" or only 1 which is the "next" Item from the Top (ItemSlot)
 *
 *
 * Note: I admit i only tested a few NoteTags, but they are all bound into 1 Function,
 *        and on this Version i had no Bugs left with the tested skills & NoteTags
 *(normaly that means they should all work,no matter how they are combined,but if you find a buged One pls let me know!)       
 *
 *------------------------------------
 * gain Exp & gain Gold -Skills:
 *------------------------------------
 *
 * <srpgGoldStealAmount:x> // Steals Gold using a fixed amount that is influenced by the Units Levels
 *
 * <srpgGoldStealRandom:x> // Steals Gold ,influenced by Units Levels and an randomized around the number "x"
 *
 * <srpgExpStealAmount:x> // Steals EXP using a fixed amount that is influenced by the Units Levels
 *
 * <srpgExpStealRandom:x> // Steals EXP ,influenced by Units Levels and an randomized around the number "x"
 *
 *
 * "x" can be any number, i can recommend using 99, 111 & 123 for example..
 *
 *
 * Explanation, in all 4 cases the Levels of the Units do Influence the outcome 
 * (if the target has a higher level,than the user,.. the outcome gets higher)
 * => and the levels also change the Final Amount
 *
 * used formulas are these: (can be tested in console F8, to figure out what "x" data you wanna use)
 *
 * 1.Random Amount => Math.round(Math.floor(Math.random() * finalAmount + finalAmount / 2))
 *
 * 2a.Normal Amount => Math.round((randomAmount / (activeLevel + 1)) * targetLevel); 
 *
 * 2b.Normal Amount => Math.round((randomAmount / (activeLevel - 1)) * targetLevel); 
 * 
 * "finalAmount" is where the "x" data is used, "random skills" use both (1.Random Amount & 2.Normal Amount)
 *
 * "normal amount skills" uses only the second formula (1.Normal Amount)
 *
 * "randomAmount" is also where the "x" data is used. "activeLevel" is the users level
 *
 * "targetLevel" is the targets level..
 *
 * 2a. is used,when the "user" has a higher level",.. 2b is used when the "target" has the higher Level
 *
 *--------------------------------------------------
 * Item or Equip "Protection NoteTags"
 *--------------------------------------------------
 *
 * <noSteal> //protects the Item Or Equip permanent from beeing Stolen
 * <noBreak> //protects the Item Or Equip permanent from beeing Broken       
 *
 *----------------------------------------------------
 * Explanation about EnemyItemSlots & ActorItemSlots
 *----------------------------------------------------
 *
 * EnemyItemSlots:
 *-----------------
 * Whatever Items the Enemy ID has on its "dropItems setup" (3slots) will be added to EnemyItemSlots 
 * (the first 3 EnemyItemSlots will store them, all other Slots are empty by default but can be equiped with scripcall)
 *
 * The steal chance is not related to the dropItem chance from the enemy Setup.
 * Stolen ENEMYitems are erased from the "itemSlot"-storage, this has no Effect on "dropItem Slot" of that enemyUnit.
 * 
 * (enemy can still drop that item if killed in such case)
 * => if we would try to change the "dropItem Slot", this would affect all Enemys with the same enemy ID
 *
 * pls note: enemys dont use these items they only store them to get stolen or lootet.
 * If enemys use items with skills they will get the data from the system similar to how other enemySkills work. 
 * And when enemys steal Stuff and they are not in the actorTeam,these stolen stuff gets erased..
 *(looting needs scripting/eventing this is not supported by default, but it should be possible with having eventGraves)
 *
 * The enemySlots_Size can be changed global for all enemys in the Plugin param
 * or with this EnemyNoteTage (affects all enemys with the same enemyID)
 *
 *    <enemyEquipSlotSize:x>    // "x" is the size of enemySlot.. minimum is 3 ! default is 4
 *
 *
 * ActorItemslots: 
 *----------------
 *
 * For Actors this plugin provides an extra itemslot menu outside of SRPGbattle, 
 * and the Item command will be overwritten to only allow the usage of these ActorSlot Items for Actors.
 *
 * if Actors Steal of loot Items ect, they will give it directly to the gameparty like usual!
 *
 * I might build an extension plugin in the future that overwrites the "$gameParty.gainItem"-function.
 * in order to get give items to the actors instead(and enemys might be able to store stolen items aswell)  
 * -> but this should be optional and it would require more coding to handle everything correctly,
 *     thats why i avoided to do that in this Plugin.
 *
 * ActorNoteTag ItemSlots
 *-----------------------
 *
 * <actorItemSlotSize:x> // actorNote minimum is 1, default is 5
 *
 * this can change the ItemSlotsize for each single Actor individually
 * there is also a global Option for all actors in the Param which get overwriten when using this
 *
 * ItemNoteTag:
 *-------------
 *
 * <noActorItemSlot>  // ItemNote
 *
 * Items with this noteTag cant be equiped in the ActorItemSlots
 *
 * (for usage on unique items or story items ect)
 *
 *----------------------------------------------------------------------------------------------------------
 * "BreakChance" & "StealChance" are by default "50" or whatever you added to the plugin param
 * (if Equip get broken, stealing wont work ,even if stealChance was succesfull)
 *
 * <srpgSkillBreakChance:x> // SkillNote
 * <srpgSkillStealChance:x> // SkillNote
 * 
 * "x" is a number betwen 1 and 100. Example => 100 would mean %100 chance => <srpgSkillBreakChance:100>
 * (these Skill_NOTETAGs are only needed if you want a skill with other chances)
 *
 * "Chances" can be changed global with Scriptcall for usage with "custom execution" or in the "preActionPhase"
 * The "BreakChance"&"StealChance" will always be reseted to the Plugin param "BreakChance"&"StealChance",
 * ..in the AfterAction_Scene.
 * 
 * ============================================================================
 * about enemyClass & enemyEXP (Classes are required to handle EXP)
 * ============================================================================
 *
 * The Class for enemys must be added in the enemy Note!
 *
 * use a Number for this (id of class)
 *
 * Enemy Classes wont let enemy learn skills or Class param, they are only used for:
 *
 * - using Class Notetags
 *
 * - using the EXP curves of the Class to handle the EXP Setup
 *
 * also enemys dont need to care about Equip restrictions,.. 
 *
 * In my oppinion, Class/Equip Restrictions are made for the "player" of your Game.Not for you the Dev.
 *
 * So it would make no sence to add restrictions to the enemys , when the player can not controll the Enemys.
 *
 * This oppinion forced me, to not just copy paste The whole Setup, from actors to enemys..
 * -> i had to figure out which Functions are required and which Functions doesnt help for my purposes.
 *
 * => also my main Purpose was to make all this compatible to the used srpg System.
 * =======================
 * about "dual wield" ect
 * =======================
 *
 * This plugin doesnt change that the System always only use the main hand weapon.
 * If i will be able to change this into actually using each equiped weapon,
 *  this will not happen in this plugin. I will build an Extension plugin for that,
 * if i can make this happen.
 * ============================================================================
 *
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 2.1:
 * - first Release 18.12.2021 for SRPG (rpg mv)!
 * -> this REPLACES the old "enemyEquip"-Plugin
 * -> add Enemy class and enemy Level and "steal"Gold/Exp -Skills
 */
 
(function() {

 // Plugin param Variables:
  var parameters = PluginManager.parameters("SRPG_UnitCore") || $plugins.filter(function (plugin) {
	           return plugin.description.contains('<SRPG_UnitCore>')});
									       
 // SRPG Teams
  var _actorTeam = parameters['Default Actor Team'] || "";
  var _enemyTeam = parameters['Default Enemy Team'] || "";	
		
 // SRPG EquipCore	
  var _srpg_Yep_ItemCore = (parameters['Yep Item Core Compatiblety'] || 'false');
  var _breakChance = Number(parameters['Break Chance'] || 50);
  var _stealChance = Number(parameters['Steal Chance'] || 50); 	
  var _drawText = parameters['Controll Draw Text'] || 'true';
  var _textNoWeapon = parameters['noWeapon Text'] || _textNoWeapon;
  var _textNoShield = parameters['noShield Text'] || _textNoShield;
  var _textNoHead = parameters['noHead Text'] || _textNoHead;
  var _textNoBody = parameters['noBody Text'] || _textNoBody;
  var _textNoAccessory = parameters['noAccessory Text'] || _textNoAccessory;  
  var _enemyEquipSlotSize = Number(parameters['Enemy EquipSlot Size'] || 5);
  var _srpg_enemyItemSlotSize = Number(parameters['Enemy ItemSlot Size'] || 3);
  var _srpg_Controll_MenuChar_Img = (parameters['Controll MenuChar_Img'] || 'false');
  var _srpg_actorItemSlotSize = Number(parameters['Actor ItemSlot Size'] || 5); 
  var _srpg_ItemStackSize = Number(parameters['Actor Item Stack Size'] || 5);
  var _srpg_menuCommand = parameters['Menu Command'];
  var _srpg_txtAddItem = parameters['Add Item Text'];
  var _srpg_txtRemoveItem = parameters['Remove Item Text'];
  var _srpg_txtReset = parameters['Reset Text'];
  var _srpg_txtAddItemAmount = parameters['Add Item Amount Text'];
  var _srpg_txtRemoveAmount = parameters['Remove Item Amount Text'];  
  var _srpg_emptySlot = parameters['Empty Slot Text'];
  var _lastSlot = 0;
  var _slotActorId = 0;	
  var _enable_ItemSlotsCommand = true; 
	

//-----------------------------------------------------------------------------------------



//Game_System:

// init Enemy UnitCore Setup
var _srpg_setEventToUnit = Game_System.prototype.setEventToUnit;
Game_System.prototype.setEventToUnit = function(event_id, type, data) {
    _srpg_setEventToUnit.call(this, event_id, type, data);
    var battler = this._EventToUnit[event_id];
    if (battler && (battler[0] === 'enemy')) {
        var mapEventMetaUnitID = $gameMap.event(event_id).event().meta.unit;
        $gameMap.event(event_id)._eventEnemyUnitId = mapEventMetaUnitID;
        battler[1]._enemyUnitId = mapEventMetaUnitID;
        battler[1].initEnemyUnitCoreSetup(event_id);
        battler[1].level = battler[1]._level;
    }
};

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

//Game_interpreter  _enable_ItemSlotsCommand

// this.enableItemSlotsCommand(true/false); 
Game_Interpreter.prototype.enableItemSlotsCommand = function(switchControll) {
    _enable_ItemSlotsCommand = switchControll;
    return switchControll;
};

// this.changeBreakChance(chanceNumber); 
Game_Interpreter.prototype.changeBreakChance = function(chanceNumber) {
    _breakChance = Number(chanceNumber);
    return _breakChance;
};	
// this.changeStealChance(chanceNumber);
Game_Interpreter.prototype.changeStealChance = function(chanceNumber) {
    _stealChance = Number(chanceNumber);
    return _stealChance;
};

//Game_Temp: ScripCalls
	
// scriptcall "$gameTemp.changeEnemyItem(eventID, slotID, itemID, typeID);"
Game_Temp.prototype.changeEnemyItem = function(eventID, slotID, itemID, typeID) {
    var battleUnit = $gameSystem.EventToUnit(eventID);
    if ((battleUnit[0] === 'enemy') && (battleUnit[1]._itemSlots)) {
        battleUnit[1]._itemSlots[slotID]._itemId = itemID;
        battleUnit[1]._itemSlots[slotID]._dataClass = typeID;
        if (itemID === 0)  {
            battleUnit[1]._equips[slotID]._dataClass = "";
        }
    }
return battleUnit[1]._itemSlots[slotID];
};

// scriptcall "$gameTemp.changeUnitArmor(eventID, slotID, armorID);"
Game_Temp.prototype.changeUnitArmor = function(eventID, slotID, armorID) {
    var battleUnit = $gameSystem.EventToUnit(eventID);
    if (battleUnit[1]._equips) {
        battleUnit[1]._equips[slotID]._itemId = armorID;
        battleUnit[1]._equips[slotID]._dataClass = "armor";
        battleUnit[1]._equips[slotID].equipIsGone = false;
        if (armorID === 0)  {
            battleUnit[1]._equips[slotID]._dataClass = "";
            battleUnit[1]._equips[slotID].equipIsGone = true;
        }
    }   
return battleUnit[1]._equips[slotID];
};

// scriptcall to change enemy weapon "$gameTemp.changeUnitWeapon(eventID, slotID, weaponID);"
Game_Temp.prototype.changeUnitWeapon = function(eventID, slotID, weaponID) {
    var battleUnit = $gameSystem.EventToUnit(eventID);
    if (battleUnit[1]._equips) {
        battleUnit[1]._equips[slotID]._itemId = weaponID;
        battleUnit[1]._equips[slotID]._dataClass = "weapon";
        battleUnit[1]._equips[slotID].equipIsGone = false;
        if (weaponID === 0)  {
            battleUnit[1]._equips[slotID]._dataClass = "";
            battleUnit[1]._equips[slotID].equipIsGone = true;
        }
    } 
return battleUnit[1]._equips[slotID];
};

// reset Actor Equip if actors re_equip
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

// Setup for Equipment & ItemSlots of Units:
//------------------------------------------
// add stuff to Actor Setup	
var _srpgActorIni = Game_Actor.prototype.initialize
Game_Actor.prototype.initialize = function(actorId) {
    _srpgActorIni.call(this, actorId);
    this._equipIsGone = [];
    this._battleUnit = 'actor';   
    var slotSize = this._equips.length;
    var count = slotSize;
    for (var i = 0; i < count; i++) {
         this._equipIsGone[i] = false;      
    }   
this.setItemSlots();
};
// set Actor itemSlots
Game_Actor.prototype.setItemSlots = function() {
    this._itemSlots = [];
    var itemSlotsize = _srpg_actorItemSlotSize;
    var count = itemSlotsize;
    if (this.actor().meta.actorItemSlotSize) {count = actor().meta.actorItemSlotSize};
    for (var i = 0; i < count; i++) {
	 this._itemSlots[i] = new Game_Item();
	 this._itemSlots[i].amount = 0;
    };
};
// clear singel Item Slot inclufing Amount Option  
Game_Actor.prototype.clearItemSlot = function(slotID, amount) {
    if (this._itemSlots[slotID].amount > amount) {
        this._itemSlots[slotID].amount = this._itemSlots[slotID].amount - amount;
    } else {
	if (this._itemSlots[slotID].amount <= amount) {
            this._itemSlots[slotID] = new Game_Item();
      	    this._itemSlots[slotID].amount = 0;
	};
    }
}; 
// return singel ItemStacks Including Amount to GameParty	
Game_Actor.prototype.returnItemToParty = function(slotID, reAmount) {
    var itemID = this._itemSlots[slotID]._itemId;
    if (this._itemSlots[slotID] && (itemID > 0)) {
	$gameParty.gainItem($dataItems[itemID], reAmount);
    };
    if (this._itemSlots[slotID].amount > reAmount) {
        this._itemSlots[slotID].amount = this._itemSlots[slotID].amount - reAmount;    
    } else {
        if (reAmount => this._itemSlots[slotID].amount ) {
            this._itemSlots[slotID] = new Game_Item();
            this._itemSlots[slotID].amount = 0;
        }
    }
};
// Resets all Actor ItemSlots to empty & gives Items to GameParty
Game_Actor.prototype.resetItemSlots = function() {
    for (var i = 0; i < this._itemSlots.length; i++) {
         var itemID = this._itemSlots[i]._itemId
         $gameParty.gainItem($dataItems[itemID], this._itemSlots[i].amount);
         var amount = this._itemSlots[i].amount;
	 this.clearItemSlot(i, amount);
    };
};
// used to add Items To ActorItemSlots  
Game_Actor.prototype.changeActorItem = function(slotID, itemID, amount) {
    if (isNaN(itemID)) {
	itemID = itemID.id;
    };  
    if (this._itemSlots[slotID]._itemId != itemID) {
        var returnAmount = this._itemSlots[slotID].amount;
	this.returnItemToParty(slotID, returnAmount);
	this._itemSlots[slotID] = new Game_Item();
    };
    if (this._itemSlots && (itemID > 0)) {
        var oldAmount = 0;
        if (this._itemSlots[slotID].amount > 0) oldAmount = this._itemSlots[slotID].amount;
        this._itemSlots[slotID]._itemId = itemID;
        this._itemSlots[slotID]._dataClass = "item";
        this._itemSlots[slotID].amount = amount + oldAmount;
    }
    if (this._itemSlots && itemID === 0)  {
        this._itemSlots[slotID]._dataClass = "";
        this._itemSlots[slotID].amount = 0;
    }
};
// used to add Items to actors ItemSlots Amount
Game_Actor.prototype.changeItemAmount = function(slotID, amount) {
    var oldAmount = this._itemSlots[slotID].amount;
    if ((oldAmount + amount) > 0) {
       this._itemSlots[slotID].amount = amount + oldAmount;
    }
};
// max amount of actor ItemSlot Stacks
Game_Actor.prototype.maxItemAmount = function(slotID, itemID) {
    var itemSlot = this._itemSlots[slotID];
    var dataItem = $dataItems[itemID];
    var maxAmount = dataItem.stackSize - itemSlot.amount;
    return maxAmount;
}; 	
// setup enemy stuff	
var _srpgEnemyIni = Game_Enemy.prototype.initialize
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
    _srpgEnemyIni.call(this, enemyId, x, y);
    this.setEquipSlots(); 
    this._battleUnit = 'enemy'; 
    this._itemSlots = [new Game_Item(), new Game_Item(), new Game_Item()];
    this.enemyItemStorage();

};

Game_Enemy.prototype.initEnemyUnitCoreSetup = function(event_id) {
    this._exp = {};
    this._skills = [];
    this._classId = 0;
    this._level = 0;
    this._name = '';
    var enemyMeta = this.enemy().meta;
    this.initSkills();
    this._team = this.srpgTeam();
    this._name = this.name();
    if (enemyMeta.srpgClass) {
        this._classId = Number(enemyMeta.srpgClass);
    } else {this._classId = 1};
    if (enemyMeta.srpgClass) {
        this._level = Number(enemyMeta.srpgLevel);
    } else {this._level = 1};
    this.initExp();
};

// get dropItems Into the EnemyItemStorage and set max slot size 3;Note: <enemyEquipSlotSize:x>
Game_Enemy.prototype.enemyItemStorage = function() {
    var count = _srpg_enemyItemSlotSize;
    if (this.enemy().meta.enemyItemSlotSize) {count = this.enemy().meta.enemyItemSlotSize};
    for (var i = 0; i < count; i++) {
	 this._itemSlots[i] = new Game_Item();
         if (i < 3) {
            var itemType = this.enemy().dropItems[i].kind;
            var itemID =  this.enemy().dropItems[i].dataId;
	    if (itemType === 1) {var dataType = $dataItems[itemID]};
	    if (itemType === 2) {var dataType = $dataWeapons[itemID]};
	    if (itemType === 3) {var dataType = $dataArmors[itemID]};
            if (itemID > 0) {this._itemSlots[i].setObject(dataType)};
         }   
    }
return this._itemSlots;
};
// add EquipSlots to Game_Enemy
Game_Enemy.prototype.setEquipSlots = function() {
    this._equips = [];
    this._equipIsGone = [];
    var slotSize = _enemyEquipSlotSize;
    if (this.enemy().meta.enemyEquipSlotSize) {slotSize = this.enemy().meta.enemyEquipSlotSize};
    var count = slotSize;
    for (var i = 0; i < count; i++) {
         this._equips[i] = new Game_Item();
         this._equipIsGone[i] = false;      
    } 

};
// compatiblety script used in the function below	
Game_Enemy.prototype.enemyEquips = function() {
    return this._equips.map(function(item) {
           return item.object();
    });
};
// add Equip if enemyNote fits & enemy is not already equiped
Game_Enemy.prototype.equips = function() {
    if (this._equips) { 
        var enemy = this.enemy();
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
// debug weapon meta info to fit with the SRPGcore Setup for general plugin compatiblety
Game_Enemy.prototype.metaDebug = function() {
    var eMeta = this.enemy().meta;
    if (!eMeta.srpgWeapon) {
        var count = _enemyEquipSlotSize;
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

// overwrite srpg core stuff for better compatiblety
   
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
      var srpgTeam = this._battler.srpgTeam();
      this.changeTextColor(this.textColor(13));
      this.drawText('Team:', 290, lineHeight * 0);
      this.resetTextColor();
      this.drawText(srpgTeam + ' ', 360, lineHeight * 0);
      this.drawActorName(this._battler, 12, lineHeight * 0);
      this.drawEnemyFace(this._battler, 4, lineHeight * 1);
      this.drawEnemyClass(this._battler, 12, lineHeight * 5);
      this.drawBasicInfoEnemy(4, lineHeight * 6);
      this.drawParameters(156, lineHeight * 1);
      this.drawSrpgParameters(156, lineHeight * 4); 
      var equips = this._battler._equips;
      // only 5 slots are used by default
      // slot 0 check if weapon or shield assume weapon
      if (equips[0] && (equips[0]._itemId === 0)) {
          if (this._battler.enemy().meta.srpgSlot0Type === "armor") {
              if (_drawText === 'true' && this._battler._equipIsGone[0] === false) {
                  this.drawText(_textNoShield, 240, lineHeight * 5);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Shield Stolen>', 230, lineHeight * 5);
                  this.resetTextColor();
              };
          } else {
              if (_drawText === 'true' && this._battler._equipIsGone[0] === false) {
                  this.drawText(_textNoWeapon, 240, lineHeight * 5);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Weapon Stolen>', 230, lineHeight * 5);
                  this.resetTextColor();
              };
          }           
      } else { //if slot has equip,display equip
               this.drawItemName(equips[0].object(), 200, lineHeight * 5 ); 
      };
      //slot 1 check if weapon or shield,assume shield
      if (equips[1] && (equips[1]._itemId === 0)) {
          if (this._battler.enemy().meta.srpgSlot1Type === "weapon") {
              if (_drawText === 'true' && this._battler._equipIsGone[1] === false) {
                  this.drawText(_textNoWeapon, 240, lineHeight * 6);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Weapon Stolen>', 230, lineHeight * 6);
                  this.resetTextColor();
              }
          } else {
              if (_drawText === 'true' && this._battler._equipIsGone[1] === false) {
                  this.drawText(_textNoShield, 240, lineHeight * 6); 
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Shield Stolen>', 230, lineHeight * 6);
                  this.resetTextColor();
              }
          }           
      } else { //if slot has equip,display equip
               this.drawItemName(equips[1].object(), 200, lineHeight * 6 ); 
      };
      //slot 2 assume Head
      if (equips[2] && (equips[2]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[2] === false) {
              this.drawText(_textNoHead, 240, lineHeight * 7);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Head Stolen>', 230, lineHeight * 7);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[2].object(), 200, lineHeight * 7 ); 
      };  
      //slot 3 assume Body
      if (equips[3] && (equips[3]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[3] === false) {
              this.drawText(_textNoBody, 240, lineHeight * 8);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Body Stolen>', 230, lineHeight * 8);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[3].object(), 200, lineHeight * 8 ); 
      };
      //slot 4 assume Accessory
      if (equips[4] && (equips[4]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[4] === false) {
              this.drawText(_textNoAccessory, 240, lineHeight * 9);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Body Stolen>', 230, lineHeight * 9);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[4].object(), 200, lineHeight * 9 ); 
      };
};
	
// related to the function above "this.drawBasicInfoEnemy"
Window_SrpgStatus.prototype.drawBasicInfoEnemy = function(x, y) {
      var lineHeight = this.lineHeight();
      this.drawEnemyExpRate(this._battler, x, y + lineHeight * 1);
      this.drawEnemyLevel(this._battler, x, y + lineHeight * 1);
      this.drawActorIcons(this._battler, x, y + lineHeight * 0);
      this.drawActorHp(this._battler, x, y + lineHeight * 2);
      if ($dataSystem.optDisplayTp) {
          this.drawActorMp(this._battler, x, y + lineHeight * 3, 90);
          this.drawActorTp(this._battler, x + 96, y + lineHeight * 3, 90);
      } else {
          this.drawActorMp(this._battler, x, y + lineHeight * 3);  
      };
};
// Status Window Width
Window_SrpgStatus.prototype.windowWidth = function() {
      return Graphics.boxWidth / 2;
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
      var srpgTeam = this._battler.srpgTeam();
      this.drawText(this._battler._nickname, 150, lineHeight * 0);
      this.changeTextColor(this.textColor(13));
      this.drawText('Team:', 290, lineHeight * 0);
      this.resetTextColor();
      this.drawText(srpgTeam + ' ', 360, lineHeight * 0);
      this.drawActorName(this._battler, 12, lineHeight * 0);
      this.drawActorFace(this._battler, 4, lineHeight * 1);
      this.drawActorClass(this._battler, 12, lineHeight * 5);
      this.drawBasicInfoActor(4, lineHeight * 6);
      this.drawParameters(156, lineHeight * 1);
      this.drawSrpgParameters(156, lineHeight * 4);
      var equips = this._battler._equips;
      // only 5 slots are used by default
      // slot 0 check if weapon or shield assume weapon
      if (equips[0] && (equips[0]._itemId === 0)) {
          if (this._battler.enemy().meta.srpgSlot0Type === "armor") {
              if (_drawText === 'true' && this._battler._equipIsGone[0] === false) {
                  this.drawText(_textNoShield, 240, lineHeight * 5);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Shield Stolen>', 230, lineHeight * 5);
                  this.resetTextColor();
              };
          } else {
              if (_drawText === 'true' && this._battler._equipIsGone[0] === false) {
                  this.drawText(_textNoWeapon, 240, lineHeight * 5);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Weapon Stolen>', 230, lineHeight * 5);
                  this.resetTextColor();
              };
          }           
      } else { //if slot has equip,display equip
               this.drawItemName(equips[0].object(), 200, lineHeight * 5 ); 
      };
      //slot 1 check if weapon or shield,assume shield
      if (equips[1] && (equips[1]._itemId === 0)) {
          if (this._battler.enemy().meta.srpgSlot1Type === "weapon") {
              if (_drawText === 'true' && this._battler._equipIsGone[1] === false) {
                  this.drawText(_textNoWeapon, 240, lineHeight * 6);
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Weapon Stolen>', 230, lineHeight * 6);
                  this.resetTextColor();
              }
          } else {
              if (_drawText === 'true' && this._battler._equipIsGone[1] === false) {
                  this.drawText(_textNoShield, 240, lineHeight * 6); 
              } else {
                  this.changeTextColor(this.textColor(10));
                  this.drawText('<Shield Stolen>', 230, lineHeight * 6);
                  this.resetTextColor();
              }
          }           
      } else { //if slot has equip,display equip
               this.drawItemName(equips[1].object(), 200, lineHeight * 6 ); 
      };
      //slot 2 assume Head
      if (equips[2] && (equips[2]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[2] === false) {
              this.drawText(_textNoHead, 240, lineHeight * 7);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Head Stolen>', 230, lineHeight * 7);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[2].object(), 200, lineHeight * 7 ); 
      };  
      //slot 3 assume Body
      if (equips[3] && (equips[3]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[3] === false) {
              this.drawText(_textNoBody, 240, lineHeight * 8);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Body Stolen>', 230, lineHeight * 8);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[3].object(), 200, lineHeight * 8 ); 
      };
      //slot 4 assume Accessory
      if (equips[4] && (equips[4]._itemId === 0)) {
          if (_drawText === 'true' && this._battler._equipIsGone[4] === false) {
              this.drawText(_textNoAccessory, 240, lineHeight * 9);
          } else {
              this.changeTextColor(this.textColor(10));
              this.drawText('<Body Stolen>', 230, lineHeight * 9);
              this.resetTextColor();
          }
      } else { //if slot has equip,display equip
               this.drawItemName(equips[4].object(), 200, lineHeight * 9 ); 
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
      };
};

// Setup for Skills:
//-----------------------

//this.srpgStealExpText(finalAmount);
Game_Action.prototype.srpgStealExpText = function(finalAmount) {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add(finalAmount + "Exp stolen! \\|\\^");
};

//this.srpgStealGoldText(finalAmount);
Game_Action.prototype.srpgStealGoldText = function(finalAmount) {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add(finalAmount + "Gold stolen! \\|\\^");
};

//this.srpgStealProtectedText(itemName, msgIconID, eName);
Game_Action.prototype.srpgStealProtectedText = function(itemName, msgIconID, eName) {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add(eName + "'s \\i["+ msgIconID +"]"+ itemName +" has Steal Protection!\\|\\^");
};
	
//this.srpgBreakProtectedText(itemName, msgIconID, eName);
Game_Action.prototype.srpgBreakProtectedText = function(itemName, msgIconID, eName) {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add(eName + "'s \\i["+ msgIconID +"]"+ itemName +" has Break Protection!\\|\\^");
};
	
//this.nothingToSteal();
Game_Action.prototype.nothingToSteal = function() {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add("There is Nothing to Steal \\|\\^");
};
	
//this.srpgBreakFailedText();
Game_Action.prototype.srpgBreakFailedText = function() {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add("Failed to Break \\|\\^");
};
	
//this.srpgStealFailedText();
Game_Action.prototype.srpgStealFailedText = function() {
    $gameMessage.setBackground(1);$gameMessage.setPositionType(2);
    $gameMessage.add("Failed to Steal \\|\\^");
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
// get id of active unit
Game_Action.prototype.setUserEventId = function() {
    this._userEventID = $gameTemp.activeEvent().eventId();
    return this._userEventID;
};
// get id of target
Game_Action.prototype.setTargetEventId = function() {
    this._targetEventID = $gameTemp.targetEvent().eventId();
    return this._targetEventID;
};

// handle => steal gold & steal exp
Game_Action.prototype.stealRandom = function(random, amount, type) {
    // check stealchance before anything else,..
    if (this.item().meta.srpgSkillStealChance) {
        _stealChance = this.item().meta.srpgSkillStealChance;
    }   
    // stealChanceRoll var that represents the chance you rolled.
    var stealChanceRoll = Math.floor(Math.random() * 100) + 1; 
    //_stealChance is the PluginVar that stores % chance 
    if (stealChanceRoll > _stealChance) {		     
        return false;
    }; 
    // get data  recommended numbers for "amount" are => 99 or 111 or 123
    var activeBattler = $gameSystem.EventToUnit(this._userEventID);
    var targetBattler = $gameSystem.EventToUnit(this._targetEventID);
    var activeLevel = Number(activeBattler[1]._level);
    var targetLevel = Number(targetBattler[1]._level);
    var finalAmount = Number(amount); 
    var randomAmount = Number(amount); 
    // return false if target has not enough amount
    if (type === "gold" && targetBattler[1] === 'actor' && ($gameParty.gold < finalAmount)) {
        finalAmount = Number($gameParty.gold);this.srpgStealGoldText(finalAmount);
        $gameParty.gainGold(-finalAmount);return true; 
    };
    if (type === "exp" && (targetBattler[1]._exp < finalAmount)) {
        finalAmount = Number(targetBattler[1]._exp);this.srpgStealExpText(finalAmount);
        targetBattler[1].gainExp(-finalAmount);return true; 
    }; 
    // prepare variables
    if (random === "true") {randomAmount = Math.round(Math.floor(Math.random() * finalAmount + finalAmount / 2))};  
    if (activeLevel > targetLevel) var activeStrong = activeLevel - targetLevel;
    if (activeLevel < targetLevel) var targetStrong = targetLevel - activeLevel;
    if (activeStrong) finalAmount = Math.round((randomAmount / (activeLevel + 1)) * targetLevel); 
    if (targetStrong) finalAmount = Math.round((randomAmount / (activeLevel - 1)) * targetLevel);
    // execute change 
    if (activeBattler[0] === 'actor') { 
        if (type === "gold") $gameParty.gainGold(finalAmount);
        if (type === "exp") activeBattler[1].gainExp(finalAmount);
    };   
    if (activeBattler[0] === 'enemy') { 
        if (type === "exp") activeBattler[1].gainExp(finalAmount);
    }; 
    if (targetBattler[0] === 'actor') { 
        if (type === "gold") $gameParty.gainGold(-finalAmount);
        if (type === "exp") targetBattler[1].gainExp(-finalAmount);
    };   
    if (targetBattler[0] === 'enemy') {  
        if (type === "exp") targetBattler[1].gainExp(-finalAmount);
    }; 
    // blabla results display Text
    if (type === "gold") this.srpgStealGoldText(finalAmount);
    if (type === "exp") this.srpgStealExpText(finalAmount);
return true;        
};


// Add UnitCore Skill Setup to Game Action apply (add Skill NoteTag Setup)
var _SRPG_Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _SRPG_Game_Action_apply.call(this, target);
    if ($gameSystem.isSRPGMode() == true) {
        // add stuff to Game action if Break/Steal Meta & Hit
        var result = target.result();	    
        this._userEventID = 0;
        this._targetEventID = 0;
        this.setUserEventId();
        this.setTargetEventId(); 
        if (this.item().meta.srpgBreak && result.isHit()) {
	    if (this.item().meta.srpgBreak === "item" || this.item().meta.srpgBreak === "allItems") {
                this.checkChance("break", "item", null, null, null);
	    }
	    if (this.item().meta.srpgBreak === "weapon" || this.item().meta.srpgBreak === "allWeapons") {		    
	        this.checkChance("break", "weapon", null, null, null);
	    }		    
	    if (this.item().meta.srpgBreak === "armor" || this.item().meta.srpgBreak === "allArmors") {		    
	        this.checkChance("break", "armor", null, null, null);	
	    }		    
        }
        if (this.item().meta.srpgItemBreak && result.isHit()) {
	    var iName = this.item().meta.srpgItemBreak;	
            this.checkChance("break", "item", iName, null, null);
        }
        if (this.item().meta.srpgTypeBreakWeapon && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeBreakWeapon);
            if (this.item().meta.srpgTypeBreakWeapon === "allTypes") { 
                usedType = this.item().meta.srpgTypeBreakWeapon};
            this.checkChance("break", "weapon", null, usedType, null);           
        }
        if (this.item().meta.srpgTypeBreakArmor && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeBreakArmor);
            if (this.item().meta.srpgTypeBreakArmor === "allTypes") { 
                usedType = this.item().meta.srpgTypeBreakArmor};		
            this.checkChance("break", "armor", null, usedType, null);            
        }
        if (this.item().meta.srpgTypeBreakEquip && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeBreakEquip);	
            if (this.item().meta.srpgTypeBreakEquip === "allTypes") { 
                usedType = this.item().meta.srpgTypeBreakEquip};	
            this.checkChance("break", "equip", null, usedType, null);            
        }	    
        if (this.item().meta.srpgSlotBreakEquip && result.isHit()) {
	    var usedSlot = Number(this.item().meta.srpgSlotBreakEquip);
            if (this.item().meta.srpgSlotBreakEquip === "allSlots" || "nextSlot") {
                usedSlot = this.item().meta.srpgSlotBreakEquip};	
            this.checkChance("break", null, null, null, usedSlot);            
        }
        if (this.item().meta.srpgSlotBreakItem && result.isHit()) {
	    var usedSlot = Number(this.item().meta.srpgSlotBreakItem);
            if (this.item().meta.srpgSlotBreakItem === "allSlots" || "nextSlot") { 
                usedSlot = this.item().meta.srpgSlotBreakItem};	
            this.checkChance("break", "item", null, null, usedSlot);            
        }
        if (this.item().meta.srpgSteal && result.isHit()) {
	    if (this.item().meta.srpgSteal === "item" || this.item().meta.srpgSteal === "allItems") {
                this.checkChance("steal", "item", null, null, null);
	    }		
	    if (this.item().meta.srpgSteal === "weapon" || this.item().meta.srpgSteal === "allWeapons") {
                this.checkChance("steal", "weapon", null, null, null);
	    }
	    if (this.item().meta.srpgSteal === "armor" || this.item().meta.srpgSteal === "allArmors") {
                this.checkChance("steal", "armor", null, null, null);
	    }    	
        }
        if (this.item().meta.srpgItemSteal && result.isHit()) {
	    var iName = this.item().meta.srpgItemSteal;		
            this.checkChance("steal", "item", iName, null, null);             
        }
        if (this.item().meta.srpgTypeStealWeapon && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeStealWeapon);
            if (this.item().meta.srpgTypeStealWeapon === "allTypes") { 
                usedType = this.item().meta.srpgTypeStealWeapon};		
            this.checkChance("steal", "weapon", null, usedType, null);             
        }
        if (this.item().meta.srpgTypeStealArmor && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeStealArmor);
            if (this.item().meta.srpgTypeStealArmor === "allTypes") { 
                usedType = this.item().meta.srpgTypeStealArmor};		
            this.checkChance("steal", "armor", null, usedType, null);             
        }
        if (this.item().meta.srpgTypeStealEquip && result.isHit()) {
	    var usedType = Number(this.item().meta.srpgTypeStealEquip);	
            if (this.item().meta.srpgTypeStealEquip === "allTypes") { 
                usedType = this.item().meta.srpgTypeStealEquip};		
            this.checkChance("steal", "equip", null, usedType, null);             
        }	    
        if (this.item().meta.srpgSlotStealEquip && result.isHit()) {
	    var usedSlot = Number(this.item().meta.srpgSlotStealEquip);	
            if (this.item().meta.srpgSlotStealEquip === "allSlots" || "nextSlot") { 
                usedSlot = this.item().meta.srpgSlotStealEquip};		
            this.checkChance("steal", null, null, null, usedSlot);             
        }
        if (this.item().meta.srpgSlotStealItem && result.isHit()) {
	    var usedSlot = Number(this.item().meta.srpgSlotStealItem);
            if (this.item().meta.srpgSlotStealItem === "allSlots" || "nextSlot") { 
                usedSlot = this.item().meta.srpgSlotStealItem};			
            this.checkChance("steal", "item", null, null, usedSlot);             
        }	
        if (this.item().meta.srpgGoldStealAmount && result.isHit()) {
            var amount = Number(this.item().meta.srpgGoldStealAmount);
            this.stealRandom("false", amount, "gold");
        }
        if (this.item().meta.srpgGoldStealRandom && result.isHit()) {
            var amount = Number(this.item().meta.srpgGoldStealRandom);
            this.stealRandom("true", amount, "gold");
        }
        if (this.item().meta.srpgExpStealAmount && result.isHit()) {
            var amount = Number(this.item().meta.srpgExpStealAmount);
            this.stealRandom("false", amount, "exp");
        }
        if (this.item().meta.srpgExpStealRandom && result.isHit()) {
            var amount = Number(this.item().meta.srpgExpStealRandom);
            this.stealRandom("true", amount, "exp");
        }   
    }
};

// check skill chance for break & steal skills, if true process skills
Game_Action.prototype.checkChance = function(skillType, metaType, iName, typeID, slotID) {
    if (skillType === "break") {
        var broken = false;
        if (this.item().meta.srpgSkillBreakChance) {
            _breakChance = this.item().meta.srpgSkillBreakChance;
        } 	
        // breakChanceRoll var that represents the chance you rolled.
        var breakChanceRoll = Math.floor(Math.random() * 100) + 1; 
        //_breakChance is the PluginVar that stores % chance 
        if (breakChanceRoll <= _breakChance) {		     
            broken = true;
        }; 	
        if (broken === true) {
	    this.unitCoreSkill(skillType, metaType, iName, typeID, slotID);
        } else {
	    this.srpgBreakFailedText();
        };
    }
    if (skillType === "steal") {
        var stolen = false;
        if (this.item().meta.srpgSkillStealChance) {
            _stealChance = this.item().meta.srpgSkillStealChance;
        }   
        // stealChanceRoll var that represents the chance you rolled.
        var stealChanceRoll = Math.floor(Math.random() * 100) + 1; 
        //_stealChance is the PluginVar that stores % chance 
        if (stealChanceRoll <= _stealChance) {		     
            stolen = true;
        }; 	
        if (stolen === true) {
	    this.unitCoreSkill(skillType, metaType, iName, typeID, slotID);
	} else {
	    this.srpgStealFailedText();	
        };
    }	
};	

// console.log(skillType, metaType, itemName, typeID, slotID);console.log(targetSlots[i]);
// process all Steal & Break Skills related to their NoteTags	
Game_Action.prototype.unitCoreSkill = function(skillType, metaType, iName, typeID, slotID) {
    var activeBattleUnit = $gameSystem.EventToUnit(this._userEventID);
    var targetBattleUnit = $gameSystem.EventToUnit(this._targetEventID);	
    var skillDone = false;
    var allSkills = false;
    var dataName = iName;
    var dataTypeID  = typeID;
    var dataSlot  = slotID;
    var itemMeta = this.item().meta;
    if (itemMeta.srpgBreak === "allItems" || itemMeta.srpgSteal === "allItems") allSkills = true;
    if (itemMeta.srpgBreak === "allWeapons" || itemMeta.srpgSteal === "allWeapons") allSkills = true;
    if (itemMeta.srpgBreak === "allArmors" || itemMeta.srpgSteal === "allArmors") allSkills = true;
    if (iName === "allNames") allSkills = true;
    if (typeID === "allTypes") allSkills = true;
    if (slotID === "allSlots") allSkills = true;
    if (metaType === "item") {
        var targetSlots = targetBattleUnit[1]._itemSlots;
    } else {var targetSlots = targetBattleUnit[1]._equips};	    
    for (var i = 0; i < targetSlots.length; i++) {
	 if ((targetSlots[i]._itemId > 0) && (skillDone === false)) {
              if (dataName === "allNames") var iName = targetSlots[i].object().name;
              if (dataTypeID === "allTypes" && metaType === "weapon") var typeID = targetSlots[i].object().wtypeId;
              if (dataTypeID === "allTypes" && metaType === "armor") var typeID = targetSlots[i].object().atypeId;
              if (dataTypeID === "allTypes" && metaType === "equip") var typeID = targetSlots[i].object().etypeId;
              if (dataSlot === "allSlots") var slotID = i; // this is triggered with "allSkills = true"-mode
              if (dataSlot === "nextSlot") var slotID = i; // this is triggered with "allSkills = false"-mode
              var breakProtection = false;
              var stealProtection = false;
	      var skillProcess = false;
	      // process -> metaType "srpgBreak" & "srpgSteal" 
	      if ((iName === null) && (typeID === null) && (slotID === null)) {
        	   var skillProcess = true;
	      }	 
	      // process -> iName => "srpgItem"
	      if ((iName !== null) && (iName === targetSlots[i].object().name)) {
                   var skillProcess = true;
	      }		 
	      // process -> typeID => "srpgType"
	      if ((typeID !== null) && (typeID > 0)) { 		 
 	         // => WEAPON    
	         if ((metaType === "weapon") && (typeID === targetSlots[i].object().wtypeId)) { 
		      var skillProcess = true;  
	         }  
	         // => ARMOR 
                 if ((metaType === "armor") && (typeID === targetSlots[i].object().atypeId)) {	
	              var skillProcess = true;  
	         }			  
	         // => EQUIP
                 if ((metaType === "equip") && (typeID === targetSlots[i].object().etypeId)) {	
		      if (targetSlots[i]._itemId > 0) var skillProcess = true;  
                 }		
	      };
	      // process -> slotID => "srpgSlot."
	      if ((slotID !== null) && (targetSlots[slotID] === targetSlots[i])) {
                   var skillProcess = true;
	      };
              // check Skill Protection
	      if (skillProcess === true && skillDone === false) {
		  var dataItem = targetSlots[i].object();var itemName = dataItem.name;
		  var msgIconID = dataItem.iconIndex;var eName = targetBattleUnit[1].name();    
		  if ((skillType === "break") && (targetSlots[i].object().breakProtection === false)) { 
		       skillDone = true;
		  };
		  if ((skillType === "break") && (targetSlots[i].object().breakProtection === true)) { 
		       breakProtection = true;this.srpgBreakProtectedText(itemName, msgIconID, eName);
		  };	
	          if ((skillType === "steal") && (targetSlots[i].object().stealProtection === false)) {
		       skillDone = true;			 
		  };
	          if ((skillType === "steal") && (targetSlots[i].object().stealProtection === true)) {
		       stealProtection = true;this.srpgStealProtectedText(itemName, msgIconID, eName);
		  };		     
	      };	 
	      // remove Slot data	 
              if (skillProcess === true && skillDone === true) {
	          if (targetSlots === targetBattleUnit[1]._itemSlots) {
		      if (targetBattleUnit[0] === 'enemy') {
			  targetSlots[i]._dataClass = "";targetSlots[i]._itemId = 0;     
		      };
		      if (targetBattleUnit[0] === 'actor') {
			  targetBattleUnit[1].clearItemSlot(targetSlots[i], 1);   
		      };			 
		  };
	          if (targetSlots === targetBattleUnit[1]._equips) {
		      targetBattleUnit[1]._equipIsGone[i] = true;
		      targetSlots[i]._dataClass = "";targetSlots[i]._itemId = 0; 		     
		  };		     
	      };
              if (allSkills === true && skillDone === true) {
                  if ((skillType === "break") && (breakProtection === false)) {
                      this.breakResult(itemName, msgIconID, eName);
                  };
                  if ((skillType === "steal") && (stealProtection === false)) {
                      if (activeBattleUnit[1].srpgTeam() === _actorTeam) {		
                          $gameParty.gainItem(dataItem, 1);
	              };
                      this.stealResult(itemName, msgIconID, eName);
                  };
              };
              if (allSkills === true) skillDone = false;		 
	 };
    };  
    // end of breakSkill	    
    if (skillType === "break") {
        if (skillDone === false && breakProtection === false) {this.nothingToBreak()};	    
        if (skillDone === true && breakProtection === false)  {
            this.breakResult(itemName, msgIconID, eName);
        }
    }

    // end of stealSkill.. + Setup when "gainItem" triggers
    // ..alternative replace "(activeBattleUnit[1].srpgTeam() === _actorTeam)" ...
    // ..with=> "(activeBattleUnit[0] === "actor" || activeBattleUnit[1].srpgTeam() === _actorTeam)"	
    
    if (skillType === "steal") {
        if (skillDone === false && stealProtection === false) {this.nothingToSteal()};	    
        if (skillDone === true && stealProtection === false)  {
            if (activeBattleUnit[1].srpgTeam() === _actorTeam) { // <---alternative replace here		
                $gameParty.gainItem(dataItem, 1);
	    };
            this.stealResult(itemName, msgIconID, eName);
        }
    }   
};	
	
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------	
// menu
  
 var _srpg_AI_ActorItemSlots_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
     if (this._commandWindow.currentSymbol() === 'ActorItems') {
	 SceneManager.push(Scene_ActorItemSlots);
	 return;
     };
     _srpg_AI_ActorItemSlots_onPersonalOk.call(this);
};  
  
  var _srpg_AI_ActorItemSlots_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
      _srpg_AI_ActorItemSlots_addOriginalCommands.call(this);
      var enabled = _enable_ItemSlotsCommand;
      this.addCommand(_srpg_menuCommand, 'ActorItems'    , enabled);
};
	
 var _srpg_AI_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
     _srpg_AI_Scene_Menu_createCommandWindow.call(this);
     this._commandWindow.setHandler('ActorItems',     this.commandPersonal.bind(this));
};
  
//------------------------------Window_ActorSlot
//------------------------------
// Window_MenuChar

function Window_MenuChar() {
    this.initialize.apply(this, arguments);
}

Window_MenuChar.prototype = Object.create(Window_Base.prototype);
Window_MenuChar.prototype.constructor = Window_MenuChar;

Window_MenuChar.prototype.initialize = function(x, y, width, height) {
      this._actor = $gameParty.menuActor();
      var width = this.windowWidth();
      var height = this.windowHeight();
      var x = 150;
      var y = 195;
      this._x = x;
      this._y = y;
      this._updateCounter = 0;
      this._step = 0;
      this._characterName = this._actor.characterName;
      this._characterIndex = this._actor.characterIndex;
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      if (_srpg_Controll_MenuChar_Img == 'true') {
          this.drawAnimatedActor(this._actor,x - 70,y - 54,'walk');
      } else {this.drawActorCharacter(this._actor, this._x - 112, this._y - 140)};
};

//--
 if (_srpg_Controll_MenuChar_Img !== 'true') {
      Window_MenuChar.prototype.update = function() {
            this._updateCounter += 1;
            if (this._updateCounter >= 25) {
	       this._step += 1;
	       if (this._step === 3) {this._step = -1}; 
               this.refresh();
               this._updateCounter = 0;	   
            }
      };
      Window_MenuChar.prototype.refresh = function() {
            if (this.contents) {
                this.contents.clear();
                this.drawActorCharacter(this._actor, this._x - 112, this._y - 140);
            }
      };
 }; // close if condition about "_srpg_Controll_MenuChar_Img"
//--

Window_MenuChar.prototype.windowWidth = function() {
      return 150;
};

Window_MenuChar.prototype.windowHeight = function() {
      return 155;
};

Window_MenuChar.prototype.drawActorCharacter = function(actor, x, y) { 
      if (this._step === 2) {var step = 0} else {var step = this._step};
      this.drawStepCharacter(actor.characterName(), actor.characterIndex(), x, y, step);
};
	
Window_MenuChar.prototype.drawStepCharacter = function(characterName, characterIndex, x, y, step) {
      var bitmap = ImageManager.loadCharacter(characterName);
      var big = ImageManager.isBigCharacter(characterName);
      var pw = bitmap.width / (big ? 3 : 12);
      var ph = bitmap.height / (big ? 4 : 8);
      var n = characterIndex;
      var sx = (step * 48) + ((n % 4 * 3 + 1) * pw);
      var sy = (Math.floor(n / 4) * 4) * ph;
      var dw = 2 * pw;
      var sh = 2 * ph;
      this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph, dw, sh);
};

//-----------------------------------------------------------------------------
// Window_ActorItemSlotCommand

function Window_ActorItemSlotCommand() {
    this.initialize.apply(this, arguments);
}

Window_ActorItemSlotCommand.prototype = Object.create(Window_Command.prototype);
Window_ActorItemSlotCommand.prototype.constructor = Window_ActorItemSlotCommand;

Window_ActorItemSlotCommand.prototype.initialize = function(x, y) {
      var width = this.windowWidth();
      var height = this.windowHeight();
      var x = 0;
      var y = 195;
      Window_Command.prototype.initialize.call(this, x, y);
};

Window_ActorItemSlotCommand.prototype.windowWidth = function() {
      var data = 150;
      return data;
};
	
Window_ActorItemSlotCommand.prototype.windowHeight = function() {
      var data = 155;
      return data;
};

Window_ActorItemSlotCommand.prototype.maxCols = function() {
    return 1;
};

Window_ActorItemSlotCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_ActorItemSlotCommand.prototype.makeCommandList = function() {
      this.addCommand(_srpg_txtAddItem,   'addItem');
      this.addCommand(_srpg_txtRemoveItem,  'clearItem');
      this.addCommand(_srpg_txtReset,   'reset');
};

//-----------------------------------------------------------------------------
// Window_MenuActorItemSlot

function Window_MenuActorItemSlot() {
    this.initialize.apply(this, arguments);
}

Window_MenuActorItemSlot.prototype = Object.create(Window_Selectable.prototype);
Window_MenuActorItemSlot.prototype.constructor = Window_MenuActorItemSlot;

Window_MenuActorItemSlot.prototype.initialize = function(x, y) {
      var height = this.fittingHeight(_srpg_actorItemSlotSize);
      var width =  Graphics.boxWidth / 2;
      var x = 0;
      var y = 350;
      Window_Selectable.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
      this.refresh();
};

Window_MenuActorItemSlot.prototype.maxCols = function() {
      return 1;
};

Window_MenuActorItemSlot.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
          this._actor = actor;
          this.refresh();
      }
};

Window_MenuActorItemSlot.prototype.update = function() {
      Window_Selectable.prototype.update.call(this);
      if (this._itemWindow) {
          this._itemWindow.setSlotId(this.index());
      }
};

Window_MenuActorItemSlot.prototype.maxItems = function() {
      if (this._actor) {return this._actor._itemSlots.length} else {return 0};
};

Window_MenuActorItemSlot.prototype.item = function() {
      if (this._actor._itemSlots[this.index()]) {
          return this._actor._itemSlots[this.index()].object();
      } else {
          return null;
      };
      if (!this._actor) return null;
};

Window_MenuActorItemSlot.prototype.drawItemNumber = function(item, x, y, width, index) {
      var itemSlot = this._actor._itemSlots[index];
      var txt = itemSlot.amount + "/" + item.stackSize;
      this.drawText(txt, x, y, width, 'right');
};

Window_MenuActorItemSlot.prototype.drawItem = function(index) {
      if (this._actor) {
          var rect = this.itemRectForText(index);
          this.changePaintOpacity(this.isEnabled(index));
	  if (this._actor._itemSlots[index].itemId() > 0) {
	      var item = this._actor._itemSlots[index].object();
	      this.drawItemName(item, rect.x, rect.y, rect.width);
	      this.drawItemNumber(item, rect.x, rect.y, rect.width, index);
	  } else {
	      this.drawText(_srpg_emptySlot, rect.x, rect.y, rect.width);
	  };
      }
};

Window_MenuActorItemSlot.prototype.isEnabled = function(index) {
      return true;
};

Window_MenuActorItemSlot.prototype.isCurrentItemEnabled = function() {
      return this.isEnabled(this.index());
};

Window_MenuActorItemSlot.prototype.setItemWindow = function(itemWindow) {
      this._itemWindow = itemWindow;
      this.update();
};

Window_MenuActorItemSlot.prototype.updateHelp = function() {
      Window_Selectable.prototype.updateHelp.call(this);
      this.setHelpWindowItem(this.item());
      if (this._statusWindow) {
          this._statusWindow.setTempActor(null);
      }
};
	
//-----------------------------------------------------------------------------
// Window_changeItemAmount

function Window_changeItemAmount() {
    this.initialize.apply(this, arguments);
}

Window_changeItemAmount.prototype = Object.create(Window_ShopNumber.prototype);
Window_changeItemAmount.prototype.constructor = Window_changeItemAmount;

Window_changeItemAmount.prototype.initialize = function(x, y, width, height) {
      var x = Graphics.boxWidth / 2;
      var y = 108;
      var width = Graphics.boxWidth / 2;
      var height = 130;
      Window_Selectable.prototype.initialize.call(this, x, y, width, height);
      this._item = null;
      this._max = 1;
      this._number = 1;
      this.createButtons();
};

Window_changeItemAmount.prototype.setup = function(item, max, msg) {
      this._msg = msg;
      this._item = item;
      this._max = Math.floor(max);
      this._number = 1;
      this.placeButtons();
      this.updateButtonsVisiblity();
      this.refresh();
};

Window_changeItemAmount.prototype.refresh = function(x, y, width, height) {
      this.contents.clear();
      this.changeTextColor(this.systemColor());
      this.drawText(this._msg,0,0,this.contents.width,'center');
      this.resetTextColor();
      this.drawItemName(this._item, 0, this.itemY());
      this.drawMultiplicationSign();
      this.drawNumber();
};

Window_changeItemAmount.prototype.itemY = function() {
      return this.lineHeight(1) + 15;  
};

//-----------------------------------------------------------------------------
// Window_PartyItemStorage

function Window_PartyItemStorage() {
    this.initialize.apply(this, arguments);
}

Window_PartyItemStorage.prototype = Object.create(Window_EquipItem.prototype);
Window_PartyItemStorage.prototype.constructor = Window_PartyItemStorage;

Window_PartyItemStorage.prototype.initialize = function(x, y) {
      var width = this.windowWidth();
      var height = this.windowHeight();
      var x = Graphics.boxWidth / 2;
      var y = 350;
      Window_ItemList.prototype.initialize.call(this, x, y, width, height);
      this._actor = $gameParty.menuActor(); 
      this._slotID = 0;
      this.refresh();
};

Window_PartyItemStorage.prototype.windowWidth = function() {
      var data = Graphics.boxWidth / 2;
      return data;
};
	
Window_PartyItemStorage.prototype.windowHeight = function() {
      var data = this.fittingHeight(_srpg_actorItemSlotSize);
      return data;
};

Window_PartyItemStorage.prototype.includes = function(item) {
      if (!item) {return false};
      if (item) {return DataManager.isItem(item)};
};

Window_PartyItemStorage.prototype.maxCols = function() {
      return 1;
};

Window_PartyItemStorage.prototype.isEnabled = function(item) {
      if (!item) {return false};
      if (item && $gameSystem.isSRPGMode() == true && !$dataItems[item.id].meta.noActorItemSlot) return true;
      if (item && !$dataItems[item.id].meta.noActorItemSlot) {
          var actor = this._actor;
          return actor && actor.canUse(item);
      }
};

//---------------------------------------------------------------------------
// Window_ItemList (overwrite)

  var _srpg_AI_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
      if ($gameSystem.isSRPGMode() == true && SceneManager._scene instanceof Scene_Map === true) {
	  this._data = [];
          var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
          // set Object from item to the ItemList
	  for (var i = 0; i < actor._itemSlots.length; i++) {
               this._data[i] = actor._itemSlots[i].object();
	  };
      } else {
          _srpg_AI_makeItemList.call(this);
          // yep ItemCore compatiblety script
          if (SceneManager._scene instanceof Scene_Item && (_srpg_Yep_ItemCore === 'true')) this.listEquippedItems();
      };
};

  var _srpg_AI_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
      if ($gameSystem.isSRPGMode() == true) {
	  this._dummyIndex = index;
          _srpg_AI_drawItem.call(this, index)
      } else {_srpg_AI_drawItem.call(this, index)};
};

  var _srpg_AI_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
      if ($gameSystem.isSRPGMode() == true  && SceneManager._scene instanceof Scene_Map === true) {
	  var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
	  var itemSlot = actor._itemSlots[this._dummyIndex];
	  var txt = itemSlot.amount + "/" + item.stackSize;
	  this.drawText(txt, x, y, width, 'right');
      } else {_srpg_AI_drawItemNumber.call(this, item, x, y, width)};
};

  var _srpg_AI_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
      if ($gameSystem.isSRPGMode() == true  && SceneManager._scene instanceof Scene_Map === true) {
          var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
          return actor && actor.canUse(item);
      } else {
         // yep ItemCore compatiblety script
         if (SceneManager._scene instanceof Scene_Item && (_srpg_Yep_ItemCore === 'true')) return true;
         return _srpg_AI_isEnabled.call(this, item);
      };
};

  var _srpg_AI_maxCols = Window_ItemList.prototype.maxCols;   
Window_ItemList.prototype.maxCols = function() {
      if ($gameSystem.isSRPGMode() == true  && SceneManager._scene instanceof Scene_Map === true) {
          return 1;
      } else {return _srpg_AI_maxCols.call(this)};
};

//------------------------------
// Overwrite & hide the actorCommandWindow when ItemWindow is used

  var _srpg_AI_processOk = Window_ActorCommand.prototype.processOk;
Window_ActorCommand.prototype.processOk = function() {
      _srpg_AI_processOk.call(this);
      if (this.currentSymbol() === 'item') {this.visible = false};
};

Window_BattleItem.prototype.includes = function(item) {
      if (!item) {return false}; 
      if (item) { 
          var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
          return actor && actor.canUse(item);
      }
};

// disable the "Gameparty has item check"
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return this.meetsUsableItemConditions(item) && true; 
};

//---------------------------------------------------------------------------
// scene Map add stuff & overwrite

Scene_Map.prototype.createItemWindow = function() {
         var width = 400;
         var height = _srpg_actorItemSlotSize * 45;
         var x = (Graphics.boxWidth - width) / 2;
         var y = (0 + this._helpWindow.height) + 20;
         this._itemWindow = new Window_BattleItem(x, y, width, height);
         this._itemWindow.setHelpWindow(this._helpWindow);
         this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
         this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
         this.addWindow(this._itemWindow);
};

 var _srpg_AI_onItemCancel = Scene_Map.prototype.onItemCancel;
Scene_Map.prototype.onItemCancel = function() {
     _srpg_AI_onItemCancel.call(this);
     this._mapSrpgActorCommandWindow.visible = true;
};

 var _srpg_AI_onScene_MapItemOk = Scene_Map.prototype.onItemOk;
Scene_Map.prototype.onItemOk = function() {
     var item = this._itemWindow.item();
     if ($gameSystem.isSRPGMode() == true) {
         this.onSlotItemOk();
     } else {_srpg_AI_onScene_MapItemOk.call(this)};
};

Scene_Map.prototype.onSlotItemOk = function() {
     var actor = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
     var item = this._itemWindow.item();
     _lastSlot = this._itemWindow._index;
     _slotActorId = actor._actorId;
     actor.action(0).setItem(item.id);
     $gameParty.setLastItem(item);
     this._itemWindow.hide();
     this._mapSrpgActorCommandWindow.visible = true;
     this.startActorTargetting();
};

Scene_Map.prototype.lastSlot = function() {
     return _lastSlot;
};
	
Scene_Map.prototype.slotActorId = function() {
     return _slotActorId;
}; 

 var _srpg_AI_EventBeforeBattle = Scene_Map.prototype.eventBeforeBattle;
Scene_Map.prototype.eventBeforeBattle = function() {
     if (_slotActorId !== 0) {
         var activeEv = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
         if (activeEv._actorId === _slotActorId) { 
             if (activeEv.action(0)._item._dataClass === "item") { 
                 activeEv.clearItemSlot(_lastSlot, 1);
                 _slotActorId = 0;_lastSlot = 0;
             } else {_slotActorId = 0;_lastSlot = 0};
         }    
     }
     _srpg_AI_EventBeforeBattle.call(this);
};

//---------------------------------------------------------------------------
// scene ActorItemSlots (this is used outside of SRPGbattle)
// (-> in SRPG battle the default Setup is used and parts are overwritin)

function Scene_ActorItemSlots() {
    this.initialize.apply(this, arguments);
}

Scene_ActorItemSlots.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ActorItemSlots.prototype.constructor = Scene_ActorItemSlots;

Scene_ActorItemSlots.prototype.initialize = function() {
     Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ActorItemSlots.prototype.create = function() { 
     Scene_MenuBase.prototype.create.call(this);
     this.createHelpWindow();
     this.createMenuCharWindow();
     this.createCommandWindow();
     this.createSlotWindow();
     this.createNumberWindow();
     this.createItemWindow();
     this.refreshActor();
};

Scene_ActorItemSlots.prototype.createMenuCharWindow = function() {
     var wx = 145;
     var wy = 145;
     var ww = 150;
     var wh = 155;
     this._menuCharWindow = new Window_MenuChar(wx, wy, ww, wh);
     this.addWindow(this._menuCharWindow);
};

Scene_ActorItemSlots.prototype.createCommandWindow = function() {
     var wx = 0;
     var wy = 195;
     this._commandWindow = new Window_ActorItemSlotCommand(wx, wy);
     this._commandWindow.setHelpWindow(this._helpWindow);
     this._commandWindow.setHandler('addItem',    this.commandChangeItem.bind(this));
     this._commandWindow.setHandler('clearItem',   this.commandChangeItem.bind(this));
     this._commandWindow.setHandler('reset',    this.commandReset.bind(this));
     this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
     this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
     this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
     this.addWindow(this._commandWindow);
};

Scene_ActorItemSlots.prototype.createSlotWindow = function() {
     var wx = 0;
     var wy = 350;
     this._slotWindow = new Window_MenuActorItemSlot(wx, wy);
     this._slotWindow.setHelpWindow(this._helpWindow);
     this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
     this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
     this.addWindow(this._slotWindow);
};

Scene_ActorItemSlots.prototype.createNumberWindow = function() {
     var ww = Graphics.boxWidth / 2;
     var wh = 130;
     var wx = Graphics.boxWidth / 2;
     var wy = 108;
     this._numberWindow = new Window_changeItemAmount(wx, wy, ww, wh);
     this._numberWindow.hide();
     this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
     this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
     this.addWindow(this._numberWindow);
};

Scene_ActorItemSlots.prototype.createItemWindow = function() {
     var wx = Graphics.boxWidth / 2;
     var wy = 350;
     this._itemWindow = new Window_PartyItemStorage(wx, wy);
     this._itemWindow.setHelpWindow(this._helpWindow);
     this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
     this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
     this._slotWindow.setItemWindow(this._itemWindow);
     this.addWindow(this._itemWindow);
};

Scene_ActorItemSlots.prototype.user = function() {
     return this.actor();
};

Scene_ActorItemSlots.prototype.item = function() {
     return this._slotWindow.item();
};

Scene_ActorItemSlots.prototype.hideSubWindow = function(window) {
     window.hide();
     window.deactivate();
     this._slotWindow.refresh();
     this._slotWindow.activate();
};

Scene_ActorItemSlots.prototype.refreshActor = function() {
     var actor = this.actor();
     this._slotWindow.setActor(actor);
     this._itemWindow.setActor(actor);
};

Scene_ActorItemSlots.prototype.commandChangeItem = function() {
     this._slotWindow.activate();
     this._slotWindow.select(0);
};

Scene_ActorItemSlots.prototype.commandReset = function() {
     SoundManager.playEquip();
     this.actor().resetItemSlots();
     this._slotWindow.refresh();
     this._itemWindow.refresh();
     this._commandWindow.activate();
};

Scene_ActorItemSlots.prototype.onActorOk = function() {
     if (this.actor()._itemSlots[this._slotWindow.index()].amount > 0 && this.isItemEffectsValid()) {
         this.useItem();
	 this.actor().changeItemAmount(this._slotWindow.index(),-1);
	 this._slotWindow.refresh();
     };
};

Scene_ActorItemSlots.prototype.onSlotOk = function() {
     if (this._commandWindow.currentSymbol() === "clearItem") { 
        var maxRemove = this.actor()._itemSlots[this._slotWindow.index()].amount;
        if (maxRemove <= 0) {
            this._slotWindow.activate();
        } else {
	    this._numberWindow.setup(this._slotWindow.item(), maxRemove, _srpg_txtRemoveAmount);
	    this._numberWindow.show();
	    this._numberWindow.activate();
        };
     } else {
	 this._itemWindow.activate();
    	 this._itemWindow.select(0);
     };
};

Scene_ActorItemSlots.prototype.onSlotCancel = function() {
     this._slotWindow.deselect();
     this._commandWindow.activate();
};

Scene_ActorItemSlots.prototype.onItemOk = function() {
     if (this._itemWindow.item()) {var windowitemID = this._itemWindow.item().id} else {var windowitemID = 0};
     var actorStackAmount = this.actor().maxItemAmount(this._slotWindow.index(),windowitemID);
     if (windowitemID <= 0) {
	 this.actor().clearItemSlot(this._slotWindow.index(), 0);
	 SoundManager.playEquip();
	 this._itemWindow.activate();
     } else if (actorStackAmount <= 0) {
	 this._itemWindow.activate();
     } else {
	 SoundManager.playEquip();
	 var maxAmount = Math.min($gameParty.numItems(this._itemWindow.item()),actorStackAmount);
	 this._numberWindow.setup(this._itemWindow.item(), maxAmount, _srpg_txtAddItemAmount);
	 this._numberWindow.show();
	 this._numberWindow.activate();
     };
};

Scene_ActorItemSlots.prototype.onNumberOk = function() {
     if (this._commandWindow.currentSymbol() === "clearItem") {
	 this.actor().returnItemToParty(this._slotWindow.index(), this._numberWindow.number())
     } else { 
         if (this._commandWindow.currentSymbol() === "addItem") {
	     this.actor().changeActorItem(this._slotWindow.index(), this._itemWindow.item(), this._numberWindow.number());
	     $gameParty.gainItem(this._itemWindow.item(), - this._numberWindow.number());
         }
     }
     this._numberWindow.deactivate();
     this._numberWindow.hide();
     this._slotWindow.activate();
     this._slotWindow.refresh();
     this._itemWindow.deselect();
     this._itemWindow.refresh();
};

Scene_ActorItemSlots.prototype.onNumberCancel = function() {
     this._numberWindow.hide();
     this._numberWindow.deactivate();
     if (this._commandWindow.currentSymbol() === "clearItem") {
	 this._slotWindow.activate();
     } else {
	 this._itemWindow.activate();
     };
};

Scene_ActorItemSlots.prototype.onItemCancel = function() {
     this._slotWindow.activate();
     this._itemWindow.deselect();
};

Scene_ActorItemSlots.prototype.onActorChange = function() {
     this.refreshActor();
     this._commandWindow.activate();
};

//----------------------------------------------------------------------------------------------  
// scene Boot 
	
 var _srpg_AI_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {	
     for (var i = 1;i < $dataItems.length;i++) {
	  if (i !== null) {
	      $dataItems[i].stackSize = _srpg_ItemStackSize;
	      $dataItems[i].stealProtection = false;
              if ($dataItems[i].meta.noSteal) {$dataItems[i].stealProtection = true};
          }
     };
     for (var i = 1;i < $dataWeapons.length;i++) {
	  if (i !== null) {
	      $dataWeapons[i].stealProtection = false;
	      $dataWeapons[i].breakProtection = false;
              if ($dataWeapons[i].meta.noSteal) {$dataWeapons[i].stealProtection = true};
              if ($dataWeapons[i].meta.noBreak) {$dataWeapons[i].breakProtection = true};
          }
     };
     for (var i = 1;i < $dataArmors.length;i++) {
	  if (i !== null) {
	      $dataArmors[i].stealProtection = false;
	      $dataArmors[i].breakProtection = false;
              if ($dataArmors[i].meta.noSteal) {$dataArmors[i].stealProtection = true};
              if ($dataArmors[i].meta.noBreak) {$dataArmors[i].breakProtection = true};
          }
     };
_srpg_AI_Boot_start.call(this);
};

//----------------------------------------------------------------------------------------------
// Setup for Usage of SV battler IMG in menu Window

if (_srpg_Controll_MenuChar_Img == 'true') {
    // script is from Jeremy Cannady to use SV battler chars in Windows
    var COLD = COLD || {};

    (function(){
	COLD.animatedWindow = {
		windowBaseUpdate : Window_Base.prototype.update,
		windowBaseInitialize : Window_Base.prototype.initialize,
		originalSetBattler : Sprite_Actor.prototype.setBattler,
		originalInitialize : Sprite_Actor.prototype.initialize,

		newSetBattler : function(battler){
			Sprite_Battler.prototype.setBattler.call(this, battler);
			var changed = (battler !== this._actor);
			if (changed) {
				this._actor = battler;
				this._stateSprite.setup(battler);
			};
		},
				
		newInitialize : function(battler) {Sprite_Battler.prototype.initialize.call(this, battler);},
			
		modifyActorSprite : function(value){
			if(value == 'new'){
				Sprite_Actor.prototype.initialize = COLD.animatedWindow.newInitialize
				Sprite_Actor.prototype.setBattler = COLD.animatedWindow.newSetBattler;
			}else{
				Sprite_Actor.prototype.initialize = COLD.animatedWindow.originalInitialize;
				Sprite_Actor.prototype.setBattler = COLD.animatedWindow.originalSetBattler;	
			};
		}
	};
	
    })();

    (function($){
		
	$.prototype.drawAnimatedActor = function(actor, x, y, motion){
		if(x <= this.width && y <= this.height){
			COLD.animatedWindow.modifyActorSprite('new');
			this._actorSprite = new Sprite_Actor();
                        this._actorSprite.scale.x = 2;
                        this._actorSprite.scale.y = 2;
			this._actorSprites.addChild(this._actorSprite);
			this._actorSprite.setBattler(actor);	
			this._actorSprite.setHome(x, y);
			this.actorMotions.push(motion);
			COLD.animatedWindow.modifyActorSprite('original');
		};
	};
	
	$.prototype.update = function(){
		COLD.animatedWindow.windowBaseUpdate.call(this);
		if(this._actorSprites.children.length > 0){
			this.updateActors();
		};
	};
	
	$.prototype.initialize = function(x, y, width, height){
		COLD.animatedWindow.windowBaseInitialize.call(this,x,y,width,height);
		this._actorSprites = new Sprite();
		this.addChild(this._actorSprites);
		this.actorMotions = [];
	};

	$.prototype.updateActors = function(){
		var childs = this._actorSprites.children;
		for (var i = 0; i < childs.length; i++){
			if(childs[i]._motionCount == 0){
				childs[i].startMotion(this.actorMotions[i]);
			};
		};
	};
	
    })(Window_Base);

}; // closes the if Condition "if SV battler IMG is used" 
	
//----------------------------------------------------------------------------------------------
// DoctorQs code from the Plugin "SRPG Teams"
	
// generic battler team
Game_BattlerBase.prototype.srpgTeam = function() {
    var team = "";
    this.states().some(function(state) {
	 if (state.meta.srpgTeam) {
	     team = state.meta.srpgTeam;
	     return true;
	 }
         return false;
    });
    return team.trim().toLowerCase();;
};

// get an actor's team
Game_Actor.prototype.srpgTeam = function() {
    var team = Game_BattlerBase.prototype.srpgTeam.call(this) || _actorTeam;
    if (this.currentClass().meta.srpgTeam) {
	team = this.currentClass().meta.srpgTeam;
    } else if (this.actor().meta.srpgTeam) {
	       team = this.actor().meta.srpgTeam;
    }
    return team.trim().toLowerCase();
};

// get an enemy's team
Game_Enemy.prototype.srpgTeam = function() {
    var team = Game_BattlerBase.prototype.srpgTeam.call(this) || _enemyTeam;
    if (this.enemy().meta.srpgTeam) {
	team = this.enemy().meta.srpgTeam.toLowerCase();
    }
    return team.trim().toLowerCase();
};

// compare the two battler's teams
Game_BattlerBase.prototype.sameTeam = function(other) {
    return (this.srpgTeam() == other.srpgTeam());
};

// count the living members of a given team
Game_System.prototype.teamSize = function(team) {
    team = team || "";
    team = team.trim().toLowerCase();
    var count = 0;
    $gameMap.events().forEach(function(event) {
         if (event.isErased()) return;
         var battlerArray = $gameSystem.EventToUnit(event.eventId());
         if (!battlerArray || !battlerArray[1] || battlerArray[1].isDead()) return;
	 if (battlerArray[1].srpgTeam() == team) count++;
    });
    return count;
};

// shorthand to check if there's nobody left on the team
Game_System.prototype.teamIsDead = function(team) {
     return !!(this.teamSize(team) <= 0)
};	
	
//-----------------------------------------------------------------------------------------
// Code Stuff related to -> enemy LV/EXP/CLASS (all other related code is @plugin start)
//-----------------------------------------------------------------------------------------                 

Game_Enemy.prototype.initSkills = function() {
    this._skills = [];
    for (var i = 0; i < this.enemy().actions.length; ++i) {
         var skill = $dataSkills[this.enemy().actions[i].skillId];
         if (skill) this._skills.push(skill);
    }
};

Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this._classId];
};

Game_Enemy.prototype.maxLevel = function() {
    return this.enemy().maxLevel;
};

Game_Enemy.prototype.isMaxLevel = function() {
    return this._level >= this.maxLevel();
};
	
Game_Enemy.prototype.levelUp = function() {
    this._level++;
};

Game_Enemy.prototype.levelDown = function() {
    this._level--;
};

Game_Enemy.prototype.initExp = function() {
    this._exp[this._classId] = this.currentLevelExp();
};

Game_Enemy.prototype.currentExp = function() {
    return this._exp[this._classId];
};

Game_Enemy.prototype.currentLevelExp = function() {
    return this.expForLevel(this._level);
};

Game_Enemy.prototype.nextLevelExp = function() {
    return this.expForLevel(this._level + 1);
};

Game_Enemy.prototype.nextRequiredExp = function() {
    return this.nextLevelExp() - this.currentExp();
};

Game_Enemy.prototype.expForLevel = function(level) {
    var c = this.currentClass();
    var basis = c.expParams[0];
    var extra = c.expParams[1];
    var acc_a = c.expParams[2];
    var acc_b = c.expParams[3];
    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);

};

Game_Enemy.prototype.gainExp = function(exp) {
    var newExp = this.currentExp() + Math.round(exp * this.finalExpRate());
    this.changeExp(newExp, this.shouldDisplayLevelUp());
};

Game_Enemy.prototype.shouldDisplayLevelUp = function() {
    return true;
};

Game_Enemy.prototype.finalExpRate = function() {
    return this.exr * (this.isBattleMember() ? 1 : this.benchMembersExpRate());
};

Game_Enemy.prototype.benchMembersExpRate = function() {
    return $dataSystem.optExtraExp ? 1 : 0;
};

BattleManager.gainExp = function() {
    if ($gameSystem.isSRPGMode() == true) {
        var exp = this._rewards.exp;
        var activeBattler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
        //console.log(activeBattler);console.log(exp);
        if (activeBattler) activeBattler.gainExp(exp);

    } else {
        _SRPG_BattleManager_gainExp.call(this);
    }
};

Game_Enemy.prototype.changeExp = function(exp, show) {
    this._exp[this._classId] = Math.max(exp, 0);
    var lastLevel = this._level;
    var lastSkills = this.skills();
    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        this.levelUp();
    }
    while (this.currentExp() < this.currentLevelExp()) {
        this.levelDown();
    }
    if (show && this._level > lastLevel) {
        this.displayLevelUp();//this.findNewSkills(lastSkills)
    }
    this.refresh();
};

Scene_Map.prototype.processSrpgVictory = function() {
     var activeBattler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
     if (activeBattler && !activeBattler.isDead()) {
	 this.makeRewards();
         if (this._rewards.exp > 0 || this._rewards.gold > 0 || this._rewards.items.length > 0) {
	     this._srpgBattleResultWindow.setBattler(activeBattler);
	     this._srpgBattleResultWindow.setRewards(this._rewards);
	     var se = {};
	     se.name = 'Item3';
	     se.pan = 0;
	     se.pitch = 100;
	     se.volume = 90;
	     AudioManager.playSe(se);
	     this._srpgBattleResultWindow.open();
	     this._srpgBattleResultWindowCount = 60;
	     this.gainRewards();
	     return true;
	 }
     return false;
     }
};

Scene_Battle.prototype.createSrpgBattleResultWindow = function() {
     var activeBattler = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId())[1];
     this._srpgBattleResultWindow = new Window_SrpgBattleResult(activeBattler);
     //console.log(activeBattler);
     this._srpgBattleResultWindow.openness = 0;
     this.addWindow(this._srpgBattleResultWindow);
     BattleManager.setSrpgBattleResultWindow(this._srpgBattleResultWindow);
};

Game_Enemy.prototype.displayLevelUp = function() {
    var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
    $gameMessage.newPage();
    $gameMessage.add(text);
};

Window_SrpgBattleResult.prototype.drawGainExp = function(x, y) {
      var lineHeight = this.lineHeight();
      //console.log(this._battler);
      var exp = Math.round(this._rewards.exp * this._battler.finalExpRate()); 
      var width = this.windowWidth() - this.padding * 2;
      if (exp > 0) {
          var text = TextManager.obtainExp.format(exp, TextManager.exp);
          this.resetTextColor();
          this.drawText(text, x, y, width);
      } else {
          this._changeExp = 1;
      }
      var color1 = this.hpGaugeColor1();
      var color2 = this.hpGaugeColor2();
      var nowExp = Math.floor(this._reserveExp + exp / 30 * (31 - this._changeExp));
      if (nowExp >= this._battler.expForLevel(this._level + 1)) {
          this._level += 1;
          var se = {};
          se.name = 'Up4';
          se.pan = 0;
          se.pitch = 100;
          se.volume = 90;
          AudioManager.playSe(se);
      }
      if (this._level >= this._battler.maxLevel()) {
          var rate = 1.0;
          var nextExp = '-------'
      } else {
          var rate = (nowExp - this._battler.expForLevel(this._level)) / 
                     (this._battler.expForLevel(this._level + 1) - this._battler.expForLevel(this._level));
          var nextExp = this._battler.expForLevel(this._level + 1) - nowExp;
      }
      //console.log(this._level);
      this.drawGauge(x + 100, y + lineHeight, width - 100, rate, color1, color2);
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.levelA, x, y + lineHeight, 48);
      this.resetTextColor();
      this.drawText(this._level, x + 48, y + lineHeight, 36, 'right');
      var expNext = TextManager.expNext.format(TextManager.level);
      this.drawText(expNext, width - 270, y + lineHeight, 270);
      this.drawText(nextExp, width - 270, y + lineHeight, 270, 'right');
      this._changeExp -= 1;
};

Window_Base.prototype.drawEnemyClass = function(enemy, x, y, width) {
      width = width || 168;
      var className = enemy.currentClass().name;
      if (className) {
          this.resetTextColor();
          this.drawText(className, x, y, width);
      }
};

Window_Base.prototype.drawEnemyLevel = function(enemy, x, y) {
      var srpgLevel = enemy._level;
      if (srpgLevel) {
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.levelA, x, y, 48);
          this.resetTextColor();
          this.drawText(srpgLevel, x + 20, y, 36, 'right');
      }
};

Window_Base.prototype.drawEnemyExpRate = function(enemy, x, y, width) {
      width = width || 120;
      var color1 = this.hpGaugeColor1();
      var color2 = this.hpGaugeColor2();
      this.drawGauge(x, y, width, enemy.expRate(), color1, color2);
};

Game_Enemy.prototype.expRate = function() {
    if (this.isMaxLevel()) {
        var rate = 1.0;
    } else {
        var rate = (this.currentExp() - this.currentLevelExp()) / (this.nextLevelExp() - this.currentLevelExp());
    }
return rate;
};

//-----------------------------------------------------------------------------------------   

//-----------------------------------------------------------------------------------------   

//--End:

})();
