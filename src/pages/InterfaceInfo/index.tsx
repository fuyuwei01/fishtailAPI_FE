import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Checkbox, Descriptions, Divider, Form, List, message} from 'antd';
import {PageContainer} from "@ant-design/pro-components";
import {
  getInterfaceinfoUsingGet,
  invokeInterfaceinfoUsingPost
} from "@/services/fishtailAPI/interfaceinfoController";
import {useParams} from "@umijs/max";
import integer from "async-validator/dist-types/validator/integer";
import Input from 'antd/lib/input';


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeRes,setInvokeRes] = useState<any>();
  const [invokeLoading,setInvokeLoading ] = useState<boolean>(false);
  const [data, setData] = useState<API.Interfaceinfo>();
  const params = useParams('/interface_info/:id');
  const status = [
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
  const onFinish = async (values: any) => {

    if(!params.id){
      message.error("接口不存在");
      return;
    }
    setInvokeLoading(true);
    try{
      console.log(values);
      const res = await invokeInterfaceinfoUsingPost(
        {
          id: params.id,
          ...values,
        }
      );

      setInvokeRes(res.data);console.log(invokeRes);
      message.success("success：");
    }catch (error){
      message.error("error:",error.message);
    }
    setInvokeLoading(false);

  };

  const onFinishFailed = (errorInfo: any) => {

    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
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
  //todo 输入参数规范化
  return (
    <PageContainer title='FishtailAPI'>
      <Card>
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label={"描述"}>{data?.description}</Descriptions.Item>
          <Descriptions.Item label={"请求方法"}>{data?.method}</Descriptions.Item>
          <Descriptions.Item label={"请求地址"}>{data?.url}</Descriptions.Item>
          <Descriptions.Item label={"请求头"}>{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label={"请求参数"}>{data?.requestParams}</Descriptions.Item>
          <Descriptions.Item label={"响应头"}>{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label={"创建时间"}>{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label={"创建时间"}>{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label={"状态"}>
            <Badge status={status.at(data?.status).status} text={status.at(data?.status).text}/>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider/>
      <Card>
        <Form
          name="invoke"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="请求参数"
            name="userRequestParams"
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              test
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
