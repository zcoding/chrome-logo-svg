function drawChrome(innerSize, outerSize, innerGap, position) {
  var googleRed = '#db3236';
  var googleGreen = '#3cba54';
  var googleYellow = '#f4c20d';
  var googleBlue = '#4885ed';
  var colorWhite = '#fff';

  var logo = Snap(Math.abs(2*position.x), Math.abs(2*position.y));
  var backgroundCircle = logo.circle(position.x, position.y, outerSize);
  backgroundCircle.attr({
    fill: colorWhite
  });

  var innerCircleWhite = logo.circle(position.x, position.y, innerSize);
  innerCircleWhite.attr({
    fill: colorWhite
  });

  var innerCircleBlue = logo.circle(position.x, position.y, innerSize-innerGap);
  innerCircleBlue.attr({
    fill: googleBlue
  });

  // 计算关键点p1,p2,p3
  function calculateP1P2P3() {
    var alpha = Math.acos(innerSize / outerSize);
    var d3x = outerSize * Math.sin(alpha);
    var p3 = {
      x: position.x + d3x,
      y: position.y - innerSize
    };
    var d2x = innerSize * Math.cos(Math.PI / 6);
    var d2y = innerSize * Math.sin(Math.PI / 6);
    var p2 = {
      x: position.x - d2x,
      y: position.y + d2y
    };

    var d1x = d3x*Math.cos(Math.PI/3) + d2x;
    var d1y = d3x * Math.sin(Math.PI/3) - innerSize * Math.sin(Math.PI / 6);
    var p1 = {
      x: position.x - d1x,
      y: position.y - d1y
    };
    return {
      p1: p1,
      p2: p2,
      p3: p3
    };
  }

  var points = calculateP1P2P3();
  var p1 = points.p1, p2 = points.p2, p3 = points.p3;

  var partRed = logo.path('M' + p1.x + ',' + p1.y + ' L' + p2.x + ',' + p2.y + ' A' + innerSize + ',' + innerSize + ',0,0,1,' + position.x + ',' + (position.y-innerSize) + ' L' + p3.x + ',' + p3.y + ' A' + outerSize + ',' + outerSize + ',0,0,0,' + p1.x + ',' + p1.y + ' Z');
  partRed.attr({
    fill: googleRed
  });

  var partYellow = logo.path('M' + p1.x + ',' + p1.y + ' L' + p2.x + ',' + p2.y + ' A' + innerSize + ',' + innerSize + ',0,0,1,' + position.x + ',' + (position.y-innerSize) + ' L' + p3.x + ',' + p3.y + ' A' + outerSize + ',' + outerSize + ',0,0,0,' + p1.x + ',' + p1.y + ' Z');
  partYellow.attr({
    fill: googleYellow
  });

  var partGreen = logo.path('M' + p1.x + ',' + p1.y + ' L' + p2.x + ',' + p2.y + ' A' + innerSize + ',' + innerSize + ',0,0,1,' + position.x + ',' + (position.y-innerSize) + ' L' + p3.x + ',' + p3.y + ' A' + outerSize + ',' + outerSize + ',0,0,0,' + p1.x + ',' + p1.y + ' Z');
  partGreen.attr({
    fill: googleGreen
  });

  var rotate120deg = Snap.matrix();
  rotate120deg.rotate(120, position.x, position.y);
  partYellow.transform(rotate120deg);

  rotate120deg.rotate(120, position.x, position.y);
  partGreen.transform(rotate120deg);

  logo.group(partRed, partYellow, partGreen);
  logo.group(innerCircleWhite, innerCircleBlue);

  return logo;
}

var logo = drawChrome(70, 140, 15, {x: 150, y: 150});
logo.click(function() {
  logo.toggleClass('rotate');
});
logo.prependTo(document.body);
