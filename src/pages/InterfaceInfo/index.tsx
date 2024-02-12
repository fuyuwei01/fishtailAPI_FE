import React, {useEffect, useState} from 'react';
import {Badge, Card, Descriptions, List, message} from 'antd';
import {PageContainer} from "@ant-design/pro-components";
import {
  getInterfaceinfoUsingGet,
} from "@/services/fishtailAPI/interfaceinfoController";
import {useParams} from "@umijs/max";
import integer from "async-validator/dist-types/validator/integer";


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.Interfaceinfo>();
  const params = useParams('/interface_info/:id');
  const status =  [
    {
      text: '关闭',
        status: 'default',
    },
     {
      text: '运行中',
        status: 'processing',
    },
    {
      text: '已上线',
        status: 'success',
    },
     {
      text: '异常',
        status: 'error',
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInterfaceinfoUsingGet({id: Number(params.id)});
      setData(res.data);
    } catch (e: any) {
      message.error('请求失败' + e.message)
    }

  };
  useEffect(() => {
    loadData();
  }, [])

  return (
    <PageContainer title='FishtailAPI'>
      <Card>
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label={"描述"}>{data?.desription}</Descriptions.Item>
          <Descriptions.Item label={"请求方法"}>{data?.method}</Descriptions.Item>
          <Descriptions.Item label={"请求地址"}>{data?.url}</Descriptions.Item>
          <Descriptions.Item label={"请求头"}>{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label={"响应头"}>{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label={"创建时间"}>{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label={"状态"}>{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label={"状态"}>

            <Badge status={status.at(data?.status).status} text={status.at(data?.status).text} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default Index;
