//=============================================================================
// SRPG_eventUnitGraves.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_eventUnitGraves> for whatever in SRPG 
 * @author (dopan)
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
 * This Plugin spawns eventsGraves whenever a battleUnit get killed, and deletes them if that battleUnit gets revided! 
 * (requires the Raise sciptcalls from ths plugin)
 *
 * by eventing this would require to use a lot of gamevariables & an EventSpawner Plugin.. But this Plugin only needs:
 * 
 * 1.MapID in the Plugin param 2.EventNoteTags on the GraveEvents,that are stored on that "GraveMap".. 
 *  (this map should be unique and only used to store the grave events)
 * 3.Enemy Units need to get the EventNote <unit:x> in addittion to the other eventNotetags
 *
 * After this Setup is done its Plug&Play,but it also offers a few helpfull ScriptCalls,  
 * but first lets check the new EventNoteTags:
 *-------------------------
 * Importent EventNoteTags: (for GraveEvents only!)
 *-------------------------
 *  <actorgrave:x>
 *  this has to be added to an Dead Body Event
 *  "x" should be the ActorId of the related alive Unit
 * (no other notetags required, but <type:object> can be added aswell)
 *---------------------------------------------------------------------------------
 *  <enemygrave:x>
 *  this has to be added to an Dead Body Event
 *  "x" should be the enemyId of the related alive Unit
 * (no other notetags required, but <type:object> can be added aswell)
 *----------------------------------------------------------------------------------
 * (for EnemyUnits Only!)
 *    <Unit:x> => this is required for every enemyUnit(not grave)
 *               ..this is used to give enemys a 2nd ID.This number must be Unique 
 *          (because enemys get cloned and all clones have the same enemy ID) 
 *
 * Example for a correctly made EnemyUnitBattler Notetag:
 *  <type:enemy><id:x><unit:x> 
 *--------------------------------
 * Info about srpgCore scriptcall:    
 *--------------------------------
 *  How to get the Event ID based on the Actor ID? (on ActorUnits)
 *-------------------------------------------------------------------
 *   $gameSystem.ActorToEvent(ActorID); 
 *   (return 0 if the unit is not in battle & has no event used,
 *   else return the actors EventID)
 *
 * for usage example :
 * $gameSystem.EventToUnit($gameSystem.ActorToEvent(ActorID))[1]; 
 * (this is the Actor-Battler called by its actorID instead of eventID)
 *--------------------------------------------------------------------
 * The default script from srpgCore to call a battler is :
 *   $gameSystem.EventToUnit(eventID)[1];
 * (this needs the EventID of the GameMapEvent of the BattleUnit)
 *---------------------
 * Plugin Scriptcall:
 *---------------------
 * I use EnemyClones that have the same EnemyID, therefor i made
 * an EventNoteTag for the EnemyUnits which have the EventNote:
 * <type:enemy><id:x> ( "x" is the enemyID)
 * <unit:x> ( "x" is the enemyUnitID)
 * example:  <type:enemy><id:x><unit:x> 
 * 
 * that way the EnemyID is the clones first ID and UnitID is the clones second unique ID.
 * Similar like humans have first and second name.. 
 * (actors only use the actor ID because its not recommened to clone actors)
 *
 * new "Unit" ScriptCall:  "$gameSystem.EnemyUnit(1)" (only for enemys Units)   
 *-----------------------
 * "$gameSystem.EnemyUnit(1)" can replace eventID 
 * example-> "$gameSystem.EventToUnit($gameSystem.EnemyUnit(1))[1];"
 *---------------------------------------------------------------------------------------------------------
 * these scriptcalls revive singel Units or all actors/enemys & erase the related graves,..
 * ..pls use these instead of the default scriptcall from the srpg core,to erase related Graves
 *
 * "this.unitRaise(eventID)" "this.allActorsRaise()" "this.allEnemysRaise()"
 *---------------------------------------------------------------------------------------------------------
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
 * Version 1.0:
 * - first Release 11.11.2021 for SRPG (rpg mv)!
 */
 
(function() {

// Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_eventUnitGraves") || 
                   $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_eventUnitGraves>')});

  var _GraveMapId = Number(parameters['Grave Map Id']) || 1;

// ID variables and related codes: its not needed but used as reminder..

  var actorID = 0;      // $gameSystem.EventToUnit(eventID)[1]._actorId;
  var enemyID = 0;      // $gameSystem.EventToUnit(eventID)[1]._enemyId;
  var unitID = 0;       // $gameMap.event(eventID)._eventEnemyUnitId;
  var graveEID = 0;     // $gameMap.event(graveEventID)._eventId
  var graveDataEID = 0; // $dataGrave.events[this._graveDataEID]
  var euX = 0;          // eventUnit.x
  var euY = 0;          // eventUnit.y
  var mapId = 0;        // $gameMap._mapId

  var _updateSwitch = true;
	
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
// Data Manager (import Grave Map Data)----------------------------------------------------------------

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
        this._graveActorID = actorID;
        this._graveUnitID = unitID;
        this._mapId = mapId;
        this._eventId = graveEID;
        this._graveDataEID = graveDataEID;
	Game_Event.prototype.initialize.call(this,mapId,graveEID);
	DataManager.extractMetadata(this.event());
	this.locate(euX, euY);    
        this.refresh();
    };

    // add event from $dataGrave to Game_GraveEvent
    Game_GraveEvent.prototype.event = function() {
        return $dataGrave.events[this._graveDataEID];
    };

    // add "erase" & "respawn" functions to Game_GraveEvent
    Game_GraveEvent.prototype.eraseGrave = function() {
        $gameMap.event(this._eventId)._erased = true;return true;
    };
    Game_GraveEvent.prototype.reSpawnGrave = function() {
        if ($gameMap.event(this._eventId)._erased === true) {
            $gameMap.event(this._eventId)._erased = false;return true; 
        }
    };

//-----------------------------------------------------------------------------------------
// Spriteset ------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
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
    Game_Map.prototype.setEnemytUnitID = function() { 
        var eventID = 0;
        $gameMap.events().forEach(function(event) {
             if (event.isType() === 'enemy') {
                 eventID = event.eventId();
                 var mapEvent = $gameMap.event(eventID);
                 var enemyUnitID = mapEvent._eventEnemyUnitId;
                 var batlleUnit = $gameSystem.EventToUnit(eventID);
                 batlleUnit[1]._enemyUnitId = enemyUnitID;
                 $gameMap.graveSetup();                        
             }
        });
    };

    // add Event Switches to controll plugin trigger
    Game_Map.prototype.graveSetup = function() { 
        $gameMap.events().forEach(function(event) {
             if ((event.isType() === 'enemy') || (event.isType() === 'actor')) {
                  event._needGraveReSpawn = false;
                  event._hasGrave = false;
             }
        });     
    };
 
//-----------------------------------------------------------------------------------------
// Game temp ------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
    // imports the enemyUnit ID into gameMap events:

    Game_Temp.prototype.importEnemyUnitID = function() {
        var returnInfo = 'no metaUnit data on this map';
        $gameMap.events().forEach(function(event) {
             var eventID = event.eventId(); 
             var dataMapEvent = $dataMap.events[eventID]; 
             if (event.isType() === 'enemy') {
                 var dataNote = dataMapEvent.note.indexOf("unit");
                 if (dataNote > 0) {
                     var dataMetaUnit = dataMapEvent.meta.unit;
                     var gameMapEvent = $gameMap.event(eventID);
                     gameMapEvent._eventEnemyUnitId = dataMetaUnit;
                     returnInfo = 'metaUnit data imported';
                 }
             } 	  
        });
    return returnInfo;
    };	

// Import data Event ID from <enemygrave:x> & <actorgrave:x> Grave Events (EventNotetag)
	
    // This imports the Event ID from "$dataGrave" Map. "<enemygrave:x>" based on that eventNote  
    // "x" is "enemyID" .Example: eventNote <enemygrave:2> 
    //  <enemygrave:2>  is related to the enemy ID of the related alive EnemyUnit (enemyId2)

    Game_Temp.prototype.importEnemyGraveEID = function(enemyID) {
        for (var i = $dataGrave.events.length - 1; i > 0; i--) {
             var dataGraveEvents = $dataGrave.events[i];
             if (dataGraveEvents !== null && (dataGraveEvents.note.indexOf("enemygrave") > 0)) {
                 if (dataGraveEvents.meta.enemygrave == enemyID) {
                     var getGrave = i ;
                     return getGrave; break; 
                 }
             }  
        }
    };

    // This imports the Event ID from "$dataGrave" Map.Based on this eventNote "<actorgrave:x>" 
    // "x" is "actorID" .Example: eventNote <actorgrave:2> 
    //  <actorgrave:2>  is related to the actorID of the related alive actorUnit (actorId2)
   
    Game_Temp.prototype.importActorGraveEID = function(actorID) {
        for (var i = $dataGrave.events.length - 1; i > 0; i--) {
             var dataGraveEvents = $dataGrave.events[i];
             if (dataGraveEvents !== null && (dataGraveEvents.note.indexOf("actorgrave") > 0)) {
                 if (dataGraveEvents.meta.actorgrave == enemyID) {
                     var getGrave = i ;
                     return getGrave; break; 
                 }
             }  
        }
    };

//-------------------------------
//Spawn new Actor&Enemy Graves:
//-------------------------------
	
    //this checks if the BattleUnit is death and spawns the related actorGrave 
    Game_Temp.prototype.spawnActorGrave = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleUnit = $gameSystem.EventToUnit([i]);
             var eventUnit = $gameMap.event([i]);
             var euX = eventUnit.x;
             var euY = eventUnit.y;        
             if (battleUnit && eventUnit && (battleUnit[0] === 'actor') && (battleUnit[1].isDead()) && (eventUnit._hasGrave === false)) {   
                 var actorID = battleUnit[1]._actorId;
                 var enemyID = 0;
                 var unitID = 0;
                 var graveEID = 0;
                 var graveDataEID = $gameTemp.importActorGraveEID(actorID);
                 var relatedGrave = $gameMap.event($gameTemp.actorGrave(actorID));
                 if (relatedGrave && (relatedGrave._erased === true)) {
                     relatedGrave.reSpawnGrave(); break;
                 }
                 $gameMap.addGrave(graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY);                    
             }       
        };   
    };

    //this checks if the BattleUnit is death and spawns the related enemyGrave 
    // on Enemys also the "EnemyUnitID" get added in order to fit with the related alive EnemyUnit
    // "EnemyUnitID" is used to give enemyClones an own ID (all clones have the same Enemy ID) 

    Game_Temp.prototype.spawnEnemyGrave = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleUnit = $gameSystem.EventToUnit([i]);
             var eventUnit = $gameMap.event([i]);
             var euX = eventUnit.x;
             var euY = eventUnit.y;         
             if (battleUnit && eventUnit && (battleUnit[0] === 'enemy') && (battleUnit[1].isDead()) && (eventUnit._hasGrave === false)) {  
                 var enemyID = battleUnit[1]._enemyId;
                 var actorID = 0;
                 var graveEID = 0;
                 var graveDataEID = $gameTemp.importEnemyGraveEID(enemyID);
                 var unitID = eventUnit._eventEnemyUnitId;
                 var relatedGrave = $gameMap.event($gameTemp.enemyGrave(unitID));
                 if ((relatedGrave) && (relatedGrave._graveUnitID === unitID) && (relatedGrave._erased === true)) {
                      relatedGrave.reSpawnGrave(); break;
                 }
                 $gameMap.addGrave(graveEID, graveDataEID, actorID, enemyID, unitID, euX, euY);     
             }              
        };    
    };

//----------------------------	
// Unspawn Actor&Enemy Graves:	
//----------------------------

    //example scritcall: "$gameSystem.eraseAllActorGraves()"
    Game_Temp.prototype.eraseAllActorGraves = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleUnit = $gameSystem.EventToUnit([i]);
             var eventUnit = $gameMap.event([i]);        
             if (battleUnit && eventUnit && (battleUnit[0] === 'actor') && (!battleUnit[1].isDead())) {  
                 var actorID = battleUnit[1]._actorId;
                 var relatedGrave = $gameMap.event($gameTemp.actorGrave(actorID));
                 if (relatedGrave && (relatedGrave._erased === false)) {
                     relatedGrave._isErased;return true;
                 }
             };
        };
    };

    //unspawn single ActorGrave by actorId  "$gameSystem.eraseActorGrave(actorID)"
    Game_Temp.prototype.eraseActorGrave = function(actor) {
        var actorID = actor;
	var relatedGrave = $gameMap.event($gameTemp.actorGrave(actorID));
        if (relatedGrave && (relatedGrave._erased === false)) {
            relatedGrave.eraseGrave();return true;
        }	    
    };

    //example scritcall: "$gameSystem.eraseAllEnemyGraves()"
    Game_Temp.prototype.eraseAllEnemyGraves = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleUnit = $gameSystem.EventToUnit([i]);
             var eventUnit = $gameMap.event([i]);        
             if (battleUnit && eventUnit && (battleUnit[0] === 'enemy') && (!battleUnit[1].isDead())) {  
                 var unitID = eventUnit._eventEnemyUnitId;
                 var relatedGrave = $gameMap.event($gameTemp.enemyGrave(unitID));
                 if (relatedGrave && (relatedGrave._erased === false)) {
                     relatedGrave.eraseGrave();return true;
                 }
             };
        };
    };

    //unspawn singel EnemyGrave by unitId "$gameSystem.eraseEnemyGrave(unitID)"
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

// "this.unitRaise(eventID)"
Game_Interpreter.prototype.unitRaise = function(eventId) {
    var eventID = eventId;
    var battleUnit = $gameSystem.EventToUnit(eventID);
    var eventUnit = $gameMap.event(eventID);
    var unitID = eventUnit._eventEnemyUnitId;
    var actorID = battleUnit[1]._actorId;
    if (battleUnit && (battleUnit[0] === 'actor')) {$gameSystem.eraseActorGrave(actorID)};
    if (battleUnit && (battleUnit[0] === 'enemy')) {$gameSystem.eraseEnemyGrave(unitID)};
    this.unitRevive(EventID);
};

// "this.unitRaise(eventID)"
Game_Interpreter.prototype.allActorsRaise = function() {
    $gameMap.events().forEach(function(event) {
         if (event.isType() === 'actor') {
             eventID = event.eventId();    
             var battleUnit = $gameSystem.EventToUnit(eventID);
             var actorID = battleUnit[1]._actorId;
             $gameSystem.eraseActorGrave(actorID);
             this.unitRevive(EventID);
         };
    });
};

// "this.allEnemysRaise"
Game_Interpreter.prototype.allEnemysRaise = function() {
    $gameMap.events().forEach(function(event) {
         if (event.isType() === 'enemy') {
             eventID = event.eventId();    
             var battleUnit = $gameSystem.EventToUnit(eventID);
             var unitID = $gameMap.event(eventID)._eventEnemyUnitId;
             $gameSystem.eraseEnemyGrave(unitID);
             this.unitRevive(EventID);
         };
    });
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
     
    // overwrite Battlestart Event calling Function 
    Game_System.prototype.runBattleStartEvent = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'battleStart') {
                if (event.pageIndex() >= 0) event.start();
                    $gameTemp.pushSrpgEventList(event);
                
            }
        });

        //Dopan INFO=> stuff above is default content, stuff below initializes at Battlestart
        $gameTemp.importEnemyUnitID();$gameMap.setEnemytUnitID();
    };
	
    // perma check if dead & if needGraveRespawn
    Game_System.prototype.anyUnitDead = function() {
        var anyUnitDead = false;
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);
             if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy')) {                  
                 if ((battleunit[1].isDead()) && (eventunit._erased === true)) { 
                      if (eventunit._hasGrave === true) {
                           if (battleunit && eventunit && (battleunit[0] === 'actor')) {
                               var actorID = battleUnit[1]._actorId;
                               var relatedActorGrave = $gameMap.event($gameTemp.actorGrave(actorID));
                               if (relatedActorGrave._erased === true) {
                                   relatedActorGrave._erased = false;
                               } 
                           }
                           if (battleunit && eventunit && (battleunit[0] === 'enemy')) {
                               var enemyUnit = eventunit._eventEnemyUnitId;
                               var relatedEnemyGrave = $gameMap.event($gameTemp.enemyGrave(enemyUnit));
                               if (relatedEnemyGrave._erased === true) {
                                   relatedEnemyGrave._erased = false;
                               } 
                           }
                      }
                      if (eventunit._hasGrave === false) {anyUnitDead = true};
                 }
             }
        }
        return anyUnitDead; 
    };  
      
    // trigger function (spawn graves)        
    Game_System.prototype.startGraveSpawn = function() {
        var startGraveSpawn = false;  
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleUnit = $gameSystem.EventToUnit([i]);
             var eventUnit = $gameMap.event([i]);
             if (battleUnit && eventUnit && (battleUnit[0] === 'actor' || battleUnit[0] === 'enemy') && (battleUnit[1].isDead())) { 
                 var enemyUnitID = eventUnit._eventEnemyUnitId;
                 var actorUnitID = battleUnit[1]._actorId;
                 if (battleUnit && eventUnit && (battleUnit[0] === 'actor') && (battleUnit[1].isDead())) { 
                     var relatedActorGrave = $gameMap.event($gameTemp.actorGrave(actorUnitID));
                     if (relatedActorGrave) {eventUnit._hasGrave = true}; 
                     if (!relatedActorGrave) {$gameTemp.spawnActorGrave();eventUnit._hasGrave = true;startGraveSpawn = true}; 
                 }
                 if (battleUnit && eventUnit && (battleUnit[0] === 'enemy') && (battleUnit[1].isDead())) { 
                     var relatedEnemyGrave = $gameMap.event($gameTemp.enemyGrave(enemyUnitID));
                     if (relatedEnemyGrave) {eventUnit._hasGrave = true};  
                     if (!relatedEnemyGrave) {$gameTemp.spawnEnemyGrave();eventUnit._hasGrave = true;startGraveSpawn = true};
                 }
             }
        }   
        if (_updateSwitch = false) {_updateSwitch === true};return startGraveSpawn;          
    };

//-----------------------------------------------------------------------------------------
// Scene Map (Event after Action) --------------------------- this.srpgBattlerDeadAfterBattle(); 
//-----------------------------------------------------------------------------------------
    // -> "SRPG_SceneMap_update"  
    // trigger Plugin
    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SRPG_SceneMap_update.call(this);
        if (SceneManager._scene instanceof Scene_Map === true) { 
            if (_updateSwitch === true) {
                if ($gameSystem.anyUnitDead() === true) {$gameSystem.startGraveSpawn()}
            };
            if (_updateSwitch = true) {
                _updateSwitch === false;
            };
        };
    };

//-----------------------------------------------------------------------------------------  
 
//--End:

})();