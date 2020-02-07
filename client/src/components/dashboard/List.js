import React from 'react'
import axios from 'axios'

class List extends React.Component{
  constructor(props){
    super(props)
    this.state={
      users:[]
    }
  }
  componentDidMount(){
    axios.get('http://localhost:4090/users',)
        .then(response => {
            const users=response.data
            this.setState({users})
              console.log(users)
        })
  }
  render(){
    return(
      <div className="container text-center">
          <h2>Listing Users- {this.state.users.length} </h2>
            <div style={{display: 'flex'}}>
                {
                    this.state.users.map(user => {
                        return (
                            <div className="card" style={{width: '18rem'}}>
                                <div className="card-body">
                                    <p className="card-text"> FirstName : { user.firstname } </p>
                                    <p className="card-text"> LastName :{ user.lastname }</p>
                                    <p className="card-text"> Email :{ user.email }</p>
                                </div>
                              </div>
                        )
                    })
                }
            </div>
      </div>
    )
  }
    
}

export default List