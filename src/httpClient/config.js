export const CONFIG={
    baseUrl:"https://exam-system-2d23a8238bcf.herokuapp.com",
    headers:{
        "Content-Type":"application/json",
    }
}

export const END_POINT={
    login:'/authenticate',
    register : '/api/users',
    getAllQuestion:'/api/questions',
    createQuestion : '/api/questions/create',
    updateQuestion : '/api/questions/edit',
    deleteQuestion : '/api/questions/delete'
}
