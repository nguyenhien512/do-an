import { callGetClasses, callDeleteClass, callCreateClass, callEditClass } from './ClassApi'
import { Button, Col, Space, message, Row, Form } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import ClassCard from './ClassCard';

import ClassFormModal from './ClassFormModal';


function ManageClassPage() {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [open, setOpen] = useState(false);
    const [initForm, setInitForm] = useState();
    const [currentClassId, setCurrentClassId] = useState(); 

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetClasses(token);
                setClasses([...data]);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    const handleMenuClick = (event, id) => {
        switch (event.key) {
            case '1':
                viewStudents(id);
                break;
            case '2':
                editClass(id);
                break;
            case '3':
                removeClass(id);
                break;
            default:
                console.error('Check menu item key');
        }
    };


    function viewStudents(id) {
        const params = { classId: id };
        navigate({
            pathname: '/teacher/class/class-detail',
            search: `?${createSearchParams(params)}`,
        });
    }

    async function removeClass(id) {
        const apiStatus = await callDeleteClass(id, token);
        if (apiStatus == 200) {
            message.info("Xóa lớp học thành công");
            setClasses([...classes].filter(e => e.id != id));
        }
    }

    async function editClass(id) {
        const targetObj = classes.filter(e => e.id == id)[0];
        const {name, schoolYear} = targetObj;
        setCurrentClassId(id);
        setInitForm({name, schoolYear});
        setOpen(true);
    }


    const showFormModal = () => {
        setOpen(true);
    };
    const hideFormModal = () => {
        setOpen(false);
    };

    const handleFinish = async ( values) => {
        let data;
        if (currentClassId == null) {
            data = await callCreateClass(values, token);
            setClasses([...classes, data]);
        } else {
            data = await callEditClass(currentClassId,values,token);
            let index = classes.findIndex(e => e.id == currentClassId);
            setClasses(classes.toSpliced(index,1,data));
            setCurrentClassId(null);
            setInitForm(null);
        }    
        setOpen(false);
    }

    return <>
        <Row>
            <Col span={20} >
                <Space size={[16, 16]} wrap>
                    {
                        classes?.map(c => (
                            <ClassCard key={c.id} classObj={c} handleMenuClick={handleMenuClick} />
                        ))
                    }
                </Space>
            </Col>
            <Col span={4}>
                <Button icon={<PlusOutlined />} type='primary' onClick={showFormModal}>Tạo lớp học</Button>
            </Col>
        </Row>
        <ClassFormModal open={open} onCancel={hideFormModal} handleFinish={handleFinish} initForm={initForm}/>
    </>
}
export default ManageClassPage