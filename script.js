document.addEventListener("DOMContentLoaded",()=>{

    const element=document.getElementById("p1");
    element.addEventListener("dragstart",(ev)=>{
        ev.dataTransfer.effectAllowed="move";
        ev.dataTransfer.dropEffect="move";
        ev.dataTransfer.setData("text/plain",ev.target.innerText)
        // let image = new Image();
        // image.src="image.png"

        // ev.dataTransfer.setDragImage(image,10,10)
        // console.log(ev.dataTransfer)
    })

    const drop=document.getElementById("p2")

    drop.addEventListener("dragover",function dragOverEvent(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    })

    drop.addEventListener("drop",function dropHandler(e){
        e.preventDefault();
        
         let a =e.dataTransfer.getData("text/plain");
         drop.innerText=a;
     
     
         console.log(a);
     //    drop.innerText()
     }
)







    


})

