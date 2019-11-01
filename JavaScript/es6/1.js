let a = {
    drink(){
        return "tea"
    }
}

let b = {
    drink(){
        return "beer"
    }
}

let c = Object.create(a)
console.log(a.drink())   // tea