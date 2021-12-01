// =============================================================================
// SRPG_UnitMapInfo.js
// Version: 1.03a
// -----------------------------------------------------------------------------
// Copyright (c) 2021
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: xabileug
//             https://twitter.com/xabileug
// =============================================================================


/*:
 * @plugindesc v1.03a SRPG UnitMapInfo
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
 * @param Actor HPFull Color
 * @desc Hex color.
 * @default #4be1fe
 *
 * @param Enemy HPFull Color
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
 * @default 0
 *
 * @param HP Gauge Pos Y
 * @desc Position Y of HP Gauge
 * @type number
 * @default 0
 *
 * @param HP Number Pos X
 * @desc Position X of HP Gauge
 * @type number
 * @default -34
 *
 * @param HP Number Pos Y
 * @desc Position Y of HP Gauge
 * @type number
 * @default -6
 *
 * @param State Icon Pos X
 * @desc position X of stateIcon
 * @type number
 * @default -26
 *
 * @param State Icon Pos Y
 * @desc position Y of stateIcon
 * @type number
 * @default -32
 *
 *
 * @param Att Icon Pos X
 * @desc position X of attIcon
 * @type number
 * @default -26 
 *
 * @param Att Icon Pos Y
 * @desc position Y of attIcon
 * @type number
 * @default -64 
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
 * reference : ebinote SRPG_DispHPOnMap
 *             TM_SRPG updatehpgauge updatestateicon
 *             Fire Emblem Heroes
*/

(function() {

    var parameters = PluginManager.parameters('SRPG_UnitMapInfo');
    var useHPNumUnit = (parameters['Show HP Number'] || "true") === "true";
    var useHPGaugeUnit = (parameters['Show HP Gauge'] || "true") === "true";
    var useStateIconUnit = (parameters['Show State Icon'] || "true") === "true";
    var useWeaponIconUnit = (parameters['Show Weapon Icon'] || "true") === "true";
    var HPGaugeWidth = Number(parameters['Gauge Width'] || 32);  // Sprite Character size 32 x 32 px
    var HPGaugeHeight = Number(parameters['Gauge Height'] || 5);
    var HPGaugeFill = Number(parameters['Gauge Fill'] || 3);
    var HPGaugeColor1 = parameters['Actor HPFull Color'] || "#4be1fe";
    var HPGaugeColor2 = parameters['Enemy HPFull Color'] || "#fe4b69";
    var HPGaugeColor3 = parameters['Actor HPCurr Color'] || "#1b55c6";
    var HPGaugeColor4 = parameters['Enemy HPCurr Color'] || "#d02442";
    var HPGaugeOutline = parameters['Gauge Outline'] || "#ccd1cd";
    var HPNumColor1 = parameters['Actor HP Color'] || "#4be1fe";
    var HPNumColor2 = parameters['Enemy HP Color'] || "#fe4b69";
    var HPNumtextColor = parameters['HP Color'] || "#000000";
    var HPOutlineColor = parameters['HP Outline'] || "#ffffff";
    var HPFontSize = Number(parameters['Font Size'] || 14);
    var HPOutline = Number(parameters['Outline'] || 3);
    var HPGaugePosX = Number(parameters['HP Gauge Pos X'] || 0);
    var HPGaugePosY = Number(parameters['HP Gauge Pos Y'] || 0);
    var HPNumPosX = Number(parameters['HP Number Pos X'] || -34);
    var HPNumPosY = Number(parameters['HP Number Pos Y'] || -6);
    var IconPosX = Number(parameters['State Icon Pos X'] || -26);
    var IconPosY = Number(parameters['State Icon Pos Y'] || -32);
    var attIconPosX = Number(parameters['Att Icon Pos X'] || -26);
    var attIconPosY = Number(parameters['Att Icon Pos Y'] || -64);

    var _debugSwitch = true;
//---------------------------------------------------------------------------------
// dopan_debug for "enemyEquip plugin" & Yep BuffStatesCore

    // check used SkillAction_itemObeject for meta"srpgSteal"
    //  add debug Switch Setup
    var SRPG_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        SRPG_Game_Action_apply.call(this, target);
            // add stuff to Game action if Break/Steal Meta & Hit
             var result = target.result();
             if ((this.item().meta.srpgSteal && result.isHit()) ||
                 (this.item().meta.srpgBreak && result.isHit())) {
	         _debugSwitch = false;
             }
             if (this.item().meta.actorStealItem && result.isHit()) {
                 _debugSwitch = false;
             }
    };

    // add stuff to eventAfterAction_scene
    //  add debug Switch Setup
    var _srpgAfterActionScene = Scene_Map.prototype.srpgAfterAction;
    Scene_Map.prototype.srpgAfterAction = function() {
	 _srpgAfterActionScene.call(this);

         // switch is used to prevent conflict with state icon updates of other plugins
         if (_debugSwitch === false) {this.setSkillWait(30);_debugSwitch = true};
    };

    // override error causing function from Yep BuffstatesCore to not trigger if steal action happens
    // this YEP function is supposses to happen in "status" window scene ,
    // so this should be no problem if its disabled in battleaction
    Sprite_StateIcon.prototype.textColor = function(n) {
          if (_debugSwitch === true) {return SceneManager._scene._statusWindow.textColor(n)};
    };

//=============================================================================
// Sprite_Character
//=============================================================================

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
// Sprite_Character create AttackIcon

    // load att Icon Bitmap
    var _IconLoad_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
          _IconLoad_Character_setCharacterBitmap.call(this);
          this.AttIconBitmap = ImageManager.loadSystem('IconSet');
    };
    
    // create AttackIcon	
    Sprite_Character.prototype.createAttIconSprite = function() {
	  //get data  
	  var battler = $gameSystem.EventToUnit(this._character.eventId());
	  var _attIconIndex = 0;
	  // check if a weapon is equiped,, this will also know if a weapon was changed
	  if (!this._battler.hasNoWeapons()) {
	      if (battler[0] === 'actor') { 
		  if (battler[1].equips[0]._itemId > 0) {	
                      _attIconIndex = battler[1].weapons()[0].iconIndex;  // actor
		  }
              }
	      // code is a bit longer because it checks if the "enemyEquip" plugin is used,
	      // or if the "core weapon meta" is used .. 
              if (battler[0] === 'enemy') { 
	              if (battler[1].enemy().meta.srpgWeapon) {	
			  var coreMeta = $dataWeapons[Number(this._battler.enemy().meta.srpgWeapon)]; 
			  _attIconIndex = coreMeta.iconIndex; // enemy
		      }     
		      if (battler[1].equips[0]._dataClass === "weapon") {      
                          var weaponID = battler[1].equips[0]._itemId;
                          var equipData = $dataWeapons[weaponID];
                          _attIconIndex = equipData.iconIndex; // enemy
 		      } 
	      }      
	  }    
	  // add "this._AttIconSprite"  + get Sprite data
          if (!this._AttIconSprite) {
              var _Attpw = 32;
              var _Attph = 32;
	      var _Attsx = _attIconIndex % 16 * pw;
              var _Attsy = Math.floor(_attIconIndex / 16) * ph;
              this._AttIconSprite =  new Sprite();
              this._AttIconSprite.x = attIconPosX;
              this._AttIconSprite.y = attIconPosY;
              this._AttIconSprite.z = 9;
              this._AttIconSprite.anchor.x = 0.5;
              this._AttIconSprite.anchor.y = 0.5;
              this._AttIconSprite.scale.x = 0.5;
              this._AttIconSprite.scale.y = 0.5;
              this._AttIconSprite.setup(battler);
              this.addChild(this._AttIconSprite);
              this._AttIconSprite.visible = true;
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
                if (useHPNumUnit) this.createHpNumberSprite();
                // create HP gauge
                if (useHPGaugeUnit) this.createHpGaugeSprite();
                // create Weapon Icon
                //  add debug Switch Setup
                if (useWeaponIconUnit && (_debugSwitch = true)) {
		    this.createAttIconSprite();
	            // install bitmap
		    this._AttIconSprite.bitmap = this.AttIconBitmap;
		    // install Sprite data
                    this._AttIconSprite.setFrame(_Attsx, _Attsy, _Attpw, _Attph);
		    // make sprite visible	
                    this._imgLoad0.visible = true;
		}    
            }
        }
    };

//sprite Char create HpGaugeSprite
	
    Sprite_Character.prototype.createHpGaugeSprite = function() {
        if (!this._HpGaugeSprite) {
            this._HpGaugeSprite = new Sprite_HpGaugeSprite();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._HpGaugeSprite.setBattler(battler);
            this.addChild(this._HpGaugeSprite);
        }
    };
//sprite Char create HpNumberSprit
    Sprite_Character.prototype.createHpNumberSprite = function() {
        if (!this._HpNumberSprite) {
            this._HpNumberSprite = new Sprite_HpNumberSprite();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._HpNumberSprite.setBattler(battler);
            this.addChild(this._HpNumberSprite);
        }
    };
//sprite Char create StateIconSprite
    Sprite_Character.prototype.createStateIconSprite = function() {
        if (!this._StateIconSprite) {
            this._StateIconSprite = new Sprite_StateIcon();
            var battler = $gameSystem.EventToUnit(this._character.eventId())[1];
            this._StateIconSprite.setup(battler);
            this._StateIconSprite.x = IconPosX;
            this._StateIconSprite.y = IconPosY;
            this._StateIconSprite.z = 9;
            this._StateIconSprite.anchor.x = 0.5;
            this._StateIconSprite.anchor.y = 0.5;
            this._StateIconSprite.scale.x = 0.5;
            this._StateIconSprite.scale.y = 0.5;
            this.addChild(this._StateIconSprite);
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_SrpgHpGauge
    //

    function Sprite_HpGaugeSprite() {
        this.initialize.apply(this, arguments);
    }

    Sprite_HpGaugeSprite.prototype = Object.create(Sprite.prototype);
    Sprite_HpGaugeSprite.prototype.constructor = Sprite_HpGaugeSprite;

    Sprite_HpGaugeSprite.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(HPGaugeWidth, HPGaugeHeight); // HP bar width, and thickness
        this.z = 9;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.x = HPGaugePosX;
        this.y = HPGaugePosY;
    };

    Sprite_HpGaugeSprite.prototype.setBattler = function(battler) {
        if (this._battler === battler) return;
        this._battler = battler;
    };

    Sprite_HpGaugeSprite.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._hp !== this._battler.hp || this._mhp !== this._battler.mhp) {
            this._hp = this._battler.hp;
            this._mhp = this._battler.mhp;
            this.refresh();
        }
    };
    // hpgauge color
    Sprite_HpGaugeSprite.prototype.refresh = function() {
        this.bitmap.clear();
        if (this._hp === 0) return;
        this.bitmap.fillRect(0, 0, HPGaugeWidth, HPGaugeHeight, HPGaugeOutline);
        var d = HPGaugeWidth - HPGaugeHeight + HPGaugeFill;
        var w = Math.floor(this._hp / this._mhp * d);

        if (!this._battler || this._battler.isActor()) {
            var hpcolor = HPNumColor1;  // actor
        } else {
            hpcolor = HPNumColor2; // enemy
        }
        var fill1 = 0;
        var fill2 = 0;
        if (!this._battler || this._battler.isActor()) {
            fill1 = HPGaugeColor1;//"#4be1fe";
            fill2 = HPGaugeColor3;//"#1b55c6";
            this.bitmap.fillRect(1, 1, w, HPGaugeFill, this._hp === this._mhp ? fill1 : fill2);
        } else {
            fill1 = HPGaugeColor2//"#fe4b69";
            fill2 = HPGaugeColor4//"#d02442";
            this.bitmap.fillRect(1, 1, w, HPGaugeFill, this._hp === this._mhp ? fill1 : fill2);
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_HpNumberSprite
    //

    function Sprite_HpNumberSprite() {
        this.initialize.apply(this, arguments);
    }

    Sprite_HpNumberSprite.prototype = Object.create(Sprite.prototype);
    Sprite_HpNumberSprite.prototype.constructor = Sprite_HpNumberSprite;

    Sprite_HpNumberSprite.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(32, 32);
        this.bitmap.fontSize = HPFontSize;
        this.bitmap.textColor = HPNumtextColor;
        this.bitmap.outlineWidth = HPOutline;
        this.bitmap.outlineColor = HPOutlineColor;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.x = HPNumPosX;
        this.y = HPNumPosY;
    };

    Sprite_HpNumberSprite.prototype.setBattler = function(battler) {
        if (this._battler === battler) return;
        this._battler = battler;
    };

    Sprite_HpNumberSprite.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._newNumber !== this._battler.hp) {
            this._newNumber = this._battler.hp;
            this.refresh();
        }
    };

    Sprite_HpNumberSprite.prototype.refresh = function() {
        this.bitmap.clear();
        if (this._newNumber === 0) return;
        var width = this.bitmap.width;
        var height = this.bitmap.height;

        // set color hp @ 100 #66ff66 and hp not 100 #fce205
        if (!this._battler || this._battler.isActor()) {
            var hpcolor = HPNumColor1;  // actor
        } else {
            hpcolor = HPNumColor2; // enemy
        }
        this.bitmap.textColor = hpcolor;
        this.bitmap.drawText(this._newNumber + '', 0, 0, width, height, 'right');
    };

})();
