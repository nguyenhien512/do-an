import {useEffect, useState} from "react";
import FilterExam from "./utils/filterExam";
import {
    getExams,
    getStatisticByExamId,
    getStatisticByQuesId,
    getStatisticByStudentId
} from "./statisticApi";
import ScoreBar from "./utils/ScoreBar";
import QuesBar from "./utils/QuesBar";
import StudentBoard from "./utils/StudentBoard";

const StatisticPage = () => {
    const [loading, setLoading] = useState()
    const [exams, setExams] = useState([])
    const [byScoreBars, setByScoreBars] = useState()
    const [byQuesBars, setByQuesBars] = useState()
    const [studentData, setStudentData] = useState()
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

    return (
        <div className="page-container">
            <FilterExam
                exams = {exams}
                fetchData = {fetchData}
            />
            <div className='chart-wrapper'>
                {byScoreBars &&
                    <ScoreBar
                        loading = {loading}
                        byScoreBars = {byScoreBars}
                    />}
            </div>
            <div className='chart-wrapper'>
                {byQuesBars&&
                    <QuesBar
                        loading = {loading}
                        byQuesBars = {byQuesBars}
                    />}
            </div>
            <div className='student-table'>
                {studentData &&
                    <StudentBoard
                        loading={loading}
                        data = {studentData}
                    />}
            </div>
        </div>
    )
}

export default StatisticPage