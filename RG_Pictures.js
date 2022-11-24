//=============================================================================
// RG_Pictures.js
//=============================================================================
/*:
 * @plugindesc v1.1 Adds <RG_Pictures> Display & Fix Imgs on RegionId Tile
 * @author dopan
 *
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
 * And this plugin offers a few other related Scrptcalls
 *
 *
 *
 *
 * Plugin Scriptcalls: ( i recommend to try out the first 8 scripts in console F8 to see what they do )
 * =========================
 *
 * $mapRegion.setPicZ(number);    # leave blank to return the Z anchor of Pics, or add number to change the anchor
 *
 * $mapRegion.setRegionPicZ(number); # leave blank to return the Z anchor of RegionPics, or add number to change the anchor
 *
 * $mapRegion.setMaxPics(number);   # leave blank to return the MaxPics Amount, or add number to change the Amount
 *
 * $mapRegion.region(regionNr);  # returns "MapRegion_Tile" from regionList, starts with 0 (sidenote:thats not the regionId)
 *
 * $mapRegion.imgVisible(regionNr, value); # returns opacity, if value is added change opacity (value can be from 0 to 255)
 *
 * $mapRegion.listVisible(value, regionId); # set opacity of all region_imgs based on regionId (all regions if regionId = 0) 
 *
 * $mapRegion.rgList();        # returns the "MapRegion_Tile"-list of regions that are set/active on map
 *
 * $mapRegion.touchEvents(regionId); # returns a list of all events that are on this region Id
 *
 * $mapRegion.regionXY(x, y); # return the Region Nr if there is an region on xy else returns -1
 *
 * =========================
 *
 * $gameMap.event(eventId).mapRegion() # returns the Region Nr if there is an region on event Location xy else returns -1
 *
 * $gameMap.event(eventId).regionId() # if there is an region on events position xy, return the regionId else 0
 *
 * # sideNote: these 2 event data above are also added to the event by this plugin #
 *
 * #'default rpg maker script below
 *
 * $gameMap.regionId(x, y); # returns the regionId if there is an region on this xy mapLocation else 0
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
 * Version 1.1:
 * - first Release 22.11.2022 for SRPG (rpg mv)!
 * - bug fixed and added some data to events
 */

 "use strict";
 var $mapRegion = ['Global Object'];
 var MapRegion_Tile = ['MapRegion_Tile'];
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("RG_Pictures") ||
  $plugins.filter(function (plugin) {return plugin.description.contains('<RG_Pictures>')});

  var _reloaded = 'false'; 
  var _preFix = (parameters['Prefix Name'] || "mark");
  var _maxPic = Number(parameters['Max Pictures'] || 100);
  var _picZ = Number(parameters['PicZ'] || 9.5);
  var _regionPicZ = Number(parameters['RegionPicZ'] || 0);

//============================================================================

    var old_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        old_createGameObjects.call(this);
       $mapRegion = new RG_Pictures();
    };

    function RG_Pictures() { 
       this.initialize.apply(this, arguments);
    };

    RG_Pictures.prototype.initialize = function() {

    };

    function MapRegion_Tile() { 
       this.initialize.apply(this, arguments);
    };

    MapRegion_Tile.prototype.initialize = function(Id, regionX, regionY, regionSX, regionSY, n) {
       this._Id = Id;
       this._x = regionX;
       this._y = regionY;
       this._sx = regionSX;
       this._sy = regionSY;
       this._Nr = n;
       this._picId = 0;
    }

    //$mapRegion.setPicZ(number);  
    RG_Pictures.prototype.setPicZ = function(number) {
       if (number) _picZ = Number(number);
       return _picZ; 
    };

    //$mapRegion.setRegionPicZ(number);  
    RG_Pictures.prototype.setRegionPicZ = function(number) {
       if (number) _regionPicZ = Number(number); 
       return _regionPicZ; 
    };

    //$mapRegion.setMaxPics(number);  
    RG_Pictures.prototype.setMaxPics = function(number) {
       if (number) _maxPic = Number(number); 
       return _maxPic; 
    };

    //$mapRegion.initRgList()  $mapRegion._rgList
    RG_Pictures.prototype.initRgList = function() {
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
    RG_Pictures.prototype.region = function(regionNr) {
       return this._rgList[regionNr];
    };    

    //$mapRegion.imgVisible(regionNr, value);
    RG_Pictures.prototype.imgVisible = function(regionNr, value) {
       var id = this._rgList[regionNr]._picId; 
       if (value => 0 && value <= 255) $gameScreen.picture(id)._opacity = value;
       return $gameScreen.picture(id)._opacity;
    }; 

    //$mapRegion.listVisible(value, regionId);
    RG_Pictures.prototype.listVisible = function(value, regionId) {
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
    RG_Pictures.prototype.rgList = function() {
       return this._rgList;
    };

    //returns list of all events that Touch region with "id"
    RG_Pictures.prototype.touchEvents = function(regionId) {
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
    RG_Pictures.prototype.rgSetImg = function(regionId, imgName, top) {
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
    RG_Pictures.prototype.clearRegionImg = function(regionId, top) {
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
    RG_Pictures.prototype.rgSetSelfSwitch = function(regionId, letters, value) {
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
    RG_Pictures.prototype.regionXY = function(x, y) { 
       var region = -1;
       $mapRegion.rgList().forEach(function(element) {
           var regionX = element._x;
           var regionY = element._y;
           if ((x === regionX) && (y === regionY)) region = element._Nr;
       });
       return region;
    };

    var _GameMap_Setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _GameMap_Setup.call(this, mapId);
        $mapRegion.initRgList();
    };

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

// update sceneMap, extraContainer reload & debug 
//-------------------------------------------------
     var _SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
         _SceneMap_update.call(this);
         var spritChildPC = $mapRegion.spritSetMap._pictureContainer.children;
         if ($gameScreen.nextPicId() > 1 && spritChildPC[0].picture() && _reloaded === 'false') {
             $mapRegion.createContainers();
         _reloaded = 'true';
         }; 
     };     

// New Picture Container Function, sorts Pictures to Containers ( = different Z anchors)
//--------------------------------------------------------------------------------------   
  RG_Pictures.prototype.createContainers = function() {
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

      var _GamePicture_initTarget = Game_Picture.prototype.initTarget;
      Game_Picture.prototype.initTarget = function() {
          _GamePicture_initTarget.call(this);
          this._regionId = 0;
          this._zAnchor = 'normal';
      };

      // add data
      var _Game_event_ini = Game_Event.prototype.initialize;
      Game_Event.prototype.initialize = function(mapId, eventId) {
          _Game_event_ini.call(this, mapId, eventId);
           this._regionId = $gameMap.regionId(this.x, this.y);
           this._mapRegion = -1;
      };

      Game_Event.prototype.regionId = function() {
          this._regionId = $gameMap.regionId(this.x, this.y);
          return this._regionId;
      };

      Game_Event.prototype.mapRegion = function() {
          this._mapRegion = $mapRegion.regionXY(this.x, this.y);
          return this._mapRegion;
      };

//-----------------------------------------------------------------------------------------


//--End:

})();
