import React from 'react';
import { Modal } from 'antd';

function ResultModal({ isModalVisible, setIsModalVisible, result }) {
  return (
    <Modal title="You Won" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => setIsModalVisible(false)}>
      <p>{result}</p>
    </Modal>
  )
}

export default ResultModal;
