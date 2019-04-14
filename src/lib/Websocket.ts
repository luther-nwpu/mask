export class Websocket {
  ws: WebSocket
  constructor(opts) {
    // tslint
    this.ws = new WebSocket('ws:localhost:10011/haiyou/1/3b0b0aa0-5d35-11e9-b710-cb061bab7483')
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
