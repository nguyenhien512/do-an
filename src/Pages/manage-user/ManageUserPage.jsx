import { useState, useEffect } from 'react';
import { Modal, Table, Input, Button, Row, Col, Space, theme } from 'antd';
import { callGetAllUsers, callInactiveUser, callSearchUsers, callActiveUser } from './UserApi';
import { USER_ACTIVE, createFilterFromEnum, getLabel } from '../../util/enum';
import ModalComponent from '../../Components/RegisterModal/ModalComponent';
import { registerUser } from "../../services";
import { PlusOutlined } from '@ant-design/icons';
const { Search } = Input;

// reset form fields when modal is form, closed

const ManageUserPage = () => {

    const [users, setUsers] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [addUserModal, setAddUserModal] = useState(false);

    const {
        token: { colorWarning, colorInfo, colorBgBase, colorErrorActive },
    } = theme.useToken();

    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedUsers(selectedRows.map(record => record.username));
        }
    };

    const token = localStorage.getItem("token");

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (<span>{getLabel(USER_ACTIVE, active)}</span>),
            filters: createFilterFromEnum(USER_ACTIVE),
            onFilter: (value, record) => record.active === value,
        },
    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetAllUsers(token);
                setUsers([...data]);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    const onSearch = async (value) => {
        const data = await callSearchUsers(value, ['STUDENT', 'TEACHER', 'ADMIN'], token);
        setUsers([...data]);
    }

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));


    const handleRegisterSubmit = async (value) => {
        try {
            const response = await registerUser(value);
            const newUser = response.data;
            setUsers([...users, newUser]);

        } catch (ignored) { }
        setAddUserModal(false);
    }

    const inactiveUser = async () => {
        const status = await callInactiveUser(selectedUsers, token);
        if (status === 200) {
            setUsers(users.map(e => selectedUsers.includes(e.username) ? { ...e, active: false } : e))
        }
    }

    const activeUser = async () => {
        const status = await callActiveUser(selectedUsers, token);
        if (status === 200) {
            setUsers(users.map(e => selectedUsers.includes(e.username) ? { ...e, active: true } : e))
        }
    }

    return (<>
        <Row justify="space-between">
            <Col span={8}>
                <Search placeholder="Tìm theo tên hoặc username" onSearch={onSearch} allowClear />
                {hasSelected ? <span>Đã chọn {selectedRowKeys.length} người dùng</span> : null}
            </Col>
            <Col offset={2}>
                <Space>                
                    <Button icon={<PlusOutlined/>} onClick={() => setAddUserModal(true)} type="primary">Thêm người dùng</Button>
                    <Button id='alternative-btn' style={{ backgroundColor: colorWarning, color: colorBgBase }} onClick={() => activeUser()}>Kích hoạt</Button>
                    <Button onClick={() => inactiveUser()}>Vô hiệu hóa</Button>
                </Space>
            </Col>
        </Row>
        <Row className="mt-3">
            <Table style={{ width: '100%' }} dataSource={addKey(users)} columns={columns} rowSelection={rowSelection} />
            <ModalComponent isOpen={addUserModal} handlePopupCancel={() => setAddUserModal(false)} handleRegisterSubmit={handleRegisterSubmit} />
        </Row>
    </>);
};

export default ManageUserPage;