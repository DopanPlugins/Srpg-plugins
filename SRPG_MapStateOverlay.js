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
 *
 *
 *
 * -> plug & play !
 *
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

    // adds the StateOverlaySprite to MapBattles..
    Game_Interpreter.prototype.srpgStateOverlay = function() {
        for (var i = 1; i <= $gameMap.events().length; i++) {
             var battleunit = $gameSystem.EventToUnit([i]);
             var eventunit = $gameMap.event([i]);
             var spriteset = SceneManager._scene._spriteset;
             var eventId = [i];
             var sprChar = spriteset._characterSprites[eventId - 1];
             if (battleunit && eventunit && (battleunit[0] === 'actor' || battleunit[0] === 'enemy') && (!battleunit[1].isDead())) {
                 sprChar._stateSprite = new Sprite_StateOverlay();  // init
                 sprChar.addChild(sprChar._stateSprite);            // add
                 sprChar._stateSprite.setup(battleunit[1]);         // setup
             }
         
        }return true;
    };

    // updates the StateOverlaySprite Function on Scene change..
    Scene_Base.prototype.update = function() {
        this.updateFade();
        this.updateChildren();

        //Dopan INFO=> edited part starts here, stuff above is the Default Function Content

        if (SceneManager._scene instanceof Scene_Menu === true) {
            _checkSOS = false;

        }
        if (SceneManager._scene instanceof Scene_Battle === true) {
            _checkSOS = false;

        }
        if (SceneManager._scene instanceof Scene_Map === true) {    
            if (_checkSOS === false) {
                Game_Interpreter.prototype.srpgStateOverlay.call(this);
                _checkSOS = true;

            }

        }

    };

    // overwrite Battlestart Event calling Function to initialize StateOverlaySprite..
    Game_System.prototype.runBattleStartEvent = function() {
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'battleStart') {
                if (event.pageIndex() >= 0) event.start();
                $gameTemp.pushSrpgEventList(event);
            }
        });

        //Dopan INFO=> stuff above is default content, stuff below initializes StateOverlaySprite at Battlestart
        Game_Interpreter.prototype.srpgStateOverlay.call(this);

    };

//-----------------------------------------------------------------------------------------



//--End:

})();