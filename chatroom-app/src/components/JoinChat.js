
import React, { Component } from 'react';
import axios from 'axios';

export default class JoinChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rooms: [],
            roomName: "",
            Messages: [],
            newMessage: "",
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/messages/rooms`)
            .then(_ => {
                this.setState({ Rooms: [] })
                _.data.forEach(element => {
                    this.setState({
                        Rooms: [...this.state.Rooms, element.name]
                    })
                });
                console.log(this.state.Rooms);
            });
    }

    render() {
        return <div>
            <div>
                <h3>{this.props.User.susername}</h3>
                <h4>Choose Room</h4>
                {
                    this.state.Rooms.map(data => <button onClick={() => {
                        this.setState({
                            roomName: data
                        });

                        axios.get(`http://localhost:4000/messages/chat/${data}/${this.props.User.susername}`)
                            .then(_ => {
                                console.log(_.data);
                                this.setState({ Messages: [] })
                                _.data.forEach(element => {
                                    this.setState({
                                        Messages: [...this.state.Messages, element]
                                    })
                                });
                            })

                    }}>{data}</button>)
                }
            </div>
            <h4>{"Room: " + this.state.roomName}</h4>
            <div>
                <h5>Messages</h5>
                <div>
                    {
                        this.state.Messages.map(text => <div style={{ border: "1px solid gray", padding: "5pt", margin: "10pt" }}>
                            <div style={{fontSize:'medium'}}>{text.message}</div>
                            <div style={{fontSize:'small'}}>{text.to_user}</div>
                            <div style={{fontSize:'x-small'}}>{text.date_sent}</div>
                        </div>)
                    }
                </div>
                <input type="text" value={this.state.newMessage} placeholder="Enter your message here" onChange={(e) => {
                    this.setState({
                        newMessage: e.target.value
                    })
                }} />
                <button onClick={() => {
                    axios.post(`http://localhost:4000/messages/send`,
                        {
                            from_user: this.props.User.susername,
                            to_user: "moxdroid",
                            room: this.state.roomName,
                            message: this.state.newMessage,
                            date_sent: new Date().toDateString() + " " + new Date().toTimeString()
                        }
                    )
                        .then(_ => {
                            axios.get(`http://localhost:4000/messages/rooms`)
                            .then(_ => {
                                this.setState({ Rooms: [] })
                                _.data.forEach(element => {
                                    this.setState({
                                        Rooms: [...this.state.Rooms, element.name]
                                    })
                                });
                                console.log(this.state.Rooms);
                            });
                            this.setState({
                                roomName: this.state.roomName
                            });
                            axios.get(`http://localhost:4000/messages/chat/${this.state.roomName}/${this.props.User.susername}`)
                            .then(_ => {
                                console.log(_.data);
                                this.setState({ Messages: [] })
                                _.data.forEach(element => {
                                    this.setState({
                                        Messages: [...this.state.Messages, element]
                                    })
                                });
                            })
                            alert("Message Sent");
                        })
                }}>Send</button>
            </div>
        </div>;
    }
}
