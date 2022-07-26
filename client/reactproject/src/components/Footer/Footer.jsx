import React from 'react';
import { Button, Input } from "antd"
import "./footer.css";

export default function Footer() {
    return <footer className='footer-container'>
        <div className='footer-container-copyright'>
            <h2>Copy right 	&#169;</h2>
        </div>
        <div className='footer-container-email'>
            <Input style={{ height: "fit-content" }} type="email" placeholder='Subscribe to our daily posts' />
            <Button className="top-bar-btn" type="primary">Subscribe</Button>
        </div>
    </footer>
}
