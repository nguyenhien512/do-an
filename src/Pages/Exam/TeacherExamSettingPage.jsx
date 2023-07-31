import { callGetExam, callDeleteExam, callUpdateExamConfig, callPublishExam, callRemoveQuestion, callAddQuestion, callAddQuestions, callSetQuestionsByMatrix } from './TeacherExamApi';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Tooltip, Space, Button, Row, Col, Alert, message, Tag, Input, Form } from 'antd';
import { parseDayjs, parseDate, dayjsToString } from '../../util/dateTimeUtil';
import QuestionInBank from '../../Components/Question/QuestionInBank';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import ExamSettingForm from './TeacherExamSettingForm';
import QuestionSearchModal from './QuestionSearchModal';
import ExamMatrixModal from './ExamMatrixModal';
import { EXAM_STATUS, getLabel } from '../../util/enum';
import CreateMatrixModal from './CreateMatrixModal';

function TeacherExamSettingPage() {
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const examId = queryParameters.get("examId");
    const allowMatrix = queryParameters.get("allowMatrix") === "true";
    const token = localStorage.getItem("token");

    const [exam, setExam] = useState();
    const [questions, setQuestions] = useState();

    const [editForm, setEditForm] = useState(false);
    const [initForm, setInitForm] = useState();

    const [openPopup, setOpenPopup] = useState(false);

    const [openMatrix, setOpenMatrix] = useState(false);

    const [active, setActive] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetExam(examId, token);
                setExam(response);
                setQuestions(response.questionDtoList);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (exam) {
            setInitForm({
                name: exam.name,
                maxDuration: exam.maxDuration,
                maxRetry: exam.maxRetry,
                openTime: parseDayjs(exam.openTime),
                closeTime: parseDayjs(exam.closeTime),
                studentClassId: exam.studentClassId,
                studentClassName: exam.studentClassName,
                subject: exam.subject
            })
        }
    }, [exam])

    useEffect(() => {
        let opentime = parseDate(exam?.openTime);
        let closetime = parseDate(exam?.closeTime);
        if (exam && exam.openTime && Date.now() < opentime) {
            setActive("Chưa mở");
        } else if (exam && exam.closetime && Date.now() > closetime) {
            setActive("Đã đóng");
        } else if (exam && exam.openTime && exam.closeTime) {
            setActive("Đã mở");
        } else (
            setActive("Chưa cài đặt")
        )
    }, [Date.now(), exam]);

    const handleSubmitForm = async (values) => {
        console.log("Form values", values);
        let updatedExam = {
            ...values,
            openTime: dayjsToString(values.openTime),
            closeTime: dayjsToString(values.closeTime),
            id: exam.id
        }
        const data = await callUpdateExamConfig(updatedExam, token);
        setExam(data);
        message.info("Sửa cài đặt đề thi thành công");
        setEditForm(false);
    }

    const handleCancelForm = () => {
        setEditForm(false);
    }

    const deleteExam = async () => {
        const apiStatus = await callDeleteExam(exam.id, token);
        if (apiStatus == 200) {
            message.info("Xóa đề thi thành công");
            navigate('/teacher/exam/');
        }
    }

    const publishExam = async () => {
        const data = await callPublishExam(exam.id, token);
        if (data) {
            setExam(data);
            message.info("Xuất bản đề thi thành công");
        }
    }

    const deleteQuestion = async (questionId) => {
        const status = await callRemoveQuestion(examId, [questionId], token);
        if (status == 200) {
            setQuestions(questions.filter(item => item.id !== questionId));
        }
    }

    const handleCancelPopup = () => {
        setOpenPopup(false);
    }

    const addQuestions = async (questionIds) => {
        const data = await callAddQuestions(examId, questionIds, token);
        console.log("Add Question", data);
        if (data) {
            setQuestions(data.questionDtoList);
        }
        setOpenPopup(false);
    }

    const setQuestionsByMatrix = async (data) => {
        setOpenCreateMatrix(false);
        const updatedExam = await callSetQuestionsByMatrix(examId, data, token);
        setQuestions(updatedExam.questionDtoList);
    }

    const [openCreateMatrix,setOpenCreateMatrix] = useState(allowMatrix);

    return <>
        <Row justify='space-between'>
            <h3>{exam?.name}</h3>
            <div className=''>
                <Tooltip title="Học sinh có thể nhìn thấy đề thi đã xuất bản" color='white' overlayInnerStyle={{ color: 'black' }} >
                    <Button type="primary" className="me-3" disabled={exam?.status == 'PUBLISHED'} onClick={publishExam}>Xuất bản</Button>
                </Tooltip>
                <Tooltip title="Không thể xóa đề thi đã xuất bản" color='white' overlayInnerStyle={{ color: 'black' }} >
                    <Button type="primary" danger disabled={exam?.status == 'PUBLISHED'} onClick={deleteExam}>Xóa đề thi</Button>
                </Tooltip>
            </div>
        </Row>
        <Row className='mt-3' justify='space-between'>
            <Col span={8}>
                <h4>Cài đặt</h4>
            </Col>
            <Col >
                <Tooltip title="Sửa cài đặt đối với đề thi đã xuất bản có thể ảnh hưởng đến học sinh" color='white' overlayInnerStyle={{ color: 'black' }} >
                    <Button icon={<EditOutlined />} title="Sửa cài đặt" onClick={() => setEditForm(true)} type="primary"></Button>
                </Tooltip>
            </Col>
        </Row>
        <Row wrap={false} className='mt-3'>
            <ExamSettingForm disabled={!editForm} handleCancel={handleCancelForm} handleSubmit={handleSubmitForm} initForm={initForm} />
        </Row>
        <Row className="mt-3" align={'middle'}  >
            <Form disabled style={{width: '100%'}}>
                <Row>
                    <Col offset={1} span={10}>
                        <Form.Item
                            label="Trạng thái xuất bản">
                            <Input value={getLabel(EXAM_STATUS, exam?.status)} />
                        </Form.Item>
                    </Col>
                    <Col offset={3} span={10}>
                        <Form.Item
                            label="Trạng thái mở">
                            <Input value={active} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row>
        <Row className='mt-3' justify='space-between'>
            <Col span={12}><h4>Cấu trúc đề thi</h4></Col>
            <Col>
                <Button title="Xem cấu trúc đề thi" onClick={() => setOpenMatrix(true)} type="primary">Xem cấu trúc đề thi hiện tại</Button>
            </Col>
        </Row>
        <Row className='mt-3' justify='space-between'>
            <Col span={12}><h4>Nội dung đề thi</h4></Col>
            <Col>
            <Tooltip title="Thay đổi nội dung với đề thi đã xuất bản có thể ảnh hưởng đến học sinh" color='white' overlayInnerStyle={{ color: 'black' }} >
                    <Button icon={<PlusOutlined />} title="Thêm câu hỏi" onClick={() => setOpenPopup(true)} type="primary">Thêm câu hỏi</Button>
            </Tooltip>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col span={18} offset={1}>
                <Space className="pe-5" direction="vertical" size="large" style={{ display: 'flex' }}>
                    {questions?.map((item, index) => <QuestionInBank
                        key={item.id}
                        question={item}
                        handleDelete={deleteQuestion} />
                    )}
                </Space>
            </Col>
        </Row>
        <QuestionSearchModal open={openPopup} handleCancel={handleCancelPopup} handleOk={addQuestions} />
        <ExamMatrixModal open={openMatrix} handleClose={() => setOpenMatrix(false)} />
        <CreateMatrixModal open={openCreateMatrix} handleOk={setQuestionsByMatrix} handleCancel={() => setOpenCreateMatrix(false)}/>
    </>
}
export default TeacherExamSettingPage;