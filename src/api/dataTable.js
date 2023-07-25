import service from '@/utils/request'
import { useRouterQuery } from '@/utils/getRouterQuery.js'
export function getDataTableData() {
  const { station } = useRouterQuery()
  return service({
    url: `${window.apiConfig.baseURL}/report/usageRate/status/${station.value}`,
    method: 'get',
    // params: query,
  })
}
