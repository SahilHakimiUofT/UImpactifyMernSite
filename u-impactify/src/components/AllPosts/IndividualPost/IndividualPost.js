import React, { useCallback, useContext } from 'react';
import PageWrapper from '../../PageWrapper/PageWrapper';
import Footer from '../../Footer/footer.component';
import { Grid, TextareaAutosize } from '@material-ui/core';
import { GetRequest, PostRequest } from '../../../helpers/httprequests';
import { AuthContext } from '../../../Auth';
import { Redirect, useParams, useHistory } from "react-router";
import CommentsCom from './Comments.component'
import ProfileBar from '../../Profile/profile-navbar.component'

export default function IndividualPostBody(){

    const history = useHistory()
    const {currentUser} = useContext(AuthContext);
    const currentPath = window.location.href;
    const [state, setState] = React.useState({
        id: '',
        postTitle: '',
        postContent: '',
        postAuthor: '',
        numcomments: '',
        comments: [],
    })

    let { id: postId } = useParams();
    console.log(currentPath);


    React.useEffect(() => {
        GetRequest('Posts/' + postId)
          .then(response => {
            console.log(response)
            setState({
              id: postId,
              postTitle: response.data.postTitle,
              postContent: response.data.postContent,
              postAuthor: response.data.postAuthorName,
              numcomments: response.data.numComments,
              comments: response.data.comments,
            })
          })
          .catch(function (error) {
            console.log(error);
          })
      }, [])

      console.log(state.comments)
      console.log(currentUser.email)


      const submitComment = useCallback(async event => {
          event.preventDefault();
          const { newcomm } = event.target.elements;
        
          console.log(newcomm.value);
          //window.location.replace(currentPath);

          let databody = {
            "comments": [
                {
                    "commentContent": newcomm.value,
                    "commentPosterEmail": currentUser.email,
                }
            ]
          }

          console.log(databody)

          try{
              fetch('http://localhost:5000/Posts/comments/' + postId, {
                  method: 'PUT',
                  body: JSON.stringify(databody),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then(res => res.json())
              .then(data => console.log(data))
              newcomm.value = "";
          } catch (error)
          {
              alert(error);
          }
        },
      );

        return(
            <Grid container direction="row" className="my-4">
                <Grid item>
                    <ProfileBar />
                </Grid>
                <Grid xs container direction="column">
                    <Grid item>
                        <div className="top-nav">
                            <h1>{state.postTitle}</h1>
                        </div>
                    </Grid>
                    <Grid xs container direction="column">
                        <div className='PostDetails'>
                            <h4>By: {state.postAuthor}</h4>
                            <p>{state.postContent}</p>
                        </div>
                        <div className='Comments'>
                            <br />
                            <h2>Comments</h2>
                            <br />
                            {state.comments.map(comment => {
                                return (
                                    <CommentsCom 
                                    key={comment.id}
                                    comment={comment}
                                />
                                )
                            })}
                        </div>
                        <div className='addcomment'>
                            <h2>Add a New Comment</h2>
                            <br />
                            <form onSubmit={submitComment}>
                                <TextareaAutosize name="newcomm" aria-label="comments" rowsMin={5} />
                                <br/>
                                <button type="submit">Post Comment</button>
                            </form>
                        </div>
                    </Grid>
                </Grid> 
            </Grid>
        )
}
