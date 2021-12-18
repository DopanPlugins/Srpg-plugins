//=============================================================================
// dopan_Load_ImgOnEvent.js
//=============================================================================
/*:
 * @plugindesc <Load_ImgOnEvent> add childs of charImgs above "gameplayer",..
 *                          ..depending on Region id & WeaponTypeID.
 * @author dopan
 *
 * @param Global Load Switch 
 * @desc  Switch that enables/disables Both Img Load Setups
 * @type boolean
 * @default true
 * 
 * @param ----- Region ID -----
 *
 * @param Loaded Img Region
 * @desc decide which IMG this plugin should load from the Char Imgs Folder for Region usage.This is required!
 * @type file
 * @dir img/characters/
 * @require 1
 * @default regionIdLoad
 *
 * @param Global Load Switch Region
 * @desc Switch that enables/disables only the region ID setup
 * @type boolean
 * @default true
 * 
 *
 * @param Region ID Index0
 * @desc ID number of the region that should trigger charIndex0 of the loaded 8sheetChar_Img
 * @type number
 * @default 10
 *
 *
 * @param Region ID Index1
 * @desc ID number of the region that should trigger charIndex1 of the loaded 8sheetChar_Img
 * @type number
 * @default 11
 *
 *
 * @param Region ID Index2
 * @desc ID number of the region that should trigger charIndex2 of the loaded 8sheetChar_Img
 * @type number
 * @default 12
 *
 *
 * @param Region ID Index3
 * @desc ID number of the region that should trigger charIndex3 of the loaded 8sheetChar_Img
 * @type number
 * @default 13
 *
 *
 * @param Region ID Index4
 * @desc ID number of the region that should trigger charIndex4 of the loaded 8sheetChar_Img
 * @type number
 * @default 14
 *
 *
 * @param Region ID Index5
 * @desc ID number of the region that should trigger charIndex5 of the loaded 8sheetChar_Img
 * @type number
 * @default 15
 *
 *
 * @param Region ID Index6
 * @desc ID number of the region that should trigger charIndex6 of the loaded 8sheetChar_Img
 * @type number
 * @default 16
 *
 *
 * @param Region ID Index7
 * @desc ID number of the region that should trigger charIndex7 of the loaded 8sheetChar_Img
 * @type number
 * @default 17
 *
 *
 * @param ----- GameParty Leader -----
 *
 *
 * @param Loaded Img WtypeID
 * @desc decide which IMG this plugin should load from the Char Imgs Folder for GamePartyLeader.This is required!
 * @type file
 * @dir img/characters/
 * @require 1
 * @default weaponTypeLoad
 *
 * @param Global Load Switch WtypeID
 * @desc  Switch that enables/disables only the gameParyLeader setup
 * @type boolean
 * @default true
 * 
 *
 * @param WtypeID Index0
 * @desc ID number of the WtypeID that should trigger charIndex0 of the loaded 8sheetChar_Img
 * @type number
 * @default 1
 *
 *
 * @param WtypeID Index1
 * @desc ID number of the WtypeID that should trigger charIndex1 of the loaded 8sheetChar_Img
 * @type number
 * @default 2
 *
 *
 * @param WtypeID Index2
 * @desc ID number of the WtypeID that should trigger charIndex2 of the loaded 8sheetChar_Img
 * @type number
 * @default 3
 *
 *
 * @param WtypeID Index3
 * @desc ID number of the WtypeID that should trigger charIndex3 of the loaded 8sheetChar_Img
 * @type number
 * @default 4
 *
 *
 * @param WtypeID Index4
 * @desc ID number of the WtypeID that should trigger charIndex4 of the loaded 8sheetChar_Img
 * @type number
 * @default 5
 *
 *
 * @param WtypeID Index5
 * @desc ID number of the WtypeID that should trigger charIndex5 of the loaded 8sheetChar_Img
 * @type number
 * @default 6
 *
 *
 * @param WtypeID Index6
 * @desc ID number of the WtypeID that should trigger charIndex6 of the loaded 8sheetChar_Img
 * @type number
 * @default 7
 *
 *
 * @param WtypeID Index7
 * @desc ID number of the WtypeID that should trigger charIndex7 of the loaded 8sheetChar_Img
 * @type number
 * @default 8
 *
 * @help  
 *-------------------------------------------------------------------------------------------
 * Check region id of gameplayer & wtypeId of gamePartyLeader in console F8
 *
 *   "$gamePlayer.regionId();" 
 *
 *   "$gameParty.leader().weapons()[0].wtypeId;"
 *
 * Scriptcall to Change the "Global Load Switch" from the pluginParam
 *
 *   "this.globalSwitch(true/false);"
 *   "this.globalSwitchRegion(true/false);"
 *   "this.globalSwitchWtypeID(true/false);"
 *
 *
 *-------------------------------------------------------------------------------------------
 * This plugin is made to work on rpg MV projects that use 3x4_frame charFrame_Imgs.
 *
 * In the Plugin param you can decide which "regionID" is used to trigger which "char_index",
 * from the loaded Img.
 *
 * This img should be a default 8 char sheet img in order to work with this plugin
 *
 * The img that is used must be set in the pluginParam 
 *
 * This plugin could be edited to work on Events aswell,..
 *  
 * This plugin was made to add visual effects to the "$gameplayer",when in Water or in deepGras ect.
 *
 * But with a few Edits on the "if conditions" it could also be used to display different Armors/Weapons ect.
 *
 * (Or it can be used for whatever it might be needed)
 *-----------------------------------------------------------------------------
 * Update! : added another setup with a second IMG and more Switches
 * 
 * This is used to choose 8 weaponTypes that can trigger an IMG load on GamePlayer,
 * related to the equiped Weapon of "GamePartyLeader"
 *
 * pls note the global switch diasbles all !
 * and the other Switches are required aswell, related to the Setup that should be active..
 *
 * ============================================================================
 * Terms of Use: This plugin is under MIT license
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 2.0:
 * - first Release 30.11.2020 for rpg mv!
 * - added Secong Img + Setup for WtypeID
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("Load_ImgOnEvent") ||
  $plugins.filter(function (plugin) { return plugin.description.contains('<Load_ImgOnEvent>'); });

  var _imgRegion = parameters['regionIdLoad'] || 'srpgSet';
  var _imgWtypeID = parameters['weaponTypeLoad'] || 'srpgSet';
  var _Index0Region = Number(parameters['Region ID Index0'] || 10);
  var _Index1Region = Number(parameters['Region ID Index1'] || 11);
  var _Index2Region = Number(parameters['Region ID Index2'] || 12);
  var _Index3Region = Number(parameters['Region ID Index3'] || 13);
  var _Index4Region = Number(parameters['Region ID Index4'] || 14);
  var _Index5Region = Number(parameters['Region ID Index5'] || 15);
  var _Index6Region = Number(parameters['Region ID Index6'] || 16);
  var _Index7Region = Number(parameters['Region ID Index7'] || 17);
  var _globaLoadSwitch = parameters['Global Load Switch'] || 'true' || 'false';
  var _globaLoadSwitchRegion = parameters['Global Load Switch Region'] || 'true' || 'false';
  var _globaLoadSwitchWtypeID = parameters['Global Load Switch WtypeID'] || 'true' || 'false';
  var _Index0WtypeID = Number(parameters['WtypeID Index0'] || 1);
  var _Index1WtypeID = Number(parameters['WtypeID Index1'] || 2);
  var _Index2WtypeID = Number(parameters['WtypeID Index2'] || 3);
  var _Index3WtypeID = Number(parameters['WtypeID Index3'] || 4);
  var _Index4WtypeID = Number(parameters['WtypeID Index4'] || 5);
  var _Index5WtypeID = Number(parameters['WtypeID Index5'] || 6);
  var _Index6WtypeID = Number(parameters['WtypeID Index6'] || 7);
  var _Index7WtypeID = Number(parameters['WtypeID Index7'] || 8);
//-----------------------------------------------------------------------------------------

   // this.globalSwitch(true/false);
   Game_Interpreter.prototype.globalSwitch = function(setGlobalSwitch) {
       if (setGlobalSwitch === true) {_globaLoadSwitch = 'true'};
       if (setGlobalSwitch === false) {_globaLoadSwitch = 'false'};
       return _setGlobalSwitch;
   };

   // this.globalSwitch(true/false);
   Game_Interpreter.prototype.globalSwitchRegion = function(setGlobalSwitch) {
       if (setGlobalSwitch === true) {_globaLoadSwitchRegion = 'true'};
       if (setGlobalSwitch === false) {_globaLoadSwitchRegion = 'false'};
       return _setGlobalSwitchRegion;
   };

   // this.globalSwitch(true/false);
   Game_Interpreter.prototype.globalSwitchWtypeID = function(setGlobalSwitch) {
       if (setGlobalSwitch === true) {_globaLoadSwitchWtypeID = 'true'};
       if (setGlobalSwitch === false) {_globaLoadSwitchWtypeID = 'false'};
       return _setGlobalSwitchWtypeID;
   };
//-----------------------------------------------------------------------------------------


    var _ImgLoad_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
          _ImgLoad_Character_setCharacterBitmap.call(this);
	  if (_globaLoadSwitch === 'true') {
              if (_globaLoadSwitchRegion === 'true') {
                  this._dopanImgLoadBitmapRegion = ImageManager.loadCharacter(_imgRegion);
              };
              if (_globaLoadSwitchWtypeID === 'true') {
                  this._dopanImgLoadBitmapWtypeID = ImageManager.loadCharacter(_imgWtypeID);
              };
          };
    };
        // create Overlay
	Sprite_Character.prototype.createImgLoad = function() {
	      if (_globaLoadSwitch === 'true') {
                if (_globaLoadSwitchRegion === 'true') {
		  if (!this._dopanImgLoad0 ) {
                       this._dopanImgLoad0 = new Sprite();
                       this._dopanImgLoad0.anchor.x = 0.5;
                       this._dopanImgLoad0.anchor.y = 1;
                       this.addChild(this._dopanImgLoad0);
                  }
		  if (!this._dopanImgLoad1 ) {
                       this._dopanImgLoad1 = new Sprite();
                       this._dopanImgLoad1.anchor.x = 0.5;
                       this._dopanImgLoad1.anchor.y = 1;
                       this.addChild(this._dopanImgLoad1);
                  }
		  if (!this._dopanImgLoad2 ) {
                       this._dopanImgLoad2 = new Sprite();
                       this._dopanImgLoad2.anchor.x = 0.5;
                       this._dopanImgLoad2.anchor.y = 1;
                       this.addChild(this._dopanImgLoad2);
                  }
		  if (!this._dopanImgLoad3 ) {
                       this._dopanImgLoad3 = new Sprite();
                       this._dopanImgLoad3.anchor.x = 0.5;
                       this._dopanImgLoad3.anchor.y = 1;
                       this.addChild(this._dopanImgLoad3);
                  }
		  if (!this._dopanImgLoad4 ) {
                       this._dopanImgLoad4 = new Sprite();
                       this._dopanImgLoad4.anchor.x = 0.5;
                       this._dopanImgLoad4.anchor.y = 1;
                       this.addChild(this._dopanImgLoad4);
                  }
		  if (!this._dopanImgLoad5 ) {
                       this._dopanImgLoad5 = new Sprite();
                       this._dopanImgLoad5.anchor.x = 0.5;
                       this._dopanImgLoad5.anchor.y = 1;
                       this.addChild(this._dopanImgLoad5);
                  }
		  if (!this._dopanImgLoad6 ) {
                       this._dopanImgLoad6 = new Sprite();
                       this._dopanImgLoad6.anchor.x = 0.5;
                       this._dopanImgLoad6.anchor.y = 1;
                       this.addChild(this._dopanImgLoad6);
                  }
		  if (!this._dopanImgLoad7 ) {
                       this._dopanImgLoad7 = new Sprite();
                       this._dopanImgLoad7.anchor.x = 0.5;
                       this._dopanImgLoad7.anchor.y = 1;
                       this.addChild(this._dopanImgLoad7);
                  }
                }
                if (_globaLoadSwitchWtypeID === 'true') {
		  if (!this._dopanImgLoad8 ) {
                       this._dopanImgLoad8 = new Sprite();
                       this._dopanImgLoad8.anchor.x = 0.5;
                       this._dopanImgLoad8.anchor.y = 1;
                       this.addChild(this._dopanImgLoad8);
                  }
		  if (!this._dopanImgLoad9 ) {
                       this._dopanImgLoad9 = new Sprite();
                       this._dopanImgLoad9.anchor.x = 0.5;
                       this._dopanImgLoad9.anchor.y = 1;
                       this.addChild(this._dopanImgLoad9);
                  }
		  if (!this._dopanImgLoad10 ) {
                       this._dopanImgLoad10 = new Sprite();
                       this._dopanImgLoad10.anchor.x = 0.5;
                       this._dopanImgLoad10.anchor.y = 1;
                       this.addChild(this._dopanImgLoad10);
                  }
		  if (!this._dopanImgLoad11 ) {
                       this._dopanImgLoad11 = new Sprite();
                       this._dopanImgLoad11.anchor.x = 0.5;
                       this._dopanImgLoad11.anchor.y = 1;
                       this.addChild(this._dopanImgLoad11);
                  }
		  if (!this._dopanImgLoad12 ) {
                       this._dopanImgLoad12 = new Sprite();
                       this._dopanImgLoad12.anchor.x = 0.5;
                       this._dopanImgLoad12.anchor.y = 1;
                       this.addChild(this._dopanImgLoad12);
                  }
		  if (!this._dopanImgLoad13 ) {
                       this._dopanImgLoad13 = new Sprite();
                       this._dopanImgLoad13.anchor.x = 0.5;
                       this._dopanImgLoad13.anchor.y = 1;
                       this.addChild(this._dopanImgLoad13);
                  }
		  if (!this._dopanImgLoad14 ) {
                       this._dopanImgLoad14 = new Sprite();
                       this._dopanImgLoad14.anchor.x = 0.5;
                       this._dopanImgLoad14.anchor.y = 1;
                       this.addChild(this._dopanImgLoad14);
                  }
		  if (!this._dopanImgLoad15 ) {
                       this._dopanImgLoad15 = new Sprite();
                       this._dopanImgLoad15.anchor.x = 0.5;
                       this._dopanImgLoad15.anchor.y = 1;
                       this.addChild(this._dopanImgLoad15);
                  }
	      }
	};

//------------------------------------------------------------------------------------------

        // update Overlay
	var _ImgLoad_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
	Sprite_Character.prototype.updateCharacterFrame = function() {
		_ImgLoad_updateCharacterFrame.call(this);
              // Global Switch
              if (_globaLoadSwitch === 'true') {
                  var pw = this.patternWidth();
                  var ph = this.patternHeight();
                 // Region Setup
                 if (_globaLoadSwitchRegion === 'true') { 
                    // Img data Setup
                    if (this._dopanImgLoad0) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx0 = (0 + this.characterPatternX()) * pw;
                       var sy0 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad1) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx1 = (3 + this.characterPatternX()) * pw;
                       var sy1 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad2) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx2 = (6 + this.characterPatternX()) * pw;
                       var sy2 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad3) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx3 = (9 + this.characterPatternX()) * pw;
                       var sy3 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad4) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx4 = (this.characterPatternX()) * pw;
                       var sy4 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad5) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx5 = (3 + this.characterPatternX()) * pw;
                       var sy5 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad6) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx6 = (6 + this.characterPatternX()) * pw;
                       var sy6 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad7) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx7 = (9 + this.characterPatternX()) * pw;
                       var sy7 = (4 + this.characterPatternY()) * ph;
                    };
                 };
                 // WtypeID Setup
                 if (_globaLoadSwitchWtypeID === 'true') { 
                    // Img data Setup
                    if (this._dopanImgLoad8) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx8 = (0 + this.characterPatternX()) * pw;
                       var sy8 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad9) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx9 = (3 + this.characterPatternX()) * pw;
                       var sy9 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad10) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx10 = (6 + this.characterPatternX()) * pw;
                       var sy10 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad11) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx11 = (9 + this.characterPatternX()) * pw;
                       var sy11 = (this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad12) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx12 = (this.characterPatternX()) * pw;
                       var sy12 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad13) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx13 = (3 + this.characterPatternX()) * pw;
                       var sy13 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad14) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx14 = (6 + this.characterPatternX()) * pw;
                       var sy14 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._dopanImgLoad15) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx15 = (9 + this.characterPatternX()) * pw;
                       var sy15 = (4 + this.characterPatternY()) * ph;
                    };
                 };
//-------- trigger stuff related to region id

                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index0Region) {
                        this.createImgLoad();
                        this._dopanImgLoad0.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad0.setFrame(sx0, sy0, pw, ph);
                        this._dopanImgLoad0.visible = true;
                    } else {
                      if (this._dopanImgLoad0 && this._dopanImgLoad0.visible === true) {this._dopanImgLoad0.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index1Region) {
                        this.createImgLoad();
                        this._dopanImgLoad1.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad1.setFrame(sx1, sy1, pw, ph);
                        this._dopanImgLoad1.visible = true;
                    } else {
                      if (this._dopanImgLoad1 && this._dopanImgLoad1.visible === true) {this._dopanImgLoad1.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index2Region) {
                        this.createImgLoad();
                        this._dopanImgLoad2.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad2.setFrame(sx2, sy2, pw, ph);
                        this._dopanImgLoad2.visible = true;
                    } else {
                      if (this._dopanImgLoad2 && this._dopanImgLoad2.visible === true) {this._dopanImgLoad2.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index3Region) {
                        this.createImgLoad();
                        this._dopanImgLoad3.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad3.setFrame(sx3, sy3, pw, ph);
                        this._dopanImgLoad3.visible = true;
                    } else {
                      if (this._dopanImgLoad3 && this._dopanImgLoad3.visible === true) {this._dopanImgLoad3.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index4Region) {
                        this.createImgLoad();
                        this._dopanImgLoad4.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad4.setFrame(sx4, sy4, pw, ph);
                        this._dopanImgLoad4.visible = true;
                    } else {
                      if (this._dopanImgLoad4 && this._dopanImgLoad4.visible === true) {this._dopanImgLoad4.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index5Region) {
                        this.createImgLoad();
                        this._dopanImgLoad5.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad5.setFrame(sx5, sy5, pw, ph);
                        this._dopanImgLoad5.visible = true;
                    } else {
                      if (this._dopanImgLoad5 && this._dopanImgLoad5.visible === true) {this._dopanImgLoad5.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index6Region) {
                        this.createImgLoad();
                        this._dopanImgLoad6.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad6.setFrame(sx6, sy6, pw, ph);
                        this._dopanImgLoad6.visible = true;
                    } else {
                      if (this._dopanImgLoad6 && this._dopanImgLoad6.visible === true) {this._dopanImgLoad6.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchRegion === 'true') {
                    if ($gamePlayer.regionId() === _Index7Region) {
                        this.createImgLoad();
                        this._dopanImgLoad7.bitmap = this._dopanImgLoadBitmapRegion;
                        this._dopanImgLoad7.setFrame(sx7, sy7, pw, ph);
                        this._dopanImgLoad7.visible = true;
                    } else {
                      if (this._dopanImgLoad7 && this._dopanImgLoad7.visible === true) {this._dopanImgLoad7.visible = false};
                    };
                }

//-------- trigger stuff related to WtypeID

                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index0WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad8.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad8.setFrame(sx8, sy8, pw, ph);
                        this._dopanImgLoad8.visible = true;
                    } else {
                      if (this._dopanImgLoad8 && this._dopanImgLoad8.visible === true) {this._dopanImgLoad8.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index1WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad9.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad9.setFrame(sx9, sy9, pw, ph);
                        this._dopanImgLoad9.visible = true;
                    } else {
                      if (this._dopanImgLoad9 && this._dopanImgLoad9.visible === true) {this._dopanImgLoad9.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index2WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad10.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad10.setFrame(sx10, sy10, pw, ph);
                        this._dopanImgLoad10.visible = true;
                    } else {
                      if (this._dopanImgLoad10 && this._dopanImgLoad10.visible === true) {this._dopanImgLoad10.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index3WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad11.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad11.setFrame(sx11, sy11, pw, ph);
                        this._dopanImgLoad11.visible = true;
                    } else {
                      if (this._dopanImgLoad11 && this._dopanImgLoad11.visible === true) {this._dopanImgLoad11.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index4WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad12.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad12.setFrame(sx12, sy12, pw, ph);
                        this._dopanImgLoad12.visible = true;
                    } else {
                      if (this._dopanImgLoad12 && this._dopanImgLoad12.visible === true) {this._dopanImgLoad12.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index5WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad13.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad13.setFrame(sx13, sy13, pw, ph);
                        this._dopanImgLoad13.visible = true;
                    } else {
                      if (this._dopanImgLoad13 && this._dopanImgLoad13.visible === true) {this._dopanImgLoad13.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index6WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad14.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad14.setFrame(sx14, sy14, pw, ph);
                        this._dopanImgLoad14.visible = true;
                    } else {
                      if (this._dopanImgLoad14 && this._dopanImgLoad14.visible === true) {this._dopanImgLoad14.visible = false};
                    };
                }
                if (!this._character.eventId && _globaLoadSwitchWtypeID === 'true') {
                    if ($gameParty.leader().weapons()[0].wtypeId === _Index15WtypeID) {
                        this.createImgLoad();
                        this._dopanImgLoad15.bitmap = this._dopanImgLoadBitmapWtypeID;
                        this._dopanImgLoad15.setFrame(sx15, sy15, pw, ph);
                        this._dopanImgLoad15.visible = true;
                    } else {
                      if (this._dopanImgLoad15 && this._dopanImgLoad15.visible === true) {this._dopanImgLoad15.visible = false};
                    };
                }

              }; // Main Global switch end
	};

//-----------------------------------------------------------------------------------------
//$gameParty.leader().weapons()[0].wtypeId
//$gamePlayer.regionId()

//--End:

})();
