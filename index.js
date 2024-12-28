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
        }
        
    })
}