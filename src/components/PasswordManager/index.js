import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItems from '../PasswordItems'

import './index.css'

const bgColors = ['green', 'blue', 'red', 'orange']

class PasswordManger extends Component {
  state = {
    passwordItemsList: [],
    websiteInput: '',
    passwordInput: '',
    userNameInput: '',
    passwordsCount: 0,
    searchInput: '',
    isCheckboxActive: false,
  }

  getFilteredPasswords = () => {
    const {passwordItemsList, searchInput} = this.state
    const filteredPasswords = passwordItemsList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredPasswords
  }

  onChangeCheckboxStatus = () => {
    this.setState(prevState => {
      const {isCheckboxActive} = prevState
      console.log(isCheckboxActive)
      return {
        isCheckboxActive: !prevState.isCheckboxActive,
      }
    })
  }

  onAddWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onAddUsername = event => {
    this.setState({userNameInput: event.target.value})
  }

  onAddPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePasswordItem = id => {
    const {passwordItemsList} = this.state
    const updatedPasswordList = passwordItemsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordItemsList: updatedPasswordList})
    this.setState(prevState => ({passwordsCount: prevState.passwordsCount - 1}))
  }

  getNoPasswordImage = () => {
    const {passwordItemsList} = this.state

    if (passwordItemsList.length === 0) {
      return (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-img"
          />
          <p className="no-password">No Passwords</p>
        </>
      )
    }
    return null
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    const {userNameInput, websiteInput, passwordInput} = this.state

    const randomColorIndex = Math.ceil(Math.random() * 3)

    const randomBgColor = bgColors[randomColorIndex]

    console.log(randomBgColor)

    const newPasswordItem = {
      id: uuidv4(),
      websiteName: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      bgColor: randomBgColor,
    }

    this.setState(prevState => ({
      passwordItemsList: [...prevState.passwordItemsList, newPasswordItem],
      userNameInput: '',
      websiteInput: '',
      passwordInput: '',
      passwordsCount: prevState.passwordsCount + 1,
    }))
  }

  render() {
    const {
      passwordItemsList,
      userNameInput,
      passwordInput,
      websiteInput,
      passwordsCount,
      searchInput,
      isCheckboxActive,
    } = this.state

    console.log(isCheckboxActive)
    console.log(passwordItemsList)

    const filteredPasswordList = this.getFilteredPasswords()

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="logo-img"
        />
        <div className="password-manager-container">
          <div className="details-container">
            <h1 className="add-heading">Add New Password</h1>
            <form onSubmit={this.onAddPasswordItem}>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="inputs"
                  value={websiteInput}
                  onChange={this.onAddWebsite}
                />
              </div>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="inputs"
                  value={userNameInput}
                  onChange={this.onAddUsername}
                />
              </div>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="inputs"
                  value={passwordInput}
                  onChange={this.onAddPassword}
                />
              </div>
              <div className="add-button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="password-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
              alt="password manager"
              className="password-img"
            />
          </div>
        </div>
        <div className="password-items-container">
          <div className="passwords-count-and-searchbar-container">
            <div className="your-passwords-container">
              <h1 className="password-count-heading">Your Passwords</h1>
              <p className="passwords-count"> {passwordsCount}</p>
            </div>
            <div className="search-bar-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-bar"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-passwords-checkbox-container">
            <input
              type="checkbox"
              className="check-box"
              id="checkbox-id"
              onClick={this.onChangeCheckboxStatus}
            />
            <label className="show-passwords-heading" htmlFor="checkbox-id">
              show Passwords
            </label>
          </div>
          <div className="no-password-container">
            {this.getNoPasswordImage()}
          </div>

          <ul className="password-items">
            {filteredPasswordList.map(eachPasswordItem => (
              <PasswordItems
                passwordItemDetails={eachPasswordItem}
                key={eachPasswordItem.id}
                deletePasswordItem={this.deletePasswordItem}
                isCheckActive={isCheckboxActive}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManger
