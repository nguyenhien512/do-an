import { useState, useEffect } from 'react';
import { Table, Input, Row, Col, Space, Button, theme, Typography, message, Upload } from 'antd';
import { SUBJECT, GRADE, QUESTION_LEVEL, getLabel, compareEnum, createFilterFromEnum, QUESTION_STATUS, getValue, getLabels } from '../../util/enum';
import { createFilterForProp, createFilterForNestedProp, flattenObject } from '../../util/arrayUtil';
import { callGetAllQuestions, callCreateQuestion, callUpdateQuestion, callSearchQuestions, callBulkCreateQuestion } from './QuestionApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionDetailModal from './QuestionDetailModal';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Search } = Input;

const TeacherTestBankPage = () => {

    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const qParam = queryParameters.get("qId");

    const [qId, setQId] = useState();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const {
        token: { colorWarning, colorInfo, colorBgBase, colorErrorActive },
    } = theme.useToken();

    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState([]);

    const [openDetailPopUp, setOpenDetailPopup] = useState(false);
    const [openTopicPopup, setOpenTopicPopup] = useState(false);

    const [action, setAction] = useState("get");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callGetAllQuestions(token);
                setQuestions([...data]);
            } catch (ignored) {
                message.error(ignored.message)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (qParam) {
            setOpenDetailPopup(true);
            setQId(qParam);
        }
    }, [qParam])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (<>
                <Typography.Link>
                    {id}
                </Typography.Link>
            </>)
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Lớp',
            dataIndex: 'grade',
            key: 'grade',
            render: (grade) => <span>
                {getLabel(GRADE, grade)}
            </span>,
            sorter: (a, b) => compareEnum(GRADE, a.grade, b.grade),
            filters: createFilterFromEnum(GRADE),
            onFilter: (value, record) => record.grade.indexOf(value) === 0
        },
        {
            title: 'Môn',
            dataIndex: 'subject',
            key: 'subject',
            render: (subject) => <span>
                {getLabel(SUBJECT, subject)}
            </span>,
            sorter: (a, b) => compareEnum(SUBJECT, a.subject, b.subject),
            filters: createFilterFromEnum(SUBJECT),
            onFilter: (value, record) => record.subject.indexOf(value) === 0
        },
        {
            title: 'Mức độ nhận biết',
            dataIndex: 'level',
            key: 'level',
            render: (level) => <span>
                {getLabel(QUESTION_LEVEL, level)}
            </span>,
            sorter: (a, b) => compareEnum(QUESTION_LEVEL, a.level, b.level),
            filters: createFilterFromEnum(QUESTION_LEVEL),
            onFilter: (value, record) => record.level.indexOf(value) === 0
        },
        {
            title: 'Chủ đề kiến thức',
            dataIndex: 'topic',
            key: 'topic',
            render: (topic) => <span>
                {topic?.name}
            </span>,
            filters: createFilterForNestedProp(questions, "topic", "name"),
            onFilter: (value, record) => record.topic?.name.indexOf(value) === 0,
        },
        {
            title: 'Số lượt sử dụng',
            dataIndex: 'examTimes',
            key: 'examTimes',
            sorter: (a, b) => a.examTimes - b.examTimes,
        },
        {
            title: 'Tạo bởi',
            dataIndex: 'createByUsername',
            key: 'createByUsername',
            filters: createFilterForProp(questions, "createByUsername"),
            onFilter: (value, record) => record.createByUsername?.indexOf(value) === 0,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span>
                {getLabel(QUESTION_STATUS, status)}
            </span>,
            filters: createFilterFromEnum(QUESTION_STATUS),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ]

    const onSearch = async (value) => {
        try {
            const data = await callSearchQuestions(value, ['APPROVED', 'PENDING', 'ARCHIVED'], token);
            setQuestions(data);
        } catch (ignored) {
            message.error(ignored.message)
        }

    }

    const viewQuestion = (id) => {
        console.log("viewQuestion", id);
        setQId(id);
        setAction("get");
        setOpenDetailPopup(true);
    }

    const addKey = (data) => data?.map((item, index) => ({ ...item, key: index }));

    const openCreatePopup = () => {
        setQId(null);
        setAction("create");
        setOpenDetailPopup(true);
    }

    const handleFormOk = async (formData) => {
        console.log("action", action);
        console.log("formDta", formData);
        try {
            if (action === "create") {
                const newQuestion = await callCreateQuestion(formData, token);
                setQuestions([...questions, newQuestion])
                message.info('Tạo câu hỏi thành công')
            } else if (action === "update") {
                const updateQuestion = await callUpdateQuestion(formData, token);
                setQuestions(questions.map(e => e.id === updateQuestion.id ? updateQuestion : e));
                message.info('Sửa câu hỏi thành công')
            }
        } catch (ignored) {
            message.error(ignored.message)
        }
        setOpenDetailPopup(false);
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
                const cleanData = data.map((item, index) => validateQuestion(item,index)).filter(e => e !== null);
                const newQuestions = await callBulkCreateQuestion(cleanData, token);
                setQuestions([...questions, ...newQuestions]);
                message.info('Tải câu hỏi lên thành công')
                onSuccess("ok");
            } catch (error) {
                message.error(error.message);
                onError({ error })
            }
        }
    }

    const excelDataToQuestion = (e) => {
        return ({
            content: e['Noi_dung'],
            grade: getValue(GRADE, e['Lop']),
            subject: getValue(SUBJECT, e['Mon']),
            correctAnswers: e['Dap_an_dung'],
            level: getValue(QUESTION_LEVEL, e['Muc_do_nhan_biet']),
            topic: {
                name: e['Chu_de_kien_thuc']
            },
            answers: [
                {
                    key: 'A',
                    content: e['Dap_an_A']
                },
                {
                    key: 'B',
                    content: e['Dap_an_B']
                },
                {
                    key: 'C',
                    content: e['Dap_an_C']
                },
                {
                    key: 'D',
                    content: e['Dap_an_D']
                }
            ]
        })
    }

    const validateQuestion = (data, index) => {
        let question = excelDataToQuestion(data);
        let flatten = flattenObject(question);
        if (Object.values(flatten).some(value => !(value))) {
            message.info(`Dữ liệu ở hàng ${index} bị xóa vì không hợp lệ`)
            return null
        } else {
            return question
        }
    }

    const excelTemplate = [{
        'Noi_dung': "",
        'Lop': "",
        'Mon': "",
        'Dap_an_dung': "",
        'Muc_do_nhan_biet': "",
        'Chu_de_kien_thuc': "",
        'Dap_an_A': "",
        'Dap_an_B': "",
        'Dap_an_C': "",
        'Dap_an_D': ""
    }]

    const exportTemplate = () => {
        return new Promise((resolve, reject) => {
            let workbook = XLSX.utils.book_new();
            let worksheet1 = XLSX.utils.json_to_sheet(excelTemplate);
            let worksheet2 = XLSX.utils.json_to_sheet(getLabels(GRADE));
            let worksheet3 = XLSX.utils.json_to_sheet(getLabels(SUBJECT));
            let worksheet4 = XLSX.utils.json_to_sheet(getLabels(QUESTION_LEVEL));
            XLSX.utils.book_append_sheet(workbook, worksheet1, 'Cau_hoi');
            XLSX.utils.book_append_sheet(workbook, worksheet2, 'Lop');
            XLSX.utils.book_append_sheet(workbook, worksheet3, 'Mon');
            XLSX.utils.book_append_sheet(workbook, worksheet4, 'Muc_do_nhan_biet');
            XLSX.writeFile(workbook, 'Cau_hoi.xlsx');
            resolve('ok');
        })
    }

    return (<>
        <Row justify="space-between">
            <Col span={6}>
                <Search placeholder="Tìm câu hỏi theo nội dung" onSearch={onSearch} allowClear />
            </Col>
            <Col offset={1}>
                <Space>
                    <Typography.Link onClick={() => exportTemplate()}>Tải xuống template</Typography.Link>
                    <Upload beforeUpload={handleFile} customRequest={handleFileSubmit} maxCount={1}>
                        <Button icon={<UploadOutlined />} >Nhập bằng excel</Button>
                    </Upload>
                    <Button icon={<PlusOutlined />} type="primary" onClick={openCreatePopup}>Tạo câu hỏi</Button>
                </Space>
            </Col>
        </Row>
        <Table className="mt-3"
            dataSource={addKey(questions)}
            columns={columns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => { viewQuestion(record.id) }, // click row
                };
            }} />
        <QuestionDetailModal qId={qId} open={openDetailPopUp} handleOk={handleFormOk} handleCancel={() => setOpenDetailPopup(false)} action={action} changeAction={setAction} />
    </>
    );
}
export default TeacherTestBankPage;