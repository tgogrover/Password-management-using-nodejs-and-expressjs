const operator= ['+','-','*','/']
const answer=0;
 const calculator =(operator,number,no)=>{
switch(operator){
    case operator[0]:
    answer+=number+no;
    break;
    case operator[1]:
    answer+=number-no;
    break;
    case operator[2]:
    answer+=number-no;
    case operator[3]:
    answer+=number/no;
    break;
    default:
        console.log('all fields are required')
}
}
var test=calculator('/',4,5)

