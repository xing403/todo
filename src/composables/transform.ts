import { dayjs } from 'element-plus'

export function useCurrentTimestamp() {
  return dayjs().valueOf()
}
export default {
  useCurrentTimestamp,
}
