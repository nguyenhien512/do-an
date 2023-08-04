import { callGetTopics, callCreateTopic } from "./TopicApi";
import { useState, useEffect, useRef } from 'react';
import {Form, Select, Divider, Space, Input, Button} from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const TopciSelectFormItem = ({fieldName}) => {

    const [topics,setTopics] = useState([]);

    const [name, setName] = useState();

    const inputRef = useRef(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetTopics(token);
                setTopics([...data]);
            } catch (ignored) { }
        }
        fetchData();
    },[])

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const addItem = async (event) =>{
        event.preventDefault();
        const newTopic = await callCreateTopic(name, token);
        setTopics([...topics,newTopic]);
        setName('');
    }
    
    return (
        <Form.Item 
        name={fieldName}
        noStyle
        rules={[{ required: true, message: 'Yêu cầu nhập Chủ đề kiến thức' }]}>
            <Select 
            options={topics.map (topic => ({
                value: topic.id,
                label: topic.name
            }))} 
            style={{width: 300}}
            placeholder="Chọn Chủ đề kiến thức"
            dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Thêm Chủ đề kiến thức"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Tạo mới
                    </Button>
                  </Space>
                </>
              )}
            />
        </Form.Item>
    )
}

export default TopciSelectFormItem;