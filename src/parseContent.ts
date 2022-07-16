import StateInline from 'markdown-it/lib/rules_inline/state_inline'

const open = 0x28 /* ( */
const close = 0x29 /* ) */

/**
 * If successful, returns end pos.
 * Else, returns -1
 */
export const parseContent = (
  state: StateInline, start: number, maxContentLen: number,
  isMultiLine: boolean): number => {
  let pos = start
  const max = state.posMax
  // check color name length is Exceed max len
  const isExceedLen = (pos: number): boolean => {
    return maxContentLen != 0 && (pos - start) > maxContentLen
  }
  // check char is enter
  const isNotValidChar = (char: number): boolean => {
    return [10, 13].indexOf(char) >= 0
  }

  if (pos < max && state.src.charCodeAt(pos) === open) {
    pos++

    let level = 1
    while (pos < max) {
      const char = state.src.charCodeAt(pos)
      if (isExceedLen(pos) || (!isMultiLine && isNotValidChar(char))) {
        return -1
      }
      if (char === close) {
        level--

        if (level === 0) {
          return pos
        }
      } else if (char === open) {
        level++
      }
      pos++
    }

    // if we failed to find ")"
    return -1
  } else {
    // if we failed to find "("
    return -1
  }
}
