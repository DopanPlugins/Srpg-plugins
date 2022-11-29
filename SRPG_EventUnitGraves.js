//=============================================================================
// SRPG_eventUnitGraves.js
//=============================================================================
/*:
 * @plugindesc v1.2 Adds <SRPG_eventUnitGraves> for for BattleUnits in SRPG  
 * @author dopan
 *
 * @param Controll Grave Spawn
 * @desc Switch that activates Grave Spawn,can be changed with scriptcall aswell
 * @type boolean
 * @default true
 *
 * @param Use Actor Graves
 * @desc Switch to decide if Actor Graves are used. Default ist true
 * @type boolean
 * @default true
 *
 * @param Use Enemy Graves
 * @desc Switch to decide if Enemy Graves are used. Default ist true
 * @type boolean
 * @default true
 *
 * @param Grave Map Id
 * @desc ID of Map which stores Grave Events
 * @type number
 * @default 1
 *
 * @help  
 *
 * (srpg extension ,needs the srpg Core plugin)
 * 
 * This Plugin spawns "eventGraves" whenever a battleUnit get killed, and deletes them if that battleUnit gets revided! 
 * (requires the "Raise" sciptcalls from this plugin when revive Units..)
 *
 * by eventing this would require to use a lot of gamevariables & an EventSpawner Plugin.. But this Plugin only needs:
 * 
 * 1.MapID in the Plugin param 
 * (this map should be unique and only used to store the grave events)
 * 2.EventNoteTags on the GraveEvents,that are stored on that "GraveMap".. 
 * (<actorgrave:x> <enemygrave:x>)
 * 3.Enemy Unit Events need to get the EventNote <unit:x> in addittion to the default Enemy eventNotetags
 *
 * After this Setup is done its Plug&Play,but it also offers a few helpfull ScriptCalls,  
 * but first lets check the new EventNoteTags:
 *
 *----------------------------------------------
 * ABOUT GRAVE EVENTS (Importent) EventNoteTags: 
 *----------------------------------------------
 *
 *  <actorgrave:x>
 *
 *  this has to be added to an Dead Body Event
 *  "x" should be the "ActorId" of the related alive Unit
 * (no other notetags required, but <type:object> or others can be added aswell)
 *---------------------------------------------------------------------------------
 *
 *  <enemygrave:x>
 *
 *  this has to be added to an Dead Body Event
 *  "x" should be the "EnemyId" of the related alive Unit
 * (no other notetags required, but <type:object> or others can be added aswell)
 *----------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------
 *
 * ABOUT ENEMY UNIT EVENT NOTE TAG:
 *
 * (for Enemy Unit Events Only!)
 *
 *    <Unit:x> => this is required for every "enemyUnit" (not Grave)
 *               ..this is used to give enemys a 2nd ID.This number must be Unique 
 *          (because enemys get cloned and all clones have the same enemy ID) 
 *
 * Example for a correctly made EnemyUnitBattler eventNotetag:
 *  <type:enemy><id:x><unit:x> 
 *----------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------
 *
 * ABOUT CONTROLL SWITCH: 
 *
 * ScriptCall to controll the Switch from the Plugin Param (default is 'true')
 *
 * "this.controllGraveSpawn('true'/'false');" 
 *
 * example => this.controllGraveSpawn('true');
 *
 * this can be used to controll when & if the GraveSpawn gets activated
 * (by default thats not needed because everything works plug&play,its just incase someone might need it)
 *
 *---------------------
 *---------------------
 * ABOUT NEW SCRIPTCALL: $gameSystem.EnemyUnit(unitID)
 *---------------------
 * I use EnemyClones that have the same EnemyID, therefor i made
 * an EventNoteTag for the EnemyUnits which have the EventNote:
 * <type:enemy><id:x> ( "x" is the enemyID)
 * <unit:x> ( "x" is the enemyUnitID)
 * example:  <type:enemy><id:x><unit:x> 
 * 
 * That way the EnemyID is the clones first ID and UnitID is the clones second unique ID.
 * Similar like humans have first and second name.. 
 * (actors only use the actor ID because its not recommended to clone actors)
 *
 * new "Unit" ScriptCall:
 *
 *  $gameSystem.EnemyUnit(1);   # returns the event Id of enemy Unit 1   
 *
 * # "$gameSystem.EnemyUnit(1)" can replace eventID example with UnitID=1: #
 *
 *  $gameSystem.EventToUnit($gameSystem.EnemyUnit(1))[1];
 *
 *---------------------------------------------------------------------------------------------------------
 *
 * ABOUT REVIVE:
 *
 * these scriptcall below revive a singel Units & erases the related grave..
 * ..pls use this instead of the default scriptcall from the srpg core,to erase related Graves while reving.
 *
 *  Scriptcall:(its a game_interpreter function)
 *  
 *  this.unitRaise(eventID);    # revives battler & erases related grave 
 *
 *---------------------------------------------------------------------------------------------------------
 *
 * ABOUT ADDING UNITS TO BATTLE:
 *
 * These ScriptCalls should be used INSTEAD of the default Scripcalls from the SRPGCore 
 *      ("this.addEnemy(EventID, EnemyID)" & "this.addActor(EventID, ActorID)")
 * ..in order to add Units to an Event later in battleMap:
 *
 * ScripCall: for actors
 *   
 * this.addBattleEnemy(EventID, EnemyID, "UnitID"); # adds data to the Event of the new Enemy Unit
 *
 * Example: this.addBattleEnemy(10, 2, "9"); 
 * (that example above is the enemy with => EventID:10 => EnemyID:2 => UnitID:9)
 *
 *
 * ScripCall: for enemys
 *
 * this.addBattleActor(EventID, ActorID);  # adds data to the Event of the new Actor Unit
 *
 * Example: this.addBattleActor(10, 2); 
 * (that example above is the actor with => EventID:10 => ActorID:2)
 *
 *
 * => both scripcalls also add "$gameMap.graveSetup();" to the used Event!
 *--------------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------------
 *
 * ABOUT SPAWNING UNITS INTO BATTLE (after battle has already started)
 *
 * Incase any BattleUnits gets summoned or spawned with spawner/summoner-Plugins,
 * Events must have the correct eventNotetag for battleUnits and then these 2 Scriptcalls must be used:
 * => spawning BattleUnits this way doesnt need "addEnemy(EventID, EnemyID)"or"this.addActor(EventID, ActorID)"
 *
 * $gameMap.setEnemytUnitID();  # set EnemyUnit ID to mapEvent&gamebattler of all enemyUnits (enemys only)
 *
 * $gameMap.graveSetup();       # add GraveSetup to all BattleUnit mapEvents (actors&Enemys)
 *
 * sideNote: the simpler solution is to spawn the events first and then start the battle,
 *  that would not require the 2 scriptcalls above, because at battleStart that happens by default
 *
 *---------------------------------------------------------------------------------------------------------
 *
 * ABOUT CHECKING ENEMY UNIT ID
 *
 * After srpg Battle started at "start of battle" EnemyUnits with the corretly EventNoteTag setup will get:
 *- "Unit ID" added to Battler and Event. (this can be seen in the ConsoleF8 and used for any purposes)
 * Examples:
 *
 * for Event:
 *   
 * $gameMap.event(eventID)._eventEnemyUnitId;        # returns the UnitID on EventEnemyUnit
 *
 * for Battler:
 * 
 * $gameSystem.EventToUnit(eventID)[1]._enemyUnitId; # return the UnitID on BattlerEnemyUnit
 *
 *---------------------------------------------------------------------------------------------------------
 *
 * ABOUT ERASING GRAVE EVENTS
 *
 * new script for usage outside of SRPGbattleMode:
 *
 * $gameTemp.eraseAllGraves();  # this erases all graves from map, can be used to clean a map after battle
 *
 *
 *_________________________________________________________________________________________________________
 *
 * planed for the future: - add a "break grave" function
 * 
 * if you know FFT, than you might want to disable the respawn function for a grave,
 * even if the related battler is still dead.. to spawn a lootChest or make reving the battler impossible.
 *
 *
 *
 *(more Scriptcalls&Infos can be found in the pluginCode)
 *
 * Credits:
 *       Basicly this is an Automatic-Eventspawner & i learned a lot how this works,
 *       by reading the codes of other EventSpawner Plugins.And from the Forum Infos.
 *       But the most helpfull info and even some code parts are from
 *       Shoukang's "SRPG_Summon.js".
 *       Even if Shoukang's Plugin works different and has other purposes,   
 *       it helped me to understand how to get the data from other Maps &  
 *       how to Spawn Events.
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.3:
 * - first Release 11.11.2021 for SRPG (rpg mv)!
 * - bugFixes and added/replaced few scriptcalls
 * - small fixes and added new scriptcall "$gameTemp.eraseAllGraves();"
 * - added option to exclude actors or enemys for grave usage in plugin param
 * - improved the way the plugin updates ..
 */
 
(function() {

// Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_eventUnitGraves") || 
                   $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_eventUnitGraves>')});

  var _GraveMapId = Number(parameters['Grave Map Id']) || 1;

  var _controllGraveSpawn = parameters['Controll Grave Spawn'] || 'true' || 'false';

  var _useActorGraves = parameters['Use Actor Graves'] || 'true' || 'false';

  var _useEnemyGraves = parameters['Use Enemy Graves'] || 'true' || 'false';

  var _updateSwitch = 'true' || 'false';

// ID variables and related codes: its not needed but used as reminder..

  var actorID = 0;      // $gameSystem.EventToUnit(eventID)[1]._actorId;
  var enemyID = 0;      // $gameSystem.EventToUnit(eventID)[1]._enemyId;
  var unitID = 0;       // $gameMap.event(eventID)._eventEnemyUnitId;
  var graveEID = 0;     // $gameMap.event(graveEventID)._eventId
  var graveDataEID = 0; // $dataGrave.events[this._graveDataEID]
  var euX = 0;          // eventUnit.x
  var euY = 0;          // eventUnit.y
  var mapId = 0;        // $gameMap._mapId
	


//-----------------------------------------------------------------------------------------------------
// Data Manager (import Grave Map Data)----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

    //"$dataGrave" stores the Grave Map data (similar to "$dataMap" for default "$gameMap").

    DataManager.loadGraveData = function(mapId) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataGrave', filename));
            this.loadDataFile('$dataGrave', filename);
        } else {
            this.makeEmptyMap();
        }
    };

    var _DataManager_onLoad = DataManager.onLoad
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataGrave) {
            this.extractMetadata(object);
            for (var i = 0; i < object.events.length; i++) {
                var data = object.events[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
    };

    //load Grave Map data 

    DataManager.loadGraveData(_GraveMapId);

//-----------------------------------------------------------------------------------------
// Game GraveEvent (Game Event Subgroup)---------------------------------------------------
//-----------------------------------------------------------------------------------------

    // Add subgroup to Game_Event => Game_GraveEvent (used to add the new Events from "$dataGrave" to $gameMap)
    Game_GraveEvent = function() {
        this.initialize.apply(this, arguments);

    }

    Game_GraveEvent.prototype = Object.create(Game_Event.prototype);
    Game_GraveEvent.prototype.constructor = Game_GraveEvent;
    // extract Metadata, add several Ids, xy_Location & initialize Game_Event
    Game_GraveEvent.prototype.initialize = function(mapId, graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY) {
        Game_Character.prototype.initialize.call(this);
        this._graveActorID = actorID;
        this._graveUnitID = unitID;
        this._mapId = mapId;
        this._eventId = graveEID;
        this._graveDataEID = graveDataEID;
	Game_Event.prototype.initialize.call(this, mapId, graveEID);
	DataManager.extractMetadata(this.event());
	this.locate(euX, euY);  
        this.refresh(); 
        this.setGraveType();
    };

    Game_GraveEvent.prototype.setGraveType = function() {
        if (this.event().meta.type) {this.setType(this.event().meta.type)};
    };
    // add event from $dataGrave to Game_GraveEvent
    Game_GraveEvent.prototype.event = function() {
        return $dataGrave.events[this._graveDataEID];
    };

    // add "erase" & "respawn" functions to Game_GraveEvent
    Game_GraveEvent.prototype.eraseGrave = function() {
        $gameMap.event(this._eventId)._erased = true;return true;
    };
    // it does what its named
    Game_GraveEvent.prototype.reSpawnGrave = function() {
        if ($gameMap.event(this._eventId)._erased === true) {
            $gameMap.event(this._eventId)._erased = false;return true; 
        }
    };

//-----------------------------------------------------------------------------------------
// Spriteset ------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
   // build the grave Char_sprite
   Spriteset_Map.prototype.createGraveEvent = function(graveEID) {
	    var spriteID = this._characterSprites.length;
	    var graveEvent = $gameMap.event(graveEID);
	    this._characterSprites[spriteID] = new Sprite_Character(graveEvent);
	    this._tilemap.addChild(this._characterSprites[spriteID]);
   };
//-----------------------------------------------------------------------------------------  
// Game Map -------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------- 
// Add&Call new Grave Event Event to GameMap:
//-------------------------------------------	

   //Get next MapEventId,for newGraveEvent & Add it $gameMap eventlist 
   //& create Character & store eventID from active newGrave in "$gameMap._newGraveEvent"
   // about "$gameMap._newGraveEvent" event ID will be replaced by the next newGrave ect
   Game_Map.prototype.addGrave = function(graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY) {
       var graveEID = this._events.length;
       this._newGraveEvent = graveEID;
       this._events[graveEID] = new Game_GraveEvent(this._mapId, graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY);
       if (SceneManager._scene instanceof Scene_Map === true) { 
           SceneManager._scene._spriteset.createGraveEvent(graveEID);
       };  
   };  

// ScriptCall to set Unit Id to Enemys with EventNotetag <Unit:x> (IDs for Battler & Event)
//-----------------------------------------------------------------------------------------
//NOTE Ids will be added when the "battlestart"-event happens

    // scritcall(add UnitId to battler & event) : " $gameMap.setEnemyUnitID(); "
    // imports the enemyUnit ID into BattleMap:

    Game_Map.prototype.setEnemytUnitID = function() { 
        var returnInfo = false;
	if ($gameSystem.isSRPGMode() == true) {
            $gameMap.events().forEach(function(event) {
                 if (event.isType() === 'enemy') {
                     var mapNote = event.event().note.indexOf("unit");
                     if (mapNote > 0) {
                         var batlleUnit = $gameSystem.EventToUnit(event.eventId());
                         var mapEventMetaUnitID = event.event().meta.unit
                         event._eventEnemyUnitId = mapEventMetaUnitID;
                         batlleUnit[1]._enemyUnitId = mapEventMetaUnitID;
		         returnInfo = true;
                    }
                 } 	  
           });
        } 
    return returnInfo;
    };	

    // add Event Switches to controll plugin trigger
    Game_Map.prototype.graveSetup = function() { 
      $gameMap.events().forEach(function(event) {
        if ((event.isType() === 'actor') && _useActorGraves === 'true') {
             event._needGraveReSpawn = false;
             event._hasGrave = false;
        }
        if ((event.isType() === 'enemy') && _useEnemyGraves === 'true') { 
             event._needGraveReSpawn = false;
             event._hasGrave = false;
        }
      });
    };
 
//-----------------------------------------------------------------------------------------
// Game temp ------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
// Import data Event ID from <enemygrave:x> & <actorgrave:x> Grave Events (EventNotetag)
	
    // This imports the Event ID from "$dataGrave" Map. "<enemygrave:x>" based on that eventNote  
    // "x" is "enemyID" .Example: eventNote <enemygrave:2> 
    //  <enemygrave:2>  is related to the enemy ID of the related alive EnemyUnit (enemyId2)
    Game_Temp.prototype.importEnemyGraveEID = function(enemyID) {
        for (var i = 1; i < $dataGrave.events.length; i++) {
             var dataGraveEvents = $dataGrave.events[i];
             if (dataGraveEvents !== null) { 
                if (dataGraveEvents.note.indexOf("enemygrave") > 0) {
                    if (dataGraveEvents.meta.enemygrave == enemyID) {
                        var getGrave = i ;
                        return getGrave;
                    }
                }
             }  
        }
    };

    // This imports the Event ID from "$dataGrave" Map.Based on this eventNote "<actorgrave:x>" 
    // "x" is "actorID" .Example: eventNote <actorgrave:2> 
    //  <actorgrave:2>  is related to the actorID of the related alive actorUnit (actorId2)
    Game_Temp.prototype.importActorGraveEID = function(actorID) {
        var i = 1;
        for (var i = 1; i < $dataGrave.events.length; i++) {
             var dataGraveEvents = $dataGrave.events[i];
             if (dataGraveEvents !== null) { 
                if (dataGraveEvents.note) {
                    if (dataGraveEvents.note.indexOf("actorgrave") > 0) {
                        if (dataGraveEvents.meta.actorgrave == actorID) {
                            var getGrave = i ;
                            return getGrave;
                        }
                    }
                }
             }  
        }
    };

//-------------------------------
//Spawn new Actor&Enemy Graves:
//-------------------------------
	
    //this checks if the BattleUnit is death and spawns the related actorGrave 
    Game_Temp.prototype.spawnActorGrave = function() {
        $gameMap.events().forEach(function(event) {
             var battleUnit = $gameSystem.EventToUnit(event.eventId());       
             if (battleUnit && event && (battleUnit[0] === 'actor') && (battleUnit[1].isDead()) && (event._hasGrave === false)) {
                 var euX = event.x;
                 var euY = event.y;
                 var actorID = battleUnit[1]._actorId;
                 var enemyID = 0;
                 var unitID = 0;
                 var graveEID = 0;
                 var graveDataEID = $gameTemp.importActorGraveEID(actorID);
                 var relatedGrave = $gameMap.event($gameTemp.actorGrave(actorID));
                 if (relatedGrave && (relatedGrave._erased === true)) {
                     relatedGrave.reSpawnGrave();
                 } else {$gameMap.addGrave(graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY)};
             }           
        });
    };
	
    //this checks if the BattleUnit is death and spawns the related enemyGrave 
    // on Enemys also the "EnemyUnitID" get added in order to fit with the related alive EnemyUnit
    // "EnemyUnitID" is used to give enemyClones an own ID (all clones have the same Enemy ID) 
    Game_Temp.prototype.spawnEnemyGrave = function() {
        $gameMap.events().forEach(function(event) {
             var battleUnit = $gameSystem.EventToUnit(event.eventId());     
             if (battleUnit && event && (battleUnit[0] === 'enemy') && (battleUnit[1].isDead()) && (event._hasGrave === false)) {
                 var euX = event.x;
                 var euY = event.y;  
                 var enemyID = battleUnit[1]._enemyId;
                 var actorID = 0;
                 var graveEID = 0;
                 var graveDataEID = $gameTemp.importEnemyGraveEID(enemyID);
                 var unitID = battleUnit[1]._enemyUnitId;
                 var relatedGrave = $gameMap.event($gameTemp.enemyGrave(unitID));
                 if ((relatedGrave) && (relatedGrave._graveUnitID === unitID) && (relatedGrave._erased === true)) {
                      relatedGrave.reSpawnGrave();
                 } else {$gameMap.addGrave(graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY)};  
             }           
        });
    };

//----------------------------	
// Unspawn Actor&Enemy Graves:	
//----------------------------
    // delete spawned grave events permanent
    //$gameTemp.eraseAllGraves();
    Game_Temp.prototype.eraseAllGraves = function() {
        var Info = false;
        var mapEvents = $gameMap._events;
        for (var i = 1; i < mapEvents.length; i++) {
             var mapEvI = mapEvents[i]; 
             if (mapEvI && mapEvI !== null && mapEvI._graveDataEID) { 
                Info = true;
                mapEvents[i]._erased = true;
                mapEvents[i] = null;
             };
        };
        $gameMap.removeNullEvents();
    return Info;
    };

    // remove all "Map Null Events", and overwright galvs function if using "galv eventSpawner"
    Game_Map.prototype.removeNullEvents = function() {
	for (var i = this._events.length - 1; i > 0; i--) {
	    if (this._events[i] === null) {
		this._events.splice(i, 1);
	    }
	};
    };

    //unspawn single ActorGrave by actorId  "$gameTemp.eraseActorGrave(actorID)"
    Game_Temp.prototype.eraseActorGrave = function(actor) {
        var actorID = actor;
	var relatedGrave = $gameMap.event($gameTemp.actorGrave(actorID));
        if (relatedGrave && (relatedGrave._erased === false)) {
            relatedGrave.eraseGrave();return true;
        }	    
    };

    //unspawn singel EnemyGrave by unitId "$gameTemp.eraseEnemyGrave(unitID)"
    Game_Temp.prototype.eraseEnemyGrave = function(unit) {
        var unitID = unit;
        var relatedGrave = $gameMap.event($gameTemp.enemyGrave(unitID));
        if (relatedGrave && (relatedGrave._erased === false)) {
            relatedGrave.eraseGrave();return true;
        }	    
    };

// already spawned Actor & Enemy Grave :
//--------------------------------------------	
	
    // get event ID of already spawned EnemyGraveEvent
    // called by unitID ,used to connect alive Unit and related Grave
    // Example => $gameSystem.enemyGrave(1); can replace eventID -> $gameMap.event($gameSystem.enemyGrave(1))
    Game_Temp.prototype.enemyGrave = function(unitID) {
        var eventId = 0;
        $gameMap.events().forEach(function(event) {
            if (event._graveUnitID) {
                var enemyGraveID = event._graveUnitID;
                if (enemyGraveID === unitID) {
                    eventId = event.eventId();
                }
            }
        });
        return eventId;
    };
                
    // get event ID of already spawned ActorGraveEvent
    // called by actorID ,used to connect alive Unit and related Grave
    // Example => $gameSystem.actorGrave(1); can replace eventID -> $gameMap.event($gameSystem.actorGrave(1))
    Game_Temp.prototype.actorGrave = function(actorID) {
        var eventId = 0;
        $gameMap.events().forEach(function(event) {
            if (event._graveActorID) {
                var actorGraveMeta = event._graveActorID;
                if (actorGraveMeta === actorID) {
                    eventId = event.eventId();
                }
            }
        });
        return eventId;
   };  

//-----------------------------------------------------------------------------------------  
// Game Interpreter -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------  
   // "this.addBattleEnemy(EventID, EnemyID, UnitID);" OR
   // "Game_Interpreter.prototype.addBattleEnemy.call(this, EventID, EnemyID, UnitID)"	
   Game_Interpreter.prototype.addBattleEnemy = function(EventID, EnemyID, UnitID) {
       // Import UNIT ID to Event
       $gameMap.event(EventID)._eventEnemyUnitId = UnitID;
       // use default srpgCore script: "this.addEnemy(EventID, EnemyID);"
       this.addEnemy(EventID, EnemyID);
       // Import UNIT ID to and add GraveSetup
       $gameMap.graveSetup();
       $gameSystem.EventToUnit(EventID)[1]._enemyUnitId = UnitID; 

   };
   // "this.addBattleActor(EventID, ActorID);" OR
   // "Game_Interpreter.prototype.addBattleActor.call(this, EventID, ActorID);"
   Game_Interpreter.prototype.addBattleActor = function(EventID, ActorID) {
       // use default srpgCore script: "this.addActor(EventID, EnemyID);"
       this.addActor(EventID, ActorID);
       // add GraveSetup:
       $gameMap.graveSetup(); 
   };
	
   // "this.unitRaise(eventID)"
   Game_Interpreter.prototype.unitRaise = function(eventID) {
       var battleUnit = $gameSystem.EventToUnit(eventID);
       var eventUnit = $gameMap.event(eventID);
       if (battleUnit && (battleUnit[0] === 'actor')) {
          var actorID = battleUnit[1]._actorId;	       
	  $gameTemp.eraseActorGrave(actorID); 
       }       
       if (battleUnit && (battleUnit[0] === 'enemy')) {
	  var unitID = eventUnit._eventEnemyUnitId;
	  $gameTemp.eraseEnemyGrave(unitID);
       }
       this.unitRevive(eventID);
   };

   //this.controllGraveSpawn('true'/'false')
   Game_Interpreter.prototype.controllGraveSpawn = function(graveSpawn) {
       _controllGraveSpawn = graveSpawn;
       return _controllGraveSpawn;
   };

//-----------------------------------------------------------------------------------------  
// Game System ---------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 

    // get event ID of a BattleUnit based on Unit ID,this is similar like "$gameSystem.ActorToEvent(ActorID)" 
    // But for EnemyUnits.. example: EventNoteTag"<Unit:1>" is UnitID 1 (in order to trigger a EnemyUnit by its unitID)
    // Example => $gameSystem.EnemyUnit(1); can replace eventID -> $gameSystem.EventToUnit($gameSystem.EnemyUnit(1))[1];

    // ActorUnits can use ActorID if not Cloned: (i never clone actors to avoid bugs)
    // example $gameSystem.EventToUnit($gameSystem.ActorToEvent(ActorID))[1];    
    Game_System.prototype.EnemyUnit = function(unitID) {
        var eventId = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'enemy') {
		eventID = event.eventId();    
                var enemyUnit = $gameMap.event(eventID)._eventEnemyUnitId;
		if (enemyUnit) { 
                    if (enemyUnit === unitID) {
                        eventId = eventID;
		    }
                }
            }
        });
        return eventId;
    };
  
    // add data to Battlestart Event calling Function 
    var _EUG_Game_System_runBattleStartEvent = Game_System.prototype.runBattleStartEvent;
    Game_System.prototype.runBattleStartEvent = function() {
        _EUG_Game_System_runBattleStartEvent.call(this);
        // important data for GraveStuff
        $gameMap.setEnemytUnitID();$gameMap.graveSetup();
    };
	
    // perma check if dead & if needGraveRespawn
    Game_System.prototype.anyUnitDead = function() {
        var anyUnitDead = false;
	$gameMap.events().forEach(function(event) {
             var battleunit = $gameSystem.EventToUnit(event.eventId());
             if (battleunit && event && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {                  
                 if ((battleunit[1].isDead()) && (event._erased === true)) { 
                      if (event._hasGrave === true) {
                           if (battleunit && event && (battleunit[0] === 'actor')) {
                               var actorID = battleunit[1]._actorId;
                               var relatedActorGrave = $gameMap.event($gameTemp.actorGrave(actorID));
                               if (relatedActorGrave._erased === true) {    
				   relatedActorGrave.setPosition(event.x, event.y); 
                                   relatedActorGrave._erased = false;
                               } 
                           }
                           if (battleunit && event && (battleunit[0] === 'enemy')) {
                               var enemyUnit = event._eventEnemyUnitId;
                               var relatedEnemyGrave = $gameMap.event($gameTemp.enemyGrave(enemyUnit));
                               if (relatedEnemyGrave._erased === true) {
				   relatedEnemyGrave.setPosition(event.x, event.y); 				       
                                   relatedEnemyGrave._erased = false;
                               } 
                           }
                      }
                      if (event._hasGrave === false) {anyUnitDead = true};
                 }
             }
        });
        return anyUnitDead; 
    };  
      
    // trigger function (spawn graves)        
    Game_System.prototype.startGraveSpawn = function() {
        var startGraveSpawn = false;  
	$gameMap.events().forEach(function(event) {
             var battleUnit = $gameSystem.EventToUnit(event.eventId());
             if (battleUnit && event && (battleUnit[0] === 'actor' || battleUnit[0] === 'enemy') && (battleUnit[1].isDead())) { 
                 if (battleUnit && event && (battleUnit[0] === 'actor') && _useActorGraves === 'true') { 
		     var actorUnitID = battleUnit[1]._actorId;
                     var relatedActorGrave = $gameMap.event($gameTemp.actorGrave(actorUnitID));
                     if (relatedActorGrave) {event._hasGrave = true}; 
                     if (!relatedActorGrave) {$gameTemp.spawnActorGrave();event._hasGrave = true;startGraveSpawn = true}; 
                 }
                 if (battleUnit && event && (battleUnit[0] === 'enemy') && _useEnemyGraves === 'true') { 
		     var enemyUnitID = battleUnit[1]._enemyUnitId;
                     var relatedEnemyGrave = $gameMap.event($gameTemp.enemyGrave(enemyUnitID));
                     if (relatedEnemyGrave) {event._hasGrave = true};  
                     if (!relatedEnemyGrave) {$gameTemp.spawnEnemyGrave();event._hasGrave = true;startGraveSpawn = true};
                 }
             }
        });  
        return startGraveSpawn;          
    };

    // handle updateSwitch
    var _battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        _battler_refresh.call(this);
        if (this.hp === 0 && this.isDead() && this.event()._hasGrave !== undefined) {
            if (_updateSwitch === 'false' && this.event()._hasGrave === false) {_updateSwitch = 'true'};
        }
    };

//-----------------------------------------------------------------------------------------
// Scene Map (Event after Action) ---------------------------------------------------------  
//-----------------------------------------------------------------------------------------
    // -> "SRPG_SceneMap_update"  
    // trigger Plugin
    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SRPG_SceneMap_update.call(this);
        //if (!$gameSystem.isSRPGMode()) return;
        if (_controllGraveSpawn === 'true') {
            if (SceneManager._scene instanceof Scene_Map === true) { 
                if (_updateSwitch === 'true') {
                    if ($gameSystem.anyUnitDead()) {
                        $gameSystem.startGraveSpawn();
                        _updateSwitch = 'false';
                        
                    };
                };
            };
        };
    };
      
//-----------------------------------------------------------------------------------------  

//--End:

})();
