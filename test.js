const Color = require('color');
const hexToRgb = require('hex-rgb');
const rgbToHex = require('rgb-hex');

console.log(
  rgbToHex(
    Color.rgb(hexToRgb('1991D0'))
      .rotate(6)
      .saturate(0.25)
      .darken(0.3)
      .rgb()
      .array()
      .map(Math.round)
  )
);
