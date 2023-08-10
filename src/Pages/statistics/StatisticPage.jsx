import { useEffect, useState } from "react";
import FilterExam from "./utils/filterExam";
import {
    getAverage,
    getExams,
    getStatisticByExamId,
    getStatisticByQuesId,
    getStatisticByStudentId,
    getExam
} from "./statisticApi";
import ScoreBar from "./utils/ScoreBar";
import QuesBar from "./utils/QuesBar";
import StudentBoard from "./utils/StudentBoard";
import { Row, Col } from 'antd';
import { FileDoneOutlined, TeamOutlined} from "@ant-design/icons";
import StatisticCard from "./utils/StatisticCard";

const StatisticPage = () => {
    const [loading, setLoading] = useState()
    const [exams, setExams] = useState([])
    const [byScoreBars, setByScoreBars] = useState()
    const [byQuesBars, setByQuesBars] = useState()
    const [studentData, setStudentData] = useState()
    const [averageScore, setAverageScore] = useState(0)
    const [examData, setExamData] = useState()
    const fetchData = (examId) => {
        setLoading(true)
        getStatisticByExamId(examId)
            .then((res) => {
                setByScoreBars(res)
                console.log(res)
                setLoading(false)
            })
        getStatisticByQuesId(examId)
            .then((res) => {
                setByQuesBars(res)
                setLoading(false)
            })
        getStatisticByStudentId(examId)
            .then((res) => {
                setStudentData(res)
                setLoading(false)
            })
        getAverage(examId)
            .then((res) => {
                setAverageScore(res)
                setLoading(false)
            })
        getExam(examId)
            .then((res) => {
                setExamData(res)
                setLoading(false)
            })
    }

    const fetchExam = () => {
        setLoading(true)
        getExams()
            .then((res) => {
                setExams(res)
                setLoading(false)
            })
    }
    useEffect(() => {
        // get all year from api and set
        fetchData()
        fetchExam()
    }, []);

    return (<>
        <Row>
            <h4>Chọn kì thi</h4>
        </Row>
        <Row className="mt-3">
            <FilterExam
                exams={exams}
                fetchData={fetchData}
            />
        </Row>
        <Row className="mt-3">
            <Col>
                <StatisticCard title="Số lượt thi" value={examData?.examTimes} icon={FileDoneOutlined} />
            </Col>
            <Col offset={1}>
                <StatisticCard title="Số bài đã nộp" value={studentData?.length} icon={TeamOutlined} />
            </Col>
            <Col offset={1}>
                <StatisticCard title="Điểm trung bình" value={averageScore? averageScore.toFixed(2) : 0} icon={TeamOutlined} />
            </Col>
        </Row>
        <Row className="mt-3">
            <h4>Phổ điểm</h4>
        </Row>
        <Row className='mt-3' justify='space-around'>
            <Col>
                {byScoreBars &&
                    <ScoreBar
                        loading={loading}
                        byScoreBars={byScoreBars}
                    />}
            </Col>
        </Row>
        <Row className="mt-3">
            <h4>Thống kê tỉ lệ đúng sai</h4>
        </Row>
        <Row className="mt-3" justify='space-around'>
            {byQuesBars &&
                <QuesBar
                    loading={loading}
                    byQuesBars={byQuesBars}
                />}
        </Row>
        <Row className="mt-3">
            <h4>Bảng điểm</h4>
        </Row>
        <Row className="mt-3">
            {studentData &&
                <StudentBoard
                    loading={loading}
                    data={studentData}
                />}
        </Row>
    </>
    )
}

export default StatisticPage