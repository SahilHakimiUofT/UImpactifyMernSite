import React, { useCallback, useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import ReactDom from 'react-dom'
import { Grid, TextareaAutosize } from '@material-ui/core';
import { AuthContext } from '../../Auth';

const Background = styled.div`
    width: 100%;
    height: 100:
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    display: flex;
    justify-content:center;
    align-items: center;
    z-index: 0;
`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: -9999999999;
    border-radius: 10px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    line-heigh: 1.8;
    color: #141414;
`;

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;

export const Modal = ({showModal, setShowModal}) => {

    const {currentUser} = useContext(AuthContext);
    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const {title, content} = event.target.elements;

        let databody = {
            "postTitle": title.value,
            "postContent": content.value,
            "postAuthorEmail": currentUser.email,
            "comments": [],
        }

        try{
            fetch('http://localhost:5000/Posts/add', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            title.value = "";
            content.value = "";

            alert("Posted Added");
        } catch (error)
        {
            alert(error);
        }
    });

    return (
        <>
            {showModal ? (
                <Background>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <div>
                                <h1>Create a new post</h1>
                                <br />
                            </div>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Post Name <br />
                                        <input name="title" type="text" />
                                    </label>
                                    <br />
                                    <label>
                                        Content <br />
                                        <TextareaAutosize name="content" aria-label="comments" rowsMin={5} />
                                        <br/>
                                    </label>
                                    <button type="submit" className='btn btn-outline-primary'>Post</button>
                                </form>
                            </div>
                            

                        </ModalContent>
                        <CloseModalButton aria-label='Close Modal' onClick={() => setShowModal (prev => !prev)} />
                    </ModalWrapper>
                </Background>
            ) : null }
        </> 
    );
};