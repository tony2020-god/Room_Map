/**
 * 调用浏览器的下载接口下载地图， 最终生成 json 格式的文件
 * @param {String} content  文件的内容，已经序列化的数据
 * @param {String} name 文件名字
 */
const downloadJsonFile = (content, name) => {
    const blob = new Blob([content], {
        type: 'text/plain'
    })
    const link = document.createElement('a')
    const fileName = `${name}.json`
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
}

/**
 * @读取文件，返回 Promise，resolve 的是字符串
 */
const uploadJsonFile = () => new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
        let file = e.target.files[0]
        // console.log(file.type == 'application/json')
        if (file.type != 'application/json') {
            console.log('请上传json文件')
            reject()
        }

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (data) => {
            let mapString = data.target.result
            resolve(mapString)
        }
    }
    input.click()
})



export default {
    downloadJsonFile,
    uploadJsonFile
}
