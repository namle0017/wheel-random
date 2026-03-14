/**
 * weightedRandom.js
 * Chọn ngẫu nhiên 1 phần tử theo weighted probability.
 */

/**
 * Chọn 1 phần tử ngẫu nhiên theo trọng số.
 * @param {{ name: string, weight: number }[]} entries - Mảng entries có weight
 * @returns {number} Index được chọn, hoặc -1 nếu mảng rỗng
 */
export function weightedRandomSelect(entries) {
  if (!entries || entries.length === 0) return -1;

  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
  if (totalWeight <= 0) return -1;

  let random = Math.random() * totalWeight;

  for (let i = 0; i < entries.length; i++) {
    random -= entries[i].weight;
    if (random <= 0) {
      return i;
    }
  }

  // Fallback (floating point edge case)
  return entries.length - 1;
}

/**
 * Tính góc quay trên wheel cho từng entry.
 * @param {{ name: string, weight: number }[]} entries
 * @returns {{ name: string, weight: number, startAngle: number, endAngle: number }[]}
 */
export function calculateSliceAngles(entries) {
  if (!entries || entries.length === 0) return [];

  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
  if (totalWeight <= 0) return [];

  let currentAngle = 0;

  return entries.map(entry => {
    const sliceAngle = (entry.weight / totalWeight) * 360;
    const result = {
      ...entry,
      startAngle: currentAngle,
      endAngle: currentAngle + sliceAngle,
    };
    currentAngle += sliceAngle;
    return result;
  });
}
