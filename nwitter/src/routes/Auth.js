import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name,value}} = event;
        if(name === "email") {
            setEmail(value)
        }
        else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data; // data is not defined
            if(newAccount){ // create account
                const data = await authService.createUserWithEmailAndPassword(email, password);
            }
            else{ // log in
                const data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        }
        catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount(prev => !prev); //처음값과 반대되게 설정
    const onSocialClick = async (event) => {
        const {
            target:{name}
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    requried 
                    value={email}
                    onChange={onChange} 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    requried 
                    value={password}
                    onChange={onChange} 
                />
                <input type="submit" value={newAccount ? "Create Account " : "Sign in"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;