function getDistance(start, end) {
  let R = 6371; // Radius of the earth in km
  let latituteDist = degreeToRadians(end.x - start.x);
  let longtituteDist = degreeToRadians(end.y - start.y);
  let arc =
    Math.sin(latituteDist / 2) * Math.sin(latituteDist / 2) +
    Math.cos(degreeToRadians(start.x)) * Math.cos(degreeToRadians(end.x)) *
    Math.sin(longtituteDist / 2) * Math.sin(longtituteDist / 2);
  let distance = R * 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
  return distance;
}

function degreeToRadians(degree) {
  return degree * (Math.PI / 180)
}

module.exports = getDistance;