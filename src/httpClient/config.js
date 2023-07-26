export const CONFIG={
    baseUrl:"http://localhost:8080",
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
