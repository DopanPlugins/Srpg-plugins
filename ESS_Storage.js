//=============================================================================
// ESS_Storage.js
//=============================================================================
/*:
 * @plugindesc v1.0 <ESS_Storage> Store SelfSwitch Data in Events
 * @author dopan
 *
 *
 *
 * @help  
 *  -------------Introduction: (pls note this plugin safes its main data Object)
 *
 * 
 * By default can only get/change value by using the "$gameSelfSwitches"-Scriptcalls
 * Also the "$gameSelfSwitches._data" stores only SelfSwitches that are "true",
 * and removes anything else,..(so that reading that data directly can often return "undefined")
 *
 * This plugin adds selfswitch data directly to Events, and it gives us options
 * to know the data of all selfSwitches from maps that allready have been visited.
 * 
 * -> I didnt add data from "dataMaps" because we know the default data from our maps setup anyway) 
 * ("dataMaps" means in this context , maps that dont have been visited yet by the gamePlayer)
 *
 * With this plugin we can even change the data , by using the "$gamemap.event(eventId)"
 *
 * EXAMPLE: $gamemap.event(eventId)._SelfSwitch['A'] = true; $gameMap.requestRefresh();
 *
 * -> in such case, if we DONT add "$gameMap.requestRefresh();" 
 * ..the Event wont know that the data has changed, till any other event was activated/started afterwards..
 * (in some cases this might be helpfull if we want a delay till any other event was activated/started)
 *
 *
 * And of course we can still use the default "$gameSelfSwitches"-Scriptcalls
 *   (with "setValue" the $gameMap.requestRefresh() is already triggered)
 *
 * This plugin also adds a "$ESS.BOX" which can be used in condsole F8 to see all stored selfSwitch data
 * 
 * And this plugin adds a few scriptcall to easier manipulate selfSwitch data
 *
 * It doesnt add more SelfSwitches and its probably not fully compatible with plugins that add more selfSwitches
 * -> from my point of view, more selfswitches are not required anyway.. 
 * (because we can use $gameSwitches & $gameVariables as conditions for everything)
 *
 * => But if you have a fixed amount of more SelfSwitches you could edit the plugin,
 *    to make it fully compatible..  That should not be difficult,
 *    aslong you know any extra Selfswitch name like "E"or"F" that is added to your project.. 
 *
 * ==================================================================================================
 *
 *
 *
 * Scriptcalls: ->  insert "mapId" & "eventId" & 'A' or 'B'  ect
 * -------------
 * 
 * # same as "setValue" of $gameSelfSwitches, use true or false
 *
 * $gamemap.event(eventId)._SelfSwitch['A'] = true; $gameMap.requestRefresh(); # set value
 *
 * # same as asking about "value" of $gameSelfSwitches
 *
 * $gamemap.event(eventId)._SelfSwitch['A'];        # returns "true" or "false" 
 * 
 * # Event SelfSwitch, try in console F8
 *
 * $gamemap.event(eventId)._SelfSwitch;             # returns Event SelfSwitch Storage,
 *
 *
 * default rpg maker scriptcalls:
 * --------------------------------
 * --------------------------------
 * # "Default $gameSelfSwitches-Scriptcalls": 
 *
 * # read SelfSwitches Value: -> this returns always "true" or "false"
 *
 * $gameSelfSwitches.value([mapId, eventId, 'A']); 
 *
 * # on "setValue" insert "value" in addittion, => "true" or "false"
 *
 * $gameSelfSwitches.setValue([mapId, eventId, 'A'], value); 
 *
 * #Script to set value of SelfSwitch 'A' to several events to "true"
 *
 * example:
 *   
 * [1, 2, 4, 7].forEach(function(evId) {$gameSelfSwitches.setValue([$gameMap._mapId, evId, 'A'], true)});
 *
 *
 * #here the numbers are the eventIds, "$gameMap._mapId" is current mapId, 'A' is selfswitch , value is "true"#
 *  
 * -------------------------------------------------------------------
 * -------------------------------------------------------------------
 *
 * Plugin scriptcalls:
 * --------------------
 *
 * $ESS.BOX;                       # use this in Console to read all related data
 *
 * $ESS.BOX[mapId];                # use this in Console to read all related map data
 *
 * $ESS.BOX[mapId][eventId];       # use this in Console to read all related map event data
 *
 * $ESS.BOX[mapId][eventId]['A'];  # this returns true or false
 *
 * $ESS.list();                      # function that returns  => $ESS.BOX[mapId] 
 *
 * $ESS.eventSwitch(mapId, eventId); # function that returns => $ESS.BOX[mapId][eventId]
 *
 * $ESS.storageBuilder(); # function that builds "$ESS.BOX" minimum array, can be used to reset it
 *                        # only use at own risk or if you somehow messed up "$ESS.BOX"
 *
 * $ESS.setAllEvSelfSwitch(letter, value); # setValue of SelfSwitch, to all Events on current Map
 *
 * example:
 *         $ESS.setAllEvSelfSwitch('A', true);
 *
 *
 * ============================================================================
 * Credits: to "Hime" and "Aloe Guvner" for giving me some ideas, with their 
 *          postings in the rpg maker forum
 *
 *  Hime mentioned Event SelfSwitch Storage Ideas .. 
 *  Aloe Guvner posted a Snippet on how to build Global Objects ..
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 20.11.2022 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:
  var parameters = PluginManager.parameters("ESS_Storage") ||
  $plugins.filter(function (plugin) {return plugin.description.contains('<ESS_Storage>')});

//------------------------------------------------------------------------------------------------------- 

      // new Class "Self_Switches"	
      function Self_Switches() {
               this.initialize.apply(this, arguments);
      }

      // create Global Object "$ESS" & the "Self_Switches.prototype"
      $ESS = Object.create(Self_Switches.prototype);
      Self_Switches.prototype.constructor = Self_Switches;	
      
      //initialize Self_Switches
      Self_Switches.prototype.initialize = function(mapId, eventId) {
          this.A = !!$gameSelfSwitches._data[[mapId, eventId, "A"]];
          this.B = !!$gameSelfSwitches._data[[mapId, eventId, "B"]];
          this.C = !!$gameSelfSwitches._data[[mapId, eventId, "C"]];
          this.D = !!$gameSelfSwitches._data[[mapId, eventId, "D"]];
          this.mapId = mapId;
          this.eventId = eventId;	      
          if ($ESS.BOX === undefined) this.storageBuilder();
          $ESS.BOX[0] = "# MapId #";
          if ($ESS.BOX[mapId] === undefined) $ESS.BOX[mapId] = [];
          $ESS.BOX[mapId][0] = "# EventId #";
          if ($ESS.BOX[mapId][eventId] === undefined) $ESS.BOX[mapId][eventId] = [];
          $ESS.BOX[mapId][eventId] = this;
          $ESS.BOX[mapId][eventId]['A'] = this.A;
          $ESS.BOX[mapId][eventId]['B'] = this.B;
          $ESS.BOX[mapId][eventId]['C'] = this.C;
          $ESS.BOX[mapId][eventId]['D'] = this.D;	      
      };
	
      // build minimum default storage , can be used to reset the object	
      Self_Switches.prototype.storageBuilder = function() {
          $ESS.BOX = [];
          $ESS.BOX['lastDataKey'] = "noData";
          $ESS.BOX['lastEventKey'] = "noData";	
          $ESS.BOX['data'] = $gameSelfSwitches._data;
      };
	
      // function to return stored data	
      Self_Switches.prototype.list = function() {
          return this._data.filter(function(element) {
                 return !!element;
          });
      };
	
      // function to return singel event_SelfSwitches data related to mapId	
      Self_Switches.prototype.eventSwitch = function(mapId, eventId) {
          return this.list()[mapId][eventId];
          return false;
      };
	
      // add SelfSwitches data storage to event (this triggers "Self_Switches.prototype.initialize")
      var _Game_event_ini = Game_Event.prototype.initialize;
      Game_Event.prototype.initialize = function(mapId, eventId) {
          _Game_event_ini.call(this, mapId, eventId);
           this._SelfSwitch = new Self_Switches(mapId, eventId);
      };
	
      //overwrite default function to manipulate the default data if needed
      Game_SelfSwitches.prototype.value = function(key) {
          var list = [key];
          var mapId = list[0][0];
          var evId = list[0][1];
          var info = list[0][2];
          // check Event Switches(for better compatiblety with other plugins which might need "this._data")
          if ($ESS.BOX[mapId][evId] && $ESS.BOX[mapId][evId][info] !== undefined) {
          // check if Event has changed its Switches to update "this._data"
              if ($ESS.BOX[mapId][evId][info] !== this._data[[mapId, evId, info]]) {
                  var value = $ESS.BOX[mapId][evId][info];
                  if (value) {
                      this._data[key] = true;
                  } else {
                      delete this._data[key];
                  }; 
              $ESS.BOX['lastEventKey'] = [key];
              };
          };
      return !!this._data[key];
      };
	
      // connect "setValue" to "event_SelfSwitches"	
      var _Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
      Game_SelfSwitches.prototype.setValue = function(key, value) {
          _Game_SelfSwitches_setValue.call(this, key, value);
          $ESS.valueManager(key, value);
      };

      // get current key data & add data to events	
      Self_Switches.prototype.valueManager = function(key, value) {
          if (key) {  
              var list = [key];
              var mapId = list[0][0];
              var evId = list[0][1];
              var info = list[0][2];
              $ESS.BOX['lastDataKey'] = [key];
              $ESS.BOX['data'] = $gameSelfSwitches._data;
              if (value) {
                  $ESS.BOX[mapId][evId][info] = true;  
              } else {
                  $ESS.BOX[mapId][evId][info] = false;
              } 
          };
      };      

      // scriptcall to setValue of all Events on current Map
      Self_Switches.prototype.setAllEvSelfSwitch = function(letter, value) {
          for (var i = 1; i <= $gameMap.events().length; i++) {
               $gameSelfSwitches.setValue([$gameMap._mapId, i, letter], value);                       
          };
      };      

      // store/save Object data	
      var old_makeSaveContents = DataManager.makeSaveContents;
      DataManager.makeSaveContents = function() {
          var contents = old_makeSaveContents.call(this);
          contents.dopansESS = $ESS;
      return contents;
      };
	
      // extract/load Object data		
      var old_extractSaveContents = DataManager.extractSaveContents;
      DataManager.extractSaveContents = function(contents) {
          old_extractSaveContents.call(this, contents);
          if (contents.dopansESS) {$ESS = contents.dopansESS};
      };




//-----------------------------------------------------------------------------------------


//


//--End:

})();
