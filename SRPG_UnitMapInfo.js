// =============================================================================
// SRPG_UnitMapInfo.js
// Version: 1.05(dopan patch)
// -----------------------------------------------------------------------------
// Copyright (c) 2021
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: xabileug
//             https://twitter.com/xabileug
// =============================================================================


/*:
 * @plugindesc v1.05 SRPG UnitMapInfo
 * @author xabileug
 *
 * @param Show HP Gauge
 * @desc Show HP Gauge on unit?
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Show HP Number
 * @desc Show HP Number on unit?
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Show Weapon Icon
 * @desc Show Weapon Icon on unit?
 * (true/false)
 * @type boolean
 * @default true
 *
 * @param Show State Icon
 * @desc Show State Icon on unit?
 * (true/false)
 * @type boolean
 * @default true
 *
 *
 * @param Gauge Width
 * @desc Default width of the gauges
 * @type number
 * @default 32
 *
 * @param Gauge Height
 * @desc Default height of the gauges
 * @type number
 * @default 5
 *
 * @param Gauge Fill
 * @desc Default fill height of the gauges
 * @type number
 * @default 3
 *
 * @param Gauge Outline
 * @desc Hex color.
 * @default #000000
 *
 * @param Actor hpFull Color
 * @desc Hex color.
 * @default #4be1fe
 *
 * @param Enemy hpFull Color
 * @desc Hex color.
 * @default #fe4b69
 *
 * @param Actor HPCurr Color
 * @desc Hex color.
 * @default #1b55c6
 *
 * @param Enemy HPCurr Color
 * @desc Hex color.
 * @default #d02442
 *
 * @param Actor HP Color
 * @desc Hex color.
 * @default #4be1fe
 *
 * @param Enemy HP Color
 * @desc Hex color.
 * @default #fe4b69
 *
 * @param HP Color
 * @desc Hex color.
 * @default #000000
 *
 * @param HP Outline
 * @desc Hex color.
 * @default #ffffff
 *
 * @param Font Size
 * @desc Default width of the gauges
 * @type number
 * @default 14
 *
 * @param HP Gauge Pos X
 * @desc Position X of HP Gauge
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
 * @param HP Gauge Pos Y
 * @desc Position Y of HP Gauge
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
 * @param HP Number Pos X
 * @desc Position X of HP Gauge
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
 * @param HP Number Pos Y
 * @desc Position Y of HP Gauge
 * @type number
 * @max 100
 * @min -100
 * @default -42
 *
 * @param State Icon Pos X
 * @desc position X of stateIcon
 * @type number
 * @max 100
 * @min -100
 * @default -26
 *
 * @param State Icon Pos Y
 * @desc position Y of stateIcon
 * @type number
 * @max 100
 * @min -100
 * @default -32
 *
 *
 * @param Att Icon Pos X
 * @desc position X of attIcon
 * @type number
 * @max 100
 * @min -100
 * @default -26 
 *
 * @param Att Icon Pos Y
 * @desc position Y of attIcon
 * @type number
 * @max 100
 * @min -100
 * @default -10 
 *
 *
 * @help
 *
 * 1.01 show unit HP bar, different color at 100%, below 100%
 *
 * 1.02 show unit HP value
 *
 * 1.03
 * show unit state icon : require YEP_AutoPassiveStates
 *
 * 1.03a improved hp guage color customization
 *
 * 1.04 debug compatiblety patch and addedweapon icon. by dopan
 *
 * 1.05 debug issue when Gameparty is smaller than used unitEvents
 *
 * reference : ebinote SRPG_DispHPOnMap
 *             TM_SRPG updatehpGauge updatestateicon
 *             Fire Emblem Heroes
*/

(function() {

    var parameters = PluginManager.parameters('SRPG_UnitMapInfo');
    var usehpNumUnit = (parameters['Show HP Number'] || "true") === "true";
    var usehpGaugeUnit = (parameters['Show HP Gauge'] || "true") === "true";
    var useStateIconUnit = (parameters['Show State Icon'] || "true") === "true";
    var useWeaponIconUnit = (parameters['Show Weapon Icon'] || "true") === "true";
    var hpGaugeWidth = Number(parameters['Gauge Width'] || 32);  // Sprite Character size 32 x 32 px
    var hpGaugeHeight = Number(parameters['Gauge Height'] || 5);
    var hpGaugeFill = Number(parameters['Gauge Fill'] || 3);
    var hpGaugeColor1 = parameters['Actor hpFull Color'] || "#4be1fe";
    var hpGaugeColor2 = parameters['Enemy hpFull Color'] || "#fe4b69";
    var hpGaugeColor3 = parameters['Actor HPCurr Color'] || "#1b55c6";
    var hpGaugeColor4 = parameters['Enemy HPCurr Color'] || "#d02442";
    var hpGaugeOutline = parameters['Gauge Outline'] || "#ccd1cd";
    var hpNumColor1 = parameters['Actor HP Color'] || "#4be1fe";
    var hpNumColor2 = parameters['Enemy HP Color'] || "#fe4b69";
    var hpNumtextColor = parameters['HP Color'] || "#000000";
    var hpOutlineColor = parameters['HP Outline'] || "#ffffff";
    var hpFontSize = Number(parameters['Font Size'] || 14);
    var hpOutline = Number(parameters['Outline'] || 3);
    var hpGaugePosX = Number(parameters['HP Gauge Pos X'] || 0);
    var hpGaugePosY = Number(parameters['HP Gauge Pos Y'] || 0);
    var hpNumPosX = Number(parameters['HP Number Pos X'] || 0);
    var hpNumPosY = Number(parameters['HP Number Pos Y'] || -42);
    var stateIconPosX = Number(parameters['State Icon Pos X'] || -26);
    var stateIconPosY = Number(parameters['State Icon Pos Y'] || -32);
    var attIconPosX = Number(parameters['Att Icon Pos X'] || -26);
    var attIconPosY = Number(parameters['Att Icon Pos Y'] || -10);

    var _debugSwitch = true;
//---------------------------------------------------------------------------------
// dopan_debug for "enemyEquip plugin" & Yep BuffStatesCore

    // add debug Switch Setup
    var SRPG_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        SRPG_Game_Action_apply.call(this, target);
        if ($gameSystem.isSRPGMode() == true) {
            // add debug switch when action apply
            _debugSwitch = false;
        }
    };

    // add stuff to eventAfterAction_scene
    // add debug Switch Setup
    var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
    Scene_Map.prototype.srpgAfterAction = function() {
	 _srpgAfterActionScene.call(this);
         // switch is used to prevent conflict with state icon updates of other plugins
         if (_debugSwitch === false) {this.setSkillWait(30);_debugSwitch = true};
    };

    // override error causing function from Yep BuffstatesCore to not trigger if steal/break action happens
    // this YEP function is supposses to happen in "status" window scene ,
    // so this should be no problem if its disabled in battleaction
    Sprite_StateIcon.prototype.textColor = function(n) {
          if (SceneManager._scene._statusWindow && _debugSwitch === true) {
              return SceneManager._scene._statusWindow.textColor(n);
          }
    };

//=============================================================================
// Sprite_Character
//=============================================================================

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// Sprite_Character create AttackIcon


    // load attIcon Bitmap
    var _IconLoad_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
          _IconLoad_Character_setCharacterBitmap.call(this);
          this.AttIconBitmap = ImageManager.loadSystem('IconSet');
    };
    
    Sprite_Character.prototype.getIconIndex = function() {
	  //get data  
	  var battler = $gameSystem.EventToUnit(this._character.eventId());
	  var iconID = 0; // <-this is used to check if an weapon and related icon is not there
	  // check if a weapon is equiped
	  if (battler[1] && !battler[1].hasNoWeapons()) {
	      if (battler[0] === 'actor') { 
                  iconID = battler[1].weapons()[0].iconIndex;  // actor

              }
	      // checks if the "enemyEquip" plugin is used,
	      // or if the "core weapon meta" is used .. 
              if (battler[0] === 'enemy') { 
	              if (battler[1].enemy().meta.srpgWeapon) {	
			  var coreMeta = $dataWeapons[Number(battler[1].enemy().meta.srpgWeapon)]; 
			  iconID = coreMeta.iconIndex; // enemy
		      } else {iconID = battler[1].weapons()[0].iconIndex};  
	      }    
	  }
    return iconID
    };

    // create AttackIcon	
    Sprite_Character.prototype.createAttIcon = function() {
	  //get data  
	  var battler = $gameSystem.EventToUnit(this._character.eventId());
          var iconIndex = this.getIconIndex();
	  // add "this._AttIcon" + get Sprite data if "iconIndex is > 0" 
          //"iconIndex is === 0" would mean "noWeapon equiped,so no iconIndex added"
          if (!this._AttIcon && (iconIndex > 0)) {
              // add sprite
              this._AttIcon = new Sprite();
              // add all data
              this._AttIcon._pw = 32;
              this._AttIcon._ph = 32;
              this._AttIcon._sx = iconIndex % 16 * 32;
              this._AttIcon._sy = Math.floor(iconIndex / 16) * 32;
              this._AttIcon._battler = battler[1];
              this._AttIcon.x = attIconPosX;
              this._AttIcon.y = attIconPosY;
              this._AttIcon.z = 9;
              this._AttIcon.anchor.x = 0.5;
              this._AttIcon.anchor.y = 0.5;
              this._AttIcon.scale.x = 0.5;
              this._AttIcon.scale.y = 0.5;
              // add child
              this.addChild(this._AttIcon);
          }
    };
	
// Sprite_Character updateCharacterFrame
	
    var _SRPG_Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
    Sprite_Character.prototype.updateCharacterFrame = function() {
        _SRPG_Sprite_Character_updateCharacterFrame.call(this);
        if ($gameSystem.isSRPGMode() == true && this._character.isEvent() == true) {
            var battlerArray = $gameSystem.EventToUnit(this._character.eventId());
            if (battlerArray) {
                // create State Icon
                //  add debug Switch Setup
                if (useStateIconUnit && (_debugSwitch = true)) this.createStateIconSprite();
                // create HP number for HP
                if (usehpNumUnit) this.createhpNumberSprite();
                // create HP gauge
                if (usehpGaugeUnit) this.createhpGaugeSprite();
                // create Weapon Icon
                //  add debug Switch Setup
                if (useWeaponIconUnit && (_debugSwitch = true)) {
		    this.createAttIcon();
                    // all battlers getting their attIcon displayed
		    if (this._AttIcon && this._AttIcon._battler) { 
                        var pw = this._AttIcon._pw;
                        var ph = this._AttIcon._ph;
	                var sx = this._AttIcon._sx;
                        var sy = this._AttIcon._sy;
	                // install bitmap
                        this._AttIcon.bitmap = this.AttIconBitmap;
		        // install Sprite data
                        this._AttIcon.setFrame(sx, sy, pw, ph);
			if (!this._AttIcon._battler.isDead()) {     
		             // make sprite visible	
                             this._AttIcon.visible = true;
			} else { // make sprite non visible if Unit is Dead
			   if (this._AttIcon.visible === true) {this._AttIcon.visible = false};
			}
		    } 
		}    
            }
        } else { if (!$gameSystem.isSRPGMode() == true && this._AttIcon) this._AttIcon.visible = false};
    };

//sprite Char create hpGaugeSprite
	
    Sprite_Character.prototype.createhpGaugeSprite = function() {
        if ($gameSystem.isSRPGMode() == true && !this._hpGaugeSprite) {
            this._hpGaugeSprite = new Sprite_hpGaugeSprite();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._hpGaugeSprite.setBattler(battler);
            this.addChild(this._hpGaugeSprite);
        }
    };

//sprite Char create hpNumberSprit
    Sprite_Character.prototype.createhpNumberSprite = function() {
        if ($gameSystem.isSRPGMode() == true && !this._hpNumberSprite) {
            this._hpNumberSprite = new Sprite_hpNumberSprite();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._hpNumberSprite.setBattler(battler);
            this.addChild(this._hpNumberSprite);
        }
    };

//sprite Char create StateIconSprite
    Sprite_Character.prototype.createStateIconSprite = function() {
        if ($gameSystem.isSRPGMode() == true && !this._StateIconSprite) {
            this._StateIconSprite = new Sprite_StateIcon();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._StateIconSprite.setup(battler);
            this._StateIconSprite.x = stateIconPosX;
            this._StateIconSprite.y = stateIconPosY;
            this._StateIconSprite.z = 9;
            this._StateIconSprite.anchor.x = 0.5;
            this._StateIconSprite.anchor.y = 0.5;
            this._StateIconSprite.scale.x = 0.5;
            this._StateIconSprite.scale.y = 0.5;
            this.addChild(this._StateIconSprite);
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_SrpghpGauge
    //

    function Sprite_hpGaugeSprite() {
        this.initialize.apply(this, arguments);
    }

    Sprite_hpGaugeSprite.prototype = Object.create(Sprite.prototype);
    Sprite_hpGaugeSprite.prototype.constructor = Sprite_hpGaugeSprite;

    Sprite_hpGaugeSprite.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(hpGaugeWidth, hpGaugeHeight); // HP bar width, and thickness
        this.z = 9;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.x = hpGaugePosX;
        this.y = hpGaugePosY;
    };

    Sprite_hpGaugeSprite.prototype.setBattler = function(battler) {
        if (this._battler === battler) return;
        this._battler = battler;
    };

    Sprite_hpGaugeSprite.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._battler && (this._hp !== this._battler.hp || this._mhp !== this._battler.mhp)) {
            this._hp = this._battler.hp;
            this._mhp = this._battler.mhp;
            this.refresh();
        }
    };
    // hpGauge color
    Sprite_hpGaugeSprite.prototype.refresh = function() {
        this.bitmap.clear();
        if (this._hp === 0) return;if (!$gameSystem.isSRPGMode() == true) return ;
        this.bitmap.fillRect(0, 0, hpGaugeWidth, hpGaugeHeight, hpGaugeOutline);
        var d = hpGaugeWidth - hpGaugeHeight + hpGaugeFill;
        var w = Math.floor(this._hp / this._mhp * d);

        if (!this._battler || this._battler.isActor()) {
            var hpcolor = hpNumColor1;  // actor
        } else {
            hpcolor = hpNumColor2; // enemy
        }
        var fill1 = 0;
        var fill2 = 0;
        if (!this._battler || this._battler.isActor()) {
            fill1 = hpGaugeColor1;//"#4be1fe";
            fill2 = hpGaugeColor3;//"#1b55c6";
            this.bitmap.fillRect(1, 1, w, hpGaugeFill, this._hp === this._mhp ? fill1 : fill2);
        } else {
            fill1 = hpGaugeColor2//"#fe4b69";
            fill2 = hpGaugeColor4//"#d02442";
            this.bitmap.fillRect(1, 1, w, hpGaugeFill, this._hp === this._mhp ? fill1 : fill2);
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_hpNumberSprite
    //

    function Sprite_hpNumberSprite() {
        this.initialize.apply(this, arguments);
    }

    Sprite_hpNumberSprite.prototype = Object.create(Sprite.prototype);
    Sprite_hpNumberSprite.prototype.constructor = Sprite_hpNumberSprite;

    Sprite_hpNumberSprite.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(32, 32);
        this.bitmap.fontSize = hpFontSize;
        this.bitmap.textColor = hpNumtextColor;
        this.bitmap.outlineWidth = hpOutline;
        this.bitmap.outlineColor = hpOutlineColor;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.x = hpNumPosX;
        this.y = hpNumPosY;
    };

    Sprite_hpNumberSprite.prototype.setBattler = function(battler) {
        if (this._battler === battler) return;
        this._battler = battler;
    };

    Sprite_hpNumberSprite.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._battler && this._newNumber !== this._battler.hp) {
            this._newNumber = this._battler.hp;
            this.refresh();
        }
    };
 
    Sprite_hpNumberSprite.prototype.refresh = function() {
        this.bitmap.clear();
        if (this._newNumber === 0) return;if (!$gameSystem.isSRPGMode() == true) return ;
        var width = this.bitmap.width;
        var height = this.bitmap.height;

        // set color hp @ 100 #66ff66 and hp not 100 #fce205
        if (!this._battler || this._battler.isActor()) {
            var hpcolor = hpNumColor1;  // actor
        } else {
            hpcolor = hpNumColor2; // enemy
        }
        this.bitmap.textColor = hpcolor;
        this.bitmap.drawText(this._newNumber + '', 0, 0, width, height, 'right');
    };

})();

