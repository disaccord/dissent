import * as espree from "espree";
import { createHash } from "crypto"

function hashString(input: string): string {
    return createHash("sha1").update(input).digest("hex")
}
function hashElement(element: any): string {
    return hashString(JSON.stringify({start: element.start, end: element.end}))
}

function objectHash(element: any) {
    if(element.type == "Identifier") element.name = hashElement(element)
    
    if(element.body != null) walk(element.body)
    
    if(element.declarations != null) walk(element.declarations)
    
    if(element.arguments != null) walk(element.arguments) 

    if(element.test != null) objectHash(element.test)

    if(element.callee != null) objectHash(element.callee) 
    
    if(element.hash != null) objectHash(element.hash)

    if(element.expression != null) objectHash(element.expression)

    if(element.consequent != null) objectHash(element.consequent)

    if(element.id != null) element.id.name = hashElement(element.id)

    if(element.init != null) element.init.name = hashElement(element.init)
    
    if(element.left != null) element.left.name = hashElement(element.left)
    
    if(element.right != null) element.right.name = hashElement(element.right)
}

function walk(body: any) {
    for(const element of body) {
        objectHash(element)
    }
}

export async function hash(input: string): Promise<string> {
    const ast = espree.parse(input)
    const func = ast.body.find((a: any) => a.type === "FunctionDeclaration")
    let funcIdentifier = func.id
    funcIdentifier.name = hashElement(funcIdentifier)

    for(const param of func.params) {
        param.name = hashElement(param)
    }

    const body = func.body
    walk(body.body)
    return hashString(JSON.stringify(func))
}

