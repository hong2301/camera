// src/utils/delay.ts

/**
 * 延迟指定的时间（毫秒）
 * @param ms 要延迟的毫秒数
 * @returns 一个 Promise，在指定时间后 resolve
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
