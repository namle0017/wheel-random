/**
 * inputParser.js
 * Parse raw textarea input vào danh sách tên đã clean.
 * 
 * Rules:
 * - Mỗi dòng = 1 tên
 * - Trim whitespace đầu/cuối
 * - Loại bỏ dòng trống
 * - Giữ nguyên Unicode / tiếng Việt
 * - Giữ tên trùng nhau (không deduplicate)
 */

/**
 * @param {string} rawText - Nội dung textarea
 * @returns {string[]} Mảng tên đã clean, không rỗng
 */
export function parseNames(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return [];
  }

  return rawText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
