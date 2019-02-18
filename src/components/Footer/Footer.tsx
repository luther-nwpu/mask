import * as React from 'react'
import './Footer.scss'
import github from '@assets/github.png'
export class Footer extends React.Component {
    public render() {
        return (
            <div className="footer-component">
                <div></div>
                <div className="middle">
                    <div>
                        好嗨哟 © 2019 luthernpu@github.io All Rights Reserved               
                    </div>
                    <div>
                        Powered by Luther
                    </div>                                                 
                </div>
                <div>
                    <div>
                        Email: luthernpu@gmail.com
                    </div>
                    <div>
                        <a href="https://github.com/luther-nwpu">
                            <img src={github}/>
                            <div>
                                https://github.com/luther-nwpu
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}