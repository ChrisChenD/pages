
import useSWR from 'swr'
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from '../../../pages/demo/DataFetch'

// 参考
// https://www.youtube.com/watch?v=gm1QtePAYTM


// 怎样创建一个可移动 画图(文字, 框)
function draw_functor(ctx){
    // 发现鼠标位置:
    // ctx.fillStyle = 'green';
    // ctx.fillRect(10, 10, 150, 100);
    var functor_info = {
        x:200,y:200,
        // w:100,h:80,
        text:'functor1 超人 +++'
    }
    var char_size = 20
    var rect_w = char_size*10
    var rect_h = char_size*4
    var x0 = functor_info.x-(rect_w/2)
    var y0 = functor_info.y-(rect_h/2)
    
    // var lineWidth = Math.floor(char_size/8)
    var lineWidth = char_size/20
    var text = functor_info.text
    var offset = char_size*text.length/4

    ctx.lineWidth = lineWidth
    // ctx.lineWidth = 4
    console.log('lineWidth', lineWidth)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(x0, y0, rect_w, rect_h)
    // ctx.strokeRect(x0, y0, 10, 10)
    console.log('rect', x0, y0, rect_w, rect_h)
    ctx.font = `${char_size}px Microsoft YaHei`;
    ctx.fillText(text, functor_info.x-offset, functor_info.y)

}

export class Canvas {
    constructor(data) {
        this.data = data
        var buf = {}
        this.buf = buf
    } 
    get_ctx(){
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        return ctx
    }
    init(self){return ()=>{
        // var canvas = document.getElementById('canvas')
        const canvas = document.getElementById('canvas');
        canvas.width = 800
        canvas.height = 800
        self.buf.name = 'init'
        // const ctx = canvas.getContext('2d');
        // ctx.fillStyle = 'green';
        // ctx.fillRect(10, 10, 150, 100);
    }}
    functor_Msyql(self){return ()=>{
        console.log('buf', self.buf)
        draw_functor(this.get_ctx())
    }}

    static view(data){var self = new Canvas(data)
        return <div>
            <div className='flex'>
                <button className='border-4'
                    key='1' onClick={self.init(self)}>init</button>
                <button className='border-4'
                    key='2' onClick={self.functor_Msyql(self)}>functor_Msyql</button> 
            </div>
            <canvas
                id = 'canvas'
            ></canvas>
            <p>中文</p>
        </div>
    }
}
     


function DataModule(){
    return (<div>
        {/* <Plan.view {...data}></Plan.view> */}
        <p>hello!</p>
        <Canvas.view/>
    </div>

    )
}
// next.js, 是静态的， 我们怎么动态加入一个函数？
export default DataModule;

// http://109.244.159.137:3000/demo/canvas_demo/demo

