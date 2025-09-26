import React, { useState } from "react";
import './App.css'
#change
function App() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [date, setDate] = useState();
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState(""); 

  const [nameError, setnameError] = useState("")
  const [emailError, setemailError] = useState("")
  const [genderError, setgenderError] = useState("")
  const [phonenumberError, setPhonenumberError] = useState("")
  const [dateError, setdateError] = useState("")
  const [passwordError, setpasswordError] = useState("")
  const [retypeError, setretypeError] = useState("")
  const [emptyError, setemptyError] = useState("")

  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetErrorDefault = () => {
    setnameError("")
    setemailError("")
    setgenderError("")
    setPhonenumberError("")
    setdateError("")
    setpasswordError("")
    setretypeError("")
    setemptyError("")

  }

  const handleReset = () => {
    setFname("")
    setEmail("")
    setGender("")
    setPhonenumber("")
    setDate("")
    setPassword("")
    setRetype("")
    resetErrorDefault()

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    resetErrorDefault()

    if (fname === " " || email === "" || gender === "" || phonenumber === "" || date === "" || password === " " || retype === "") {
      setemptyError("All feild are manditory except last name");
      return false;
    }
    if (!fname.match(/^[A-Za-z0-9- ]+$/)) {
      setnameError("Name is not Alphanumeric")
      return false
    }

    if (!email.includes("@")) {
      setemailError("Email must contain at the rate")
      return false
    }

    if (!gender.match(/Male|Female|Other/i)) {
      setgenderError("Enter correct gender");
      return false
    }

    if (!phonenumber.match(/^[0-9]+$/)) {
      setPhonenumberError("wrong number");
      return false
    }

    if (password.length < 6) {
      setpasswordError("Password must contain atleast 6 letters");
      return false
    }

    if (!retype.match(password)) {
      setretypeError("Password is not same")
      return false
    }

    if (
      !nameError &&
      !dateError &&
      !emailError &&
      !passwordError &&
      !retypeError &&
      !phonenumberError
    ) {
      setIsSubmitted(true);
    } else {
      setnameError(nameError);
      setdateError(dateError)
      setemailError(emailError);
      setpasswordError(passwordError);
      setretypeError(retypeError);
      setPhonenumberError(phonenumberError);
      resetErrorDefault()
    }
  }

  return (
    <div className="App">
      <h1>STUDENT REGISTRATION FORM</h1>
      <div> {isSubmitted ? (
        <div><h2> succesfully registered. </h2></div>
      ) : (<form onSubmit={handleSubmit} >
        <label>Name:<input type="text" name="fname" value={fname} onChange={(e) => { setFname(e.target.value) }} /></label><br />
        <span className="form-error">{nameError}</span>

        <label>Email:<input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></label><br />
        <span className="form-error">{emailError}</span>
        <label>Gender:
          <select name="gender" value={gender} onChange={(e) => { setGender(e.target.value) }}>
            <option value="empty"></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label><br />
        <span className="form-error">{genderError}</span>
        <label>Phone number: <input type="text" name="Phone number" value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }} /></label><br />
        <span className="form-error">{phonenumberError}</span>
        <label>Date of Birth: <input type="date" name="dateofb" value={date} onChange={(e) => { setDate(e.target.value) }} /></label><br />
        <span className="form-error">{dateError}</span>
        <label>Password: <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /></label><br />
        <span className="form-error">{passwordError}</span>
        <label>Confirm: <input type="password" name="retypepassword" value={retype} onChange={(e) => { setRetype(e.target.value) }} /></label><br />
        <span className="form-error">{retypeError}</span>
        <span className="form-error">{emptyError}</span>
        <div className="form-action">
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>)}
      </div>
    </div>
  );
}

export default App;
