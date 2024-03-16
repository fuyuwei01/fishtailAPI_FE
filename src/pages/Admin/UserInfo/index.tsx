
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

import {
  addInterfaceinfoUsingPost,
  deleteInterfaceinfoUsingPost,
  listInterfaceinfoByPageUsingPost, publishInterfaceinfoUsingPost, shutdownInterfaceinfoUsingPost,
  updateInterfaceinfoUsingPost
} from "@/services/fishtailAPI/interfaceinfoController";
import {
  deleteUserUsingPost, listUserVoByPageUsingPost, listUserByPageUsingPost, listAdminUserVoByPageUsingPost
} from "@/services/fishtailAPI/userController";
import type { SortOrder } from "antd/lib/table/interface";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from './components/UpdateModal';




const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Interfaceinfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.Interfaceinfo[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  /**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
  const handleAdd = async (fields: API.Interfaceinfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceinfoUsingPost({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error: any) {
      hide();
      message.error('Adding failed, please try again!' + error.message);
      return false;
    }
  };
  /**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
  const handleUpdate = async (fields: API.Interfaceinfo) => {

    const hide = message.loading('Updating');
    try {
      await updateInterfaceinfoUsingPost({
        id:currentRow.id,
        ...fields,


      });
      hide();
      message.success('Update successful');
      return true;
    } catch (error) {
      hide();
      message.error('Update failed, please try again!');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除账户
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.Interfaceinfo) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteUserUsingPost({
        id:selectedRows.id
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again'+error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 上线节点
   *
   * @param selectedRows
   */
  const handlePublish = async (selectedRows: API.Interfaceinfo) => {
    const hide = message.loading('正在上线');
    if (!selectedRows) return true;
    try {
      await publishInterfaceinfoUsingPost({
        id:selectedRows.id
      });
      hide();
      message.success('Publish successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('Publish failed, please try again, '+error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除账户
   *
   * @param selectedRows
   */
  const handleDelete = async (selectedRows: API.Interfaceinfo) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteUserUsingPost({
        id:selectedRows.id
      });
      hide();
      message.success('Delete successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('Delete failed, please try again, '+error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 下线节点
   *
   * @param selectedRows
   */
  const handleShutdown = async (selectedRows: API.Interfaceinfo) => {
    const hide = message.loading('正在下线');
    if (!selectedRows) return true;
    try {
      await shutdownInterfaceinfoUsingPost({
        id:selectedRows.id
      });
      hide();
      message.success('Shutdown successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      message.error('Delete failed, please try again, '+error.message);
      return false;
    }
  };

  const columns: ProColumns<API.Interfaceinfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      tip: '用户id',
      valueType: 'index',
    },
    {
      title: '账户',
      dataIndex: 'userAccount',
      tip: '账户',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入接口名称'
          }
        ]
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'textarea',
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text'
    },
    {
      title: '用户描述',
      dataIndex: 'userProfile',
      valueType: 'text'
    },
    {
      title: 'accessKey',
      dataIndex: 'accessKey',
      valueType: 'text'
    },
    {
      title: 'secretKey',
      dataIndex: 'secretKey',
      valueType: 'text'
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Button
          type={"text"}
        key="config"
        danger
        onClick={() => {
          handleRemove(record);
        }}
      >
        删除
      </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Interfaceinfo, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const sortField = Object.keys(sort)[0];
          const sortOrder = sort[sortField];

          const res = await listAdminUserVoByPageUsingPost(
            {
              ...params,
              ...(sortField &&
              {
                sortField
              }),
              ...(sortOrder &&
              {
                sortOrder
              }),
              ...filter
            }
          )
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible = {updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.Interfaceinfo>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.Interfaceinfo>[]}
          />
        )}
      </Drawer>
      <CreateModal columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      ></CreateModal>
    </PageContainer>
  );
};
export default TableList;
