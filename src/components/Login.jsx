import { useState } from "react"


const Login = ({ userInfo, setUserInfo}) => {
  //Login use states
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [displayPass, setDisplayPass] = useState(false);
  const [loginError, setLoginError] = useState(null);

  //Register use states
  const [fnameRegister, setFnameRegister] = useState('');
  const [lnameRegister, setLnameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(null);


  //Function to check password validity based on regular expressions. Returns true if passed
  const passwordValid = (pw) => {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'special'  : /\W/,
        'full'    : /.{7,}$/
    };
    return re.capital .test(pw) && 
           re.digit   .test(pw) && 
           re.special .test(pw) && 
           re.full    .test(pw);
    }


  //Function to confirm that the registration form is completely filled out. Returning true if all inputs are filled
  const formFull = () => {
    return fnameRegister.length>0 && lnameRegister.length>0 && emailRegister.length>0 && passwordRegister.length>0 && confirmPassword.length>0;
  }


  //Function to fetch the current users data after logging in or newly registering
  const getUser = async() => {
    const apiResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    const userData = await apiResponse.json();
    console.log(userData);
    setUserInfo(userData);
    console.log(userInfo);
  }


  //
  // ****LOGIN**** //
  //
  //Attempts to login a user with the given input credentials
  const loginUser = async(event) => {
    //Preventing page refresh
    event.preventDefault();
    //Refresh Error Message
    setLoginError(null);

    try {
      //Fetching the data of the user with the given credentials
      const loginResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailLogin,
          password: passwordLogin
        })
      })
      const jsonObj = await loginResponse.json();
      console.log(jsonObj);
      //Throw an error if the login is failed
      if(jsonObj.message.toLowerCase().indexOf('incorrect')>-1){
        throw new Error(jsonObj.message);
      }
      localStorage.setItem('token',jsonObj.token);
      getUser();
      console.log(userInfo);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  //
  // ****REGISTER**** //
  //
  //Attempts to register the user with the registration form inputs, checking for password vailidity
  const registerUser = async(event) => {
    //Preventing page refresh
    event.preventDefault();
    //Refresh Error message
    setRegisterError(null);
    try {
      //Checking if the form is full
      if(!formFull()){
        throw new Error('Please fill out every field.');
      }
      //Checking password validity
      if(passwordRegister!==confirmPassword){
        throw new Error('Your password entries do not match!')
      }
      if(!passwordValid(passwordRegister)){
        throw new Error('Your password must contain 8 characters and at least one special character, one letter, and one number.');
      }
      //The data is acceptable, now we will register the new user
      const apiResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: fnameRegister,
          lastname: lnameRegister,
          email: emailRegister,
          password: passwordRegister
        })
      })
      const userObj = await apiResponse.json();
      if(userObj.message.indexOf('success')>-1){
        setSuccess(userObj.message);
        localStorage.setItem('token',userObj.token);
        getUser();
      }else{
        throw new Error(userObj.message);
      }
      console.log(userObj)
    } catch (error) {
      setRegisterError(error.message);
    }
  }



  return (
    <>
    {/* Login Section that displays the user's name if already logged in */}
    {
      userInfo ?
      <h2 style={{justifySelf: "center"}}>Hello {userInfo.firstname}!</h2>
      :
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="email..." onChange={(event)=>setEmailLogin(event.target.value)}></input>
          </div>
          <div>
            <label>Password: </label>
            <input type={displayPass?'text':'password'} placeholder="password..." onChange={(event)=>setPasswordLogin(event.target.value)}></input> 
            <button type='button' onClick={()=>setDisplayPass(!displayPass)}>{displayPass?'Hide Password':'Show Password'}</button>
          </div>

               
          <button type="submit">Login</button>
        </form>
        {/* Displaying error messages */}
        {
          loginError?
          <p style={{color: "red"}}>{loginError}</p>
          :
          <></>
        }
      </div>
    }
    {/* Registration form */}
    <div id='register'>
      <h1>Register a New User: </h1>
      <form onSubmit={registerUser}>
        <div>
          <label>First Name: </label>
          <input type="text" onChange={(event)=>setFnameRegister(event.target.value)}></input>
        </div>       
        <div>
          <label>Last Name: </label>
          <input type="text" onChange={(event)=>setLnameRegister(event.target.value)}></input>
        </div>
        <div>
          <label>Email: </label>
          <input type="email" onChange={(event)=>setEmailRegister(event.target.value)}></input>
        </div>

        <div>
          <label>Password: </label>
          <input type="text" onChange={(event)=>setPasswordRegister(event.target.value)}></input>
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="text" onChange={(event)=>setConfirmPassword(event.target.value)}></input>
        </div>
        <button type="submit" style={{alignSelf: 'center'}}>Register</button>
      </form>
      {/* Displaying Error messages */}
      {
        registerError?
        <p style={{color: "red"}}>{registerError}</p>
        :
        <></>
      }
      {/* Displaying successful account creation */}
      {
        success?
        <p style={{color: "green"}}>{success}</p>
        :
        <></>
      }
    </div>
    

      
    </>
  )
}

export default Login
