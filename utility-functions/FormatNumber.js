
export const FormatNumber = (number) => {    
    var strNum = String(number)
    if(strNum.length > 3)
    {        
        var num = '';        
        var pieces = []

        if(strNum.length % 3 != 0)
        {
            pieces.push(strNum.substring(0, strNum.length % 3))
            strNum = strNum.substr(strNum.length % 3, strNum.length)
        }
        while(strNum.length > 0)
        {
            pieces.push(strNum.substring(0, 3))
            strNum = strNum.substr(3, strNum.length)
        }
        pieces.map(piece => {
            num += piece + ","
        })        
        num = num.substring(0, num.length - 1)        
        
        return num
    }
    return number;        
}