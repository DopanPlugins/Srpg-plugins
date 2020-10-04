/*:
 * @plugindesc Additional SRPG AoE shapes
 * @author dopan (default AOE JS Codes from DrQ)
 *
 * @help
 *
 *================================== Upgraded +11 AoE types added=================================================
 * 
 *          'test'_'pyramide'_'sun'_'meteor'_'cata'_'canon'_'hammer'_'axe'_'lancer'_'moon'_'bomb'
 *             (For more information:Ask in Forum for the"Recommended AreaRange Help"-File)  
 * 
 *                      All Types are COMPATIBLE with <srpgAreaMinRange:x>                                                                 
 *                On some of them its really Usefull and on others not so much ..
 *           No recommended "AreaMinRanges" added ,try it out to see what it looks like.
 *   Use it depending on the *"AreaRange" you use.. *shown in the "Recommended AreaRange Help"-File
 *
 *                                       *****DEFAULT FORMULAS*****
 *                                            (from SRPG_AOE)
 *case 'line':
 *if (rx != 0) return false;
 *if (ry > size || ry < minSize) return false;
 *return true;
 *
 *case 'cone':
 *if (ry > size || ry < minSize) return false;
 *if (Math.abs(rx) > Math.abs(ry)) return false;
 *return true;
 *
 *case 'split':
 *if (ry > size || ry < minSize) return false;
 *if (Math.abs(rx) != Math.abs(ry)) return false;
 *return true;
 *
 *case 'arc':
 *if (ry < -size || ry > -minSize) return false;
 *if (Math.abs(rx) != Math.abs(ry)) return false;
 *return true;
 *
 *case 'side':
 *if (ry != 0) return false;
 *if (Math.abs(rx) > size || Math.abs(rx) < minSize) return false;
 *return true;
 *
 *case 'tee':
 *if (ry < 0) return false;
 *if (x != 0 && y != 0) return false;
 *if (Math.abs(x) > size || Math.abs(y) > size) return false;
 *if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false;
 *return true;
 *
 *case 'plus':
 *if (x != 0 && y != 0) return false;
 *if (Math.abs(x) > size || Math.abs(y) > size) return false;
 *if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false;
 *return true;
 *
 *case 'cross':
 *if (Math.abs(x) != Math.abs(y)) return false;
 *if (Math.abs(x) > size || Math.abs(x) < minSize) return false;
 *return true;
 *
 *case 'star':
 *if (Math.abs(x) != Math.abs(y) && x != 0 && y != 0) return false;
 *if (Math.abs(x) > size || Math.abs(y) > size) return false
 *if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false
 *return true;
 *
 *case 'checker':
 *if ((x + y) % 2 != 0) return false;
 *if (Math.abs(x) > size || Math.abs(y) > size) return false
 *if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false
 *return true;
 *
 *case 'square':
 *if (Math.abs(x) > size || Math.abs(y) > size) return false;
 *if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false
 *return true;
 *
 *case 'circle':
 *if (Math.abs(x) + Math.abs(y) > size || Math.abs(x) + Math.abs(y) < minSize) return false;
 *return true;
 *
 *
 *                                         **END OF HELP SECTION**
 *
 *================================================================================================================
 *
 * 
 */

(function(){

	// space to add new AoE shapes
	var _extraAreas = Game_Map.prototype.extraAreas;
	Game_Map.prototype.extraAreas = function(shape, x, y, rx, ry, size, minSize) {
		// x and y are the position. 0, 0 is the AoE's origin.
		// rx and ry are the position relative to the facing direction.
			// ry is the distance in front of the origin.
			// rx is the distance to the left of the origin.
			// ry and rx can be negative, for behind and to the right, respectively.

		// size is the maximum range. size 0 only covers the origin.
		// minSize is the minimum range. minSize 1 or greater will exclude the origin.
			// Cells outside of a square range centered on the origin will be ignored.
			// So, a size of 1 has a 3x3 square maximum, size 2 has a 5x5, and so on.

		switch (shape) {
		
                        case 'pyramide': // square - cross = pyramide
                                if (Math.abs(x) > size || Math.abs(y) > size) return false; // inside square
                                if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false; // outside min size square
                                if (Math.abs(x) == Math.abs(y)) return false; // not along the X-shape
                                return true;	

                        case 'sun': // 
				if (Math.abs(x) > size || Math.abs(y) > size) return false; // = add ("square_Size")
                                if (Math.abs(x) < minSize || Math.abs(y) < minSize) return false; // = add ("square_MinSize")
				if (Math.abs(x) == Math.abs(y) || x == 0 || y == 0) return true; // = take away or opposite ("axe")
				if (Math.abs(x)+Math.abs(y) > size - 3) return false; // = add ("circle_Size -3")
                                if (Math.abs(x)+Math.abs(y) < minSize - 3) return false; // = add ("circle_MinSize -3")
				if (Math.abs(x)+Math.abs(y) - 3 > size) return false; // = add ("-3_circle_Size")
                                if (Math.abs(x)+Math.abs(y) - 3 < minSize) return false; // = add ("-3_circle_MinSize")
				return true; // = formula end

			case 'moon': // 
                                if (Math.abs(x) + Math.abs(y) > size || Math.abs(x) + Math.abs(y) < minSize) return false; // = add ("circle_Size&MinSize")
				if (Math.abs(x) == Math.abs(y) || x == 0 || y == 0) return false; // = add ("axe")
				return true; // = formula end

			case 'axe': // 
				if (Math.abs(x) > size || Math.abs(y) > size) return false; // = add ("square_Size")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false; // = add ("square_MinSize")
                                if (Math.abs(x) == Math.abs(y) || x == 0 || y == 0) return false; // = add ("axe")
				return true; // = formula end
 
			case 'cata':
				if (Math.abs(x) > size || Math.abs(y) > size) return false; // = add ("square_Size")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false; // = add ("square_MinSize")
				if (Math.abs(x) + Math.abs(y) < size) return false; // = add ("circle_Size with < size")                             
				if (x != 0 && y != 0) return true; // = take away ("plus"_1")
				if (Math.abs(x) > size || Math.abs(y) > size) return true; // = take away ("plus"_2")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return true; // = take away ("plus"_3")
				return false; // = needed if there was some "return true" BEFORE the end of Formula
				return true; // = formula end

			case 'canon':
				if (Math.abs(x) > size || Math.abs(y) > size) return false; // = add ("square_Size")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false; // = add ("square_MinSize")
                                if (Math.abs(x) + Math.abs(y) > size || Math.abs(x) + Math.abs(y) < minSize) return true; // = take away ("circle_Size&MinSize")
                                if (Math.abs(x) != Math.abs(y)) return false;  // = add ("cross_Size")
				if (Math.abs(x) > size || Math.abs(x) < minSize) return false; // = add ("cross_Size&MinSize")
				return true; // = formula end

			case 'lancer':
				if (Math.abs(x) + Math.abs(y) > size || Math.abs(x) + Math.abs(y) < minSize) return false; // = add ("circle_Size&MinSize")
				if (x != 0 && y != 0) return true; // = take away ("plus"_1")
				if (Math.abs(x) > size || Math.abs(y) > size) return true; // = take away ("plus"_2")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return true; // = take away ("plus"_3")
				return false; // = needed if there was some "return true" BEFORE the end of Formula
				return true; // = formula end

			case 'hammer':
				if (Math.abs(x) > size || Math.abs(y) > size) return false; // = add ("square_Size")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return false; // = add ("square_MinSize")
				if (x != 0 && y != 0) return true; // = take away ("plus"_1")
				if (Math.abs(x) > size || Math.abs(y) > size) return true; // = take away ("plus"_2")
				if (Math.abs(x) < minSize && Math.abs(y) < minSize) return true; // = take away ("plus"_3")
				return false; // = needed if there was some "return true" BEFORE the end of Formula
				return true; // = formula end

			case 'meteor': //dont work
                                if (Math.abs(x+3)+Math.abs(y+3) > size) return false; // = add ("circle +(dx+3 and dy+3)_Size")
                                if (Math.abs(x+3)+Math.abs(y+3) < minSize) return false; // = add ("circle +(dx+3 and dy+3)_MinSize")
				if (Math.abs(x) == Math.abs(y) || x == 0 || y == 0) return true; // = take away ("axe")
				return false; // = needed if there was some "return true" BEFORE the end of Formula
				return true; // = formula end

			case 'bomb': //dont work
				if (Math.abs(x)+Math.abs(y) + 4 > size) return false; // = add ("circle_Size +4")
                                if (Math.abs(x)+Math.abs(y) + 4 < minSize) return false; // = add ("circle_MinSize +4")
				if (Math.abs(x) == Math.abs(y) || x == 0 || y == 0) return true; // = take away ("axe")
				return false; // = needed if there was some "return true" BEFORE the end of Formula
				return true; // = formula end   
                                
			case 'test': // test Default Circle
                                if (Math.abs(x) + Math.abs(y) > size || Math.abs(x) + Math.abs(y) < minSize) return false;
				return true; // = formula end  

			default: // LEAVE THIS HERE! It allows you to use multiple extra AoE plugins at once
				return _extraAreas.call(this, shape, x, y, rx, ry, size, minSize);
		}
	};

})();