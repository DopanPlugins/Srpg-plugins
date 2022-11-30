//=============================================================================
// SRPG_AutoCursorFirst.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_AutoCursorFirst> Cursor move to Destination before autoUnits in SRPG battle
 * @author dopan
 *
 *
 *
 *
 * @help  
 *
 *          Requires: SRPG_core.js & SRPG_AIControl
 *
 *    -> place it somewhere under both of them & any other AI plugin,
 *       which decides over autoUnits movement..
 *
 * plug & play!
 *
 * In the SRPG_core and in SRPG_AIControl, auto units moved before the cursor,
 * .. That looked like the cursor chases behind autoUnit's Movement.
 *
 * This Plugin changes that, in order to let autoUnit's Movement wait,
 * till the Cursor has reached the Units Movement Destination.
 *
 * This Plugins uses the AI Position data of "srpg AI control" aka:
 *
 * --------------------------------------------------
 *  $gameTemp.AIPos();  # stores AI position data xy  
 * --------------------------------------------------
 *
 * So it should be compatible with other AI plugins that also use "$gameTemp.AIPos();"
 * aslong none of the few plugin functions from this plugin get overwritten..
 *
 * For Moving the Cursor this plugin uses the script from the SRPG_core:
 *
 * -------------------------------------------------------------------------------------------------------------
 *  $gameTemp.setAutoMoveDestinationValid(true);     # required to tell the srpg core that the cursor will move
 *
 *  $gameTemp.setAutoMoveDestination(pos.x, pos.y);  # set&execute cursor movement in srpg
 * -------------------------------------------------------------------------------------------------------------
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
 * - first Release 30.11.2022 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_AutoCursorFirst") ||
  $plugins.filter(function (plugin) {return plugin.description.contains('<SRPG_AutoCursorFirst>')});
 
  var _exeAutoRoute = false;
  var _exeAutoMove = false;


//-----------------------------------------------------------------------------------------

    // Overwrite enemy movement & store _exe data
    Scene_Map.prototype.srpgInvokeEnemyMove = function() {
	 if (!$gamePlayer.isStopping()) return;
	 // path to destination
	 var pos = $gameTemp.AIPos();
	 var route = $gameTemp.MoveTable(pos.x, pos.y)[1];
         $gameTemp.setAutoMoveDestinationValid(true);
         $gameTemp.setAutoMoveDestination(pos.x, pos.y);
         _exeAutoRoute = route; 
         _exeAutoMove = true;
    };

    // Overwrite auto-actor movement & store _exe data
    Scene_Map.prototype.srpgInvokeAutoActorMove = function() {
	 if (!$gamePlayer.isStopping()) return;
	 // path to destination
	 var pos = $gameTemp.AIPos();
	 var route = $gameTemp.MoveTable(pos.x, pos.y)[1];
         $gameTemp.setAutoMoveDestinationValid(true); 
         $gameTemp.setAutoMoveDestination(pos.x, pos.y);
         _exeAutoRoute = route; 
         _exeAutoMove = true;
    };

    // no automovement before auto cursor has reached move destination
    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SRPG_SceneMap_update.call(this);
        if ($gameSystem.isSRPGMode() == false) {
            return;
        }
        if ($gameTemp.isAutoMoveDestinationValid() == true && _exeAutoMove) { 
            var cursorX = $gamePlayer.x;
            var cursorY = $gamePlayer.y;
            var targetX = $gameTemp._autoMoveDestinationX;
            var targetY = $gameTemp._autoMoveDestinationY;
            if ((cursorX === targetX) && (cursorY === targetY)) {
               _exeAutoMove = false; 
               this.exeAutoMove(_exeAutoRoute);
            } else {return};
        };
    };

    // final execution of autoMovement
    Scene_Map.prototype.exeAutoMove = function(route) {
        var battler = $gameSystem.EventToUnit($gameTemp.activeEvent()._eventId);
        $gameSystem.setSrpgWaitMoving(true);
        $gameTemp.activeEvent().srpgMoveRouteForce(route);
        if (battler[0] === 'actor') {
            $gameSystem.setSubBattlePhase('auto_actor_action');
        } else {$gameSystem.setSubBattlePhase('enemy_action')}; 
    _exeAutoRoute = false;
    };

//------------------------------------------------------------------------------------
//--End:

})();
