export class BarrageBase {
    public video: any
    public canvas: any
    public context: any
    public paused: boolean
    public barrageBase: any
    public data: any
    constructor(canvas, video, data) {
        let defaultOpts = {
            color: '#fff',
            fontSize: 20,
            speed: 2,
            data: []
        }
        Object.assign(this, defaultOpts, { data })
        this.context = canvas.getContext('2d')
        this.paused = true
        this.canvas = canvas
        this.video = video
        console.log(video.clientHeight)
        console.log(video.clientWidth)
        this.canvas.width = video.clientWidth
        this.canvas.height = video.clientHeight
        this.barrageBase = this.data.map(element => new Barrage(element, this))
        this.render()
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()
        if (!this.paused) {
            requestAnimationFrame(this.render.bind(this))
        }
    }

    draw() {
        let cTime = this.video.currentTime
        this.barrageBase.forEach(element => {
            if(!element.flag && element.time <= cTime) {
                element.init()
                element.once = true
            }
            element.x -= element.speed
            element.render()
            if (element.x <= element.width * -1){
                element.flag = true
            }
        })
    }

    add(barrage) {
        this.barrageBase.push(new Barrage(barrage, this))
    }

    play() {
        this.paused = false
        this.render()
    }

    pause() {
        this.paused = true
    }

    reset() {
        this.context.clearRect(0, 0, this.canvas, this.canvas.height)
        let cTime = this.video.currentTime
        this.barrageBase.forEach(barrage => {
            barrage.flag = false
            if (cTime < barrage.time) {
                barrage.paused = false
            } else {
                barrage.flag = true
            }
        })
    }
}

class Barrage {
    barrage: any
    vm: any
    time: any
    value: any
    color: any
    fontSize: any
    speed: any
    width: any
    x: any
    y: any
    constructor(barrage, vm) {
        this.barrage = barrage
        this.value = barrage.value
        this.time = barrage.time
        this.vm = vm
    }

    init() {
        this.color = this.barrage.color || this.vm.color
        this.fontSize = this.barrage.fontSize || this.vm.fontSize
        this.speed = this.barrage.speed || this.vm.speed

        let span = document.createElement('span')
        span.innerText = this.value
        span.style.font = this.fontSize + 'px "微软雅黑"'
        span.style.position = 'absolute'
        document.body.appendChild(span)
        this.width = span.clientWidth
        document.body.removeChild(span)

        this.x = this.vm.canvas.width
        let r = this.vm.canvas.height * Math.random()
        this.y = r - (r % this.fontSize)

        if (this.y < this.fontSize) this.y = this.fontSize
        if (this.y > this.vm.canvas.height - this.fontSize) {        
            this.y = this.vm.canvas.height - this.fontSize
        }
 
    }

    render() {
        this.vm.context.font = this.fontSize + 'px "微软雅黑"'
        this.vm.context.fillStyle = this.color
        this.vm.context.fillText(this.value, this.x, this.y)
    }
}