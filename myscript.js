/*Copies to clipboard*/
function stackoverflow() {
    /* Get the text field */
    var copyText = document.getElementById("sendNoodles");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  }

function magic(){
    var count = 0;
    const textarea = document.querySelector('#receiveNoodles')
    const send = document.querySelector('#sendNoodles')
    const arrayOfLines = textarea.value.split("\n");
    for (const a of arrayOfLines) {
        var good = spicy(a);
        if(count > 0){
            send.value += "\n" + good;
        }
        else{
            send.value = good;
        }
        count++;
  }
}


function lessMagic(){
    var count = 0;
    const textarea = document.querySelector('#receiveNoodles')
    const send = document.querySelector('#sendNoodles')
    const arrayOfLines = textarea.value.split("\n");
    for (const a of arrayOfLines) {
        var good = spicy(a);
        if(count > 0){
            send.value += good;
        }
        else{
            send.value = good;
        }
        count++;
  }
}

function spicy(a){
    var fixed = "";
    fixed = a;

    fixed = fixed.replaceAll(" = new ArrayList<>()", "")
    fixed = fixed.replaceAll(" = new HashMap<>()", "")

    fixed = fixed.replaceAll("'", "");
    if(!fixed.includes("(String") && !fixed.includes("<String") && !fixed.includes(", String")){
        fixed =fixed.replace("String", "create new string named");
    }
    if(!fixed.includes("(Long") && !fixed.includes("<Long") && !fixed.includes(", Long")){
        fixed =fixed.replace("Long", "create new long named");
    }
    fixed = dealWithHashMaps(fixed);

    fixed = dealWithGet(fixed);
    fixed = dealWithSet(fixed);
    
    while(fixed.includes("for (")){
        fixed =fixed.replace("for (", "for each");
        fixed =fixed.replace(")", "");
    }
    while(fixed.includes("if(")){
        fixed =fixed.replace("if(", "if ");
        fixed =fixed.replace(")", "");
    }
    while(fixed.includes("if (")){
        fixed =fixed.replace("if (", "if ");
        fixed =fixed.replace(")", "");
    }
    //fixed = dealWithMethods(fixed);

    fixed = fixed.replaceAll(";", "");
    fixed =fixed.replaceAll("{", "");
    fixed =fixed.replaceAll("}", "");
    fixed = fixed.replaceAll("!=", "is not equal to");
    fixed = fixed.replaceAll("==", "is equal to");
    fixed = fixed.replaceAll("=", "assign");
    fixed = fixed.replaceAll("\"", "");
    if(fixed.includes("//") || fixed.includes("/*" || fixed.includes("*/"))){
        fixed = "";
    }
    return fixed;
}

function dealWithSet(pFixed){
    let fixed = ""
    fixed = pFixed
    while(fixed.includes(".set")){
        let splitLocation = 0;
        for(var i = fixed.substring(0, fixed.indexOf(".set")).length - 1; i >= 0; i--){
            if(fixed.charAt(i) === " "){
                splitLocation = i;
                break;
            }
        }
        let firstpart = fixed.substring(0, splitLocation);
        fixed = fixed.substring(splitLocation);
        let remove = fixed.slice(fixed.indexOf(".set"), fixed.indexOf(")", fixed.indexOf(".set")) + 1)
        let field = fixed.slice(fixed.indexOf(".set") + 4, fixed.indexOf(")", fixed.indexOf(".set")));
        field = field.replace(field.charAt(0), field.charAt(0).toLowerCase())
        fixed = fixed.replace(remove, "'s " + field);
        fixed = " set " + fixed.trimStart();
        if(fixed.charAt(fixed.indexOf(fixed.indexOf("(") + 1, fixed.indexOf(".set"))) != ')'){
            fixed = firstpart + fixed.substring(fixed.indexOf(".set")).replace("(", " to ");
        }
    }
    return fixed;
}

function dealWithGet(pFixed){
    let fixed = ""
    fixed = pFixed
    while(fixed.includes(".get")){
        let splitLocation = 0;
        for(var i = fixed.substring(0, fixed.indexOf(".get")).length - 1; i >= 0; i--){
            if(fixed.charAt(i) === " "){
                splitLocation = i;
                break;
            }
        }
        let firstpart = fixed.substring(0, splitLocation)
        fixed = fixed.substring(splitLocation);
        let remove = fixed.slice(fixed.indexOf(".get"), fixed.indexOf(")", fixed.indexOf(".get")) + 1)
        let field = fixed.slice(fixed.indexOf(".get") + 4, fixed.indexOf(")", fixed.indexOf(")")));
        field = field.replace(field.charAt(0), field.charAt(0).toLowerCase())
        console.log(remove + " " + field);
        fixed = fixed.replace(remove, "'s " + field);
        console.log(fixed.charAt(fixed.indexOf(("(")+1)));
        if(fixed.charAt(fixed.indexOf(("(") + 1)) != ')'){
            fixed = firstpart + fixed.substring(fixed.indexOf(("(") + 1)).replace("(", " where equal to ");
            
        console.log(firstpart + fixed);
        }
    }
    return fixed;
}

function dealWithHashMaps(pFixed){
    let fixed = "";
    fixed = pFixed;
    if(!fixed.includes("(Map") && !fixed.includes(", Hash")){
        let types = "";
        types = fixed.substring(fixed.indexOf("<") + 1, fixed.indexOf(">"))
        fixed =fixed.replace("Map" + "<" + types + ">", "create new map with types " + types.toLowerCase().replace(",", ", ").replace("  ", " ") + " named");
    }
    return fixed;
}

function dealWithMethods(pFixed){
    let fixed = "";
    fixed = pFixed;
    if(!fixed.includes("public") && !fixed.includes("protected") && !fixed.includes("private") && !fixed.includes("abstract")){
        while(fixed.includes("(")){
            if(fixed.includes(".")){
                let splitLocation = 0;
                for(var i = fixed.substring(0, fixed.indexOf(".")).length - 1; i >= 0; i--){
                    if(fixed.charAt(i) === " "){
                        splitLocation = i;
                        break;
                    }
                }
                let firstPart = fixed.substring(0, splitLocation);
                let secondPart = fixed.substring(splitLocation, 0);
                firstPart = " call " + secondPart.substring(0, secondPart.indexOf(".", splitLocation)) + "'s " + secondPart.substring(secondPart.indexOf("." + 1, splitLocation) + " method");
                fixed = firstPart + secondPart;
                fixed.replace(".", "")
            }
            else if(fixed.includes("(")){
               
            }
        }
    return fixed;
    }
}