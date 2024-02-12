import React, {useEffect, useState} from 'react';
import { List, message} from 'antd';
import {PageContainer} from "@ant-design/pro-components";
import {
  listInterfaceinfoByPageUsingPost,
} from "@/services/fishtailAPI/interfaceinfoController";




const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.Interfaceinfo>([]);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 10;
  const loadData = async (current=1,pageSize) => {
    setLoading(true);
    try {
      const res = await listInterfaceinfoByPageUsingPost({current,pageSize});
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
      setLoading(false)
    } catch (e: any) {
      message.error('请求失败'+ e.message)
    }

  };
  useEffect(()=>{
    loadData();
  },[])

  return (
    <PageContainer title='FishtailAPI'>
      <List

        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiList = `/interface_info/${item.id}`;
          return (
            <List.Item actions={[<a key={"list-loadmore-edit"} href = {apiList}>查看</a>]}>
              <List.Item.Meta
                title={<a href={apiList}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )
        }}
        pagination={{
          showTotal(total: number) {
            return 'Total: ' + total;
          },
          pageSize:pageSize,
          total,
          onChange(page,pageSize){
            loadData(page,pageSize);
          },
        }}
          />
          </PageContainer>
          );
        };

export default Index;
