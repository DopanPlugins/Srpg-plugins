//=============================================================================
// SRPG_MapStateOverlay.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_MapStateOverlay> adds the default StateOverlay to SRPG MapBattleMode 
 * @author dopan
 *
 *
 *
 * 
 *
 * @param SOSanchorMX
 * @desc anchorX of StateOverlaySprite on MapScene
 * @type
 * @default 0.5
 *
 *
 *
 * @param SOSanchorMY
 * @desc anchorY of StateOverlaySprite on MapScene
 * @type
 * @default 0.8
 *
 *
 * @param SOSanchorBX
 * @desc anchorX of StateOverlaySprite on BattleScene
 * @type
 * @default 0.5
 *
 *
 *
 * @param SOSanchorBY
 * @desc anchorY of StateOverlaySprite on BattleScene
 * @type 
 * @default 1
 *
 *
 *
 *
 * @help  
 *
 * adds the default StateOverlay to SRPG MapBattleMode 
 * Anchors can be changed ,related to SV & MapBattleMode in the Plugin Param
 *
 * -> plug & play !
 *
 * Credits : Caethyril for helping me to understand how to do that^^
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 30.12.2020 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_MapStateOverlay") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_MapStateOverlay>'); });

  var _SOSanchorBX = Number(parameters['SOSanchorBX'] || 0.5);
  var _SOSanchorBY = Number(parameters['SOSanchorBY'] || 1);
  var _SOSanchorMX = Number(parameters['SOSanchorMX'] || 0.5);
  var _SOSanchorMY = Number(parameters['SOSanchorMY'] || 0.8);

  var _checkSOS = false;
//-----------------------------------------------------------------------------------------

    // overwrite the default Anchor of StateOverlaySprite
    Sprite_StateOverlay.prototype.initMembers = function() {
        this._battler = null;
        this._overlayIndex = 0;
        this._animationCount = 0;
        this._pattern = 0;

        //Dopan INFO=> stuff above is the default Content, stuff below checks the Scene and sets the Anchor

        if (SceneManager._scene instanceof Scene_Battle === true) {
        this.anchor.x = _SOSanchorBX; // 0.5; 
        this.anchor.y = _SOSanchorBY; //  1;  

        };

        if (SceneManager._scene instanceof Scene_Map === true) {
        this.anchor.x = _SOSanchorMX; // 0.5;
        this.anchor.y = _SOSanchorMY; //  0.8;

        };
    };                                                     
//--------------------------------- Sprite_Character:

        // create Overlay
	Sprite_Character.prototype.createOverlay = function() {
		if (!this._stateSprite) {
                    var battleUnit = $gameSystem.EventToUnit(this._character.eventId());
		    this._stateSprite = new Sprite_StateOverlay();
		    this._stateSprite.setup(battleUnit[1]);
		    this.addChild(this._stateSprite);
		}
	};

        // update Overlay
	var _SRPG_Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
	Sprite_Character.prototype.updateCharacterFrame = function() {
		_SRPG_Sprite_Character_updateCharacterFrame.call(this);

		if ($gameSystem.isSRPGMode() == true && this._character.isEvent() == true) {
		    var battleUnit = $gameSystem.EventToUnit(this._character.eventId());
		    if (battleUnit) {
			this.createOverlay();
		    }
		}
	};

//--------------------------------- can be used to check the overlay in console F8

//SceneManager._scene._spriteset._characterSprites[eventID - 1]._stateSprite
  
//---------------------------------but the "eventID" must be added..



//--End:

})();
