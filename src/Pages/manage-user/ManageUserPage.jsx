import { useState, useEffect } from 'react';
import { Table, Input, Button, Row, Col, Space, theme, message, Typography, Upload } from 'antd';
import { callGetAllUsers, callInactiveUser, callSearchUsers, callActiveUser, callBulkCreateUser } from './UserApi';
import { USER_ACTIVE, USER_ROLE, createFilterFromEnum, getLabel, getLabels, getValue } from '../../util/enum';
import ModalComponent from '../../Components/RegisterModal/ModalComponent';
import { registerUser } from "../../services";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { dayjsToDateString } from '../../util/dateTimeUtil';
import * as XLSX from 'xlsx';
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
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob'
        },
        {
            title: 'Vai trò',
            dataIndex: 'authority',
            key: 'authority',
            render: (authority) => (<span>{getLabel(USER_ROLE, authority)}</span>),
            filters: createFilterFromEnum(USER_ROLE),
            onFilter: (value, record) => record.authority === value,
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
            } catch (ignored) {
                message.error(ignored.message)
            }
        }
        fetchData();
    }, [])

    const onSearch = async (value) => {
        try {
            const data = await callSearchUsers(value, ['STUDENT', 'TEACHER', 'ADMIN'], token);
            setUsers([...data]);
        } catch (ignored) {
            message.error(ignored)
        }
    }

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));


    const handleRegisterSubmit = async (value) => {
        try {
            let data = { ...value, dob: dayjsToDateString(value.dob) }
            const response = await registerUser(data, token);
            const newUser = response.data;
            setUsers([...users, newUser]);
            message.info('Tạo người dùng thành công')
        } catch (ignored) {
            message.error('Username đã tồn tại')
        }
        setAddUserModal(false);
    }

    const inactiveUser = async () => {
        try {
            const status = await callInactiveUser(selectedUsers, token);
            setUsers(users.map(e => selectedUsers.includes(e.username) ? { ...e, active: false } : e))
            message.info('Đổi trạng thái hoạt động thành công')
        } catch (ignored) {
            message.error(ignored.message)
        }
    }

    const activeUser = async () => {
        try {
            const status = await callActiveUser(selectedUsers, token);
            setUsers(users.map(e => selectedUsers.includes(e.username) ? { ...e, active: true } : e))
            message.info('Đổi trạng thái hoạt động thành công')
        } catch (ignored) {
            message.error(ignored);
        }
    }

    const [excelFile, setExcelFile] = useState()

    const handleFile = (file) => {
        let acceptedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
        if (file && file.size < 1000000 && acceptedTypes.includes(file.type)) {
            return true
        } else {
            message.error('Hệ thống chỉ chấp nhận định dạng file .xlsx, .xls, .csv dung lượng dưới 1MB')
            return false
        }
    }

    const handleFileSubmit = (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        console.log(file)
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data);
            try {
                const cleanData = data.map((item, index) => validateUser(item,index)).filter(e => e !== null);
                const newUsers = await callBulkCreateUser(cleanData, token);
                setUsers([...users, ...newUsers]);
                message.info('Tải người dùng lên thành công')
                onSuccess("ok");
            } catch (error) {
                message.error(error.message);
                onError({ error })
            }
        }
    }

    const excelDataToUser = (e) => {
        return ({
            username: e['Username'],
            password: e['Mat_khau'],
            firstName: e['Ten'],
            lastName: e['Ho'],
            dob: e['Ngay_sinh'],
            authority: getValue(USER_ROLE,e['Loai_tai_khoan'])
        })
    }

    const validateUser = (data, index) => {
        let user = excelDataToUser(data);
        if (Object.values(user).some(value => !(value))) {
            message.info(`Dữ liệu ở hàng ${index} bị xóa vì không hợp lệ`)
            return null
        } else {
            return user
        }
    }
    
    const excelTemplate = [{
        'Username': "",
        'Mat_khau': "",
        'Ten': "",
        'Ho': "",
        'Ngay_sinh': "yyyy-MM-dd",
        'Loai_tai_khoan': ""
    }]

    const exportTemplate = () => {
        return new Promise((resolve, reject) => {
            let workbook = XLSX.utils.book_new();
            let worksheet1 = XLSX.utils.json_to_sheet(excelTemplate);
            let worksheet2 = XLSX.utils.json_to_sheet(getLabels(USER_ROLE));
            XLSX.utils.book_append_sheet(workbook, worksheet1, 'Nguoi_dung');
            XLSX.utils.book_append_sheet(workbook, worksheet2, 'Loai_tai_khoan');
            XLSX.writeFile(workbook, 'Nguoi_dung.xlsx');
            resolve('ok');
        })
    }

    return (<>
        <Row justify="space-between">
            <Col span={6}>
                <Search placeholder="Tìm theo tên hoặc username" onSearch={onSearch} allowClear />
                {hasSelected ? <span>Đã chọn {selectedRowKeys.length} người dùng</span> : null}
            </Col>
            <Col offset={1}>
                <Space>
                    <Typography.Link onClick={() => exportTemplate()}>Tải xuống template</Typography.Link>
                    <Upload beforeUpload={handleFile} customRequest={handleFileSubmit} maxCount={1}>
                        <Button icon={<UploadOutlined />} >Nhập bằng excel</Button>
                    </Upload>
                    <Button icon={<PlusOutlined />} onClick={() => setAddUserModal(true)} type="primary">Thêm người dùng</Button>
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