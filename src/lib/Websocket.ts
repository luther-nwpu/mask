class Websocket {
  ws: WebSocket
  constructor(opts) {
    // tslint
    this.ws = new WebSocket('ws:localhost:10011/1')
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({tunnelId: 'd', token: 'd'}))
    }
  }
  
  openCallBack() {
    this.ws.onopen = (msg) => {
      console.log(msg)
    }
  }

  close() {
    this.ws.close()
  }
  public acceptMessage() {
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      switch(msg.type) {
        case 'id':
          console.log(msg)
          break
      }
    }
  }
}

let instance: Websocket = null

export default function (opts = {}) {
  if (!instance) {
    instance = new Websocket(opts)
  }
  return instance
}
