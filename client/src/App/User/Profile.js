import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { userStorage } from '../../helper/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, userProfile } from '../../redux/actions/global';
import { useForceUpdate } from '../../helper/hook';
import axios from 'axios';

const currentUser = async (success, failed) => {
  const id = userStorage.UID().get();

  try {
    const url = 'http://localhost:4000/api/user/' + id;
    const res = await axios.get(url);
    
    delete res.data.password;

    return success( res.data );

  } catch (error) { return failed(error) };
}

const Profile = () => {
  const [ post, setPost ] = useState({
    title: '', description: '', price: ''
  });

  const forceUpdate = useForceUpdate();
  const dispatchers = useDispatch();
  const userprofile = useSelector((state) => {
    return state.globalReducer.user;
  });

  useEffect(() => {
    const UIDClientExist = userStorage.UID().get() !== '';
    const IDStoreIsEmpty = !userprofile.hasOwnProperty('id');

    if (IDStoreIsEmpty && UIDClientExist) currentUser(
      (data)  => dispatchers(userProfile(data)),
      (error) => dispatchers(userProfile({}))
    );

  }, [dispatchers, userprofile]);

  let isRendered   = useRef(false);
  let errorMessage = '';

  const onChangeTitle = (e) => setPost(
    {...post, title: e.target.value} );

  const onChangeDescription = (e) => setPost(
    {...post, description: e.target.value} );

  const onChangePrice = (e) => setPost(
    {...post, price: e.target.value} );

  const onSubmit = async (e) => {
    e.preventDefault();

    isRendered = true;

    try {
      const url = 'http://localhost:4000/api/user/post/' + userprofile.id;
      const res = await axios.post(url, {
        title       : post.title,
        description : post.description,
        price       : post.price,
      });

      if (isRendered) dispatchers(
        updateProfile(res.data)
      );

      return (forceUpdate() && null);
      
    } catch (error) {
      errorMessage = ( error.response &&
                       error.response.data );
    }

    setPost(
      {
        title       : '',
        description : '',
        price       : '',
      }
    );

    return () => (isRendered = false);
  }

  if (!userStorage.auth().get())
    return <Redirect to="/signin" />
  else
    return (
      <div className="profile-page">
        <div className="profile-wrapper">
          <h1 className="profile-title">
            Halo { userprofile.username } <br />
            Glad you here.
          </h1>
          <form onSubmit={onSubmit} className="profile-post needs-validation">
            <input required value={post.title || ''} onChange={onChangeTitle} name="title" type="text" className="form-control" placeholder="What do you want to work..."/>
            <textarea required value={post.description || ''} onChange={onChangeDescription} name="description" type="text" className="form-control" placeholder="Enter work description..."/>
            <div className="input-group mt-2 mb-3">
              <span className="input-group-text">IDR</span>
              <input required value={post.price || ''} onChange={onChangePrice} type="text" className="form-control" placeholder="Enter work price..." aria-label="Dollar amount (with dot and two decimal places)" />
              <div>{errorMessage}</div>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary mt-3" type="submit">Post</button>
            </div>
          </form>
          <ul>
            My work: 
            { userprofile.entries && userprofile.entries.length !== 0 ? (
              userprofile.entries.map((post, index) => {
                return (
                  <li key={index}>{post.title + " "}</li>
                );
              })
            ) : ' Currently empty' }
          </ul>
          <p className="profile-link">
            {/* <Link className="btn btn-primary mt-3" to="/signout">Sign out</Link> */}
          </p>
        </div>
      </div>
    );
}

export default Profile;