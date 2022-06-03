

function draw_path(ctx){
    ctx.beginPath()
    var pos = {x:100, y:100}
    ctx.moveTo(pos.x, pos.y)
    ctx.lineTo(100, 300)
    ctx.lineTo(300, 300)
    ctx.lineTo(100, 100)
    ctx.fillStyle = 'coral'
    ctx.fill()
    
}

function update(ctx){
    draw_path(ctx)
    
}