import React,{PropTypes} from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import * as actions from '../action/index.js'
import {connect} from 'react-redux'
import Alert from 'react-s-alert'


import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

var getCookie=require("../js/getCookie.js")

class Nav extends React.Component{
	constructor(props) {
		super(props);
		this.signout=this.signout.bind(this)
	}
	signout(){
		this.props.signActions("sign/out",{},true,true)
	}
	componentDidMount() {
		this.props.signActions("sign/flashIn",{name:getCookie(document.cookie,"name"),password:getCookie(document.cookie,"password")},true)
	}
	render(){
		/*取出cookie中的name*/
		let name=getCookie(document.cookie,"name");
		return  (
			<div className="main">
				<nav className="nav">
					<ul className="nav-list">
						<Link to="/">
							<img src="img/TK2.png" alt="唐凯" className="logo"/>
						</Link>
						<Link to="/main" className="nav-posts" activeClassName="activeClass actPosts">
							<li>
								<span>文章</span>
							</li>
						</Link>
						<Link to="/talk" className="nav-talk" activeClassName="activeClass actTalk">
							<li>
								<span>聊一聊</span>
							</li>
						</Link>
						<Link to="/about" className="nav-about" activeClassName="activeClass actAbout">
							<li>
								<span>关于</span>
							</li>
						</Link>
					
					{
						this.props.loginState===2?
						<Link to="/write" className="nav-list-bottom"  activeClassName="activeClass actWrite">
							<li>
								<span>发表</span>
							</li>
						</Link>:""
					}
					</ul>
				</nav>
				{this.props.loginState?(
					<div className="sign-button-group">
						欢迎&nbsp;{name}&nbsp;
						<a><button className="signout" onClick={this.signout}>退出</button></a>
					</div>
					):(
					<div className="sign-button-group">
						<Link to="/sign/signin"><button className="signin">登录</button></Link>
						<Link to="/sign/signup"><button className="signup">注册</button></Link>
					</div>
					)}
				<section className="main-right">
					<div className="container">
						{this.props.children}
					</div>
				</section>
				<section className="alert">
					<Alert stack={{limit:3}}/>
				</section>
			</div>
			)
	}
}

Nav.PropTypes={
	loginState:PropTypes.string.isRequired,
	signActions:PropTypes.func.isRequired
}

export default connect(
	state=>({loginState:state.loginState}),
	actions
)(Nav)