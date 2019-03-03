export default function canvasImageCoverPosition (imgNaturalWidth, imgNaturalHeight , canvasWidth, canvasHeight, offsetLeft, offsetTop) {
    var A1,A2,A3,B1,B2,B3,dA,dB;
    offsetLeft = offsetLeft || 0.5;
    offsetTop = offsetTop || 0.5;
    A1 = imgNaturalWidth;
    A2 = canvasWidth;
    dA = A2 - A1;
    B1 = imgNaturalHeight;
    B2 = canvasHeight;
    dB = B2 - B1;
    if (dA < dB) {
      B3 = B2;
      A3 = A1 + (A1 * ((dB * 100) / B1)) / 100;
    }
    else {
      A3 = A2;
      B3 = B1 + (B1 * ((dA * 100) / A1)) / 100;
    }
    return {width: A3, height:B3, offsetLeft: round((A2 - A3) * offsetLeft), offsetTop: round((B2 - B3) * offsetTop)};
    function round(v) {
      return (+(v >= 0) || -1) * Math.round(Math.abs(v));
    }
}