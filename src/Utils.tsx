import { Cartesian2, HeightReference, HorizontalOrigin, VerticalOrigin } from "cesium";

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const basicPoint = {
    pixelSize: 10,
    outlineWidth: 1,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    heightReference : HeightReference.RELATIVE_TO_GROUND
};

export const basicLabel = {
    show: true,
    font: "14px sans-serif",
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    heightReference : HeightReference.RELATIVE_TO_GROUND,
    showBackground: true,
    horizontalOrigin: HorizontalOrigin.CENTER,
    verticalOrigin: VerticalOrigin.BASELINE,
    pixelOffset: new Cartesian2(7, -30)
}

/*!
 * JavaScript function to calculate the destination point given start point latitude / longitude (numeric degrees), bearing (numeric degrees) and distance (in m).
 *
 * Taken from http://movable-type.co.uk/scripts/latlong-vincenty-direct.html and optimized / cleaned up by Mathias Bynens <http://mathiasbynens.be/>
 * Based on the Vincenty direct formula by T. Vincenty, “Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations”, Survey Review, vol XXII no 176, 1975 <http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf>
 */
export function vincentyDirection(lng: number, lat: number, brng: number, dist: number) {

    function toRad(degrees: number) {
        return degrees * Math.PI / 180;
    }
    
    function toDeg(radians: number) {
        return radians * 180 / Math.PI;
    }

    const a = 6378137;
    const b = 6356752.3142;
    const f = 1 / 298.257223563; // WGS-84 ellipsiod
    const s = dist;
    const alpha1 = toRad(brng);
    const sinAlpha1 = Math.sin(alpha1);
    const cosAlpha1 = Math.cos(alpha1);
    const tanU1 = (1 - f) * Math.tan(toRad(lat));
    const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
    const sigma1 = Math.atan2(tanU1, cosAlpha1);
    const sinAlpha = cosU1 * sinAlpha1;
    const cosSqAlpha = 1 - sinAlpha * sinAlpha;
    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let cos2SigmaM = 0;
    let sinSigma = 0;
    let cosSigma = 0;
    let sigma = s / (b * A);
    let sigmaP = 2 * Math.PI;
    while (Math.abs(sigma - sigmaP) > 1e-12) {
        cos2SigmaM = Math.cos(2*sigma1 + sigma);
        sinSigma = Math.sin(sigma);
        cosSigma = Math.cos(sigma);
        const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b * A) + deltaSigma;
    };
    const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1
    const latitude = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    const revAz = Math.atan2(sinAlpha, -tmp); // final bearing
    return { lng: lng + toDeg(L), lat: toDeg(latitude) };
};