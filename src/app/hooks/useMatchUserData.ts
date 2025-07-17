export function matchClosestProfile(
  user: { height: number; weight: number; gender: string },
  data: any[]
) {
  let closest = data[0];
  let minDist = Infinity;

  for (const row of data) {
    if (row.gender !== user.gender) continue;

    const dist = Math.sqrt(
      Math.pow(user.height - row.height, 2) +
        Math.pow(user.weight - row.weight, 2)
    );

    if (dist < minDist) {
      minDist = dist;
      closest = row;
    }
  }

  return closest;
}
