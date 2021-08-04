import { setupWorker } from 'msw'
import platform from '@mock/platform'
import resources from '@mock/resources'
import cluster from '@mock/cluster'
import params from '@mock/params'
import backup from '@mock/backup'

export function initMock() {
  const worker = setupWorker(
    ...platform,
    ...resources,
    ...cluster,
    ...params,
    ...backup
  )
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}
