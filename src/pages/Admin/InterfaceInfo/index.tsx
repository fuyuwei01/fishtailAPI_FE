import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  addInterfaceinfoUsingPost,
  deleteInterfaceinfoUsingPost,
  listInterfaceinfoByPageUsingPost, publishInterfaceinfoUsingPost, shutdownInterfaceinfoUsingPost,
  updateInterfaceinfoUsingPost
} from "@/services/fishtailAPI/interfaceinfoController";
import type { SortOrder } from "antd/lib/table/interface";
import { RequestData } from "@ant-design/pro-table/es/typing";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import { values } from 'lodash';
import { useParams } from '@umijs/max';
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
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.Interfaceinfo) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteInterfaceinfoUsingPost({
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
      tip: '接口id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      tip: '接口名称',
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
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text'
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea'
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea'
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text'
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      colSize: 8,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
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
        record.status===0?<a
          key="publish"
          onClick={() => {
            handlePublish(record);
          }}
        >
          上线
        </a>:null,
        record.status!==0?<a
          key="shutdown"
          onClick={() => {
            handleShutdown(record);
          }}
        >
          下线
        </a>:null,
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

          const res = await listInterfaceinfoByPageUsingPost(
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
