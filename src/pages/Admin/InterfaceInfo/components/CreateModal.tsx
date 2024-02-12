import {
  ModalForm, ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';


export type Props = {
  columns: ProColumns<API.Interfaceinfo>[]
  onCancel: () => void;
  onSubmit: (values: API.Interfaceinfo) => void;
  visible: boolean,
};
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }} />
    </Modal>)


};
export default CreateModal;
