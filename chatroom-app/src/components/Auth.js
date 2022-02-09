import axios from 'axios';
import React from 'react';

const Auth = (props) => {
    return <div style={{ minHeight: '50vh', width: '70vw', backgroundColor: 'rgb(245,245,245)', borderRadius: '20pt', boxShadow: "1px 1px 20px rgb(215,215,215)" }}>
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <div>
                <h2>ChatApp</h2>
                <hr />
                <h4>Login</h4>
                <table>
                    <tr>
                        <td>
                            <input type="text" placeholder='username' value={props.User.susername} onChange={(e) => {
                                props.setUser({
                                    susername: e.target.value,
                                    spassword: props.User.spassword,
                                    username: props.User.username,
                                    password: props.User.password,
                                    firstname: props.User.firstname,
                                    lastname: props.User.lastname,
                                    createon: new Date().toDateString() + " " + new Date().toTimeString()
                                })
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="password" placeholder='password' value={props.User.spassword} onChange={(e) => {
                                props.setUser(
                                    {
                                        susername: props.User.susername,
                                        spassword: e.target.value,
                                        username: props.User.username,
                                        password: props.User.password,
                                        firstname: props.User.firstname,
                                        lastname: props.User.lastname,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    }
                                )
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {
                                console.log(props.User);

                                axios.post('http://localhost:4000/users/login',
                                    {
                                        username: props.User.susername,
                                        password: props.User.spassword,
                                    }
                                )
                                    .then(_ => {
                                        console.log(_);
                                        if (_.data === "User logged In") {
                                            alert("Logged In")
                                            props.setLoggedIn(true);
                                        }
                                    })
                                    .catch(_ => {
                                        console.log(_);
                                    })
                            }}>Login</button>

                            <button onClick={() => {
                                axios.get(`http://localhost:4000/users/logout/${props.User.susername}`)
                                    .then(_ => {
                                        console.log(_);
                                        if (_.data === "Logout") {
                                            props.setLoggedIn(false)
                                        
                                        }
                                    })
                                    .catch(_ => {
                                        console.log(_);
                                    })
                            }}>Log out</button>
                        </td>
                    </tr>
                </table>
                <hr />

                <h4>Sign up</h4>
                <table>
                    <tr>
                        <td>
                            <input type="text" placeholder='username' value={props.User.username} onChange={(e) => {
                                props.setUser(
                                    {
                                        susername: props.User.susername,
                                        spassword: props.User.spassword,
                                        username: e.target.value,
                                        password: props.User.password,
                                        firstname: props.User.firstname,
                                        lastname: props.User.lastname,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    }
                                )
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="password" placeholder='password' value={props.User.password} onChange={(e) => {
                                props.setUser(
                                    {
                                        susername: props.User.susername,
                                        spassword: props.User.spassword,
                                        username: props.User.username,
                                        password: e.target.value,
                                        firstname: props.User.firstname,
                                        lastname: props.User.lastname,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    }
                                )
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder='firstname' value={props.User.firstname} onChange={(e) => {
                                props.setUser(
                                    {
                                        susername: props.User.susername,
                                        spassword: props.User.spassword,
                                        username: props.User.username,
                                        password: props.User.password,
                                        firstname: e.target.value,
                                        lastname: props.User.lastname,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    }
                                )
                            }} />
                        </td>
                        <td>
                            <input type="text" placeholder='lastname' value={props.User.lastname} onChange={(e) => {
                                props.setUser(
                                    {
                                        susername: props.User.susername,
                                        spassword: props.User.spassword,
                                        username: props.User.username,
                                        password: props.User.password,
                                        firstname: props.User.firstname,
                                        lastname: e.target.value,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    }
                                )
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {
                                console.log(props.User);
                                axios.post('http://localhost:4000/users/signup',
                                    {
                                        username: props.User.username,
                                        password: props.User.password,
                                        firstname: props.User.firstname,
                                        lastname: props.User.lastname,
                                        createon: new Date().toDateString() + " " + new Date().toTimeString()
                                    },
                                )
                                    .then(_ => {
                                        if (_.data.message) {
                                            alert(_.data.message);
                                        } else {
                                            alert("User Created, can log in now")
                                        }
                                    })
                                    .catch(_ => {
                                        console.log();
                                    })
                            }}>Sign up</button>
                        </td>
                    </tr>
                </table>


            </div>
        </div>
    </div>;
};

export default Auth;
