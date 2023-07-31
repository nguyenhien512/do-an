import { useEffect, useState } from "react";
import FilterExam from "./utils/filterExam";
import {
    getAverage,
    getExams,
    getStatisticByExamId,
    getStatisticByQuesId,
    getStatisticByStudentId
} from "./statisticApi";
import ScoreBar from "./utils/ScoreBar";
import QuesBar from "./utils/QuesBar";
import StudentBoard from "./utils/StudentBoard";
import { Row } from 'antd';

const StatisticPage = () => {
    const [loading, setLoading] = useState()
    const [exams, setExams] = useState([])
    const [byScoreBars, setByScoreBars] = useState()
    const [byQuesBars, setByQuesBars] = useState()
    const [studentData, setStudentData] = useState()
    const [averageScore, setAverageScore] = useState()
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
            <div>Điểm trung bình của kỳ thi đã chọn là: {averageScore !== '' ? averageScore : 0}</div>
        <Row className="mt-3">
            <h4>Phổ điểm</h4>
        </Row>
        <Row className='mt-3'>
            {byScoreBars &&
                <ScoreBar
                    loading={loading}
                    byScoreBars={byScoreBars}
                />}
        </Row>
        <Row className="mt-3">
            <h4>Thống kê tỉ lệ đúng sai</h4>
        </Row>
        <Row className="mt-3">
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