/**
 * groupClassifier.js
 * Phân loại danh sách tên vào 3 nhóm theo luật trọng số.
 * 
 * Ưu tiên: Khánh > Nam/Chi > Khác
 * - Tên chứa "Khánh" (case-insensitive) → nhóm Khánh
 * - Tên chứa "Nam" hoặc "Chi" (case-insensitive) → nhóm Nam/Chi
 * - Còn lại → nhóm Khác
 */

/**
 * @param {string[]} names - Mảng tên đã clean
 * @returns {{ khanh: string[], namChi: string[], other: string[] }}
 */
export function classifyNames(names) {
  const groups = {
    khanh: [],
    namChi: [],
    other: [],
  };

  if (!Array.isArray(names)) return groups;

  for (const name of names) {
    const lower = name.toLowerCase();

    if (lower.includes('khánh') || lower.includes('khanh')) {
      groups.khanh.push(name);
    } else if (lower.includes('nam') || lower.includes('chi')) {
      groups.namChi.push(name);
    } else {
      groups.other.push(name);
    }
  }

  return groups;
}
