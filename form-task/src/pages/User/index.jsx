import React, { Component } from 'react'
import { H2 } from '../../components/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from "../../components/Loading";


class User extends Component {

    state = {
        isAuth: true,
        isAdmin: true,
        user: {},
        detailsUser : {},
        isLoading: false,
      };
    
      async componentDidMount() {

        let { userId } = this.props.params;

        this.setState({ isLoading: true });
    
        const user = JSON.parse(localStorage.getItem("gamerUser"));
        if (!user) {
          this.setState({ isAuth: false });
        } else {
          this.setState({ user, isAdmin: user.isAdmin });
          if (user.isAdmin) {
            try {
              const res = await axios.get(
                `https://react-tt-api.onrender.com/api/users/${userId}`,
                { headers: { "Authorization": `Bearer ${user.token}` } }
              );
    
              this.setState({ detailsUser : res.data})
            } catch (err) {
              this.props.alertOpen(err.response.data.message, 'Error', 'error', 10000);
            }
            finally {
                this.setState({ isLoading: false });
            }
          }
        }
      }

  render() {
    return (
      <section className='single__user' style={{paddingBottom : 20}}>
        {this.state.isLoading && <Loading />}
        <H2 text="User Details" />
        <ul className="user_info">
            <li>ID : <span>{this.state.detailsUser._id}</span></li>
            <li>Name : <span>{this.state.detailsUser.name}</span></li>
            <li>Email : <span>{this.state.detailsUser.email}</span></li>
            <li>Roles : <span>{this.state.detailsUser.isAdmin ? 'Admin' : 'User'}</span></li>
            <li>Created : <span>{new Date(this.state.detailsUser.createdAt).toLocaleString()}</span></li>
            <li>Updated : <span>{new Date(this.state.detailsUser.updatedAt).toLocaleString()}</span></li>
        </ul>
      </section>
    )
  }
}


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

export default withParams(User);