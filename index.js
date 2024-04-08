const geme=document.querySelector(".gemes")
const cher=document.querySelector(".che")
let intervel;
let kayDowen =false;


const movelefet = () => {
   let leftPos = parseInt(window.getComputedStyle(cher).getPropertyValue("left"))
   if (leftPos > 0) 
      cher.style.left = leftPos - 5 + "px";
   
}
const moverigth = () => {
    let leftPos = parseInt(window.getComputedStyle(cher).getPropertyValue("left"))
    if (leftPos < 670) 
       cher.style.left = leftPos + 5 + "px";
    
}
document.addEventListener("keydown" , (event) =>{
    console.log(!kayDowen)
    if (!kayDowen) {
        if (event.key == "ArrowLeft") {
            intervel=setInterval(movelefet, 1)
        }
        else if(event.key == "ArrowRight"){
            intervel = setInterval(moverigth , 1)
        }
    }
    kayDowen=true
})
document.addEventListener("keyup" , () => {
    clearInterval(intervel)
    kayDowen = false;
})


// blllocks

const generateObstacle = () =>{
    let bloce=document.createElement("div")
    let hole = document.createElement("div")
    bloce.setAttribute("class","bloc")
    hole.setAttribute("class","hole")
    let rendomholPos = Math.floor(Math.random() * 620)
    hole.style.left =rendomholPos + "px"
    geme.appendChild(bloce)
    geme.appendChild(hole)

    $(".bloc").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd" , function (e){$(this).remove();})
    $(".hole").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd" , function (e){$(this).remove();})
}
setInterval(generateObstacle , 1500)


const checkCollistin =  () => {
    const allBlocks =document.querySelectorAll(".bloc")
    const allHolls = document.querySelectorAll(".hole")

    allBlocks.forEach(b => {
        let hitObstacle = false
        if (collision( b , cher)) {
            hitObstacle=true

            allHolls.forEach(h => {
                if (holcollision(h , cher)) {
                    hitObstacle = false
                }
            })
        }
        if (hitObstacle) {
            alert("Game Over !!!!!!!!")
            location.reload()
        }
    })
}
setInterval(checkCollistin , 1)


function collision(a,b) {
    let a_top =parseInt(window.getComputedStyle(a).getPropertyValue("top"))
    let b_top =parseInt(window.getComputedStyle(b).getPropertyValue("top"))
    return (
        a_top + 20 > b_top && a_top  < b_top +20
    )
}

function holcollision(h,b) {
    let h_left =parseInt(window.getComputedStyle(h).getPropertyValue("left"))
    let h_top =parseInt(window.getComputedStyle(h).getPropertyValue("top"))
    
    let b_left =parseInt(window.getComputedStyle(b).getPropertyValue("left"))
    let b_top =parseInt(window.getComputedStyle(b).getPropertyValue("top"))
   
    
    return(
        b_left  > h_left && b_left  < h_left +50 &&
        h_top +20 > b_top && h_top  < b_top + 20

        )
}