import {callGetResult } from './ExamApi';

function StudentTestResultPage() {
    const [queryParameters] = useSearchParams();
    const testId = queryParameters.get("examId");
    const token = localStorage.getItem("token");

    const [result, setResult] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await callGetResult(testId, token);
                setResult(response.data);
            } catch (ignored) { }
        }
        fetchData();
    }, [])

    return <>
    <h2>Kết quả thi</h2>
    <p>Kì thi: {result?.examName}</p>
    <p>Thí sinh: {result?.studentFirstName} {result?.studentLastName} </p>
    <p>Điểm: {result?.score}</p>
    </>
}
export default StudentTestResultPage;
