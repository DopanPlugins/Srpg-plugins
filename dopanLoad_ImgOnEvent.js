//=============================================================================
// dopan_Load_ImgOnEvent.js
//=============================================================================
/*:
 * @plugindesc <Load_ImgOnEvent> add childs of charImgs above "gameplayer",..
 *                          ..depending on region id.
 * @author dopan
 *
 *
 *
 * @param Loaded Img
 * @desc decide which IMG this plugin should load from the Char Imgs Folder.This is required!
 * @type file
 * @dir img/characters/
 * @require 1
 * @default srpg_set
 *
 * @param Global Load Switch
 * @desc  
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
 *
 *
 *
 * @help  
 *-------------------------------------------------------------------------------------------
 * Check region id of gameplayer in console F8
 *
 *   "$gamePlayer.regionId();" 
 *
 * Scriptcall to Change the "Global Load Switch" from the pluginParam
 *
 *   "this.globalSwitch(true/false);"
 *
 * (scriptcall is not tested yet, but the paramSwitch is tested and it works)
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
 *
 * ============================================================================
 * Terms of Use: This plugin is under MIT license
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 30.11.2020 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("Load_ImgOnEvent") ||
  $plugins.filter(function (plugin) { return plugin.description.contains('<Load_ImgOnEvent>'); });

  
  var _Index0Region = Number(parameters['Region ID Index0'] || 10);
  var _Index1Region = Number(parameters['Region ID Index1'] || 11);
  var _Index2Region = Number(parameters['Region ID Index2'] || 12);
  var _Index3Region = Number(parameters['Region ID Index3'] || 13);
  var _Index4Region = Number(parameters['Region ID Index4'] || 14);
  var _Index5Region = Number(parameters['Region ID Index5'] || 15);
  var _Index6Region = Number(parameters['Region ID Index6'] || 16);
  var _Index7Region = Number(parameters['Region ID Index7'] || 17);

  var _globaLoadSwitch = parameters['Global Load Switch'] || 'true' || 'false';



//-----------------------------------------------------------------------------------------

   // this.globalSwitch(true/false);
   Game_Interpreter.prototype.globalSwitch = function(setGlobalSwitch) {
       if (setGlobalSwitch === true) {_globaLoadSwitch = 'true'};
       if (setGlobalSwitch === false) {_globaLoadSwitch = 'false'};
       return _setGlobalSwitch;
   };

//-----------------------------------------------------------------------------------------


    var _ImgLoad_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
          _ImgLoad_Character_setCharacterBitmap.call(this);
          this._imgLoadBitmap = ImageManager.loadCharacter('srpg_set');
    };
        // create Overlay
	Sprite_Character.prototype.createImgLoad = function() {
	      if (_globaLoadSwitch === 'true') {
		  if (!this._imgLoad0 ) {
                       this._imgLoad0 = new Sprite();
                       this._imgLoad0.anchor.x = 0.5;
                       this._imgLoad0.anchor.y = 1;
                       this.addChild(this._imgLoad0);
                  }
		  if (!this._imgLoad1 ) {
                       this._imgLoad1 = new Sprite();
                       this._imgLoad1.anchor.x = 0.5;
                       this._imgLoad1.anchor.y = 1;
                       this.addChild(this._imgLoad1);
                  }
		  if (!this._imgLoad2 ) {
                       this._imgLoad2 = new Sprite();
                       this._imgLoad2.anchor.x = 0.5;
                       this._imgLoad2.anchor.y = 1;
                       this.addChild(this._imgLoad2);
                  }
		  if (!this._imgLoad3 ) {
                       this._imgLoad3 = new Sprite();
                       this._imgLoad3.anchor.x = 0.5;
                       this._imgLoad3.anchor.y = 1;
                       this.addChild(this._imgLoad3);
                  }
		  if (!this._imgLoad4 ) {
                       this._imgLoad4 = new Sprite();
                       this._imgLoad4.anchor.x = 0.5;
                       this._imgLoad4.anchor.y = 1;
                       this.addChild(this._imgLoad4);
                  }
		  if (!this._imgLoad5 ) {
                       this._imgLoad5 = new Sprite();
                       this._imgLoad5.anchor.x = 0.5;
                       this._imgLoad5.anchor.y = 1;
                       this.addChild(this._imgLoad5);
                  }
		  if (!this._imgLoad6 ) {
                       this._imgLoad6 = new Sprite();
                       this._imgLoad6.anchor.x = 0.5;
                       this._imgLoad6.anchor.y = 1;
                       this.addChild(this._imgLoad6);
                  }
		  if (!this._imgLoad7 ) {
                       this._imgLoad7 = new Sprite();
                       this._imgLoad7.anchor.x = 0.5;
                       this._imgLoad7.anchor.y = 1;
                       this.addChild(this._imgLoad7);
                  }
	      }
	};

//------------------------------------------------------------------------------------------

        // update Overlay
	var _ImgLoad_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
	Sprite_Character.prototype.updateCharacterFrame = function() {
		_ImgLoad_updateCharacterFrame.call(this);
              if (_globaLoadSwitch === 'true') {

                  var pw = this.patternWidth();
                  var ph = this.patternHeight();
                    // Img data Setup
                    if (this._imgLoad0) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx0 = (0 + this.characterPatternX()) * pw;
                       var sy0 = (this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad1) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx1 = (3 + this.characterPatternX()) * pw;
                       var sy1 = (this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad2) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx2 = (6 + this.characterPatternX()) * pw;
                       var sy2 = (this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad3) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx3 = (9 + this.characterPatternX()) * pw;
                       var sy3 = (this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad4) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx4 = (this.characterPatternX()) * pw;
                       var sy4 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad5) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx5 = (3 + this.characterPatternX()) * pw;
                       var sy5 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad6) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx6 = (6 + this.characterPatternX()) * pw;
                       var sy6 = (4 + this.characterPatternY()) * ph;
                    };
                    if (this._imgLoad7) {
                       //add data to choose 1Char of 8sheet_Img
                       var sx7 = (9 + this.characterPatternX()) * pw;
                       var sy7 = (4 + this.characterPatternY()) * ph;
                    };

//-------- trigger stuff related to region id

                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index0Region) {
                        this.createImgLoad();
                        this._imgLoad0.bitmap = this._imgLoadBitmap;
                        this._imgLoad0.setFrame(sx0, sy0, pw, ph);
                        this._imgLoad0.visible = true;
                    } else {
                      if (this._imgLoad0 && this._imgLoad0.visible === true) {this._imgLoad0.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index1Region) {
                        this.createImgLoad();
                        this._imgLoad1.bitmap = this._imgLoadBitmap;
                        this._imgLoad1.setFrame(sx1, sy1, pw, ph);
                        this._imgLoad1.visible = true;
                    } else {
                      if (this._imgLoad1 && this._imgLoad1.visible === true) {this._imgLoad1.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index2Region) {
                        this.createImgLoad();
                        this._imgLoad2.bitmap = this._imgLoadBitmap;
                        this._imgLoad2.setFrame(sx2, sy2, pw, ph);
                        this._imgLoad2.visible = true;
                    } else {
                      if (this._imgLoad2 && this._imgLoad2.visible === true) {this._imgLoad2.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index3Region) {
                        this.createImgLoad();
                        this._imgLoad3.bitmap = this._imgLoadBitmap;
                        this._imgLoad3.setFrame(sx3, sy3, pw, ph);
                        this._imgLoad3.visible = true;
                    } else {
                      if (this._imgLoad3 && this._imgLoad3.visible === true) {this._imgLoad3.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index4Region) {
                        this.createImgLoad();
                        this._imgLoad4.bitmap = this._imgLoadBitmap;
                        this._imgLoad4.setFrame(sx4, sy4, pw, ph);
                        this._imgLoad4.visible = true;
                    } else {
                      if (this._imgLoad4 && this._imgLoad4.visible === true) {this._imgLoad4.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index5Region) {
                        this.createImgLoad();
                        this._imgLoad5.bitmap = this._imgLoadBitmap;
                        this._imgLoad5.setFrame(sx5, sy5, pw, ph);
                        this._imgLoad5.visible = true;
                    } else {
                      if (this._imgLoad5 && this._imgLoad5.visible === true) {this._imgLoad5.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index6Region) {
                        this.createImgLoad();
                        this._imgLoad6.bitmap = this._imgLoadBitmap;
                        this._imgLoad6.setFrame(sx6, sy6, pw, ph);
                        this._imgLoad6.visible = true;
                    } else {
                      if (this._imgLoad6 && this._imgLoad6.visible === true) {this._imgLoad6.visible = false};
                    };
                }
                if (!this._character.eventId) {
                    if ($gamePlayer.regionId() === _Index7Region) {
                        this.createImgLoad();
                        this._imgLoad7.bitmap = this._imgLoadBitmap;
                        this._imgLoad7.setFrame(sx7, sy7, pw, ph);
                        this._imgLoad7.visible = true;
                    } else {
                      if (this._imgLoad7 && this._imgLoad7.visible === true) {this._imgLoad7.visible = false};
                    };
                }

              };
	};

//-----------------------------------------------------------------------------------------



//--End:

})();