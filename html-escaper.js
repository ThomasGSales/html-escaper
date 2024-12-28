const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

function escapeHtmlSpecialCharacters(text){
    return text.replace(/[<>&]/g, (match)=>{
        switch(match){
            case "<":
                return "&lt;"
            case ">":
                return "&gt;"
            case "&":
                return "&amp;"
            default:
                return match
        }
        
    })
}

function escapeHtmlFile(inputFilePath, outputFilePath){
    try {
        const fileContent = fs.readFileSync(inputFilePath, "utf-8")
        const escapedContent = escapeHtmlSpecialCharacters(fileContent)
        fs.writeFileSync(outputFilePath, escapedContent, "utf-8")
        console.log("Arquivo escapado com sucesso")
    } catch (error) {
        console.log("Erro:", error.message)
        process.exit(1)
    }
}

function askFilePath(question){
    const rl = readline.createInterface({input: process.stdin, output: process.stdout})

    return new Promise((resolve)=>{
        rl.question(question, (answer)=>{
            resolve(answer)
            rl.close()
        })
    })
}


async function userInteraction() {
    let inputPath = process.argv[2]
    if(!inputPath){
        inputPath = await askFilePath("Informe o caminho de entrada: ") 
    }

    inputPath = path.resolve(inputPath)

    const defaultName = `escaped_${path.basename(inputPath)}.txt`
    const answer = await askFilePath("Informe o caminho do arquivo de saida (o padrão é "+ defaultName+"): ")
    let outputPath = answer.length > 0 ? answer : defaultName
    outputPath = path.resolve(outputPath)

    escapeHtmlFile(inputPath, outputPath)
}

userInteraction()
