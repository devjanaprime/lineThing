// line thing
// math for Scott
// last edited 4-21-2016

// user line info
var userLineX1;
var userLineY1;
var userLineX2;
var userLineY2;
var userLineSlope;

// system line info
var systemLineX1;
var systemLineY1;
var systemLineX2;
var systemLineY2;
var systemLineSlope;
var systemLineMidPointX;
var systemLineMidPointY;

// radius for circle intercept checks
var circleRadius;

function circleCheck( ux1, uy1, ux2, uy2, cx, cy, cr )
{
  var dx = ux2 - ux1;
  var dy = uy2 - uy1;
  var a = dx * dx + dy * dy;
  var b = 2 * (dx * (ux1 - cx) + dy * (uy1 - cy));
  var c = cx * cx + cy * cy;
  c += ux1 * ux1 + uy1 * uy1;
  c -= 2 * (cx * ux1 + cy * uy1);
  c -= cr * cr;
  var intersect = b * b - 4 * a * c;

  if(intersect<0)
  {
    return false;
  }
  else
  {
    return true;
  }
}

function distBetweenPoints( x1, y1, x2, y2 )
{
  var deltaX = x2-x1;
  alert( deltaX );
  var deltaY = y2-y1;
  alert( deltaY );
  var dist = Math.sqrt( deltaX*deltaX + deltaY*deltaY );
  return dist;
}

function midPoint( v1, v2 )
{
  var mid = ( v1 + v2 ) / 2;
}

function userLine( x1, y1, x2, y2 )
{
  userLineX1 = x1;
  userLineY1 = y1;
  userLineX2 = x2;
  userLineY2 = y2;
  userLineSlope = slope( userLineX1, userLineY1, userLineX2, userLineY2 );
}

function slope( x1, y1, x2, y2 )
{
  var deltaX = x2-x1;
  var deltaY = y2-y1;
  var slope = deltaY/deltaX;
  return slope;
}

function systemLine( x1, y1, x2, y2 )
{
  systemLineX1 = x1;
  systemLineY1 = y1;
  systemLineX2 = x2;
  systemLineY2 = y2;
  userLineSlope = slope( systemLineX1, systemLineY1, systemLineX2, systemLineY2 );
  systemLineMidPointX = midPoint( systemLineX1 , systemLineX2 );
  systemLineMidPointY = midPoint( systemLineY1 , systemLineY2 );
}


function doThingz()
{
  ////////////// REPLACED BY ACTUALLY GETTING USER INPUT /////////////////
  // set user line
  var tempX1 = document.getElementById("userx1").value;
  var tempY1 = document.getElementById("usery1").value;
  var tempX2 = document.getElementById("userx2").value;
  var tempY2 = document.getElementById("usery2").value;
  userLine( tempX1, tempY1, tempX2, tempY2 );

  ////////////// REPLACED BY ACTUALLY SETTING VIA SYSTEM /////////////////
  // set radius
  circleRadius = document.getElementById("radius").value;

  // set system line
  tempX1 = document.getElementById("systemx1").value;
  tempY1 = document.getElementById("systemy1").value;
  tempX2 = document.getElementById("systemx2").value;
  tempY2 = document.getElementById("systemy2").value;
  systemLine( tempX1, tempY1, tempX2, tempY2 );

  ///////////////// END REPLACE LATER ////////////////////

  // start point distance
  var startPointDist = distBetweenPoints( userLineX1, userLineY1, systemLineX1, systemLineY1 );
  // end point distance
  var endPointDist = distBetweenPoints( userLineX2, userLineY2, systemLineX2, systemLineY2 );
  // start circle check
  var startCircleCheck = circleCheck( userLineX1, userLineY1, userLineX2, userLineY1, systemLineX1, systemLineY1, circleRadius );
  // end circle check
  var endCircleCheck =  circleCheck( userLineX1, userLineY1, userLineX2, userLineY2, systemLineX2, systemLineY1, circleRadius );
  // mid point circle check
  var midCircleCheck =  circleCheck( userLineX1, userLineY1, userLineX2, userLineY2, systemLineMidPointX, systemLineMidPointY, circleRadius );

  // genero output
  document.getElementById( "startDistanceOutput" ).innerHTML = "Start pt dist: " + startPointDist;
  document.getElementById( "endDistanceOutput" ).innerHTML = "End pt dist: " + endPointDist;
  document.getElementById( "circleCheckStartOutput" ).innerHTML = "Star circle intersect: " + startCircleCheck;
  document.getElementById( "circleCheckMidOutput" ).innerHTML = "Mid circle intersect: " + midCircleCheck;
  document.getElementById( "circleCheckEndOutput" ).innerHTML = "End circle intersect: " + endCircleCheck;
}
