import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import RegisterForm from './register-form/RegisterForm';

function ModalComponent({isOpen,handlePopupOk,handlePopupCancel,handleRegisterSubmit}){
   
    return (
        <>
          <Modal
            title="Thêm người dùng"
            open={isOpen}
            onOk={handlePopupOk}
            // confirmLoading={confirmLoading}
            onCancel={handlePopupCancel}
            destroyOnClose={true}
            footer={<Button onClick={handlePopupCancel}>Cancel</Button>}
          > 
            <RegisterForm handleRegisterSubmit={handleRegisterSubmit}/>
        
          </Modal>
        </>
      );

}
export default ModalComponent