const dev_mode = 1;

const modes = [
    'empty.png',
    'cross.png',
    'circle.png',

    'line_top_bottom.png',
    'line_right_left.png',

    'line_top_right.png',
    'line_right_bottom.png',
    'line_bottom_left.png',
    'line_top_left.png',

    'line_top_right_left.png',
    'line_top_right_bottom.png',
    'line_right_bottom_left.png',
    'line_top_bottom_left.png',
    'line_top_right_bottom_left.png',

    'circle_top.png',
    'circle_right.png',
    'circle_bottom.png',
    'circle_left.png',

    'circle_top_right.png',
    'circle_right_bottom.png',
    'circle_bottom_left.png',
    'circle_top_left.png',

    'circle_top_bottom.png',
    'circle_right_left.png',

    'circle_top_right_left.png',
    'circle_top_right_bottom.png',
    'circle_right_bottom_left.png',
    'circle_top_bottom_left.png',
    'circle_top_right_bottom_left.png'
]

const colors = [
    'white','black','brown','red','orange','yellow','green','blue','purple','gray'
]

let current_mode, coloring_mode, current_color_mode, array

function sc(x){
    return document.getElementById(x)
}

function generate(ix,iy){
    data = []
    array = []

    for(y=0;y<iy;y++){
        tr = document.createElement('div')
        tr.style.display = 'flex'

        array = []
    
        for(x=0;x<ix;x++){
            td = document.createElement('div')
            td.style.height = '20px'
            td.style.width = '20px'
            td.style.border = '1px solid rgba(0, 0, 0, 0.5)'
            td.style.display = 'inline-block'
            td.id = `x${x}y${y}`
            td.setAttribute('onclick',`select(0,${x},${y})`)
            tr.appendChild(td)

            array.push(0)
        }

        sc('universal').appendChild(tr)
        data.push(array)
    }
}

function regenerate(){
    sc('universal').innerHTML = ''
    ix = Number(sc('x').value)
    iy = Number(sc('y').value)
    
    generate(ix,iy)
}

function mode(x){
    for(i=0;i<modes.length;i++){
        sc('mode'+i).style.background = 'white'
    }

    for(i=0;i<colors.length;i++){
        sc('color'+i).style.border = '1px solid black'
    }

    sc('mode'+x).style.background = 'gray'

    coloring_mode = 0
    current_color_mode = null;
    current_mode = x;
}

function coloring(x){
    for(i=0;i<modes.length;i++){
        sc('mode'+i).style.background = 'white'
    }

    for(i=0;i<colors.length;i++){
        sc('color'+i).style.border = '1px solid black'
    }

    sc('color'+x).style.border = '3px solid black'

    coloring_mode = 1
    current_color_mode = x;
    current_mode = null
}

function select(a,x,y){
    console.log(`P(${x},${y})`)

    if(coloring_mode==0){
        sc(`x${x}y${y}`).innerHTML = `<img src="icon/${modes[current_mode]}"></img>`
        data[y][x] = Math.floor(data[y][x]/100)*100+current_mode
        universal = current_mode
    }else{
        sc(`x${x}y${y}`).style.background = colors[current_color_mode]
        data[y][x] = data[y][x]-Math.floor(data[y][x]/100)*100+current_color_mode*100
        color = current_color_mode
    }

    //reverse()
}

function init(){
    for(i=0;i<modes.length;i++){
        el = document.createElement('div')
        el.style.height = '20px'
        el.style.width = '20px'
        el.setAttribute('class','mode')
        el.setAttribute('onclick',`mode(${i})`)
        el.id = `mode${i}`
        el.innerHTML = `<img src="icon/${modes[i]}">`

        sc('mode_selection').appendChild(el)
    }

    for(i=0;i<colors.length;i++){
        el = document.createElement('div')
        el.style.height = '20px'
        el.style.width = '20px'
        el.style.background = colors[i]
        el.setAttribute('class','color')
        el.setAttribute('onclick',`coloring(${i})`)
        el.id = `color${i}`

        sc('color_selection').appendChild(el)
    }

    if(dev_mode==0){
        window.addEventListener('beforeunload', function(event){
            event.preventDefault()
            event.returnValue = ''
        })
    }

    // window.addEventListener('wheel', function(event){
    //     if(event.deltaY>0){
    //         if(current_mode==modes.length-1){
    //             mode(0)
    //         }else{
    //             mode(current_mode+1)
    //         }
    //     }else{
    //         if(current_mode==0){
    //             mode(modes.length-1)
    //         }else{
    //             mode(current_mode-1)
    //         }
    //     }
    // })

    generate(10,10)
    mode(0)
}

function input(){
    input_data = JSON.parse(sc('input_array').value)
    
    y = input_data.length
    x = input_data[0].length

    console.log(x,y)
    
    sc('universal').innerHTML = ''
    generate(x,y)

    for(iy=0;iy<y;iy++){
        for(ix=0;ix<x;ix++){
            data[iy][ix] = Number(input_data[iy][ix])

            universal = data[iy][ix]-Math.floor(data[iy][ix]/100)*100
            color = Math.floor(data[iy][ix]/100)

            sc(`x${ix}y${iy}`).innerHTML = `<img src="icon/${modes[universal]}"></img>`
            sc(`x${ix}y${iy}`).style.background = colors[color]
        }
    }
}

function output(){
    y = data.length
    x = data[0].length

    text = '[\n<br>'

    for(iy=0;iy<y;iy++){
        text += '&nbsp;&nbsp;&nbsp;&nbsp;['
        for(ix=0;ix<x;ix++){
            text += '"'
            if(data[iy][ix]<100)text += 0
            if(data[iy][ix]<10)text += 0

            if(ix==x-1){
                text += `${data[iy][ix]}"`
            }else{
                text += `${data[iy][ix]}",`
            }
        }

        if(iy==y-1){
            text += ']\n<br>'
        }else{
            text += '],\n<br>'
        }
    }

    text += ']'

    sc('op').innerHTML = text
}

function coloring_(){
    x = sc('cx').value
    y = sc('cy').value
    c = sc('color_code').value

    sc(`x${x}y${y}`).style.background = `${c}`
}

init()