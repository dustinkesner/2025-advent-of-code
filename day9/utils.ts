type Coordinates = [number, number];

/**
 * Checks if a point [x, y] is inside a polygon defined by a list of vertices [ [x1, y1], [x2, y2], ... ]
 * @param {Array<number>} point The point coordinates as [x, y].
 * @param {Array<Array<number>>} vs The vertices of the polygon as an array of [x, y] arrays.
 * @returns {boolean} True if the point is inside, false otherwise.
 */
export function isPointInsidePolygon(
  point: Coordinates,
  vs: Array<Coordinates>
): boolean {
  var x = point[0],
    y = point[1];
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Checks if a point is inside or on the boundary of a polygon
 */
export function isPointInsideOrOnPolygon(
  point: Coordinates,
  vs: Array<Coordinates>
): boolean {
  // Check if point is a vertex
  if (vs.some(v => v[0] === point[0] && v[1] === point[1])) {
    return true;
  }
  
  // Check if point is on an edge
  for (let i = 0; i < vs.length; i++) {
    const j = (i + 1) % vs.length;
    const [x1, y1] = vs[i];
    const [x2, y2] = vs[j];
    const [px, py] = point;
    
    // Check if point is on the line segment between vertices i and j
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    
    if (px >= minX && px <= maxX && py >= minY && py <= maxY) {
      // Check collinearity using cross product
      const crossProduct = (py - y1) * (x2 - x1) - (px - x1) * (y2 - y1);
      if (Math.abs(crossProduct) < 0.0001) {
        return true;
      }
    }
  }
  
  // Otherwise, check if it's inside
  return isPointInsidePolygon(point, vs);
}
