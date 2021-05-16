const calcInput = document.querySelector('.calc-screen input');
const indicator = document.querySelector('.indicator')

let theme  = localStorage.getItem('theme')



const btnClicked = (val) => {
    let valueInput = calcInput.value;

    if(valueInput.length == 0){
        if(val == '+' || val == '*' || val == '/'){
            valueInput = '0' + val
        }else if(val == '.'){
            return
        }
    }



    const removeDuplicate = (valueOperator) => {
        let lastChar = valueInput.substr(valueInput.length - 1);
        let strRemoveLast = valueInput.substr(0, valueInput.length -1); 
        if(valueOperator == '.'){
            if(lastChar == '-' || lastChar == '+' || lastChar == '*' || lastChar == '/' ){
                return false
            }
            return true
        }
        if(lastChar == '-' || lastChar == '+' ){
            valueInput = strRemoveLast;
        }
        if(lastChar == '*' || lastChar == '/'){
            if(valueOperator == '-' ) return
            valueInput = strRemoveLast;
        }
        
    }

    if(val == '-' || val == '+' || val == '*' || val == '/' || val == '.'){
        removeDuplicate(val)
    }
    if(val == '.'){
        if(!removeDuplicate(val)){
            return
        };
    }

    valueInput += val;
    calcInput.value = valueInput;
}

const equalBtnClicked = () => {
    let valueInput = calcInput.value;
    let lastChar = valueInput.substr(valueInput.length - 1);


    if(valueInput.length == 0){
        return
    }
    if(lastChar == '-' || lastChar == '+' || lastChar == '*' || lastChar == '/') return       
    valueInput = eval(valueInput).toString();
    let arrValue = valueInput.split('.')

    if(arrValue.length == 1){
        calcInput.value = valueInput;
    }else if(arrValue.length == 2){
        calcInput.value = arrValue[0] + '.' +arrValue[1].substr(0, 4)
    }
     
}

const delBtnClicked = () => {
    let valueInput = calcInput.value;
    valueInput = valueInput.substr(0, valueInput.length -1);
    calcInput.value = valueInput;
}

const resetBtnClicked = () => {
    calcInput.value = '';
}

const changeTheme = (themeNumber) => {
    let indicatorStyle = indicator.style;
    let rootElement = document.documentElement;
    if(themeNumber == 'theme-one'){
        indicatorStyle.left = '3px'
        indicatorStyle.transform = 'translateX(0%)'
        rootElement.classList.remove('theme-three', 'theme-two')  
        localStorage.setItem('theme', 'theme-one')
    }else if(themeNumber == 'theme-two'){
        indicatorStyle.left = '50%'
        indicatorStyle.transform = 'translateX(-50%)'
        rootElement.classList.remove('theme-three')      
        rootElement.classList.add('theme-two') 
        localStorage.setItem('theme', 'theme-two')     
    }else{
        indicatorStyle.right = '3px'
        indicatorStyle.left = 'auto'
        indicatorStyle.transform = 'translateX(0%)'  
        rootElement.classList.remove('theme-two')      
        rootElement.classList.add('theme-three') 
        localStorage.setItem('theme', 'theme-three')    
    }
}

changeTheme(theme)