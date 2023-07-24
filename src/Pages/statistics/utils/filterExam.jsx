import { Select } from "antd";

const FilterExam = (props) => {
    const {fetchData, exams} = props;
    const customExams = exams.map(ite => ({
        value: ite.id,
        label: ite.name
    }))
    // customExams.push({
    //     value: "",
    //     label: "Tất cả học kỳ"
    // })
    return (
        <div className="filter-semester">
            <Select
                placeholder={`${customExams[0]?.label}`}
                style={{ minWidth: 400, height: '100%' }}
                options={customExams}
                onChange={(value) => {
                    fetchData(value)
                }}
                height='100%'
            />
        </div>
    );
};
export default FilterExam;
