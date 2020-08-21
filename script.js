


document.addEventListener("DOMContentLoaded",()=>{


    document.getElementById("carrier").addEventListener("dragstart",dragStarted);
    document.getElementById("battleship").addEventListener("dragstart",dragStarted);
    document.getElementById("cruiser").addEventListener("dragstart",dragStarted);
    document.getElementById("submarine").addEventListener("dragstart",dragStarted);
    document.getElementById("destroyer").addEventListener("dragstart",dragStarted);

    function dragStarted(el){
        el.dataTransfer.setData("shipName",el.target.id);
        // console.log(el.target.clientWidth)
        el.dataTransfer.setData("shipWidth",el.target.clientWidth)

        el.dataTransfer.dropEffect="copy"
    }
    
    function roundNumber(num){
        let formattedNum = String(num)
        console.log(formattedNum.length)

        let firstDigit = formattedNum.charAt(0);

        let secondDigit = formattedNum.charAt(1);
        
        if(num<99){
            return 0;
        }   
        
        if(secondDigit>5){
            firstDigit++;
        }

        return [Number(firstDigit),0,0].join("")


      
       
        
        
    }

    let element=document.getElementById('main-container');
    let trackScreens=[];

    element.addEventListener("dragover",(e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect ="move";

       
    })
   

    element.addEventListener("drop",(e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect="move";

        
        let xPosition = roundNumber(e.x);
        let yPosition =roundNumber(e.y);
        console.log(xPosition,yPosition)
        
        
        let shipName=e.dataTransfer.getData("shipname");
         let shipWidth=e.dataTransfer.getData("shipWidth");

         
         let el = document.createElement("div")
        let shipsContainer =document.getElementById("shipContainers").children
         

        el.id=shipName;

        

        el.classList.add("ship")
        el.draggable=true;
        el.style.position="absolute"
        el.style.left = xPosition+"px";
        el.style.top=yPosition+"px";
        el.innerText=shipName
        


        let screen =0;
       
     
        console.log(e.clientX)
        console.log(Number(shipWidth))
        let sum =e.clientX+Number(shipWidth)
        console.log(sum);
        // if( (Number(shipWidth)) >screen){
        if( sum<=1010){
            

            let trackTop=trackScreens.every(i=>Number(roundNumber(e.clientY))!==Number(i));

            if(trackTop){
                console.log(trackTop,roundNumber(e.clientY),"track")

                element.append(el);
                trackScreens.push(Number(roundNumber(e.clientY)))
                console.log(trackScreens,"array")
                console.log(roundNumber(e.clientX),"x")
                //console.log(el.offsetTop)
                document.getElementById(el.previousSibling.id)
                for(let i=0;i<shipsContainer.length;i++)
             {
                if(shipsContainer[i].id==shipName)
                shipsContainer[i].remove();
             }
            }
            
          



        }

        

    })

    


})


