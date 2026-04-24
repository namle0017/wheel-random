/**
 * weightCalculator.js
 * Tính trọng số cho từng cá nhân dựa trên phân nhóm.
 * 
 * Luật:
 * - Nhóm Khánh: tổng 70%
 * - Nhóm Nam/Chi: tổng 10%
 * - Nhóm Khác: tổng 20%
 * 
 * Nếu 1 nhóm trống → redistribute proportionally cho nhóm còn lại.
 * Trong mỗi nhóm → chia đều.
 */

const BASE_WEIGHTS = {
  thong: 100,
  khanh: 0,
  other: 0,
};

/**
 * Tính trọng số thực tế cho mỗi nhóm sau redistribution.
 * @param {{ thong: string[], khanh: string[], namChi: string[], other: string[] }} groups
 * @returns {{ thong: number, khanh: number, namChi: number, other: number }} phần trăm nhóm sau redistribute
 */
export function calculateGroupWeights(groups) {
  if (groups.thong && groups.thong.length > 0) {
    return { thong: 100, khanh: 0, namChi: 0, other: 0 };
  }

  const activeGroups = {};
  let totalActiveBase = 0;

  for (const [key, baseWeight] of Object.entries(BASE_WEIGHTS)) {
    if (groups[key] && groups[key].length > 0) {
      activeGroups[key] = baseWeight;
      totalActiveBase += baseWeight;
    }
  }

  // Nếu không có nhóm nào active → return 0
  if (totalActiveBase === 0) {
    return { thong: 0, khanh: 0, namChi: 0, other: 0 };
  }

  // Redistribute: scale từng nhóm active lên 100%
  const result = { thong: 0, khanh: 0, namChi: 0, other: 0 };
  for (const [key, weight] of Object.entries(activeGroups)) {
    result[key] = (weight / totalActiveBase) * 100;
  }

  return result;
}

/**
 * Tính trọng số cho từng cá nhân.
 * @param {string[]} names - Mảng tên đã clean
 * @param {{ khanh: string[], namChi: string[], other: string[] }} groups
 * @returns {{ name: string, weight: number, group: string }[]}
 */
export function calculateIndividualWeights(names, groups) {
  if (!names || names.length === 0) return [];

  const groupWeights = calculateGroupWeights(groups);
  const result = [];

  for (const [groupKey, members] of Object.entries(groups)) {
    if (members.length === 0) continue;

    const individualWeight = groupWeights[groupKey] / members.length;

    for (const name of members) {
      result.push({
        name,
        weight: individualWeight,
        group: groupKey,
      });
    }
  }

  return result;
}
