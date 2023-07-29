import { callGetExam, callDeleteExam, callUpdateExamConfig, callPublishExam, callRemoveQuestion, callAddQuestion, callAddQuestions } from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Tooltip, Space, Button, Row, Col, Statistic, Alert, message, Tag } from 'antd';
import { formatDateTime, parseDayjs, parseDate, dayjsToString } from '../../util/dateTimeUtil';
import QuestionInBank from '../../Components/Question/QuestionInBank';
import { EditOutlined, FileAddOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ExamSettingForm from './TeacherExamSettingForm';
import { callGetQuestions } from '../student/ExamApi';
import QuestionSearchModal from './QuestionSearchModal';

function TeacherExamSettingPage() {
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const [exam, setExam] = useState();
    const [questions, setQuestions] = useState();

    const [editForm, setEditForm] = useState(false);
    const [initForm, setInitForm] = useState();

    const [openPopup, setOpenPopup] = useState(false);

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
                studentClassName: exam.studentClassName
            })
        }
    }, [exam])

    useEffect(() => {
        let opentime = parseDate(exam?.openTime);
        let closetime = parseDate(exam?.closeTime);
        if (exam && exam.openTime && Date.now() < opentime) {
            setActive("chưa mở");
        } else if (exam && exam.closetime && Date.now() > closetime) {
            setActive("đã đóng");
        } else if (exam && exam.openTime && exam.closeTime) {
            setActive("đã mở");
        } else (
            setActive("chưa cài đặt thời điểm mở/đóng")
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
        const status = await callRemoveQuestion(examId, [questionId],token);
        if (status == 200) {
            setQuestions(questions.filter(item => item.id !== questionId));
        }
    }

    const handleCancelPopup = () => {
        setOpenPopup(false);
    }

    const addQuestions = async (questionIds) => {
        const data = await callAddQuestions(examId, questionIds, token);
        console.log("Add Question",data);
        if (data) {
            setQuestions(data.questionDtoList);
        }
        setOpenPopup(false);
    }

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
        <Row gutter={[16, 24]} align="middle">
            <Col offset={1}>
                <h6>Trạng thái</h6>
            </Col>
            <Col>
                {exam?.status == 'PUBLISHED' ?
                    <Tag key={exam?.status} color="#1677ff">Đã xuất bản</Tag>
                    : <Tag key={exam?.status} >Chưa xuất bản</Tag>}
            </Col>
            <Col>
                <Alert message={`Hiện tại đề thi ${active}`} type="warning" showIcon />
            </Col>
        </Row>
        <Row className='mt-3' justify='space-between'>
            <h4>Nội dung đề thi</h4>
            <Tooltip title="Thay đổi nội dung với đề thi đã xuất bản có thể ảnh hưởng đến học sinh" color='white' overlayInnerStyle={{ color: 'black' }} >
                    <Button icon={<PlusCircleOutlined />} title="Thêm câu hỏi" onClick={() => setOpenPopup(true)} type="primary"></Button>
            </Tooltip>
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
                        <QuestionSearchModal open={openPopup} handleCancel={handleCancelPopup} handleOk={addQuestions}/>
    </>
}
export default TeacherExamSettingPage;