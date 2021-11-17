import { useHistory } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Button, message, Modal } from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { CopyIconButton } from '@/components/CopyToClipboard'
import styles from './index.module.less'
import { useClusterContext } from '@apps/main/[3]cluster/[1]instances/[-2]_clusterId/context'
import {
  invalidateClusterBackups,
  invalidateClusterDetail,
  useCreateClusterBackup,
  useDeleteCluster,
} from '@/api/hooks/cluster'
import { resolveRoute } from '@pages-macro'
import { useQueryClient } from 'react-query'
import Header from '@/components/Header'
import { loadI18n, useI18n } from '@i18n-macro'
import { errToMsg } from '@/utils/error'
import {
  ImportPanel,
  ExportPanel,
} from '@apps/main/[3]cluster/[1]instances/[-2]_clusterId/components/TransportPanel'
import { DeleteConfirm } from '@/components/DeleteConfirm'

loadI18n()

export default function HeaderBar() {
  const history = useHistory()
  const cluster = useClusterContext()
  const createBackup = useCreateClusterBackup()
  const deleteCluster = useDeleteCluster()
  const queryClient = useQueryClient()
  const { t, i18n } = useI18n()

  const { clusterId, statusName } = cluster

  const [importPanelVisible, setImportPanelVisible] = useState(false)
  const [exportPanelVisible, setExportPanelVisible] = useState(false)

  const header = useMemo(() => {
    const backToList = () => history.push(resolveRoute('../'))
    const handleBackup = async () => {
      await createBackup.mutateAsync(
        { clusterId },
        {
          onSuccess(data) {
            message.success(
              t('backup.success', { msg: data.data.data!.clusterId })
            )
          },
          onSettled() {
            return invalidateClusterBackups(queryClient, clusterId!)
          },
          onError(e: any) {
            message.error(
              t('backup.fail', {
                msg: errToMsg(e),
              })
            )
          },
        }
      )
    }
    const handleDelete = async () => {
      await deleteCluster.mutateAsync(
        { id: clusterId! },
        {
          onSuccess(data) {
            message.success(
              t('delete.success', { msg: data.data.data!.clusterId })
            )
          },
          onSettled() {
            return invalidateClusterDetail(queryClient, clusterId!)
          },
          onError(e: any) {
            message.error(
              t('delete.fail', {
                msg: errToMsg(e),
              })
            )
          },
        }
      )
    }
    const backupBtn = (
      <Button
        key="backup"
        onClick={() => {
          Modal.confirm({
            content: t('backup.confirm', { name: cluster.clusterName! }),
            onOk: handleBackup,
          })
        }}
      >
        <SaveOutlined /> {t('actions.backup')}
      </Button>
    )
    const deleteBtn = (
      <DeleteConfirm
        key="delete"
        title={t('delete.confirm')}
        confirmInput={{
          expect: 'delete',
        }}
        onConfirm={handleDelete}
      >
        <Button danger>
          <DeleteOutlined /> {t('actions.delete')}
        </Button>
      </DeleteConfirm>
    )

    const actions = [
      // TODO: wait for edit support
      // <Button key="1">
      //   <EditOutlined />
      //   {t('actions.edit')}
      // </Button>,
      <Button key="import" onClick={() => setImportPanelVisible(true)}>
        <UploadOutlined />
        {t('actions.import')}
      </Button>,
      <Button key="export" onClick={() => setExportPanelVisible(true)}>
        <DownloadOutlined />
        {t('actions.export')}
      </Button>,
      // TODO: wait for reboot support
      // <Button key="4">
      //   <RedoOutlined />
      //   {t('actions.reboot')}
      // </Button>,
      backupBtn,
      deleteBtn,
    ]
    return (
      <Header
        onBack={backToList}
        className={styles.header}
        title={t('title')}
        subTitle={
          <>
            <CopyIconButton
              text={clusterId!}
              label={t('model:cluster.property.id')}
            />{' '}
            ID: {clusterId}
          </>
        }
        extra={actions}
      />
    )
  }, [
    clusterId,
    statusName,
    createBackup.mutateAsync,
    deleteCluster.mutateAsync,
    i18n.language,
    history,
    queryClient,
  ])
  return (
    <>
      {header}
      <ImportPanel
        clusterId={clusterId!}
        close={() => setImportPanelVisible(false)}
        visible={importPanelVisible}
      />
      <ExportPanel
        clusterId={clusterId!}
        close={() => setExportPanelVisible(false)}
        visible={exportPanelVisible}
      />
    </>
  )
}