import { callGetExam, callDeleteExam, callUpdateExamConfig, callPublishExam } from './TeacherExamApi';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Tooltip, Space, Button, Row, Col, Statistic, Alert, message } from 'antd';
import { formatDateTime, parseDayjs, parseDate, dayjsToString } from '../../util/dateTimeUtil';
import QuestionInBank from '../../Components/Question/QuestionInBank';
import { EditOutlined } from "@ant-design/icons";
import ExamSettingForm from './TeacherExamSettingForm';
import { callGetQuestions } from './ExamApi';

function TeacherExamSettingPage() {
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const examId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const [exam, setExam] = useState();
    const [questions, setQuestions] = useState();

    const [openPopup, setOpenPopup] = useState(false);
    const [initForm, setInitForm] = useState();

    const [active, setActive] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetExam(examId, token);
                setExam(response);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetQuestions(examId, token);
                setQuestions([...response]);
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
        console.log("Setting page initForm", initForm);
    }, [exam])

    useEffect(() => {
        let opentime = parseDate(exam?.openTime);
        let closetime = parseDate(exam?.closeTime);
        if (exam && exam.openTime && Date.now() < opentime) {
            setActive("chưa mở");
        } else if (exam && exam.closetime && Date.now() > closetime) {
            setActive("đã đóng");
        } else {
            setActive("đã mở");
        }
    }, [Date.now()]);

        useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetExam(examId, token);
                setExam(response);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    const showSettingPopup = () => {
        setOpenPopup(true)
    }

    const hideSettingPopup = () => {
        setOpenPopup(false)
    }

    const handleFinish = async (values) => {
        console.log("Form values", values);
        let updatedExam = {
            ...values,
            openTime: dayjsToString(values.openTime),
            closeTime: dayjsToString(values.closeTime),
            id: exam.id
        }
        const data = await callUpdateExamConfig(updatedExam,token);
        setExam(data);
        message.info("Sửa lớp học thành công");
        setOpenPopup(false);
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

return <>
    <Row>
        <Col span={18} className="ps-3 pe-3">
            <Space className="pe-5" direction="vertical" size="large" style={{ display: 'flex' }}>
                <h4>Nội dung đề thi</h4>
                {questions?.map((item, index) => <QuestionInBank
                    key={item.id}
                    question={item} />
                )}
            </Space>
        </Col>
        <Col span={6}>
            <div className='d-flex flex-column'>
                <div className='d-inline-flex justify-content-end mb-4' style={{ width: '100%' }}>
                    <Tooltip title="Học sinh có thể nhìn thấy đề thi đã xuất bản" color='white' overlayInnerStyle={{ color: 'black' }} >
                        <Button type="primary" className="me-3" disabled={exam?.status == 'PUBLISHED'} onClick={publishExam}>Xuất bản</Button>
                    </Tooltip>
                    <Tooltip title="Không thể xóa đề thi đã xuất bản" color='white' overlayInnerStyle={{ color: 'black' }} >
                        <Button type="primary" danger disabled={exam?.status == 'PUBLISHED'} onClick={deleteExam}>Xóa đề thi</Button>
                    </Tooltip>
                </div>
                <Space direction='vertical' si={[8, 8]} style={{ backgroundColor: '#e6f7ff', padding: 20, width: '100%' }}>
                    <div className='d-inline-flex justify-content-between' style={{ width: '100%' }}>
                        <h4>Cài đặt</h4>
                        <Tooltip title="Sửa cài đặt đối với đề thi đã xuất bản có thể ảnh hưởng đến học sinh" color='white' overlayInnerStyle={{ color: 'black' }} >
                            <Button icon={<EditOutlined />} title="Sửa cài đặt" onClick={showSettingPopup}></Button>
                        </Tooltip>

                    </div>
                    {exam ? <>
                        <h6>{exam.name}</h6>
                        <Statistic title="Giao cho lớp" value={exam.studentClassName} valueStyle={{ fontSize: '1em' }} />
                        <Statistic title="Thời gian làm bài" value={`${exam.maxDuration} phút`} valueStyle={{ fontSize: '1em' }} />
                        <Statistic title="Mỗi học sinh được thi tối đa" value={`${exam.maxRetry} lần`} valueStyle={{ fontSize: '1em' }} />
                        <Statistic title="Thời điểm mở" value={formatDateTime(exam.openTime)} valueStyle={{ fontSize: '1em' }} />
                        <Statistic title="Thời điểm đóng" value={formatDateTime(exam.closeTime)} valueStyle={{ fontSize: '1em' }} />
                        <Statistic title="Trạng thái" value={exam.status} valueStyle={{ fontSize: '1em' }} />
                        <Alert message={`Hiện tại đề thi ${active}`} type="warning" showIcon closable />
                    </> : null}
                </Space>
            </div>
        </Col>
    </Row>
    <ExamSettingForm open={openPopup} onCancel={hideSettingPopup} handleFinish={handleFinish} initForm={initForm} />
</>
}
export default TeacherExamSettingPage;