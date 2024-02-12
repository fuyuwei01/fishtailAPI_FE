import {
  ModalForm, ProColumns,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import { values } from 'lodash';
import React, { useRef,useEffect } from 'react';


export type Props = {
  values: API.Interfaceinfo
  columns: ProColumns<API.Interfaceinfo>[]
  onCancel: () => void;
  onSubmit: (values: API.Interfaceinfo) => Promise<void>;
  visible: boolean,
};
const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();//用react创建一个引用以访问protable中的实例

  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values]);
  
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }} />
    </Modal>)


};
export default UpdateModal;
