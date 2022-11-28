//=============================================================================
// SRPG_RG_Effects.js
//=============================================================================
/*:
 * @plugindesc v1.2 <SRPG_RG_Effects> SRPG Extended Version of "RG_Pictures.js"
 * @author dopan
 *
 *
 * @param Region Info Picture Active
 * @desc true or false, can be changed with script aswell. 
 * @type boolean
 * @default false
 *
 * @param Info Picture ScreenX
 * @desc ScreenX data of Region Info Picture. Default is 102
 * @type number
 * @default 102
 *
 * @param Info Picture ScreenY
 * @desc ScreenY data of Region Info Picture. Default is 101
 * @type number
 * @default 101
 * 
 * @param PicZ
 * @desc This Number is the z anchor of all normal Pics. Default is 9.5 
 * @type number
 * @default 9.5
 * 
 *
 * @param RegionPicZ
 * @desc This Number is the z anchor of all Region Pics. Default is 0 
 * @type number
 * @default 0
 *
 *
 * @param Max Pictures
 * @desc This Number is the Amount of Max Pictures. Default is 100 
 * @type number
 * @default 100
 *
 *
 * @param Prefix Name
 * @desc The first part of the Img name, to set this Img Fixed on Map (default => mark)
 * @default mark
 *
 * @help  
 *              (Compatiblety Info)
 *
 * If using "SRPG_ArrowSelectDirection" or "SRPG_MoveAfterAction", 
 * place this Plugin somewhere below these 2 others
 *
 *                (Introduction)
 *
 * This plugin can Display fixed Pictures on Regions, 
 * that happens related to the regionId and region xy position.
 *
 * It also offers the option to fix normal Pictures on map, 
 * (region pictures dont need the img prefix, but it wont harm if using it)
 *
 * There are 2 "Z Anchor" Options for Pictures, which can be changed via param and scriptcall
 * (even if i recommend the default anchor setup)
 * => by default one is the normal Pic Z Anchor, the other is the region Pic Z Anchor
 *
 *
 * Max Pics (rpg maker default is 100) can be changed via param and scriptcall
 *
 * SelfSwitches of all events can be set related to regionId & location of events
 *
 * A script can return a list of all events that are located on a regionId
 *
 * Also pictures get data about their regionId location & Z anchor
 *
 * There is a script that returns the next free picture id
 *
 * And this plugin offers a few other related Scrptcalls..
 * ==========================================================================
 * Pls Note, this Plugin is the SRPG Extension Version of my "RG_Pictures.js"
 * Its basicly the same Plugin but it has extra Code added vor SRPG purposes
 * (so incase you used "RG_Pictures.js" , you should remove "RG_Pictures.js")
 * ==========================================================================
 * 
 * - first srpg related addon is "stateRegion", uses "State is addable" data,
 *   of units to decide which unit will run script of "eval-notetag" on regions
 *   
 * - second srpg related addon is "region-InfoPicture", if activated, this shows a
 *   Picture  whenever the $gamePlayer is on this region.
 *   (in srpg battle the $gamePlayer is the Cursor)
 *  -> this img is supposed to be the description Picture for this regionId
 *
 *
 *
 * region-InfoPicture: 
 * ===================
 *
 * You need an img for each region which should display an Info Picture.
 * these imgs should be located in your "pictures" folder.
 *
 * The names of these Imgs MUST be correct! Examples below:
 *
 * 1RGinfo.png        # this Img will be used on regionId_1
 *
 * 2RGinfo.png        # this Img will be used on regionId_2
 *
 * sidenote: if using region with Id 155 , the name would be => 155RGinfo.png
 *
 * (its always first the Id Number and than "RGinfo.png")
 *
 *
 * =================
 * Map NoteTags: 
 * =================
 *
 * <RGinfo:regionId,regionId,ect>  # regionId is the id of regions that show "region-InfoPicture"
 *                                 # if regionId = 0 that means all mapRegions show "region-InfoPicture"
 *
 * EXAMPLES:
 *
 *       <RGinfo:1,2,3>          # mapRegions with regionId 1,2 and 3 will show "region-InfoPicture" 
 *
 *       <RGinfo:0>              # all mapRegions will show "region-InfoPicture" 
 *
 *
 * =========================
 * State NoteTags: 
 * =========================
 * Following NoteTags should be used together:
 *
 * "RGstateRegion": adds Region Ids that will be affected if this State is "addable" on this Battler.
 * The state wont be added by default, it works just as requirement, so if battlers should not be
 * affected, they only need state protection against this State.
 * "RGeval:script": runs a script on all Units that are Located on the Regions, if State is "addable".
 *
 * <RGstateRegion:regionId,regionId,ect>  # regionId is the number Id of the region, if 0 its all regions
 *
 * <RGeval:script>          # script , is the script that is executed
 *
 *
 * EXAMPLES:
 *
 * <RGstateRegion:1,2>  # region with Id 1 & 2 will be used (if Id = 0 its all regions)
 *
 * <RGeval:this.event().requestAnimation(133);this.gainHp(-50);this.startDamagePopup()>  # runs script
 *
 * The example script above means "playAnimation 133, remove 50hp, startDmgPopUp" ..
 * .. in this script the battlerUnit is always "this".
 *
 * more script examples that can be used:
 * ======================================
 *
 * this.addState(stateId);             # adds state (stateId must be added)
 *
 * this.removeState(stateId);          # removes state (stateId must be added)
 *
 * this.gainHp(number);                # add/remove Hp, if negative number => remove (number must be added)
 *
 * this.gainMp(number);                # add/remove Mp, if negative number => remove (number must be added)
 *
 * this.gainTp(number);                # add/remove Tp, if negative number => remove (number must be added)
 *
 * this.event().requestAnimation(Id);  # battlersEvent plays Animation (animationId must be added)
 *
 * this.startDamagePopup();            # runs the code to start dmgPopUp should be used after "gainHp"
 *
 * => basicly you can use any script that works on battler,..
 *
 *
 * =========================
 * Plugin Scriptcalls: ( i recommend to try out the first 8 scripts in console F8 to see what they do )
 * =========================
 *
 * $mapRegion.setPicZ(number);       # leave blank to return the Z anchor of Pics, or add number to change the anchor
 *
 * $mapRegion.setRegionPicZ(number); # leave blank to return the Z anchor of RegionPics, or add number to change the anchor
 *
 * $mapRegion.setMaxPics(number);    # leave blank to return the MaxPics Amount, or add number to change the Amount
 *
 * $mapRegion.region(regionNr);  # returns "MapRegion_Tile" from regionList, starts with 0 (sidenote:thats not the regionId)
 *
 * $mapRegion.imgVisible(regionNr, value); # returns opacity, if value is added change opacity (value can be from 0 to 255)
 *
 * $mapRegion.listVisible(value, regionId); # set opacity of all region_imgs based on regionId (all regions if regionId = 0) 
 *
 * $mapRegion.rgList();              # returns the "MapRegion_Tile"-list of regions that are set/active on map
 *
 * $mapRegion.touchEvents(regionId); # returns a list of all events that are on this region Id
 *
 * $mapRegion.regionXY(x, y);        # return the Region Nr if there is an region on xy else returns -1
 *
 * =========================
 *
 * $mapRegion._infoActive;          # returns if "region-InfoPicture" is activated
 * 
 * $mapRegion._infoActive = false;  # set true or false to activate or deactivate "region-InfoPicture"
 *
 * =========================
 * $gameMap.event(eventId).mapRegion(); # returns the "Region Nr" if there is an region on eventLocation_xy else returns -1
 *
 * $gameMap.event(eventId).regionId()   # if there is an region on eventLocation_xy, return the regionId else 0
 *
 * # sideNote: these 2 event data above are also added to the event by this plugin #
 *
 * #'default rpg maker script below:
 *
 * $gameMap.regionId(x, y); # returns the regionId if there is a region on this xy mapLocation else 0
 *
 * $gamePlayer.regionId();  # returns the regionId if there is a region at $gamePlayer location else 0
 *
 * =========================
 *
 * $gameScreen.nextPicId(); # returns the number of the next free picture Id
 *
 * =========================
 *
 * $mapRegion.rgSetImg(regionId, imgName, top); # set region Pic,if top = true,"PicZ" anchor is used, else "RegionPicZ"
 *
 * examples: 
 *           $mapRegion.rgSetImg(1, "markBurned");       # img is on "RegionPicZ" anchor
 *           $mapRegion.rgSetImg(1, "markBurned", true); # img is on "PicZ" anchor
 *
 * =========================
 *
 * $mapRegion.clearRegionImg(regionId, top); # clear all pics on this regionId, if regionId = 0 , its all regions
 *
 * examples: 
 *           $mapRegion.clearRegionImg(0);       # clears all regions Pics that use "RegionPicZ" anchor
 *           $mapRegion.clearRegionImg(0, top);  # clears all regions Pics that use "PicZ" anchor
 *           $mapRegion.clearRegionImg(1);       # clears all region_Id_1 Pics that use "RegionPicZ" anchor
 *
 * =========================
 *
 * $mapRegion.rgSetSelfSwitch(regionId, letters, true); # set selfSwitch of events that are on this regionId
 * 
 * example: 
 *          $mapRegion.rgSetSelfSwitch(2, 'A', true);   # all events on this regionId set A to true
 *
 * =========================
 *
 * $gameScreen.setRegionImg(regionId, name, origin, scaleX, scaleY, opacity, blendMode, top);  # set region Pic
 *
 * # its basicly the same like "rgSetImg",but with all the options that normal "ShowPicture" script has #
 *
 * examples:
 *          $gameScreen.setRegionImg(2, "markWater", 1, 100, 100, 255, 0);       # use "RegionPicZ" anchor 
 *          $gameScreen.setRegionImg(2, "markWater", 1, 100, 100, 255, 0, true); # use "PicZ" anchor
 *
 *
 * =========================
 *
 * sideNote: i made 2 scripts to show picture, because i like the shorter script usage,..
 *           ..if i dont need all the other options.
 *          
 * =========================
 *
 *
 *
 * That below is what the Z Anchor Number in the param represent
 *
 * Z Anchor Info:
 * =========================
 *  0 : On tiles
 *  1 : Lower characters
 *  3 : Normal characters
 *  4 : Upper tiles
 *  5 : Upper characters
 *  6 : Airship shadow
 *  7 : Balloon
 *  8 : Animation
 *  9 : Destination
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
 * Version 1.2:
 * - first Release 22.11.2022 for SRPG (rpg mv)!
 * - bug fixed and added some data to events
 * - SRPG Extended plugin Version
 */

 "use strict";
 var $mapRegion = ['Global Object'];
 var MapRegion_Tile = ['MapRegion_Tile'];

(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_RG_Effects") ||
  $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_RG_Effects>')});

  var _reloaded = 'false'; 
  var _rgInfoActive = (parameters['Region Info Picture Active'] || false);
  var _preFix = (parameters['Prefix Name'] || "mark");
  var _maxPic = Number(parameters['Max Pictures'] || 100);
  var _picZ = Number(parameters['PicZ'] || 9.5);
  var _regionPicZ = Number(parameters['RegionPicZ'] || 0);
  var _infoPicX = Number(parameters['Info Picture ScreenX'] || 102);
  var _infoPicY = Number(parameters['Info Picture ScreenY'] || 101);

//============================================================================

    var old_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        old_createGameObjects.call(this);
       $mapRegion = new RG_Effects();
    };

    function RG_Effects() { 
       this.initialize.apply(this, arguments);
    };

    RG_Effects.prototype.initialize = function() {
      this._infoActive = _rgInfoActive;
    };

 //---------------------------------------------- MapRegion_Tile:
    function MapRegion_Tile() { 
       this.initialize.apply(this, arguments);
    };

    // init MapRegion_Tiles
    MapRegion_Tile.prototype.initialize = function(Id, regionX, regionY, regionSX, regionSY, n) {
       this._Id = Id;
       this._x = regionX;
       this._y = regionY;
       this._sx = regionSX;
       this._sy = regionSY;
       this._Nr = n;
       this._picId = 0;
    }
 //---------------------------------------------- MapRegion_Tile End

    //$mapRegion.setPicZ(number);  
    RG_Effects.prototype.setPicZ = function(number) {
       if (number) _picZ = Number(number);
       return _picZ; 
    };

    //$mapRegion.setRegionPicZ(number);  
    RG_Effects.prototype.setRegionPicZ = function(number) {
       if (number) _regionPicZ = Number(number); 
       return _regionPicZ; 
    };

    //$mapRegion.setMaxPics(number);  
    RG_Effects.prototype.setMaxPics = function(number) {
       if (number) _maxPic = Number(number); 
       return _maxPic; 
    };

    //$mapRegion.initRgList()  $mapRegion._rgList
    RG_Effects.prototype.initRgList = function() {
       this._rgList = [];
       var list = [];
       var tw = $gameMap.tileWidth();
       var th = $gameMap.tileHeight(); 
       var mW = $gameMap.width();
       var mH = $gameMap.height();
       for (var r = 1; r <= 255; r++) { 
            for (var x = 0; x < mW; x++) {
                 for (var y = 0; y < mH; y++) {
                      if ($gameMap.regionId(x, y) === r) {                     
                          var data = [x, y];
                          list.push([r, data]);
                          this._rgList.push([r]); 
                          for (var n = 0; n < this._rgList.length; n++) {
                              var Id = list[n][0];                      
                              var regionX = list[n][1][0];
                              var regionY = list[n][1][1];
                              var regionSX = Math.round(regionX * tw + tw / 2);
                              var regionSY = Math.round(regionY * th + th / 2);
                              this._rgList[n] = new MapRegion_Tile(Id, regionX, regionY, regionSX, regionSY, n);
                          } 
                      }
                 }
            }
       }  
    };   

    //$mapRegion.region(regionNr);
    RG_Effects.prototype.region = function(regionNr) {
       return this._rgList[regionNr];
    };    

    //$mapRegion.imgVisible(regionNr, value);
    RG_Effects.prototype.imgVisible = function(regionNr, value) {
       var id = this._rgList[regionNr]._picId; 
       if (value => 0 && value <= 255) $gameScreen.picture(id)._opacity = value;
       return $gameScreen.picture(id)._opacity;
    }; 

    //$mapRegion.listVisible(value, regionId);
    RG_Effects.prototype.listVisible = function(value, regionId) {
       this.rgList().forEach(function(element) {
            var picId = element._picId;
            if (regionId === 0 && (value => 0 && value <= 255)) $gameScreen.picture(picId)._opacity = value;
            if (regionId > 0 && regionId < 256 && element._Id === regionId) {
                if (value => 0 && value <= 255) $gameScreen.picture(picId)._opacity = value;
            };
       });
    if (regionId => 0 && (value => 0 && value <= 255)) return value;
    return false;
    };

    //$mapRegion.rgList(); 
    RG_Effects.prototype.rgList = function() {
       return this._rgList;
    };

    //$mapRegion.touchEvents(regionId); (returns list of all events that Touch region with "id")
    RG_Effects.prototype.touchEvents = function(regionId) {
       var list = [];
       for (var r = 0; r < this._rgList.length; r++) {
            var x = this._rgList[r]._x;
            var y = this._rgList[r]._y;
            var rId = this._rgList[r].rId;
            if ($gameMap.eventsXy(x, y).length > 0  && regionId === rId) {
                list.push($gameMap.eventsXy(x, y));
            };
       };
       return list;
    };

    //$mapRegion.rgSetImg(1, "markBurned")
    RG_Effects.prototype.rgSetImg = function(regionId, imgName, top) {
       this.rgList().forEach(function(element) { 
       var sx = element._sx;
       var sy = element._sy; 
       var pictureId = 1;
       if ($gameScreen._pictures.length > 1) pictureId = $gameScreen._pictures.length;
           if (sx && sy && imgName && regionId && regionId === element._Id & element._picId === 0) {
               $gameScreen.showPicture(pictureId, imgName, 1, sx, sy, 100, 100, 255, 0);
               if (top) {
                   $gameScreen.picture(pictureId)._zAnchor = 'top';
               };
               $gameScreen.picture(pictureId)._regionId = regionId;
               element._picId = pictureId;
           };
       }); 
    };

    //$mapRegion.clearRegionImg(regionId, top);
    RG_Effects.prototype.clearRegionImg = function(regionId, top) {
        this.rgList().forEach(function(element) { 
            var anchor = $gameScreen.picture(element._picId)._zAnchor;
            var pictureId = element._picId;
            var realPictureId = $gameScreen.realPictureId(pictureId);
            if (top && anchor === 'top') {  
                if (element._Id === regionId && regionId > 0) {
                    $gameScreen._pictures[realPictureId] = null;
                    element._picId = 0;
                };
                if (regionId === 0) {
                    $gameScreen._pictures[realPictureId] = null;
                    element._picId = 0;
                }; 
            };
            if (!top && anchor === 'normal') { 
                if (element._Id === regionId && regionId > 0) {
                    $gameScreen._pictures[realPictureId] = null;
                    element._picId = 0;
                };
                if (regionId === 0) {
                    $gameScreen._pictures[realPictureId] = null;
                    element._picId = 0;
                };    
            };     
        }); 
    };

    //$mapRegion.rgSetSelfSwitch(2, 'A', true) 
    RG_Effects.prototype.rgSetSelfSwitch = function(regionId, letters, value) {
        var length = this.touchEvents.length;
        if (this.touchEvents.length > 0) {
            for (var e = 0; e <= this._rgList.length; e++) {
                 if (this.touchEvents(regionId)[e] !== undefined) {
                     var eventId = this.touchEvents(regionId)[e][0]._eventId;
                     $gameSelfSwitches.setValue([this._mapId, eventId, letters], value);
                 };
            };
        };
    };

    //$mapRegion.regionXY(7, 17); 
    RG_Effects.prototype.regionXY = function(x, y) { 
       var region = -1;
       $mapRegion.rgList().forEach(function(element) {
           var regionX = element._x;
           var regionY = element._y;
           if ((x === regionX) && (y === regionY)) region = element._Nr;
       });
       return region;
    };

    //$mapRegion.RGdataInfo(note, regionId);
    RG_Effects.prototype.RGdataInfo = function(note, regionId) {  
      var meta = note;
      if (meta === "0") return Number(meta);
      var region = regionId;
      var length = meta.length;
      var tagData = "";
      var tag = 0;
      for (var mData = 0; mData < length; mData++) {
           var metaRid = meta[mData];
           if (metaRid !== " ") {
               if (metaRid !== ",") {
                   if (tag === 0) {
                       tag = metaRid + tagData;
                   } else {
                       var oldTag = tag + tagData;
                       tag = metaRid + oldTag;
                   };
               };
               if (metaRid === ",") {
                   if (Number(tag) === region) return region; 
                   if (Number(tag) !== region) tag = 0;
               };
               if (mData === (length - 1)) {
                   if (Number(tag) === region) return region;
                   if (Number(tag) !== region) tag = 0;
               };
           };
      };
    return false
    };

    // clear the info img
    RG_Effects.prototype.infoClear = function() { 
      if ($gameScreen.picture(_maxPic) && $gameScreen.picture(_maxPic)._regionId !== 0) {
          $gameScreen.erasePicture(_maxPic);
      };
    };

    // show info picture
    RG_Effects.prototype.infoActive = function() {  
      this._infoRegion = $gamePlayer.regionId();
      var name = Number(this._infoRegion) + "RGinfo"; 
      var pictureId = Number(_maxPic);
      var sx = _infoPicX; var sy = _infoPicY;
      $gameScreen.showPicture(pictureId, name, 1, sx, sy, 100, 100, 255, 0);
      $gameScreen.picture(pictureId)._regionId = name;
    };

    // New Picture Container Function, sorts Pictures to Containers ( = different Z anchors)
    RG_Effects.prototype.createContainers = function() {
        if ($gameScreen.nextPicId() === 1) _reloaded = 'false'; 
        if ($gameScreen.nextPicId() > 1) {
            this._regionPicContainer = new Sprite();
            var pC = this.spritSetMap._pictureContainer;
            var rpC = this._regionPicContainer;
            var spritChildPC = pC.children;
            rpC.z = _regionPicZ; 
            var allPics = _maxPic - 1;
            for (var s = allPics;s > - 1;s--) { 
                 var spritPics = spritChildPC[s];
                 if (spritPics.picture() && spritPics.picture()._regionId > 0  && spritPics.picture()._zAnchor === 'normal') {
                     this.spritSetMap.removeChild(pC);
                     rpC.addChild(spritPics);
                     pC.removeChild(spritPics);
                     this.spritSetMap._tilemap.addChild(rpC);
                     this.spritSetMap.addChild(pC);
                 };     
            };   

        };
    };

    // update sceneMap
    //-------------------------------------------------
     var _SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
         _SceneMap_update.call(this);
         var note = $dataMap.meta.RGinfo;
         var regionId = $gamePlayer.regionId();
         var spritChildPC = $mapRegion.spritSetMap._pictureContainer.children;
         // reload pics
         if ($gameScreen.nextPicId() > 1 && spritChildPC[0].picture() && _reloaded === 'false') {
             $mapRegion.createContainers();
         _reloaded = 'true';
         }; 
         // compatiblety with "arrowSelectDirection.js" .. trigger "rgTurnEndEffect" after arrow usage
         if ($mapRegion._EffectEid && !$gameSystem._arrowUser) {
             var evId  = $mapRegion._EffectEid;
             $gameSystem.EventToUnit(evId)[1].rgTurnEndEffect();
             $mapRegion._EffectEid = undefined;
         }; 
         // handle RGinfo Picture
         if ($dataMap.meta.RGinfo) {
             if ($mapRegion._infoActive) {  
                 if ($mapRegion.RGdataInfo(note, regionId) && $gameSystem.isSubBattlePhase() !== 'actor_command_window' &&
                     $gameSystem.isSubBattlePhase() !== 'battle_window' && $gameSystem.isBattlePhase() === 'actor_phase') { 
                     if ($mapRegion._infoRegion) {
                         if ($mapRegion._infoRegion !== $gamePlayer.regionId()) { $mapRegion.infoActive() };
                     } else { $mapRegion.infoActive() }; 
                 } else { if ($gameScreen.picture(_maxPic)) $mapRegion.infoClear(); $mapRegion._infoRegion = false}; 
             };
         }; 
    };

    // (Spriteset_Map)  use default function chain to call new function & store data
    //-------------------------------------------------------------------------------
    void (function(alias) {
       Spriteset_Map.prototype.createPictures = function() {
                alias.apply(this, arguments);
                this._pictureContainer.z = _picZ;
                $mapRegion.spritSetMap = this;
                $mapRegion.createContainers();
       };
    })(Spriteset_Map.prototype.createPictures);

    // fix pictures to map
      var _Sprite_Pic_updatePosition = Sprite_Picture.prototype.updatePosition;
    Sprite_Picture.prototype.updatePosition = function() {
          var picture = this.picture();
          if (picture._regionId > 0 || ~picture.name().indexOf(_preFix)) { 
              var tileX = $gameMap.tileWidth();
              var tileY = $gameMap.tileHeight();
              this.x = (-tileX * $gameMap._displayX) + picture._x;
              this.y = (-tileY * $gameMap._displayY) + picture._y;      
          } else {_Sprite_Pic_updatePosition.call(this)};
    };

    // init  "$mapRegion.initRgList();"
    var _GameMap_Setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _GameMap_Setup.call(this, mapId);
        $mapRegion.initRgList();
    };

    //$gameScreen.maxPictures();
    Game_Screen.prototype.maxPictures = function() {
        return _maxPic;
    };

    //$gameScreen.nextPicId();
    Game_Screen.prototype.nextPicId = function() {
        var picId = 1;
        if (this._pictures.length > 1) picId = this._pictures.length;
    return picId;
    };

    // $gameScreen.setRegionImg(2, "markWater", 1, 100, 100, 255, 0)
    Game_Screen.prototype.setRegionImg = function(regionId, name, origin, scaleX, scaleY, opacity, blendMode, top) {
        $mapRegion.rgList().forEach(function(element) { 
        var sx = element._sx;
        var sy = element._sy; 
        var pictureId = 1;
        if ($gameScreen._pictures.length > 1) pictureId = $gameScreen._pictures.length;
            if (sx && sy && name && regionId && regionId === element._Id & element._picId === 0) {
                $gameScreen.showPicture(pictureId, name, origin, sx, sy, scaleX, scaleY, opacity, blendMode);
                if (top) {                    
                    $gameScreen.picture(pictureId)._zAnchor = 'top';
                };                
                $gameScreen.picture(pictureId)._regionId = regionId;
                element._picId = pictureId;

            };
        });                                              
    }; 

    // add data to Pictures
    var _GamePicture_initTarget = Game_Picture.prototype.initTarget;
    Game_Picture.prototype.initTarget = function() {
        _GamePicture_initTarget.call(this);
        this._regionId = 0;
        this._zAnchor = 'normal';
    };

    // add data to Events
    var _Game_event_ini = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_event_ini.call(this, mapId, eventId);
         this._regionId = $gameMap.regionId(this.x, this.y);
         this._mapRegion = -1;
    };

    // $gameMap.event(eventId).regionId();
    Game_Event.prototype.regionId = function() {
        this._regionId = $gameMap.regionId(this.x, this.y);
        return this._regionId;
    };

    // $gameMap.event(eventId).mapRegion();
    Game_Event.prototype.mapRegion = function() {
        this._mapRegion = $mapRegion.regionXY(this.x, this.y);
        return this._mapRegion;
    };
   
    // battler Turn End Effect on mapRegions
    Game_BattlerBase.prototype.rgTurnEndEffect = function() {
        var unitRGid = this.event().regionId();
        var mapRegion = this.event().mapRegion();
        this._rgEffectDone = mapRegion; 
        //#Check# StateNotes
        for (var ds = 1; ds < $dataStates.length; ds++) {
             var state = $dataStates[ds];
             // #Eval# NoteTags only affect battler if state is addable
             if (state.meta.RGstateRegion && state.meta.RGeval && this.isStateAddable(state.id)) {
                 // read data of State notetag "RGstateRegion"
                 var metaInfo = $mapRegion.RGdataInfo(state.meta.RGstateRegion, unitRGid);
                 if (metaInfo && metaInfo !== 0) {
                     eval(state.meta.RGeval);
                 };
                 // if Note is "0" means all regionIds are using eval
                 if (state.meta.RGstateRegion === "0") {
                     eval(state.meta.RGeval);
                 };
             };
        };
    //function from edited srpg core: needed incase any Unit dies from Turn End Effect
    if (this.isDeathStateAffected()) $gameTemp.noActionDeath();
    };

    // Timming for battler Turn End Effect
    var _setSrpgTurnEnd = Game_BattlerBase.prototype.setSrpgTurnEnd;
    Game_BattlerBase.prototype.setSrpgTurnEnd = function(flag) {
        _setSrpgTurnEnd.call(this, flag); 
        // trigger rgTurnEndEffect (State notetag related)
        var mapRegion = this.event().mapRegion();
        if (this._rgEffectDone === mapRegion) {
            this._rgEffectDone = false;
            return;
        } else {
            if (this._arrowUse) {
                $mapRegion._EffectEid = this.event()._eventId;
            return;
            };
            this.rgTurnEndEffect();
        };
    };

//-----------------------------------------------------------------------------------------

//--End:

})();
