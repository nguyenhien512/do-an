import { EditOutlined, DeleteOutlined, CaretDownOutlined, SnippetsOutlined } from "@ant-design/icons"
import { Card, Dropdown, Typography } from 'antd';
const { Text } = Typography;

const ClassCard = ({ classObj, handleMenuClick }) => {

    const items = [
        {
            label: 'Xem danh sách học sinh',
            key: '1',
            icon: <SnippetsOutlined />,
        },
        {
            label: 'Sửa',
            key: '2',
            icon: <EditOutlined />,
        },
        {
            label: 'Xóa',
            key: '3',
            icon: <DeleteOutlined />,
            danger: true
        }
    ];
    const menuProps = {
        items,
        onClick: (e) => handleMenuClick(e, classObj.id)
    };

    return <>
        <Card style={{ width: 300 }}>
            <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}>
                <Text strong>{classObj.name}</Text>
                <Dropdown menu={menuProps}>
                    <CaretDownOutlined />
                </Dropdown>
            </div>
            <div className='d-inline-flex justify-content-between mt-2' style={{ width: '100%' }}><p>Sĩ số: {classObj.students? classObj.students.length : 0}</p><p>Năm học: {classObj.schoolYear} - {classObj.schoolYear + 1}</p></div>
        </Card>
    </>

}

export default ClassCard;