import SearchStrInDb from "../modules/search.js"

export default [
    {
        code: 1,
        run : SearchStrInDb,
        name:'Search db'
    },
    {
        code: 0,
        run : () => {
            console.log("bye bye");
            process.exit()
        },
        name:'exit'
    }
]